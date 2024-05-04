import { Title, Container } from './styles'

import flagRSIcon from '../../assets/icons/rs-flag.svg'

export const HeaderAlt = () => {
  return (
    <Container>
      <img src={flagRSIcon} width={100} alt="Bandeira do Rio Grande do Sul" />

      <Title>
        SOS
        <span>RS</span>
      </Title>
    </Container>
  )
}
