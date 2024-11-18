import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import PostDetails from "../Pages/PostDetails/PostDetails";
import MemberShip from "../Pages/MemberShip/MemberShip";
import Dashboard from "../layout/Dashboard";
import ProfileDivider from "../Pages/DashoboardPages/Profile/ProfileDivider";
import AddPost from "../Pages/DashoboardPages/AddPost/AddPost";
import MyPosts from "../Pages/DashoboardPages/MyPosts/MyPosts";
import PostComments from "../Pages/DashoboardPages/PostComments/PostComments";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Statistics from "../Pages/DashoboardPages/Shared/Statistics";
import ManageUsers from "../Pages/DashoboardPages/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";
import Announcement from "../Pages/DashoboardPages/Announcement/Announcement";
import DashboardDivider from "../Pages/DashoboardPages/Dashboard/DashboardDivider";
import Activities from "../Pages/DashoboardPages/Activities/Activities";
import useAuth from "../hooks/useAuth";
import Survey from "../Pages/DashoboardPages/Survey/Survey";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("https://post-pulse-server.vercel.app/postsCount"),
      },
      {
        path: "/post/:id",
        element: <PostDetails />,
      },
      {
        path: "/membership",
        element: <MemberShip />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },

  // Dashboard
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      // {
      //   index: true,
      //   element: <DashboardDivider />,
      // },
      {
        index: true,
        element: <ProfileDivider />,
      },
      {
        path: "add-post",
        element: <AddPost />,
      },
      {
        path: "my-posts",
        element: <MyPosts />,
      },
      {
        path: "comments/:postId",
        element: <PostComments />,
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "activities",
        element: (
          <AdminRoute>
            <Activities />
          </AdminRoute>
        ),
      },
      {
        path: "announcement",
        element: (
          <AdminRoute>
            <Announcement />
          </AdminRoute>
        ),
      },
      {
        path: "survey",
        element: (
          <AdminRoute>
            <Survey />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
