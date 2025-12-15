"use client"

import Image from "next/image"

const steps = [
  {
    title: "Explore Medical Products",
    description: "Browse our extensive catalogue of medical instruments, surgical equipment, and pharmaceutical products across multiple specialties.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z" fill="white"/>
      </svg>
    ),
    isActive: true,
  },
  {
    title: "Identify the Right Products",
    description: "Review detailed specifications, variants, and catalogue codes to ensure the products meet your clinical and institutional requirements.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 7.00009L9 19.0001L3.5 13.5001L4.91 12.0901L9 16.1701L19.59 5.59009L21 7.00009Z" fill="#9E9E9E"/>
      </svg>
    ),
    isActive: false,
  },
  {
    title: "Submit Your Enquiry",
    description: "Add selected products to your enquiry list and share your requirements with our team for accurate pricing and availability.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_5_117)">
          <path d="M14 8H4.66667C4.48986 8 4.32029 7.92976 4.19526 7.80474C4.07024 7.67971 4 7.51014 4 7.33333V4.66667C4 4.48986 4.07024 4.32029 4.19526 4.19526C4.32029 4.07024 4.48986 4 4.66667 4H14C14.1768 4 14.3464 4.07024 14.4714 4.19526C14.5964 4.32029 14.6667 4.48986 14.6667 4.66667V7.33333C14.6667 7.51014 14.5964 7.67971 14.4714 7.80474C14.3464 7.92976 14.1768 8 14 8ZM5.33333 6.66667H13.3333V5.29333H5.33333V6.66667Z" fill="#9E9E9E"/>
          <path d="M14 9.38672H4.66667C4.48986 9.38672 4.32029 9.45696 4.19526 9.58198C4.07024 9.70701 4 9.87657 4 10.0534V12.6667C4 12.8435 4.07024 13.0131 4.19526 13.1381C4.32029 13.2631 4.48986 13.3334 4.66667 13.3334H12.24L14.6667 10.8667V10.0534C14.6667 9.87657 14.5964 9.70701 14.4714 9.58198C14.3464 9.45696 14.1768 9.38672 14 9.38672ZM13.3333 12.0001H5.33333V10.6667H13.3333V12.0001Z" fill="#9E9E9E"/>
          <path d="M7.37333 21.0066V20.9666L7.58666 20.0399H2.66666V2.66659H16V9.49992L17.3333 8.23992V1.99992C17.3333 1.82311 17.2631 1.65354 17.1381 1.52851C17.013 1.40349 16.8435 1.33325 16.6667 1.33325H1.99999C1.82318 1.33325 1.65361 1.40349 1.52859 1.52851C1.40357 1.65354 1.33333 1.82311 1.33333 1.99992V20.6666C1.33333 20.8434 1.40357 21.013 1.52859 21.138C1.65361 21.263 1.82318 21.3333 1.99999 21.3333H7.33333C7.33873 21.2235 7.3521 21.1144 7.37333 21.0066Z" fill="#9E9E9E"/>
          <path d="M14.6667 12.78L14.1467 13.3067C14.2757 13.2801 14.3939 13.2159 14.4865 13.1222C14.579 13.0284 14.6417 12.9094 14.6667 12.78Z" fill="#9E9E9E"/>
          <path d="M4 17.9601C4 18.1369 4.07024 18.3065 4.19526 18.4315C4.32029 18.5565 4.48986 18.6267 4.66667 18.6267H7.89333L8.09333 17.7601L8.18 17.3934V17.3601H5.33333V16.0001H9.56L10.8933 14.6667H4.66667C4.48986 14.6667 4.32029 14.737 4.19526 14.862C4.07024 14.987 4 15.1566 4 15.3334V17.9601Z" fill="#9E9E9E"/>
          <path d="M22.3267 11.1133L20.08 8.86668C19.9803 8.7667 19.8618 8.68738 19.7314 8.63325C19.601 8.57913 19.4612 8.55127 19.32 8.55127C19.1788 8.55127 19.039 8.57913 18.9086 8.63325C18.7782 8.68738 18.6597 8.7667 18.56 8.86668L9.42 18.06L8.66667 21.2667C8.63847 21.405 8.63783 21.5476 8.6648 21.6862C8.69178 21.8247 8.74583 21.9566 8.82385 22.0743C8.90188 22.192 9.00236 22.2931 9.11953 22.3719C9.2367 22.4506 9.36826 22.5055 9.50667 22.5333C9.5754 22.54 9.64461 22.54 9.71334 22.5333C9.79506 22.5461 9.87828 22.5461 9.96 22.5333L13.1933 21.82L22.3267 12.6667C22.4264 12.5675 22.5056 12.4497 22.5597 12.3198C22.6137 12.1899 22.6415 12.0507 22.6415 11.91C22.6415 11.7694 22.6137 11.6301 22.5597 11.5002C22.5056 11.3704 22.4264 11.2525 22.3267 11.1533V11.1133ZM12.5133 20.6067L10.0733 21.1467L10.6667 18.7267L17.52 11.8L19.4 13.68L12.5133 20.6067ZM20.1533 12.9267L18.2733 11.0467L19.3333 10L21.2267 11.8933L20.1533 12.9267Z" fill="#9E9E9E"/>
        </g>
        <defs>
          <clipPath id="clip0_5_117">
            <rect width="24" height="24" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    ),
    isActive: false,
  },
  {
    title: "Order Processing & Fulfilment",
    description: "Our team reviews your enquiry, confirms details, and manages order processing with clear communication at every stage via e-mail within 24 to 48 hours.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12H12V13.5H3V12ZM1.5 8.25H9V9.75H1.5V8.25Z" fill="#9E9E9E"/>
        <path d="M22.4393 12.4545L20.1893 7.2045C20.1314 7.06962 20.0353 6.95466 19.9128 6.87387C19.7903 6.79309 19.6468 6.75002 19.5 6.75H17.25V5.25C17.25 5.05109 17.171 4.86032 17.0303 4.71967C16.8897 4.57902 16.6989 4.5 16.5 4.5H4.50001V6H15.75V15.417C15.4085 15.6157 15.1095 15.8799 14.8704 16.1945C14.6313 16.509 14.4566 16.8678 14.3565 17.25H9.64351C9.46096 16.543 9.02683 15.9269 8.4225 15.517C7.81817 15.1072 7.08512 14.9319 6.36076 15.0239C5.6364 15.1159 4.97046 15.4689 4.48777 16.0168C4.00507 16.5647 3.73877 17.2698 3.73877 18C3.73877 18.7302 4.00507 19.4353 4.48777 19.9832C4.97046 20.5311 5.6364 20.8841 6.36076 20.9761C7.08512 21.0681 7.81817 20.8928 8.4225 20.483C9.02683 20.0731 9.46096 19.457 9.64351 18.75H14.3565C14.5197 19.3937 14.8928 19.9646 15.4168 20.3724C15.9409 20.7802 16.586 21.0016 17.25 21.0016C17.914 21.0016 18.5591 20.7802 19.0832 20.3724C19.6072 19.9646 19.9804 19.3937 20.1435 18.75H21.75C21.9489 18.75 22.1397 18.671 22.2803 18.5303C22.421 18.3897 22.5 18.1989 22.5 18V12.75C22.5 12.6484 22.4793 12.5479 22.4393 12.4545ZM6.75001 19.5C6.45334 19.5 6.16333 19.412 5.91665 19.2472C5.66998 19.0824 5.47772 18.8481 5.36419 18.574C5.25066 18.2999 5.22095 17.9983 5.27883 17.7074C5.33671 17.4164 5.47957 17.1491 5.68935 16.9393C5.89913 16.7296 6.1664 16.5867 6.45737 16.5288C6.74834 16.4709 7.04994 16.5006 7.32403 16.6142C7.59812 16.7277 7.83239 16.92 7.99721 17.1666C8.16203 17.4133 8.25001 17.7033 8.25001 18C8.25001 18.3978 8.09197 18.7794 7.81067 19.0607C7.52936 19.342 7.14783 19.5 6.75001 19.5ZM17.25 8.25H19.005L20.613 12H17.25V8.25ZM17.25 19.5C16.9533 19.5 16.6633 19.412 16.4167 19.2472C16.17 19.0824 15.9777 18.8481 15.8642 18.574C15.7507 18.2999 15.721 17.9983 15.7788 17.7074C15.8367 17.4164 15.9796 17.1491 16.1893 16.9393C16.3991 16.7296 16.6664 16.5867 16.9574 16.5288C17.2483 16.4709 17.5499 16.5006 17.824 16.6142C18.0981 16.7277 18.3324 16.92 18.4972 17.1666C18.662 17.4133 18.75 17.7033 18.75 18C18.75 18.3978 18.592 18.7794 18.3107 19.0607C18.0294 19.342 17.6478 19.5 17.25 19.5ZM21 17.25H20.1435C19.9783 16.6076 19.6046 16.0381 19.0809 15.6309C18.5573 15.2238 17.9133 15.0018 17.25 15V13.5H21V17.25Z" fill="#9E9E9E"/>
      </svg>
    ),
    isActive: false,
  },
  {
    title: "Ongoing Support & Management",
    description: "We assist you throughout the process, from quotation to delivery coordination, ensuring a smooth and reliable procurement experience.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.4847 5.22691C14.0685 5.22991 13.6552 5.25016 13.2188 5.36716C12.7431 5.49591 12.2919 5.7019 11.883 5.97691C11.3085 5.63941 10.752 5.36191 10.2188 5.29666C9.5565 5.21491 8.9415 5.25916 8.22675 5.27416C7.37925 5.29141 6.8265 5.72416 5.9295 6.07066C5.03325 6.41566 3.879 6.75016 2.25 6.75016H1.5V13.9689L1.92225 14.1797L3.3045 14.8599L8.22675 20.3439L8.25 20.3672C8.8125 20.9237 9.5715 21.0617 10.242 21.0234C10.9132 20.9859 11.5433 20.7894 12.0465 20.4849C13.1543 19.8167 16.1715 17.7189 16.1715 17.7189L16.242 17.6717L16.2892 17.6252C16.6462 17.2704 16.8255 16.8377 16.9455 16.3832L19.8278 14.9297L21.984 14.2037L22.5 14.0387V6.75016H21.75C20.4892 6.75956 19.2389 6.52051 18.0705 6.04666C17.1735 5.69641 16.629 5.26816 15.7725 5.25016C15.315 5.24116 14.9002 5.22391 14.4847 5.22691ZM14.5072 6.72691C14.8448 6.72391 15.2347 6.74191 15.7267 6.75016C15.8055 6.75316 16.5262 7.06066 17.5312 7.45366C18.381 7.78741 19.5615 8.08366 21 8.17966V12.9609L19.2653 13.5474H19.2188L19.1715 13.5699L16.899 14.7189C16.7784 14.3709 16.5868 14.0516 16.3365 13.7814L16.2892 13.7109L13.1017 9.79741L12.633 9.21091L12.0465 9.67966L10.0312 11.3207C9.35475 11.7894 8.8065 11.6544 8.25 11.3912C8.08875 11.3147 8.09775 11.2914 7.96875 11.2037L11.391 8.36716L11.4375 8.32066C12.4537 7.31266 13.0785 6.96391 13.617 6.82066C13.887 6.74716 14.1705 6.72991 14.5072 6.72691ZM9.282 6.75016C9.53224 6.74001 9.78288 6.74778 10.032 6.77341C10.2285 6.79666 10.4513 6.96391 10.6418 7.03141C10.5653 7.10191 10.5097 7.14241 10.4303 7.21891L10.3837 7.26616L6.282 10.6637L5.649 11.1797L6.2115 11.7654C6.2115 11.7654 6.75375 12.3519 7.5945 12.7502C8.43525 13.1484 9.7335 13.3742 10.899 12.5627L10.9462 12.5154L12.399 11.3207L15.165 14.7189L15.1882 14.7662L15.2115 14.7887C15.7065 15.2784 15.6952 16.0487 15.2115 16.5474C15.2055 16.5527 15.2175 16.5647 15.2115 16.5699C15.2055 16.5737 15.1065 16.6322 15.0945 16.6412L14.1097 15.3047L12.891 16.1957L13.8525 17.4842C13.4625 17.7482 13.287 17.8862 12.8678 18.1644L11.8605 16.8047L10.641 17.6957L11.6025 18.9842C11.517 19.0367 11.3415 19.1544 11.274 19.1957C11.037 19.3389 10.5795 19.5002 10.1722 19.5234C9.789 19.5444 9.49575 19.4559 9.3525 19.3359L9.32925 19.3127L4.31325 13.7582L4.2195 13.6404L3 13.0314V8.17966C4.4325 8.08591 5.622 7.80166 6.46875 7.47691C7.47075 7.09291 8.18625 6.77641 8.27325 6.77341L9.282 6.75016Z" fill="#9E9E9E"/>
      </svg>
    ),
    isActive: false,
  },
]

