import { useSession } from '../hooks/SessionProvider';
import { Navigate, Outlet } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

export default function ProtectedRoute({ children, redirectPath }) {
  const { user: user } = useSession();

  return user ? <Outlet /> : <Navigate to='/signin' replace={true} />;
}
