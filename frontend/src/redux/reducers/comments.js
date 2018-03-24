import {
  COMMENTS_REQUEST,
  COMMENTS_REQUEST_SUCCESSFUL,
  COMMENT_ADD,
  COMMENT_DELETE,
  COMMENT_REQUEST,
  COMMENT_REQUEST_SUCCESSFUL,
  COMMENT_UPDATE,
  COMMENT_VOTE
} from 'redux/actions/comments';

const commentsInitialState = {
  isFetching: false,
  items: {},
  lastUpdated: Date.now()
};

export const comments = (state = commentsInitialState, action) => {
  switch (action.type) {
    case COMMENTS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case COMMENTS_REQUEST_SUCCESSFUL:
      return {
        isFetching: false,
        items: action.comments
      };
    case COMMENT_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case COMMENT_REQUEST_SUCCESSFUL:
      return {
        ...state,
        isFetching: false,
        edit: action.comment
      };
    case COMMENT_ADD:
      return {
        ...state,
        items: {
          ...state.items,
          [action.index]: action.json
        }
      };
    case COMMENT_UPDATE:
      return {
        ...state,
        items: {
          ...state.items,
          [action.index]: action.json
        },
        edit: {}
      };
    case COMMENT_VOTE:
      return {
        ...state,
        items: { ...state.items, [action.index]: action.json }
      };
    case COMMENT_DELETE:
      state.items.splice(action.index, 1);
      return {
        ...state,
        items: [...state.items]
      };
    default:
      return state;
  }
};
