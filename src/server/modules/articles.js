import request from "../index.js"

export const setArticlesData = (data) => {
  return request({
    url: "/articles/setData",
    method: "post",
    data
  })
}

export const getArticlesData = (params) => {
  return request({
    url: "/articles/getData",
    method: "get",
    params
  })
}

export const getArticlesItemData = (id) => {
  return request({
    url: "/articles/getItemData",
    method: "get",
    params: {
      id
    }
  })
}
