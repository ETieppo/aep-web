import { Outlet } from 'react-router';
import { useEffect, useState, type JSX } from 'react';
import { MdMenu } from 'react-icons/md';
import { Link } from 'react-router';
import { joinPath, router, type RouteProps } from '../../router';
import { FiArrowLeft } from 'react-icons/fi';
import { useLocation } from 'react-router';

export function ProtectedLayout() {
  const path = useLocation().pathname;
  const [navOpen, setNavOpen] = useState(false);
  const handleLinkClick = () => setNavOpen(false);

  return (
    <div className='flex h-screen overflow-hidden text-md p-[var(--gap)] gap-[var(--gap)]'>
      <div className={`${navOpen ? 'open' : 'closed'} nav-bar`}>
        <button
          onClick={() => setNavOpen(!navOpen)}
          className='menu'
        >
          {navOpen ?
            <FiArrowLeft />
          : <MdMenu />}
        </button>
        {router.map((r) => mapRoutes(r, '', handleLinkClick))}
      </div>
      <div className='flex flex-col w-full h-full'>
        <Outlet />
      </div>
    </div>
  );
}

function mapRoutes(route: RouteProps, parentPath: string, handleLinkClick: () => void): JSX.Element[] {
  const actualPath = joinPath(route.path, parentPath);
  const elements: JSX.Element[] = [];
  if (!route.hidden && route.icon && route.title)
    elements.push(renderLink(route, actualPath, handleLinkClick));

  if (route.children) {
    const childElements = route.children.flatMap((child) => mapRoutes(child, actualPath, handleLinkClick));
    elements.push(...childElements);
  }

  return elements;
}

function renderLink(r: RouteProps, path: string, handleLinkClick: () => void): JSX.Element {
  return (
    <Link
      to={path}
      className='link'
      key={path}
      onClick={handleLinkClick}
    >
      <span>{r.icon}</span>
      <p>{r.title}</p>
    </Link>
  );
}
