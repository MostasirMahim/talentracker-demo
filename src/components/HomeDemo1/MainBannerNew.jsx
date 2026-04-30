"use client";
import React from 'react';
import Link from 'next/link';

const MainBannerNew = () => {
    return (
        <section className="main-banner-new">
            {/* Mobile Texture Background */}
            <div className="main-banner-new__mobile-texture"></div>

            {/* Desktop Background Image */}
            <div className="main-banner-new__desktop-bg">
                <div 
                    className="bg-img"
                    style={{ backgroundImage: "url('/images/new_banner_resized.png')" }}
                ></div>
            </div>

            {/* Content Area */}
            <div className="main-banner-new__content-wrapper">
                <div className="container">
                    {/* Title */}
                    <h1 className="main-banner-new__title">
                        Right People,<br/>
                        Right Fit
                    </h1>
                    
                    {/* Subtitle */}
                    <h2 className="main-banner-new__subtitle">
                        Elevate Your Business with Our<br/>
                        Tailored <span className="highlight-color">HR Solutions</span>
                    </h2>
                    
                    {/* Buttons */}
                    <div className="main-banner-new__buttons">
                        <Link href="/contact" className="btn-solid">
                            Hire Now
                        </Link>
                        <Link href="/career" className="btn-gradient-outline">
                            Find Your Job
                        </Link>
                    </div>
                </div>
            </div>

            {/* Animated floating orb for mobile */}
            <div className="main-banner-new__mobile-orb"></div>

            {/* Mobile Bottom Image (2nd row) */}
            <div className="main-banner-new__mobile-img">
                <img 
                    src="/images/new_mobilebg.png" 
                    alt="Hero person" 
                />
            </div>
        </section>
    );
};

export default MainBannerNew;
