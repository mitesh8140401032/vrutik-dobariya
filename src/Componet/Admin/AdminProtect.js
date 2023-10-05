import React from 'react'
import { Navigate } from 'react-router-dom';

export default function AdminProtect({ children }) {
    const protect = localStorage.getItem('Admin');

    return (
        <div>
            {protect ? <> {children} </> : <> <Navigate to={'/login'} replace /> </>}

        </div>
    )
}
