import Link from "next/link";
import Image from "next/image";
import { hover } from "framer-motion";

export default function NotFound() {
  return (
    <>
      <div className="error-area ptb-100">
        <div className="container">
          <div className="error-content">
            <Image
              src="/images/error.png"
              alt="image"
              width={700}
              height={465}
            />
            
            <p>
              The page you are looking for might have been removed had its name
              changed or is temporarily unavailable.
            </p>

            <Link href="/" className="default-btn" >
              Back To Home <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
