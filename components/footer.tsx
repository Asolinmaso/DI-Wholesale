"use client"

import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer 
      className="text-white relative"
      style={{
        background: "linear-gradient(180deg, #7B00E0 0%, #3A115B 100%)",
        minHeight: "728px",
      }}
    >
      <div className="max-w-screen-2xl mx-auto py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-6 lg:gap-12">
          {/* Company Info - Left Side */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Image
                src="/Logo2.png"
                alt="DI Wholesale Logo"
                width={150}
                height={150}
                className="w-24 h-auto sm:w-32 md:w-40 lg:w-[150px]"
              />
            
            </div>
            <p 
              className="font-poppins text-white leading-relaxed text-xs sm:text-sm md:text-base"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 400,
                lineHeight: '20px',
                color: '#FFFFFF',
              }}
            >
              Reliable supplier of medical instruments, surgical equipment, and pharmaceutical products for hospitals, clinics, and distributors.
            </p>
          </div>

          {/* Right Side - Other Sections */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-6">
            {/* Quick Links */}
            <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
            <h3 
              className="font-poppins font-medium text-white text-base sm:text-lg md:text-xl"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 500,
                lineHeight: '30px',
                color: '#FFFFFF',
              }}
            >
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2 sm:gap-3 md:gap-4">
              <li>
                <a 
                  href="#about" 
                  className="font-poppins text-white hover:text-white/80 transition-colors text-xs sm:text-sm md:text-base"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#product" 
                  className="font-poppins text-white hover:text-white/80 transition-colors text-xs sm:text-sm md:text-base"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  Products
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="font-poppins text-white hover:text-white/80 transition-colors text-xs sm:text-sm md:text-base"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  className="font-poppins text-white hover:text-white/80 transition-colors text-xs sm:text-sm md:text-base"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
            <h3 
              className="font-poppins font-medium text-white text-sm sm:text-base md:text-lg"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 500,
                lineHeight: '30px',
                color: '#FFFFFF',
              }}
            >
              Category
            </h3>
            <ul className="flex flex-col gap-2 sm:gap-3 md:gap-4">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <li key={num}>
                  <a 
                    href="#" 
                    className="font-poppins text-white hover:text-white/80 transition-colors text-center"
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontWeight: 400,
                      fontSize: '12px',
                      lineHeight: '20px',
                      color: '#FFFFFF',
                    }}
                  >
                    Category {num}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
            <h3 
              className="font-poppins font-medium text-white text-sm sm:text-base md:text-lg"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 500,
                lineHeight: '30px',
                color: '#FFFFFF',
              }}
            >
              Legal
            </h3>
            <ul className="flex flex-col gap-2 sm:gap-3 md:gap-4">
              <li>
                <a 
                  href="#" 
                  className="font-poppins text-white hover:text-white/80 transition-colors text-xs sm:text-sm md:text-base"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-poppins text-white hover:text-white/80 transition-colors text-xs sm:text-sm md:text-base"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-poppins text-white hover:text-white/80 transition-colors text-xs sm:text-sm md:text-base"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  Declaimer
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-poppins text-white hover:text-white/80 transition-colors text-xs sm:text-sm md:text-base"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  Compliance & Regulations
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-poppins text-white hover:text-white/80 transition-colors text-xs sm:text-sm md:text-base"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  Licenses & Certifications
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-poppins text-white hover:text-white/80 transition-colors text-xs sm:text-sm md:text-base"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    lineHeight: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  Partnership & Collaboration
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4 sm:gap-6 md:gap-8">
            <h3 
              className="font-poppins font-medium text-white text-sm sm:text-base md:text-lg"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 500,
                lineHeight: '30px',
                color: '#FFFFFF',
              }}
            >
              Contact
            </h3>
            <ul className="flex flex-col gap-2 sm:gap-3 md:gap-4">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-white" />
                <span 
                  className="font-poppins text-white"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  +91 - 0000000000
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-white" />
                <span 
                  className="font-poppins text-white"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  info@diwholesale.com
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-white" />
                <span 
                  className="font-poppins text-white"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '20px',
                    color: '#FFFFFF',
                  }}
                >
                  Chennai, Tamilnadu
                </span>
              </li>
            </ul>
          </div>
          </div>
        </div>

        {/* Partner Companies Section - Left Aligned */}
        <div className="mt-12 md:mt-16">
          <div className="flex flex-col gap-6">
            <h3 
              className="font-poppins font-medium text-white text-sm sm:text-base md:text-lg"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 500,
                lineHeight: '30px',
                color: '#FFFFFF',
              }}
            >
              Our Partners Companies
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              {/* Di Pharma Innovation */}
              <div 
                className="bg-white rounded-xl flex items-center gap-1"
               
              >
                <Image
                  src="/partner_companies/Di_Pharma_innovation.png"
                  alt="Di Pharma Innovation"
                  width={80}
                  height={80}
                  className="w-24 h-12 object-contain"
                />
              
              </div>

              {/* Indo Continental 7 - Placeholder if image not available */}
              <div 
                className="bg-white rounded-xl flex items-center gap-1"
               
              >
                <div 
                  className=" flex items-center justify-center"
                 
                >
                 <Image
                  src="/partner_companies/Indo.png"
                  alt="Indo Continental 7"
                  width={80}
                  height={60}
                  className="w-24 h-12 object-contain"
                />
                </div>
              
              </div>

              {/* Dr.Will */}
              <div 
                className="bg-white rounded-xl flex items-center gap-3"

              >
                <Image
                  src="/partner_companies/Dr.will.png"
                  alt="Dr. Will"
                    width={80}
                    height={80}
                  className="w-24 h-12 object-contain"
                />
               
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white py-4 mt-8">
        <div className="max-w-screen-2xl mx-auto">
          <p 
            className="text-center font-poppins text-white"
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '24px',
              color: '#FFFFFF',
            }}
          >
            © 2025 DI Wholesale. All rights reserved. | Designed & Developed By Manvian
          </p>
        </div>
      </div>
    </footer>
  )
}
