//import React from 'react'
import { Card } from 'react-bootstrap';
import { LazyLoadImage } from "react-lazy-load-image-component";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Card10 = (props) => {
  //const data = props.data.image //[{ "img": img1 }, { "img": img2 }, { "img": img3 }, { "img": img4 }]

  return (
    <>
      {props.data._id && props.from === 'entity' ? (
        <div className="position-absolute card_actions">
          <DeleteIcon className="card_del" onClick={() => { props.removeCard(props.data) }} />
          <EditIcon className="card_edit" onClick={() => { props.updateCard(props.data) }} />
        </div> 
      ) : null}
      { props.data?.image?.map((obj, i) => (
        <Card className="card card10" key={i}>
          <div className="card-img" >
            <h1>{props.data.title}</h1>

            <LazyLoadImage
              src={obj.Image}
              className=""
              loading="lazy"
              alt=""
            />
          </div>
          <Card.Body className="card-body">
            <Card.Text className="">
              {props.data.desc} <i className="fas fa-plus"></i>
            </Card.Text>
          </Card.Body>

        </Card>
      ))}
    </>
  )
}

export default Card10
