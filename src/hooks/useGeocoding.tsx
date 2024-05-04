import { useState } from 'react'

const useGeocoding = () => {
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getCoordinatesFromAddress = async ({ street, district, city }: any) => {
    const fullAddress = `${street}, ${district}, ${city}`
    setLoading(true)
    try {
      const encodedAddress = encodeURIComponent(fullAddress)
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`)
      const data = await response.json()
      if (data && data.length > 0) {
        const { lat, lon } = data[0]
        setCoordinates({ latitude: parseFloat(lat) as any, longitude: parseFloat(lon) as any })
      } else {
        setError('Endereço não encontrado' as any)
        setCoordinates({ latitude: null, longitude: null })
      }
    } catch (err) {
      setError('Ocorreu um erro ao buscar as coordenadas' as any)
      setCoordinates({ latitude: null, longitude: null })
    } finally {
      setLoading(false)
    }
  }

  return { coordinates, getCoordinatesFromAddress, loading, error }
}

export default useGeocoding
