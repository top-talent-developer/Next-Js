//import React from 'react'
import { Card } from 'react-bootstrap';
import { LazyLoadImage } from "react-lazy-load-image-component";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Card2 = (props) => {

  return (
    <Card className="card2">
      <span>9 <br /> May</span>
      {props.data._id && props.from === 'entity' ? 
      <div className="position-absolute card_actions">
        <DeleteIcon className="card_del" onClick={() => { props.removeCard(props.data) }} />
        <EditIcon className="card_edit" onClick={() => { props.updateCard(props.data) }} />
      </div> : null }
      <LazyLoadImage
        src={props.data.image?.length > 0 ? props.data.image[0].Image : null}
        className="card-img"
        loading="lazy"
        alt=""
      />
      <Card.Body className="card-body">
        <Card.Title className="card-title">{props.data.title}</Card.Title>
        <Card.Text className="card-text">
          {props.data.desc}
        </Card.Text>
        <button>read more...</button>
      </Card.Body>
    </Card>
  )
}

export default Card2
