import type { JSX } from 'react/jsx-runtime';
import LoginComponent from './app/auth/login';
import { SiAdminer } from 'react-icons/si';
import { AdminDashComponent } from './app/protected/dash/AdminDashComponent';
import { DashLayout } from './app/protected/dash/DashLayout';
import { ProtectedLayout } from './app/protected/ProtectedLayout';

export type RouteProps = {
  children: RouteProps[] | undefined;
  path: string;
  component: JSX.Element;
  icon: JSX.Element | undefined;
};

export const router: RouteProps[] = [
  { path: '/', component: <LoginComponent />, children: undefined, icon: undefined },
  {
    path: '',
    component: <ProtectedLayout />,
    icon: undefined,
    children: [
      {
        path: '/dash',
        icon: undefined,
        component: <DashLayout />,
        children: [
          { component: <AdminDashComponent />, icon: <SiAdminer />, children: undefined, path: 'admin' },
        ],
      },
    ],
  },
];
