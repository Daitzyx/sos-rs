import { useState } from 'react'
import useFetchUsers from './useFetchUsers'

import { HeaderAlt } from '../../components/HeaderAlt'
import { Distances } from '../../components/Distances'
import { PersonCard } from '../../components/PersonCard'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'

import { Container, Title, ButtonContainer, ModalContent } from './styles'

export const ProvideHelpLocations = () => {
  const [openedModal, setOpenedModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const { users, loading, error } = useFetchUsers()

  function closeModal() {
    setOpenedModal(false)
  }

  function openModal(user: any) {
    setSelectedUser(user)
    setOpenedModal(true)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  console.log(users, 'users')
  return (
    <>
      <Container>
        <HeaderAlt />

        <main>
          <Title>Listando pessoas a um raio de 10km de distância</Title>
          <Distances />

          {users.map((user: any) => (
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

