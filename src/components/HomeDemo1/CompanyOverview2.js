import React from "react";

const CompanyOverview2 = () => {
  return (
    <div className="py-5" style={{
      // backgroundcolor: sky and navy blue 1000
      background: 'linear-gradient(135deg, rgb(20, 137, 188) 0%, rgb(30,27,75) 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container">
        <div className="row g-0 align-items-stretch">
          {/* Content Card */}
          <div className="col-lg-10 col-xl-8 mx-auto">
            <div className="card border-0 shadow-lg" style={{
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="card-body p-0">
                <div className="row g-0">
                  {/* Left Side - Decorative Panel */}
                  <div className="col-md-5 d-none d-md-block" style={{
                    background: 'linear-gradient(135deg, rgb(20, 137, 188) 0%, rgb(30,27,75) 100%)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '3rem'
                    }}>
                      <div style={{
                        width: '120px',
                        height: '120px',
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '2rem',
                        border: '3px solid rgba(255,255,255,0.3)'
                      }}>
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                      </div>
                      <h3 className="text-white text-center fw-bold mb-3" style={{fontSize: '1.5rem'}}>
                        Building Tomorrow's Workforce
                      </h3>
                      <p className="text-white text-center" style={{opacity: 0.9, lineHeight: '1.6'}}>
                        Strategic HR solutions that transform businesses through exceptional talent acquisition and management.
                      </p>
                    </div>
                  </div>

                  {/* Right Side - Content */}
                  <div className="col-md-7">
                    <div className="p-4 p-lg-5" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      minHeight: '100%'
                    }}>
                      {/* Badge */}
                      <div className="mb-4">
                        <span className="badge px-3 py-2" style={{
                          background: 'linear-gradient(135deg, rgb(20, 137, 188) 0%, rgb(30,27,75) 100%)',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          letterSpacing: '1px',
                          borderRadius: '20px'
                        }}>
                          COMPANY OVERVIEW
                        </span>
                      </div>

                      {/* Title Section */}
                      <div className="mb-4">
                        <h2 className="mb-2" style={{
                          fontSize: '2rem',
                          fontWeight: '700',
                          color: '#1a202c',
                          lineHeight: '1.2'
                        }}>
                          TalenTracker Limited
                        </h2>
                        <h4 style={{
                          fontSize: '1.1rem',
                          fontWeight: '600',
                          color: 'rgb(20, 137, 188)',
                          letterSpacing: '0.5px',
                          marginBottom: '1.5rem'
                        }}>
                          RIGHT PEOPLE, RIGHT FIT
                        </h4>
                      </div>

                      {/* Description */}
                      <p style={{
                        fontSize: '1rem',
                        lineHeight: '1.8',
                        color: '#4a5568',
                        marginBottom: '2rem',
                        textAlign: 'justify'
                      }}>
                        TalenTracker is a strategic HR and talent solutions partner helping organizations hire smarter, operate compliantly, and build high-performing teams. We deliver end-to-end workforce solutions including Executive Search, RPO, Payroll, EOR/PEO, and HR Consultancy for both local and multinational businesses.
                      </p>

                      {/* Features Grid */}
                      <div className="row g-3 mb-4">
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <div style={{
                              width: '40px',
                              height: '40px',
                              background: '#f7fafc',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: '0.75rem'
                            }}>
                                                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(20, 137, 188)" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                            <span style={{fontSize: '0.9rem', color: '#4a5568', fontWeight: '500'}}>Executive Search</span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <div style={{
                              width: '40px',
                              height: '40px',
                              background: '#f7fafc',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: '0.75rem'
                            }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                            <span style={{fontSize: '0.9rem', color: '#4a5568', fontWeight: '500'}}>RPO Solutions</span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <div style={{
                              width: '40px',
                              height: '40px',
                              background: '#f7fafc',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: '0.75rem'
                            }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                            <span style={{fontSize: '0.9rem', color: '#4a5568', fontWeight: '500'}}>EOR/PEO</span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="d-flex align-items-center">
                            <div style={{
                              width: '40px',
                              height: '40px',
                              background: '#f7fafc',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: '0.75rem'
                            }}>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#667eea" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </div>
                            <span style={{fontSize: '0.9rem', color: '#4a5568', fontWeight: '500'}}>HR Consultancy</span>
                          </div>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div>
                        <a href="/about-us/" className="btn btn-lg px-4 py-3" style={{
                          background: 'linear-gradient(135deg, rgb(20, 137, 188) 0%, rgb(30,27,75) 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontWeight: '600',
                          fontSize: '1rem',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 15px rgba(20, 137, 188, 0.4)'
                        }}>
                          ABOUT US
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview2;