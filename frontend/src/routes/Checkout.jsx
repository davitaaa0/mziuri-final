import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useLoader } from '../context/LoaderContext';
import { useCurrency } from '../context/CurrencyContext';
import { useTranslation } from 'react-i18next';
import { convertToCurrencySymbol } from '../utils/formatText';
import RouteBanner from '../components/RouteBanner';

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const { setLoading } = useLoader();
  const { currency } = useCurrency();
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';

  const total = cartItems.reduce((sum, item) => {
    const product = item.productId || item;
    const price = product.price?.[currency] || product.price?.usd || 0;
    return sum + price * item.quantity;
  }, 0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => res.json())
      .then(() => setLoading(false));
    document.title = 'Pronia - Checkout';
  }, []);

  return (
    <div className="checkout-page">
      <RouteBanner />
      {cartItems.length === 0 ? (
        <p className="t">Your cart is empty.</p>
      ) : (
        <div className="">
          <div className="">
            <h2 className="">Billing Details</h2>
            <input type="text" placeholder="Full Name" className="" />
            <input type="email" placeholder="Email" className="" />
            <input type="text" placeholder="Phone" className="" />
            <input type="text" placeholder="Address" className="" />
            <textarea placeholder="Order Notes" className=""></textarea>
          </div>

          <div className="order-summary">
            <h2 className="">Your Order</h2>
            <div className="">
              {cartItems.map((item, index) => {
                const product = item.productId || item;
                const title = product.title?.[lang] || product.title?.en || 'Unnamed';
                const price = product.price?.[currency] || product.price?.usd || 0;
                return (
                  <div key={index} className="">
                    <span>{title} × {item.quantity}</span>
                    <span>
                      {convertToCurrencySymbol(currency)}{(price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}
              <div className="">
                <span>Total</span>
                <span>{convertToCurrencySymbol(currency)}{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6">
              <button className="">Place Order</button>
              <button
                onClick={clearCart}
                className=""
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
