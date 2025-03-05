import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const { token } = useSelector((state) => state.auth);
    console.log("token----------------------",token)
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;