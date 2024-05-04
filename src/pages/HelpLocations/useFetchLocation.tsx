import { useState, useEffect } from 'react'
import { onValue, ref } from 'firebase/database'
import { db } from '../../libs/firebase'

const useFetchHelpLocations = () => {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const locationsRef = ref(db, 'helpPoints')
    const unsubscribe = onValue(
      locationsRef,
      (snapshot) => {
        const data = snapshot.val()
        const loadedLocations = []
        for (const key in data) {
          loadedLocations.push({
            id: key,
            ...data[key]
          })
        }
        setLocations(loadedLocations)
        setLoading(false)
      },
      (error) => {
        setError(error.message)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return { locations, loading, error }
}

export default useFetchHelpLocations
