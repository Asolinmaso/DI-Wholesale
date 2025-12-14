"use client"

import Image from "next/image"

const partners = [
  {
    name: "Di Pharma Innovation",
    image: "/partner_companies/Di_Pharma_innovation.png",
  },
  {
    name: "Dr. Will",
    image: "/partner_companies/Dr.will.png",
  },
]

export function ClientsPartners() {
  // Duplicate partners array multiple times for seamless scroll
  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners]

  return (
    <section id="clients-partners" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 md:mb-16 flex justify-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            <span className="text-gray-600">Our</span>{" "}
            <span className="text-[#1E1E1E] relative">
              Clients & Partners
              <span
                className="absolute bottom-0 left-0 h-[5px] bg-[#7B00E0]"
                style={{ width: '100%' }}
              />
            </span>
          </h2>
        </div>

        {/* Scrolling Logos Container */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling Animation */}
          <div 
            className="flex animate-scroll w-fit"
            style={{ 
              animation: 'scroll 30s linear infinite',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = 'paused'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = 'running'
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 md:mx-8 flex items-center justify-center w-[200px] h-[120px]"
              >
                <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

