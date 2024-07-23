import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import ProtectedRoute from './features/auth/ProtectedRoute';

import AppLayout from './layouts/AppLayout';

import PageNotFound from './pages/PageNotFound';
import Welcome from './pages/Welcome';
import DashBoard from './pages/DashBoard';
import UnderMaintenance from './utils/UnderMaintenance';
import Spaces from './pages/Spaces';
import SpaceInfo from './pages/SpaceInfo';
import PostInfo from './pages/PostInfo';
import UserInfo from './pages/UserInfo';
import ProfileDetails from './pages/ProfileDetails';
import SearchPage from './pages/SearchPage';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 0 } },
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
            <Route path="home" element={<DashBoard />} />
            <Route path="following" element={<UnderMaintenance />} />
            <Route path="answer" element={<UnderMaintenance />} />
            <Route path="spaces" element={<Spaces />} />
            <Route path="notification" element={<UnderMaintenance />} />
            <Route path="userinfo" element={<UserInfo />} />
            <Route path="/spaces/:id" element={<SpaceInfo />} />
            <Route path="/posts/:id" element={<PostInfo />} />
            <Route path="/home/posts/:id" element={<PostInfo />} />
            <Route path="/search/posts/:id" element={<PostInfo />} />
            <Route path="/profile/:id" element={<ProfileDetails />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
          <Route path="login" element={<Welcome />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
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
    </QueryClientProvider>
  );
}

export default App;
