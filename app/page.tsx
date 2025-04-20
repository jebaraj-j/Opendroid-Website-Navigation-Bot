"use client";
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();
import React, { useRef } from 'react';
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Home() {
  // Create a ref for the home section and explicitly type it as HTMLElement
  const homeRef = useRef<HTMLElement | null>(null);

  // Handle the scroll to the home section
  const handleScrollToHome = () => {
    if (homeRef.current) {
      homeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="grid-pattern">
      {/* Hero Section */}
      <section id="home" ref={homeRef} className="relative h-screen flex items-center">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl text-gray-400 mb-4">THESE ARE THE</h2>
            <h1 className="text-7xl md:text-9xl font-bold tracking-wider text-gray-700 mb-8">DROIDS</h1>
            <p className="text-xl text-gray-300 mb-8">
              Pioneering the future of artificial intelligence and robotics through innovative research and development.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/research" className="btn-primary">
                Explore Research
              </Link>
              <Link href="/access" className="btn-primary">
                Get Access
              </Link>
            </div>
            <button onClick={handleScrollToHome} className="btn-primary mt-4">
              Scroll to Home Section
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-heading">About Our Project</h2>
            <p className="text-lg text-gray-300 mb-12">
              Open Droids is at the forefront of AI research and development, creating intelligent systems that push the
              boundaries of what's possible. Our team of experts is dedicated to building the next generation of AI
              solutions that are accessible, ethical, and transformative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[{
              title: "Research",
              description:
                "Explore our cutting-edge research in artificial intelligence, machine learning, and robotics.",
              link: "/research",
            },
            {
              title: "Magazine",
              description:
                "Read the latest articles, insights, and updates from our team and the broader AI community.",
              link: "/magazine",
            },
            {
              title: "Careers",
              description: "Join our team of experts and contribute to the future of AI and robotics technology.",
              link: "/careers",
            }].map((item, index) => (
              <Link key={index} href={item.link} className="card group p-6 h-full flex flex-col">
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-400 mb-6 flex-grow">{item.description}</p>
                <div className="flex items-center text-gray-300 group-hover:text-white mt-auto">
                  <span>Learn more</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="container-custom">
          <h2 className="section-heading text-center mb-12">Featured Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Team"
                  alt="Our Team"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Our Team</h3>
                <p className="text-gray-400 mb-4">
                  Meet the brilliant minds behind Open Droids and learn about their expertise and contributions.
                </p>
                <Link href="/team" className="inline-flex items-center text-gray-300 hover:text-white">
                  <span>Meet the team</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="card overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Access"
                  alt="Get Access"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Get Access</h3>
                <p className="text-gray-400 mb-4">
                  Learn about our access options and how you can start using our platform and technologies.
                </p>
                <Link href="/access" className="inline-flex items-center text-gray-300 hover:text-white">
                  <span>Explore options</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
