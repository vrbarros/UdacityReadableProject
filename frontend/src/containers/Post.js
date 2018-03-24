import React, { Component } from 'react';
import {
  fetchComment,
  fetchComments,
  removingComment,
  votingComment
} from 'redux/actions/comments';
import { fetchPost, removingPost, votingPost } from 'redux/actions/posts';

import CategoryList from 'components/CategoryList';
import CommentActions from 'components/CommentActions';
import CommentCard from 'components/CommentCard';
import CommentForm from 'containers/CommentForm';
import Grid from 'material-ui/Grid';
import Header from 'components/Header';
import PostDetails from 'components/PostDetails';
import ReactLoading from 'react-loading';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCategories } from 'redux/actions/categories';

class Post extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleVotePost = this.handleVotePost.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handleVoteComment = this.handleVoteComment.bind(this);
    this.handleEditComment = this.handleEditComment.bind(this);
    this.deleteComments = this.handleDeleteComment.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;

    dispatch(fetchCategories());
    dispatch(fetchPost(id));
    dispatch(fetchComments(id));
  }

  handleVotePost(id, option) {
    const { dispatch } = this.props;
    return dispatch(votingPost(id, option));
  }

  handleDeletePost(id) {
    const { dispatch } = this.props;
    return dispatch(removingPost(null, id));
  }

  handleVoteComment(index, comment, option) {
    const { dispatch } = this.props;
    return dispatch(votingComment(index, comment.id, option));
  }

  handleDeleteComment(index, id) {
    const { dispatch } = this.props;
    return dispatch(removingComment(index, id));
  }
  handleEditComment(index, id) {
    const { dispatch } = this.props;
    return dispatch(fetchComment(id));
  }

  render() {
    const post_isFetching = this.props.post.isFetching;
    const post_item = this.props.post.item;
    const categories_isFetching = this.props.categories.isFetching;
    const categories_items = this.props.categories.items;
    const comments_isFetching = this.props.comments.isFetching;
    const comments_items = this.props.comments.items;
    const { id } = this.props.match.params;
    const { edit } = this.props.comments;

    let comments;

    const app = this;

    if (!comments_isFetching) {
      comments = Object.entries(comments_items).map(function([key, item]) {
        let actions = (
          <CommentActions
            editVisible={true}
            deleteVisible={true}
            handleDelete={() => app.handleDeleteComment(key, item.id)}
            handleEdit={() => app.handleEditComment(key, item.id)}
          />
        );
        let comment = (
          <CommentCard
            key={key}
            index={key}
            content={item}
            actions={actions}
            edit={edit}
            handleUpVote={() => app.handleVoteComment(key, item, 'upVote')}
            handleDownVote={() => app.handleVoteComment(key, item, 'downVote')}
          />
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
        <Header hideNewPost={true} />
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
                <PostDetails
                  content={post_item}
                  handleUpVote={() =>
                    app.handleVotePost(post_item.id, 'upVote')
                  }
                  handleDownVote={() =>
                    app.handleVotePost(post_item.id, 'downVote')
                  }
                  handleDelete={() => app.handleDeletePost(post_item.id)}
                />
              )}
              {comments_isFetching ? loading : comments}
              <CommentForm parentId={id} visible={true} />
            </Grid>
          </Grid>
          {!post_isFetching ? (
            post_item.deleted ? (
              <Redirect to="/" />
            ) : null
          ) : null}
          {!post_isFetching ? !post_item.id ? <Redirect to="/" /> : null : null}
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
