import React from 'react';
import { UserProvider } from './context/UserContext';
import { Route, Routes } from 'react-router-dom';
import { useLoader } from './context/LoaderContext';
import './styles/app.scss';
import Header from './layouts/Header.jsx';
import Main from './layouts/Main.jsx';
import Footer from './layouts/Footer.jsx';
import Home from './routes/Home.jsx';
import About from './routes/About.jsx';
import Contact from './routes/Contact.jsx';
import Shop from './routes/Shop.jsx';
import Blog from './routes/Blog.jsx';
import Register from './routes/Register.jsx';
import Login from './routes/Login.jsx';
import ForgotPassword from './routes/ForgotPassword.jsx';
import ResetPassword from './routes/ResetPassword.jsx';
import Loading from './components/Loading.jsx';

function App() {
  const { loading } = useLoader();

  return (
    <UserProvider>
      {loading ? (
        <Loading />
        ) : (
        <Header>
          <Routes>
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
          </Routes>
        </Header>
      )}
      <Main>
        {loading ? (
          <Loading />
        ) : (
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/shop"
              element={<Shop />}
            />
            <Route
              path="/blog"
              element={<Blog />}
            />
            <Route
              path="/about"
              element={<About />}
            />
            <Route
              path="/contact"
              element={<Contact />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />
            <Route
              path="/reset-password/:token"
              element={<ResetPassword />}
            />
          </Routes>
        )}
      </Main>
      <Footer />
    </UserProvider>
  );
}

export default App;
