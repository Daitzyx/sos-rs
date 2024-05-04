import { HeaderAlt } from '../../components/HeaderAlt'
import { LocationCard } from '../../components/LocationCard'
import { Distances } from '../../components/Distances'
import { Button } from '../../components/Button'
import useFetchHelpLocations from './useFetchLocation'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { calculateDistance } from '../../utils/calculate'
import useUserLocation from '../../hooks/useUserLocation'

import { ButtonContainer, Container, Title } from './styles'

export const HelpLocations = () => {
  const { locations } = useFetchHelpLocations()
  const [selectedDistance, setSelectedDistance] = useState(null)
  const navigate = useNavigate()
  const { userLocation } = useUserLocation()

  const filterLocationsByDistance = (distance: any) => {
    setSelectedDistance(distance)
  }

  const filteredLocations =
    selectedDistance && location
      ? locations.filter((location: any) => {
          console.log(location)
          const distance = calculateDistance(
            locations.latitude,
            locations.longitude,
            userLocation?.latitude,
            userLocation?.longitude
          )
          return distance <= selectedDistance
        })
      : locations

  return (
    <Container>
      <HeaderAlt />

      <main>
        <Title>PONTOS DE AJUDA</Title>
        <Distances onSelectDistance={filterLocationsByDistance} />

        {filteredLocations.map((location: any) => (
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
