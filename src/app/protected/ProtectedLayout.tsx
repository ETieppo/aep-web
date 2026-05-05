import { Outlet } from 'react-router';
import './protected.css';
import { useState, type JSX } from 'react';
import { MdMenu } from 'react-icons/md';
import { Link } from 'react-router';
import { router, type RouteProps } from '../../router';

export function ProtectedLayout() {
  const [navClass, setNavClass] = useState('closed');
  const toggleNavClass = () => setNavClass(navClass == 'open' ? 'closed' : 'open');

  return (
    <div className='relative'>
      <div className={`${navClass} nav-bar`}>
        <button
          onClick={toggleNavClass}
          className='menu'
        >
          <MdMenu />
        </button>
        {router.map((r) => mapRoutes(r, ''))}
      </div>
      <Outlet />
    </div>
  );
}

function mapRoutes(route: RouteProps, parentPath: string): JSX.Element {
  return (
    <>
      {!route.hidden && (
        <Link
          to={`/${parentPath}/${route.path}`}
          className='link'
        >
          <span>{route.icon}</span>
          <p>{route.title}</p>
        </Link>
      )}
      {route.children && route.children.map((cr) => mapRoutes(cr, route.path))}
    </>
  );
}
