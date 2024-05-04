import { Container, Title, Disclaimer, ButtonContainer } from './styles'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { Link } from 'react-router-dom'

export const ProvideHelp = () => {
  return (
    <Container>
      <Header />

      <main>

        <Title>QUERO AJUDAR</Title>
        <Disclaimer><b>Priorize sua segurança:</b> Certifique-se sempre de colocar sua segurança em primeiro lugar</Disclaimer>
        <ButtonContainer>
          <Link to="/quero-ajudar">
            <Button color="black">Entendi</Button>
          </Link>
        </ButtonContainer>
      </main>
    </Container>
  )
}
