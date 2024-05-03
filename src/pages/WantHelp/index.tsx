import { Container, Description, Form, Info, Title } from './styles'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import useWantHelpHook from './useWantHelpHook'
import { useState } from 'react'

export const WantHelp = () => {
  const { saveLocationToFirebase, loading, error, message } = useWantHelpHook()
  const [textareaData, setTextareaData] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    saveLocationToFirebase(textareaData)
    setTextareaData('') // Limpa o campo após o envio
  }

  return (
    <Container>
      <Header />

      <main>
        <Title>PRECISO DE AJUDA</Title>
        <Description>Por favor, compartilhe sua localização clicando no botão abaixo:</Description>

        <Form onSubmit={handleSubmit}>
          <textarea
            name="obs"
            id="obs"
            rows={10}
            value={textareaData}
            onChange={(e) => setTextareaData(e.target.value)}
            placeholder="Descreva alguma informação importante ou alguma observação"
          ></textarea>
          <Button width="100%" color="black" disabled={loading}>
            {loading ? 'Salvando...' : 'COMPARTILHAR LOCALIZAÇÃO'}
          </Button>

          {error && <p>Error: {error}</p>}

          {message && <Info>{message}</Info>}
        </Form>
      </main>
    </Container>
  )
}
