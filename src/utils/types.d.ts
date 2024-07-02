declare type TurnoverForm = {
  tiCai: number
  waiDian: number
  fuCai: number
  onePercent: number
}
declare type TurnoverFormField = keyof TurnoverForm

declare type Turnover = {
  id: string
  date: string
  tiCai: number
  waiDian: number
  fuCai: number
  onePercent: number
}