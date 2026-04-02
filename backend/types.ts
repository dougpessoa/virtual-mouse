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

export type Message = {
  type: "click" | "right-click" | "scroll" | "move",
  data: ClickData | ScrollData | MoveData
}
