// Pages
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

import Customers from './Customers';
import Loadable from '@/components/Loadable';
import ProtectedRoute from '@/components/ProtectedRoute';
import PublicRoute from '@/components/PublicRoute';

import AuthLayout from '@/layouts/Auth/AuthLayout';
import DashboardLayout from '@/layouts/Dashboard';
import ChangePassword from '@/views/Auth/ChangePassword';
import ForgotPassword from '@/views/Auth/ForgotPassword';
import Login from '@/views/Auth/Login';
import Registration from '@/views/Auth/Registration';
import AuthGuard from '@/components/AuthGuard';
import manageRoutes from './Manage';
import LandingPageLayout from '@/layouts/LandingPage';

// Home
const Home = Loadable(lazy(() => import('@/views/Home')));

// Error
const NotFound = Loadable(lazy(() => import('@/views/Errors/NotFound')));
const PermissionDenied = Loadable(lazy(() => import('@/views/Errors/PermissionDenied')));

// Landing Page
const DashboardHome = Loadable(lazy(() => import('@/views/LandingPage/Dashboard/index')));
const CentralExhibition = Loadable(lazy(() => import('@/views/LandingPage/Components/CentralExhibition')));
const IntroduceAboutMuseum = Loadable(lazy(() => import('@/views/LandingPage/Components/IntroduceAboutMuseum')));
const OutstandingCollection = Loadable(lazy(() => import('@/views/LandingPage/Components/OutstandingCollections')));
const InformationOfTicket = Loadable(lazy(() => import('@/views/LandingPage/Dashboard/InformationOfTicket')));
const UtilityServices = Loadable(lazy(() => import('@/views/LandingPage/Dashboard/UtilityServices')));
const Exhibition = Loadable(lazy(() => import('@/views/LandingPage/Exhibition/index')));
const ScheduleOfExhibition = Loadable(lazy(() => import('@/views/LandingPage/Exhibition/ScheduleOfExhibition')));
const Pages = Loadable(lazy(() => import('@/views/LandingPage/Pages/index')));
const Visit = Loadable(lazy(() => import('@/views/LandingPage/Visit/index')));
const Shop = Loadable(lazy(() => import('@/views/LandingPage/Shop/index')));
const Contact = Loadable(lazy(() => import('@/views/LandingPage/Contact/index')));

// Auth

const routes: RouteObject[] = [
  // --- NHÁNH 1: CÁC TRANG ĐƯỢC BẢO VỆ (PRIVATE) ---
  {
    path: '/manage',
    element: <AuthGuard/>,
    children: [
      {
        element: <DashboardLayout />,
        children: manageRoutes
      }
    ],
  },

  // --- NHÁNH 2: CÁC TRANG XÁC THỰC (CHỈ DÀNH CHO NGƯỜI CHƯA ĐĂNG NHẬP) ---
  {
    path: 'auth',
    element: <PublicRoute/>,
    children: [
      {
        element: <AuthLayout/>,
        children: [
          { index: true, element: <Navigate to={'login'} replace /> },
          { path: 'login', element: <Login /> },
          { path: 'registration', element: <Registration /> },
          { path: 'forgot-password', element: <ForgotPassword /> },
          { path: 'change-password', element: <ChangePassword /> },
        ]
      }
    ]
  },

  // --- NHÁNH 3: CÁC TRANG CÔNG KHAI (LANDING PAGE - DÀNH CHO TẤT CẢ MỌI NGƯỜI)
  {
    path: '/',
    element: <LandingPageLayout />,
    children: [
      { path: 'home', element: <DashboardHome />},
      { path: 'center-exhibition', element: <CentralExhibition />},
      { path: 'introduce-museum', element: <IntroduceAboutMuseum />},
      { path: 'outstanding-collection', element: <OutstandingCollection />},
      { path: 'information-ticket', element: <InformationOfTicket />},
      { path: 'utility-service', element: <UtilityServices />},
      { path: 'exhibition', element: <Exhibition/>},
      { path: 'schedule-exhibition', element: <ScheduleOfExhibition />},
      { path: 'pages', element: <Pages />},
      { path: 'visit', element: <Visit />},
      { path: 'shop', element: <Shop />},
      { path: 'contact', element: <Contact />},
      // Nếu người dùng vào '/', mặc định hiển thị trang home
      { index: true, element: <Navigate to='home' replace /> },
    ]
  },

  // --- NHÁNH 4: CÁC TRANG LỖI (Nằm ngoài các layout chính) ---
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/403',
    element: <PermissionDenied />,
  },
];

const Routers = () => {
  const element = useRoutes(routes);
  return element;
};

export default Routers;
