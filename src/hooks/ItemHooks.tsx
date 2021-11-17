import { useCallback, useEffect, useState } from 'react'
import { itemService } from '../services/ItemService'
import { Item } from '../types/AdminDataTypes'

export function useItems(
  searchName: string,
  paginationLimit: number,
  offSetParams = 0
) {
  const [items, setItems] = useState<Item[]>([])
  const [offset, setOffset] = useState(offSetParams)
  const [loading, setLoading] = useState(false)
  const [incomplete, setIncomplete] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const addItems = useCallback(
    (itemItems: Item[]) => {
      setItems(items.concat(itemItems))
    },
    [items]
  )

  useEffect(() => {
    const getInitialItems = async () => {
      setLoading(true)
      setHasMore(true)
      const itemItems = await itemService().getItems(        
        paginationLimit,
        offSetParams,
        searchName
      )
      
      setItems(itemItems)
      setOffset(itemItems.length)
      setLoading(false)

      if (itemItems.length < paginationLimit) {
        setHasMore(false)
      }
    }
    
    getInitialItems()
  }, [searchName, paginationLimit])

  const loadMore = useCallback(    
    async (customOffset?: number, customPaginationLimit?: number, customSearchName?: string) => {
      const itemItems = await itemService().getItems(
        customPaginationLimit || paginationLimit,
        customOffset || offset,
        customSearchName || searchName
      )

      if (itemItems) {
        const newOffset = offset + itemItems.length
        addItems(itemItems)
        setOffset(newOffset)
      }

      if (itemItems.length < paginationLimit) {
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

  return { loading, hasMore, loadMore, items }
}
