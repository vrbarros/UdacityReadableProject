import React, { Component } from 'react';
import {
  fetchPosts,
  removingPost,
  sortPosts,
  votingPost
} from 'redux/actions/posts';

import CategoryList from 'components/CategoryList';
import Grid from 'material-ui/Grid';
import Header from 'components/Header';
import PostActions from 'components/PostActions';
import PostCard from 'components/PostCard';
import ReactLoading from 'react-loading';
import SortSelect from 'components/SortSelect';
import { connect } from 'react-redux';
import { fetchCategories } from 'redux/actions/categories';

class Page extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleVotePost = this.handleVotePost.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
    dispatch(fetchPosts());
  }

  handleVotePost(id, option) {
    const { dispatch } = this.props;
    return dispatch(votingPost(id, option));
  }

  handleDeletePost(index, id) {
    const { dispatch } = this.props;
    return dispatch(removingPost(index, id));
  }

  handleSort(sort) {
    const { dispatch } = this.props;
    return dispatch(sortPosts(sort));
  }

  render() {
    const { category } = this.props.match.params;
    const posts_isFetching = this.props.posts.isFetching;
    const posts_items = this.props.posts.items;
    const categories_isFetching = this.props.categories.isFetching;
    const categories_items = this.props.categories.items;
    const sort = this.props.posts.sort;

    const app = this;

    let posts = posts_items;

    if (posts) {
      if (sort.order === 'asc') {
        posts = posts.sort((a, b) => a[sort.value] - b[sort.value]);
      } else {
        posts = posts.sort((a, b) => b[sort.value] - a[sort.value]);
      }
      posts = posts_items.map(function(value, i) {
        let actions = (
          <PostActions
            viewVisible={true}
            editVisible={true}
            editHref={'/new/' + value.id}
            deleteVisible={true}
            handleDelete={() => app.handleDeletePost(i, value.id)}
            viewHref={'/category/' + value.category + '/' + value.id}
          />
        );
        let post = (
          <PostCard
            key={i}
            content={value}
            actions={actions}
            handleUpVote={() => app.handleVotePost(value.id, 'upVote')}
            handleDownVote={() => app.handleVotePost(value.id, 'downVote')}
          />
        );

        if (category) {
          if (category === value.category) {
            return post;
          } else {
            return false;
          }
        } else {
          return post;
        }
      });
    }

    const loading = (
      <center>
        <ReactLoading
          type="spinningBubbles"
          color="#C2C2C2"
          height={150}
          width={150}
        />
      </center>
    );

    return (
      <div>
        <Header />
        <main>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={2}>
              {categories_isFetching ? (
                loading
              ) : (
                <CategoryList items={categories_items} />
              )}
            </Grid>
            <Grid item xs={12} sm={10}>
              <center>
                <SortSelect sort={sort} sortFunc={app.handleSort} />
              </center>
              {posts_isFetching ? loading : posts}
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { posts, categories } = state;
  return { posts, categories };
}

export default connect(mapStateToProps)(Page);
