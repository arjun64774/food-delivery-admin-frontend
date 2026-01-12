import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./List.css";

const List = () => {
  const { url } = useContext(StoreContext);
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get(`${url}/api/food/list`);
        if (res.data.success) {
          setFoodList(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching food list:", err);
      }
    };

    fetchFood();
  }, [url]);

  return (
    <div className="list-container">
      <h2>Food List</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {foodList.map((item) => (
            <tr key={item._id}>
              <td>
                {item.image ? (
                  <a href={item.image} target="_blank" rel="noopener noreferrer">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "80px", height: "80px", objectFit: "cover" }}
                    />
                  </a>
                ) : (
                  "No Image"
                )}
              </td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>${item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
