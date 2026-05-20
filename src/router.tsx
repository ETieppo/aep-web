import type { JSX } from 'react/jsx-runtime';
import LoginComponent from './app/auth/login';
import { ProtectedLayout } from './app/protected/ProtectedLayout';
import { HiHomeModern } from 'react-icons/hi2';
import { TiTicket } from 'react-icons/ti';
import { DashComponent } from './app/protected/dash/DashComponent';

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

export const joinPath = (endpoint: string, parent: string) =>
  endpoint.startsWith('/') ? `${parent}${endpoint}` : `${parent}/${endpoint}`;

export const router: RouteProps[] = [
  { path: '/', component: <LoginComponent />, children: undefined, icon: undefined, hidden, title: 'Login' },
  {
    path: 'app',
    component: <ProtectedLayout />,
    icon: undefined,
    hidden,
    children: [
      {
        path: 'dash',
        icon: <HiHomeModern />,
        component: <DashComponent />,
        title: 'Início',
        children: undefined,
      },
      { path: 'tickets', icon: <TiTicket />, component: undefined, title: 'Solicitação', children: [] },
    ],
  },
];
