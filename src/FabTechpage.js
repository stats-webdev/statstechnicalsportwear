import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Banner from './Banner';
import Footer from './Footer';
import CartButtonPage from './CartButtonPage';

function FabTechPage({ products, cart, increaseQuantity, decreaseQuantity, removeAllFromCart }) {
  const { fabtechName } = useParams();
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        const response = await fetch('https://my-product-api.stats-webdev.workers.dev/bannerimages');
        const data = await response.json();
        setFetchedData(data);
      } catch (error) {
        console.error('Error fetching ads data:', error);
      }
    };

    fetchBannerImages();
  }, []);

const filteredProducts = products.filter((product) => {
  const fabtech = product.FabTech;

  if (Array.isArray(fabtech)) {
    return fabtech.some((ft) => ft.toLowerCase() === fabtechName?.toLowerCase());
  }

  if (typeof fabtech === 'string') {
    return fabtech.toLowerCase() === fabtechName?.toLowerCase();
  }

  return false;
});

  const [hoveredImage, setHoveredImage] = useState({});

  const handleMouseEnter = (productId, color) => {
    const product = products.find((p) => p.ID === productId);
    if (product && product.Thumbnail && product.Thumbnail[color]) {
      setHoveredImage((prev) => ({
        ...prev,
        [`${productId}-${color}`]: product.Thumbnail[color][0],
      }));
    }
  };

  const handleMouseLeave = (productId, color) => {
    setHoveredImage((prev) => {
      const newHovered = { ...prev };
      delete newHovered[`${productId}-${color}`];
      return newHovered;
    });
  };

  if (filteredProducts.length === 0) {
    return <div></div>;
  }

  const bannerObj = fetchedData?.find((item) => item[fabtechName?.toLowerCase()]);
  const bannerSrc = bannerObj ? bannerObj[fabtechName?.toLowerCase()] : '';

  return (
    <div className="fabtech-page">
      {/* Banner */}
      {bannerSrc ? (
        <img src={bannerSrc} alt={`${fabtechName} Banner`} className="series-banner" />
      ) : (
        <Banner />
      )}

      <h2 style={{ marginLeft: '5%', fontWeight: 'normal' }}>{fabtechName} FabTech</h2>
      <hr style={{ width: '90%' }} />

      <div className="product-list">
        {filteredProducts.map((product) =>
          Object.keys(product.Colors).map((color) => (
            <div
              key={`${product.ID}-${color}`}
              className="product-card"
              onMouseEnter={() => handleMouseEnter(product.ID, color)}
              onMouseLeave={() => handleMouseLeave(product.ID, color)}
            >
              <Link to={`/${product.ID}/${color}`} style={{ textDecoration: 'none' }}>
                {product.Colors[color].Label === 1 && <div className="bestseller-tag">BESTSELLER</div>}
                {product.Colors[color].Label === 2 && <div className="onsale-tag">ON SALE</div>}
                {product.Colors[color].Label === 3 && <div className="bestseller-tag">LIMITED STOCKS ONLY</div>}
                {product.Colors[color].Label === 4 && <div className="bestseller-tag">NEW STOCKS AVAILABLE</div>}
                {product.Colors[color].Label === 5 && <div className="bestseller-tag">FEW STOCKS LEFT</div>}
                {product.Colors[color].Label === 6 && <div className="bestseller-tag">PRE-ORDER</div>}

                <img
                  src={
                    hoveredImage[`${product.ID}-${color}`]
                      ? hoveredImage[`${product.ID}-${color}`]
                      : product.Images[color]
                  }
                  alt={`${product.Name} - ${color}`}
                  className="product-image"
                />
                <h3>{product.Name} - {color}</h3>
                {product.SalePrice > 0 ? (
                  <p>
                    <span className="original-price">₱{product.Price}</span>
                    <span className="sale-price"> ₱{product.SalePrice}</span>
                  </p>
                ) : (
                  <p>₱{product.Price}</p>
                )}
              </Link>
            </div>
          ))
        )}
      </div>

      <CartButtonPage
        cart={cart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeAllFromCart={removeAllFromCart}
        products={products}
      />
      <Footer />
    </div>
  );
}

export default FabTechPage;
