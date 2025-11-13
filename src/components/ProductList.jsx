import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const limit = 5;
  const restored = useRef(false);

  const fetchProducts = async (skipValue = 0, searchTerm = "") => {
    setLoading(true);
    try {
      let url = `https://dummyjson.com/products?limit=${limit}&skip=${skipValue}`;
      if (searchTerm) {
        url = `https://dummyjson.com/products/search?q=${searchTerm}&limit=${limit}&skip=${skipValue}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 30);
    } catch (error) {
      console.error("Failed to load Products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!restored.current && location.state?.products) {
      const { products, skip, search, total } = location.state;
      setProducts(products);
      setSkip(skip);
      setSearch(search);
      setTotal(total);
      setLoading(false);
      restored.current = true;

      window.history.replaceState({}, document.title);
    } else {
      fetchProducts(skip, search);
    }
  }, [skip]);

  const handleSearch = () => {
    setSkip(0);
    fetchProducts(0, search);
  };

  const handleClear = () => {
    setSearch("");
    fetchProducts(skip, "");
  };

  const nextPage = () => {
    if (skip + limit < total) {
      setSkip(skip + limit);
    }
  };

  const prevPage = () => {
    if (skip > 0) {
      setSkip(skip - limit);
    }
  };

  return (
    <div>
      <div className="container">
        <input
          id="searchInput"
          type="search"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button id="sbtn" onClick={handleSearch}>
          Search
        </button>
        <button id="cbtn" className="clbtn" onClick={handleClear}>
          Clear
        </button>
      </div>

      {loading ? (
        <p id="status">Loading products...</p>
      ) : products.length === 0 ? (
        <p id="status">No products found</p>
      ) : (
        <>
          <div id="Cards" className="cards">
            {products.map((product, idx) => (
              <div key={product.id} className="card" data-index={idx + 1}>
                <div className="card-bg" />
                <div className="card-front">
                  <img src={product.thumbnail} alt={product.title} />
                  <div className="card-content">
                    <h2>{product.title}</h2>
                    <div className="brand">{product.brand || "No Brand"}</div>
                    <p className="description">{product.description}</p>
                    <div className="rate">
                      <div className="price">${product.price}</div>
                      <div className="per">
                        ({product.discountPercentage}% off)
                      </div>
                    </div>
                    <div className="rating">⭐ {product.rating}</div>
                    <button
                      className="viewbtn"
                      onClick={() =>
                        navigate(`/product/${product.id}`, {
                          state: { products, skip, search, total },
                        })
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pagebtn">
            <button onClick={prevPage} disabled={skip === 0}>
              Prev
            </button>
            <button onClick={nextPage} disabled={skip + limit >= total}>
              Next
            </button>
          </div>
          <p id="status">
            Showing {skip + 1}-{Math.min(skip + limit, total)} of {total} products
          </p>
        </>
      )}
    </div>
  );
};

export default ProductList;
