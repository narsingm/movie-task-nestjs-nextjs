import { useEffect } from 'react'
import { useRouter } from 'next/router'



export const usePagination = (size = 10) => {
  type TPaginationModel = { page: number, limit: number }

  const router = useRouter()
  const { page, limit }: TPaginationModel = { page: +(router.query.page || 1), limit: +(router.query.limit || size) }
  const paginationModel = { page: page - 1, limit }


  useEffect(() => {
    if (!router.query.page || !router.query.limit) setPaginationModel({ page: page - 1, limit })
  })


  const setPaginationModel = ({ page, limit, hash }: TPaginationModel & { hash?: string }) => {
    router.replace(
      { query: { ...router.query, page: page + 1, limit }, hash },
      undefined,
      { shallow: true, scroll: true }
    )
  }


  return { setPaginationModel, page, limit, paginationModel }
}