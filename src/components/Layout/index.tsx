import { ReactNode } from 'react'
import { Header } from '../Header'

import { Container } from './styles'

interface AppLayoutProps {
  children: ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  )
}
