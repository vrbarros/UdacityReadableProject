import * as api from 'utils/api';

/*

ACTIONS

*/

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESSFUL = 'POSTS_REQUEST_SUCCESSFUL';
export const POST_REQUEST = 'POST_REQUEST';
export const POST_REQUEST_SUCCESSFUL = 'POST_REQUEST_SUCCESSFUL';
export const POST_VOTE = 'POST_VOTE';
export const POST_ADD = 'POST_ADD';
export const POST_UPDATE = 'POST_UPDATE';
export const POST_DELETE = 'POST_DELETE';

// Posts

export const requestPosts = () => {
  return {
    type: POSTS_REQUEST
  };
};

export const successfulRequestPosts = json => {
  return {
    type: POSTS_REQUEST_SUCCESSFUL,
    posts: json,
    receivedAt: Date.now()
  };
};

export const requestPost = id => {
  return {
    type: POST_REQUEST,
    id
  };
};

export const successfulRequestPost = (id, json) => {
  return {
    type: POST_REQUEST_SUCCESSFUL,
    id,
    posts: json,
    receivedAt: Date.now()
  };
};

export const votePost = (id, json) => {
  return {
    type: POST_VOTE,
    id,
    json
  };
};

export const addPost = json => {
  return {
    type: POST_ADD,
    json
  };
};

export const updatePost = (id, json) => {
  return {
    type: POST_UPDATE,
    id,
    json
  };
};

export const deletePost = (index, id, json) => {
  return {
    type: POST_DELETE,
    id,
    index,
    json
  };
};

/*

PROMISES

*/

// Posts

export function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts());
    api.fetchPosts().then(json => dispatch(successfulRequestPosts(json)));
  };
}

export function fetchPost(id) {
  return dispatch => {
    if (id) {
      dispatch(requestPost(id));
      api.fetchPost(id).then(json => dispatch(successfulRequestPost(id, json)));
    }
  };
}

export function insertingPost(data) {
  return dispatch => {
    api.addPost(data).then(json => dispatch(addPost(json)));
  };
}

export function updatingPost(data, id) {
  return dispatch => {
    api.editPost(data, id).then(json => dispatch(updatePost(id, json)));
  };
}

export function votingPost(id, vote) {
  return dispatch => {
    api.votePost(id, vote).then(json => dispatch(votePost(id, json)));
  };
}

export function removingPost(index, id) {
  return dispatch => {
    api.deletePost(id).then(json => dispatch(deletePost(index, id, json)));
  };
}
