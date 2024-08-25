import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-2 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          <Link href="/">Vocab Deck</Link>
        </h1>
        <nav className="space-x-4">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            About
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Services
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
