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
import { AnimateOnScroll } from "@/components/animate-on-scroll"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <BannerSection />
      <AnimateOnScroll animation="fadeInUp" delay={100}>
        <FeatureCards />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fadeInUp" delay={200}>
        <AboutUs />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fadeInUp" delay={100}>
        <OurProducts />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fadeInUp" delay={200}>
        <ClientsPartners />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fadeInUp" delay={100}>
        <OrderFulfillment />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fadeInUp" delay={200}>
        <BulkProductsBanner />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fadeInUp" delay={100}>
        <ContactUs />
      </AnimateOnScroll>
      <AnimateOnScroll animation="fadeInUp" delay={200}>
        <FAQSection />
      </AnimateOnScroll>
      <Footer />
    </main>
  )
}

