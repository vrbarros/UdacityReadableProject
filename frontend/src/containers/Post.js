import React, { Component } from 'react';
import Header from 'components/Header';
import Grid from 'material-ui/Grid';
import CategoryList from 'components/CategoryList';
import PostDetails from 'components/PostDetails';
import CommentCard from 'components/CommentCard';
import CommentForm from 'components/CommentForm';
import CommentActions from 'components/CommentActions';
import { connect } from 'react-redux';
import { fetchPost, fetchComments, removeComment } from 'redux/actions/posts';
import { fetchCategories } from 'redux/actions/categories';
import ReactLoading from 'react-loading';

class Post extends Component {
  constructor(props, context) {
    super(props, context);
    this.deleteComments = this.deleteComment.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;

    dispatch(fetchCategories());
    dispatch(fetchPost(id));
    dispatch(fetchComments(id));
  }

  deleteComment(comment) {
    const { dispatch } = this.props;
    return dispatch(removeComment(comment.id));
  }

  render() {
    const { postIsFetching, postItems } = this.props.post;
    const { categoriesIsFetching, categoriesItems } = this.props.categories;
    const { commentsIsFetching, commentsItems } = this.props.comments;

    let comments;

    const app = this;

    if (!commentsIsFetching) {
      comments = Object.entries(commentsItems).map(function([key, item]) {
        let actions = (
          <CommentActions
            editVisible={true}
            deleteVisible={true}
            handleDelete={() => app.deleteComment(item)}
          />
        );
        let comment = (
          <CommentCard key={key} content={item} actions={actions} />
        );
        return comment;
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
              {categoriesIsFetching ? (
                loading
              ) : (
                <CategoryList items={categoriesItems} />
              )}
            </Grid>
            <Grid item xs={12} sm={10}>
              {postIsFetching ? loading : <PostDetails content={postItems} />}
              {commentsIsFetching ? loading : comments}
              <CommentForm />
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { post, categories, comments } = state;
  return { post, categories, comments };
}

export default connect(mapStateToProps)(Post);
