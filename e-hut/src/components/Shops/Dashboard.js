import axios from "axios";
import React, { useState, useEffect } from "react";
import reactDom from "react-dom";
import "./Dashboard.css";
import ViewReview from "./ViewReview";
import StarRatingComponent from "react-star-rating-component";
const ShopDashboard = (props) => {
  var user = JSON.parse(localStorage.getItem("user"));
  var cred = user.Phone + ":" + user.Password;
  const [countPendingOrder, setCountPendingOrder] = useState(0);
  const [pendingProduct, setPendingProduct] = useState([]);
  const [processingProduct, setProcessingProduct] = useState([]);
  const [countProcessingOrder, setCountProcessingOrder] = useState(0);
  const [DeliverProduct, setDeliverProduct] = useState([]);
  const [countDeliverOrder, setCountDeliverOrder] = useState(0);
  const [ReturnedProduct, setReturnedProduct] = useState([]);
  const [countReturnedOrder, setCountReturnedOrder] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://localhost:44390/api/SalesRecords/GetNonDeliveredRecords/" +
          user.UserId,
        {
          headers: {
            Authorization: "Basic " + btoa(cred),
          },
        }
      )
      .then((response) => {
        setCountPendingOrder(response.data.length);
        setPendingProduct(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        "https://localhost:44390/api/SalesRecords/GetRecordsByStatus/" +
          user.UserId +
          "/" +
          "Accepted",
        {
          headers: {
            Authorization: "Basic " + btoa(cred),
          },
        }
      )
      .then((response) => {
        setCountProcessingOrder(response.data.length);
        setProcessingProduct(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        "https://localhost:44390/api/SalesRecords/GetRecordsByStatus/" +
          user.UserId +
          "/" +
          "Return",
        {
          headers: {
            Authorization: "Basic " + btoa(cred),
          },
        }
      )
      .then((response) => {
        setCountReturnedOrder(response.data.length);
        setReturnedProduct(response.data);
        console.log(response.data[0].Product.ProductId);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        "https://localhost:44390/api/ShopReviews/GetDeliveredProductsReview/" +
          user.UserId,
        {
          headers: {
            Authorization: "Basic " + btoa(cred),
          },
        }
      )
      .then((response) => {
        console.log("chek" + response.data.length);
        setCountDeliverOrder(response.data.length);
        setDeliverProduct(response.data);
        console.log(response.data);
        ////////////////////////////

        ///////////////////////////
      })
      .catch((err) => {
        console.log(err);
      });
  }, [countPendingOrder, countProcessingOrder, countDeliverOrder]);

  const AcceptOrder = (srId) => (e) => {
    console.log(srId);
    axios
      .post(
        "https://localhost:44390/api/Shops/ProductOrderAcceptance",
        {
          SalesRecordId: srId,
          status: "Accepted",
        },
        {
          headers: {
            Authorization: "Basic " + btoa(cred),
          },
        }
      )
      .then((response) => {
        console.log(response.status);
        /////////////
        axios
          .get(
            "https://localhost:44390/api/SalesRecords/GetNonDeliveredRecords/" +
              user.UserId,
            {
              headers: {
                Authorization: "Basic " + btoa(cred),
              },
            }
          )
          .then((response) => {
            setCountPendingOrder(response.data.length);
            setPendingProduct(response.data);
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
        ///////////
        axios
          .get(
            "https://localhost:44390/api/SalesRecords/GetRecordsByStatus/" +
              user.UserId +
              "/" +
              "Accepted",
            {
              headers: {
                Authorization: "Basic " + btoa(cred),
              },
            }
          )
          .then((response) => {
            setCountProcessingOrder(response.data.length);
            setProcessingProduct(response.data);
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
        /////////////////
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RejectOrder = (srId) => (e) => {
    console.log(srId);
    axios
      .post(
        "https://localhost:44390/api/Shops/ProductOrderAcceptance",
        {
          SalesRecordId: srId,
          status: "Rejected",
        },
        {
          headers: {
            Authorization: "Basic " + btoa(cred),
          },
        }
      )
      .then((response) => {
        console.log(response.status);
        /////////////
        axios
          .get(
            "https://localhost:44390/api/SalesRecords/GetNonDeliveredRecords/" +
              user.UserId,
            {
              headers: {
                Authorization: "Basic " + btoa(cred),
              },
            }
          )
          .then((response) => {
            setCountPendingOrder(response.data.length);
            setPendingProduct(response.data);
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
        ///////////
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const DeliverOrder = (srId) => (e) => {
    axios
      .post(
        "https://localhost:44390/api/Shops/ProductOrderAcceptance",
        {
          SalesRecordId: srId,
          status: "Delivered",
        },
        {
          headers: {
            Authorization: "Basic " + btoa(cred),
          },
        }
      )
      .then((response) => {
        console.log(response.status);
        axios
          .get(
            "https://localhost:44390/api/SalesRecords/GetRecordsByStatus/" +
              user.UserId +
              "/" +
              "Accepted",
            {
              headers: {
                Authorization: "Basic " + btoa(cred),
              },
            }
          )
          .then((response) => {
            setCountProcessingOrder(response.data.length);
            setProcessingProduct(response.data);
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AcceptReturnOrder = (srId) => (e) => {
    axios
      .post(
        "https://localhost:44390/api/Shops/ProductOrderAcceptance",
        {
          SalesRecordId: srId,
          status: "Returned",
        },
        {
          headers: {
            Authorization: "Basic " + btoa(cred),
          },
        }
      )
      .then((response) => {
        console.log(response.status);
        axios
          .get(
            "https://localhost:44390/api/SalesRecords/GetRecordsByStatus/" +
              user.UserId +
              "/" +
              "Return",
            {
              headers: {
                Authorization: "Basic " + btoa(cred),
              },
            }
          )
          .then((response) => {
            setCountReturnedOrder(response.data.length);
            setReturnedProduct(response.data);
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RejectReturnOrder = (srId) => (e) => {
    axios
      .post(
        "https://localhost:44390/api/Shops/ProductOrderAcceptance",
        {
          SalesRecordId: srId,
          status: "Rejected",
        },
        {
          headers: {
            Authorization: "Basic " + btoa(cred),
          },
        }
      )
      .then((response) => {
        console.log(response.status);
        axios
          .get(
            "https://localhost:44390/api/SalesRecords/GetRecordsByStatus/" +
              user.UserId +
              "/" +
              "Return",
            {
              headers: {
                Authorization: "Basic " + btoa(cred),
              },
            }
          )
          .then((response) => {
            setCountReturnedOrder(response.data.length);
            setReturnedProduct(response.data);
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickDelivered = (e) => {
    document.querySelector(".PendingOrderEl").style.display = "none";
    document.querySelector(".ProcessingOrderEl").style.display = "none";
    document.querySelector(".DeliverOrderOrderEl").style.display = "block";
    document.querySelector(".ReturnedOrderOrderEl").style.display = "none";
  };

  const OnClickPendingOrder = (e) => {
    document.querySelector(".PendingOrderEl").style.display = "block";
    document.querySelector(".ProcessingOrderEl").style.display = "none";
    document.querySelector(".DeliverOrderOrderEl").style.display = "none";
    document.querySelector(".ReturnedOrderOrderEl").style.display = "none";
  };

  const OnClickProcessingOrder = (e) => {
    document.querySelector(".ProcessingOrderEl").style.display = "block";
    document.querySelector(".PendingOrderEl").style.display = "none";
    document.querySelector(".DeliverOrderOrderEl").style.display = "none";
    document.querySelector(".ReturnedOrderOrderEl").style.display = "none";
  };

  const OnClickReturnedOrder = (e) => {
    document.querySelector(".ReturnedOrderOrderEl").style.display = "block";
    document.querySelector(".ProcessingOrderEl").style.display = "none";
    document.querySelector(".PendingOrderEl").style.display = "none";
    document.querySelector(".DeliverOrderOrderEl").style.display = "none";
  };

  return (
    <React.Fragment>
      <div className="DashboardComp">
        <div className="shadow-box-example z-depth-5">
          <p id="tOrderText">Pending Order</p>
          <p id="tOrderCount">{countPendingOrder}</p>
          <button
            style={{ color: "black" }}
            id="penBtn"
            type="button"
            class="btn btn-outline-primary "
            onClick={OnClickPendingOrder}
          >
            Details
          </button>
        </div>
        <div className="shadow-box-example z-depth-5">
          <p id="tOrderText">Processing</p>
          <p id="tOrderCount">{countProcessingOrder}</p>
          <button
            style={{ color: "black" }}
            id="penBtn"
            type="button"
            class="btn btn-outline-primary "
            onClick={OnClickProcessingOrder}
          >
            Details
          </button>
        </div>

        <div className="shadow-box-example z-depth-5">
          <p id="tOrderText">Delivered</p>
          <p id="tOrderCount">{countDeliverOrder}</p>
          <button
            style={{ color: "black" }}
            id="penBtn"
            type="button"
            class="btn btn-outline-primary "
            onClick={onClickDelivered}
          >
            Details
          </button>
        </div>

        <div className="shadow-box-example z-depth-5">
          <p id="tOrderText">Returned</p>
          <p id="tOrderCount">{countReturnedOrder}</p>
          <button
            style={{ color: "black" }}
            id="penBtn"
            type="button"
            class="btn btn-outline-primary "
            onClick={OnClickReturnedOrder}
          >
            Details
          </button>
        </div>
      </div>
      <br />
      <br />

      <div className="PendingOrderEl">
        <table className="table">
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Price</th>
          </tr>

          {pendingProduct.map((item) => (
            <tr>
              <td>{item.Product.ProductId}</td>
              <td>{item.Product.Name}</td>
              <td>{item.Product.Price}</td>
              <th>
                <input
                  type="submit"
                  name="submit"
                  className="btn btn-primary btn-md mx-5"
                  style={{
                    backgroundColor: "#21D192",
                    textDecoration: "none",
                    color: "white",
                  }}
                  value="Accept Order"
                  onClick={AcceptOrder(item.SalesRecordId)}
                />
              </th>
              <th>
                <input
                  type="submit"
                  name="submit"
                  className="btn btn-primary btn-md mx-5"
                  style={{
                    backgroundColor: "#21D192",
                    textDecoration: "none",
                    color: "white",
                  }}
                  value="Reject Order"
                  onClick={RejectOrder(item.SalesRecordId)}
                />
              </th>
            </tr>
          ))}
        </table>
      </div>

      <div className="ProcessingOrderEl">
        <table className="table">
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Price</th>
          </tr>

          {processingProduct.map((item) => (
            <tr>
              <td>{item.Product.ProductId}</td>
              <td>{item.Product.Name}</td>
              <td>{item.Product.Price}</td>
              <th>
                <input
                  type="submit"
                  name="submit"
                  className="btn btn-primary btn-md mx-5"
                  style={{
                    backgroundColor: "#21D192",
                    textDecoration: "none",
                    color: "white",
                  }}
                  value="Deliver"
                  onClick={DeliverOrder(item.SalesRecordId)}
                />
              </th>
            </tr>
          ))}
        </table>
      </div>

      <div className="DeliverOrderOrderEl">
        <table className="table">
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Review</th>
            <th>Rating</th>
          </tr>

          {DeliverProduct.map((item) => (
            <tr>
              <td>{item.ProductId}</td>
              <td>{item.Name}</td>
              <td>{item.Price}</td>

              <td>
                <textarea disabled={true} value={item.Comment} />
              </td>
              <td>
                <StarRatingComponent
                  name="rate"
                  starCount={5}
                  value={item.Ratting}
                />
              </td>
            </tr>
          ))}
        </table>
      </div>

      <div className="ReturnedOrderOrderEl">
        <table className="table">
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Price</th>
          </tr>

          {ReturnedProduct.map((item) => (
            <tr>
              <td>{item.Product.ProductId}</td>
              <td>{item.Product.Name}</td>
              <td>{item.Product.Price}</td>
              <th>
                <input
                  type="submit"
                  name="submit"
                  className="btn btn-primary btn-md mx-5"
                  style={{
                    backgroundColor: "#21D192",
                    textDecoration: "none",
                    color: "white",
                  }}
                  value="Accept"
                  onClick={AcceptReturnOrder(item.SalesRecordId)}
                />
              </th>
              <th>
                <input
                  type="submit"
                  name="submit"
                  className="btn btn-primary btn-md mx-5"
                  style={{
                    backgroundColor: "#21D192",
                    textDecoration: "none",
                    color: "white",
                  }}
                  value="Reject"
                  onClick={RejectReturnOrder(item.SalesRecordId)}
                />
              </th>
            </tr>
          ))}
        </table>
      </div>
    </React.Fragment>
  );
};

export default ShopDashboard;
