import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { HeaderAlt } from '../../components/HeaderAlt'
import { LocationCard } from '../../components/LocationCard'
import { Distances } from '../../components/Distances'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'

import useFetchHelpLocations from './useFetchLocation'
import useFetchUsers from '../ProvideHelpLocations/useFetchUsers'
import useReverseGeocoding from '../../hooks/useReverseGeoCoding'

import { ButtonContainer, Container, Title, ModalContent } from './styles'

export const HelpLocations = () => {
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

  const { locations } = useFetchHelpLocations()
  const navigate = useNavigate()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <>
    <Container>
      <HeaderAlt />

      <main>
        <Title>PONTOS DE AJUDA</Title>
        <Distances />

        {locations.map((location: any) => (
          <LocationCard key={location.id} location={location} onClick={() => openModal(location)} />
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
        <h3>{address}</h3>
        <h4>OBS: {selectedUser.observation}</h4>        
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

