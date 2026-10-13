import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

export default function Footer() {
  return (
    <footer className="w-full bg-bay-900 text-stone-100 pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-bay-800 pb-12 mb-8">
        <div className="col-span-1 md:col-span-4 lg:col-span-5">
          <Link to="/" className="flex items-center gap-2.5 mb-6">
            <img src={logo} alt="Wayfare Logo" className="w-8 h-8 opacity-90 brightness-0 invert" />
            <span className="font-heading font-bold text-3xl text-white tracking-tight">Wayfare</span>
          </Link>
          <p className="text-stone-100/80 leading-relaxed mb-8 max-w-sm">
            Journeys done right.<br />Nền tảng đặt tour du lịch nội địa uy tín, tập trung vào trải nghiệm cốt lõi của từng điểm đến.
          </p>
          <div className="space-y-2 text-stone-100/80 text-sm">
            <p>Email: hotro@wayfare.vn</p>
            <p>Hotline: 1900 6868</p>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <h4 className="font-heading font-bold text-white mb-6 text-lg">Khám phá</h4>
          <ul className="space-y-4 text-stone-100/70 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Vịnh Hạ Long</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sapa</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Phú Quốc</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Đà Nẵng</a></li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-3 lg:col-span-2">
          <h4 className="font-heading font-bold text-white mb-6 text-lg">Về chúng tôi</h4>
          <ul className="space-y-4 text-stone-100/70 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Câu chuyện Wayfare</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Liên hệ đối tác</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tuyển dụng</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Góc báo chí</a></li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-3 lg:col-span-3">
          <h4 className="font-heading font-bold text-white mb-6 text-lg">Hỗ trợ</h4>
          <ul className="space-y-4 text-stone-100/70 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Trung tâm trợ giúp</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Quy định hoàn hủy</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-stone-100/50">
        <p>&copy; {new Date().getFullYear()} Wayfare. Không ngừng vươn xa.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Youtube</a>
        </div>
      </div>
    </footer>
  );
}
