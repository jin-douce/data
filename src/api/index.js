import axios from 'axios'
import request from '../utils/request'

axios.interceptors.response.use(response => {
  return response.data;
})

export function getData() {
  return request({
    url: '/screen',
    method: 'get'
  })
}

export function getEqpData() {
  return axios({
    url: 'http://192.168.31.221:8000/go',
    method: 'get'
  })
}
