import { Outlet } from 'react-router';
import './protected.css';
import { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { HiHomeModern } from 'react-icons/hi2';
import { Link } from 'react-router';
import type { RouteProps } from '../../router';

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
        <Link to=''>
          <HiHomeModern />
          <label>Home</label>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}

function mapRoutes(route:RouteProps){
return route.children?<Link>:<Link></Link>
}
