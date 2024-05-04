// import { useState, useEffect } from 'react'

// const useReverseGeocoding = () => {
//   const [address, setAddress] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [cachedCoordinates, setCachedCoordinates] = useState({ latitude: null, longitude: null })

//   const getAddressFromCoordinates = async (latitude: any, longitude: any) => {
//     if (latitude === cachedCoordinates.latitude && longitude === cachedCoordinates.longitude) {
//       return
//     }

//     setLoading(true)
//     // try {
//     //   const response = await fetch(
//     //     `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//     //   )
//     //   const data = await response.json()
//     //   if (data.error) {
//     //     setError(data.error)
//     //     setAddress('')
//     //   } else {
//     //     setAddress(data.display_name)
//     //   }
//     // } catch (err: any) {
//     //   setError(err.message)
//     //   setAddress('')
//     // } finally {
//     //   setLoading(false)
//     // }
//   }

//   // useEffect(() => {
//   //   getAddressFromCoordinates(cachedCoordinates.latitude, cachedCoordinates.longitude)
//   // }, [cachedCoordinates])

//   const updateCachedCoordinates = (latitude: any, longitude: any) => {
//     setCachedCoordinates({ latitude, longitude })
//   }

//   return { address, getAddressFromCoordinates, updateCachedCoordinates, loading, error }
// }

// export default useReverseGeocoding
