// import React, { useState } from 'react'
// import { Card } from 'react-bootstrap';
import { LazyLoadImage } from "react-lazy-load-image-component";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Card12 = (props) => {
  const data = props.data.image
  
  return (
    <>
    {props.data._id && props.from === 'entity' ? 
        <div className="position-absolute card_actions">
          <DeleteIcon className="card_del" onClick={() => { props.removeCard(props.data) }} />
          <EditIcon className="card_edit" onClick={() => { props.updateCard(props.data) }} />
        </div> : null }
      {data?.map((obj, i) => (
        <div className="card12" key={i}>
          <div className="card-img">
            <LazyLoadImage
              src={obj.Image}
              loading="lazy"
              alt=""
            />
          </div>
          <div className="card-body">
            <h4 className="card-title">{props.data.title}</h4>
            <div className="card-text">
              <span>senior sales manager </span><br />
              <strong>+1 (987) 64598345693</strong>
            </div>
          </div>

        </div>
      ))}
    </>
  )
}

export default Card12
