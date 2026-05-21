"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0f172a] text-gray-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800 mt-auto">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/assets/Logo.png"
                                alt="DoctorAppoint"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                            <span className="text-white font-bold text-2xl tracking-tight">
                                Doctor<span className="text-blue-500">Appoint</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed">
                            Your health journey is personal, and we&apos;re here to walk it with you. Connect with caring specialists dedicated to providing the highest quality healthcare for you and your loved ones
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 text-white transition-all duration-300"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div className="space-y-6">
                        <h4 className="text-white font-semibold text-lg border-l-4 border-blue-500 pl-3">Our Specialties</h4>
                        <ul className="space-y-3 font-medium">
                            {[
                                { name: "Cardiology", link: "/specialties/cardiology" },
                                { name: "Neurology", link: "/specialties/neurology" },
                                { name: "Orthopedics", link: "/specialties/orthopedics" },
                                { name: "Pediatrics", link: "/specialties/pediatrics" },
                                { name: "Dermatology", link: "/specialties/dermatology" }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.link} className="flex items-center gap-2 group hover:text-blue-400 transition-all duration-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="space-y-6">
                        <h4 className="text-white font-semibold text-lg border-l-4 border-blue-500 pl-3">Patient Portal</h4>
                        <ul className="space-y-3 font-medium">
                            {[
                                { name: "Emergency Care", link: "/emergency" },
                                { name: "Book Appointment", link: "/all-appointment" },
                                { name: "Heath Packages", link: "/packages" }, 
                                { name: "Medical Records", link: "/dashboard" },
                                { name: "Patient Reviews", link: "/reviews" }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link href={item.link} className="flex items-center gap-2 group hover:text-blue-400 transition-all duration-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-white font-semibold text-lg border-l-4 border-blue-500 pl-3">Emergency Contact</h4>
                        <div className="space-y-4">
                            <div className="bg-blue-600/10 p-4 rounded-xl border border-blue-500/20 group hover:border-blue-500 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <Phone className="text-blue-500" size={20} />
                                    <span className="text-white font-bold text-lg">24/7 Helpline</span>
                                </div>
                                <p className="text-blue-400 font-bold text-xl ml-8">+880 2233 555 888</p>
                            </div>
                            <div className="flex items-start gap-3 pt-2">
                                <MapPin className="text-blue-500 mt-1 shrink-0" size={18} />
                                <span className="text-sm">Mirpur-1, Shah-Ali-Bag, <br/>Dhaka 1216, Bangladesh</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="text-blue-500 shrink-0" size={18} />
                                <span className="text-sm">support@doctorappoint.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Opening Hours & Accreditation */}
                <div className="py-8 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
                    <div className="text-sm">
                        <p className="text-white font-medium mb-1">Clinic Opening Hours:</p>
                        <p>Mon - Sat: 08:00 AM - 10:00 PM</p>
                        <p>Sunday: Emergency Only</p>
                    </div>
                    <div className="flex justify-center gap-8 grayscale opacity-50">
                        {/* Mock icons for medical associations */}
                        <div className="text-[10px] font-bold border-2 border-gray-500 p-1 px-2 rounded">WHO CERTIFIED</div>
                        <div className="text-[10px] font-bold border-2 border-gray-500 p-1 px-2 rounded">ISO 9001:2015</div>

                    </div>
                    <div className="flex md:justify-end gap-6 text-xs font-medium">
                        <Link href="/privacy" className="hover:text-blue-400">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-blue-400">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-blue-400">Cookie Setting</Link>
                    </div>
                </div>

                {/* Newsletter / Divider */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm">
                        &copy; {currentYear} DoctorAppointment.All rights reserved. Developed by <span className="text-blue-500 font-medium tracking-wide">Afjal Hossain</span>
                    </p>
                    <div className="flex gap-6 text-sm">
                        <Link href="#" className="hover:text-white transition-colors">Safety</Link>
                        <Link href="#" className="hover:text-white transition-colors">Help Center</Link>
                        <Link href="#" className="hover:text-white transition-colors">Career</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;