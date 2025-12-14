import { Navbar } from "@/components/navbar"
import { BannerSection } from "@/components/banner-section"
import { FeatureCards } from "@/components/feature-cards"
import { AboutUs } from "@/components/about-us"
import { OurProducts } from "@/components/our-products"
import { ClientsPartners } from "@/components/clients-partners"
import { OrderFulfillment } from "@/components/order-fulfillment"
import { BulkProductsBanner } from "@/components/bulk-products-banner"
import { FAQSection } from "@/components/faq-section"
import { ContactUs } from "@/components/contact-us"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <BannerSection />
      <FeatureCards />
      <AboutUs />
      <OurProducts />
      <ClientsPartners />
      <OrderFulfillment />
      <BulkProductsBanner />
      <FAQSection />
      <ContactUs />
      <Footer />
    </main>
  )
}

