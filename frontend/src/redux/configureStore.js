import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { posts, post } from 'redux/reducers/posts';
import { comments } from 'redux/reducers/comments';
import categories from 'redux/reducers/categories';

export const history = createHistory();
const router = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  router: routerReducer,
  posts,
  categories,
  post,
  comments
});

// Create store with all enhancement
const configureStore = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(router, thunk))
);

export default configureStore;
