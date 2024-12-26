import { useEffect, useState } from 'react'
import { databaseCtrl } from '../services'

const useFetch = <T,>(schema: string) => {
  const [docs, setDocs] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>('')

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const items = await databaseCtrl.getCollection<T>(schema)
        setDocs(items)
        setError(null)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocs()
  }, [schema])

  return { docs, isLoading, error }
}

export { useFetch }
