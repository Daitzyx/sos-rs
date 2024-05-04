import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { HeaderAlt } from '../../components/HeaderAlt'
import { LocationCard } from '../../components/LocationCard'
import { Distances } from '../../components/Distances'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'
import useFetchHelpLocations from './useFetchLocation'
import { calculateDistance } from '../../utils/calculate'
import useUserLocation from '../../hooks/useUserLocation'

import useFetchUsers from '../ProvideHelpLocations/useFetchUsers'

import { ButtonContainer, Container, Title, ModalContent } from './styles'

export const HelpLocations = () => {
  const [openedModal, setOpenedModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const { loading, error } = useFetchUsers()

  function closeModal() {
    setOpenedModal(false)
  }

  function openModal(user: any) {
    setSelectedUser(user)
    setOpenedModal(true)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
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
    <>
      <Container>
        <HeaderAlt />

        <main>
          <Title>PONTOS DE AJUDA</Title>
          <Distances onSelectDistance={filterLocationsByDistance} />

          {filteredLocations.map((location: any) => (
            <LocationCard key={location.id} location={location} />
          ))}
          <ButtonContainer>
            <Button color="black" onClick={() => navigate('/adicionar-ponto')}>
              Adicionar
            </Button>
          </ButtonContainer>
        </main>
      </Container>
      <Modal isOpen={openedModal} onRequestClose={closeModal} contentLabel="Modal">
        {selectedUser && (
          <ModalContent>
            <h3>A pessoa que precisa de socorro se encontra em:</h3>
            <h3>{selectedUser.address}</h3>
            <h4>OBS: {selectedUser.observation}</h4>
            <Link
              to={`https://www.google.com/maps/?q=${selectedUser.latitude},${selectedUser.longitude}`}
              target="_blank"
            >
              <button>MAPA</button>
            </Link>
          </ModalContent>
        )}
      </Modal>
    </>
  )
}

