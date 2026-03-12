import React, {useState} from "react";
import {Link, NavLink} from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import {Avatar} from "@mui/material";

export default function Navbar({user, handleLogout}) {
  const [isOpen, setIsOpen] = useState(false);

  const linkStyles = ({isActive}) =>
    `relative text-gray-200 hover:text-white transition font-medium pb-1 
     after:content-[''] after:absolute after:left-0 after:bottom-0
     after:h-[2px] after:bg-white after:rounded-full
     ${isActive ? "text-white after:w-full" : "after:w-0 hover:after:w-full"}`;

  return (
    <header className="absolute top-0 left-0 right-0 z-[9999] px-4 pt-4">
      <div className="mx-auto max-w-[96%] bg-gradient-to-r from-[#e8e0f1] to-[#615184] text-white shadow-sm rounded-lg">
        <div className="px-8 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 hover:opacity-90 transition flex-shrink-0"
          >
            <img src="/logo.png" alt="Logo" style={{width: 45, height: 45}} />
            <span className="text-xl font-bold tracking-wide text-[#615184] hidden sm:block">
              Monjiz<span className="text-[#615184]/40">Todo</span>
            </span>
          </Link>

          <button
            className="md:hidden text-white text-3xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>

          <nav
            className={`
              ${isOpen ? "flex" : "hidden"}
              flex-col md:flex md:flex-row md:items-center gap-8
              absolute md:static top-20 left-0 w-full md:w-auto
              bg-[#615184]/98 md:bg-transparent p-6 md:p-0 rounded-xl md:rounded-none
            `}
          >
            <NavLink to="/dashboard" className={linkStyles}>
              Dashboard
            </NavLink>
            <NavLink to="/mytask" className={linkStyles}>
              My Task
            </NavLink>
            <NavLink to="/calendar" className={linkStyles}>
              Calendar
            </NavLink>
            <NavLink to="/contact" className={linkStyles}>
              Contact
            </NavLink>

            <div className="hidden md:block h-6 w-[1px] bg-white/20 mx-2"></div>

            {!user ? (
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <NavLink to="/login" className={linkStyles}>
                  Login
                </NavLink>
                <Link
                  to="/register"
                  className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition font-medium border border-white/20"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-[#e8e0f1]/30 hover:bg-white-500/40 px-4 py-2 rounded-md transition-all duration-300 border border-white/20 text-white font-medium text-sm">
                  <Avatar
                    sx={{
                      width: 20,
                      height: 20,
                      bgcolor: "#615184",
                      fontSize: "0.8rem",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <span className="text-sm font-semibold hidden lg:block">
                    {user?.name}
                  </span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-[#e8e0f1]/30 hover:bg-white-500/40 px-4 py-2 rounded-md transition-all duration-300 border border-white/20 text-white font-medium text-sm"
                >
                  <span>Logout</span>
                  <LogoutIcon sx={{fontSize: 18}} />
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
