import {
  POSTS_REQUEST,
  POSTS_REQUEST_SUCCESSFUL,
  POST_REQUEST,
  POST_REQUEST_SUCCESSFUL,
  POST_VOTE,
  POST_DELETE,
  POST_ADD,
  POST_UPDATE
} from 'redux/actions/posts';

const postsInitialState = {
  isFetching: false,
  items: [],
  lastUpdated: Date.now()
};

export const posts = (state = postsInitialState, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return (state = {
        ...state,
        isFetching: true
      });
    case POSTS_REQUEST_SUCCESSFUL:
      return (state = {
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    case POST_VOTE:
      const indexToUpdate = state.items.findIndex(item => {
        return item.id === action.id;
      });
      return (state = {
        ...state,
        items: [
          ...state.items.slice(0, indexToUpdate),
          (state.items[indexToUpdate] = {
            ...state.items[indexToUpdate],
            voteScore: action.json.voteScore
          }),
          ...state.items.slice(indexToUpdate + 1)
        ]
      });
    case POST_ADD:
      return (state = {
        ...state,
        items: state.items.concat(action.json)
      });
    case POST_UPDATE:
      return state;
    case POST_DELETE:
      if (action.index >= 0) {
        state.items.splice(action.index, 1);
      }

      return (state = {
        ...state,
        items: [...state.items]
      });
    default:
      return state;
  }
};

const postInitialState = {
  isFetching: false,
  item: {},
  lastUpdated: Date.now()
};

export const post = (state = postInitialState, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return (state = {
        ...state,
        isFetching: true
      });
    case POST_REQUEST_SUCCESSFUL:
      return (state = {
        isFetching: false,
        item: action.posts,
        lastUpdated: action.receivedAt
      });
    case POST_VOTE:
      return (state = {
        item: action.json
      });
    case POST_DELETE:
      return (state = {
        ...state,
        item: action.json
      });
    default:
      return state;
  }
};
