import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://doctorappoint.com"),
  title: "DoctorAppoint - Book Doctor Appointments Online | Medical Consultations",
  description: "DoctorAppoint is your trusted online platform to book appointments with qualified doctors. Find specialists, view profiles, read reviews, and schedule consultations easily.",
  keywords: "doctor appointment, online consultation, medical appointments, healthcare booking, specialist directory",
  authors: [{ name: "DoctorAppoint Team" }],
  creator: "DoctorAppoint",
  publisher: "DoctorAppoint",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://doctorappoint.com",
    siteName: "DoctorAppoint",
    title: "DoctorAppoint - Book Doctor Appointments Online",
    description: "Find and book appointments with top-rated doctors. Fast, secure, and convenient healthcare booking.",
    images: [
      {
        url: "/assets/Logo.png",
        width: 1200,
        height: 630,
        alt: "DoctorAppoint - Doctor Appointment Booking Platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DoctorAppoint - Book Doctor Appointments Online",
    description: "Find and book appointments with top-rated doctors easily.",
    images: ["/assets/Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/assets/Logo.png",
    apple: "/assets/Logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
} 
