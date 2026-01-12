import React, { useState } from 'react'
import './Add.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Add = ({ url }) => {
  const navigate = useNavigate()

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    file: null
  })

  const onChangeHandler = (e) => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const onFileChange = (e) => {
    setData(prev => ({ ...prev, file: e.target.files[0] }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("price", data.price)
    formData.append("category", data.category)
    formData.append("image", data.file)

    try {
      const res = await axios.post(`${url}/api/food/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      if (res.data.success) {
        toast.success("Food added successfully")
        navigate("/list")
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>

        {/* IMAGE UPLOAD */}
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <input type="file" accept="image/*" onChange={onFileChange} />

          {data.file && (
            <img
              src={URL.createObjectURL(data.file)}
              alt="preview"
              style={{ width: "150px", marginTop: "10px" }}
            />
          )}
        </div>

        {/* NAME */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            rows={6}
            required
          />
        </div>

        {/* CATEGORY & PRICE */}
        <div className="add-category-price">

          <select name="category" value={data.category} onChange={onChangeHandler} required>
            <option value="">Select Category</option>
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Dessert</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
            <option value="Pure Veg">Pure Veg</option>
          </select>

          <input
            type="number"
            name="price"
            value={data.price}
            onChange={onChangeHandler}
            placeholder="₹200"
            required
          />
        </div>

        <button type="submit" className="add-button">Add</button>
      </form>
    </div>
  )
}

export default Add
