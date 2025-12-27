"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { sendOTP, verifyOTP } from "@/lib/api"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<"email" | "otp">("email")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  async function handleSendOTP(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const data = await sendOTP(email)
      setOtpSent(true)
      setStep("otp")
      if (data.otp) {
        // In development, show OTP in console
        console.log("OTP:", data.otp)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyOTP(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const data = await verifyOTP(email, otp)
      // Store token in localStorage
      localStorage.setItem("admin_token", data.token)
      localStorage.setItem("admin_email", data.email)
      // Redirect to admin dashboard
      router.push("/admin")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Image src="/Logo2.png" alt="DI Wholesale" width={200} height={80} className="w-auto h-20 object-contain mb-4" unoptimized />
          <h1 className="text-2xl font-semibold text-gray-800">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-2">Enter your email to receive OTP</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>
        )}

        {step === "email" ? (
          <form onSubmit={handleSendOTP}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7B00E0]"
                placeholder="admin@example.com"
                required
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7B00E0] text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#6a00c7] transition-colors"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="w-full border rounded-lg px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-[#7B00E0]"
                placeholder="000000"
                maxLength={6}
                required
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                OTP sent to {email}
              </p>
            </div>
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-[#7B00E0] text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#6a00c7] transition-colors mb-3"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("email")
                setOtp("")
                setOtpSent(false)
                setError("")
              }}
              className="w-full text-[#7B00E0] py-2 text-sm hover:underline"
              disabled={loading}
            >
              Change Email
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

