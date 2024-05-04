import { useState, useEffect } from 'react'

interface UserLocation {
  latitude: number
  longitude: number
}

const useUserLocation = () => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLatitude = position.coords.latitude
            const userLongitude = position.coords.longitude
            setUserLocation({ latitude: userLatitude, longitude: userLongitude })
            setLoading(false)
          },
          (error: any) => {
            setError(error)
            setLoading(false)
          }
        )
      } else {
        setError(new Error('Geolocation is not supported by this browser.') as any)
        setLoading(false)
      }
    }

    getUserLocation()

    return () => {}
  }, [])

  return { userLocation, loading, error }
}

export default useUserLocation
