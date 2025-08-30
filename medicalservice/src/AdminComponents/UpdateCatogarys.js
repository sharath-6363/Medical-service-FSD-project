import React, { useState } from "react";
import axios from "axios";

export default function UpdateCategories() {
  const [newCategory, setNewCategory] = useState("");
  const handleChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/postCato", {
        category: newCategory,
      });

      console.log("Category updated successfully:", response.data);

      setNewCategory("");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <>
      <div className="card h-25 w-50 text-center mx-auto mt-5">
        <h2>Update Categories</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="category">New Category:</label>
          <input
            className="form-control mx-auto mt-2 w-75"
            type="text"
            id="category"
            value={newCategory}
            onChange={handleChange}
            required
          />
          <button type="submit">Update Category</button>
        </form>
      </div>
    </>
  );
}
