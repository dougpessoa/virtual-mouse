import http, { type IncomingMessage } from "node:http"
import { URL } from "node:url"
import WebSocket, { WebSocketServer } from "ws"

import type { Message } from "../types"

type Role = "client" | "host"

const PORT = normalizePort(process.env.PORT) ?? 8080

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "*")

  if (req.method === "OPTIONS") {
    res.writeHead(204)
    res.end()
    return
  }

  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json" })
    res.end(JSON.stringify({ ok: true }))
    return
  }

  res.writeHead(200, { "content-type": "text/plain" })
  res.end("virtual-mouse-backend")
})

const wss = new WebSocketServer({ noServer: true })
wss.on("headers", (headers) => {
  headers.push("Access-Control-Allow-Origin: *")
  headers.push("Access-Control-Allow-Headers: *")
})

let hostSocket: WebSocket | null = null
const clientSockets = new Set<WebSocket>()

server.on("upgrade", (req: http.IncomingMessage, socket: import("node:net").Socket, head: Buffer) => {
  const role = getRoleFromRequest(req)
  if (!role) {
    socket.write("HTTP/1.1 400 Bad Request\r\n\r\n")
    socket.destroy()
    return
  }

  wss.handleUpgrade(req, socket, head, (ws: WebSocket) => {
    handleConnection(ws, role)
  })
})

server.listen(PORT, () => {
  process.stdout.write(`ws server listening on ${PORT}\n`)
})

setInterval(() => {
  if (hostSocket && hostSocket.readyState === WebSocket.OPEN) {
    hostSocket.ping()
  }

  for (const ws of clientSockets) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping()
    }
  }
}, 30_000).unref()

function handleConnection(ws: WebSocket, role: Role) {
  if (role === "host") {
    if (hostSocket && hostSocket.readyState === WebSocket.OPEN) {
      ws.close(1013, "Host already connected")
      return
    }

    hostSocket = ws
    sendToClients({ type: "status", data: { hostConnected: true } })

    ws.on("message", () => {})

    ws.on("close", () => {
      if (hostSocket === ws) {
        hostSocket = null
        sendToClients({ type: "status", data: { hostConnected: false } })
      }
    })

    ws.on("error", () => {})
    return
  }

  clientSockets.add(ws)
  send(ws, { type: "status", data: { hostConnected: hostSocket?.readyState === WebSocket.OPEN } })

  ws.on("message", (raw: WebSocket.RawData) => {
    const message = parseMessage(raw)
    if (!message) {
      send(ws, { type: "error", message: "Invalid message payload" })
      return
    }

    if (!hostSocket || hostSocket.readyState !== WebSocket.OPEN) {
      send(ws, { type: "error", message: "No host connected" })
      return
    }

    hostSocket.send(JSON.stringify(message))
  })

  ws.on("close", () => {
    clientSockets.delete(ws)
  })

  ws.on("error", () => {})
}

function sendToClients(payload: unknown) {
  for (const ws of clientSockets) {
    send(ws, payload)
  }
}

function send(ws: WebSocket, payload: unknown) {
  if (ws.readyState !== WebSocket.OPEN) return
  ws.send(JSON.stringify(payload))
}

function getRoleFromRequest(req: IncomingMessage): Role | null {
  const rawUrl = req.url ?? "/"
  const url = new URL(rawUrl, "http://localhost")
  const roleFromQuery = url.searchParams.get("role")
  if (roleFromQuery === "client" || roleFromQuery === "host") return roleFromQuery

  if (url.pathname === "/client") return "client"
  if (url.pathname === "/host") return "host"

  return null
}

function parseMessage(raw: WebSocket.RawData): Message | null {
  const text = typeof raw === "string" ? raw : raw.toString("utf8")

  let value: unknown
  try {
    value = JSON.parse(text)
  } catch {
    return null
  }

  if (!isRecord(value)) return null
  if (typeof value.type !== "string") return null
  if (!("data" in value)) return null

  const type = value.type
  const data = value.data

  if (!isRecord(data)) return null

  if (type === "click" || type === "right-click") {
    if (typeof data.pressQty !== "number") return null
    if (data.type !== "left" && data.type !== "right") return null
    return value as Message
  }

  if (type === "scroll") {
    if (typeof data.y !== "number") return null
    return value as Message
  }

  if (type === "move") {
    if (typeof data.x !== "number") return null
    if (typeof data.y !== "number") return null
    return value as Message
  }

  return null
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function normalizePort(value: string | undefined): number | null {
  if (!value) return null
  const parsed = Number(value)
  if (!Number.isFinite(parsed)) return null
  if (parsed <= 0) return null
  return parsed
}
