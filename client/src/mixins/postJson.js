export default function postJson(url, data) {
  return fetch(new Request('/api' + url, {
    credentials: 'include',
    cors: 'no-cors',
    body: JSON.stringify(data),
    method: 'POST'
  })).then(response => response.json())
}