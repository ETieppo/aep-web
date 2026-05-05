import type { JSX } from 'react/jsx-runtime';
import LoginComponent from './app/auth/login';
import { AdminDashComponent } from './app/protected/dash/AdminDashComponent';
import { DashLayout } from './app/protected/dash/DashLayout';
import { ProtectedLayout } from './app/protected/ProtectedLayout';
import { HiHomeModern } from 'react-icons/hi2';
import { TiTicket } from 'react-icons/ti';
import { CommonDashComponent } from './app/protected/dash/CommonAdminDash';

export type RouteProps = {
  children: RouteProps[] | undefined;
  path: string;
  component: JSX.Element | undefined;
  icon: JSX.Element | undefined;
  title?: string;
  hidden?: boolean;
  adminOnly?: boolean;
};

const hidden = true;
const adminOnly = true;
export const router: RouteProps[] = [
  // { path: '/', component: <LoginComponent />, children: undefined, icon: undefined, hidden, title: 'Login' },
  {
    path: '/app',
    component: <ProtectedLayout />,
    icon: undefined,
    hidden,
    children: [
      {
        path: '/dash',
        icon: undefined,
        component: <DashLayout />,
        hidden,
        children: [
          {
            adminOnly,
            component: <AdminDashComponent />,
            icon: <HiHomeModern />,
            children: undefined,
            path: 'admin',
            title: 'Início',
          },
          {
            component: <CommonDashComponent />,
            icon: <HiHomeModern />,
            children: undefined,
            path: '/common',
            title: 'Início',
          },
        ],
      },
      { path: '/tickets', icon: <TiTicket />, component: undefined, title: 'Solicitação', children: [] },
    ],
  },
];
