import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {

        localStorage.removeItem("user");
        localStorage.removeItem("userToken");

        navigate("/user-login");

    }, []);

    return (
        <div className="container py-5 text-center">
            <h4>Logging Out...</h4>
        </div>
    );

};

export default Logout;