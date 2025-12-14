"use client"

import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

const products = [
  {
    name: "Surgical Instruments",
    image: "/our_products/Surgical_Instruments.jpg",
  },
  {
    name: "Scissors",
    image: "/our_products/Scissors.jpg",
  },
  {
    name: "Medicines",
    image: "/our_products/Medicines.jpg",
  },
  {
    name: "Probe Instruments",
    image: "/our_products/Probe_Instruments.jpg",
  },
  {
    name: "Vascular Instruments",
    image: "/our_products/Vascular_Instruments.jpg",
  },
  {
    name: "Urology Instruments",
    image: "/our_products/Urology_Instruments.jpg",
  },
  {
    name: "Intestinal Surgery Instruments",
    image: "/our_products/Intestinal_Surgery_Instrumnets.jpg",
  },
  {
    name: "Neuro & Spine Instruments",
    image: "/our_products/Neuro_and_Spine_Instruments.jpg",
  },
]

export function OurProducts() {
  return (
    <section id="products" className="">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-8 md:mb-12 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gray-600">Our</span>{" "}
            <span className="text-[#7B00E0] relative">
              Products
              <span
                className="absolute bottom-0 left-0 h-[5px] bg-[#7B00E0]"
                style={{ width: '100%' }}
              />
            </span>
          </h2>
          <p className=" md:text-lg max-w-3xl leading-relaxed">
            Explore our wide range of certified medical instruments, surgical equipment, and pharmaceutical products designed to meet hospital and clinical standards.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="relative w-full h-[200px] md:h-[250px] bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 md:p-5 relative">
                <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-2 pr-8">
                  {product.name}
                </h3>
                <div className="absolute bottom-4 right-4">
                  <ArrowUpRight
                    className="h-5 w-5 md:h-6 md:w-6 text-[#7B00E0] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    strokeWidth={2}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

