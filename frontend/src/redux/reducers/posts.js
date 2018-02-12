import * as types from 'redux/actions/posts';

const initialState = [];

const posts = (state = initialState, action) => {
  switch (action.type) {
    case types.POSTS_GET:
      return [action.posts];

    default:
      return state;
  }
};

export default posts;
