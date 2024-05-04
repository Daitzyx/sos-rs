import styled from 'styled-components'

export const Container = styled.div`
  max-width: 312px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  justify-content: center;
`

export const Title = styled.div`
  align-items: flex-start;
`

export const Kms = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;

  button {
    border: solid 1px black;
    padding: 6px 10px;
    border-radius: 30px;
  }

  button:hover {
    background: black;
    color: white;
    cursor: pointer;
  }
`
