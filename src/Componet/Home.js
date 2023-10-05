import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import mainimage from '../Image/32318401_7922058.jpg'
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faPercent, faTruck } from '@fortawesome/free-solid-svg-icons';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import sidler5 from '../Image/200_029776.jpg'
import sidler6 from '../Image/200_036966.jpg'
import sidler7 from '../Image/200_040146.jpg'
import sidler8 from '../Image/200_040163.jpg'


import poster from '../Image/banner-amd-home.jpg'
import poster2 from '../Image/banner-intel-home.jpg'
import poster3 from '../Image/fractal_brand_index_box.jpg'
import poster4 from '../Image/banner_combo_offers.jpg'

import combo from '../Image/combo_offer_image_709303.jpg'
import combo2 from '../Image/combo_offer_image_709303.jpg'
import combo3 from '../Image/combo_offer_image_380203.jpg'

import brand from '../Image/brand_page_64d1ed3960022.png'
import brand2 from '../Image/brand_page_64d1eded7262b.png'
import brand3 from '../Image/brand_page_64d1ee8ace53b.png'
import brand4 from '../Image/brand_page_64d1ef4baf7a9.png'
import { Link } from 'react-router-dom';
import Bangalore from '../Image/Bangalore.png'
import Chennai from '../Image/Chennai.png'
import { Card } from 'react-bootstrap';




export default function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,

  };
  const settings2 = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,

  };
  const [bannerImages, setBannerImages] = useState([]);
  const [textslider, setTextslider] = useState([]);
  useEffect(() => {
    const bannerData = JSON.parse(localStorage.getItem("Banner"));
    const text = JSON.parse(localStorage.getItem("Text"))
    if (bannerData) {
      setBannerImages(bannerData);
    }

    if (text) {
      setTextslider(text);
    }
    console.log(text)
  }, [])
  return (
    <Layout >
      <div className="container pt-5">
        <div className="row d-flex justify-content-center align-items-center p-5 pt-0">
          <div className="col-lg-6 p-5 mt-5 text-end Contact ">
            <h1>India's first dedicated online store for computer components.</h1>
          </div>
          <div className="col-lg-6 pt-5">
            <img src={mainimage} alt="!..." className='img-fluid' />
          </div>
        </div>
      </div>
      <div className="container p-5 pt-0">
        <Slider {...settings} className='slick-slider'>
          {bannerImages.map((i) => { // Use the bannerImages state here
            return (
              <div key={i}>
                <img src={i} alt="!..." className='img-fluid' />
              </div>
            )
          })}

        </Slider>

      </div>
      <div className="container p-5 pt-0">
        <Slider {...settings2}>
          {textslider.map((i) => { // Use the bannerImages state here
            return (
              <div key={i} className='text-center'>
                <div style={{ width: '100%', backgroundColor: i.txtbackground, padding: "10px 0px" }}>
                  <h3 style={{ color: i.txtcolor }}>{i.txt}</h3>
                </div>
              </div>
            )
          })}

        </Slider>

      </div>
      <div className="container p-5 pt-0">
        <div className="row ">
          <div className="col-lg-4">

            <Carousel>
              <Carousel.Item interval={1000}>
                <Card>
                  <Card.Img variant="top" src={sidler5} />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>

                      Capacity : 64GB
                      <br />
                      Speed : 4800 MHZ
                      <br />
                      Type : DDR5
                      <br />
                      CAS Latency : 40-39-39
                      <br />
                      Voltage : 1.1V/(12V ext)
                      <br />
                    </Card.Text>


                  </Card.Body>
                </Card>
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <Card >
                  <Card.Img variant="top" src={sidler5} />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>

                      Capacity : 64GB
                      <br />
                      Speed : 4800 MHZ
                      <br />
                      Type : DDR5
                      <br />
                      CAS Latency : 40-39-39
                      <br />
                      Voltage : 1.1V/(12V ext)
                      <br />
                    </Card.Text>


                  </Card.Body>
                </Card>


              </Carousel.Item>
              <Carousel.Item >
                <Card >
                  <Card.Img variant="top" src={sidler5} />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Interface : USB 2.0

                      <br />

                      Color : purple
                      <br />
                      Type : DDR5
                      <br />

                      Maximum dpi : 12800 DPI
                      <br />

                      Scrolling Capability : Scroll wheel
                      <br />

                    </Card.Text>


                  </Card.Body>
                </Card>


              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-lg-8">
            <div className="row">

            </div>
            <div className="row text-center">
              <div className="col-lg-6">
                <img src={sidler5} alt="!.." className='img-fluid' />
                <p>Razer BlackWidow Tournament Edition Chroma V2 Mechanical...</p>

              </div>
              <div className="col-lg-6">
                <img src={sidler6} alt="!.." className='img-fluid' />
                <p>Deepcool FK120-3 IN 1 120mm PWM Fan (R-FK120-BKNPF3-G-1)</p>

              </div>
              <div className="col-lg-6">
                <img src={sidler7} alt="!.." className='img-fluid' />
                <p>Asus TUF Gaming F17 17.3 inch Gaming Laptop...</p>

              </div>
              <div className="col-lg-6">
                <img src={sidler8} alt="!.." className='img-fluid' />
                <p>Razer Leviathan V2 Gaming Speakers (RZ05-03920100-R3G1)</p>

              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="container p-5 pt-0">
        <div className="row ">
          <div className="col-lg-4 mt-3">
            <img src={poster} alt="!..." className='img-fluid' />
          </div>
          <div className="col-lg-4 mt-3">
            <img src={poster2} alt="!..." className='img-fluid' />
          </div>
          <div className="col-lg-4 mt-3">
            <img src={poster3} alt="!..." className='img-fluid' />
          </div>
        </div>
      </div>
      <div className="container p-5 pt-0">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-4">
            <img src={poster4} alt="!.." className='img-fluid' />
          </div>
          <div className="col-lg-8">
            <div className="row  text-center">
              <div className="col-lg-4">
                <img src={combo} alt="!.." className='img-fluid' />
                <p> TVS Electronics Gold Pro Mechanical Keyboard + Dell Laser... </p>

              </div>
              <div className="col-lg-4">
                <img src={combo2} alt="!.." className='img-fluid' />
                <p> TVS Electronics Gold Pro Mechanical Keyboard + Dell Laser... </p>

              </div>
              <div className="col-lg-4">
                <img src={combo3} alt="!.." className='img-fluid' />
                <p> Intel NUC 12 Pro Mini PC NUC12WSHi5+ Crucial 16GB +... </p>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container p-5 pt-0">
        <div className="row">
          <div className="col-lg-3 mt-3">
            <img src={brand} alt="!..." className='img-fluid' />
          </div>
          <div className="col-lg-3 mt-3">
            <img src={brand2} alt="!..." className='img-fluid' />

          </div>
          <div className="col-lg-3 mt-3">
            <img src={brand3} alt="!..." className='img-fluid' />

          </div>
          <div className="col-lg-3 mt-3">
            <img src={brand4} alt="!..." className='img-fluid' />

          </div>
        </div>
      </div>



    </Layout>
  )
}
