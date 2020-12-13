import axios from 'axios'
const baseUrl = '/api/blogs'
import authToken from './auth-header'

let token = `bearer ${authToken()}`


const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl,config)
  const response = await request
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const comment = async (id,newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(`${ baseUrl }/${id}/comments`, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${ baseUrl }/${id}`, newObject, config)
  return response.data
}
const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${ baseUrl }/${id}`, config)
  return response.data
}

export default { getAll, create, update, remove, comment }