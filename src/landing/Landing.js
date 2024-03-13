import Banner from "./Banner";
import FeatureProduct from "./FeatureProduct";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Ratings from "react-ratings-declarative";
import OwlCarousel from 'react-owl-carousel2';
import image_1 from './image_1.jpg'
import image_2 from './image_2.jpg'
import image_3 from './image_3.jpg'
import image_4 from './image_4.jpg'
import image_5 from './image_5.jpg'
import image_6 from './image_6.jpg'
import image_7 from './image_7.jpg'
import image_8 from './image_8.jpg'
function Landing() {

  const [products, setProducts] = useState([]);
  const [newArrival, setNewArrival] = useState([]);
  useEffect(() => {
    // Fetch data from Django API endpoint
    fetch('http://walaaecommercedr.pythonanywhere.com/products/')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.slice(0, maxLength) + '...';
    }
    return str;
  }
  const iconPath =
  "M18.571 7.221c0 0.201-0.145 0.391-0.29 0.536l-4.051 3.951 0.96 5.58c0.011 0.078 0.011 0.145 0.011 0.223 0 0.29-0.134 0.558-0.458 0.558-0.156 0-0.313-0.056-0.446-0.134l-5.011-2.634-5.011 2.634c-0.145 0.078-0.29 0.134-0.446 0.134-0.324 0-0.469-0.268-0.469-0.558 0-0.078 0.011-0.145 0.022-0.223l0.96-5.58-4.063-3.951c-0.134-0.145-0.279-0.335-0.279-0.536 0-0.335 0.346-0.469 0.625-0.513l5.603-0.815 2.511-5.078c0.1-0.212 0.29-0.458 0.547-0.458s0.446 0.246 0.547 0.458l2.511 5.078 5.603 0.815c0.268 0.045 0.625 0.179 0.625 0.513z";
  

  function changeRating(newRating) {}
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

  useEffect(() => {
    const handleResize = () => {
      window.dispatchEvent(new Event('resize'));
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
     

        
      </div>
    <div className="container pb-5 ">
      <h2 style={{ position: 'relative', borderBottom: '1px solid #dc3545', display: 'inline-block', paddingBottom: '5px', marginBottom: '5px' }} className="text-muted mt-4 mb-4">
    New Arrivals
  </h2>  
        <div className="row   row-cols-md-2 row-cols-lg-3 g-4 ">
          


        {products.map((pro) => (
  pro.new_arrival ? (
    <div style={{ overflow: 'hidden' }}>
       <div style={{ "border":"1px solid #dbdbdb", 'padding':'10px','borderRadius':'10px','overflow':'hidden'}}>
      <Link style={{ textDecoration: 'none' }} to={`/productDetails/${pro.id}`}>
        <img
          style={{
            height: '250px',
            width: '100%',
            objectFit: 'cover',
            padding: '5px',
            overflow: 'hidden',
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
     <div className="card mt-3">
  <div style={{'overflow':'hidden'}} className="card-body">
  <strong style={{
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '150px' // Adjust the maximum width as needed
    }}>
       
      {truncateString(pro.name, 40)} {/* Change 20 to the desired character limit */}
    </strong>
    <div>
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
    </div>
    <strong className="text-danger d-block mt-3">{pro.price}$</strong>
  </div>
</div>




      </Link>
      </div>
    </div>
  ) : null
))}
        </div>



       

          
      </div>


      <div style={{'paddingBottom':'80px'}} className="container mt-5">
          <div style={{'position':'relative'}}>
          <h2 style={{ position: 'relative', borderBottom: '1px solid #dc3545', display: 'inline-block', paddingBottom: '5px', marginBottom: '5px' }} className="text-muted mt-4 mb-4">
    Our Products
  </h2>      </div>
        <div className="row row-cols-1  row-cols-md-2 row-cols-lg-3 g-4 ">
          


        {products.slice(0, 8).map((pro) => (
  !pro.new_arrival ? (
    <div style={{ overflow: 'hidden' }}>
       <div style={{ "border":"1px solid #dbdbdb", 'padding':'10px','borderRadius':'10px', 'overflow':'hidden'}}>
      <Link style={{ textDecoration: 'none' }} to={`/productDetails/${pro.id}`}>
        <img
          style={{
            height: '250px',
            width: '100%',
            objectFit: 'cover',
            padding: '5px',
            overflow: 'hidden',
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
     <div className="card mt-3">
  <div style={{'overflow':'hidden'}} className="card-body">
  <strong style={{
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '150px' // Adjust the maximum width as needed
    }}>
       
      {truncateString(pro.name, 40)} {/* Change 20 to the desired character limit */}
    </strong>
    <div>
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
    </div>
    <strong className="text-danger d-block mt-3">{pro.price}$</strong>
  </div>
</div>




      </Link>
      </div>
    </div>
  ) : null
))}

        </div>

        <div style={{'float':'right','textAlign':'right'}} >
<Link to='/products'  className="btn btn-dark mt-4">Show All</Link>
</div>

       

          
      </div>
      <div className="container">
      <div style={{'position':'relative'}}>
          <h2 style={{ position: 'relative', borderBottom: '1px solid #dc3545', display: 'inline-block', paddingBottom: '5px', marginBottom: '5px' }} className="text-muted mt-4 mb-4">
    Our Brands
  </h2>      </div>
  <OwlCarousel className="slider-items owl-carousel" options={options}>
    <div>
        <div style={{ "border":"1px solid #dbdbdb", 'padding':'10px','borderRadius':'10px','overflow':'hidden', 'marginRight':'15px'}}>
            <img className="carousel-image" style={{'height':'150px', 'objectFit':'cover'}} src={image_1}/>
            <div className="d-flex align-items-center justify-content-between mt-3">
                <h6 className="card-title  text-dark text-truncate">English Home</h6>
            </div>
        </div>
    </div>

    <div>
        <div style={{ "border":"1px solid #dbdbdb", 'padding':'10px','borderRadius':'10px','overflow':'hidden', 'marginRight':'15px'}}>
            <img className="carousel-image" style={{'height':'150px','objectFit':'cover' }} src={image_2}/>
            <div className="d-flex align-items-center justify-content-between mt-3">
                <h6 className="card-title  text-dark text-truncate">Regal</h6>
            </div>
        </div>
    </div>


    <div>
        <div style={{ "border":"1px solid #dbdbdb", 'padding':'10px','borderRadius':'10px','overflow':'hidden', 'marginRight':'15px'}}>
            <img className="carousel-image" style={{'height':'150px','objectFit':'cover' }} src={image_3}/>
            <div className="d-flex align-items-center justify-content-between mt-3">
                <h6 className="card-title  text-dark text-truncate">Msi</h6>
            </div>
        </div>
    </div>

    <div>
        <div style={{ "border":"1px solid #dbdbdb", 'padding':'10px','borderRadius':'10px','overflow':'hidden', 'marginRight':'15px'}}>
            <img className="carousel-image" style={{'height':'150px','objectFit':'cover' }} src={image_4}/>
            <div className="d-flex align-items-center justify-content-between mt-3">
                <h6 className="card-title  text-dark text-truncate">Chakra</h6>
            </div>
        </div>
    </div>

    <div>
        <div style={{ "border":"1px solid #dbdbdb", 'padding':'10px','borderRadius':'10px','overflow':'hidden', 'marginRight':'15px'}}>
            <img className="carousel-image" style={{'height':'150px','objectFit':'cover' }} src={image_5}/>
            <div className="d-flex align-items-center justify-content-between mt-3">
                <h6 className="card-title  text-dark text-truncate">Tefal</h6>
            </div>
        </div>
    </div>

    <div>
        <div style={{ "border":"1px solid #dbdbdb", 'padding':'10px','borderRadius':'10px','overflow':'hidden', 'marginRight':'15px'}}>
            <img className="carousel-image" style={{'height':'150px','objectFit':'cover' }} src={image_6}/>
            <div className="d-flex align-items-center justify-content-between mt-3">
                <h6 className="card-title  text-dark text-truncate">Schafer</h6>
            </div>
        </div>
    </div>

    <div>
        <div style={{ "border":"1px solid #dbdbdb", 'padding':'10px','borderRadius':'10px','overflow':'hidden', 'marginRight':'15px'}}>
            <img className="carousel-image" style={{'height':'150px','objectFit':'cover' }} src={image_7}/>
            <div className="d-flex align-items-center justify-content-between mt-3">
                <h6 className="card-title  text-dark text-truncate">Madame COCO</h6>
            </div>
        </div>
    </div>

    <div>
        <div style={{ "border":"1px solid #dbdbdb", 'padding':'10px','borderRadius':'10px','overflow':'hidden', 'marginRight':'15px'}}>
            <img className="carousel-image" style={{'height':'150px','objectFit':'cover' }} src={image_8}/>
            <div className="d-flex align-items-center justify-content-between mt-3">
                <h6 className="card-title  text-dark text-truncate">HP</h6>
            </div>
        </div>
    </div>
    {/* Repeat this structure for each additional image */}
</OwlCarousel>

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
