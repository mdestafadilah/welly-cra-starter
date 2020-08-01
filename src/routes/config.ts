import { lazy } from "react";
import { RouteProps } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));
const Protected = lazy(() => import("../pages/Protected"));
const NoMatch = lazy(() => import("../pages/NoMatch"));

export interface Route extends RouteProps {
  isPrivate?: boolean;
  redirect?: string;
  routes?: RouteProps[];
}

interface RouteConfig {
  redirect?: string;
  routes: Route[];
}

// Setup your routes here
const routeConfig: RouteConfig = {
  routes: [
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/",
      exact: true,
      component: Home,
    },
    {
      isPrivate: true,
      path: "/protected",
      redirect: "/login",
      component: Protected,
    },
    {
      component: NoMatch,
    },
  ],
};

export default routeConfig;
