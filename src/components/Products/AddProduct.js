import React, { useState } from 'react';
import './AddProduct.css';
import { FaSave, FaPlus } from 'react-icons/fa'; // Ensure both icons are imported
import Sidebar from '../Dashboard/Sidebar';
import Header from '../Dashboard/Header';
import axios from 'axios';

const AddProduct = ({ onSubmit }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    features: '',
    basePrice: '',
    stock: '',
    discount: '',
    discountType: '',
    category: '',
    subCategory: '',
    images: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSaveDraft = () => {
    // Logic to save draft
  };

  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    setProduct({ ...product, images: [...product.images, ...files] });
  };

  const handleAddProduct = async () => {
    try {
      // First upload images
      const formData = new FormData();
      product.images.forEach((image) => {
        formData.append('images', image);
      });

      const uploadResponse = await axios.post('http://localhost:5000/api/upload', formData);

      if (uploadResponse.data.success) {
        const imagePaths = uploadResponse.data.filePaths;

        // Then create the product with image paths
        const newProduct = { ...product, images: imagePaths };
        const productResponse = await axios.post('http://localhost:5000/api/products', newProduct);

        if (productResponse.data.success) {
          console.log('Product added successfully:', productResponse.data.product);
          onSubmit(productResponse.data.product);
          setProduct({
            name: '',
            description: '',
            features: '',
            basePrice: '',
            stock: '',
            discount: '',
            discountType: '',
            category: '',
            subCategory: '',
            images: []
          });
        }
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="add-product-container">
        <Sidebar />
        <div className="main-content">
          <header className="add-product-header">
            <div className="header-left">
              <h1>Add Product</h1>
            </div>
          </header>
          <div className="add-product-content">
            <div className="info-and-upload">
              <section className="general-info">
                <h3>General Information</h3>
                <label>
                  Name Product
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    placeholder="Robotic Arm Assembly Kit"
                  />
                </label>
                <label>
                  Description Product
                  <textarea
                    name="description"
                    value={product.description}
                    onChange={handleInputChange}
                    placeholder="A DIY robotic arm assembly kit for educational purposes. Includes all necessary components and instructions for assembly."
                  />
                </label>
                <label>
                  Features
                  <textarea
                    name="features"
                    value={product.features}
                    onChange={handleInputChange}
                    placeholder="List the key features of the product"
                  />
                </label>
              </section>
              <section className="upload-img">
                <h3>Upload Img</h3>
                <div className="img-preview">
                  {product.images.length > 0 ? (
                    product.images.map((img, index) => (
                      <img key={index} src={URL.createObjectURL(img)} alt={`Product ${index + 1}`} />
                    ))
                  ) : (
                    <img src="https://via.placeholder.com/150" alt="Product" />
                  )}
                </div>
                <div className="img-thumbnails">
                  {product.images.map((img, index) => (
                    <img key={index} src={URL.createObjectURL(img)} alt={`Thumbnail ${index + 1}`} />
                  ))}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAddImage}
                    style={{ display: 'none' }}
                    id="imageUpload"
                  />
                  <label htmlFor="imageUpload" className="add-img-btn">
                    <FaPlus />
                  </label>
                </div>
              </section>
            </div>
            <div className="price-and-category">
              <section className="pricing-stock">
                <h3>Pricing And Stock</h3>
                <label>
                  Base Pricing
                  <input
                    type="text"
                    name="basePrice"
                    value={product.basePrice}
                    onChange={handleInputChange}
                    placeholder="Rs.100"
                  />
                </label>
                <label>
                  Stock
                  <input
                    type="text"
                    name="stock"
                    value={product.stock}
                    onChange={handleInputChange}
                    placeholder="100"
                  />
                </label>
                <label>
                  Discount
                  <input
                    type="text"
                    name="discount"
                    value={product.discount}
                    onChange={handleInputChange}
                    placeholder="10%"
                  />
                </label>
                <label>
                  Discount Type
                  <select
                    name="discountType"
                    value={product.discountType}
                    onChange={handleInputChange}
                  >
                    <option value="Seasonal Discount">Seasonal Discount</option>
                    {/* Add more discount types as needed */}
                  </select>
                </label>
              </section>
              <section className="category">
                <h3>Category</h3>
                <label>
                  Product Category
                  <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleInputChange}
                    placeholder="Robotics"
                  />
                </label>
                <label>
                  Sub Category
                  <input
                    type="text"
                    name="subCategory"
                    value={product.subCategory}
                    onChange={handleInputChange}
                    placeholder="Educational Kits"
                  />
                </label>
              </section>
            </div>
          </div>
          <div className="add-product-actions">
            <button className="save-draft-btn" onClick={handleSaveDraft}>
              <FaSave /> Save Draft
            </button>
            <button className="add-product-btn" onClick={handleAddProduct}>
              <FaPlus /> Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
