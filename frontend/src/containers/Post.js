import React, { Component } from 'react';
import Header from 'components/Header';
import Grid from 'material-ui/Grid';
import CategoryList from 'components/CategoryList';
import PostDetails from 'components/PostDetails';

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

    const { category, id } = this.props.match.params;

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
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

export default Post;
