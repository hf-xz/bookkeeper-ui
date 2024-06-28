/*
  - 简单封装 fetch 请求 -
  @Auth: hfxz xuan__zai@outlook.com
 */

// 基础路径，会被反向代理
const BASE_URL = '/api'

// 基础请求
const request = async (url: string, config: RequestInit) => {
  // 处理非全路径请求
  if (!url.startsWith('http') && !url.startsWith('https')) {
    // 处理可能出现的重复 '/'
    if (BASE_URL.endsWith('/') && url.startsWith('/')) {
      url = BASE_URL + url.slice(1)
    } else if (!BASE_URL.endsWith('/') && !url.startsWith('/')) {
      url = BASE_URL + '/' + url
    } else url = BASE_URL + url
  }

  return fetch(url, config)
    .then((res) => {
      if (!res.ok) {
        // 服务器异常返回
        throw Error('接口请求异常')
      }
      return res.json()
    })
    .catch((err) => {
      console.log(err.message)
      return Promise.reject(err)
    })
}

// GET
const get = (url: string) => {
  return request(url, { method: 'GET' })
}

// POST
const post = (url: string, data: unknown) => {
  return request(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  })
}

// PUT
const put = (url: string, data: unknown) => {
  return request(url, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json'
    },
    method: 'PUT'
  })
}

// DELETE
const del = (url: string) => {
  return request(url, { method: 'DELETE' })
}

export const Fetch = {
  get,
  post,
  put,
  del
}
