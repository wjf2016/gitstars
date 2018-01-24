import axios from 'axios'
// import { Notification } from 'element-ui'
import config from './config'

axios.defaults.baseURL = 'https://api.github.com'

axios.interceptors.request.use(reqConfig => {
  if (reqConfig.url.includes('http')) return reqConfig

  reqConfig.url += reqConfig.url.includes('?') ? '&' : '?'
  reqConfig.url += `access_token=${config.accessToken}`
  return reqConfig
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use(({ data }) => {
  return data
}, err => {
  let message = err.message
  const { response = {} } = err
  const { status, statusText, data } = response

  if (data) message = data.message
  // Notification.error({
  //   message,
  //   title: `${status} ${statusText}`,
  //   showClose: false
  // })
  return Promise.reject(err)
})

const { filename, description, starredReposPerPage, gistId } = config

// https://developer.github.com/v3/users/#get-the-authenticated-user
export const getUserInfo = () => axios.get(`/user`)

// https://developer.github.com/v3/gists/#create-a-gist
export const createGitstarsGist = content => {
  return axios.post('/gists', {
    description,
    public: true,
    files: {
      [filename]: {
        content: JSON.stringify(content)
      }
    }
  })
}

// https://developer.github.com/v3/gists/#get-a-single-gist
export const getGitstarsGist = id => axios.get(`/gists/${id}`)

// https://developer.github.com/v3/gists/#list-a-users-gists
export const getUserGists = () => axios.get(`/users/${window._gitstars.user.login}/gists`)

// https://developer.github.com/v3/activity/starring/#list-repositories-being-starred
export const getStarredRepos = page => {
  const params = { page, per_page: starredReposPerPage }
  return axios.get(`/users/${window._gitstars.user.login}/starred`, { params })
}

// https://developer.github.com/v3/repos/contents/#get-the-readme
export const getRepoReadme = (login, name) => axios.get(`/repos/${login}/${name}/readme`)

// https://developer.github.com/v3/markdown/#render-a-markdown-document-in-raw-mode
export const getRenderedReadme = data => {
  return axios({
    data,
    url: `/markdown/raw`,
    method: 'post',
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}

// https://developer.github.com/v3/gists/
export const saveGitstarsGist = (tags) => {
  return axios.patch(`/gists/${gistId}`, {
    files: {
      [filename]: {
        content: JSON.stringify({ lastModified: Date.now(), tags })
      }
    }
  })
}
