import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Add = ({ url }) => {
  const navigate = useNavigate();

  // store form data, now image is a key from assets
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "food_1" // default image
  });

  // handle input changes
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // handle submit
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${url}/api/food/add`, data); // send JSON directly

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "",
          image: "food_1"
        });
        toast.success(response.data.message);

        setTimeout(() => {
          navigate("/list");
        }, 400);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>

        {/* Image selector */}
        <div className="add-image-upload flex-col">
          <p>Select Image</p>
          <select name="image" value={data.image} onChange={onChangeHandler}>
            {Object.keys(assets)
              .filter(key => key.startsWith("food_"))
              .map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
          </select>

          {/* preview */}
          <img
            src={assets[data.image]}
            alt="preview"
            style={{ marginTop: '10px', width: '150px' }}
          />
        </div>

        {/* Product name */}
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

        {/* Product description */}
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows={6}
            placeholder='Write content here'
            required
          />
        </div>

        {/* Category & Price */}
        <div className="add-category-price">

          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" value={data.category} required>
              <option value="">Select Category</option>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Desert</option>
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

        <button type='submit' className='add-button'>Add</button>
      </form>
    </div>
  )
}

export default Add
