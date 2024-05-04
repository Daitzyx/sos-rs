import { ThemeProvider } from 'styled-components'
import { AppRoutes } from './routes'
import { GlobalStyles } from './styles/GlobalStyles'
import { theme } from './styles/Theme'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'

import { logEvent } from 'firebase/analytics'
import { analytics } from './libs/firebase'

logEvent(analytics, 'button_click', {
  item: 'share button'
})

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppRoutes />
        <Analytics />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App

