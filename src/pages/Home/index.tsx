import { ButtonsContainer, Container, Info, Main } from './styles'

import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <Container>
      <Header />

      <Main>
        <ButtonsContainer>
          <Link to="preciso-ajuda">
            <Button color="red">PRECISO DE AJUDA</Button>
          </Link>
          <Link to="/quero-ajudar-disclaimer">
            <Button color="yellow">QUERO AJUDAR</Button>
          </Link>
          <Link to="pontos-ajuda">
            <Button color="black">PONTOS DE AJUDA</Button>
          </Link>
        </ButtonsContainer>
        <Info>
          Por favor, esteja ciente de que este aplicativo não é uma iniciativa oficial do governo. Foi criado com o
          propósito de unir a comunidade em tempos de necessidade, para que possamos nos ajudar mutuamente durante as
          enchentes.
        </Info>
      </Main>
    </Container>
  )
}

