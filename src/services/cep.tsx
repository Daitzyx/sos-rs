import axios from 'axios'

export const fetchAddressData = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

    if (!response.data.erro) {
      return response.data // Retorna os dados do endereço
    } else {
      return null // O CEP não foi encontrado
    }
  } catch (error) {
    console.error('Erro ao buscar endereço:', error)
    return null // Ocorreu um erro ao tentar buscar o endereço
  }
}
