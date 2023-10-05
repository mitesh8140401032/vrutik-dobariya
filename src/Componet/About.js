import React from 'react'
import Layout from './Layout'

export default function About() {
  return (
    <Layout>
      <div className="container text-center pt-5 " >
        <div className="row d-flex justify-content-center pt-5">
          <div className="col-lg-8 pt-5">
            <h1>About Us</h1>
            <p className=''>Welcome to Decode Softtech - Your Trusted Destination for Cutting-Edge Computers and Technology!
              At Decode Softtech, we're passionate about technology and dedicated to providing you with the latest and greatest in computing solutions. With a team of tech enthusiasts and experts, we're here to transform your digital experience and help you stay ahead in this rapidly evolving world.</p>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8 ">
            <h1>Our Mission</h1>
            <p className=''>Our mission is simple: to empower you with the tools you need to succeed in today's digital landscape. We understand that technology is not just about hardware and software; it's about enabling you to achieve your goals, whether you're a creative professional, a business owner, a student, or someone who simply loves to explore the digital realm.</p>
          </div>

        </div>
      </div>

    </Layout>
  )
}
