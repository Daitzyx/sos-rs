import { Card, Street, Distance, Details, MapButton,    } from './styles'
import { BiMapPin } from "react-icons/bi";
import { SlOptionsVertical } from "react-icons/sl";


export const LocationCard = () => {
    return (      
      <Card>
        <BiMapPin size={50}/>
        <Details>
          <Street>Rua Abrobrinha</Street>
          <Distance>A 9 km de distância</Distance>
        </Details>
        <MapButton>MAPA</MapButton>
        <SlOptionsVertical />
      </Card>       
     
    )
  }
  