import { useEffect, useState } from 'react'

import { FaCircleUser } from 'react-icons/fa6'
import { SlOptionsVertical } from 'react-icons/sl'

import useUserLocation from '../../hooks/useUserLocation'
import { calculateDistance } from '../../utils/calculate'

import { Card, Street, Distance, Details, MapButton, Options } from './styles'

export const PersonCard = ({ user, ...props }: any) => {
  const { userLocation, loading, error } = useUserLocation()
  const mapsUrl = user.latitude && user.longitude && `https://www.google.com/maps/?q=${user.latitude},${user.longitude}`

  const addressParts = user.address
    .split(',')
    .filter((part: any) => !part.includes('undefined'))
    .slice(0, -1)
  const address = addressParts.join(', ')

  const [distance, setDistance] = useState<number | null>(null)

  useEffect(() => {
    if (!loading && !error && userLocation) {
      const distanceInKm = calculateDistance(
        user.latitude,
        user.longitude,
        userLocation.latitude,
        userLocation.longitude
      )
      setDistance(distanceInKm)
    }
  }, [userLocation])

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
      <Options>
        <SlOptionsVertical />
      </Options>
    </Card>
  )
}
