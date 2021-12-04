//import React from 'react'
import { Card } from 'react-bootstrap';
//import img from "../assets/1-82wpwrknx5.png"
import { LazyLoadImage } from "react-lazy-load-image-component";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Card5 = (props) => {
  // console.log("props.data", props.data)
  
  return (
    <Card className="card5">
      
      {props.data?._id && props.from === 'entity' ? 
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
          <small>{props.data?.date} - 0 comments</small>
        </Card.Text>
        <Card.Title className="card-title">{props.data.title}</Card.Title>
        <Card.Text className="card-text text-muted">{props.data.desc}</Card.Text>
        <button>read more</button>
      </Card.Body>

    </Card>
  )
}

export default Card5
