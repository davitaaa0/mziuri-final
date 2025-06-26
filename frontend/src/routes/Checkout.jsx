import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useLoader } from '../context/LoaderContext';
import { useCurrency } from '../context/CurrencyContext';
import { useTranslation } from 'react-i18next';
import { convertToCurrencySymbol } from '../utils/formatText';
import RouteBanner from '../components/RouteBanner';

function Checkout() {
  const { cartItems } = useContext(CartContext);
  const { setLoading } = useLoader();
  const { currency } = useCurrency();
  const { t, i18n } = useTranslation();
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
        <p className="empty">Your cart is empty.</p>
      ) : (
        <div className="checkout">
          <div className="checkout-details">
            <h2>Billing Details</h2>
            <form className="checkout-form">
              <label htmlFor="country">Country *</label>
              <select id="country" name="country" required>
                <option value="Bangladesh">Bangladesh</option>
                <option value="london">London</option>
                <option value="romania">Romania</option>
                <option value="french">French</option>
                <option value="germany">Germany</option>
                <option value="australia">Australia</option>
              </select>

              <div className="names">
                <div>
                  <label htmlFor="firstname">First Name</label>
                  <input type="text" id="firstname" name="firstname" required />
                </div>
                <div>
                  <label htmlFor="lastname">Last Name</label>
                  <input type="text" id="lastname" name="lastname" required />
                </div>
              </div>

              <label htmlFor="companyname">Company Name</label>
              <input type="text" id="companyname" name="companyname" required />

              <label htmlFor="street">Street Address *</label>
              <input
                type="text"
                placeholder="Street Address"
                id="street"
                name="street"
                required
              />
              <input
                type="text"
                placeholder="Apartment, suite, unit etc. (optional)"
                name="apartment"
              />

              <label htmlFor="city">Town / City *</label>
              <input type="text" name="city" id="city" required />

              <div className="zip">
                <div>
                  <label htmlFor="state">State / County *</label>
                  <input type="text" id="state" name="state" required />
                </div>
                <div>
                  <label htmlFor="zip">Postcode / Zip *</label>
                  <input type="text" id="zip" name="zip" required />
                </div>
              </div>

              <div className="contact-inputs">
                <div>
                  <label htmlFor="email">Email Address *</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div>
                  <label htmlFor="phone">Phone *</label>
                  <input type="tel" id="phone" name="phone" required />
                </div>
              </div>

              <label htmlFor="notes">Order Notes</label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Notes about your order, e.g. special notes for delivery."
              ></textarea>
            </form>
          </div>

          <div className="checkout-summary">
            <h2>Your Order</h2>
            <div className="checkout-items">
              {cartItems.map((item, index) => {
                const product = item.productId || item;
                const title = product.title?.[lang] || product.title?.en || 'Unnamed';
                const price = product.price?.[currency] || product.price?.usd || 0;
                return (
                  <div key={index} className="checkout-item">
                    <span>
                      {title} × {item.quantity}
                    </span>
                    <span>
                      {convertToCurrencySymbol(currency)}
                      {(price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                );
              })}

              <div className="checkout-total">
                <span>Total</span>
                <span>
                  {convertToCurrencySymbol(currency)}
                  {total.toFixed(2)}
                </span>
              </div>

              <button className="checkout-button">Place Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;

