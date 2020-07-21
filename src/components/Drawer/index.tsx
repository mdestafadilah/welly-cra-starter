/** @jsx jsx */

import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";

import { list } from "./styles";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default ({ open, onClose }: Props): JSX.Element => (
  <Drawer open={open} onClose={onClose}>
    <List css={list}>
      <ListItem button component={Link} to="/" onClick={onClose}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/protected" onClick={onClose}>
        <ListItemText primary="Protected" />
      </ListItem>
    </List>
  </Drawer>
);
