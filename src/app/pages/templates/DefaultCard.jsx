//import React from 'react'
import { Card } from 'react-bootstrap';
import { LazyLoadImage } from "react-lazy-load-image-component";
//import img from "../../assets/1-4ufhogbyts.png"

const DefaultCard = (props) => {
  // console.log("card1 ", props.data)
  return (
    <Card className="card1">
      {/* <Card.Img variant="top" src={props.data.image && props.data.image.length > 0 ? props.data.image[0].Image : img} /> */}
      <LazyLoadImage
        src={props.data.image?.length > 0 ? props.data.image[0].Image : null}
        className="card-img img-fluid"
        loading="lazy"
        alt="Default Card"
      />
      <Card.Body>
        <Card.Title>Default Card</Card.Title>
        <Card.Text className="card-text-1">
          Card Class with Name <b>{props.comp}</b> doesn't exist
        </Card.Text>
        {/* <small className="text-muted mb-auto">address, private</small> */}
      </Card.Body>

      <Card.Footer className="foot text-muted">
        {/* <h6>ibn finalist</h6> */}
      </Card.Footer>
    </Card>
  )
}

export default DefaultCard
