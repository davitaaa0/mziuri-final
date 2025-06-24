import React, { useContext } from 'react';
import Rating from '../components/Rating.jsx';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../context/CurrencyContext';
import { convertToCurrencySymbol } from '../utils/formatText.jsx';
import { CartContext } from '../context/CartContext';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function Product({ product }) {
  const { i18n } = useTranslation();
  const { currency } = useCurrency();
  const { addToCart } = useContext(CartContext);
  const currentLang = i18n.language || 'en';

  return (
    <div className="product">
      <div className="image-container">
        <img
          src={product.image}
          alt="product"
          className="main-image"
        />
        <img
          src={product.image2}
          alt="product-hover"
          className="hover-image"
        />
        <div className="product-actions">
          <Tippy content="Add to Wishlist" placement="top">
            <button className="wishlist"><i className="fi fi-rr-heart"></i></button>
          </Tippy>
          <Tippy content="Quickview" placement="top">
            <button className="quickview"><i className="fi fi-rr-eye"></i></button>
          </Tippy>
          <Tippy content="Add to Cart" placement="top">
            <button 
              className="addtocart"
              onClick={() => addToCart(product)}
            >
              <i className="fi fi-rr-shopping-cart"></i>
            </button>
          </Tippy>
        </div>
      </div>
      <Link
        className="name"
        to={`/product/${product._id}`}
      >
        {product.title?.[currentLang] || product.title?.en || '❌'}
      </Link>
      <h3 className="price">{convertToCurrencySymbol(currency)}{product.price[currency]}</h3>
      <Rating rating={product.rating} />
    </div>
  );
}

export default Product;
