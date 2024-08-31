


import React, { createContext, useEffect, useState, useCallback } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 101; index++) { // Adjusted to include 100 + 1
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAllProduct] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [isLoading, setIsLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/allproducts`);
            const data = await response.json();
            setAllProduct(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, []);

    const fetchCartItems = useCallback(async () => {
        if (localStorage.getItem('auth-token')) {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/getcart`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                });
                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await Promise.all([fetchProducts(), fetchCartItems()]);
            setIsLoading(false);
        };

        fetchData();
    }, [fetchProducts, fetchCartItems]);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));

        if (localStorage.getItem('auth-token')) {
            try {
                await fetch(`${import.meta.env.VITE_BASE_URL}/addtocart`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ itemId }),
                });
            } catch (error) {
                console.error("Error adding to cart:", error);
            }
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (localStorage.getItem('auth-token')) {
            try {
                await fetch(`${import.meta.env.VITE_BASE_URL}/removefromcart`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ itemId }),
                });
            } catch (error) {
                console.error("Error removing from cart:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((totalAmount, item) => {
            if (cartItems[item] > 0) {
                const itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
            return totalAmount;
        }, 0);
    };

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((totalItems, count) => {
            if (count > 0) {
                totalItems += count;
            }
            return totalItems;
        }, 0);
    };

    const contextValue = {
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
        isLoading,
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;





































// import React, { createContext, useEffect, useState } from "react";

// export const ShopContext = createContext(null)

//     const getDefaultCart = () => {
//         let cart = {};
//         for(let index=0; index<100+1; index++){
//             cart[index]=0
//         }
//         return cart
//     }

// const ShopContextProvider = (props) => {

//     const [all_product, setAll_Product] = useState([])
//     const [cartItems, setCartItems] = useState(getDefaultCart())

//     useEffect(()=>{
//         fetch(`${import.meta.env.VITE_BASE_URL}/allproducts`)
//         .then((response)=>response.json())
//         .then((data)=>setAll_Product(data))

//         if(localStorage.getItem('auth-token')){
//             fetch( `${import.meta.env.VITE_BASE_URL}/getcart`,{
//                 method:'POST',
//                 headers:{
//                     Accept:'application/form-data',
//                     'auth-token':`${localStorage.getItem('auth-token')}`,
//                     'Content-Type':'application/json'
//                 },
//                 body:""
//             }).then((resp)=>resp.json()).then((data)=>setCartItems(data))
//         }
//     },[])
    

//     const addToCart = (itemId) => {
//         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
//         if(localStorage.getItem('auth-token')){
//             fetch(`${import.meta.env.VITE_BASE_URL}/addtocart`,{
//                 method:'POST',
//                 headers:{
//                     Accept:'application/form-data',
//                     'auth-token':`${localStorage.getItem('auth-token')}`,
//                     'Content-Type':'application/json',
//                 },
//                 body:JSON.stringify({"itemId":itemId}), 
//             })
//             .then((resp)=>resp.json())
//             .then((data)=>console.log("addcart",data))
//         }
//     }

//     const removeFromCart = (itemId) => {
//         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
//         if(localStorage.getItem('auth-token')){
//             fetch(`${import.meta.env.VITE_BASE_URL}/removefromcart`,{
//                 method:'POST',
//                 headers:{
//                     Accept:'application/form-data',
//                     'auth-token':`${localStorage.getItem('auth-token')}`,
//                     'Content-Type':'application/json',
//                 },
//                 body:JSON.stringify({"itemId":itemId}), 
//             })
//             .then((resp)=>resp.json())
//             .then((data)=>console.log(data))
//         }
//     }

//     const getTotalCartAmount = () => {
//         let totalAmount = 0;
//         for(const item in cartItems){
//             if(cartItems[item]>0){
//                 let iteminfo = all_product.find((product)=>product.id===Number(item))
//                 totalAmount += iteminfo.new_price * cartItems[item]
//             }
//         }
//         return totalAmount
//     }

//     const getTotalCartItems = () =>{
//         let totalItem = 0;
//         for(const item in cartItems){
//             if(cartItems[item]>0){
//                 totalItem += cartItems[item]
//             }

//         }
//         return totalItem
//     }

//     const contextValue = {all_product,cartItems,addToCart,removeFromCart, getTotalCartAmount, getTotalCartItems}

//     return(
//         <ShopContext.Provider value={contextValue} >
//             {props.children}
//         </ShopContext.Provider>
//     )
// }

// export default ShopContextProvider