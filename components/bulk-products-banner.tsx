"use client"

import { Button } from "@/components/ui/button"

export function BulkProductsBanner() {
  return (
    <section 
      className="w-full h-[353px] relative overflow-hidden flex items-center justify-center"
      style={{
        background: "linear-gradient(0deg, rgba(123, 0, 224, 0.77), rgba(123, 0, 224, 0.77)), url(/Need_Medical_products.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-7 max-w-[784px] mx-auto">
          {/* Heading and Description Container */}
          <div className="flex flex-col items-end gap-3 w-full">
            <h2
              className="font-poppins text-right w-full text-3xl md:text-4xl lg:text-[48px] leading-[36px] md:leading-[48px] lg:leading-[72px] text-white"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 600,
                fontSize: '48px',
                lineHeight: '72px',
                color: '#FFFFFF',
                textAlign: 'right',
              }}
            >
              Need Medical Products in Bulk?
            </h2>
            <p
              className="font-poppins text-center w-full text-lg md:text-xl lg:text-[24px] leading-[27px] md:leading-[32px] lg:leading-[36px] text-white"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '36px',
                color: '#FFFFFF',
                textAlign: 'center',
              }}
            >
              Browse our extensive catalogue and submit your requirements to receive accurate quotations and reliable fulfilment support.
            </p>
          </div>

          {/* Button */}
          <Button
            className="bg-white text-[#7B00E0] hover:bg-white/90 rounded-lg px-[18px] py-3 h-[60px]"
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontWeight: 500,
              fontSize: '24px',
              lineHeight: '36px',
              color: '#7B00E0',
            }}
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  )
}

