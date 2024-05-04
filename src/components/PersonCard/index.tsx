import { Card, Street, Distance, Details, MapButton,    } from './styles'
import { FaCircleUser } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";


export const PersonCard = () => {
    return (      
      <Card>
        <FaCircleUser size={50}/>
        <Details>
          <Street>Rua Abrobrinha</Street>
          <Distance>A 9 km de distância</Distance>
        </Details>
        <MapButton>MAPA</MapButton>
        <SlOptionsVertical />
      </Card>       
     
    )
  }
  