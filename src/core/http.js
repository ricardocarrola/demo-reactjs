import axios from 'axios'

export const httpGet = (url) => {
  return axios
    .post(
      url,
      {},
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${externalUserJWT}`,
          // Refresh: `${externalUserRefreshToken}`,
        },
        withCredentials: true,
      },
    )
    .catch((error) => {
      console.log(error)
    })
}

export const httpPost = (url, body) => {
  return axios
    .post(url, body, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${externalUserJWT}`,
        // Refresh: `${externalUserRefreshToken}`,
      },
      withCredentials: true,
    })

    .catch((error) => {
      console.log(error)
    })
}
