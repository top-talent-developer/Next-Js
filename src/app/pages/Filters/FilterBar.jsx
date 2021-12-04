import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Star from '@material-ui/icons/Star'
import StarBorder from '@material-ui/icons/StarBorder'





function FilterBar() {
    return (
       
            <div className="filterBar col-2 col-md-2 col-xl-2 d-md-block d-none p-0 border-right">
                <b>Kroger</b>
                <div className="py-1 d-flex flex-column">
                <small className="checkbox-cat">
                      <Checkbox/> Electronics
                  </small>
                </div>
                <div className="d-flex flex-column py-2">
                <b>Department</b>
                <small>Audio Headphones</small>
                <small>Earbud & In-Ear Headshones</small>
                <small className='text-primary mt-1'><ChevronRight/> See All 4 Departments</small>
                </div>

                <div className="col p-0 ">
                <small className="d-flex">
                <Star fontSize="small"/>
                <Star fontSize="small"/>
                <Star fontSize="small"/>
                <Star fontSize="small"/>
                <StarBorder fontSize="small"/> & Up
                </small>
                <small className="d-flex">
                <Star fontSize="small"/>
                <Star fontSize="small"/>
                <Star fontSize="small"/>
                <StarBorder fontSize="small"/>
                <StarBorder fontSize="small"/> & Up
                </small>
                <small className="d-flex">
                <Star fontSize="small"/>
                <Star fontSize="small"/>
                <StarBorder fontSize="small"/>
                <StarBorder fontSize="small"/>
                <StarBorder fontSize="small"/> & Up
                </small>
                <small className="d-flex">
                <Star fontSize="small"/>
                <StarBorder fontSize="small"/>
                <StarBorder fontSize="small"/>
                <StarBorder fontSize="small"/>
                <StarBorder fontSize="small"/> & Up
                </small>

                </div>
              
              <div className="d-flex flex-column py-2">
                  <b>Brand</b>
                  <small className="checkbox-cat">
                      <Checkbox/> Electronics
                  </small>
                  <small className="checkbox-cat">
                      <Checkbox/> SAMSUNG
                  </small>
                  <small className="checkbox-cat">
                      <Checkbox/> APPPLE
                  </small>
                  <small className="checkbox-cat">
                      <Checkbox/> TOZO
                  </small>
                  <small className="checkbox-cat">
                      <Checkbox/> URGREEN
                  </small>
                  <small className="checkbox-cat">
                      <Checkbox/> vankyo
                  </small>
                  <small className="checkbox-cat">
                      <Checkbox/> Jabra
                  </small>
                <small className='text-primary mt-2'><ChevronRight/> See All 4 Departments</small>

              </div>


            </div>
       
    )
}

export default FilterBar
