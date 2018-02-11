import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});

class PostActions extends React.Component {
  render() {
    const {
      classes,
      viewHref,
      viewVisible,
      editVisible,
      deleteVisible
    } = this.props;

    return (
      <center>
        {viewVisible && (
          <Button
            variant="raised"
            color="default"
            className={classes.button}
            component={Link}
            to={viewHref}
          >
            View
          </Button>
        )}
        {editVisible && (
          <Button variant="raised" color="primary" className={classes.button}>
            Edit
          </Button>
        )}
        {deleteVisible && (
          <Button variant="raised" color="secondary" className={classes.button}>
            Delete
          </Button>
        )}
      </center>
    );
  }
}

PostActions.propTypes = {
  classes: PropTypes.object.isRequired,
  viewHref: PropTypes.string,
  viewVisible: PropTypes.bool.isRequired,
  editVisible: PropTypes.bool.isRequired,
  deleteVisible: PropTypes.bool.isRequired
};

export default withStyles(styles)(PostActions);
