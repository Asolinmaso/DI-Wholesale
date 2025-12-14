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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-6">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="DI Wholesale Logo"
                width={150}
                height={150}
                className=""
              />
            
            </div>
            <p 
              className="font-poppins text-white leading-relaxed"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#FFFFFF',
              }}
            >
              Reliable supplier of medical instruments, surgical equipment, and pharmaceutical products for hospitals, clinics, and distributors.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-8">
            <h3 
              className="font-poppins font-medium text-white"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 500,
                fontSize: '24px',
                lineHeight: '36px',
                color: '#FFFFFF',
              }}
            >
              Quick Links
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a 
                  href="#about" 
                  className="font-poppins text-white hover:text-white/80 transition-colors"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#FFFFFF',
                  }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#product" 
                  className="font-poppins text-white hover:text-white/80 transition-colors"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#FFFFFF',
                  }}
                >
                  Products
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="font-poppins text-white hover:text-white/80 transition-colors"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#FFFFFF',
                  }}
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  className="font-poppins text-white hover:text-white/80 transition-colors"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#FFFFFF',
                  }}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-8">
            <h3 
              className="font-poppins font-medium text-white"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 500,
                fontSize: '24px',
                lineHeight: '36px',
                color: '#FFFFFF',
              }}
            >
              Category
            </h3>
            <ul className="flex flex-col gap-4">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <li key={num}>
                  <a 
                    href="#" 
                    className="font-poppins text-white hover:text-white/80 transition-colors text-center"
                    style={{
                      fontFamily: 'var(--font-poppins), sans-serif',
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '24px',
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
          <div className="flex flex-col gap-8">
            <h3 
              className="font-poppins font-medium text-white"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 500,
                fontSize: '24px',
                lineHeight: '36px',
                color: '#FFFFFF',
              }}
            >
              Legal
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a 
                  href="#" 
                  className="font-poppins text-white hover:text-white/80 transition-colors"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#FFFFFF',
                  }}
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-poppins text-white hover:text-white/80 transition-colors"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#FFFFFF',
                  }}
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-poppins text-white hover:text-white/80 transition-colors"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#FFFFFF',
                  }}
                >
                  Declaimer
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-poppins text-white hover:text-white/80 transition-colors"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#FFFFFF',
                  }}
                >
                  Compliance & Regulations
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-poppins text-white hover:text-white/80 transition-colors"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#FFFFFF',
                  }}
                >
                  Licenses & Certifications
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="font-poppins text-white hover:text-white/80 transition-colors"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#FFFFFF',
                  }}
                >
                  Partnership & Collaboration
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-8">
            <h3 
              className="font-poppins font-medium text-white"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 500,
                fontSize: '24px',
                lineHeight: '36px',
                color: '#FFFFFF',
              }}
            >
              Contact
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-white" />
                <span 
                  className="font-poppins text-white"
                  style={{
                    fontFamily: 'var(--font-poppins), sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
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
                    fontSize: '16px',
                    lineHeight: '24px',
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
                    fontSize: '16px',
                    lineHeight: '24px',
                    color: '#FFFFFF',
                  }}
                >
                  Chennai, Tamilnadu
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Partner Companies Section - Left Aligned */}
        <div className="mt-12 md:mt-16">
          <div className="flex flex-col gap-6">
            <h3 
              className="font-poppins font-medium text-white"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 500,
                fontSize: '24px',
                lineHeight: '36px',
                color: '#FFFFFF',
              }}
            >
              Our Partners Companies
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              {/* Di Pharma Innovation */}
              <div 
                className="bg-white rounded-xl flex items-center gap-1 p-3"
                style={{
                  borderRadius: '12px',
                  padding: '12px',
                  gap: '4px',
                }}
              >
                <Image
                  src="/partner_companies/Di_Pharma_innovation.png"
                  alt="Di Pharma Innovation"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              
              </div>

              {/* Indo Continental 7 - Placeholder if image not available */}
              <div 
                className="bg-white rounded-xl flex items-center gap-1 p-3"
                style={{
                  borderRadius: '12px',
                  padding: '12px',
                  gap: '4px',
                }}
              >
                <div 
                  className="w-10 h-10 flex items-center justify-center"
                  style={{
                    width: '40px',
                    height: '40px',
                  }}
                >
                  {/* Placeholder for Indo Continental logo - you can replace with actual image */}
                  <div className="w-full h-full bg-gray-300 rounded"></div>
                </div>
              
              </div>

              {/* Dr.Will */}
              <div 
                className="bg-white rounded-xl flex items-center gap-3 p-3"
                style={{
                  borderRadius: '12px',
                  padding: '12px',
                  gap: '12px',
                }}
              >
                <Image
                  src="/partner_companies/Dr.will.png"
                  alt="Dr. Will"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
               
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white py-4 mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p 
            className="text-center font-poppins text-white"
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '40px',
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
