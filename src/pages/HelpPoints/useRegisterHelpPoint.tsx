import { useState } from 'react'
import { ref, set, push } from 'firebase/database'
import { db } from '../../libs/firebase'
import { useNavigate } from 'react-router-dom'

const useRegisterHelpPoint = () => {
  const [location, setLocation] = useState({
    name: '',
    street: '',
    number: '',
    district: '',
    city: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState<null | string>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!location.name || !location.street || !location.number || !location.district || !location.city) {
      setError('Todos os campos são obrigatórios')
      return
    }

    setLoading(true)
    setMessage('')
    setError(null)

    const newHelpPointRef = push(ref(db, 'helpPoints'))

    try {
      await set(newHelpPointRef, {
        name: location.name,
        street: location.street,
        number: location.number,
        district: location.district,
        city: location.city
      })
      setLoading(false)
      setMessage('Cadastrado com sucesso!')
      navigate('/')
    } catch (error: any) {
      console.log(error, 'error')
      setError('Falha ao salvar dados: ' + error.message)
      setLoading(false)
    }
  }

  return { location, setLocation, loading, message, error, handleSubmit }
}

export default useRegisterHelpPoint

