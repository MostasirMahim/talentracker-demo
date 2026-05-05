"use client";
import React from 'react';
import Link from 'next/link';

const MainBannerNew = () => {
    return (
        <section className="main-banner-new">
            {/* Background Image with Vintage Overlay (desktop) */}
            <div className="main-banner-new__bg">
                <div className="bg-img"></div>
                <div className="bg-overlay"></div>
            </div>

            {/* Mobile decorative floating orbs */}
            <div className="main-banner-new__orb main-banner-new__orb--top-right"></div>
            <div className="main-banner-new__orb main-banner-new__orb--bottom-left"></div>

            {/* Content Area */}
            <div className="main-banner-new__content-wrapper">
                <div className="container">
                    {/* Small tagline badge */}
                    <span className="main-banner-new__badge">
                        ✦ Your Trusted HR Partner
                    </span>

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

            {/* Vintage shadow bridge between content and image */}
            <div className="main-banner-new__shadow-bridge"></div>

            {/* Mobile Bottom Image (2nd row) */}
            <div className="main-banner-new__mobile-img">
                <img 
                    src="/images/new_m.png" 
                    alt="Hero person" 
                />
            </div>
        </section>
    );
};

export default MainBannerNew;
