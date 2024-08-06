import { MovieDTO } from '@/dto/Movie.dto'



export type MovieFormProps =
  {
    isEditMode: false
    data?: void
  }
  |
  {
    isEditMode: true
    data: MovieDTO
  }