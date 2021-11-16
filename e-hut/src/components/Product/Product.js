import React from "react";
import {NavLink} from 'react-router-dom'
import "./Product.css";

const Product = (props) => {
  return (
    <React.Fragment>
      <div className="product-content product-wrap clearfix">
        <div className="row">
          <div className="col-md-5 col-sm-12 col-xs-12">
            <div className="product-image">
              <img
                src="unnamed.jpg"
                height="228"
                width="194"
                alt="194x228"
                className="img-responsive"
              />
              <span className="tag2 hot">HOT</span>
            </div>
          </div>
          <div className="col-md-7 col-sm-12 col-xs-12">
            <div className="product-deatil">
              <h5 className="name">
                <a href="#">
                  <span>{props.value.Name}</span>
                </a>
              </h5>
              <p className="price-container">
                <span>{props.value.Price}</span>
              </p>
              <span className="tag1"></span>
            </div>
            <div className="description">
              <p>{props.value.Details} </p>
            </div>
            <div className="product-info smart-form">
              <div className="row">
                <div className="">
                  <a href="#" className="btn btn-success m-1">
                    Add to cart
                  </a>
                </div>
                <div> 
                   <NavLink to={`/products/${props.id}`} className='btn btn-success m-1'>See Details</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Product;
