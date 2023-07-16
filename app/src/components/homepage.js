import React from 'react';
import './styles/homepage.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function HomeComponent({account, contractInstance}){

    return (
        <div className="container">
            <div className="header">
                <h2>Vote Me</h2>
            </div>
            <div className = "nav-bar home-page">
                <ul>
                    <li className="nav-li home">Home</li>
                    <li className="nav-li">Election</li>
                    
                </ul>
            </div>
            <div className="main-content">
                <div className="info">
                    <h2>Info</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, asperiores obcaecati. Ipsum libero officiis repellat voluptatem beatae id explicabo, autem debitis atque, sed, maiores maxime quos. Placeat nulla assumenda voluptatum.</p>
                    <br />
                    <br />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, dicta excepturi? Numquam iste illum vel possimus, voluptatum debitis nemo doloremque.</p>

                </div>
            </div>
        </div>  
    );
}

export default HomeComponent;