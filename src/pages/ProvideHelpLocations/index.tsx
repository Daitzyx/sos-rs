import { useState, useEffect } from 'react'
import useFetchUsers from './useFetchUsers'
import { Link } from 'react-router-dom'
import useReverseGeocoding from '../../hooks/useReverseGeoCoding'


import { HeaderAlt } from '../../components/HeaderAlt'
import { Distances } from '../../components/Distances'
import { PersonCard } from '../../components/PersonCard'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'

import { Container, Title, ButtonContainer, ModalContent } from './styles'

function calculateTimeSincePublication(timestamp: string) {
  const selectedUserTimestamp = new Date(timestamp);
  const currentTime = new Date();

  const timeDifference = currentTime.getTime() - selectedUserTimestamp.getTime();
  const minutesSincePublication = Math.floor(timeDifference / (1000 * 60));
  const hoursSincePublication = Math.floor(timeDifference / (1000 * 60 * 60));

  let timeSincePublicationString;

  if (hoursSincePublication > 0) {
      timeSincePublicationString = `${hoursSincePublication} horas`;
  } else {
      timeSincePublicationString = `${minutesSincePublication} minutos`;
  }

  return `${timeSincePublicationString}`;
}

export const ProvideHelpLocations = () => {
  const [openedModal, setOpenedModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const { users, loading, error } = useFetchUsers()
  const { address, getAddressFromCoordinates } = useReverseGeocoding()
  

  function closeModal() {
    setOpenedModal(false)
  }

  function openModal(user: any) {    
    setSelectedUser(user)
    setOpenedModal(true)
  }

  useEffect(() => {
    if (selectedUser) {
      getAddressFromCoordinates(selectedUser.latitude, selectedUser.longitude);
    }
  }, [selectedUser, getAddressFromCoordinates]);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  
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
            <h3>{address}</h3>
            <h4>OBS: {selectedUser.observation}</h4>
            <p>Registro publicado há {calculateTimeSincePublication(selectedUser.timestamp)}.</p>
            <Link to={`https://www.google.com/maps/?q=${selectedUser.latitude},${selectedUser.longitude}`} target='_blank'>
              <button>MAPA
              </button>
            </Link>
          </ModalContent>
        )}
      </Modal>
    </>
  )
}

