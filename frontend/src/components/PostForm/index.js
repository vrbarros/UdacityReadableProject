import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Modal from 'material-ui/Modal';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  paper: {
    width: '50%',
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: '15%',
    left: '15%'
  },
  fields: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '95%'
  },
  button: {
    margin: theme.spacing.unit
  }
});

function PostForm(props) {
  const { classes, open, onClose, title } = props;

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.paper}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12}>
            <Typography variant="title" color="inherit">
              {title}
            </Typography>
            <TextField
              required
              id="title"
              label="Title"
              className={classes.fields}
              margin="normal"
            />
            <br />
            <TextField
              id="datetime-local"
              label="Date and time"
              type="datetime-local"
              className={classes.fields}
              InputLabelProps={{
                shrink: true
              }}
            />
            <br />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="category" className={classes.fields}>
                Category
              </InputLabel>
              <Select
                className={classes.fields}
                native
                inputProps={{
                  id: 'category'
                }}
              >
                <option value="" />
                <option value={10}>Ten</option>
                <option value={20}>Twenty</option>
                <option value={30}>Thirty</option>
              </Select>
            </FormControl>
            <br />
            <TextField
              id="multiline-static"
              label="Content"
              multiline
              rows="12"
              className={classes.fields}
              margin="normal"
            />
            <br />
            <center>
              <Button
                variant="raised"
                color="primary"
                className={classes.button}
              >
                <span>Send</span>
                <Send />
              </Button>
            </center>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
}

PostForm.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired
};

export default withStyles(styles)(PostForm);
