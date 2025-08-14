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
import Registration from '@/views/Auth/Registration';
import AuthGuard from '@/components/AuthGuard';
import manageRoutes from './Manage';
import LandingPageLayout from '@/layouts/LandingPage';

// Home
const Home = Loadable(lazy(() => import('@/views/Home')));

// Error
const NotFound = Loadable(lazy(() => import('@/views/Errors/NotFound')));
const PermissionDenied = Loadable(lazy(() => import('@/views/Errors/PermissionDenied')));

//Auth
const Login = Loadable(lazy(() =>  import('@/views/Auth/Login')))

// Landing Page

// Trang chủ
const DashboardHome = Loadable(lazy(() => import('@/views/LandingPage/Dashboard/index')));
const ExhibitionOfTiffanyLight = Loadable(lazy(() => import('@/views/LandingPage/Dashboard/ExhibitionOfTiffanyLight')));
const ExhibitionOfBlueShine = Loadable(lazy(() => import('@/views/LandingPage/Dashboard/ExhibitionOfBlueShine')));
const ExploreMore = Loadable(lazy(() => import('@/views/LandingPage/Dashboard/ExploreMore')));
const DetailArticleCollection = Loadable(lazy(() => import('@/views/LandingPage/Dashboard/DetailArticleCollection')));

//Thăm quan
const VisitPlan = Loadable(lazy(() => import('@/views/LandingPage/Visit/VisitPlan')));
const TicketVisit = Loadable(lazy(() => import('@/views/LandingPage/Visit/TicketVisit')));
const CardMember = Loadable(lazy(() => import('@/views/LandingPage/Visit/CardMember')));
const FreeExperience = Loadable(lazy(() => import('@/views/LandingPage/Visit/FreeExperience')));
const MapMuseum = Loadable(lazy(() => import('@/views/LandingPage/Visit/MapMuseum')));

const ListClosedLocation = Loadable(lazy(() => import('@/views/LandingPage/Visit/components/ListClosedLocation')));
const DirectionForVisiter = Loadable(lazy(() => import('@/views/LandingPage/Visit/components/DirectionForVisiter')));
const ParkingLot = Loadable(lazy(() => import('@/views/LandingPage/Visit/components/ParkingLot')));

const DetailArt = Loadable(lazy(() => import('@/views/LandingPage/Components/DetailArt')));

const Exhibition = Loadable(lazy(() => import('@/views/LandingPage/Exhibition/Exhibition')));
const EventAndPerformance = Loadable(lazy(() => import('@/views/LandingPage/Exhibition/EventAndPerformance')));
const CollectionMuseum = Loadable(lazy(() => import('@/views/LandingPage/Art/CollectionMuseum')));
const AboutUs = Loadable(lazy(() => import('@/views/LandingPage/AboutUs/index')));



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
    path: '/auth',
    element: <PublicRoute/>,
    children: [
      {
        element: <AuthLayout/>,
        children: [
          { index: true, element: <Navigate to='login' replace /> },
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
      { 
        path: 'home', 
        element: <Outlet />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: 'exhibition-tiffany-light', element: <ExhibitionOfTiffanyLight/>},
          { path: 'exhibition-blue-shine', element: <ExhibitionOfBlueShine/>},
          { path: 'explore-more', element: <ExploreMore/>},
          { path: 'explore-more/detail-article/:id', element: <DetailArticleCollection/>},
        ]
      },
      { 
        path: 'visit-plan', 
        element: <Outlet/>,
        children: [
            { index: true, element: <VisitPlan/> },
            { path: 'close-location', element: <ListClosedLocation/>},
            { path: 'direct-for-visiter', element: <DirectionForVisiter/>},
            { path: 'direct-parking-lot', element: <ParkingLot/>},
            { path: 'detail-art/:id', element: <DetailArt/>}
          ]
      },
      { path: 'ticket-visit', element: <TicketVisit/>},
      { path: 'card-member', element: <CardMember/>},
      { path: 'free-experience', element: <FreeExperience/>},
      { path: 'map-museum', element: <MapMuseum/>},
      { path: 'exhibition', element: <Exhibition/>},
      { path: 'event-performance', element: <EventAndPerformance/>},
      { path: 'museum-collection', element: <CollectionMuseum/>},
      { path: 'about-us', element: <AboutUs/>},

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
