import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import CartContext from "../store/cart-context";
const ShopList = (props) => {
	const [shops, setShops] = useState([]);
	const [clicked, setClicked] = useState("Select");
	var data = JSON.parse(localStorage.getItem("user"));
	var cred = data.Phone + ":" + data.Password;

	const cartCtx = useContext(CartContext);
	const [select, setSelect] = useState(false);

	useEffect(() => {
		const getShop = async () => {
			await axios
				.get("https://localhost:44390/api/Shops", {
					headers: {
						Authorization: "Basic " + btoa(cred),
					},
				})
				.then((response) => {
					let arr = response.data;
					// console.log('arr: ',arr)
					setShops(arr);
				})
				.catch((err) => {
					//  console.log('Hi')
					console.log(err);
				});
		};
		getShop();
	}, []);

	//console.log(shops)
	const shop = shops.filter((item) => item.ShopId === props.shopID);
	//console.log(shop)
	let userID = JSON.parse(localStorage.getItem("user"));

	//console.log(userID.UserId)
	const selectShopHandler = () => {
		props.selectedShop({
			customerId: userID.UserId,
			shopId: props.shopID,
			discountId: 1,
			products: [
				{
					ProductId: props.productId,
					Price: props.productPrice,
					Quantity: props.productAmount,
				},
			],
		});

		//console.log(cartCtx.numberOfShops)
		setClicked("Selected");

		setSelect(true);

		// console.log('shopList',cartCtx.items)
		cartCtx.removeShops(props.shopID, props.productId);
	};

	useEffect(() => {
		if (clicked === "Selected") {
			props.counter(1);
		}
	}, [clicked]);

	return (
		<Card className="m-2" style={{ width: "12rem", position: "relative" }}>
			<Card.Body>
				{shop.length !== 0 && <Card.Title>{shop[0].Name}</Card.Title>}
				{/*<Card.Img variant='top'  src={shopImage} height='60' width='40'/> */}
				<Card.Text>
					Product: <h6>{props.product}</h6>
				</Card.Text>
				<Button
					variant="primary"
					className="btn-sm"
					onClick={selectShopHandler}
					disabled={select ? true : false}
				>
					{clicked}
				</Button>
			</Card.Body>
		</Card>
	);
};

export default ShopList;
