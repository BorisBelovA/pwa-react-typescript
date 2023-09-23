import { createContext, useContext } from 'react'

export interface IBeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt: () => Promise<void>
}
export interface PromptCtx {
  deferredEvt: IBeforeInstallPromptEvent | null
  hidePrompt: () => void
}

export const PromptToInstall = createContext<PromptCtx>({ deferredEvt: null, hidePrompt: () => {} })

export const usePromptToInstall = (): PromptCtx => {
  const ctx = useContext(PromptToInstall)
  if (!ctx) {
    throw new Error('Cannot use usePromptToInstall() outside <PromptToInstallProvider />')
  }
  return ctx
}
