//import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";
import Slider from "@material-ui/core/Slider";
import filter from "../../../app/assets/filter.jpeg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  openFilters,
  closeFilters,
  overflow_hidden,
  overflow_showing,
} from "../../event_functions";

function FilterPopup() {
  return (
    <div className="filters-selection mt-1 d-md-none d-block ">
      <div className="filters-bar d-flex bg-light m-0 mt-3">
        <LazyLoadImage
          className="filter-icon"
          src={filter}
          loading="lazy"
          alt=""
        />
        <div className="d-flex">
          <div
            className="select-filter-a"
            onClick={(e) => {
              openFilters(e);
              overflow_hidden();
            }}
          >
            Top Rated &nbsp;<i className="fas fa-chevron-down"></i>
          </div>
          <div
            className="select-filter-a"
            onClick={(e) => {
              openFilters(e);
              overflow_hidden();
            }}
          >
            Built In-Speakers &nbsp;<i className="fas fa-chevron-down"></i>
          </div>
          <div
            className="select-filter-a"
            onClick={(e) => {
              openFilters(e);
              overflow_hidden();
            }}
          >
            Top Rated &nbsp;<i className="fas fa-chevron-down"></i>
          </div>
          <div
            className="select-filter-a"
            onClick={(e) => {
              openFilters(e);
              overflow_hidden();
            }}
          >
            Built In-Speakers &nbsp;<i className="fas fa-chevron-down"></i>
          </div>
          <div className="sortBy d-md-none d-block">
            Sort by Popularity &nbsp;
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>
      <div className="filters-popup d-none" id="filters-popup">
        <div className=" filters-options d-md-none d-block mt-1 bg-light">
          <div className="div pb-2">
            <div className="d-flex flex-column py-2">
              <b>Brand</b>
              <small className="checkbox-cat">
                <Checkbox /> Electronics
              </small>
              <small className="checkbox-cat">
                <Checkbox /> SAMSUNG
              </small>
              <small className="checkbox-cat">
                <Checkbox /> APPPLE
              </small>
              <small className="checkbox-cat">
                <Checkbox /> TOZO
              </small>
              <small className="checkbox-cat">
                <Checkbox /> URGREEN
              </small>
              <small className="checkbox-cat">
                <Checkbox /> vankyo
              </small>
              <small className="checkbox-cat">
                <Checkbox /> Jabra
              </small>
            </div>
          </div>
          <div className="div pb-2 border-bottom">
            <div className="d-flex flex-column py-2">
              <b>Brand</b>
              <small className="d-flex">
                <Star fontSize="small" />
                <StarBorder fontSize="small" />
                <StarBorder fontSize="small" />
                <StarBorder fontSize="small" />
                <StarBorder fontSize="small" />
              </small>
              <small className="d-flex">
                <Star fontSize="small" />
                <StarBorder fontSize="small" />
                <StarBorder fontSize="small" />
                <StarBorder fontSize="small" />
                <StarBorder fontSize="small" />
              </small>
            </div>
          </div>
          <div className="div pb-2 border-bottom">
            <div className="d-flex flex-column py-2">
              <b>Brand</b>
              <small className="d-flex justify-content-between w-50">
                <Slider
                  steps={2}
                  min={0}
                  max={10}
                  defaultValue={7}
                  valueLabelDisplay="auto"
                  className="w-50"
                />{" "}
                Electronics
              </small>
              <small className="d-flex justify-content-between w-50">
                <Slider
                  steps={3}
                  min={0}
                  max={6}
                  defaultValue={2}
                  valueLabelDisplay="auto"
                  className="w-50"
                />{" "}
                SAMSUNG
              </small>
            </div>
          </div>
        </div>
        <div className="filters-buttons bg-light d-flex border-top justify-content-between">
          <button>Clear Filters</button>
          <button>Apply</button>
          <button
            onClick={() => {
              closeFilters();
              overflow_showing();
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterPopup;
