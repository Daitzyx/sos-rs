import { ButtonsContainer, Container } from './styles'

import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <Container>
      <Header />

      <main>
        <ButtonsContainer>
          <Link to="preciso-ajuda">
            <Button color="red">PRECISO DE AJUDA</Button>
          </Link>
          <Button color="yellow">QUERO AJUDAR</Button>
        </ButtonsContainer>
      </main>
    </Container>
  )
}
