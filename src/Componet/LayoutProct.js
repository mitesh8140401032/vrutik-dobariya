import React from 'react'
import ProductHeader from './ProductHeader'
import Footer from './Footer';

export default function LayoutProct(props) {
    return (
        <>
            <ProductHeader />
            {props.children}
            {/* <Footer /> */}
        </>
    )
}
