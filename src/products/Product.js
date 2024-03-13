import Image from "../nillkin-case-1.jpg";
import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Product(props) {
  const [formData, setFormData] = useState({
    product: "", // Initialize with an empty string
    id: "", // Assuming product object has an 'id' property
    quantity: 0,
   
  });
  const history = useHistory();

  const price = 10000;
  let percentOff;
  let offPrice = `${price}Ks`;
  const { id } = useParams();
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
  const [product, setProduct] = useState({});

  useEffect(() => {
    // Fetch data from Django API endpoint
    fetch('http://walaaecommercedr.pythonanywhere.com/products/')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

 
const updateQuantity = async (productId) => {
  
  try {
    // Check if Quantity is provided before making the request
    if (formData.quantity !== 0) {
      const dataToSend = {
        quantity: formData.quantity
      };

      const url =`https://walaaecommercedr.pythonanywhere.com/cartItems/${productId}/add_to_cart/`;
      console.log('URL:', url); // Log the URL being used
      console.log('Data to send:', dataToSend);
      history.push('/cart')

      const response = await axios.post(url, dataToSend);

      // Handle the response as needed
      console.log('Response:', response.data);
    } 
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
  }
};
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};

  return (
    <div className="row mt-3">
      {products.map((product, index) => (
        <div className="col-md-4 mt-5" key={product.id}>
          <div className="card shadow-sm mt-3">
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
              <div className="mt-5 d-flex d-sm-block">
    <button onClick={() => updateQuantity(product.id)} className="btn btn-outline-dark btn-sm mb-2 mb-sm-0 w-100">
        <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
    </button>
    <input className="form-control mt-4" required placeholder="quantity" type="number"  name="quantity" onChange={handleInputChange} />
</div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
}

export default Product;
