import {
  CATEGORIES_REQUEST,
  CATEGORIES_REQUEST_SUCCESSFUL
} from 'redux/actions/categories';

const initialState = {
  categoriesIsFetching: false,
  categoriesItems: [],
  categoriesLastUpdated: Date.now()
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case CATEGORIES_REQUEST:
      return (state = {
        ...state,
        categoriesIsFetching: true
      });
    case CATEGORIES_REQUEST_SUCCESSFUL:
      return (state = {
        categoriesIsFetching: false,
        categoriesItems: action.categories,
        categoriesLastUpdated: action.receivedAt
      });
    default:
      return state;
  }
};

export default categories;
