import React from 'react'
import Footer from './Footer'

function MaterialCare() {
  return (
    <div>
    <div className='WhyWeDoItContainer'>
      <h3>MATERIAL CARE</h3>
  <hr></hr>
  <p>- Wash in cold water. Avoid/minimize use of washing machine.</p>
  <p>- Dry in shade to preserve design elements and keep vibrant colors in-tact.</p>
  <p>- Avoid fabric softener or bleaching.</p>
  <p>- Wash dark-colored apparel separately from colored garments.</p>
  <p>- Avoid leaving to soak or in rolled-up wet situations.</p>
  <p>- Do not: dry clean, iron, spin, or tumble dry</p>
  
  {/* <img className='HowWeWorkimg' src='https://i.pinimg.com/1200x/a1/fb/47/a1fb47633a85ccc9e2d3c0a3a01a163f.jpg'/> */}
    </div>
    <Footer className='footerbottom'/>
  </div>
  )
}

export default MaterialCare