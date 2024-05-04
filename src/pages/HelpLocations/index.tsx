import { Link } from 'react-router-dom'

import { HeaderAlt } from '../../components/HeaderAlt'
import { LocationCard } from '../../components/LocationCard'
import { Distances } from '../../components/Distances'
import { Button } from '../../components/Button'

import { Container, Title, ButtonContainer } from './styles'

export const HelpLocations = () => {
  return (
    <Container>
      <HeaderAlt />

      <main>
        <Title>PONTOS DE AJUDA</Title>
        <Distances />
        
          <LocationCard />
        <ButtonContainer>
          <Link to="/adicionar-ponto" >
            <Button color="black">Adicionar</Button>
          </Link>
        </ButtonContainer>
      </main>
    </Container>
  )
}
