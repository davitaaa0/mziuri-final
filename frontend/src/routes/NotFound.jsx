import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLoader } from '../context/LoaderContext';
import { useTranslation } from 'react-i18next';
import RouteBanner from '../components/RouteBanner';
import n404 from '../assets/icons/n404.png'

function NotFound() {

    const { setLoading } = useLoader();
    const { t } = useTranslation();

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then((response) => response.json())
        .then(() => {
            setLoading(false);
        });
        document.title = 'Pronia - Error 404';
    }, []);

    return (
        <>
            <RouteBanner is404={true}/>
            <div className='notfound'>
                <img src={n404} alt="n404" />
                <h1>Oops, page not found!</h1>
                <Link to="/">
                    <span>back to home</span> <i class="fi fi-tr-house-chimney"></i>
                </Link>
            </div>
        </>
    );
}

export default NotFound;
