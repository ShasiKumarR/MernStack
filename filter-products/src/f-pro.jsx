import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import "./Filter.css";

const FilterableProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterOption, setFilterOption] = useState("default");
  const [cart, setCart] = useState([]); // Cart state

  const videoRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    };

    fetchProducts();
  }, []);

  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      setFilteredProducts(
        products.filter((product) =>
          product.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    },
    [products]
  );

  const filteredCount = useMemo(() => filteredProducts.length, [filteredProducts]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setFilteredProducts(products);
  }, [products]);

  const handleFilterChange = useCallback(
    (e) => {
      const value = e.target.value;
      setFilterOption(value);

      let sortedProducts = [...products];
      if (value === "alphabetical") {
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      } else if (value === "price-low-to-high") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (value === "price-high-to-low") {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else {
        sortedProducts = products;
      }

      setFilteredProducts(sortedProducts);
    },
    [products]
  );

  // Add to Cart functionality
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Video controls
  const playVideo = () => {
    videoRef.current.play();
  };

  const pauseVideo = () => {
    videoRef.current.pause();
  };

  return (
    <div className="container">
      <h1>Filter Product Task</h1>

      <div className="SearchBox">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search products..."
        />
        <button onClick={clearSearch}>Clear Search</button>
      </div>

      <div className="One">
        <p>
          <strong>Filtered Count:</strong> {filteredCount}
        </p>
        <div className="filter-dropdown">
          <label htmlFor="filter">Filter by:</label>
          <select id="filter" value={filterOption} onChange={handleFilterChange}>
            <option value="default">Default</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={() => setFilteredProducts(products)} className="full-width">
          Reset Products
        </button>
      </div>

      {/* Cart Section */}
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <span>{item.title}</span>
                <span>${item.price.toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Video Section */}
      <div className="video-container">
        <h2>Product Showcase</h2>
        <video ref={videoRef} width="100%" height="auto" controls>
          <source
            src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="video-controls">
          <button onClick={playVideo}>Play</button>
          <button onClick={pauseVideo}>Pause</button>
        </div>
      </div>
    </div>
  );
};

export default FilterableProductList;
