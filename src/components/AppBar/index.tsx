/** @jsx jsx */

import { jsx } from "@emotion/core";
import { ChangeEvent } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
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

import { useAuth, ContextPros as AuthCtxProps } from "../../context/auth";
import { useUser, ContextPros as UserCtxProps } from "../../context/user";
import { menuBtn, emoji, title, select } from "./styles";

interface Props {
  onClickIcon: () => void;
}

export default ({ onClickIcon }: Props): JSX.Element | null => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuth() as AuthCtxProps;
  const { name, lang, setLang } = useUser() as UserCtxProps;

  const handleLangChange = (e: ChangeEvent<{ value: unknown }>): void => {
    setLang(e.target.value as string);
  };

  const handleLogout = (): void => {
    logout(() => {
      history.push("/");
    });
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
          <FormattedMessage
            id="title"
            values={{ name: isAuthenticated && name }}
          />
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
        {!isAuthenticated ? (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        ) : (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  ) : null;
};
