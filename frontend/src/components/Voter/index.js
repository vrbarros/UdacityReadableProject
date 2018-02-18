import React from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import ThumbUp from 'material-ui-icons/ThumbUp';
import ThumbDown from 'material-ui-icons/ThumbDown';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

function Voter(props) {
  const { classes, score, handleUpVote, handleDownVote } = props;
  return (
    <div>
      <Button
        variant="fab"
        color="primary"
        className={classes.button}
        onClick={handleUpVote}
      >
        <ThumbUp />
      </Button>
      <Button variant="fab" disabled className={classes.button}>
        {score}
      </Button>
      <Button
        variant="fab"
        color="secondary"
        className={classes.button}
        onClick={handleDownVote}
      >
        <ThumbDown />
      </Button>
    </div>
  );
}

Voter.propTypes = {
  score: PropTypes.number.isRequired
};

export default withStyles(styles)(Voter);
