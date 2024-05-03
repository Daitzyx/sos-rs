import { Container, Description, Form, Info, Title } from './styles'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const HelpPoints = () => {
  const [location, setLocation] = useState({
    name: '',
    street: '',
    number: '',
    district: '',
    city: ''
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = () => {
    setMessage('Cadastrado com sucesso!')
    navigate('/')
  }

  return (
    <Container>
      <Header />

      <main>
        <Title>PONTOS DE AJUDA</Title>
        <Description>
          Conhece algum ponto de ajuda?
          <br />
          Cadastre abaixo!
        </Description>

        <Form onSubmit={handleSubmit}>
          <input
            name="name"
            id="name"
            value={location.name}
            onChange={(e) => setLocation({ ...location, name: e.target.value })}
            placeholder="Nome do local"
          />
          <input
            name="street"
            id="street"
            value={location.street}
            onChange={(e) => setLocation({ ...location, street: e.target.value })}
            placeholder="Rua *"
          />
          <input
            name="number"
            id="number"
            value={location.number}
            onChange={(e) => setLocation({ ...location, number: e.target.value })}
            placeholder="Número *"
          />
          <input
            name="district"
            id="district"
            value={location.district}
            onChange={(e) => setLocation({ ...location, district: e.target.value })}
            placeholder="Bairro *"
          />
          <input
            name="city"
            id="city"
            value={location.city}
            onChange={(e) => setLocation({ ...location, city: e.target.value })}
            placeholder="Cidade *"
          />

          <Button width="100%" color="black" disabled={loading} onClick={handleSubmit}>
            {loading ? 'Salvando...' : 'Cadastrar'}
          </Button>

          {/* {error && <p>Error: {error}</p>} */}

          {message && <Info>{message}</Info>}
        </Form>
      </main>
    </Container>
  )
}

