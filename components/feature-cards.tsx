"use client"

import { Package, ShieldCheck, Truck } from "lucide-react"

const features = [
  {
    icon: Package,
    title: "Wide Product Range",
    description: "From pharmaceuticals to surgical essentials.",
    color: "#7B00E0",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "We supply medical products that meet professional and industry standards.",
    color: "#7B00E0",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Ensuring timely supply for critical medical needs",
    color: "#7B00E0",
  },
]

export function FeatureCards() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-12 lg:-mt-16 relative z-30">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={index}
              className="bg-white rounded-lg p-6 md:p-8 shadow-lg border border-dashed border-gray-300 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  <Icon
                    className="h-12 w-12 md:h-16 md:w-16"
                    strokeWidth={1.5}
                    style={{ color: feature.color }}
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: feature.color }}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

