import React from 'react'
import Layout from './Layout'
import { Link } from 'react-router-dom'

export default function Blog() {
  const productdata = [
    {
      id: 1,
      compay_name: "Laptop",
      price: "15000",
      type: "computer",
      img: 'https://source.unsplash.com/user/c_v_r/100x100'
    },
    {
      id: 2,
      compay_name: "Laptop",
      price: "5500",
      type: "computer",
      img: 'https://source.unsplash.com/user/c_v_r/100x100'
    },
    {
      id: 3,
      compay_name: "Laptop",
      price: "15000",
      type: "computer",
      img: 'https://source.unsplash.com/user/c_v_r/100x100'
    },
    {
      id: 4,
      compay_name: "Laptop",
      price: "15000",
      type: "computer",
      img: 'https://source.unsplash.com/user/c_v_r/100x100'
    },
    {
      id: 5,
      compay_name: "Laptop",
      price: "1000",
      type: "laptop",
      img: 'https://source.unsplash.com/user/c_v_r/100x100'
    },
    {
      id: 6,
      compay_name: "Laptop",
      price: "2000",
      type: "laptop",
      img: 'https://source.unsplash.com/user/c_v_r/100x100'
    }, {
      id: 7,
      compay_name: "Laptop",
      price: "3000",
      type: "laptop",
      img: 'https://source.unsplash.com/user/c_v_r/100x100'
    }
  ]
  return (
    <Layout>
      <div className="container p-5">
        <div className="row d-flex justify-content-center pt-5">
          {productdata.map(product => (
            <div key={product.id} className="col-lg-3 col-md-6 col-sm-12 mt-4">
              <div class="card">
                <img src={product.img} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">{product.compay_name}</h5>
                  <p class="card-text">${product.price}</p>
                  <Link className="btn btn-primary">Go somewhere</Link>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </Layout>
  )
}
