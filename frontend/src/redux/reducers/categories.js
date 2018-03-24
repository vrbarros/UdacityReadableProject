import {
  CATEGORIES_REQUEST,
  CATEGORIES_REQUEST_SUCCESSFUL
} from 'redux/actions/categories';

const initialState = {
  isFetching: false,
  items: [],
  lastUpdate: Date.now()
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case CATEGORIES_REQUEST_SUCCESSFUL:
      return {
        isFetching: false,
        items: action.categories,
        lastUpdate: action.receivedAt
      };
    default:
      return state;
  }
};

export default categories;
