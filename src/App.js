import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import Cart from "./products/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
     
   
     <Routes>
          <Route path="/react-ecommerce-template" element={<Landing />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/productDetails/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          
        </Routes>
    
    
    </>
  );
}

export default App;
