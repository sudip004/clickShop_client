import React from 'react'
import "./DescriptionBox.css"

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam totam porro consequuntur necessitatibus. Reiciendis dolorum dolorem labore suscipit officia consectetur saepe quibusdam magnam dignissimos ipsam corrupti, repellendus veritatis vero eius iusto possimus quam. Eius dignissimos fugiat minima quia, voluptates, nobis quo perspiciatis alias mollitia totam vitae nisi corrupti enim harum libero sit, quod soluta eum!</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione sed minima dicta sunt necessitatibus, dolores deserunt illo corporis fuga itaque.</p>
        </div>
    </div>
  )
}

export default DescriptionBox