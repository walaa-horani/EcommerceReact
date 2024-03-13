import Image from "../../nillkin-case-1.jpg";
import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel2';
import $ from 'jquery';
import Ratings from "react-ratings-declarative";

import './owl.carousel.css';
import './owl.theme.default.css';
import './owl.theme.default.min.css';


function RelatedProduct(props) {
  const price = 10000;
  let percentOff;
  let offPrice = `${price}Ks`;
  const location = useLocation();
  const iconPath =
  "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  function changeRating(newRating) {}

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
        <OwlCarousel options={options}>
          {product.related_products.map(relatedProduct => (
            <div key={relatedProduct?.id}>
            <div style={{ "border":"1px solid #dbdbdb", 'padding':'10px','borderRadius':'10px','overflow':'hidden', 'marginRight':'15px'}}>

             <Link style={{'textDecoration':'none',}} to={`/productDetails/${relatedProduct.id}`} >
              <img className="carousel-image"  style={{'height':'250px','objectFit':'cover', 'width':'100%' }} src={relatedProduct.image} alt={relatedProduct.name} />
             <div className="d-flex align-items-center justify-content-between mt-3">
              <h6 className="card-title  text-dark text-truncate">
                {product.name}
              </h6>
             
              </div>
              <Ratings
                  rating={4.5}
                  widgetRatedColors="rgb(253, 204, 13)"
                  changeRating={changeRating}
                  widgetSpacings="2px"
                >
                  {Array.from({ length: 5 }, (_, i) => {
                    return (
                      <Ratings.Widget
                        key={i}
                        widgetDimension="20px"
                        svgIconViewBox="0 0 19 20"
                        svgIconPath={iconPath}
                        widgetHoverColor="rgb(253, 204, 13)"
                      />
                    );
                  })}
                </Ratings>
              </Link>
              </div>
            </div>
          ))}
        </OwlCarousel>
      )}
       
      </div>
  );
}

export default RelatedProduct;
