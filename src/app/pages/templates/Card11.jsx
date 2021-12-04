//import React from 'react'
import { Card } from 'react-bootstrap';
import { LazyLoadImage } from "react-lazy-load-image-component";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Card11 = (props) => {
  const data = props.data.image

  return (
    <>
      { props.data._id && props.from === 'entity' ? (
        <div className="position-absolute card_actions">
          <DeleteIcon className="card_del" onClick={() => { props.removeCard(props.data) }} />
          <EditIcon className="card_edit" onClick={() => { props.updateCard(props.data) }} />
        </div> 
      ) : null }
      {data?.map((obj, i) => (
         <Card className="card card11" key={i}>
            <LazyLoadImage
              src={obj.Image}
              className=" img-fluid card-img"
              loading="lazy"
              alt=""
            />
          <Card.Body className="card-body">
            <Card.Title className="card-title">{props.data.title}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default Card11
