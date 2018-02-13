import {
  POSTS_REQUEST,
  POSTS_REQUEST_SUCCESSFUL,
  POST_REQUEST,
  POST_REQUEST_SUCCESSFUL,
  COMMENTS_REQUEST,
  COMMENTS_REQUEST_SUCCESSFUL,
  COMMENT_DELETE
} from 'redux/actions/posts';

const postsInitialState = {
  postsIsFetching: false,
  postsItems: [],
  postsLastUpdated: Date.now()
};

export const posts = (state = postsInitialState, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return (state = {
        ...state,
        postsIsFetching: true
      });
    case POSTS_REQUEST_SUCCESSFUL:
      return (state = {
        postsIsFetching: false,
        postsItems: action.posts,
        postsLastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

const postInitialState = {
  postIsFetching: false,
  postItems: {},
  postLastUpdated: Date.now()
};

export const post = (state = postInitialState, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return (state = {
        ...state,
        postIsFetching: true
      });
    case POST_REQUEST_SUCCESSFUL:
      return (state = {
        postIsFetching: false,
        postItems: action.posts,
        postLastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

const commentsInitialState = {
  commentsIsFetching: false,
  commentsItems: {},
  commentsLastUpdated: Date.now()
};

export const comments = (state = commentsInitialState, action) => {
  switch (action.type) {
    case COMMENTS_REQUEST:
      return (state = {
        ...state,
        commentsIsFetching: true
      });
    case COMMENTS_REQUEST_SUCCESSFUL:
      return (state = {
        commentsIsFetching: false,
        commentsItems: action.comments,
        commentsLastUpdated: action.receivedAt
      });
    case COMMENT_DELETE:
      const indexToDelete = state.commentsItems.findIndex(item => {
        return item.id === action.id;
      });
      console.log(indexToDelete);

      return (state = {
        ...state
      });
    default:
      return state;
  }
};
