import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Sort from 'material-ui-icons/Sort';
import SortByAlpha from 'material-ui-icons/SortByAlpha';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

const styles = theme => ({
  formControl: {
    minWidth: 120
  },
  button: {
    margin: theme.spacing.unit
  }
});

class SortSelect extends React.Component {
  render() {
    const { classes, defaultValue } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <Grid container alignItems="center" alignContent="center">
          <Grid item>
            <Sort />
          </Grid>
          <Grid item xs>
            <Select native value={defaultValue}>
              <option value="vote">Vote Score</option>
              <option value="datetime">Date and Time</option>
              <option value="title">Title</option>
            </Select>
          </Grid>
          <Grid item>
            <Button color="default" className={classes.button}>
              <SortByAlpha />
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    );
  }
}

SortSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  defaultValue: PropTypes.string.isRequired
};

export default withStyles(styles)(SortSelect);
