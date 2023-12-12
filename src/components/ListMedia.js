import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../constants';
import {Link} from 'react-router-dom';

function ListMedia(props) {
    const [medias, setMedia] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
    // called once after intial render
    fetchMedia();
    }, [] )


    const fetchMedia = () => {
        console.log("fetchMedia");
        fetch(`${SERVER_URL}/api/media`)
        .then((response) => response.json() ) 
        .then((data) => { 
        console.log("assignment length "+data.length);
        setMedia(data);
        }) 
        .catch(err => console.error(err)); 
  };

  const [confirmDelete, setConfirmDelete] = useState(null); // Track the id of the item to delete

  const handleDeleteClick = (id) => {
    setConfirmDelete(id); // Set the id to confirm deletion
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null); // Reset the id to cancel deletion
  };

  const handleConfirmDelete = () => {
    deleteMedia(confirmDelete); // Call deleteMedia with the confirmed id
    setConfirmDelete(null); // Reset the id after deletion
  };

  const deleteMedia = (id) => {
    fetch(`${SERVER_URL}/api/media/${id}` ,
    {  
      method: 'DELETE'
    } )
.then(res => {
    if (res.ok) {
      //fetchGrades(assignmentId);
      setMessage("Review Deleted.");
      window.location.reload(false);  
    } else {
      setMessage("Save error. "+res.status);
      console.error('Delete review error =' + res.status);
}})
  .catch(err => {
      setMessage("Exception. "+err);
      console.error('Delete review exception =' + err);
  });
};        

  const headers = ['Image', 'Media Title', 'Type', 'Genre', 'Rating', 'Review', ' ', ' '];

    return (
      <div className='list-media-container'>
        <h3>Reviews</h3>
        <div margin="auto" >
          <h4 className='message'>{message}&nbsp;</h4>
              <table className="media-table"> 
                <thead>
                  <tr>
                    {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                  </tr>
                </thead>
                <tbody>
                  {medias.map((row, idx) => (
                    <tr key={idx}>
                      <td><img src={row.picURL} height={100} max-width={250}></img></td>
                      <td>{row.title}</td>
                      <td>{row.type}</td>
                      <td>{row.genre}</td>
                      <td>{row.rating}</td>
                      <td>{row.review}</td>
                      <td>
                      <Link to={`/editReview/${medias[idx].id}`}>Edit</Link>
                      
                      </td>
                      <td><button onClick={()=>handleDeleteClick(medias[idx].id)}>Delete</button></td>

                    </tr>
                  ))}
                </tbody>
              </table>
              {confirmDelete && (
              <div>
                <p>Are you sure you want to delete this review?</p>
                <button onClick={handleConfirmDelete}>Yes</button>
                <button onClick={handleCancelDelete}>No</button>
              </div>
               )}  
               <hr></hr>
              <Link to={`/addReview/`} className='add-review-link'>Add Review</Link>
          </div>
      </div>
    )
}  

export default ListMedia;
