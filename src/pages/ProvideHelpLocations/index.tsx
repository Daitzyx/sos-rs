import { useState } from 'react'
import useFetchUsers from './useFetchUsers'

import { HeaderAlt } from '../../components/HeaderAlt'
import { Distances } from '../../components/Distances'
import { PersonCard } from '../../components/PersonCard'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'

import { Container, Title, ButtonContainer, ModalContent } from './styles'
import useUserLocation from '../../hooks/useUserLocation'
import { calculateDistance } from '../../utils/calculate'

export const ProvideHelpLocations = () => {
  const [openedModal, setOpenedModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedDistance, setSelectedDistance] = useState(null)
  const { users } = useFetchUsers()
  const { userLocation } = useUserLocation()

  const filterUsersByDistance = (distance: any) => {
    setSelectedDistance(distance)
  }

  const filteredUsers =
    selectedDistance && userLocation
      ? users
          .map((user: any) => ({
            ...user,
            distance: calculateDistance(user.latitude, user.longitude, userLocation.latitude, userLocation.longitude)
          }))
          .filter((user: any) => user.distance <= selectedDistance)
          .sort((a: any, b: any) => a.distance - b.distance)
      : users

  function closeModal() {
    setOpenedModal(false)
  }

  function openModal(user: any) {
    setSelectedUser(user)
    setOpenedModal(true)
  }

  return (
    <>
      <Container>
        <HeaderAlt />

        <main>
          <Title>Listando pessoas a um raio de {selectedDistance}km de distância</Title>
          <Distances onSelectDistance={filterUsersByDistance} />
          {filteredUsers.map((user: any) => (
            <PersonCard key={user.id} user={user} onClick={() => openModal(user)} />
          ))}
          <ButtonContainer>
            <Button color="black">Atualizar</Button>
          </ButtonContainer>
        </main>
      </Container>
      <Modal isOpen={openedModal} onRequestClose={closeModal} contentLabel="Modal">
        {selectedUser && (
          <ModalContent>
            <h3>A pessoa que precisa de socorro se encontra em:</h3>
            <h3>Rua Abrobrinha, 388</h3>
            <p>OBS: Registro publicado há 10 minutos.</p>
            <button onClick={() => {}}>MAPA</button>
          </ModalContent>
        )}
      </Modal>
    </>
  )
}
