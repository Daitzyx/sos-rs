import { Card, Street, Distance, Details, MapButton } from './styles'
import { FaCircleUser } from 'react-icons/fa6'
import { SlOptionsVertical } from 'react-icons/sl'
import useReverseGeocoding from '../../hooks/useReverseGeoCoding'
import { useEffect } from 'react'

export const PersonCard = ({ user, ...props }: any) => {
  const mapsUrl = user.latitude && user.longitude && `https://www.google.com/maps/?q=${user.latitude},${user.longitude}`

  const { address, getAddressFromCoordinates, loading, error } = useReverseGeocoding()

  useEffect(() => {
    getAddressFromCoordinates(user.latitude, user.longitude)
  }, [user.latitude, user.longitude, getAddressFromCoordinates])

  return (
    <Card {...props}>
      <FaCircleUser size={50} />
      <Details>
        <Street>{address}</Street>
        <Distance>A 9 km de distância</Distance>
      </Details>
      <MapButton as="a" href={mapsUrl} target="_blank">
        MAPA
      </MapButton>
      <SlOptionsVertical />
    </Card>
  )
}

