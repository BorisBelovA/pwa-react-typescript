import { Button, Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from 'src/utils/StoreProvider'
import NoImage from '../../../assets/no-image.jpeg'

export const MyAppartments = observer((): JSX.Element => {
  const { appartmentStore } = useStore()

  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const haveAppartment = appartmentStore.haveAppartment
  const createAppartment = (): void => {
    navigate('new/basic')
  }

  const appartment = useMemo(() => {
    return appartmentStore.appartments[0]
  }, [appartmentStore.appartments])

  const getAppartmet = async (): Promise<void> => {
    await appartmentStore.getAppartmet()
    setIsLoading(false)
  }

  useEffect(() => {
    void getAppartmet()
  }, [])

  return <>
    { isLoading &&
      <Skeleton variant="rounded" width='100%' height={240} animation="wave" />
    }
    {!isLoading && !haveAppartment && <Button variant='contained' onClick={() => { createAppartment() }}>Add appartment</Button>}
    {!isLoading && haveAppartment &&
      <Card>
        <CardActionArea onClick={() => { createAppartment() }}>
          <CardMedia
            component="img"
            height="200"
            src={`${appartment.photos[0] ?? NoImage}`}
            alt="apartment-image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              { appartment.name }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              { appartment.description }
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    }
  </>
})
