import { useState } from 'react'
import useFetchUsers from './useFetchUsers'
import { Link } from 'react-router-dom'

import { HeaderAlt } from '../../components/HeaderAlt'
import { Distances } from '../../components/Distances'
import { PersonCard } from '../../components/PersonCard'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'

import { Container, Title, ButtonContainer, ModalContent } from './styles'
import useUserLocation from '../../hooks/useUserLocation'
import { calculateDistance } from '../../utils/calculate'

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
  const { userLocation } = useUserLocation()
  const [link, setLink] = useState('')

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
    console.log(user.address)
    const addressParts = user.address.split(',').filter((part) => part.trim() !== 'undefined')
    const address = addressParts.join(', ')
    setSelectedUser(address)
  }

  /*   filterUsersByDistance(50) */

  // useEffect(() => {
  //   if (selectedUser) {
  //     getAddressFromCoordinates(selectedUser.latitude, selectedUser.longitude);
  //   }
  // }, [selectedUser, getAddressFromCoordinates]);

  // }, [])

  // }, [])
  /* useEffect(() => {
  }, []) */

  // filterUsersByDistance(50)

  console.log(selectedUser)
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
            <h3>{selectedUser}</h3>
            <h4>OBS: {selectedUser.observation}</h4>

            {/*   <Link to={link} target="_blank">
              <button>MAPA</button>
            </Link> */}
          </ModalContent>
        )}
      </Modal>
    </>
  )
}

