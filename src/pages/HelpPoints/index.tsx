import { Container, Description, Form, Info, Title } from './styles'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import useRegisterHelpPoint from './useRegisterHelpPoint'

export const HelpPoints = () => {
  const { location, setLocation, loading, message, error, handleSubmit } = useRegisterHelpPoint()

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

          <Button type="submit" width="100%" color="black" disabled={loading}>
            {loading ? 'Salvando...' : 'Cadastrar'}
          </Button>

          {error && <Info>{error}</Info>}
          {message && <Info>{message}</Info>}
        </Form>
      </main>
    </Container>
  )
}

