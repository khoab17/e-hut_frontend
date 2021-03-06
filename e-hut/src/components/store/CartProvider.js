import { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
    items : [],
    numberOfShops:0,
    totalAmount: 0,
}

const cartReducer = (state,action) =>{
    if(action.type === 'ADD'){
        const existingItemIndex = state.items.findIndex( 
            (item) => item.id === action.item.id
            )

        const existingItem = state.items[existingItemIndex]
        
        
        let updatedItems;
        

        if(existingItem){
           
           const updatedItem ={
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem
        }
        else{
            
            updatedItems = state.items.concat(action.item)
        }
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
         

        return {
            items: updatedItems,
            numberOfShops: state.numberOfShops,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'REMOVE'){
        const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        )
        const existingItem = state.items[existingItemIndex]
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;
        if(existingItem.amount === 1){
            updatedItems = state.items.filter( item => item.id !== action.id);

        }
        else{
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1}
            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updatedItem
        }
        return{
            items: updatedItems,
            numberOfShops: state.numberOfShops,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'REMOVEFULLY'){
        const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        )
        const existingItem = state.items[existingItemIndex]
        const updatedTotalAmount = state.totalAmount - existingItem.amount * existingItem.price;
        let updatedItems;
        updatedItems = state.items.filter( item => item.id !== action.id);
        

        return{
            items: updatedItems,
            numberOfShops: state.numberOfShops,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'REMOVESHOPS'){
        let existingItems = state.items;
        
       let selectedItem= existingItems.filter(item => item.id === action.productId)
        //console.log(selectedItem)
        selectedItem[0].shopsId = [action.shopId]
        //console.log(state.items)
        return{
            items: existingItems,
            numberOfShops: state.numberOfShops,
            totalAmount: state.totalAmount
        }
    }

    if(action.type === 'REMOVEEVERYTHING'){
        return{
            items: [],
            numberOfShops:0,
            totalAmount: 0
        }
    }

    if(action.type === 'ADDSHOP'){
        let number = state.numberOfShops + action.num
        //console.log(number)
        return{
            items: state.items,
            numberOfShops: number,
            totalAmount: state.totalAmount
        }
    }
    

    return defaultCartState;
}

const CartProvider = props =>{

    const [cartState, dispatchCartAction]   = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = item =>{
        dispatchCartAction({type: 'ADD', item: item})
    }

    const removeItemFromCartHandler = id =>{
        dispatchCartAction({type: 'REMOVE', id: id})
    }

    const removeItemFullyFromCartHandler = id =>{
        dispatchCartAction({type: 'REMOVEFULLY', id: id})
    }
    const removeShopsHandler = (shopId,productId) =>{
        dispatchCartAction({type: 'REMOVESHOPS', shopId: shopId, productId: productId})
    }

    const removeEverythingHandler = () =>{
        dispatchCartAction({type:'REMOVEEVERYTHING'})
    }
    const addShopHandler = (num) =>{
        dispatchCartAction({type: 'ADDSHOP', num: num})
    }
    
    const cartContext = {
        items: cartState.items,
        numberOfShops: cartState.numberOfShops,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        removeItemFully: removeItemFullyFromCartHandler,
        removeShops: removeShopsHandler,
        removeEverything: removeEverythingHandler,
        addShop: addShopHandler,
       
    }
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;