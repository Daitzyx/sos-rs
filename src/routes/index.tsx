import { Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { WantHelp } from '../pages/WantHelp'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/preciso-ajuda" element={<WantHelp />} />
    </Routes>
  )
}
