import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

import Home from 'material-ui-icons/Home';
import Label from 'material-ui-icons/Label';
import { Link } from 'react-router-dom';
import React from 'react';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({});

function CategoryList(props) {
  const { items } = props;
  let categories;

  if (items.categories) {
    categories = items.categories.map(function(item, i) {
      return (
        <ListItem
          component={Link}
          to={'/category/' + item.path}
          key={'cat-' + i}
          button
        >
          <ListItemIcon>
            <Label />
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItem>
      );
    });
  }

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

export default withStyles(styles)(CategoryList);
