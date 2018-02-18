import {
  COMMENTS_REQUEST,
  COMMENTS_REQUEST_SUCCESSFUL,
  COMMENT_ADD,
  COMMENT_VOTE,
  COMMENT_DELETE
} from 'redux/actions/comments';

const commentsInitialState = {
  isFetching: false,
  items: {},
  lastUpdated: Date.now()
};

export const comments = (state = commentsInitialState, action) => {
  switch (action.type) {
    case COMMENTS_REQUEST:
      return (state = {
        ...state,
        isFetching: true
      });
    case COMMENTS_REQUEST_SUCCESSFUL:
      return (state = {
        isFetching: false,
        items: action.comments,
        lastUpdated: action.receivedAt
      });
    case COMMENT_ADD:
      return (state = {
        ...state,
        items: state.items.concat(action.json)
      });
    case COMMENT_VOTE:
      return (state = {
        ...state,
        items: { ...state.items, [action.index]: action.json }
      });
    case COMMENT_DELETE:
      state.items.splice(action.index, 1);
      return (state = {
        ...state,
        items: [...state.items]
      });
    default:
      return state;
  }
};
