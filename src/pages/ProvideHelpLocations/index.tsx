import { useState } from 'react'
import useFetchUsers from './useFetchUsers'
import { Link } from 'react-router-dom'

import { HeaderAlt } from '../../components/HeaderAlt'
import { Distances } from '../../components/Distances'
import { PersonCard } from '../../components/PersonCard'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'

import { Container, Title, ButtonContainer, PaginateButtons, ModalContent } from './styles'
import useUserLocation from '../../hooks/useUserLocation'
import { calculateDistance } from '../../utils/calculate'
import { LoadingSpin } from '../../components/LoadingSpin'
import usePagination from '../../hooks/usePagination'

function calculateTimeSincePublication(timestamp: string) {
  const selectedUserTimestamp = new Date(timestamp)
  const currentTime = new Date()

  const timeDifference = currentTime.getTime() - selectedUserTimestamp.getTime()
  const minutesSincePublication = Math.floor(timeDifference / (1000 * 60))
  const hoursSincePublication = Math.floor(timeDifference / (1000 * 60 * 60))

  let timeSincePublicationString

  if (hoursSincePublication > 0) {
    timeSincePublicationString = `${hoursSincePublication} horas`
  } else {
    timeSincePublicationString = `${minutesSincePublication} minutos`
  }

  return `${timeSincePublicationString}`
}

export const ProvideHelpLocations = () => {
  const [openedModal, setOpenedModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [selectedDistance, setSelectedDistance] = useState(50)
  const { users } = useFetchUsers()
  const { userLocation, loading } = useUserLocation()

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
    setOpenedModal(true)
    const mapsUrl =
      user.latitude && user.longitude && `https://www.google.com/maps/?q=${user.latitude},${user.longitude}`

    const { address, observation, timestamp } = user
    const addressParts = address.split(',').filter((part: any) => part.trim() !== 'undefined')
    const formattedAddress = addressParts.join(', ')
    const selectedUserData = {
      address: formattedAddress,
      observation: observation,
      mapsUrl,
      timestamp: timestamp
    }
    setSelectedUser(selectedUserData)
  }

  const { nextPage, prevPage, currentItems } = usePagination(filteredUsers, 10)

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
          {loading && <LoadingSpin />}

          {filteredUsers.length === 0 && (
            <p style={{ textAlign: 'center', padding: '15px' }}>Nada reportado até o momento!</p>
          )}

          <PaginateButtons>
            {currentItems.length > 0 && (
              <Button width="25%" onClick={prevPage}>
                Anterior
              </Button>
            )}

            {filteredUsers.length > 0 && (
              <Button width="25%" onClick={nextPage}>
                Próxima
              </Button>
            )}
          </PaginateButtons>
          <ButtonContainer>
            <Button width="100%" color="yellow">
              ATUALIZAR
            </Button>
            <Link to="/">
              <Button width="100%" color="black">
                VOLTAR
              </Button>
            </Link>
          </ButtonContainer>
        </main>
      </Container>

      <Modal isOpen={openedModal} onRequestClose={closeModal} contentLabel="Modal">
        {selectedUser && (
          <ModalContent>
            <h3>A pessoa que precisa de socorro se encontra em:</h3>
            <h3>{selectedUser.address}</h3>
            <h4>OBS: {selectedUser.observation}</h4>
            <p style={{ color: '#e31e24' }}>
              Solicitação feita há{' '}
              {selectedUser.timestamp !== 'NaN' && calculateTimeSincePublication(selectedUser.timestamp)}
            </p>

            <Link to={selectedUser.mapsUrl} target="_blank">
              <button>MAPA</button>
            </Link>
          </ModalContent>
        )}
      </Modal>
    </>
  )
}
