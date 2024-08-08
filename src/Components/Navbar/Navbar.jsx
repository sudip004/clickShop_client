import React, { useContext, useRef, useState } from 'react'
import "./Navbar.css"
import logo from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"
import nav_dropdown from "../Assets/dropdown-icon.png"
import { Link ,useNavigate} from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import SearchBox from '../searchBox/SearchBox'


export const Navbar = () => {
    const navigate = useNavigate();
  const [menu,setMenu] = useState("shop")
  const {getTotalCartItems,all_product} = useContext(ShopContext)
  const menuRef = useRef()
  const dropdown_toggle = (e) => {
      menuRef.current.classList.toggle("nav-menu-visible")
      e.target.classList.toggle('open')
  }
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>ClickShop</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}> <Link to='/'> Shop </Link>{menu==="shop"?<hr/>:<></>} </li>
            <li onClick={()=>{setMenu("mens")}}><Link to='/mens'>Men</Link> {menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("women")}}><Link to='/womens'>Women</Link> {menu==="women"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link to='/kids'>Kids</Link> {menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
            {localStorage.getItem('auth-token')? 
            <button onClick={()=>{localStorage.removeItem('auth-token');
            window.location.replace("/")}}>Logout</button> : 
            <Link to="/login"><button>Login</button></Link>
            }
            <Link to="/cart"><img src={cart_icon} alt="" onClick={()=>navigate("/cart")}/></Link>
            
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
        <div className='searchbox'>
            <SearchBox products={all_product}/>
        </div>
    </div>
  )
}
