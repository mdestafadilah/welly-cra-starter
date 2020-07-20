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

import { useUser } from "../../context/user";
import { menuBtn, emoji, title, select } from "./styles";

export default (): JSX.Element | null => {
  const { pathname } = useLocation();
  const { lang, setLang } = useUser();

  const handleLangChange = (e: ChangeEvent<{ value: unknown }>): void => {
    // @ts-ignore
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
        >
          <MenuIcon />
        </IconButton>
        <Typography css={title} variant="h6">
          <span css={emoji} role="img" aria-label="Hello">
            👋🏻
          </span>
          Hello
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
        <Button>
          <Link to="/login">Login</Link>
        </Button>
      </Toolbar>
    </AppBar>
  ) : null;
};
