import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

function Landing() {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch data from Django API endpoint
    fetch('http://walaaecommercedr.pythonanywhere.com/products/')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  return (
    <>
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        <p className="text-center px-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary" replace>
            Browse products
          </Link>
        </div>
      </div>
      <h2 className="text-muted text-center mt-4 mb-3">New Arrival</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
          
        {products.map((pro) => (
          
          <div style={{'overflow':'hidden',  position: 'relative',}}>
      <Link style={{'textDecoration':'none'}}  to={`/productDetails/${pro.id}`}>
            <img
        style={{
          height: '250px',
          width: '100%',
          objectFit: 'cover',
          overflow:'hidden',
          transition: 'transform 0.3s ease-in-out',
        }}
        src={pro.image}
        alt={pro.name}
        className="product-image"
        onMouseOver={(event) => {
          event.target.style.transform = 'scale(1.1)';
        }}
        onMouseOut={(event) => {
          event.target.style.transform = 'scale(1)';
        }}
      />
            <div className="d-flex justify-content-between mt-3  ">
            <strong>{pro.name}</strong>
            <strong  className="text-danger">{pro.price}$</strong>
            </div>
            </Link>
        </div>

          ))}
        </div>
      </div>
      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Follow us on</h5>
        <div className="d-flex justify-content-center">
          <a href="!#" className="me-3">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
          </a>
          <a href="!#">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
          </a>
          <a href="!#" className="ms-3">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Landing;
