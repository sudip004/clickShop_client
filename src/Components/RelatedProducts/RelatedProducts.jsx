import React,{useContext} from 'react'
import "./RelatedProducts.css"
import data_product from "../Assets/data"
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext'

const RelatedProducts = ({product}) => {
  const {all_product} = useContext(ShopContext)
  let count = 0;
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {all_product.map((item,i)=>{
                if(product.category === item.category && product.id !== item.id && count < 4){
                    count++;
                  return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                }

            })}
        </div>
    </div>
  )
}

export default RelatedProducts