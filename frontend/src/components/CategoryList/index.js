import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Label from 'material-ui-icons/Label';
import Home from 'material-ui-icons/Home';
import { Link } from 'react-router-dom';

const styles = theme => ({});

function CategoryList(props) {
  const { items } = props;

  const categories = items.categories.map(function(item, i) {
    return (
      <ListItem component={Link} to={item.path} key={'cat-' + i} button>
        <ListItemIcon>
          <Label />
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItem>
    );
  });

  return (
    <div>
      <List component="nav">
        <ListItem component={Link} to="/" button>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        {categories}
      </List>
    </div>
  );
}

CategoryList.propTypes = {
  items: PropTypes.object.isRequired
};

export default withStyles(styles)(CategoryList);
