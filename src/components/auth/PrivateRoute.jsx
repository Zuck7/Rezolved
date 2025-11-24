import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "./auth-helper.js";

const PrivateRoute = ({ children }) => {
    const location = useLocation();

    if (!isAuthenticated()) {
        // Redirect to signin, but save the location they were trying to access
        return (
            <Navigate
                to="/users/signin"
                replace
                state={{ from: location.pathname || "/" }}
            />
        );
    }

    return children;
};

export default PrivateRoute;
