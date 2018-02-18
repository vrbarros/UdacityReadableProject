import React, { Component } from 'react';
import Header from 'components/Header';
import Grid from 'material-ui/Grid';
import CategoryList from 'components/CategoryList';
import PostDetails from 'components/PostDetails';
import CommentCard from 'components/CommentCard';
import CommentForm from 'containers/CommentForm';
import CommentActions from 'components/CommentActions';
import { connect } from 'react-redux';
import {
  fetchPost,
  fetchComments,
  removingComment,
  votingComment,
  votingPost
} from 'redux/actions/posts';
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
    const { postIsFetching, postItems } = this.props.post;
    const { categoriesIsFetching, categoriesItems } = this.props.categories;
    const { commentsIsFetching, commentsItems } = this.props.comments;
    const { id } = this.props.match.params;

    let comments;

    const app = this;

    if (!commentsIsFetching) {
      comments = Object.entries(commentsItems).map(function([key, item]) {
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
              {categoriesIsFetching ? (
                loading
              ) : (
                <CategoryList items={categoriesItems} />
              )}
            </Grid>
            <Grid item xs={12} sm={10}>
              {postIsFetching ? (
                loading
              ) : (
                <PostDetails
                  content={postItems}
                  handleUpVote={() =>
                    app.handleVotePost(postItems.id, 'upVote')
                  }
                  handleDownVote={() =>
                    app.handleVotePost(postItems.id, 'downVote')
                  }
                />
              )}
              {commentsIsFetching ? loading : comments}
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
