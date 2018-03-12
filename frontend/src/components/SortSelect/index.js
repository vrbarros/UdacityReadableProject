import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Sort from 'material-ui-icons/Sort';
import Grid from 'material-ui/Grid';

const styles = theme => ({
  formControl: {
    minWidth: 120
  },
  button: {
    margin: theme.spacing.unit
  }
});

class SortSelect extends React.Component {
  constructor(props) {
    super(props);
    this.onValueChanged = this.onValueChanged.bind(this);
    this.onSortChanged = this.onSortChanged.bind(this);
  }

  onValueChanged(event) {
    this.props.sortFunc({
      value: event.target.value,
      order: this.props.sort.order
    });
  }

  onSortChanged(event) {
    this.props.sortFunc({
      value: this.props.sort.value,
      order: event.target.value
    });
  }

  render() {
    const { classes, sort } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <Grid container alignItems="center" alignContent="center">
          <Grid item>
            <Sort />
          </Grid>
          <Grid item xs>
            <Select native value={sort.value} onChange={this.onValueChanged}>
              <option value="voteScore">Vote Score</option>
              <option value="timestamp">Date and Time</option>
            </Select>
          </Grid>
          <Grid item>
            <Select native value={sort.order} onChange={this.onSortChanged}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </Select>
          </Grid>
        </Grid>
      </FormControl>
    );
  }
}

SortSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  sort: PropTypes.object.isRequired,
  sortFunc: PropTypes.func.isRequired
};

export default withStyles(styles)(SortSelect);