export function OrderFulfillment() {
  return (
    <section id="fulfillment" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E1E1E] mb-6 max-w-2xl" style={{ lineHeight: '4rem' }}>
            From <span className="text-[#7B00E0]">Product Discovery</span> to <span className="text-[#7B00E0]">Order Fulfillment</span>
          </h2>
        </div>

        {/* Content Grid - Timeline Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Timeline on Left */}
          <div className="relative">
            {/* Vertical Timeline Line - single line that stops at last step icon center */}
            {/* Mobile line */}
            <div 
              className="absolute w-0.5 bg-gray-300 md:hidden"
              style={{
                left: '1.5rem', // Center of w-12 icon (3rem / 2 = 1.5rem), minus half line width (0.125rem)
                top: '1.5rem', // Start from center of first icon (half of w-12 = 1.5rem)
                // Height: from first icon center to last icon center
                // Mobile: space-y-8 = 2rem, w-12 = 3rem
                // For 5 steps: 4 gaps × (2rem spacing + 3rem icon) = 20rem
                height: `${(steps.length - 1) * 5}rem`, // 4 × 5rem = 20rem
              }}
            />
            {/* Desktop line */}
            <div 
              className="absolute w-0.5 bg-gray-300 hidden md:block"
              style={{
                left: '1.75rem', // Center of md:w-14 icon (3.5rem / 2 = 1.75rem), minus half line width
                top: '1.75rem', // Start from center of first icon (half of md:w-14 = 1.75rem)
                // Height: from first icon center to last icon center  
                // Desktop: space-y-12 = 3rem, md:w-14 = 3.5rem
                // For 5 steps: 4 gaps × (3rem spacing + 3.5rem icon) = 26rem
                height: `${(steps.length - 1) * 6.5}rem`, // 4 × 6.5rem = 26rem
              }}
            />
            
            <div className="flex flex-col space-y-8 md:space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="relative flex gap-6">
                  {/* Icon Container with Timeline Connection */}
                  <div className="flex-shrink-0 relative z-10">
                    {step.isActive ? (
                      // Active step - Purple circle with white icon
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#7B00E0] flex items-center justify-center shadow-lg">
                        {step.icon}
                      </div>
                    ) : (
                      // Inactive step - White circle with grey icon
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm">
                        <div className="text-gray-400">
                          {step.icon}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    {step.isActive ? (
                      // Active step - Full content with title and description
                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-[#1E1E1E] mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    ) : (
                      // Inactive step - Just title
                      <div>
                        <h3 className="text-base md:text-lg font-medium text-gray-600">
                          {step.title}
                        </h3>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image on Right */}
          <div className="flex items-center">
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden bg-gray-100">
              <Image
                src="/Order_fulltilment.png"
                alt="Order fulfillment and warehouse"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

