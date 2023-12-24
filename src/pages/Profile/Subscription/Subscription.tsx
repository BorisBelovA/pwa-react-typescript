import { Box, Typography } from '@mui/material'
import styles from '../Profile.module.scss'
import subscriptionStyles from './subscription.module.scss'
import BackButton from 'components/Buttons/BackButton/BackButton'
import { t } from '@lingui/macro'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

export const Subscription = (): JSX.Element => {
  return <>
     <Box className={styles.profile__container}>
      <Box className={styles.profile__header}>
        <BackButton />
        <Typography variant='h1'>{t`Subscription plans`}</Typography>
      </Box>
      <Box className={subscriptionStyles.swiper}>
        <Swiper className={subscriptionStyles.swiper}
          slidesPerView={1}
          pagination={true}
          modules={[Pagination]}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper: any) => console.log(swiper)}>
          <SwiperSlide className={subscriptionStyles.swiperSlide}>Slide 1</SwiperSlide>
          <SwiperSlide className={subscriptionStyles.swiperSlide}>Slide 2</SwiperSlide>
          <SwiperSlide className={subscriptionStyles.swiperSlide}>Slide 3</SwiperSlide>
          <SwiperSlide className={subscriptionStyles.swiperSlide}>Slide 4</SwiperSlide>
        </Swiper>
      </Box>
    </Box>
  </>
}
