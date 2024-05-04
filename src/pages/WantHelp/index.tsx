import { Container, Description, Form, Info, Title, OBS } from './styles'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import useWantHelpHook from './useWantHelpHook'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const WantHelp = () => {
  const { saveLocationToFirebase, loading, error, message } = useWantHelpHook()
  const [textareaData, setTextareaData] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    saveLocationToFirebase(textareaData)
    setTextareaData('')
  }

  return (
    <Container>
      <Header />

      <main>
        <Title>PRECISO DE AJUDA</Title>
        <Description>Por favor, compartilhe sua localização clicando no botão abaixo:</Description>
        <OBS>OBS: Apenas compartilhe se você realmente precisa de ajuda.</OBS>
        <Form onSubmit={handleSubmit}>
          <textarea
            name="obs"
            id="obs"
            rows={10}
            value={textareaData}
            onChange={(e) => setTextareaData(e.target.value)}
            placeholder="Descreva alguma informação importante ou alguma observação"
          ></textarea>
          <Button width="100%" color="yellow" disabled={loading}>
            {loading ? 'Salvando...' : 'COMPARTILHAR LOCALIZAÇÃO'}
          </Button>

          {error && <p>Error: {error}</p>}

          {message && <Info>{message}</Info>}
        </Form>
        <Link to="/">
          <Button width='100%' color='black'>VOLTAR</Button>
        </Link>
      </main>
    </Container>
  )
}
