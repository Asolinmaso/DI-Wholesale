"use client"

import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer 
      className="text-white relative"
      style={{
        background: "linear-gradient(180deg, #7B00E0 0%, #3A115B 100%)",
       
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
                width={400}
                height={400}
                className="w-24 h-auto sm:w-32 md:w-40 lg:w-[300px]"
              />
            
            </div>
            <p 
              className="font-poppins text-white leading-relaxed text-xs sm:text-sm md:text-base mb-6"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 400,
                lineHeight: '20px',
                color: '#FFFFFF',
              }}
            >
              Reliable supplier of medical instruments, surgical equipment, and pharmaceutical products for hospitals, clinics, and distributors.
            </p>
            
            {/* Follow Us On Section */}
            <div className="mb-6">
              <h3 
                className="font-poppins text-white mb-3 text-sm sm:text-base"
                style={{
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontWeight: 500,
                  color: '#FFFFFF',
                }}
              >
                Follow Us On -
              </h3>
              <div className="flex items-center gap-6">
                {/* Facebook Icon */}
                <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 14 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.33333 15.3333H12.6667L14 10H9.33333V7.33333C9.33333 5.96 9.33333 4.66667 12 4.66667H14V0.186667C13.5653 0.129333 11.924 0 10.1907 0C6.57067 0 4 2.20933 4 6.26667V10H0V15.3333H4V26.6667H9.33333V15.3333Z" fill="#7B00E0"/>
                  </svg>
                </a>
                {/* Instagram Icon */}
                <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.3333 4C23.1014 4 24.7971 4.70238 26.0474 5.95262C27.2976 7.20286 28 8.89856 28 10.6667V21.3333C28 23.1014 27.2976 24.7971 26.0474 26.0474C24.7971 27.2976 23.1014 28 21.3333 28H10.6667C8.89856 28 7.20286 27.2976 5.95262 26.0474C4.70238 24.7971 4 23.1014 4 21.3333V10.6667C4 8.89856 4.70238 7.20286 5.95262 5.95262C7.20286 4.70238 8.89856 4 10.6667 4H21.3333ZM16 10.6667C14.5855 10.6667 13.229 11.2286 12.2288 12.2288C11.2286 13.229 10.6667 14.5855 10.6667 16C10.6667 17.4145 11.2286 18.771 12.2288 19.7712C13.229 20.7714 14.5855 21.3333 16 21.3333C17.4145 21.3333 18.771 20.7714 19.7712 19.7712C20.7714 18.771 21.3333 17.4145 21.3333 16C21.3333 14.5855 20.7714 13.229 19.7712 12.2288C18.771 11.2286 17.4145 10.6667 16 10.6667ZM16 13.3333C16.7072 13.3333 17.3855 13.6143 17.8856 14.1144C18.3857 14.6145 18.6667 15.2928 18.6667 16C18.6667 16.7072 18.3857 17.3855 17.8856 17.8856C17.3855 18.3857 16.7072 18.6667 16 18.6667C15.2928 18.6667 14.6145 18.3857 14.1144 17.8856C13.6143 17.3855 13.3333 16.7072 13.3333 16C13.3333 15.2928 13.6143 14.6145 14.1144 14.1144C14.6145 13.6143 15.2928 13.3333 16 13.3333ZM22 8.66667C21.6464 8.66667 21.3072 8.80714 21.0572 9.05719C20.8071 9.30724 20.6667 9.64638 20.6667 10C20.6667 10.3536 20.8071 10.6928 21.0572 10.9428C21.3072 11.1929 21.6464 11.3333 22 11.3333C22.3536 11.3333 22.6928 11.1929 22.9428 10.9428C23.1929 10.6928 23.3333 10.3536 23.3333 10C23.3333 9.64638 23.1929 9.30724 22.9428 9.05719C22.6928 8.80714 22.3536 8.66667 22 8.66667Z" fill="#7B00E0"/>
                  </svg>
                </a>
                {/* LinkedIn Icon */}
                <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.83333 0C2.08189 0 1.36122 0.298511 0.829864 0.829864C0.298511 1.36122 0 2.08189 0 2.83333C0 3.58478 0.298511 4.30545 0.829864 4.8368C1.36122 5.36816 2.08189 5.66667 2.83333 5.66667C3.58478 5.66667 4.30545 5.36816 4.8368 4.8368C5.36816 4.30545 5.66667 3.58478 5.66667 2.83333C5.66667 2.08189 5.36816 1.36122 4.8368 0.829864C4.30545 0.298511 3.58478 0 2.83333 0ZM0.166667 8C0.122464 8 0.0800715 8.01756 0.0488154 8.04881C0.0175593 8.08007 0 8.12246 0 8.16667V25.5C0 25.592 0.0746667 25.6667 0.166667 25.6667H5.5C5.5442 25.6667 5.5866 25.6491 5.61785 25.6178C5.64911 25.5866 5.66667 25.5442 5.66667 25.5V8.16667C5.66667 8.12246 5.64911 8.08007 5.61785 8.04881C5.5866 8.01756 5.5442 8 5.5 8H0.166667ZM8.83333 8C8.78913 8 8.74674 8.01756 8.71548 8.04881C8.68423 8.08007 8.66667 8.12246 8.66667 8.16667V25.5C8.66667 25.592 8.74133 25.6667 8.83333 25.6667H14.1667C14.2109 25.6667 14.2533 25.6491 14.2845 25.6178C14.3158 25.5866 14.3333 25.5442 14.3333 25.5V16.1667C14.3333 15.5036 14.5967 14.8677 15.0656 14.3989C15.5344 13.9301 16.1703 13.6667 16.8333 13.6667C17.4964 13.6667 18.1323 13.9301 18.6011 14.3989C19.0699 14.8677 19.3333 15.5036 19.3333 16.1667V25.5C19.3333 25.592 19.408 25.6667 19.5 25.6667H24.8333C24.8775 25.6667 24.9199 25.6491 24.9512 25.6178C24.9824 25.5866 25 25.5442 25 25.5V14.0067C25 10.7707 22.1867 8.24 18.9667 8.532C17.9705 8.62339 16.9947 8.86992 16.0747 9.26267L14.3333 10.0093V8.16667C14.3333 8.12246 14.3158 8.08007 14.2845 8.04881C14.2533 8.01756 14.2109 8 14.1667 8H8.83333Z" fill="#7B00E0"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Our Partners Companies Section */}
            <div className="mt-6">
              <h3 
                className="font-poppins font-medium text-white mb-4 text-sm sm:text-base"
                style={{
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontWeight: 500,
                  color: '#FFFFFF',
                }}
              >
                Our Partners Companies
              </h3>
              <div className="flex flex-wrap items-center gap-4">
                {/* Di Pharma Innovation */}
                <div className="bg-white rounded-lg flex items-center justify-center p-2">
                  <Image
                    src="/partner_companies/Di_Pharma_innovation.png"
                    alt="Di Pharma Innovation"
                    width={120}
                    height={60}
                    className="w-24 h-12 object-contain"
                  />
                </div>

                {/* Indo Continental 7 */}
                <div className="bg-white rounded-lg flex items-center justify-center p-2">
                  <Image
                    src="/partner_companies/Indo.png"
                    alt="Indo Continental 7"
                    width={120}
                    height={60}
                    className="w-24 h-12 object-contain"
                  />
                </div>

                {/* Dr.Will */}
                <div className="bg-white rounded-lg flex items-center justify-center p-2">
                  <Image
                    src="/partner_companies/Dr.will.png"
                    alt="Dr. Will"
                    width={120}
                    height={60}
                    className="w-24 h-12 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Other Sections */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-6">
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

          {/* Category - First Column */}
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
                  Anaesthetic Equipment
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
                  Cannulas and Tubes
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
                  Disposable
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
                  Hospital Furnishing Items
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
                  Licenses
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
                  Medicines
                </a>
              </li>
            </ul>
          </div>

          {/* Category - Second Column */}
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
                  Operation Theatre Instruments
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
                  Orthopaedic Supports and Implants
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
                  Pharmaceuticals
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
                  Surgical & ICU Electronics
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
                  Surgical Instruments
                </a>
              </li>
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
