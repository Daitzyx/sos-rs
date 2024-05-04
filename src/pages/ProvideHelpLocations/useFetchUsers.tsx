import { useState, useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { db } from '../../libs/firebase'

const useFetchUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const usersRef = ref(db, 'emergencies') // Assumindo que os dados dos usuários estão armazenados em 'users'
    const unsubscribe = onValue(
      usersRef,
      (snapshot) => {
        const data = snapshot.val()
        const loadedUsers: any = []
        for (const key in data) {
          loadedUsers.push({
            id: key,
            ...data[key]
          })
        }
        setUsers(loadedUsers)
        setLoading(false)
      },
      (error) => {
        setError(error.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return { users, loading, error }
}

export default useFetchUsers

