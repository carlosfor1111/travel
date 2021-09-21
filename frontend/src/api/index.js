import axios from 'axios'

const serverURI = 'http://localhost:3001'

const API = {
  fetchJourneys: async () => {
    const res = await axios.get(`${serverURI}/api/journeys`)
    return res.data
  },
  fetchJourney: async (id) => {
    const res = await axios.get(`${serverURI}/api/journeys/${id}`)
    return res.data
  },
  toggleJourneyLike: async (id) => {
    await axios.put(`${serverURI}/api/journeys/${id}/like`)
  },
}

export default API
