import { useCallback, useEffect, useState } from 'react'
import { userService } from '../services/UserService'
import { User } from '../types/AdminDataTypes'

export function useUsers(
  searchName: string,
  paginationLimit: number,
  offSetParams = 0
) {
  const [users, setUsers] = useState<User[]>([])
  const [offset, setOffset] = useState(offSetParams)
  const [loading, setLoading] = useState(false)
  const [incomplete, setIncomplete] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const addItems = useCallback(
    (userItems: User[]) => {
      setUsers(users.concat(userItems))
    },
    [users]
  )

  useEffect(() => {
    const getInitialUsers = async () => {
      setLoading(true)
      setHasMore(true)
      const userItems = await userService().getUserItems(        
        paginationLimit,
        offSetParams,
        searchName
      )
      
      setUsers(userItems)
      setOffset(userItems.length)
      setLoading(false)

      if (userItems.length < paginationLimit) {
        setHasMore(false)
      }
    }
    
    getInitialUsers()
  }, [searchName, paginationLimit])

  const loadMore = useCallback(    
    async (customOffset?: number, customPaginationLimit?: number, customSearchName?: string) => {
      const userItems = await userService().getUserItems(
        customPaginationLimit || paginationLimit,
        customOffset || offset,
        customSearchName || searchName
      )

      if (userItems) {
        const newOffset = offset + userItems.length
        addItems(userItems)
        setOffset(newOffset)
      }

      if (userItems.length < paginationLimit) {
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

  return { loading, hasMore, loadMore, users }
}
