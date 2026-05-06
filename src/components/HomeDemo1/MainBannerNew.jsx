"use client";
import React from 'react';
import Link from 'next/link';

const MainBannerNew = () => {
    return (
        <section className="main-banner-new">
            {/* Desktop Background Image */}
            <div className="main-banner-new__bg">
                <div className="bg-img"></div>
                <div className="bg-overlay"></div>
            </div>

            {/* Mobile Poster Background (image positioned right, gradient overlay left) */}
            <div className="main-banner-new__poster-bg">
                <img src="/images/banner/m1.png" alt="" aria-hidden="true" />
                <div className="poster-overlay"></div>
            </div>

            {/* Mobile decorative floating orbs */}
            <div className="main-banner-new__orb main-banner-new__orb--top-right"></div>
            <div className="main-banner-new__orb main-banner-new__orb--bottom-left"></div>

            {/* Content Area */}
            <div className="main-banner-new__content-wrapper">
                <div className="container">
                    {/* Small tagline badge */}
                    <span className="main-banner-new__badge">
                        ✦Trusted HR Partner
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
        </section>
    );
};

export default MainBannerNew;
