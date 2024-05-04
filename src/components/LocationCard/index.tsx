import { useEffect, useState } from 'react'
import { BiMapPin } from 'react-icons/bi'
import { SlOptionsVertical } from 'react-icons/sl'
import useUserLocation from '../../hooks/useUserLocation'
import { calculateDistance } from '../../utils/calculate'

import { Card, Street, Distance, Details, MapButton, Options } from './styles'

const getAddressCoordinates = async (address: any) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=AIzaSyABsgLbHflDfzvONwFN28h6KyyuKTPejdE`
    )
    const data = await response.json()
    if (data.results && data.results.length > 0) {
      const location = data.results[0].geometry.location
      return {
        latitude: location.lat,
        longitude: location.lng
      }
    } else {
      throw new Error('Endereço não encontrado')
    }
  } catch (error) {
    console.error('Erro ao obter coordenadas do endereço:', error.message)
    return null
  }
}
export const LocationCard = ({ location }: any) => {
  const { userLocation, loading, error } = useUserLocation()
  const address = `${location.street}, ${location.number}, ${location.district}, ${location.city}`
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`

  const [lat, setLat] = useState()
  const [long, setLOng] = useState()

  getAddressCoordinates(address).then((coordinates) => {
    if (coordinates) {
      setLat(coordinates.latitude)
      setLOng(coordinates.longitude)
    }
  })
  const [distance, setDistance] = useState<number | null>(null)

  useEffect(() => {
    if (!loading && !error && userLocation) {
      const distanceInKm = calculateDistance(lat, long, userLocation.latitude, userLocation.longitude)
      setDistance(distanceInKm)
      console.log(lat, long, userLocation.latitude, userLocation.longitude, 'locations')
    }
  }, [userLocation])

  return (
    <Card>
      <BiMapPin size={50} />
      <Details>
        <Street>
          {location.street}, {location.number}, {location.district}, {location.city}
        </Street>
        <Distance>
          {distance !== null ? `A ${distance.toFixed(2)} km de distância` : 'Calculando distância...'}
        </Distance>
      </Details>
      <MapButton as="a" href={mapsUrl} target="_blank">
        MAPA
      </MapButton>
      <Options>
        <SlOptionsVertical />
      </Options>
    </Card>
  )
}

