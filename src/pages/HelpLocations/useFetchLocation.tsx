import { useState, useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { db } from '../../libs/firebase'

interface Location {
  id: string
  address: string
  latitude: number
  longitude: number
  observation: string
  timestamp: string
}

const useFetchHelpLocations = () => {
  const [locations, setLocations] = useState<Location | any>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const locationsRef = ref(db, 'helpPoints')
    const unsubscribe = onValue(
      locationsRef,
      (snapshot) => {
        const data = snapshot.val()
        const loadedLocations = []
        for (const key in data) {
          loadedLocations.push({
            id: key,
            ...data[key]
          })
        }
        setLocations(loadedLocations)
        setLoading(false)
      },
      (error: any) => {
        setError(error.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return { locations, loading, error }
}

export default useFetchHelpLocations
