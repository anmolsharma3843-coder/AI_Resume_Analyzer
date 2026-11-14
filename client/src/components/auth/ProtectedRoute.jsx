
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../../pages/Login";

const ProtectedRoute = () => {
  const { user, loading } = useSelector(
    (state) => state.auth
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-gray-950">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      </div>
    );
  }

  return (
    <>
      <Outlet />

      {!user && <Login />}
    </>
  );
};

export default ProtectedRoute;
