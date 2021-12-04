//import React, { useState } from 'react'
import { Card } from 'react-bootstrap';
//import img from "../assets/unyq-cover.jpg"
import { LazyLoadImage } from "react-lazy-load-image-component";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const Card8 = (props) => {
  //console.log(props.data)

  return props.data ? (
    <Card className="card8">
      {props.data._id && props.from === 'entity' ?
        <div className="position-absolute card_actions">
          <DeleteIcon className="card_del" onClick={() => { props.removeCard(props.data) }} />
          <EditIcon className="card_edit" onClick={() => { props.updateCard(props.data) }} />
        </div> : null}
      <LazyLoadImage
        src={props.data.image?.length > 0 ? props.data.image[0].Image : null}
        className="card-img"
        loading="lazy"
        alt=""
      />
      <Card.Body className="card-body">
        <Card.Text className="card-text">
          <i className="far fa-calendar-alt"></i> 16 Feb, 2019
        </Card.Text>
        <Card.Title className="card-title">{props.data.title}</Card.Title>
        <button><i className="fas fa-plus"></i> read more</button>
      </Card.Body>
    </Card>
  ) : null
}

export default Card8
