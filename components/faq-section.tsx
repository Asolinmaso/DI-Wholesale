"use client"

import { useState } from "react"

const faqData = [
  {
    question: "What products does DI Wholesale supply?",
    answer: "DI Wholesale supplies a wide range of certified medical products including surgical instruments, medical consumables, diagnostic equipment, and healthcare supplies for institutional use.",
  },
  {
    question: "Do you supply products in bulk quantities?",
    answer: "Yes. We specialize in bulk and wholesale supply for hospitals, clinics, distributors, and healthcare organizations.",
  },
  {
    question: "Are your products certified and compliant?",
    answer: "All products meet industry standards and comply with applicable medical regulations such as ISO and CE, where required.",
  },
  {
    question: "How can I place an enquiry or order?",
    answer: "You can browse products, add them to the enquiry cart, and submit your details. Our team will contact you with pricing and availability.",
  },
  {
    question: "Do you offer customized or specific product requirements?",
    answer: "Yes. We can assist with custom specifications, packaging, and quantity requirements based on your needs",
  },
]

// SVG Arrow Icons
const ArrowUp = () => (
  <svg width="25" height="13" viewBox="0 0 25 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.9568 0L25 1.93343L13.8647 12.4643C13.6863 12.6341 13.4741 12.7688 13.2404 12.8607C13.0067 12.9527 12.756 13 12.5029 13C12.2498 13 11.9991 12.9527 11.7654 12.8607C11.5317 12.7688 11.3195 12.6341 11.1411 12.4643L0 1.93343L2.04318 0.00182247L12.5 9.88583L22.9568 0Z" fill="white"/>
  </svg>
)

const ArrowDown = () => (
  <svg width="25" height="13" viewBox="0 0 25 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.04317 13L0 11.0666L11.1353 0.535658C11.3137 0.365905 11.5259 0.231187 11.7596 0.139257C11.9933 0.0473268 12.244 0 12.4971 0C12.7502 0 13.0009 0.0473268 13.2346 0.139257C13.4683 0.231187 13.6805 0.365905 13.8589 0.535658L25 11.0666L22.9568 12.9982L12.5 3.11417L2.04317 13Z" fill="white"/>
  </svg>
)

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col items-center gap-2 mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-4">
          <h2 
            className="font-poppins text-center text-2xl sm:text-3xl md:text-4xl lg:text-[48px] leading-[28px] sm:leading-[36px] md:leading-[48px] lg:leading-[70px]"
            style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontWeight: 600,
            }}
          >
            <span className="">Frequently asked </span>
            <span className="text-[#7B00E0]">questions</span>
          </h2>
          <div 
            className="w-[120px] sm:w-[150px] md:w-[200px]"
            style={{
              border: '2px solid #7B00E0',
            }}
          />
        </div>

        {/* FAQ Items */}
        <div className="max-w-[1063px] mx-auto flex flex-col gap-3 sm:gap-4 px-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="bg-[#EFDBFF] border border-[#908E8E] rounded-[12px] sm:rounded-[16px] md:rounded-[20px] p-4 sm:p-5 md:p-6"
              >
                <div className="flex flex-col gap-3 sm:gap-4">
                  {/* Question Row */}
                  <div className="flex justify-between items-start sm:items-center gap-3 sm:gap-4">
                    <h3
                      className="font-poppins text-base sm:text-lg md:text-xl lg:text-[28px] leading-[24px] sm:leading-[28px] md:leading-[32px] lg:leading-[42px] text-[#1E1E1E] flex-1"
                      style={{
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontWeight: 400,
                        color: '#1E1E1E',
                      }}
                    >
                      {faq.question}
                    </h3>
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex-shrink-0 w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] md:w-[63px] md:h-[63px] bg-[#7B00E0] rounded-full flex items-center justify-center"
                      aria-label={isOpen ? "Close answer" : "Open answer"}
                    >
                      {isOpen ? <ArrowUp /> : <ArrowDown />}
                    </button>
                  </div>

                  {/* Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p
                      className="font-poppins text-sm sm:text-base text-[#1E1E1E] pt-2 sm:pt-3 pb-1"
                      style={{
                        fontFamily: 'var(--font-poppins), sans-serif',
                        fontWeight: 400,
                        lineHeight: '22px',
                        color: '#1E1E1E',
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

