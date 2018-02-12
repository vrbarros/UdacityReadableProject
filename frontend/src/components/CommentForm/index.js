import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  fields: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '95%'
  },
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

function CommentForm(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={4}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12}>
          <TextField
            id="multiline-static"
            label="Comment"
            multiline
            rows="12"
            className={classes.fields}
            margin="normal"
          />
          <br />
          <center>
            <Button variant="raised" color="primary" className={classes.button}>
              <span>Send</span>
              <Send />
            </Button>
          </center>
        </Grid>
      </Grid>
    </Paper>
  );
}

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentForm);
