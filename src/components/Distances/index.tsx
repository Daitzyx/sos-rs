import { Container, Title, Kms,  } from './styles'

export const Distances = () => {
  return (

    <Container>
        <Title><p>Distância:</p></Title>
        <Kms>
            <button>5km</button>
            <button>10km</button>
            <button>15km</button>
            <button>25km</button>
            <button>+50km</button>
        </Kms>
        

    </Container>
  )
}
