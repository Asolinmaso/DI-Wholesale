"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    contact: "",
    email: "",
    location: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          {/* Left Side - Contact Info */}
          <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-16">
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-semibold leading-[28px] sm:leading-[36px] md:leading-[48px] lg:leading-[72px]">
                  <span className="relative">
                    Contact
                    <span
                      className="absolute bottom-0 left-0 h-[3px] sm:h-[4px] md:h-[5px] bg-[#7B00E0]"
                      style={{ width: '100px', maxWidth: '145px' }}
                    />
                  </span>{" "}
                  <span className="text-[#7B00E0]">Us</span>
                </h2>
              </div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[32px] xl:leading-[36px] text-black font-normal">
                Have questions or need assistance with medical products? Get in touch with our team to discuss your requirements, request quotations, or learn more about our offerings.
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-[24px] leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[32px] xl:leading-[36px] text-black font-normal">
                Fill out the form and our team will get in touch with you shortly.
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[559px] bg-white border border-[#D9D9D9] rounded-2xl shadow-[0px_0px_24px_rgba(123,0,224,0.25)] p-4 sm:p-5 md:p-6">
              <h3 className="text-center text-lg sm:text-xl md:text-[24px] font-semibold leading-[28px] sm:leading-[32px] md:leading-[36px] text-[#7B00E0] mb-4 sm:mb-5 md:mb-6">
                Enquiry Form
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                {/* Name Field */}
                <div className="flex items-center px-4 py-[10px] border border-[#A5A5A5] rounded-lg">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full outline-none text-base leading-6 placeholder:text-[#A5A5A5] text-black"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>

                {/* Contact Field with Country Code */}
                <div className="flex items-center px-4 py-[10px] border border-[#A5A5A5] rounded-lg gap-[10px]">
                  <div className="flex items-center gap-[10px]">
                    <span className="text-base leading-5 text-[#A5A5A5]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {formData.countryCode}
                    </span>
                    <ChevronDown className="w-[10px] h-[5px] text-[#A5A5A5]" />
                    <div className="w-[1px] h-[44px] bg-[#A5A5A5]" />
                  </div>
                  <input
                    type="tel"
                    name="contact"
                    placeholder="Contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="flex-1 outline-none text-base leading-6 placeholder:text-[#A5A5A5] text-black"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>

                {/* Email Field */}
                <div className="flex items-center px-4 py-[10px] border border-[#A5A5A5] rounded-lg">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full outline-none text-base leading-6 placeholder:text-[#A5A5A5] text-black"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>

                {/* Location Field */}
                <div className="flex items-center px-4 py-[10px] border border-[#A5A5A5] rounded-lg">
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full outline-none text-base leading-6 placeholder:text-[#A5A5A5] text-black"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>

                {/* Message Field */}
                <div className="flex items-start px-4 py-[10px] border border-[#A5A5A5] rounded-lg min-h-[110px]">
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full outline-none text-base leading-6 placeholder:text-[#A5A5A5] text-black resize-none"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="flex items-center justify-center px-8 py-3 h-12 bg-[#7B00E0] rounded-lg text-white text-base font-medium leading-6 hover:bg-[#6A00C7] transition-colors"
                    style={{ fontFamily: 'Poppins, sans-serif', width: 'auto', minWidth: '120px' }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

