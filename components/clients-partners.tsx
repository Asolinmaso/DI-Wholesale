"use client"

import Image from "next/image"

const partners = [
  {
    name: "Alkem",
    image: "/our_clients/Alkem.png",
  },
  {
    name: "Cipla",
    image: "/our_clients/Cipla.png",
  },
  {
    name: "Cipla Vista",
    image: "/our_clients/CiplaVista.png",
  },
  {
    name: "Dr. Reddy's",
    image: "/our_clients/Dr.Reddys.png",
  },
  {
    name: "Labaxy",
    image: "/our_clients/Labaxy.png",
  },
  {
    name: "Sun Pharma",
    image: "/our_clients/Sun_Pharma.png",
  },
]

export function ClientsPartners() {
  // Duplicate partners array multiple times for seamless scroll
  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners]

  return (
    <section id="clients-partners" className="py-16 md:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16 flex justify-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            <span className="">Our</span>{" "}
            <span className="text-[#7B00E0] relative">
              Clients
              <span className="text-[#1E1E1E]"> & </span>
              Partners
              <span
                className="absolute bottom-[-9px] sm:bottom-[-14px] left-[20%] h-[3px] sm:h-[4px] md:h-[5px] bg-[#7B00E0]"
                style={{ width: '40%' }}
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
                className="flex-shrink-0 mx-3 sm:mx-4 md:mx-6 lg:mx-8 flex items-center justify-center w-[150px] h-[90px] sm:w-[180px] sm:h-[110px] md:w-[200px] md:h-[120px]"
              >
                <div className="relative w-full h-full transition-all duration-300">
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

