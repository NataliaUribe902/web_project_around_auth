import { Navigate } from "react-router-dom";
function ProtectedRoute({ children, loggedIn }) {
  return loggedIn ? children : <Navigate to="/signin"></Navigate>;
}
export default ProtectedRoute;
