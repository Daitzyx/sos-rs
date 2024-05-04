import { HeaderAlt } from '../../components/HeaderAlt'
import { LocationCard } from '../../components/LocationCard'
import { Distances } from '../../components/Distances'
import { Button } from '../../components/Button'
import useFetchHelpLocations from './useFetchLocation'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
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
    selectedDistance && userLocation
      ? locations.filter((location: any) => {
          const distance = calculateDistance(
            location.latitude,
            location.longitude,
            userLocation.latitude,
            userLocation.longitude
          )
          return distance <= selectedDistance
        })
      : locations
  console.log(filteredLocations, 'filteredLocations')
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

