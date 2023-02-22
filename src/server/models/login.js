import request from '@/server/index'

export function login(name, password) {
  return request({
    url: "/login",
    method: "post",
    data: {
      name,
      password
    }
  });
}
export function postRegister(name, password) {
  return request({
    url: "/register",
    method: "post",
    data: {
      name,
      password
    }
  });
}
