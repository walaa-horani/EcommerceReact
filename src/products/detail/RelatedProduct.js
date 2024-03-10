import Image from "../../nillkin-case-1.jpg";
import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel2';
import $ from 'jquery';

import './owl.carousel.css';
import './owl.theme.default.css';


function RelatedProduct(props) {
  const price = 10000;
  let percentOff;
  let offPrice = `${price}Ks`;
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    

    axios.get(`http://walaaecommercedr.pythonanywhere.com/products/${id}`)
    .then(res => {
      console.log(res.data); // Log the response to the console

      setProduct(res.data);
      
     
    })
      .catch(err => console.log(err));
 
}, [id]);


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
  const options = {
    items: 3,
    margin: 10,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  };
  return (
    <div style={{'width':'100%'}}>
       
        
       {product?.related_products && (
        <OwlCarousel {...options}>
          {product.related_products.map(relatedProduct => (
            <div key={relatedProduct?.id}>
             <Link style={{'textDecoration':'none',}} to={`/productDetails/${relatedProduct.id}`} >
              <img className="carousel-image"  style={{'height':'250px','objectFit':'cover' }} src={relatedProduct.image} alt={relatedProduct.name} />
             <div className="d-flex align-items-center justify-content-between mt-3">
              <h6 className="card-title  text-dark text-truncate">
                {product.name}
              </h6>
              <strong className="card-text text-center   mb-0 text-danger">
                {product.price} TL

              </strong>
              </div>
              </Link>
            </div>
          ))}
        </OwlCarousel>
      )}
       
      </div>
  );
}

export default RelatedProduct;
