import { FaCircleUser } from 'react-icons/fa6'
import { useEffect } from 'react'
import { SlOptionsVertical } from 'react-icons/sl'

import useReverseGeocoding from '../../hooks/useReverseGeoCoding'

import { Card, Street, Distance, Details, MapButton, Options } from './styles'

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
      <Options>
        <SlOptionsVertical />
      </Options>
    </Card>
  )
}

