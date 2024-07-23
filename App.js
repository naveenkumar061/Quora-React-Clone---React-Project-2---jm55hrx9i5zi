import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import ProtectedRoute from './ui/ProtectedRoute';
import AppLayout from './ui/AppLayout';
import HomePage from './pages/HomePage';
import UnderMaintenance from './ui/UnderMaintenance';
import Spaces from './pages/Spaces';
import UserDetails from './features/authentication/UserDetails';
import Posts from './pages/Posts';
import Profile from './pages/Profile';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<HomePage />} />
            <Route path="following" element={<UnderMaintenance />} />
            <Route path="answer" element={<UnderMaintenance />} />
            <Route path="spaces" element={<Spaces />} />
            <Route path="notification" element={<UnderMaintenance />} />
            <Route path="userdetails" element={<UserDetails />} />
            <Route path="/spaces/:id" element={<Spaces />} />
            <Route path="/posts/:id" element={<Posts />} />
            <Route path="/home/posts/:id" element={<Posts />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: { duration: 5000 },
            error: { duration: 3000 },
            style: {
              fontStyle: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'white',
              color: 'rgba(120,120,120,.7)',
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
