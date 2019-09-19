import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
  name: '',
  price: '',
  imageUrl: '',
  description: '',
  shipping: ''
};

const MovieUpdateForm = props => {
  const [item, setItem] = useState(initialItem);

  const { match, items } = props;
  useEffect(() => {
    const id = match.params.id;
    const itemToUpdate = items.find(item => `${item.id}` === id);
    if (itemToUpdate) {
      console.log(itemToUpdate);
      setItem(itemToUpdate);
    }
  }, [match, items]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    // if (ev.target.name === 'price') {
    //   value = parseInt(value, 10);
    // }

    setItem({
      ...item,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/movies/${item.id}`, item)
      .then(res => {
        props.updateItems(res.data);
        props.history.push(`/movies/${item.id}`);
        setItem(initialItem);
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={item.tile}
        />
        <div className="baseline" />

        <input
          type="number"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={item.director}
        />
        <div className="baseline" />

        <input
          type="string"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={item.metascore}
        />
        <div className="baseline" />

        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={item.stars}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default MovieUpdateForm;
