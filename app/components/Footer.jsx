import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-white bg-[#081939] py-24 px-16 mt-auto">
      <div className="container grid grid-cols-2 lg:grid-cols-4 lg:flex-row gap-10 lg:gap-0 justify-between">
        <div className="space-y-4">
          <Image
            src="/logormv.png"
            width={185}
            height={50}
            alt="gold Kinen Logo"
          />
          <p className="text-sm">Got Question? Call us 24/7</p>
          <h6 className="font-semibold">+88 0163 4139003</h6>
          <p className="text-sm">
            Register now & get you 10%
            <br /> offer from first order!
          </p>
          <h6 className="font-semibold">Join Us</h6>
          <div className="flex gap-2 text-3xl">
            <FaFacebookSquare className="cursor-pointer" />
            <FaTwitterSquare className="cursor-pointer" />
            <FaLinkedin className="cursor-pointer" />
            <FaInstagram className="cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col gap-5 text-sm ">
          <h5 className="font-semibold text-lg">Company</h5>
          <Link className="hover:text-[#525CEB] duration-100" href="/">
            About us
          </Link>
          <Link className="hover:text-[#525CEB] duration-100" href="/">
            Career
          </Link>
          <Link className="hover:text-[#525CEB] duration-100" href="/">
            Contact us
          </Link>
          <Link className="hover:text-[#525CEB] duration-100" href="/">
            Start Selling
          </Link>
          <Link className="hover:text-[#525CEB] duration-100" href="/">
            Order History
          </Link>
        </div>
        <div className="flex flex-col gap-5 text-sm ">
          <h5 className="font-semibold text-lg">My Account</h5>
          <Link className="hover:text-[#525CEB] duration-100" href="/cart">
            Track My Order
          </Link>
          <Link className="hover:text-[#525CEB] duration-100" href="/cart">
            View Cart
          </Link>
          <Link className="hover:text-[#525CEB] duration-100" href="/">
            Sign In
          </Link>
          <Link className="hover:text-[#525CEB] duration-100" href="/">
            Help
          </Link>
          <Link className="hover:text-[#525CEB] duration-100" href="/">
            Wishlist
          </Link>
        </div>
        <div className="flex flex-col gap-5 text-sm  ">
          <h5 className="font-semibold text-lg">Customer Service</h5>
          <Link className="hover:text-[#525CEB] duration-100" href="/">
            Payment Methods
          </Link>
          <Link className="hover:text-[#525CEB] duration-100" href="/">
            Money Return Policy
          </Link>
          <Link className="hover:text-[#525CEB] duration-100" href="/">
            Product Return
          </Link>
          <Link className="hover:text-[#525CEB] duration-100" href="/">
            Contact Seller
          </Link>
          <Link className="hover:text-[#525CEB] duration-100" href="/">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
