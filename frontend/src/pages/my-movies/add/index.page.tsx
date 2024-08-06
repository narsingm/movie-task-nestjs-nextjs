import { Container } from '@mui/material'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import MovieForm from '../components/movieForm/MovieForm.component'
import { Page } from '@/types/Page.type'



const AddMovie: Page = () => {
  return (
    <Container>
      <PageHeader heading='Add Movie' />
      <MovieForm isEditMode={false} />
    </Container>
  )
}


AddMovie.layoutProps = {
  pageType: 'protected',
  title: 'Add Movie'
}

export default AddMovie