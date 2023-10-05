import React from 'react'
import Sidebar from './Sidebar'

export default function LaySidebar(props) {
    return (
        <>
            <Sidebar />{props.children}
        </>
    )
}
