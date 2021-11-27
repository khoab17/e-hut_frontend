import React from "react";
import { Route, Switch } from "react-router-dom";
import DeliverymenSignUp from "./components/Deliverymen/deliverymenSignUp";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import AddProduct from "./components/Product/AddProduct";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import ShopSignUp from "./components/Shops/shopSignUp";
import SignUp from "./components/SignUp/SignUp";

function App() {
	return (
		<React.Fragment>
			<Header />
			<Switch>
				<Route exact path="/" component={Products} />
				<Route exact path="/signup" component={SignUp} />
				<Route path="/signup/shop" component={ShopSignUp} />
				<Route path="/login" component={Login} />
				<Route path="/products/:id" component={ProductDetails} exact />
				<Route path="/product/add" component={AddProduct} />
				<Route path="/signup/deliverymen" component={DeliverymenSignUp} />
			</Switch>
			<Footer />
		</React.Fragment>
	);
}

export default App;
