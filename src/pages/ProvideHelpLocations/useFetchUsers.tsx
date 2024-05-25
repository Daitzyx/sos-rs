import { useState, useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { db } from '../../libs/firebase'
import useUserLocation from '../../hooks/useUserLocation'
import { calculateDistance } from '../../utils/calculate'

interface Emergencie {
  address: string
  latitude: number
  longitude: number
  observation: string
  timestamp: Date
}

const useFetchUsers = () => {
  const [users, setUsers] = useState<Emergencie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { userLocation } = useUserLocation()

  useEffect(() => {
    const usersRef = ref(db, 'emergencies')
    const unsubscribe = onValue(
      usersRef,
      (snapshot) => {
        const data = snapshot.val()
        const loadedUsers: Emergencie[] = []
        for (const key in data) {
          const user: Emergencie = {
            id: key,
            ...data[key],
            distance: calculateDistance(
              data[key].latitude,
              data[key].longitude,
              userLocation?.latitude as number,
              userLocation?.longitude as number
            )
          }
          loadedUsers.push(user)
        }
        setUsers(loadedUsers)
        setLoading(false)
      },
      (error: any) => {
        setError(error.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [userLocation]) // Execute o efeito novamente sempre que a localização do usuário mudar

  return { users, loading, error }
}

export default useFetchUsers
