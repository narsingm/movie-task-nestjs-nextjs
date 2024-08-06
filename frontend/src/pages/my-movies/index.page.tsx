import Link from 'next/link'
import { MdAdd } from 'react-icons/md'
import { useRouter } from 'next/router'
import { Button, Container, Grid, Pagination, Stack } from '@mui/material'

import PageHeader from '@/components/pageHeader/PageHeader.component'
import RenderContent from '@/components/renderContent/RenderContent.component'
import MovieCard from '@/components/movieCard/MovieCard.component'
import NoRecordMessage from '@/components/noRecordMessage/NoRecordMessage.component'
import { usePagination } from '@/hooks'
import { useGetMovieListQuery } from '@/redux/api/movie.api'
import { Page } from '@/types'



const MyMovies: Page = () => {
  const router = useRouter()
  const { page, limit } = usePagination(8)
  const { data, isError, isFetching } = useGetMovieListQuery({ page, limit })


  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    router.push({ query: { ...router.query, page } })
  }


  const addMovieButton = <Button href='/my-movies/add' startIcon={<MdAdd />} component={Link}>Add Movies</Button>


  return (
    <Container>

      {/* Page Header */}
      <PageHeader
        heading='My Movies'
        actions={data?.list.length ? addMovieButton : null}
      />

      <RenderContent loading={isFetching} error={isError}>
        {data?.list.length ?
          <>
            {/* Movies List */}
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {data.list.map((item, index) =>
                <Grid item xs={6} sm={4} md={3} key={item.id}>
                  <MovieCard data={item} />
                </Grid>
              )}
            </Grid>

            {/* Pagination */}
            <Stack alignItems='center' mt={3}>
              <Pagination
                count={data.totalPages}
                page={data.currentPage}
                onChange={handlePageChange}
              />
            </Stack>
          </>
          :
          <NoRecordMessage
            message='Your movie list is empty'
            actions={addMovieButton}
          />
        }
      </RenderContent>

    </Container>
  )
}


MyMovies.layoutProps = {
  pageType: 'protected',
  title: 'My Movies',
}

export default MyMovies