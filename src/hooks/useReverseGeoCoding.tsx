import { useState, useEffect } from 'react'

const useReverseGeocoding = () => {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getAddressFromCoordinates = async (latitude, longitude) => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
      const data = await response.json()
      if (data.error) {
        setError(data.error)
        setAddress('')
      } else {
        setAddress(data.display_name)
      }
    } catch (err) {
      setError(err.message)
      setAddress('')
    } finally {
      setLoading(false)
    }
  }

  return { address, getAddressFromCoordinates, loading, error }
}

export default useReverseGeocoding
