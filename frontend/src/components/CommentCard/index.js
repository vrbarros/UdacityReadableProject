import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import PersonPin from 'material-ui-icons/PersonPin';
import DateRange from 'material-ui-icons/DateRange';
import Grid from 'material-ui/Grid';
import Voter from 'components/Voter';
import CommentForm from 'containers/CommentForm';

const Timestamp = require('react-timestamp');

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginLeft: 80,
    marginTop: theme.spacing.unit * 1.5,
    marginBottom: theme.spacing.unit * 1.5
  }),
  button: {
    margin: theme.spacing.unit
  }
});

function CommentCard(props) {
  const {
    classes,
    content,
    actions,
    handleUpVote,
    handleDownVote,
    edit,
    key
  } = props;

  return (
    <Paper className={classes.root} elevation={4}>
      <Grid container>
        <Grid item xs={12} sm={11}>
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
            </Grid>
          </Typography>
          {actions}
          {edit ? (
            edit.id === content.id ? (
              <CommentForm visible={true} edit={edit} index={key} />
            ) : null
          ) : null}
        </Grid>
        <Grid item xs={12} sm={1}>
          <center>
            <Voter
              score={content.voteScore}
              handleUpVote={handleUpVote}
              handleDownVote={handleDownVote}
            />
          </center>
        </Grid>
      </Grid>
    </Paper>
  );
}

CommentCard.propTypes = {
  content: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentCard);
