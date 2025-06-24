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
          <p>You are not logged in. Please <Link href="/login">{t("Login")}</Link> or <Link href="/register">{t("Register")}</Link>.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <RouteBanner />
      <div className="myaccount">
        <h2>{t("My Account")}</h2>
        <div className="account_info">
          <p><strong>First Name:</strong> {userData.firstname}</p>
          <p><strong>Last Name:</strong> {userData.lastname}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
        <button className="logout_button" onClick={handleLogout}>
          {t("Logout")}
        </button>
      </div>
    </div>
  )
}

export default MyAccount