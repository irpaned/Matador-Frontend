import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { MainLayout } from "./component/layouts/MainLayout";
import { NavBar } from "./component/navigation/NavBar";
import { axiosInstance } from "./libs/axios";
import ForgotPage from "./pages/auth/ForgotPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import { ProductPage } from "./pages/productPage";
import { ProfilePage } from "./pages/profilePage";
import { SET_USER } from "./redux/slices/auth";
import LoginCallbackHandler from "./pages/auth/LoginCallbackHandler";
function App() {
  const dispatch = useDispatch();
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get("/auth/check");
        dispatch(
          SET_USER({
            ...response.data,
          })
        );
        console.log("CEKK", response.data);
        return response.data;
      } catch {
        throw new Error("Unauthenticated");
      }
    },
    retry: 1,
  });

  const PrivateRoute = () => {
    return authUser ? <Outlet /> : <Navigate to={"/auth/login"} />;
  };

  const AuthRoute = () => {
    return !authUser ? <Outlet /> : <Navigate to={"/"} />;
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route element={<PrivateRoute />}>
            <Route index element={<ProfilePage />} />
            <Route path="product" element={<ProductPage />} />
          </Route>
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="auth/register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPage />} />
        </Route>
        <Route
          path="/auth/google/callback"
          element={<LoginCallbackHandler />}
        />
        <Route path="test" element={<NavBar />} />
      </Routes>
    </>
  );
}

export default App;
