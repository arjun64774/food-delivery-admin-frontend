// src/pages/Edit/Edit.jsx
import React, { useEffect, useState } from 'react';
import './Edit.css'; // same styling as Add
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = ({ url }) => {
  const { id } = useParams(); // get food ID from URL
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  });

  // fetch food details on mount
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`${url}/api/food/${id}`);
        if (response.data.success) {
          const food = response.data.data;
          setData({
            name: food.name,
            description: food.description,
            price: food.price,
            category: food.category
          });
          setImage(`${url}/images/${food.image}`);
        } else {
          toast.error("Food not found");
        }
      } catch (err) {con
        toast.error("Something went wrong");
      }
    };

    fetchFood();
  }, [id, url]);

//   useEffect(() => {
//     console.log("Updated data:", data);
//     }, [data]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    if (image instanceof File) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(`${url}/api/food/edit/${id}`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/list"); // redirect back to list
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className='add'>
      <form onSubmit={onSubmitHandler} className="flex-col">
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img 
              src={image ? (image instanceof File ? URL.createObjectURL(image) : image) : assets.upload_area} 
              alt="" 
            />
          </label>
          <input 
            onChange={(e) => setImage(e.target.files[0])} 
            type="file" 
            id='image' 
            hidden
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input 
            onChange={onChangeHandler} 
            value={data.name} 
            type="text" 
            name='name' 
            placeholder='Type here' 
            required 
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea 
            onChange={onChangeHandler} 
            value={data.description} 
            name="description" 
            rows={6} 
            placeholder='Write content here' 
            required 
          ></textarea>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
                onChange={onChangeHandler}
                name="category"
                value={data.category}
                required
            >
                <option value="">Select Category</option>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Desserts">Desserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
                <option value="Pure Veg">Pure Veg</option>
            </select>

          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input 
              onChange={onChangeHandler} 
              value={data.price}  
              type="number" 
              name='price' 
              placeholder='$20' 
              required 
            />
          </div>
        </div>

        <button type='submit' className='add-button'>Update</button>
      </form>
    </div>
  );
};

export default Edit;
