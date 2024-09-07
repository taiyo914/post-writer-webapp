import { FaFacebook, FaTwitter, FaInstagram,  } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white ">
      <div className="
        xs:flex-row items-center justify-between xs:space-x-4 flex xs:space-y-0
        flex-col space-y-5 px-5 xs:py-8 py-6">
        <p className="">&copy; By Taiyo Suzuki</p>
        <div className="flex items-center justify-end space-x-4" >
          <p className="text-sm text-gray-200">Share on</p>
          <a href="https://facebook.com" aria-label="Facebook">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" aria-label="Twitter">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
