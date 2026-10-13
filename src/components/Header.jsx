import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Ticket, 
  SignOut, 
  CaretDown, 
  List, 
  X, 
  ShieldCheck, 
  Compass, 
  SuitcaseRolling 
} from '@phosphor-icons/react';

export default function Header() {
  const { user } = useAuth();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <header className="w-full px-6 py-3.5 md:px-12 bg-stone-50/90 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Wayfare Logo" className="w-8 h-8 drop-shadow-sm transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-heading font-bold text-2xl text-bay-700 tracking-tight leading-none">
              Wayfare
            </span>
            <span className="text-[10px] uppercase font-semibold text-stone-500 tracking-widest mt-0.5">
              Journeys done right
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`font-medium transition-colors ${
              location.pathname === '/' ? 'text-bay-700 font-semibold' : 'text-stone-600 hover:text-bay-700'
            }`}
          >
            Trang chủ
          </Link>
          <a 
            href="/#destinations" 
            className="text-stone-600 hover:text-bay-700 font-medium transition-colors"
          >
            Điểm đến
          </a>
          <a 
            href="/#tours" 
            className="text-stone-600 hover:text-bay-700 font-medium transition-colors"
          >
            Tour nổi bật
          </a>
        </nav>

        {/* User Section / Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 p-1.5 pr-3 rounded-full border border-stone-200 bg-white hover:border-bay-300 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-bay-500 focus:ring-offset-1"
                aria-expanded={dropdownOpen}
              >
                {/* User Avatar */}
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name || "Avatar"}
                    className="w-9 h-9 rounded-full object-cover border border-stone-200"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-bay-100 text-bay-800 font-heading font-bold text-sm flex items-center justify-center border border-bay-200">
                    {getInitials(user.name)}
                  </div>
                )}

                {/* Name & Role */}
                <div className="text-left">
                  <p className="text-sm font-semibold text-ink leading-tight line-clamp-1 max-w-[120px]">
                    {user.name || 'Người dùng'}
                  </p>
                  <p className="text-[11px] text-stone-500 leading-tight">
                    {user.role === 'ADMIN' ? 'Quản trị viên' : user.role === 'STAFF' ? 'Nhân viên' : 'Khách hàng'}
                  </p>
                </div>

                <CaretDown 
                  size={14} 
                  weight="bold" 
                  className={`text-stone-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Account Summary Header */}
                  <div className="px-4 py-3 border-b border-stone-100">
                    <p className="text-sm font-bold text-ink leading-tight">
                      {user.name || 'Khách hàng'}
                    </p>
                    <p className="text-xs text-stone-500 font-mono truncate mt-0.5">
                      {user.email || ''}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-bay-50 text-bay-700 border border-bay-200">
                      <ShieldCheck size={12} weight="fill" />
                      <span>{user.role === 'ADMIN' ? 'Tài khoản Quản trị' : user.role === 'STAFF' ? 'Tài khoản Nhân viên' : 'Thành viên Wayfare'}</span>
                    </div>
                  </div>

                  {/* Menu Options */}
                  <div className="py-1.5">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:text-bay-700 hover:bg-stone-50 transition-colors font-medium"
                    >
                      <User size={18} weight="duotone" className="text-bay-700" />
                      <span>Thông tin cá nhân</span>
                    </Link>

                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:text-bay-700 hover:bg-stone-50 transition-colors font-medium"
                    >
                      <Ticket size={18} weight="duotone" className="text-bay-700" />
                      <span>Booking của tôi</span>
                    </Link>
                  </div>

                  {/* Sign Out Action (dạng UI cứng để user tự gắn logic) */}
                  <div className="border-t border-stone-100 pt-1.5">
                    <button
                      type="button"
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-lantern-700 hover:bg-lantern-100/50 transition-colors font-medium text-left"
                    >
                      <SignOut size={18} weight="bold" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                to="/login" 
                className="text-stone-700 hover:text-bay-700 font-medium px-4 py-2 text-sm transition-colors rounded-xl hover:bg-stone-100"
              >
                Đăng nhập
              </Link>
              <Link 
                to="/register" 
                className="bg-bay-700 text-white px-5 py-2.5 text-sm rounded-xl font-medium hover:bg-bay-800 transition-colors active:scale-[0.98] shadow-sm inline-flex items-center gap-1.5"
              >
                <span>Đăng ký</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-stone-600 hover:text-bay-700 hover:bg-stone-100 transition-colors focus:outline-none focus:ring-2 focus:ring-bay-500"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-stone-200 flex flex-col gap-3 pb-2 animate-in fade-in duration-150">
          <nav className="flex flex-col gap-1">
            <Link 
              to="/" 
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-bay-700"
            >
              Trang chủ
            </Link>
            <a 
              href="/#destinations" 
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-bay-700"
            >
              Điểm đến
            </a>
            <a 
              href="/#tours" 
              className="px-3 py-2 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-100 hover:text-bay-700"
            >
              Tour nổi bật
            </a>
          </nav>

          <div className="border-t border-stone-200 pt-3">
            {user ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-3 py-2 bg-stone-100 rounded-xl">
                  {user.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-bay-100 text-bay-800 font-bold text-xs flex items-center justify-center">
                      {getInitials(user.name)}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">{user.name || 'Người dùng'}</p>
                    <p className="text-xs text-stone-500 truncate">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 rounded-lg font-medium"
                >
                  <User size={18} />
                  <span>Trang cá nhân & Booking</span>
                </Link>
                <button
                  type="button"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-lantern-700 hover:bg-lantern-100/50 rounded-lg font-medium text-left"
                >
                  <SignOut size={18} />
                  <span>Đăng xuất</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  className="w-full text-center py-2.5 text-sm font-medium text-stone-700 bg-stone-100 rounded-xl hover:bg-stone-200"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center py-2.5 text-sm font-medium text-white bg-bay-700 rounded-xl hover:bg-bay-800 shadow-sm"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
