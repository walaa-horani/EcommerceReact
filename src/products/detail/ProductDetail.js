import Image from "../../nillkin-case-1.jpg";
import RelatedProduct from "./RelatedProduct";
import Ratings from "react-ratings-declarative";
import { Link, useParams } from "react-router-dom";
import ScrollToTopOnMount from "../../template/ScrollToTopOnMount";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const iconPath =
  "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";

function ProductDetail( ) {
  const [productS, setProduct] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    product: "", // Initialize with an empty string
    id: "", // Assuming product object has an 'id' property
    quantity: 0,
   
  });
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (productS.images && productS.images.length > 0) {
      setSelectedImage(productS.images[0].image);
    }
  }, [productS]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };
  function changeRating(newRating) {}
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    

      axios.get(`http://walaaecommercedr.pythonanywhere.com/products/${id}`)
      .then(res => {
        console.log(res.data); // Log the response to the console
        setProduct(res.data);
        
       
      })
        .catch(err => console.log(err));
   
  }, [id]);

  const updateQuantity = async () => {
    try {
      // Check if Quantity is provided before making the request
      if (formData.quantity !== 0) {
        const dataToSend = {
          quantity: formData.quantity
        };
  
        const url = `https://walaaecommercedr.pythonanywhere.com/cartItems/${id}/add_to_cart/`;
        console.log('URL:', url); // Log the URL being used
        console.log('Data to send:', dataToSend);
        history.push('/cart')
  
        const response = await axios.post(url, dataToSend);
  
        // Handle the response as needed
        console.log('Response:', response.data);
      } else {
        setErrorMessage('Quantity must be greater than zero.');
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
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount/>
      <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
        <ol className="breadcrumb p-3">
          <li className="breadcrumb-item">
            <Link className="text-decoration-none link-secondary" to="/products">
              All Prodcuts
            </Link>
          </li>

          <li className="breadcrumb-item">
            <Link className="text-decoration-none link-secondary" to="/products">
            {productS?.category?.name}
            </Link>
          </li>
          
          <li className="breadcrumb-item active text-truncate"  >
  {productS.name}
</li>
        </ol>
      </nav>
      <div className="row mb-4">
        
        <div className="col-lg-6">
          <div className="row">
            <div className="col-12 mb-4">
              <img
                className="border rounded ratio ratio-1x1"
                alt=""
                src={`http://walaaecommercedr.pythonanywhere.com${selectedImage}`}
                />
            </div>
          </div>
          <div className="d-flex flex-wrap">
          <div className="">
            <div className="d-flex flex-wrap">
            {productS?.images?.map((image, index) => (
          <a style={{'cursor':'pointer'}} key={index}  onClick={() => handleImageClick(image?.image)}>
          <img style={{'width':'100px', 'height':'50px', 'objectFit':'cover', 'marginRight':'15px'}}
      className={`rounded mb-2 ratio ${index !== 1 ? "opacity-6" : ""}`}
      alt=""
      src={`http://walaaecommercedr.pythonanywhere.com${image.image}`}
    />
  </a>
))}

            </div>
          </div>
        </div>
          
        </div>

        <div className="col-lg-5">
          <div className="d-flex flex-column h-100">
            <h4 className="mb-1">{productS.name}</h4>
            <h4 className="text-muted mb-4 mt-3">{productS.price} $</h4>
            <input className="form-control" required style={{'width':'100px', 'margin':'10px 0 20px 0'}} placeholder="quantity" type="number" name="quantity"  onChange={handleInputChange} />
              <p className="text-danger"> quantity is required</p>
            <div className="row g-3 mb-4">
              <div className="col">
                <button onClick={updateQuantity} className="btn btn-outline-dark py-2 w-100">
                  Add to cart
                </button>
              </div>
              <div className="col">
                <button  className="btn btn-dark py-2 w-100">Buy now</button>
              </div>
            </div>

            <h4 className="mb-0">Details</h4>
            <hr />
            <dl className="row">
              <dt className="col-sm-4">Code</dt>
              <dd className="col-sm-8 mb-3">C0001</dd>

              <dt className="col-sm-4">Category</dt>
              <dd className="col-sm-8 mb-3">{productS.category}</dd>

              <dt className="col-sm-4">Brand</dt>
              <dd className="col-sm-8 mb-3">{productS.brand}</dd>

              <dt className="col-sm-4">Manufacturer</dt>
              <dd className="col-sm-8 mb-3">Nillkin</dd>

              <dt className="col-sm-4">Color</dt>
              <dd className="col-sm-8 mb-3">Red, Green, Blue, Pink</dd>

              <dt className="col-sm-4">Status</dt>
              <dd className="col-sm-8 mb-3">Instock</dd>

              <dt className="col-sm-4">Rating</dt>
              <dd className="col-sm-8 mb-3">
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
              </dd>
            </dl>

           
          </div>
        
        
        </div>
        <div>
          <h4 className="mb-0">About this item</h4>
            <hr />
            <p style={{'fontSize':'16px', textAlign: 'justify'}} className="lead flex-shrink-0 ">
              
                {productS.description}
             
            </p>
          </div>
      </div>

      <div className="row">
        <div className="col-md-12 mb-4">
          <hr />
          <h4 className="text-muted my-4">Related products</h4>
          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3">
            {Array.from({ length: 1 }, (_, i) => {
              return (
                <RelatedProduct key={i}  />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
