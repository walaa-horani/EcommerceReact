import Image from "../../nillkin-case-1.jpg";
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

function RelatedProduct(props) {
  const price = 10000;
  let percentOff;
  let offPrice = `${price}Ks`;

  const [products, setProduct] = useState({});
  const [categories, setCategories] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    

    axios.get(`http://walaaecommercedr.pythonanywhere.com/products/${id}`)
    .then(res => {
      console.log(res.data); // Log the response to the console
      setCategories(categories.category.products); // Assuming 'category' has a 'products' attribute

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

  return (
    <div className="row">
      {categories.map((product, index) => (
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
             
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RelatedProduct;
