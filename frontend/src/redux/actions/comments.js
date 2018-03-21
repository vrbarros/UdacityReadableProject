import * as api from 'utils/api';

/*

ACTIONS

*/

export const COMMENTS_REQUEST = 'COMMENTS_REQUEST';
export const COMMENTS_REQUEST_SUCCESSFUL = 'COMMENTS_REQUEST_SUCCESSFUL';
export const COMMENT_ADD = 'COMMENT_ADD';
export const COMMENT_VOTE = 'COMMENT_VOTE';
export const COMMENT_REQUEST = 'COMMENT_REQUEST';
export const COMMENT_REQUEST_SUCCESSFUL = 'COMMENT_REQUEST_SUCCESSFUL';
export const COMMENT_UPDATE = 'COMMENT_UPDATE';
export const COMMENT_DELETE = 'COMMENT_DELETE';

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
    comments: json
  };
};

export const addComment = json => {
  return {
    type: COMMENT_ADD,
    json
  };
};

export const updateComment = (id, json) => {
  return {
    type: COMMENT_UPDATE,
    json,
    id
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

export const requestComment = id => {
  return {
    type: COMMENT_REQUEST,
    id
  };
};

export const successfulRequestComment = (id, json) => {
  return {
    type: COMMENT_REQUEST_SUCCESSFUL,
    id,
    comment: json
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

export function editingComment(data, index) {
  return dispatch => {
    api
      .editComment(data, data.id)
      .then(json => dispatch(updateComment(data.id, json, index)));
  };
}

export function votingComment(index, id, vote) {
  return dispatch => {
    api
      .voteComment(id, vote)
      .then(json => dispatch(voteComment(index, id, json)));
  };
}

export function fetchComment(id) {
  return dispatch => {
    dispatch(requestComment(id));
    api
      .fetchComment(id)
      .then(json => dispatch(successfulRequestComment(id, json)));
  };
}

export function removingComment(index, id) {
  return dispatch => {
    api
      .deleteComment(id)
      .then(json => dispatch(deleteComment(index, id, json)));
  };
}
