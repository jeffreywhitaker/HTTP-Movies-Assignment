import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialItem = {
  title: '',
  director: '',
  metascore: ''
};

const UpdateForm = props => {
  const [item, setItem] = useState(initialItem);

  const { match, items } = props;
  useEffect(() => {
    const id = match.params.id;
    const itemToUpdate = items.find(item => `${item.id}` === id);
    if (itemToUpdate) {
      console.log(itemToUpdate);
      itemToUpdate.starString = itemToUpdate.stars.join(', ')
      setItem(itemToUpdate);
    }
  }, [items]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    setItem({
      ...item,
      [ev.target.name]: value
    });
  };

  const textStyle = {
    width: '800px'
  }

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${item.id}`, {
          ...item,
          stars: item.starString.split(', ')
      })
      .then(res => {
        props.updateItems(res.data);
        props.history.push(`/movies/${item.id}`);
      })
      .catch(err => console.log(err.response));
  };

  return (
    <div className="movie-card">
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={item.title}
        />
        <div className="baseline" />

        <input
          type="text"
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
          name="starString"
          style={textStyle}
          onChange={changeHandler}
          placeholder="stars"
          value={item.starString}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;