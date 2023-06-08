
import request from '../index.js'

export const getApi = () => {
  return request({
    url: '/portfolio',
    method: 'get',
  });
}
export const login = (data) => {
  return request({
    url: '/login',
    method: 'post',
    data,
  });
}