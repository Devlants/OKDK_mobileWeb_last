// App.js

import React from "react";
import {
  BrowserRouter as Routes,
  Route,
  Link,
  BrowserRouter,
  Router,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite/Favorite";
import Payment from "./pages/Payment/Payment";
import Setting from "./pages/SettingPage/Setting";
import EarningInfomation from "./pages/Payment/EarningInfomation";
import AddStoreToEarning from "./pages/Payment/AddStoreToEarning";
import Login from "./pages/Login/Login";
import Morecards from "./pages/CardDetail/Morecards";
import CardEnroll from "./pages/CardDetail/CardEnroll";
import CardSetting from "./pages/CardDetail/CardSetting";
import DirectInput from "./pages/CardDetail/DirectInput";
import DetailEarningInfomation from "./pages/Payment/DetailEarningInfomation";
import PaymentDetail from "./pages/Payment/PaymentDetail";
import AddStoreToFavorite from "./pages/Favorite/AddStoreToFavorite";
import AddFavoriteMenu from "./pages/Favorite/AddFavoriteMenu";
import AddFavoriteMenuOption from "./pages/Favorite/AddFavoriteMenuOption";
import PaymentHistoryReceipt from "./pages/Payment/PaymentHistoryReceipt";
import FaceRegistration from "./pages/SettingPage/FaceRegistration";
import AccountOfficer from "./pages/SettingPage/AccountOfficer";
import ThemeSetting from "./pages/SettingPage/ThemeSetting";
import KakaoLogin from "./pages/Login/KakaoLogin";
import NaverLogin from "./pages/Login/NaverLogin";
import GoogleLogin from "./pages/Login/GoogleLogin";

import Camera from "./pages/CardDetail/Camera";
import EnrollComplete from "./pages/CardDetail/EnrollComplete";
import CardModify from "./pages/CardDetail/CardModify";
const GlobalStyle = createGlobalStyle`
 *{
      margin: 0;
      padding: 0;
      font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif;
  }
  body {
    text-align: center;
    margin: 0 auto;
    max-width: 479px;
  }
  .hidden {height:100%; min-height:100%; overflow:hidden !important; touch-action:none;}
  .button {color: #056CF2; border-radius: 30px;}
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Home",
    element: <Home />,
  },

  {
    path: "/Favorite",
    element: <Favorite />,
  },

  {
    path: "/Payment",
    element: <Payment />,
  },
  {
    path: "/Setting",
    element: <Setting />,
  },
  {
    path: "/EarningInfomation",
    element: <EarningInfomation />,
  },
  {
    path: "/AddStoreToEarning",
    element: <AddStoreToEarning />,
  },
  {
    path: "/DetailEarningInfomation",
    element: <DetailEarningInfomation />,
  },
  {
    path: "/PaymentDetail",
    element: <PaymentDetail />,
  },
  {
    path: "/PaymentHistoryReceipt",
    element: <PaymentHistoryReceipt />,
  },
  {
    path: "/FaceRegistration",
    element: <FaceRegistration />,
  },
  {
    path: "/AccountOfficer",
    element: <AccountOfficer />,
  },
  {
    path: "/ThemeSetting",
    element: <ThemeSetting />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "/Morecards", element: <Morecards /> },
  {
    path: "/CardModify",
    element: <CardModify />,
  },
  {
    path: "/CardEnroll",
    element: <CardEnroll />,
  },
  {
    path: "/CardSetting",
    element: <CardSetting />,
  },
  {
    path: "/DirectInput",
    element: <DirectInput />,
  },
  {
    path: "/Camera",
    element: <Camera />,
  },
  {
    path: "/EnrollComplete",
    element: <EnrollComplete />,
  },

  {
    path: "/AddStoreToFavorite",
    element: <AddStoreToFavorite />,
  },
  {
    path: "/AddFavoriteMenu",
    element: <AddFavoriteMenu />,
  },
  {
    path: "/AddFavoriteMenuOption",
    element: <AddFavoriteMenuOption />,
  },
  {
    path: "/kakao/callback",
    element: <KakaoLogin />,
  },
  {
    path: "/naver/callback",
    element: <NaverLogin />,
  },
  {
    path: "/google/callback",
    element: <GoogleLogin />,
  },
]);

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
