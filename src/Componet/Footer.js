import React from 'react'
import { Link } from 'react-router-dom'
import Bangalore from '../Image/Bangalore.png'
import Chennai from '../Image/Chennai.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIndianRupeeSign, faPercent, faTruck } from '@fortawesome/free-solid-svg-icons'
export default function Footer() {
  return (
    <footer>
      <div className="container p-5" style={{ overflow: 'hidden' }}>
        <h1 className='text-center mt-2 mb-3'>Contact Information</h1>
        <div className="row">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-2">
                <img src={Chennai} alt="!..." className='img-fluid rounded-circle bg-white' />

              </div>
              <div className="col-lg-10">
                <h5>Chennai</h5>
                <p>Cyber Space Abacus Pvt Ltd
                  <br />
                  E-28 , Ramaniyam Arcade, 5th Floor,
                  <br />
                  16th Cross St, Besant Nagar,
                  <br />
                  Chennai - 600090</p>
                <p>Phone: 044-42110647, 09962302488</p>
                <p>Service: <Link >service@theitdepot.com</Link>  </p>
                <p> Sales: <Link>sales@theitdepot.com</Link></p>
                <p className=''>
                  Working Hours: Monday-Saturday : 10:30am - 6:00pm
                  <br />
                  Sunday: Holiday
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-2">
                <img src={Bangalore} alt="!..." className='img-fluid rounded-circle bg-white' />
              </div>
              <div className="col-lg-10">
                <h5>Bangalore</h5>
                <p>Cyber Space Abacus Pvt Ltd
                  <br />
                  Building No 49, Anantesh Mahal,
                  <br />
                  Wilson Garden, Bangalore,
                  <br />
                  Karnataka - 560027.</p>
                <p>Phone: 09962302488</p>
                <p>Service: <Link>service@theitdepot.com</Link>  </p>
                <p> Sales: <Link>sales@theitdepot.com</Link></p>
                <p className=''>
                  Working Hours: Monday-Saturday : 10:30am - 6:00pm
                  <br />
                  Sunday: Holiday
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container p-5">
        <div className="row text-center ms-2 me-2">
          <hr />
          <div className="col-lg-4">
            <h6 className='d-flex align-items-center'>  <FontAwesomeIcon
              icon={faIndianRupeeSign} className='icon' />
              <span className='ms-2'>
                CASH ON DELIVERY
              </span>
            </h6>
          </div>
          <div className="col-lg-4">
            <h6 className='d-flex align-items-center'>
              <FontAwesomeIcon icon={faPercent} className='icon' />
              <span className='ms-2'>
                GST INVOICE
              </span>
            </h6>
          </div>
          <div className="col-lg-4">
            <h6 className='d-flex align-items-center'>
              <FontAwesomeIcon icon={faTruck} className='icon' />
              <span className='ms-2'>
                FREE SHIPPING
              </span>
            </h6>
          </div>
        </div>
        <hr />
      </div>
      <div className='container'>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-2 ">
            <h5>Others</h5>
            <ul className='p-0'>
              <li><Link className='li'>Testimonals</Link></li>
              <li><Link className='li'>Gift Voucher</Link></li>
              <li><Link className='li'>Returns</Link></li>
              <li><Link className='li'>Advanced Search</Link></li>
              <li><Link className='li'>My Wishlist</Link></li>
            </ul>
          </div>
          <div className="col-lg-2 ">
            <h5>My Account</h5>
            <ul className='p-0'>
              <li><Link className='li'>Address Book</Link></li>
              <li><Link className='li'>Order Track</Link></li>
              <li><Link className='li'>Order History</Link></li>
              <li><Link className='li'>Shopping Cart</Link></li>
              <li><Link className='li'>Change Password</Link></li>
            </ul>
          </div>
          <div className="col-lg-2 ">
            <h5>Useful Links</h5>
            <ul className='p-0'>
              <li><Link className='li'>New Visitors</Link></li>
              <li><Link className='li'>FAQ</Link></li>
              <li><Link className='li'>Quick Guide</Link></li>
              <li><Link className='li'>Terms and Conditions</Link></li>
              <li><Link className='li'>Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="col-lg-2 ">
            <h5>Help & Support</h5>
            <ul className='p-0'>
              <li><Link className='li'>Payment Options / Policy</Link></li>
              <li><Link className='li'>Contact Us</Link></li>
              <li><Link className='li'>About Us</Link></li>
              <li><Link className='li'>Careers</Link></li>
              <li><Link className='li'>Service Centers</Link></li>
            </ul>
          </div>
          <div className="col-lg-3">
            <h5>Subscribe to Updates</h5>
            <div className="row m-0 p-0">
              <div className="col-lg-8 m-0 p-0">
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>
              <div className="col-lg-2 ">
                <button className='btn btn-success '>submit</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer >

  )
}
