import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { insertingComment, editingComment } from 'redux/actions/comments';

const uuidv4 = require('uuid/v4');

let id = uuidv4();

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

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.edit) {
      this.state = {
        ...props.edit
      };
    } else {
      this.state = {
        parentId: props.parentId,
        body: props.body,
        author: props.author
      };
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    this.setState({
      id: id,
      timestamp: Date.now()
    });
    if (this.props.edit) {
      dispatch(editingComment(this.state, this.props.index));
    } else {
      dispatch(insertingComment(this.state));
    }
    this.setState({
      id: '',
      body: '',
      author: ''
    });
  }

  render() {
    const { classes, visible } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        {visible ? (
          <Paper className={classes.root} elevation={4}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="author"
                  label="Author"
                  value={this.state.author}
                  className={classes.fields}
                  onChange={this.handleInputChange}
                  margin="normal"
                />
                <br />
                <TextField
                  name="body"
                  label="Comment"
                  className={classes.fields}
                  value={this.state.body}
                  multiline
                  rows="12"
                  onChange={this.handleInputChange}
                  margin="normal"
                />
                <br />
                <center>
                  <Button
                    variant="raised"
                    color="primary"
                    className={classes.button}
                    type="submit"
                  >
                    <span>Send</span>
                    <Send />
                  </Button>
                </center>
              </Grid>
            </Grid>
          </Paper>
        ) : null}
      </form>
    );
  }
}

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { comments } = state;
  return { comments };
}

export default withStyles(styles)(connect(mapStateToProps)(CommentForm));
