import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/favorites">Favoritos</Link>
                    </li>
                </ul>
            </nav>
            <Outlet /> {}
        </>
    );
};

export default Root;