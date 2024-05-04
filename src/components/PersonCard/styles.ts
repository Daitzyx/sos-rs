import styled from 'styled-components'


export const Card = styled.div` 
  
  box-shadow: 1px 1px 5px black;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  gap: 5px;

`

export const MapButton = styled.button`
  background: black;
  padding: 3px 15px;
  color: white;
  border-radius: 15px;

`

export const Details = styled.div`
  display: flex;
  flex: 1;
  gap: 5px;
  flex-direction: column;
  justify-content: center;

  padding: 5px;

`

export const Street = styled.p`
  font-Size: 14px;
  font-weight: 700;

`

export const Distance = styled.p`  
  font-size: 12px;
  font-weight: 600;

`