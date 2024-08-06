import Link from 'next/link'
import Image from 'next/image'
import { Stack, Typography } from '@mui/material'

import { MovieCardProps } from './MovieCard.type'
import { style } from './MovieCard.style'



export default function MovieCard({ data }: MovieCardProps) {

  return (
    <Stack component={Link} href={`/my-movies/edit/${data.id}`} sx={style.root}>
      <Stack className='poster' sx={style.poster}>
        <Image src={data.image} alt='movie poster' fill sizes='(min-width:900px) 270px, (min-width:600px) 34vw, 50vw' />
      </Stack>
      <Typography className='title' variant='h3' mt={1.5} mb={.5} noWrap>{data.title}</Typography>
      <Typography noWrap>{data.publishingYear}</Typography>
    </Stack>
  )
}
