import { lazy } from "react";

const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));

export { Login, Home };
