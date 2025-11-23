"use client";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dropdown = ({
  label,
  items,
  isOpen,
  onToggle,
}: {
  label: string;
  items: Array<{
    label: string;
    href: string;
    divider?: boolean;
    danger?: boolean;
  }>;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const router = useRouter();

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`group flex items-center text-gray-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-xl transition-all duration-200 font-medium hover:shadow-sm transform hover:scale-105 active:scale-95 ${
          isOpen ? "bg-blue-50 text-blue-700 shadow-sm" : ""
        }`}
      >
        <span className="relative">
          {label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
        </span>
        <svg
          className={`ml-2 h-4 w-4 transition-all duration-200 ${
            isOpen ? "rotate-180 text-blue-600" : "group-hover:text-blue-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              {item.divider ? (
                <hr className="my-2 border-gray-200" />
              ) : (
                <button
                  onClick={() => {
                    router.push(item.href);
                    onToggle();
                  }}
                  className={`group block w-full text-left px-4 py-2.5 text-sm transition-all duration-150 hover:shadow-sm ${
                    item.danger
                      ? "text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-l-4 hover:border-red-400"
                      : "text-gray-700 hover:text-blue-700 hover:bg-blue-50 hover:border-l-4 hover:border-blue-400"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {item.label}
                    <svg
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

const UserAvatar = ({
  user,
  isOpen,
  onToggle,
  onLogout,
}: {
  user: any;
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
}) => {
  const router = useRouter();
  const initials = user?.email?.slice(0, 2).toUpperCase() || "U";

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`group flex items-center space-x-2 p-2 rounded-full hover:bg-blue-50 transition-all duration-200 hover:shadow-md transform hover:scale-105 active:scale-95 ${
          isOpen ? "bg-blue-50 shadow-md" : ""
        }`}
      >
        <div
          className={`w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 group-hover:shadow-lg ${
            isOpen ? "ring-2 ring-blue-200 ring-offset-1" : ""
          }`}
        >
          {initials}
        </div>
        <span className="text-sm text-gray-700 hidden md:block group-hover:text-blue-700 transition-colors font-medium">
          {user?.email?.split("@")[0]}
        </span>
        <svg
          className={`h-4 w-4 text-gray-500 transition-all duration-200 group-hover:text-blue-600 ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Signed in as
            </p>
            <p className="text-sm font-semibold text-gray-900 truncate flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              {user?.email}
            </p>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                router.push("/profile");
                onToggle();
              }}
              className="group flex items-center justify-between w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all duration-150 hover:border-l-4 hover:border-blue-400"
            >
              <span className="flex items-center">
                <svg
                  className="w-4 h-4 mr-2 text-gray-400 group-hover:text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                View Profile
              </span>
              <svg
                className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
           
          </div>

          <hr className="my-2 border-gray-200" />

          <button
            onClick={() => {
              onLogout();
              onToggle();
            }}
            className="group flex items-center justify-between w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-orange-700 hover:bg-orange-50 transition-all duration-150 hover:border-l-4 hover:border-orange-400"
          >
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-gray-400 group-hover:text-orange-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              Sign Out
            </span>
          </button>

          <hr className="my-2 border-gray-200" />

          <button
            onClick={() => {
              router.push("/profile/delete");
              onToggle();
            }}
            className="group flex items-center justify-between w-full text-left px-4 py-2.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-150 hover:border-l-4 hover:border-red-400"
          >
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-2 text-red-400 group-hover:text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              Delete Account
            </span>
            <svg
              className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading, logout } = useAuth();

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold text-blue-700">
              AI Career Assistant
            </div>
            <div className="animate-pulse flex space-x-2">
              <div className="bg-gray-300 h-8 w-16 rounded"></div>
              <div className="bg-gray-300 h-8 w-20 rounded"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="group text-xl font-bold text-blue-700 cursor-pointer hover:text-blue-800 transition-all duration-200 transform hover:scale-105 active:scale-95"
            onClick={() => router.push("/")}
          >
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 transition-all duration-200">
              AI Career Assistant
            </span>
            <div className="w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800 transition-all duration-300 group-hover:w-full"></div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                {/* Jobs Link */}
                <button
                  onClick={() => router.push("/joblist")}
                  className="group relative text-gray-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium hover:shadow-sm transform hover:scale-105 active:scale-95"
                >
                  <span className="relative">
                    Jobs
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                  </span>
                </button>

                {/* Applications Dropdown */}
                <div className="dropdown-container relative">
                  <Dropdown
                    label="Applications"
                    isOpen={openDropdown === "applications"}
                    onToggle={() => toggleDropdown("applications")}
                    items={[
                      { label: "New Application", href: "/newApplication" },
                      { label: "My Drafts", href: "/drafts" },
                      { label: "Dashboard", href: "/dashboard" },
                    ]}
                  />
                </div>

                {/* User Profile Dropdown */}
                <div className="dropdown-container relative">
                  <UserAvatar
                    user={user}
                    isOpen={openDropdown === "profile"}
                    onToggle={() => toggleDropdown("profile")}
                    onLogout={logout}
                  />
                </div>
              </>
            ) : (
              // Unauthenticated Navigation
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="group relative text-gray-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium hover:shadow-sm transform hover:scale-105 active:scale-95"
                >
                  <span className="relative">
                    Log in
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                  </span>
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg font-medium transform hover:scale-105 active:scale-95 hover:ring-2 hover:ring-blue-300 hover:ring-offset-1"
                >
                  <span className="flex items-center">
                    Sign up
                    <svg
                      className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
