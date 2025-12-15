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
              className="bg-white rounded-xl overflow-hidden shadow-lg transition-shadow cursor-pointer group border border-gray-300 p-6"
            >
              <div className="relative w-full h-[200px] md:h-[250px] bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 md:p-5 relative">
                <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-2 pr-12">
                  {product.name}
                </h3>
                <div className="absolute bottom-4 right-4 flex items-center justify-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#7B00E0] flex items-center justify-center transition-transform group-hover:scale-110">
                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

