//import React, { useState } from 'react'
import { Card } from 'react-bootstrap';
//import img from "../assets/1-wtbeno90a6.png"
import { LazyLoadImage } from "react-lazy-load-image-component";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Card7 = (props) => {

  return (
    <Card className="card7 p-0">
      <Card.Body className="card-body">
      { props.data._id && props.from === 'entity' ? 
        <div className="position-absolute card_actions">
          <DeleteIcon className="card_del" onClick={() => { props.removeCard(props.data) }} />
          <EditIcon className="card_edit" onClick={() => { props.updateCard(props.data) }} />
        </div> : null }
        <LazyLoadImage
          src={props.data.image?.length > 0 ? props.data.image[0].Image : null}
          className="card-img img-fluid"
          loading="lazy"
          alt=""
        />
        <div className="after">
          <h6>{props.data.title}</h6>
          <p>{props.data.desc}</p>
          <button>Read More</button>
        </div>
      </Card.Body>
      <Card.Footer className="foot">
        <p>{props.data?.date} - 0 comments</p>
      </Card.Footer>
    </Card>
  )
}

export default Card7
