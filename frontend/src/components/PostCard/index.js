import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import PersonPin from 'material-ui-icons/PersonPin';
import DateRange from 'material-ui-icons/DateRange';
import Label from 'material-ui-icons/Label';
import Grid from 'material-ui/Grid';
import Voter from 'components/Voter';

const Timestamp = require('react-timestamp');

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  button: {
    margin: theme.spacing.unit
  }
});

function PostCard(props) {
  const { classes, content, actions, handleUpVote, handleDownVote } = props;

  return (
    <Paper className={classes.root} elevation={4}>
      <Grid container>
        <Grid item xs={12} sm={1}>
          <center>
            <Voter
              score={content.voteScore}
              handleUpVote={handleUpVote}
              handleDownVote={handleDownVote}
            />
          </center>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Typography variant="caption">
            <Grid container alignItems="center" alignContent="center">
              <Grid item>
                <DateRange />
              </Grid>
              <Grid item>
                <Timestamp time={content.timestamp} format="full" includeDay />
              </Grid>
            </Grid>
          </Typography>
          <br />
          <Typography variant="headline">{content.title}</Typography>
          <br />
          <Typography variant="body1" component="p">
            {content.body}
          </Typography>
          <br />
          <Typography variant="subheading">
            <Grid container alignItems="center" alignContent="center">
              <Grid item>
                <PersonPin />
              </Grid>
              <Grid item>{content.author}</Grid>
              <Grid item>
                <Label />
              </Grid>
              <Grid item>{content.category}</Grid>
            </Grid>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Grid container alignItems="center" direction="row" justify="center">
            {actions}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

PostCard.propTypes = {
  content: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default withStyles(styles)(PostCard);
