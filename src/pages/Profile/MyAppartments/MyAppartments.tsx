import { Button, Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from 'src/utils/StoreProvider'
import NoImage from '../../../assets/no-image.jpeg'

export const MyApartments = observer((): JSX.Element => {
  const { apartmentStore } = useStore()

  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const haveApartment = apartmentStore.haveApartment
  const createApartment = (): void => {
    navigate('new/basic')
  }

  const editApartment = (apartmentId: number): void => {
    navigate(`edit/basic?id=${apartmentId}`)
  }

  const apartments = useMemo(() => {
    return apartmentStore.apartments
  }, [apartmentStore.apartments])

  const getApartment = async (): Promise<void> => {
    await apartmentStore.getApartment()
    setIsLoading(false)
  }

  useEffect(() => {
    void getApartment()
  }, [])

  return <>
    {isLoading &&
      <Skeleton variant="rounded" width='100%' height={240} animation="wave" />
    }
    {!isLoading && !haveApartment &&
      <Button variant='contained'
        sx={{ marginBottom: '1rem' }}
        onClick={() => { createApartment() }}
      >Add apartment
      </Button>
    }
    {!isLoading && haveApartment &&
      apartments.map(ap =>
        <Card key={ap.id}>
          <CardActionArea onClick={() => { editApartment(ap.id) }}>
            <CardMedia
              component="img"
              height="200"
              src={`${ap.photos[0] ?? NoImage}`}
              alt="apartment-image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {ap.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {ap.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )
    }
  </>
})