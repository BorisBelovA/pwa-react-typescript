import { AuthUser, User } from "./user";

export type Recipient = AuthUser & {
  isActiveProfile: boolean | null
}

export interface Chat {
  roomId: number
  recipient: Recipient
}