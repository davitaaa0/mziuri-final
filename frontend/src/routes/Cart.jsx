import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useLoader } from '../context/LoaderContext';
import { useCurrency } from '../context/CurrencyContext';
import { useTranslation } from 'react-i18next';
import { convertToCurrencySymbol } from '../utils/formatText';
import RouteBanner from '../components/RouteBanner';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const { setLoading } = useLoader();
  const { i18n } = useTranslation();
  const { currency } = useCurrency();
  const lang = i18n.language || 'en';

  useEffect(() => {
    document.title = 'Pronia - Cart';
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((res) => res.json())
      .then(() => setLoading(false));
  }, []);

  const total = cartItems.reduce((sum, item) => {
    const product = item.productId || item;
    const price = product.price?.[currency] || product.price?.usd || 0;
    return sum + price * item.quantity;
  }, 0);

  if (!cartItems.length) {
    return (
      <div className="cart-page">
        <RouteBanner />
        <p className="empty">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <RouteBanner />
      <table className="cart-table">
        <thead>
          <tr>
            <th className="product-remove">Remove</th>
            <th className="product-thumbnail">Image</th>
            <th className="cart-product-name">Product</th>
            <th className="product-price">Unit Price</th>
            <th className="product-quantity">Quantity</th>
            <th className="product-subtotal">Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => {
            const product = item.productId || item;
            const price = product.price?.[currency] || product.price?.usd || 0;
            const title = product.title?.[lang] || product.title?.en || 'Unnamed';

            return (
              <tr key={product._id || index}>
                <td className="product-remove">
                  <button onClick={() => removeFromCart(product._id)}>
                    <i className="fi fi-rr-cross-small"></i>
                  </button>
                </td>
                <td className="product-img">
                  <img src={product.image} alt={title} width="80" />
                </td>
                <td className="product-name">{title}</td>
                <td className="product-price">
                  <span className="amount">
                    {convertToCurrencySymbol(currency)}{price}
                  </span>
                </td>
                <td className="product-quantity">
                  <div className="cart-plus-minus">
                    <div className="dec" onClick={() =>
                      updateQuantity(product._id, Math.max(1, item.quantity - 1))
                    }>
                      -
                    </div>
                    <input
                      className="cart-plus-minus-box"
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        updateQuantity(product._id, parseInt(e.target.value) || 1)
                      }
                    />
                    <div className="inc" onClick={() =>
                      updateQuantity(product._id, item.quantity + 1)
                    }>
                      +
                    </div>
                  </div>
                </td>
                <td className="product-subtotal">
                  <span className="amount">
                    {convertToCurrencySymbol(currency)}
                    {(price * item.quantity).toFixed(2)}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="cart-end">
        <div className="cart-total">
          <h3>Cart Totals:</h3>
          <div className="totals">
            <div className="subtotal">
              <span>Subtotal </span>
              {convertToCurrencySymbol(currency)}{total.toFixed(2)}
            </div>
            <div className="total">
              <span>Total </span>
              {convertToCurrencySymbol(currency)}{total.toFixed(2)}
            </div>
          </div>
          <Link to="/checkout">Proceed to Checkout</Link>
        </div>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
}

export default Cart;
