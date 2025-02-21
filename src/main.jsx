import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './MainLayout.jsx'

import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import MainLayout from './MainLayout.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import Home from './pages/Home.jsx';
import AddTask from './pages/AddTask.jsx';
import Login from './pages/Login.jsx';
import PrivetRoute from './context/PrivetRoute.jsx';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    // errorElement: <div>Error</div>,
    children: [
      {
        path: "/",
        element: <PrivetRoute><Home></Home></PrivetRoute>
      },
      {
        path: "/add-task",
        element: <PrivetRoute><AddTask></AddTask></PrivetRoute>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
