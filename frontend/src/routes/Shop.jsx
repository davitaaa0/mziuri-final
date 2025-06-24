import React, { useEffect, useState, useContext } from 'react';
import { useLoader } from '../context/LoaderContext';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import * as api from '../api/api.jsx';
import Slider from '@mui/material/Slider';
import RouteBanner from '../components/RouteBanner.jsx';
import ProductList from '../components/ProductList.jsx';
import ArrowDropdown from '../components/ArrowDropdown.jsx'

function Shop() {
  const [products, setProducts] = useState();
  const [activeIndex, setActiveIndex] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [value, setValue] = useState([16, 300]);
  const { setLoading } = useLoader();
  const { t } = useTranslation();

  const handleToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleActive = (index) => {
    setActiveIndex(index);
  };

  const sorting = [
    "Sort by Default",
    "Sort by Popularity",
    "Sort by Rated",
    "Sort by Latest",
    "Sort by High Price",
    "Sort by Low Price"
  ].map((label, index) => (
    <button
      key={index}
      onClick={() => handleActive(index)}
      className={activeIndex === index ? 'sortBtn active' : 'sortBtn'}
    >
      {label}
    </button>
  ));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchProductsData = async () => {
      const data = await api.getProducts();
      console.log(data);
      if (data?.data) {
        setProducts(data.data);
      } else if (data.err) {
        alert(data.err);
      }
      setLoading(false);
    };
    
    document.title = 'Pronia - Shop';
    fetchProductsData();
  }, []);

  return (
    <div>
      <RouteBanner />
      <div className="shop">
        <div className="shop-left">
          <div className="search">
            <input
              type="search"
              placeholder={t('Search')}
            />
            <button>
              <i className="fi fi-rr-search"></i>
            </button>
          </div>
          <div className="filter-section">
            <div className="categorie-filter">
              <div className="heading-wrapper">
                <h1>{t('Categories')}</h1>
              </div>
              <ul className="categories">
                <li><i className="fi fi-rr-angle-small-right"></i>{t('All')} (65)</li>
                <li><i className="fi fi-rr-angle-small-right"></i>{t('Bansai')} (12)</li>
                <li><i className="fi fi-rr-angle-small-right"></i>{t('HousePlants')} (22)</li>
                <li><i className="fi fi-rr-angle-small-right"></i>{t('IndoorLiving')} (19)</li>
                <li><i className="fi fi-rr-angle-small-right"></i>{t('Perennials')} (17)</li>
                <li><i className="fi fi-rr-angle-small-right"></i>{t('PlantForGift')} (01)</li>
                <li><i className="fi fi-rr-angle-small-right"></i>{t('GardenTools')} (12)</li>
              </ul>
            </div>
            <div className="color-filter">
              <div className="heading-wrapper">
                <h1>{t('Color')}</h1>
              </div>
              <ul className="colors">
                <li><i className="fi fi-rr-angle-small-right"></i>{t('All')} (65)</li>
                <li><i className="fi fi-rr-angle-small-right"></i>{t('Gold')} (12)</li>
                <li><i className="fi fi-rr-angle-small-right"></i>{t('Green')} (22)</li>
                <li><i className="fi fi-rr-angle-small-right"></i>{t('White')} (13)</li>
                <li><i className="fi fi-rr-angle-small-right"></i>{t('Black')} (17)</li>
              </ul>
            </div>
            <div className="price">
              <div className="heading-wrapper">
                <h1>{t('PriceFilter')}</h1>
              </div>
              <Box
                width={'80%'}
                sx={{ mx: 'auto', mt: 2 }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Typography sx={{ background: '#AEDC8F', px: 1, borderRadius: 1, color: 'white' }}>
                    ${value[0]}
                  </Typography>
                  <Typography sx={{ background: '#AEDC8F', px: 1, borderRadius: 1, color: 'white' }}>
                    ${value[1]}
                  </Typography>
                </Box>
                <Slider
                  value={value}
                  onChange={handleChange}
                  min={0}
                  max={350}
                  step={1}
                  sx={{
                    color: '#AEDC8F',
                    height: 6,
                    '& .MuiSlider-thumb': {
                      width: 20,
                      height: 20,
                      color: 'white',
                      border: '3px solid #AEDC8F',
                      '&:before': {
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                      },
                    },
                    '& .MuiSlider-track': {
                      border: 'none',
                    },
                    '& .MuiSlider-rail': {
                      opacity: 0.3,
                      backgroundColor: '#bfbfbf',
                    },
                  }}
                />
              </Box>
            </div>
            <div className="popular-tags">
              <div className="heading-wrapper">
                <h1>{t('PopularTags')}</h1>
              </div>
              <ul className="tags">
                <li className="tag">
                  <button>{t('Fashion')}</button>
                </li>
                <li className="tag">
                  <button>{t('Organic')}</button>
                </li>
                <li className="tag">
                  <button>{t('OldFashion')}</button>
                </li>
                <li className="tag">
                  <button>{t('Men')}</button>
                </li>
                <li className="tag">
                  <button>{t('Fashion')}</button>
                </li>
                <li className="tag">
                  <button>{t('Dress')}</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="advertisement">
            <h4>{t('NewCollection')}</h4>
            <h1>{t('PlantPort')}</h1>
            <button>{t('ShopNow')}</button>
          </div>
        </div>
        <div className="shop-right">
          <div className="header">
            <div className="product-count">
              <span>12</span> {t('ProductsFound')} <span>30</span>
            </div>
            <button className='placing'>
              <i className="fi fi-sr-grid"></i>
            </button>
            <button className='placing'>
              <i className="fi fi-sr-apps"></i>
            </button>
            <ArrowDropdown
              options={sorting}
              isOpen={openDropdown === 2}
              onToggle={() => handleToggle(2)}
            />
          </div>
          <div className="product-container">
            <ProductList
              products={products}
              setProducts={setProducts}
            />
          </div>
          <div className="pagination">
            <Link
              className="active"
              to={'#'}
            >
              1
            </Link>
            <Link to={'#'}>2</Link>
            <Link to={'#'}>3</Link>
            <Link
              className="arrow"
              to={'#'}
            >
              <i className="fi fi-rr-angle-double-small-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
