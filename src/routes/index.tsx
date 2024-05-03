import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { WantHelp } from '../pages/WantHelp'
import { SharedLocation } from '../pages/SharedLocation'
import { WantToHelp } from '../pages/WantToHelp'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/preciso-ajuda" element={<WantHelp />} />
      <Route path="/localizacao-compartilhada" element={<SharedLocation />} />
      <Route path="/quero-ajudar" element={<WantToHelp />} />
    </Routes>
  )
}

