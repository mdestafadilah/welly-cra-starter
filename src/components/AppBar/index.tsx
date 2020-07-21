/** @jsx jsx */

import { jsx } from "@emotion/core";
import { ChangeEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Select,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { FormattedMessage } from "react-intl";

import { useUser, ContextPros } from "../../context/user";
import { menuBtn, emoji, title, select } from "./styles";

interface Props {
  onClickIcon: () => void;
}

export default ({ onClickIcon }: Props): JSX.Element | null => {
  const { pathname } = useLocation();
  const { lang, setLang } = useUser() as ContextPros;

  const handleLangChange = (e: ChangeEvent<{ value: unknown }>): void => {
    setLang(e.target.value as string);
  };

  return pathname !== "/login" ? (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          css={menuBtn}
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onClickIcon}
        >
          <MenuIcon />
        </IconButton>
        <Typography css={title} variant="h6">
          <span css={emoji} role="img" aria-label="Waving hand">
            👋🏻
          </span>
          <FormattedMessage id="title" values={{ name: "Welly" }} />
        </Typography>
        <Select
          css={select}
          value={lang}
          onChange={handleLangChange}
          displayEmpty
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="zh">中文</MenuItem>
        </Select>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  ) : null;
};
