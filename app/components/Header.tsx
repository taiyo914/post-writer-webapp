import Link from "next/link";
import SignOutBtn from "./SignOutBtn";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-[2000px] mx-auto px-5 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          <Link href="/">Vocab Deck</Link>
        </h1>
        <nav>
          <div className="flex space-x-4 items-center">
            {/* <Link href="#" className="text-gray-500 hover:text-gray-900">
              Home
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              About
            </Link> */}
            <SignOutBtn/>
            <Link href="#" >
              <img src="/userIcon.png" alt="Logo" className="h-12 w-12 mr-1" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
