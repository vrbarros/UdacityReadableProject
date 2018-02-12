export const POSTS_GET = 'POSTS_GET';
export const POSTS_ADD = 'POSTS_ADD';

export const getPosts = posts => {
  return {
    type: POSTS_GET,
    posts
  };
};
