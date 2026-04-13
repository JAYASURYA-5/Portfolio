import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
