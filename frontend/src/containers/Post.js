import React, { Component } from 'react';
import Header from 'components/Header';
import Grid from 'material-ui/Grid';
import CategoryList from 'components/CategoryList';
import PostDetails from 'components/PostDetails';
import CommentCard from 'components/CommentCard';
import CommentForm from 'containers/CommentForm';
import CommentActions from 'components/CommentActions';
import { connect } from 'react-redux';
import { fetchPost, votingPost } from 'redux/actions/posts';
import {
  fetchComments,
  removingComment,
  votingComment
} from 'redux/actions/comments';
import { fetchCategories } from 'redux/actions/categories';
import ReactLoading from 'react-loading';

class Post extends Component {
  constructor(props, context) {
    super(props, context);
    this.deleteComments = this.handleDeleteComment.bind(this);
    this.handleVotePost = this.handleVotePost.bind(this);
    this.handleVoteComment = this.handleVoteComment.bind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;

    dispatch(fetchCategories());
    dispatch(fetchPost(id));
    dispatch(fetchComments(id));
  }

  handleDeleteComment(index, id) {
    const { dispatch } = this.props;
    return dispatch(removingComment(index, id));
  }

  handleVotePost(id, option) {
    const { dispatch } = this.props;
    return dispatch(votingPost(id, option));
  }

  handleVoteComment(index, comment, option) {
    const { dispatch } = this.props;
    return dispatch(votingComment(index, comment.id, option));
  }

  render() {
    const post_isFetching = this.props.post.isFetching;
    const post_item = this.props.post.item;
    const categories_isFetching = this.props.categories.isFetching;
    const categories_items = this.props.categories.items;
    const comments_isFetching = this.props.comments.isFetching;
    const comments_items = this.props.comments.items;
    const { id } = this.props.match.params;

    let comments;

    const app = this;

    if (!comments_isFetching) {
      comments = Object.entries(comments_items).map(function([key, item]) {
        let actions = (
          <CommentActions
            editVisible={true}
            deleteVisible={true}
            handleDelete={() => app.handleDeleteComment(key, item.id)}
          />
        );
        let comment = (
          <CommentCard
            key={key}
            content={item}
            actions={actions}
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
                />
              )}
              {comments_isFetching ? loading : comments}
              <CommentForm parentId={id} />
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
