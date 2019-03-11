
/**
 * Código baseado no BooksAPI.js do projeto myReads da Udacity
 */
const api = "http://localhost:3001"

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAll = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

export const addPost = (post) => 
  fetch(`${api}/posts/`, {
      method: 'POST',
      headers: {...headers, 'Content-Type': 'application/json'}, 
      body: JSON.stringify({...post}),
    }).then(data => data.json())

export const deletePost = (id) => 
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers,
  }).then(data => data.json())
  
export const addPostScore = (id, vote) => 
    fetch(`${api}/posts/${id}`, {
      method: 'POST',
      headers: {...headers, 'Content-Type': 'application/json'}, 
      body: JSON.stringify({option : vote}),
    })
    .then(res => res.json())
    .then(data => data.json())


export const getAllCommentsByPost = (postId) =>
fetch(`${api}posts/${postId}/comments`, { headers })
  .then(res => res.json())
  .then(data => data)
