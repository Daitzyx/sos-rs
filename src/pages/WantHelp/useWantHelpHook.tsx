import { useState } from 'react'
import { ref, set, push } from 'firebase/database'
import { db } from '../../libs/firebase'
import { useNavigate } from 'react-router-dom'

const useWantHelpHook = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const getAddressFromCoordinates = async (latitude: number | string, longitude: number | string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      } else {
        const { road, suburb, city, state } = data.address
        return `${road}, ${suburb}, ${city}, ${state}`
      }
    } catch (error: any) {
      throw new Error('Failed to fetch address: ' + error.message)
    }
  }

  const requestAndSaveLocation = async (textareaData?: string) => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        const timestamp = new Date().toISOString()

        try {
          const address = await getAddressFromCoordinates(latitude, longitude)

          const newLocationRef = push(ref(db, 'emergencies'))

          await set(newLocationRef, {
            observation: textareaData,
            latitude,
            longitude,
            address,
            timestamp
          })

          setLoading(false)
          navigate('/localizacao-compartilhada')
          setError(null)
        } catch (error: any) {
          setError('Failed to save data: ' + error.message)
          setLoading(false)
          setMessage('')
        }
      },
      (error) => {
        handleLocationError(error)
        setLoading(false)
        setMessage('')
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    )
  }

  function handleLocationError(error: any) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError(
          'User denied the request for Geolocation. Please enable it in your browser settings if you want to use this feature.'
        )
        break
      case error.POSITION_UNAVAILABLE:
        setError('Location information is unavailable.')
        break
      case error.TIMEOUT:
        setError('The request to get user location timed out.')
        break
      default:
        setError('An unknown error occurred.')
        break
    }
  }

  return { saveLocationToFirebase: requestAndSaveLocation, loading, error, message }
}

export default useWantHelpHook
