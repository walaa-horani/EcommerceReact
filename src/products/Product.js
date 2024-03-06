import Image from "../nillkin-case-1.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from 'react';

function Product(props) {
  const price = 10000;
  let percentOff;
  let offPrice = `${price}Ks`;

  if (props.percentOff && props.percentOff > 0) {
    percentOff = (
      <div
        className="badge bg-dim py-2 text-white position-absolute"
        style={{ top: "0.5rem", right: "0.5rem" }}
      >
        {props.percentOff}% OFF
      </div>
    );

    offPrice = (
      <>
        <del>{price}Ks</del> {price - (props.percentOff * price) / 100}Ks
      </>
    );
  }
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch data from Django API endpoint
    fetch('http://walaaecommercedr.pythonanywhere.com/products/')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  return (
    <div className="row">
      {products.map((product, index) => (
        <div className="col-md-4" key={product.id}>
          <div className="card shadow-sm">
            <Link to={`/productDetails/${product.id}`} replace>
              {product.percentOff}
              <img
                className="card-img-top bg-dark cover"
                height="200"
                alt=""
                src={product.image}
              />
            </Link>
            <div className="card-body">
              <h6 className="card-title text-center text-dark text-truncate">
                {product.name}
              </h6>
              <p className="card-text text-center  mb-0 text-danger">
                {product.price} TL
              </p>
              <div className="d-grid d-block">
                <button className="btn btn-outline-dark mt-3">
                  <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
}

export default Product;
