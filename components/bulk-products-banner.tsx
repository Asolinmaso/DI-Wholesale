"use client"

import { Button } from "@/components/ui/button"

export function BulkProductsBanner() {
  return (
    <section 
      className="w-full h-auto min-h-[300px] sm:min-h-[350px] md:h-[400px] lg:h-[450px] relative overflow-hidden flex items-center justify-center py-12 sm:py-16 md:py-20"
      style={{
        background: "linear-gradient(0deg, rgba(123, 0, 224, 0.77), rgba(123, 0, 224, 0.77)), url(/Need_Medical_products.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 sm:gap-6 md:gap-7 max-w-[784px] mx-auto">
          {/* Heading and Description Container */}
          <div className="flex flex-col items-center sm:items-end gap-3 w-full">
            <h2
              className="font-poppins text-center sm:text-right w-full text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[48px] leading-[28px] sm:leading-[32px] md:leading-[40px] lg:leading-[48px] xl:leading-[72px] text-white"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 600,
                color: '#FFFFFF',
              }}
            >
              Need Medical Products in Bulk?
            </h2>
            <p
              className="font-poppins text-center w-full text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[32px] xl:leading-[36px] text-white"
              style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontWeight: 400,
                color: '#FFFFFF',
              }}
            >
              Browse our extensive catalogue and submit your requirements to receive accurate quotations and reliable fulfilment support.
            </p>
          </div>

          {/* Button */}
          <Button
            className="bg-white text-[#7B00E0] hover:bg-white/90 rounded-lg px-6 sm:px-[18px] py-2.5 sm:py-3 h-auto min-h-[44px] sm:min-h-[50px] md:h-[60px] text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px]"
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontWeight: 500,
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

