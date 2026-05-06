import { Outlet } from 'react-router';
import './protected.css';
import { useState, type JSX } from 'react';
import { MdMenu } from 'react-icons/md';
import { Link } from 'react-router';
import { joinPath, router, type RouteProps } from '../../router';
import { FiArrowLeft } from 'react-icons/fi';

export function ProtectedLayout() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className='grid grid-cols-2 grid-rows-1 h-screen overflow-hidden text-md'>
      <div className={`${navOpen ? 'open' : 'closed'} nav-bar`}>
        <button
          onClick={() => setNavOpen(!navOpen)}
          className='menu'
        >
          {navOpen ?
            <FiArrowLeft />
          : <MdMenu />}
        </button>
        {router.map((r) => mapRoutes(r, ''))}
      </div>
      <Outlet />
    </div>
  );
}

function mapRoutes(route: RouteProps, parentPath: string): JSX.Element[] {
  const actualPath = joinPath(route.path, parentPath);
  const elements: JSX.Element[] = [];
  if (!route.hidden && route.icon && route.title) elements.push(renderLink(route, actualPath));

  if (route.children) {
    const childElements = route.children.flatMap((child) => mapRoutes(child, actualPath));
    elements.push(...childElements);
  }

  return elements;
}

function renderLink(r: RouteProps, path: string): JSX.Element {
  return (
    <Link
      to={path}
      className='link'
      key={path}
    >
      <span>{r.icon}</span>
      <p>{r.title}</p>
    </Link>
  );
}
