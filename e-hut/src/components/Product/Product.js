import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import CartContext from "../store/cart-context";
import "./Product.css";

const Product = (props) => {
  const cartCtx = useContext(CartContext);
  const [shopsOfProducts, setShopsOfProducts] = useState([]);
  const [shopOfProduct, setShopOfProduct] = useState({});

  useEffect(() => {
    const getShop = async (id) => {
      await axios
        .get("https://localhost:44390/api/ProductDistributions")
        .then((response) => {
          let arr = response.data;
          setShopsOfProducts(arr);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getShop();
  }, []);

  const sendToCartHandler = () => {
    const shop = shopsOfProducts.filter((item) => item.ProductId === props.id);
    const shops = [];

    shop.map((item) => shops.push(item.ShopId));

    console.log(shops);
    cartCtx.addItem({
      id: props.id,
      shopsId: shops,
      image: "https://freepngimg.com/thumb/categories/291.png",
      name: props.value.Name,
      amount: 1,
      price: props.value.Price,
    });
  };
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
                  <button
                    className="btn btn-success m-1"
                    onClick={sendToCartHandler}
                  >
                    Add to cart
                  </button>
                </div>
                <div>
                  <NavLink
                    to={`/products/${props.id}`}
                    className="btn btn-success m-1"
                  >
                    See Details
                  </NavLink>
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
