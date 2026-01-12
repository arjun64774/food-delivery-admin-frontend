import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import  axios  from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';


const Add = ({url}) => {

    // // connect with backend url
    // const url = "http://localhost:4000"

    const [image,setImage] = useState(null);

    const navigate = useNavigate();


    // temporary store data 
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:""
    })

    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }


    const onSubmitHandler = async (event) =>{

        event.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price",Number(data.price))
        formData.append("category",data.category)
        formData.append("image",image)

        const response = await axios.post(`${url}/api/food/add`,formData)

        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:""
            })
            setImage(false)
            toast.success(response.data.message)

            // optional small delay so toast is visible
            setTimeout(() => {
                navigate("/list");
            }, 400);

        }else{
            toast.error(response.data.message)
        }
    }



  return (
    <div className='add'>
        <form action="" className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-image-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image ? URL.createObjectURL(image): assets.upload_area} alt="" srcset="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
            </div>

            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
            </div>

            <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" id="" rows={6} placeholder='Write content here' required ></textarea>
            </div>

            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler}  name="category">
                        <option value="Select Category">Select Category</option>
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Desert">Desert</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                        <option value="Pure Veg">Pure Veg</option>
                    </select>
                </div>

                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={onChangeHandler} value={data.price}  type="number" name='price' placeholder='$20' />
                </div>
            </div>

            <button type='submit' className='add-button'>Add</button>
        </form>
      
    </div>
  )
}

export default Add
