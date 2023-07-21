import { type UserDto } from "./user"

export type Recipient = UserDto & {
  isActiveProfile: boolean | null
}

// чат - комната
export interface Chat {
  id: number
  recipient: Recipient
}
