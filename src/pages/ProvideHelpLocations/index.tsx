import { useState } from 'react'

import { HeaderAlt } from '../../components/HeaderAlt'
import { Distances } from '../../components/Distances'
import { PersonCard } from '../../components/PersonCard'
import { Button } from '../../components/Button'
import { Modal } from '../../components/Modal'

import { Container, Title, ButtonContainer, ModalContent } from './styles'

export const ProvideHelpLocations = () => {
  const [openedModal, setOpenedModal] = useState(false)

  function closeModal() {
    setOpenedModal(false)
  }

  return (
    <>
      <Container>
        <HeaderAlt />

        <main>
          <Title>Listando pessoas a um raio de 10km de distância</Title>
          <Distances />

          <PersonCard />
          <ButtonContainer>
            <Button color="black">Atualizar</Button>
          </ButtonContainer>
        </main>
      </Container>
      <Modal isOpen={openedModal} onRequestClose={closeModal} contentLabel="Modal">
        <ModalContent>
          <h3>A pessoa que precisa de socorro se encontra em:</h3>
          <h3>Rua Abrobrinha, 388</h3>
          <p>OBS: Registro publicado há 10 minutos.</p>
          <button onClick={() => {}}>MAPA</button>
        </ModalContent>
              
      </Modal>
    </>
  )
}

