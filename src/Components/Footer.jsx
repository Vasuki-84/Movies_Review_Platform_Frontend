import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className=" bg-black text-gray-200 ">
      <div className="max-w-7xl mx-auto px-6 py-5">
       

        <div className=" w-full mt-3 ">
          <p className="text-center text-sm py-4">
            © {new Date().getFullYear()}  <span className="text-red-600">CINE</span>BUZZ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
