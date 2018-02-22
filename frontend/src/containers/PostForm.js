import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Select from 'material-ui/Select';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Send from 'material-ui-icons/Send';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { insertingPost, updatingPost } from 'redux/actions/posts';
import { Redirect } from 'react-router-dom';

const uuidv4 = require('uuid/v4');

let id = uuidv4();

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

class PostForm extends React.Component {
  constructor(props) {
    super(props);

    if (this.props.content) {
      this.state = {
        id: this.props.content.id,
        timestamp: this.props.content.timestamp,
        title: this.props.content.title,
        body: this.props.content.body,
        author: this.props.content.author,
        category: this.props.content.category,
        redirect: false
      };
    } else {
      this.state = {
        id: id,
        timestamp: Date.now(),
        title: '',
        body: '',
        author: '',
        category: '',
        redirect: false
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
    if (this.state.category === '') {
      alert('You need set a category before submit!');
    } else {
      const { dispatch, content } = this.props;

      if (content) {
        dispatch(updatingPost(this.state, this.state.id));
        this.setState({
          redirect: true
        });
      } else {
        this.setState({
          id: id,
          timestamp: Date.now()
        });
        dispatch(insertingPost(this.state));
        this.setState({
          redirect: true
        });
      }
    }
  }

  render() {
    const { classes, options } = this.props;
    const { redirect } = this.state;

    let categories = null;

    if (options.categories) {
      categories = options.categories.map(function(item, i) {
        return (
          <option value={item.name} key={i}>
            {item.name}
          </option>
        );
      });
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div className={classes.paper}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12}>
              <Typography variant="title" color="inherit">
                Post
              </Typography>
              <br />
              <TextField
                required
                name="title"
                label="Title"
                value={this.state.title}
                className={classes.fields}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <TextField
                required
                name="author"
                label="Author"
                value={this.state.author}
                className={classes.fields}
                onChange={this.handleInputChange}
                margin="normal"
              />
              <br />
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="category" className={classes.fields}>
                  Category
                </InputLabel>
                <Select
                  className={classes.fields}
                  name="category"
                  native
                  required
                  value={this.state.category}
                  onChange={this.handleInputChange}
                  inputProps={{
                    id: 'category'
                  }}
                >
                  <option value="" />
                  {categories}
                </Select>
              </FormControl>
              <br />
              <TextField
                name="body"
                required
                value={this.state.body}
                label="Content"
                multiline
                rows="5"
                onChange={this.handleInputChange}
                className={classes.fields}
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
        </div>
        {redirect ? <Redirect to="/" /> : false}
      </form>
    );
  }
}

PostForm.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { posts } = state;
  return { posts };
}

export default withStyles(styles)(connect(mapStateToProps)(PostForm));
