import { useState } from 'react'
import { ref, set, push } from 'firebase/database'
import { db } from '../../libs/firebase'
import { useNavigate } from 'react-router-dom'
import { fetchAddressData } from '../../services/cep'

const useRegisterHelpPoint = () => {
  const [location, setLocation] = useState({
    cep: '',
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

  const handleBlurCep = async () => {
    const cep = location.cep.trim().replace('-', '')

    if (cep.length !== 8) {
      setError('CEP inválido. O CEP deve conter 8 dígitos.')
      return
    }

    setLoading(true)
    setError('')

    const addressData = await fetchAddressData(cep)

    if (!addressData) {
      setError('CEP inválido ou não encontrado. Por favor, verifique e tente novamente.')
    } else {
      setLocation({
        ...location,
        street: addressData.logradouro,
        district: addressData.bairro,
        city: addressData.localidade
      })
    }

    setLoading(false)
  }

  const getAddressCoordinates = async (address: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=AIzaSyABsgLbHflDfzvONwFN28h6KyyuKTPejdE`
      )
      const data = await response.json()
      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location
        return {
          latitude: location.lat,
          longitude: location.lng
        }
      } else {
        throw new Error('Endereço não encontrado')
      }
    } catch (error: any) {
      console.error('Erro ao obter coordenadas do endereço:', error.message)
      return null
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!location.street || !location.number || !location.district || !location.city) {
      setError('Todos os campos são obrigatórios')
      return
    }

    setLoading(true)
    setMessage('')
    setError(null)

    try {
      const address = `${location.street}, ${location.number}, ${location.district}, ${location.city}`
      const coordinates = await getAddressCoordinates(address)
      if (!coordinates) {
        throw new Error('Coordenadas não encontradas para o endereço fornecido')
      }

      const newHelpPointRef = push(ref(db, 'helpPoints'))
      await set(newHelpPointRef, {
        cep: location.cep,
        name: location.name,
        street: location.street,
        number: location.number,
        district: location.district,
        city: location.city,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
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

  return { location, setLocation, loading, message, error, handleSubmit, handleBlurCep }
}

export default useRegisterHelpPoint
