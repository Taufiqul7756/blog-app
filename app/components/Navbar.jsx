"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../../public/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(true);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const closeNavbar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 50) {
        setScrolling(false);
      } else {
        setScrolling(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full z-10 ${
        scrolling
          ? "bg-[#081939] py-1"
          : "bg-[#081939] backdrop-blur-sm shadow-md "
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              <Image
                src={Logo}
                width={200}
                height={200}
                alt="Picture of the author"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 gap-5">
              <Link
                href="/"
                className={`text-white hover:text-white  py-2 text-sm font-medium ${
                  pathname === "/"
                    ? "border-b-2 border-yellow-500 text-yellow-500"
                    : ""
                }`}
              >
                Services & Benefits
              </Link>
              <Link
                href="/cart"
                className={`text-white hover:text-white  py-2  text-sm font-medium ${
                  pathname === "/cart"
                    ? " border-b-2 border-yellow-500 text-yellow-500"
                    : ""
                }`}
              >
                Blog
              </Link>
            </div>
          </div>
          <div className="hidden sm:block ">
            <Link
              href="/login"
              className={`text-white hover:text-white bg-[#525CEB] px-4 py-2 rounded-md text-sm font-medium`}
            >
              LOGIN
            </Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              onClick={closeNavbar}
              href="/"
              className={`text-${
                scrolling ? "white" : "black"
              } hover:text-white bg-slate-400 block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/" ? " border-b-4" : ""
              }`}
            >
              Products
            </Link>
            <Link
              onClick={closeNavbar}
              href="/cart"
              className={`text-${
                scrolling ? "white" : "black"
              } hover:text-white bg-slate-400 block px-3 py-2 rounded-md text-base font-medium ${
                pathname === "/cart" ? " border-b-4" : ""
              }`}
            >
              Cart
            </Link>

            <Link
              onClick={closeNavbar}
              href="/login"
              className={`text-${
                scrolling ? "white" : "black"
              } hover:text-white  block px-3 bg-blue-600 py-2 rounded-md text-base font-medium`}
            >
              LOGIN
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
