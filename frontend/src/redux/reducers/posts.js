import {
  POSTS_REQUEST,
  POSTS_REQUEST_SUCCESSFUL,
  POSTS_SORT,
  POST_ADD,
  POST_DELETE,
  POST_REQUEST,
  POST_REQUEST_SUCCESSFUL,
  POST_UPDATE,
  POST_VOTE
} from 'redux/actions/posts';

const postsInitialState = {
  isFetching: false,
  items: [],
  lastUpdated: Date.now(),
  sort: {
    value: 'vote',
    order: 'asc'
  }
};

export const posts = (state = postsInitialState, action) => {
  switch (action.type) {
    case POSTS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case POSTS_REQUEST_SUCCESSFUL:
      return {
        ...state,
        isFetching: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      };
    case POST_VOTE:
      const indexToUpdate = state.items.findIndex(item => {
        return item.id === action.id;
      });
      return {
        ...state,
        items: [
          ...state.items.slice(0, indexToUpdate),
          (state.items[indexToUpdate] = {
            ...state.items[indexToUpdate],
            voteScore: action.json.voteScore
          }),
          ...state.items.slice(indexToUpdate + 1)
        ]
      };
    case POST_ADD:
      return {
        ...state,
        items: state.items.concat(action.json)
      };
    case POST_UPDATE:
      return state;
    case POST_DELETE:
      if (action.index >= 0) {
        state.items.splice(action.index, 1);
      }
      return {
        ...state,
        items: [...state.items]
      };
    case POSTS_SORT:
      return {
        ...state,
        sort: action.sort
      };
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
      return {
        ...state,
        isFetching: true
      };
    case POST_REQUEST_SUCCESSFUL:
      return {
        isFetching: false,
        item: action.posts,
        lastUpdated: action.receivedAt
      };
    case POST_VOTE:
      return {
        item: action.json
      };
    case POST_DELETE:
      return {
        ...state,
        item: {
          deleted: true
        }
      };
    default:
      return state;
  }
};
