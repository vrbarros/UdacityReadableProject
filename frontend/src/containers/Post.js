import React, { Component } from 'react';
import Header from 'components/Header';
import Grid from 'material-ui/Grid';
import CategoryList from 'components/CategoryList';
import PostDetails from 'components/PostDetails';
import CommentCard from 'components/CommentCard';

class Post extends Component {
  render() {
    const dataCategories = {
      categories: [
        {
          name: 'react',
          path: 'react'
        },
        {
          name: 'redux',
          path: 'redux'
        },
        {
          name: 'udacity',
          path: 'udacity'
        }
      ]
    };
    const dataPosts = {
      post: {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false,
        commentCount: 2
      }
    };
    const dataComments = {
      comments: {
        '894tuq4ut84ut8v4t8wun89g': {
          id: '894tuq4ut84ut8v4t8wun89g',
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1468166872634,
          body: 'Hi there! I am a COMMENT.',
          author: 'thingtwo',
          voteScore: 6,
          deleted: false,
          parentDeleted: false
        },
        '8tu4bsun805n8un48ve89': {
          id: '8tu4bsun805n8un48ve89',
          parentId: '8xf0y6ziyjabvozdd253nd',
          timestamp: 1469479767190,
          body: 'Comments. Are. Cool.',
          author: 'thingone',
          voteScore: -5,
          deleted: false,
          parentDeleted: false
        }
      }
    };

    const { category, id } = this.props.match.params;

    const comments = Object.entries(dataComments.comments).map(function([
      key,
      value
    ]) {
      var post = <CommentCard key={key} content={value} />;
      return post;
    });

    return (
      <div>
        <Header />
        <main>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={2}>
              <CategoryList items={dataCategories} />
            </Grid>
            <Grid item xs={12} sm={10}>
              <PostDetails content={dataPosts.post} />
              {comments}
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

export default Post;
