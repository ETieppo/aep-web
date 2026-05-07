import type { JSX } from 'react/jsx-runtime';
import LoginComponent from './app/auth/login';
import { ProtectedLayout } from './app/protected/ProtectedLayout';
import { HiHomeModern } from 'react-icons/hi2';
import { TiTicket } from 'react-icons/ti';
import { DashAllTicketsComponent } from './app/protected/dash/DashAllTickets.component';
import { DashLayout } from './app/protected/dash/DashLayout';

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
        icon: undefined,
        component: <DashLayout />,
        hidden,
        children: [
          {
            component: <DashAllTicketsComponent />,
            icon: <HiHomeModern />,
            children: undefined,
            path: 'all',
            title: 'Início',
          },
        ],
      },
      { path: 'tickets', icon: <TiTicket />, component: undefined, title: 'Solicitação', children: [] },
    ],
  },
];
