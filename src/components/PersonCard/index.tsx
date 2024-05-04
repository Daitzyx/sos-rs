import { Card, Street, Distance, Details, MapButton } from './styles'
import { FaCircleUser } from 'react-icons/fa6'
import { SlOptionsVertical } from 'react-icons/sl'
import useUserLocation from '../../hooks/useUserLocation'
import { useEffect, useState } from 'react'

export const PersonCard = ({ user, ...props }: any) => {
  const { userLocation, loading, error } = useUserLocation()
  const mapsUrl = user.latitude && user.longitude && `https://www.google.com/maps/?q=${user.latitude},${user.longitude}`

  const addressParts = user.address
    .split(',')
    .filter((part) => !part.includes('undefined'))
    .slice(0, -1)
  const address = addressParts.join(', ')
  console.log(addressParts, 'addressParts')
  const [distance, setDistance] = useState<number | null>(null)

  useEffect(() => {
    if (!loading && !error && userLocation) {
      // Calcular a distância usando a Fórmula de Haversine
      const distanceInKm = calculateDistance(
        user.latitude,
        user.longitude,
        userLocation.latitude,
        userLocation.longitude
      )
      setDistance(distanceInKm)
    }
  }, [userLocation])

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    return distance
  }

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180)
  }

  return (
    <Card {...props}>
      <FaCircleUser size={50} />
      <Details>
        <Street>{address}</Street>
        <Distance>
          {distance !== null ? `A ${distance.toFixed(2)} km de distância` : 'Calculando distância...'}
        </Distance>
      </Details>
      <MapButton as="a" href={mapsUrl} target="_blank">
        MAPA
      </MapButton>
      <SlOptionsVertical />
    </Card>
  )
}

