import { useEffect, useState } from 'react'
import { Card, Street, Distance, Details, MapButton } from './styles'
import { BiMapPin } from 'react-icons/bi'
import { SlOptionsVertical } from 'react-icons/sl'
import useUserLocation from '../../hooks/useUserLocation'
import { calculateDistance } from '../../utils/calculate'

export const LocationCard = ({ location }: any) => {
  const { userLocation, loading, error } = useUserLocation()
  const address = `${location.street}, ${location.number}, ${location.district}, ${location.city}`
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`

  const [distance, setDistance] = useState<number | null>(null)

  useEffect(() => {
    if (!loading && !error && userLocation) {
      const distanceInKm = calculateDistance(
        location.latitude,
        location.longitude,
        userLocation.latitude,
        userLocation.longitude
      )
      setDistance(distanceInKm)
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
      <SlOptionsVertical />
    </Card>
  )
}
