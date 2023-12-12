import React, { useState } from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';

function AddReview(props) { 

  const [message, setMessage] = useState('');
  const [factors, setFactors] = useState({title:"", type:"", genre:"", rating:0, review:"", picURL:""});

  const saveMedia = ( ) => {
    setMessage('');
    console.log("Media saved");  
    factors.name=   
    fetch(`${SERVER_URL}/api/media` , 
        {  
          method: 'POST', 
          headers: { 'Content-Type': 'application/json', }, 
          body: JSON.stringify({
            title:factors.title,
            type:factors.type,
            genre:factors.genre,
            rating:factors.rating,
            review:factors.review,
            picURL:factors.picURL
          })
        } )
    .then(res => {
        if (res.ok) {
          //fetchGrades(assignmentId);
          setMessage("Review saved.");
        } else {
          setMessage("Save error. "+res.status);
          console.error('Save review error =' + res.status);
    }})
      .catch(err => {
          setMessage("Exception. "+err);
          console.error('Save review exception =' + err);
      });
 };        

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFactors(prevFactors => ({
    ...prevFactors,
    [name]: name === 'rating' ? parseInt(value, 10) : value
  }));
};

 

  return (
      <div>
        <h3>Add Review</h3>
        <h4 id="amessage" >{message}&nbsp;</h4>
        <h5>Media Image (URL)</h5>
        <input name="picURL" style={{width: '500px'}} value={factors.picURL || ""} type="text" onChange={(e) => handleChange(e)}/>
        <hr/><h5>Media Title</h5>
        <input name="title" value={factors.title || ""} type="text" onChange={(e) => handleChange(e)}/>
        <hr/> <h5>Media Type</h5>
        <input name='type' value={(factors.type)? factors.type:""} type="text" onChange={(e) => handleChange(e)}/>
        <hr/><h5>Genre</h5>
        <input name='genre' value={(factors.genre)? factors.genre:""} type='text' onChange={(e) => handleChange(e)}/>
        <hr/><h5>Rating (1-10)</h5>
        <input name='rating' value={(factors.rating)? factors.rating:""} min="1"max="10"type='number' onChange={(e) => handleChange(e)}/>
        <hr/><h5>Written Review</h5>
        <input name='review' style={{width: '500px', wordWrap: 'break-word', height: '30px'}} value={(factors.review)? factors.review:""} type="text" onChange={(e) => handleChange(e)}/> <hr></hr>
        <button id='sassign' type="button" margin="auto" onClick={saveMedia}>Save Review</button> <br></br>
        <button><Link to={`/`}>Back</Link></button>
      </div>
  ); 
}

export default AddReview;