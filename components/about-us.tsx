"use client"

import Image from "next/image"

export function AboutUs() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content Grid - Image Left, Text Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {/* Image on Left */}
          <div className="flex items-start justify-center">
            <div className="relative w-full max-w-[400px] h-[320px] md:h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/AboutUs.png"
                alt="About DI Wholesale"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content on Right */}
          <div className="flex flex-col justify-start h-[320px] md:h-[400px] pt-0">
            <div className="space-y-4 md:space-y-5 flex-1">
              <h2
                className="font-poppins text-[#1E1E1E] text-3xl md:text-4xl lg:text-[48px] leading-[36px] md:leading-[48px] lg:leading-[72px] relative"
                style={{
                  fontFamily: 'var(--font-poppins), sans-serif',
                  fontWeight: 600,
                  color: '#1E1E1E',
                  paddingBottom: '8px',
                }}
              >
                About Us
                <span
                  className="absolute bottom-0 left-0 h-[5px] bg-[#7B00E0]"
                  style={{ width: '25%' }}
                />
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-[1.75] md:leading-[1.85]">
                DI Wholesale is a dedicated medical supply venture committed to providing hospitals, clinics, and healthcare distributors with high-quality medicines, surgical consumables, and advanced hospital furniture. We focus on delivering dependable products that support patient care, safety, and overall healthcare excellence. DI Wholesale is a dedicated medical supply venture committed to providing hospitals, clinics, and healthcare distributors with high-quality medicines, surgical consumables, and advanced hospital furniture. We focus on delivering dependable products that support patient care, safety, and overall healthcare excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

