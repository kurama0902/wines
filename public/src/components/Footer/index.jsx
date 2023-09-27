import React from "react";
import { AppStoreSVG } from "../../shared/SVG/AppStoreSVG";

import './footer.css'

export const Footer = () => {
    return (
        <footer className="footer-wrap" id="contacts">
            <div className="footer-links-wrap">
                <div className="footer-links">
                    <div className="links-container">
                        <h4>CATEGORIES</h4>
                        <a href="">Wines</a>
                        <a href="">Latest</a>
                        <a href="">Sale</a>
                        <a href="">Presale</a>
                        <a href="">Best sellers</a>
                        <a href="">Recomendations</a>
                    </div>
                    <div className="links-container">
                        <h4>DISCOVER</h4>
                        <a href="">Discover</a>
                        <a href="">Helpdesk</a>
                        <a href="">FAQ</a>
                        <h4 className="sellers-text">SELLERS</h4>
                        <a href="">To be a seller</a>
                        <a href="">Seller Login</a>
                    </div>
                    <div className="linked-links-container">
                        <div className="links-container">
                            <h4>COMPANY</h4>
                            <a href="">Wines</a>
                            <a href="">Latest</a>
                            <a href="">Sale</a>
                            <a href="">Presale</a>
                            <a href="">Best sellers</a>
                            <a href="">Recomendations</a>
                        </div>
                        <div className="links-container">
                            <h4>CONNECT WITH US</h4>
                            <a href="">Forum</a>
                            <a href="">Facebook</a>
                            <a href="">Instagram</a>
                            <AppStoreSVG />
                        </div> 
                    </div>
                </div>
                <div className="last-footer-container">
                    <div className="f-footer-section">
                        <div className="first-part">
                            <p>© 2022</p>
                            <a href="">User Agreement</a>
                        </div>
                        <div className="second-part">
                            <a href="">Privacy Policy</a>
                            <a href="">Site Map</a>
                        </div>
                    </div>
                    <div className="s-footer-section">
                        <p>English</p>
                        <p>|</p>
                        <p>$USD</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}