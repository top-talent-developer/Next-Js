//import React from 'react'
import { Card } from 'react-bootstrap';
import { LazyLoadImage } from "react-lazy-load-image-component";
//import img from "../../assets/1-4ufhogbyts.png"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Card1 = (props) => {
  // console.log("card1 ", props.data)

  return (
    <Card className="card1">
      {props.data._id && props.from === 'entity' ? 
      <div className="position-absolute card_actions">
        <DeleteIcon className="card_del" onClick={() => { props.removeCard(props.data) }} />
        <EditIcon className="card_edit" onClick={() => { props.updateCard(props.data) }} />
      </div> : null }
      <LazyLoadImage
        src={props.data.image?.length > 0 ? props.data.image[0].Image : null}
        className="card-img img-fluid"
        loading="lazy"
        alt={props.data.title}
      />
      <Card.Body>
        <Card.Title>{props.data.title}</Card.Title>
        <Card.Text className="card-text-1">
          {props.data.desc}
        </Card.Text>
        {/* <small className="text-muted mb-auto">address, private</small> */}
      </Card.Body>
      {props.data?.footer ?
      <Card.Footer className="foot text-muted">
        {/* <h6>ibn finalist</h6> */}
      </Card.Footer> : null }
    </Card>
  )
}

export default Card1
