import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { WantHelp } from '../pages/WantHelp'
import { SharedLocation } from '../pages/SharedLocation'
import { ProvideHelp } from '../pages/ProvideHelp'
import { HelpLocations } from '../pages/HelpLocations'
import { ProvideHelpLocations } from '../pages/ProvideHelpLocations'
import { HelpPoints } from '../pages/HelpPoints'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/preciso-ajuda" element={<WantHelp />} />
      <Route path="/localizacao-compartilhada" element={<SharedLocation />} />
      <Route path="/pontos-ajuda" element={<HelpLocations />} />
      <Route path="/quero-ajudar-disclaimer" element={<ProvideHelp />} />
      <Route path="/quero-ajudar" element={<ProvideHelpLocations />} />
      <Route path="/adicionar-ponto" element={<HelpPoints />} />
    </Routes>
  )
}

