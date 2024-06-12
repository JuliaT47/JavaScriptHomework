import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

import Login from "./Login";
import ErrorPage from "./ErrorPage";
import List2 from "./ReactHomework9-10-11";
import TaskEditor from "./TaskEditor";
import About from "./About";
import Home from "./Home";
import Layout from "./Layout";
import NotFound from "./NotFound";
import AuthContext from "../AuthContext";
import PrivateRoutes from "./PrivateRoutes";

// const Home = lazy(() => import("./Home"));
// const TaskEditor = lazy(() => import("./TaskEditor"));
// const About = lazy(() => import("./About"));
// const NotFound = lazy(() => import("./NotFound"));
// const Layout = lazy(() => import("./Layout"));
// const List2 = lazy(() => import("./ReactHomework9-10-11"));
// const ErrorPage = lazy(() => import("./ErrorPage"));
// const Login = lazy(() => import("./Login"));

const RouterDom = () => {
  const navigate = useNavigate();
  const [loginUSer, setLoginUser] = useState({ username: null, email: null });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { isFetching } = useQuery({
    queryFn: ["userList"],
    queryFn: () =>
      axios.get("http://localhost:3000/auth").then((res) => res.data),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const handleError = (error) => {
      navigate("./errorPage");
    };
  });

  return (
    // <Suspense fallback={"Loading..."}>
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Routes>
        <Route path="/" element={<Layout isFetching={isFetching} />}>
          <Route index element={<Home />} />
          <Route
            path="/login"
            element={<Login setLoginUser={setLoginUser} />}
          />
          <Route
            path="todo"
            element={
              <PrivateRoutes>
                <List2 />
              </PrivateRoutes>
            }
          />

          <Route
            path="about"
            element={
              <PrivateRoutes>
                <About />
              </PrivateRoutes>
            }
          />
          <Route path="edit/:taskId" element={<TaskEditor />} />
          <Route path="*" element={<NotFound />} />
          <Route path="errorPage" element={<ErrorPage />} />
        </Route>
      </Routes>
    </AuthContext.Provider>
    // </Suspense>
  );
};
export default RouterDom;
