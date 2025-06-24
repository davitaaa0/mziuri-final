import React from 'react';
import Product from './Product.jsx';
import { useTranslation } from 'react-i18next';

function ProductList({ products }) {
  const {t} = useTranslation()

  return (
    <div className="products">
      {products ? (
        products?.map((item, index) => {
          return (
            <Product
              key={index}
              product={item}
            />
          );
        })
      ) : (
        <p>{t('Loading')}</p>
      )}
    </div>
  );
}

export default ProductList;
