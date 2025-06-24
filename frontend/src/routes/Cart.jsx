import React, { useContext, useEffect } from 'react';
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

    const total = cartItems.reduce((sum, item) => {
        const product = item.productId || item;
        const price = product.price?.[currency] || product.price?.usd || 0;
        return sum + price * item.quantity;
    }, 0);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then((response) => response.json())
        .then(() => {
            setLoading(false);
        });
        document.title = 'Pronia - Cart';
    }, []);

    return (
        <div>
      <RouteBanner />
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item, index) => {
          const product = item.productId || item;
          const price = product.price?.[currency] || product.price?.usd || 0;
          return (
            <div key={product._id || index} className="cart-item">
              <img
                src={product.image}
                alt={product.title?.[currency] || product.title?.en}
                width="80"
              />
              <div>
                <p>{product.title?.[currency] || product.title?.en}</p>
                <p>
                  {convertToCurrencySymbol(currency)}
                  {price} × {item.quantity}
                </p>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(product._id, parseInt(e.target.value))
                  }
                  min="1"
                />
                <button onClick={() => removeFromCart(product._id)}>Remove</button>
              </div>
            </div>
          );
        })
      )}
      <h3>
        Total: {convertToCurrencySymbol(currency)}
        {total.toFixed(2)}
      </h3>
      {cartItems.length > 0 && (
        <button onClick={clearCart}>Clear Cart</button>
      )}
    </div>
    );
}

export default Cart;
