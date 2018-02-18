import * as api from 'utils/api';

/*

ACTIONS

*/

export const POSTS_REQUEST = 'POSTS_REQUEST';
export const POSTS_REQUEST_SUCCESSFUL = 'POSTS_REQUEST_SUCCESSFUL';
export const POST_REQUEST = 'POST_REQUEST';
export const POST_REQUEST_SUCCESSFUL = 'POST_REQUEST_SUCCESSFUL';
export const POST_VOTE = 'POST_VOTE';
export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_REQUEST_SUCCESSFUL = 'COMMENTS_REQUEST_SUCCESSFUL';
export const COMMENT_ADD = 'COMMENT_ADD';
export const COMMENT_VOTE = 'COMMENT_VOTE';
export const COMMENT_UPDATE = 'COMMENT_UPDATE';
export const COMMENT_DELETE = 'COMMENT_DELETE';

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

// Comments

export const requestComments = id => {
  return {
    type: COMMENTS_REQUEST,
    id
  };
};

export const successfulRequestComments = (id, json) => {
  return {
    type: COMMENTS_REQUEST_SUCCESSFUL,
    id,
    comments: json,
    receivedAt: Date.now()
  };
};

export const addComment = json => {
  return {
    type: COMMENT_ADD,
    json
  };
};

export const voteComment = (index, id, json) => {
  return {
    type: COMMENT_VOTE,
    id,
    index,
    json
  };
};

export const deleteComment = (index, id, json) => {
  return {
    type: COMMENT_DELETE,
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

export function votingPost(id, vote) {
  return dispatch => {
    api.votePost(id, vote).then(json => dispatch(votePost(id, json)));
  };
}

// Comments

export function fetchComments(id) {
  return dispatch => {
    dispatch(requestComments(id));
    api
      .fetchComments(id)
      .then(json => dispatch(successfulRequestComments(id, json)));
  };
}

export function insertingComment(data) {
  return dispatch => {
    api.addComment(data).then(json => dispatch(addComment(json)));
  };
}

export function votingComment(index, id, vote) {
  return dispatch => {
    api
      .voteComment(id, vote)
      .then(json => dispatch(voteComment(index, id, json)));
  };
}

export function removingComment(index, id) {
  return dispatch => {
    api
      .deleteComment(id)
      .then(json => dispatch(deleteComment(index, id, json)));
  };
}
