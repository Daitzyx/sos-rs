import { Container, Title, Kms } from './styles'

export const Distances = ({ onSelectDistance }: any) => {
  // Recebe a função de filtragem como propriedade
  return (
    <Container>
      <Title>
        <p>Distância:</p>
      </Title>
      <Kms>
        <button onClick={() => onSelectDistance(5)}>5km</button>
        <button onClick={() => onSelectDistance(10)}>10km</button>
        <button onClick={() => onSelectDistance(15)}>15km</button>
        <button onClick={() => onSelectDistance(25)}>25km</button>
        <button onClick={() => onSelectDistance(50)}>+50km</button>
      </Kms>
    </Container>
  )
}
