export default function postJson(url, data, api = true) {
  return fetch(new Request((api ? '/api' : '') + url, {
    credentials: 'include',
    cors: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method: 'POST'
  })).then(response => {
    console.log(response)
    return response.json()
  })
}