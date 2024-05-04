import { useState } from 'react'
import { ref, set, push } from 'firebase/database'
import { db } from '../../libs/firebase'
import { useNavigate } from 'react-router-dom'
import { fetchAddressData } from '../../services/cep'
import useGeocoding from '../../hooks/useGeocoding'

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

  const { coordinates, getCoordinatesFromAddress } = useGeocoding()

  const handleBlurCep = async () => {
    const cep = location.cep

    if (cep.trim().length !== 8) {
      // Verifica se o CEP tem 8 dígitos
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

      getCoordinatesFromAddress({
        street: addressData.logradouro,
        district: addressData.bairro,
        city: addressData.localidade
      })
    }

    setLoading(false)
  }

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
    console.log(coordinates.latitude, coordinates.longitude)
    try {
      await set(newHelpPointRef, {
        cep: location.cep,
        name: location.name,
        street: location.street,
        number: location.number,
        district: location.district,
        city: location.city,
        latitude: coordinates.latitude, // Inclua a latitude
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
