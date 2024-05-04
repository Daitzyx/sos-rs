import { useNavigate } from 'react-router-dom'

import { HeaderAlt } from '../../components/HeaderAlt'
import { LocationCard } from '../../components/LocationCard'
import { Distances } from '../../components/Distances'
import { Button } from '../../components/Button'
import useFetchHelpLocations from './useFetchLocation'

import { ButtonContainer, Container, Title } from './styles'

export const HelpLocations = () => {
  const { locations, loading, error } = useFetchHelpLocations()
  const navigate = useNavigate()
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <Container>
      <HeaderAlt />

      <main>
        <Title>PONTOS DE AJUDA</Title>
        <Distances />

        {locations.map((location: any) => (
          <LocationCard key={location.id} location={location} />
        ))}

        <ButtonContainer>
          <Button color="black" onClick={() => navigate('/pontos-ajuda-criar')}>
            Adicionar
          </Button>
        </ButtonContainer>
      </main>
    </Container>
  )
}

