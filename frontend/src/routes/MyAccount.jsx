import React, { useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useTranslation } from 'react-i18next';
import { logoutUser } from '../api/api';
import { useLoader } from '../context/LoaderContext';
import RouteBanner from '../components/RouteBanner';

function MyAccount() {
  const { userData, setUserData } = useContext(UserContext);
  const { setLoading } = useLoader();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then(() => {
        setLoading(false);
      });
      document.title = 'Pronia - Account';
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUserData(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  if (!userData) {
    return (
      <div>
        <RouteBanner />
        <div className="myaccount">
          <p className='nologin'>
            You are not logged in. Please 
            <Link to="/login">{t("Login")}</Link> 
            or 
            <Link to="/register">{t("Register")}</Link>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <RouteBanner />
      <section className="account-section">
        <div className="account-container">
          <div className="account-sidebar">
            <ul>
              <li className="active">{t("Dashboard")}</li>
              <li><Link>{t("Orders")}</Link></li>
              <li><Link>{t("Adresses")}</Link></li>
              <li><Link>{t("Account Details")}</Link></li>
              <li><button onClick={handleLogout}>{t("Logout")}</button></li>
            </ul>
          </div>

          <div className="account-content">
            {!userData ? (
              <div className="not-logged-in">
                <p>
                  {t("You are not logged in.")}{" "}
                  <Link to="/login">{t("Login")}</Link> {t("or")}{" "}
                  <Link to="/register">{t("Register")}</Link>.
                </p>
              </div>
            ) : (
              <div className="account-info">
                <p>
                  Hello <b>{userData.firstname} </b>
                  {' ('}not {userData.firstname}? <button className='logout-button' onClick={handleLogout}>Sign Out</button>{')'}
                </p>
                <p className='desc'>From your account dashboard you can view your recent orders, manage your shipping and billing addresses and edit your password and account details.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default MyAccount