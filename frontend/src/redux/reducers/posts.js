import {
  POSTS_REQUEST,
  POSTS_REQUEST_SUCCESSFUL,
  POST_REQUEST,
  POST_REQUEST_SUCCESSFUL,
  POST_VOTE,
  COMMENTS_REQUEST,
  COMMENT_ADD,
  COMMENT_VOTE,
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
    case POST_VOTE:
      const indexToUpdate = state.postsItems.findIndex(item => {
        return item.id === action.id;
      });
      return (state = {
        ...state,
        postsItems: [
          ...state.postsItems.slice(0, indexToUpdate),
          (state.postsItems[indexToUpdate] = {
            ...state.postsItems[indexToUpdate],
            voteScore: action.json.voteScore
          }),
          ...state.postsItems.slice(indexToUpdate + 1)
        ]
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
    case POST_VOTE:
      return (state = {
        postItems: action.json
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
    case COMMENT_ADD:
      return (state = {
        ...state,
        commentsItems: state.commentsItems.concat(action.json)
      });
    case COMMENT_VOTE:
      return (state = {
        ...state,
        commentsItems: { ...state.commentsItems, [action.index]: action.json }
      });
    case COMMENT_DELETE:
      state.commentsItems.splice(action.index, 1);
      return (state = {
        ...state,
        commentsItems: [...state.commentsItems]
      });
    default:
      return state;
  }
};
