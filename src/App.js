import './styles/App.css';
import React, { useState, useEffect } from 'react';
import connection from './connection.json';


function App() {
  const INITIAL = {
    name: "",
  };
  const [formData, setFormData] = useState(INITIAL);

  const handleChange = (e) => {
    setFormData(
      (prev) => (prev = { ...prev, [e.target.name]: e.target.value})
    );
  };

const [items, setItems] = useState([]);
  const fetchData = async () => {
      const response = await fetch(connection.URI)
      const data = await response.json();
      setItems(data);
    } 

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${connection.URI}`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((response) => response.json())
    .then((response) => fetchData()) ;
    setFormData(INITIAL);
  };

  useEffect(() => {
    fetchData();
  });

  // const showList = () => {
  //   fetchData();
  // }
 
  const itemDelete = (id) => {
    fetch(`${connection.URI}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then((response) => response.json())
    .then((response) => fetchData());
  };

  return (
    <div className="App">
      <h1>Einkaufsliste</h1>
      <form onSubmit={handleSubmit} className="commentForm">
        <input 
          type="text"
          name="name"
          placeholder="Einkauf"
          maxlength="20"
          value={formData.name}
          onChange={handleChange}
        />
        <button className="saveBtn">Speichern</button>
      </form>
      <hr></hr>
      <div>
        <ul>
          {items.map(item => (
            <li>
              <div key={item._id}>{item.name}</div>
              <button className='deleteBtn' onClick={() => itemDelete(item._id)}>Löschen</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
