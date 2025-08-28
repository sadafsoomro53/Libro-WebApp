import React from 'react'

const Vender = () => {
  return (
    <div>
      <h1>Vender Page</h1>
      <p>Welcome to the Vender page! Here you can manage your book listings and sales.</p>
      <p>Use the form below to add new books to your inventory.</p>
      <form>
        <div>
          <label htmlFor="title">Book Title:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" name="author" required />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" required />
        </div>
        <button type="submit">Add Book</button>
      </form>

      <h2>Current Inventory</h2>
      <ul>
        <li>Book 1</li>
        <li>Book 2</li>
        <li>Book 3</li>
      </ul>

      <h2>Add New Book</h2>
      <form>
        <div>
          <label htmlFor="title">Book Title:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" name="author" required />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" required />
        </div>
        <button type="submit">Add Book</button>
      </form>
      
    </div>
  )
}

export default Vender
