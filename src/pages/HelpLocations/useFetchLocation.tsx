import { useState, useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { db } from '../../libs/firebase'
import useUserLocation from '../../hooks/useUserLocation'
import { calculateDistance } from '../../utils/calculate'

interface HelpLocation {
  id: string
  address: string
  latitude: number
  longitude: number
  observation: string
  timestamp: string
  distance: number
}

const useFetchHelpLocations = () => {
  const [locations, setLocations] = useState<HelpLocation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { userLocation } = useUserLocation()

  useEffect(() => {
    const locationsRef = ref(db, 'helpPoints')
    const unsubscribe = onValue(
      locationsRef,
      (snapshot) => {
        const data = snapshot.val()
        const loadedLocations: HelpLocation[] = []
        for (const key in data) {
          const location: HelpLocation = {
            id: key,
            ...data[key],
            distance: calculateDistance(
              data[key].latitude,
              data[key].longitude,
              userLocation?.latitude,
              userLocation?.longitude
            )
          }
          loadedLocations.push(location)
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
  }, [userLocation])

  return { locations, loading, error }
}

export default useFetchHelpLocations
