import React, { Component } from 'react';
import Header from 'components/Header';
import Grid from 'material-ui/Grid';
import CategoryList from 'components/CategoryList';
import { connect } from 'react-redux';
import { fetchPost } from 'redux/actions/posts';
import { fetchCategories } from 'redux/actions/categories';
import ReactLoading from 'react-loading';
import PostForm from 'containers/PostForm';

class New extends Component {
  state = {
    redirect: false
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;

    dispatch(fetchCategories());
    dispatch(fetchPost(id));
  }
  render() {
    const post_isFetching = this.props.post.isFetching;
    let post_item = this.props.post.item;
    const categories_isFetching = this.props.categories.isFetching;
    const categories_items = this.props.categories.items;
    const { id } = this.props.match.params;

    if (!id) {
      post_item = null;
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
              {post_isFetching ? (
                loading
              ) : (
                <PostForm options={categories_items} content={post_item} />
              )}
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { posts, post, categories } = state;
  return { posts, post, categories };
}

export default connect(mapStateToProps)(New);
