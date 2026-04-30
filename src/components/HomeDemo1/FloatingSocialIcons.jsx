"use client";
import Link from 'next/link';

export default function FloatingSocialIcons() {
  return (
    <div className="floating-social-icons">
      <Link href="https://www.linkedin.com/company/talentracker-limited/" target="_blank" className="floating-social-icons__link" aria-label="LinkedIn">
        <i className="ri-linkedin-fill"></i>
      </Link>
      <Link href="https://www.facebook.com/talentracker/" target="_blank" className="floating-social-icons__link" aria-label="Facebook">
        <i className="ri-facebook-fill"></i>
      </Link>
      <Link href="https://www.instagram.com/talen_tracker?igsh=NXN2NWY3d2E1a3B4" target="_blank" className="floating-social-icons__link" aria-label="Instagram">
        <i className="ri-instagram-fill"></i>
      </Link>
    </div>
  );
}
