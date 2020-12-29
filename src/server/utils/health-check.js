import axios from 'axios'

const healthCheck = async (endpoint) => {
  try {
    console.info('Performing health check...')
    const response = await axios.get(endpoint)
    console.log('Health Check Result:', response.status, response.data)
  } catch (err) {
    console.error('Error performing health check', err)
  }
}

export default healthCheck
