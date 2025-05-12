import React, { useEffect, useState, useContext } from 'react';
import { useLoader } from '../context/LoaderContext';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import * as api from '../api/api.jsx';
import Slider from '@mui/material/Slider';
import RouteBanner from '../components/RouteBanner.jsx';
import ProductList from '../components/ProductList.jsx';

function Shop() {
  const [products, setProducts] = useState();
  const { setLoading } = useLoader();
  const [value, setValue] = useState([16, 350]);

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
              placeholder="Search"
            />
            <button>
              <i className="fi fi-rr-search"></i>
            </button>
          </div>
          <div className="filter-section">
            <div className="categorie-filter">
              <div className="heading-wrapper">
                <h1>Categories</h1>
              </div>
              <ul className="categories">
                <li>All (65)</li>
                <li>Bansai (12)</li>
                <li>House Plants (22)</li>
                <li>Indoor Living (19)</li>
                <li>Perennnials (17)</li>
                <li>Plant For Gift (01)</li>
                <li>Garden Tools (12)</li>
              </ul>
            </div>
            <div className="color-filter">
              <div className="heading-wrapper">
                <h1>Color</h1>
              </div>
              <ul className="colors">
                <li>All (65)</li>
                <li>Gold (12)</li>
                <li>Green (22)</li>
                <li>White (13)</li>
                <li>Black (17)</li>
              </ul>
            </div>
            <div className="price">
              <div className="heading-wrapper">
                <h1>Price Filter</h1>
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
                  <Typography sx={{ background: '#AEDC8F', px: 1, borderRadius: 1 }}>
                    ${value[0]}
                  </Typography>
                  <Typography sx={{ background: '#AEDC8F', px: 1, borderRadius: 1 }}>
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
                <h1>Popular Tags</h1>
              </div>
              <ul className="tags">
                <li className="tag">
                  <button>Fashion</button>
                </li>
                <li className="tag">
                  <button>Organic</button>
                </li>
                <li className="tag">
                  <button>Old Fashion</button>
                </li>
                <li className="tag">
                  <button>Men</button>
                </li>
                <li className="tag">
                  <button>Fashion</button>
                </li>
                <li className="tag">
                  <button>Dress</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="advertisement">
            <h4>New Collection</h4>
            <h1>Plant Port</h1>
            <button>Shop Now</button>
          </div>
        </div>
        <div className="shop-right">
          <div className="header">
            <div className="product-count">
              <span>12</span> Product Found of <span>30</span>
            </div>
            <button>
              <i className="fi fi-sr-grid"></i>
            </button>
            <button>
              <i className="fi fi-sr-apps"></i>
            </button>
            <div className="sort">Sort by Default</div>
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
              classname="arrow"
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
