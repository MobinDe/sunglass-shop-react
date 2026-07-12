// pages/AllProductsPage.jsx
import React from "react";
import ProductList from "../components/ProductList";

const AllProductsPage = () => {
  return (
    <div className="container mx-auto px-4 py-4">
     
      <ProductList />   {/* اینجا Card ها نمایش داده می‌شوند */}
    </div>
  );
};

export default AllProductsPage;