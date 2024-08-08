import React,{useContext, useState,} from 'react'
import "./searchitmCart.css"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';


const SearchItemcart = () => {

    const {all_product} = useContext(ShopContext)
    const navigate = useNavigate();
    const {name} = useParams();
    
    const handelRedirectPage = (e) => {
            navigate(`/product/${e}`);
    }
   
    return (
      <div className="cart-container">
        
        {all_product.map((item) => {
            if(item.name.toLowerCase()===name.toLowerCase())
            return(
          <div key={item.id} className="cart-item" onClick={()=>handelRedirectPage(item.id)}>
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>${item.new_price.toFixed(2)}</p>
              
            </div>
            
          </div>
            )
        })}
      </div>
    );
  };

export default SearchItemcart