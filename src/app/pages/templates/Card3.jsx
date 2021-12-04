//import React from 'react'
import { Card } from 'react-bootstrap';
import { LazyLoadImage } from "react-lazy-load-image-component";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
//import img from "../assets/livehive-pitch-deck-v7-5-28-2021-new-no-addendum-2-slide-1-p4ln2xb4ld.png"

const Card3 = (props) => {
  //console.log("props.data", props)

  return (
    <Card className="card3">
      <span>16<br/> feb</span>
      {props.data._id && props.from === 'entity' ? 
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
      <Card.Body className="card-body">
        <Card.Title className="card-title">{props.data.title}</Card.Title>
        <Card.Text className="card-text">{props.data.desc}</Card.Text>
      </Card.Body>
      <button>read more... </button>
    </Card>
  )
}

export default Card3
