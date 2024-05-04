import { BiMapPin } from 'react-icons/bi'
import { SlOptionsVertical } from 'react-icons/sl'

import { Card, Street, Distance, Details, MapButton, Options } from './styles'

export const LocationCard = ({ location }: any) => {
  const address = `${location.street}, ${location.number}, ${location.district}, ${location.city}`
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
  return (
    <Card>
      <BiMapPin size={50} />
      <Details>
        <Street>
          {location.street}, {location.number}, {location.district}, {location.city}
        </Street>
        <Distance>A 9 km de distância</Distance> {/* Você pode calcular a distância real, se necessário */}
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