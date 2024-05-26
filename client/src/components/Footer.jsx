import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="mt-1 flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link to={"/"} className="mt-2">
          <img src={logo} alt="logo" width={150} height={28} />
        </Link>
        <p className="text-sm text-gray-500">
          © 2024 HostMe. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
