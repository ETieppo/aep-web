import { useState } from 'react';
import { Outlet } from 'react-router';

export function DashLayout() {
  const [username, setUsername] = useState<string>('nome teste');

  return (
    <div>
      <h1>{username}</h1>
      <Outlet />
    </div>
  );
}
