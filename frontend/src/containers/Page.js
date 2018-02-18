import React, { Component } from 'react';
import Header from 'components/Header';
import Grid from 'material-ui/Grid';
import CategoryList from 'components/CategoryList';
import PostCard from 'components/PostCard';
import SortSelect from 'components/SortSelect';
import PostForm from 'components/PostForm';
import PostActions from 'components/PostActions';
import { connect } from 'react-redux';
import { fetchPosts, votingPost, removingPost } from 'redux/actions/posts';
import { fetchCategories } from 'redux/actions/categories';
import ReactLoading from 'react-loading';

class Page extends Component {
  state = {
    postForm: false
  };

  constructor(props, context) {
    super(props, context);
    this.handleVotePost = this.handleVotePost.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
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

  handlePostFormOpen = () => {
    this.setState({ postForm: true });
  };

  handlePostFormClose = () => {
    this.setState({ postForm: false });
  };

  render() {
    const { category } = this.props.match.params;
    const posts_isFetching = this.props.posts.isFetching;
    const posts_items = this.props.posts.items;
    const categories_isFetching = this.props.categories.isFetching;
    const categories_items = this.props.categories.items;
    const { postForm } = this.state;

    const app = this;

    let posts = posts_items;

    if (posts) {
      posts = posts_items.map(function(value, i) {
        let actions = (
          <PostActions
            viewVisible={true}
            editVisible={true}
            deleteVisible={true}
            handleDelete={() => app.handleDeletePost(i, value.id)}
            viewHref={'/' + value.category + '/' + value.id}
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
        <Header handlePostFormOpen={this.handlePostFormOpen} />
        <PostForm
          open={postForm}
          onClose={this.handlePostFormClose}
          title="New post"
        />
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
                <SortSelect defaultValue="vote" />
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
