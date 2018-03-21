const API_URL = 'http://localhost:3001/';
const API_AUTHORIZATION = 'UdacityRules';

/*

  CATEGORIES ENDPOINT

*/

export const fetchCategories = () =>
  fetch(`${API_URL}categories`, {
    headers: { Authorization: API_AUTHORIZATION }
  })
    .then(data => data.json())
    .then(data => data);

/*

POSTS ENDPOINTS

*/

export const fetchPosts = () =>
  fetch(`${API_URL}posts`, {
    headers: { Authorization: API_AUTHORIZATION }
  }).then(data => data.json());

export const fetchPost = id =>
  fetch(`${API_URL}posts/${id}`, {
    headers: { Authorization: API_AUTHORIZATION }
  }).then(function(data) {
    if (!data.ok) {
      return { error: true };
    }
    return data.json();
  });

export const addPost = data =>
  fetch(`${API_URL}posts`, {
    method: 'POST',
    headers: {
      Authorization: API_AUTHORIZATION,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json());

export const editPost = (data, id) =>
  fetch(`${API_URL}posts/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: API_AUTHORIZATION,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json());

export const deletePost = id =>
  fetch(`${API_URL}posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: API_AUTHORIZATION
    }
  }).then(data => data.json());

export const votePost = (id, vote) =>
  fetch(`${API_URL}posts/${id}`, {
    method: 'POST',
    headers: {
      Authorization: API_AUTHORIZATION,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: vote })
  }).then(data => data.json());

/*

COMMENTS ENDPOINTS

*/

export const fetchComments = id =>
  fetch(`${API_URL}posts/${id}/comments`, {
    headers: { Authorization: API_AUTHORIZATION }
  })
    .then(data => data.json())
    .then(data => data);

export const fetchComment = id =>
  fetch(`${API_URL}comments/${id}`, {
    headers: { Authorization: API_AUTHORIZATION }
  })
    .then(data => data.json())
    .then(data => data);

export const addComment = data =>
  fetch(`${API_URL}comments`, {
    method: 'POST',
    headers: {
      Authorization: API_AUTHORIZATION,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json());

export const editComment = (data, id) =>
  fetch(`${API_URL}comments/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: API_AUTHORIZATION,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json());

export const deleteComment = id =>
  fetch(`${API_URL}comments/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: API_AUTHORIZATION
    }
  }).then(data => data.json());

export const voteComment = (id, vote) =>
  fetch(`${API_URL}comments/${id}`, {
    method: 'POST',
    headers: {
      Authorization: API_AUTHORIZATION,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: vote })
  }).then(data => data.json());
