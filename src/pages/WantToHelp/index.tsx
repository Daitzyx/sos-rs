import { Container, Description, Title } from './styles'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'

export const WantToHelp = () => {
  return (
    <Container>
      <Header />

      <main>
        <Title>QUERO AJUDAR</Title>
        <Description>
          <b>Priorize sua segurança:</b> Certifique-se sempre de colocar sua segurança em primeiro lugar
        </Description>

        <Button width="100%" color="black">
          Entendi
        </Button>
      </main>
    </Container>
  )
}

