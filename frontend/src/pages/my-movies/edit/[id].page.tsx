import { useRouter } from 'next/router'
import { Container } from '@mui/material'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import MovieForm from '../components/movieForm/MovieForm.component'
import { Page } from '@/types/Page.type'
import { useGetMovieQuery } from '@/redux/api/movie.api'
import RenderContent from '@/components/renderContent/RenderContent.component'



const EditMovie: Page = () => {
  const router = useRouter()
  const { data, isError, isFetching } = useGetMovieQuery(router.query.id as string)


  return (
    <Container>
      <PageHeader heading='Edit Movie' />
      <RenderContent loading={isFetching} error={isError}>
        {data && <MovieForm isEditMode={true} data={data} />}
      </RenderContent>
    </Container>
  )
}


EditMovie.layoutProps = {
  pageType: 'protected',
  title: 'Edit Movie'
}

export default EditMovie