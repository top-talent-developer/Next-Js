//import React from 'react'
import { Card } from 'react-bootstrap';
//import img from "../assets/1-eidfukfpdm.png"
import { LazyLoadImage } from "react-lazy-load-image-component";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Card4 = (props) => {
  return (
    <Card className="card4">
      
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
        <Card.Text className="text-muted">
          {props.data?.date} - 0 comments
        </Card.Text>
        <Card.Title className="card-title">{props.data.title}</Card.Title>
        <button>read more</button>
      </Card.Body>

    </Card>
  )
}

export default Card4
