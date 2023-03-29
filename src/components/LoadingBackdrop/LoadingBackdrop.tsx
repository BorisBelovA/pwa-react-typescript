import { Backdrop, CircularProgress, Typography } from '@mui/material'
import React, { useState } from 'react'

interface LoadingBackdropProps {
  backdropMessage: string
  backdropVisible: boolean
}

export interface LoadingBackdropOutletContext {
  backdropMessage: string
  setBackdropMessage: (message: string) => void
  backdropVisible: boolean
  setBackdropVisible: (visible: boolean) => void
}

export const useLoadingBackdrop = (): LoadingBackdropOutletContext => {
  const [backdropMessage, setBackdropMessage] = useState('')
  const [backdropVisible, setBackdropVisible] = useState(false)
  return {
    backdropMessage,
    setBackdropMessage,
    backdropVisible,
    setBackdropVisible
  } as const
}

export const LoadingBackdrop = React.forwardRef<any, LoadingBackdropProps>(
  function LoadingBackdrop ({ backdropMessage, backdropVisible }, refs): JSX.Element {
    return <>
      {backdropVisible && <Backdrop
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '0.5rem',
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={true}
      >
        <CircularProgress color='inherit' />
        <Typography variant='h2'>{backdropMessage}</Typography>
      </Backdrop>}
    </>
  }
)
