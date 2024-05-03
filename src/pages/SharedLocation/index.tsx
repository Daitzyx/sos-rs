import { Container, Description, Title } from './styles'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { useNavigate } from 'react-router-dom'

export const SharedLocation = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <Header />

      <main>
        <Title>LOCALIZAÇÃO COMPARTILHADA</Title>
        <Description>
          A sua localização foi compartilhada com sucesso. Usuários que estiverem dispostos a ajudar, terão acesso à
          localização exata.
        </Description>
        <Button width="100%" color="black" onClick={() => navigate('/')}>
          Entendi
        </Button>
      </main>
    </Container>
  )
}

