import { Container, Title, ButtonContainer } from './styles'
import { HeaderAlt } from '../../components/HeaderAlt'
import { LocationCard } from '../../components/LocationCard'
import { Distances } from '../../components/Distances'
import { Button } from '../../components/Button'


export const HelpLocations = () => {
  return (
    <Container>
      <HeaderAlt />

      <main>
        <Title>PONTOS DE AJUDA</Title>
        <Distances />
        
          <LocationCard />
        <ButtonContainer>       
          <Button color="black">Adicionar</Button>
        </ButtonContainer>
      </main>
    </Container>
  )
}
