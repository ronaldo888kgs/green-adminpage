import { useCallback, useEffect, useState } from 'react'
import { collectionService } from '../services/CollectionService'
import { Collection } from '../types/AdminDataTypes'

export function useMyCollections(
  searchName: string,
  paginationLimit: number,
  offSetParams = 0
) {
  const [collections, setCollections] = useState<Collection[]>([])
  const [offset, setOffset] = useState(offSetParams)
  const [loading, setLoading] = useState(false)
  const [incomplete, setIncomplete] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const addItems = useCallback(
    (collectionItems: Collection[]) => {
      setCollections(collections.concat(collectionItems))
    },
    [collections]
  )

  useEffect(() => {
    const getInitialCollections = async () => {
      setLoading(true)
      setHasMore(true)
      const collectonItems = await collectionService().getCollectionItems(        
        paginationLimit,
        offSetParams,
        searchName
      )
      
      setCollections(collectonItems)
      setOffset(collectonItems.length)
      setLoading(false)

      if (collectonItems.length < paginationLimit) {
        setHasMore(false)
      }
    }
    
    getInitialCollections()
  }, [searchName, paginationLimit])

  const loadMore = useCallback(    
    async (customOffset?: number, customPaginationLimit?: number, customSearchName?: string) => {
      const collectonItems = await collectionService().getCollectionItems(
        customPaginationLimit || paginationLimit,
        customOffset || offset,
        customSearchName || searchName
      )

      if (collectonItems) {
        const newOffset = offset + collectonItems.length
        addItems(collectonItems)
        setOffset(newOffset)
      }

      if (collectonItems.length < paginationLimit) {
        setIncomplete(false)
      }
    },
    [addItems, offset, paginationLimit]
  )

  useEffect(() => {
    if (incomplete) {
      loadMore(0, 100)
      setIncomplete(false)
    }
  }, [incomplete, loadMore])

  return { loading, hasMore, loadMore, collections }
}
