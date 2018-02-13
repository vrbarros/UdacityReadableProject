import React, { Component } from 'react';
import Header from 'components/Header';
import Grid from 'material-ui/Grid';
import CategoryList from 'components/CategoryList';
import PostCard from 'components/PostCard';
import SortSelect from 'components/SortSelect';
import PostForm from 'components/PostForm';
import PostActions from 'components/PostActions';
import { connect } from 'react-redux';
import { fetchPosts } from 'redux/actions/posts';
import { fetchCategories } from 'redux/actions/categories';
import ReactLoading from 'react-loading';

class Page extends Component {
  state = {
    postForm: false
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
    dispatch(fetchPosts());
  }

  handlePostFormOpen = () => {
    this.setState({ postForm: true });
  };

  handlePostFormClose = () => {
    this.setState({ postForm: false });
  };

  render() {
    const { category } = this.props.match.params;
    const { postsIsFetching, postsItems } = this.props.posts;
    const { categoriesIsFetching, categoriesItems } = this.props.categories;
    const { postForm } = this.state;

    let posts = postsItems;

    if (posts) {
      posts = postsItems.map(function(value, i) {
        let actions = (
          <PostActions
            viewVisible={true}
            editVisible={true}
            deleteVisible={true}
            viewHref={'/' + value.category + '/' + value.id}
          />
        );
        let post = <PostCard key={i} content={value} actions={actions} />;

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
              {categoriesIsFetching ? (
                loading
              ) : (
                <CategoryList items={categoriesItems} />
              )}
            </Grid>
            <Grid item xs={12} sm={10}>
              <center>
                <SortSelect defaultValue="vote" />
              </center>
              {postsIsFetching ? loading : posts}
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
