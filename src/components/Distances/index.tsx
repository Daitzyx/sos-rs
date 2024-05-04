import { Container, Title, Kms } from './styles'
import { useState } from 'react'

export const Distances = ({ onSelectDistance }: any) => {
  const [selectedDistance, setSelectedDistance] = useState<number | null>(50)

  return (
    <Container>
      <Title>
        <p>Distância:</p>
      </Title>
      <Kms>
        <button
          onClick={() => {
            onSelectDistance(5)
            setSelectedDistance(5)
          }}
          style={{
            backgroundColor: selectedDistance === 5 ? 'black' : 'transparent',
            color: selectedDistance === 5 ? 'white' : 'black'
          }}
        >
          5km
        </button>
        <button
          onClick={() => {
            onSelectDistance(10)
            setSelectedDistance(10)
          }}
          style={{
            backgroundColor: selectedDistance === 10 ? 'black' : 'transparent',
            color: selectedDistance === 10 ? 'white' : 'black'
          }}
        >
          10km
        </button>
        <button
          onClick={() => {
            onSelectDistance(15)
            setSelectedDistance(15)
          }}
          style={{
            backgroundColor: selectedDistance === 15 ? 'black' : 'transparent',
            color: selectedDistance === 15 ? 'white' : 'black'
          }}
        >
          15km
        </button>
        <button
          onClick={() => {
            onSelectDistance(25)
            setSelectedDistance(25)
          }}
          style={{
            backgroundColor: selectedDistance === 25 ? 'black' : 'transparent',
            color: selectedDistance === 25 ? 'white' : 'black'
          }}
        >
          25km
        </button>
        <button
          onClick={() => {
            onSelectDistance(50)
            setSelectedDistance(50)
          }}
          style={{
            backgroundColor: selectedDistance === 50 ? 'black' : 'transparent',
            color: selectedDistance === 50 ? 'white' : 'black'
          }}
        >
          50km
        </button>
      </Kms>
    </Container>
  )
}

