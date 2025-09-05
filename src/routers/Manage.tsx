import Loadable from "@/components/Loadable";
import { ROUTE_PATH } from "@/constants/routes";
import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";

const Home = Loadable(lazy(() => import('@/views/Manage/Home/index')));
const Blog = Loadable(lazy(() => import('@/views/Manage/Blog/index')));
const Turnover = Loadable(lazy(() => import('@/views/Manage/Turnover/index')));
const Information = Loadable(lazy(() => import('@/views/Manage/Information/index')));
const Package = Loadable(lazy(() => import('@/views/Manage/Packages/index')));
const Action = Loadable(lazy(() => import('@/views/Manage/Permission/Actions/index')));
const Menu = Loadable(lazy(() => import('@/views/Manage/Permission/Menus/index')));
const GroupRole = Loadable(lazy(() => import('@/views/Manage/Permission/GroupRole/index')));

const manageRoutes: RouteObject[] = [
    { index: true, element: <Navigate to={ROUTE_PATH.MANAGE_HOME} replace/>},
    { path: ROUTE_PATH.MANAGE_HOME, element: <Home/>},
    { path: ROUTE_PATH.MANAGE_BLOG, element: <Blog/>},
    { path: ROUTE_PATH.MANAGE_TURNOVER, element: <Turnover/>},
    { path: ROUTE_PATH.MANAGE_INFORMATION, element: <Information/>},
    { path: ROUTE_PATH.MANAGE_PACKAGE, element: <Package/>},
    { path: ROUTE_PATH.MANAGE_ACTION, element: <Action/>},
    { path: ROUTE_PATH.MANAGE_MENU, element: <Menu/>},
    { path: ROUTE_PATH.MANAGE_ROLE, element: <GroupRole/>},
];

export default manageRoutes;