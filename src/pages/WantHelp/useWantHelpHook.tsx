import { useState } from 'react'
import { ref, set, push } from 'firebase/database'
import { db } from '../../libs/firebase'
import { useNavigate } from 'react-router-dom'

const useWantHelpHook = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const requestAndSaveLocation = async (textareaData?: string) => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }

    // const confirmAccess = window.confirm(
    //   'We need access to your location to enhance our services and provide better support. Can we proceed?'
    // )
    // if (!confirmAccess) {
    //   setError('Location access is required for the functionality of this app. Please enable it in your settings.')
    //   return
    // }

    setLoading(true)
    setError(null) // Limpa erros anteriores

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        const timestamp = new Date().toISOString()

        const newLocationRef = push(ref(db, 'emergencies'))

        try {
          await set(newLocationRef, {
            observation: textareaData,
            latitude,
            longitude,
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

