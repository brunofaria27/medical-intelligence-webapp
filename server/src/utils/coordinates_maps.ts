import { Coordinates } from '../models/Coordinates'

export async function getCoordinate(address: string) {
  try {
    const apiKey = process.env.API_MAPS
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
    )
    const data = await response.json()

    if (data.status === 'OK' && data.results.length > 0) {
      const location = data.results[0].geometry.location
      const locationType: Coordinates = {
        latitude: location.lat,
        longitude: location.lng,
      }
      return locationType
    } else {
      console.error('Endereço não encontrado')
    }
  } catch (error) {
    console.error('Erro ao buscar coordenadas:', error)
  }
}

