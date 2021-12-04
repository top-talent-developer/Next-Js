//import React from 'react'
import { Card } from 'react-bootstrap';
import { LazyLoadImage } from "react-lazy-load-image-component";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Card15 = (props) => {
  return (
    <Card className="card15">
      <div className="card-img">
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
        <div className="before">
          <i class="fas fa-camera"></i>
          <i class="fas fa-file-alt"></i>
          <i class="fas fa-search-plus"></i>
        </div>
      </div>
      <Card.Body className="card-body">
        <Card.Title className="card-title"><strong>{props.data.title}</strong></Card.Title>
        <hr />
        <Card.Text className="card-text">
          <span>{props.data.desc}</span>  <br />
          <small className="">{props.data?.date} in</small>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Card15
