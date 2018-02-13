import * as api from 'utils/api';

/*

ACTIONS

*/

export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST';
export const CATEGORIES_REQUEST_SUCCESSFUL = 'CATEGORIES_REQUEST_SUCCESSFUL';

export const requestCategories = () => {
  return {
    type: CATEGORIES_REQUEST
  };
};

export const successfulRequestCategories = json => {
  return {
    type: CATEGORIES_REQUEST_SUCCESSFUL,
    categories: json,
    receivedAt: Date.now()
  };
};

/*

PROMISES

*/

export function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories());
    api
      .fetchCategories()
      .then(json => dispatch(successfulRequestCategories(json)));
  };
}
