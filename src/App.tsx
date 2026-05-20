import './globals.css';
import { BrowserRouter } from 'react-router';
import { type RouteProps, router, joinPath } from './router.tsx';
import { Route } from 'react-router';
import { Routes } from 'react-router';
import { Toaster } from 'react-hot-toast';

function unwrap_router(r: RouteProps, parent_path: string, i: number) {
  const actualPath = joinPath(r.path, parent_path);

  if (r.children)
    return (
      <Route
        key={i}
        path={actualPath}
        element={r.component}
      >
        {r.children && r.children.map((c) => unwrap_router(c, actualPath, ++i))}
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
    <>
      <Toaster />

      <BrowserRouter>
        <Routes>{router.map((r, i) => unwrap_router(r, '', i))}</Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
