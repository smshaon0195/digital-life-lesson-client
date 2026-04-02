import { createBrowserRouter } from "react-router";
import HomeLayout from "../Home/HomeLayout/HomeLayout";
import HomePage from "../Home/Home/HomePage";
import Login from "../../Authentication/Login";
import Register from "../../Authentication/Register";
import AddLesson from "../../../Pages/AddLesson/AddLesson";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import MyLesson from "../../../Pages/MyLesson/MyLesson";
import PublicLesson from "../../../Pages/PublicLesson/PublicLesson";
import Pricing from "../../../Pages/Pricing/Pricing";
import Dashboard from "../../../Pages/Dashboard/Dashboard";
import Profile from "../../../Pages/Profile/Profile";
import Favorites from "../../../Pages/Favorites/Favorites";
import LessonDetails from "../../../Pages/LessonDetails/LessonDetails";
import ProfileSetting from "../../../Pages/ProfileSetting/ProfileSetting";
import FotgotPassword from "../../Authentication/FotgotPassword";
import PricingDetails from "../../../Pages/PricingCards/PricingDetails";
import Payment from "../../../Pages/PricingCards/Payment";
import PaymentSuccess from "../../../Pages/PricingCards/PaymentSuccess";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
      {
        path: "dashboard/Add-Lesson",
        element: (
          <PrivateRoute>
            <AddLesson></AddLesson>,
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard/my-Lesson",
        element: (
          <PrivateRoute>
            <MyLesson></MyLesson>
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard/Public-Lesson",
        element: <PublicLesson></PublicLesson>,
      },
      {
        path: "dashboard/Pricing",
        element: <Pricing></Pricing>,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/favorites",
        element: (
          <PrivateRoute>
            <Favorites></Favorites>
          </PrivateRoute>
        ),
      },
      {
        path: "/lesson-Details/:id",
        element: (
          <PrivateRoute>
            <LessonDetails></LessonDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/user-profile/setting",
        element: (
          <PrivateRoute>
            <ProfileSetting></ProfileSetting>
          </PrivateRoute>
        ),
      },
      {
        path: "/auth/password-reset",
        element: <FotgotPassword></FotgotPassword>,
      },
      {
        path: "/pricing/:name",
        element: (
          <PrivateRoute>
            <PricingDetails></PricingDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/user-upgrade/payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "user-upgrade/payment-succes",
        element: (
          <PrivateRoute>
            <PaymentSuccess></PaymentSuccess>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
