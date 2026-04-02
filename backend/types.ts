export type ClickData = {
  type: "left" | "right"
  pressQty: number  
} 
export type ScrollData = {
  y: number
} 
export type MoveData = {
  x: number
  y: number
}

export type KeyboardData = string

export type Message = {
  type: "click" | "right-click" | "scroll" | "move" | "keyboard"
  data: ClickData | ScrollData | MoveData | KeyboardData
}
