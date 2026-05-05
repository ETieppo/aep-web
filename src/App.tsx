import './globals.css';
import { BrowserRouter } from 'react-router';
import { type RouteProps, router } from './router.tsx';
import { Route } from 'react-router';
import { Routes } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { AdminDashComponent } from './app/protected/dash/AdminDashComponent.tsx';

const joinPath = (endpoint: string, parent: string) =>
  endpoint.startsWith('/') ? `${parent}${endpoint}` : `${parent}/${endpoint}`;

function unwrap_router(r: RouteProps, parent_path: string, i: number) {
  const actualPath = joinPath(r.path, parent_path);
  console.log(actualPath)
  if (r.children)
    return (
      <Route
        key={i}
        path={actualPath}
        element={r.component}
      >
        {r.children && r.children.map((c) => unwrap_router(c, actualPath, i * 4))}
      </Route>
    );
  else
    return (
      <Route
        key={i}
        element={r.component}
        path={r.path}
      ></Route>
    );
}

function App() {
  return (
    <div>
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route element={<AdminDashComponent />} />
          {router.map((r, i) => unwrap_router(r, '', i))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
