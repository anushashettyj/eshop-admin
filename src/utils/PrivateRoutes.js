import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
const PrivateRoutes = () => {
  const userExist = useSelector(state => state.user.currentUser);
  const user = JSON.parse(localStorage.getItem('persist:root') || null)?.user
  const admin = JSON.parse(user || null)?.currentUser?.isAdmin || '';
  return (
    userExist ? <Outlet/> : <Navigate to='/login' />
  )
}

export default PrivateRoutes