import Image from "../nillkin-case-1.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from 'react';

function Cart(props) {
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


  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch data from Django API endpoint
    fetch('https://walaaecommercedr.pythonanywhere.com/cartItems/')
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  const removeFromCart = (itemId) => {
    // Send a request to remove the item from the cart
    fetch(`https://walaaecommercedr.pythonanywhere.com/cartItems/${itemId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed, such as authentication headers
      },
    })
      .then((response) => {
        if (response.ok) {
          // If the item is successfully removed, update the local state
          setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
        } else {
          console.error('Error removing item from cart');
        }
      })
      .catch((error) => console.error('Error removing item from cart:', error));
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div style={{ 'marginTop': '100px' }} className="container ">
      {cart.length === 0 ? (
        <div className="alert alert-info mt-3" role="alert">
          Your cart is empty. Add some products!
        </div>
      ) : (
        <div className="row">
          {cart.map((cartItem) => (
            <div className="col-md-4" key={cartItem.id}>
              <div className="card shadow-sm">
                <Link to={`/productDetails/${cartItem.id}`}>
                  {cartItem.percentOff}
                  <img
                    className="card-img-top bg-dark cover"
                    height="200"
                    alt=""
                    src={cartItem.product.image}
                  />
                </Link>
                <div className="card-body">
                  <h6 className="card-title text-center text-dark text-truncate">
                    {cartItem.product.name}
                  </h6>
                  <p className="card-text text-center  mb-0 text-danger">
                    {cartItem.product.price} TL
                  </p>
                  <div className="d-grid d-block">
                    <button onClick={() => removeFromCart(cartItem.id)} className="btn btn-outline-dark mt-3">
                      <FontAwesomeIcon icon={["fas", "cart-plus"]} /> remove from cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  
}

export default Cart;
