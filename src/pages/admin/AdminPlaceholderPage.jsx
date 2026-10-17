import { useLocation, Link } from 'react-router-dom';
import {
  Compass,
  Users,
  Ticket,
  Receipt,
  WarningCircle,
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
} from '@phosphor-icons/react';

const pageConfig = {
  '/admin/tours': {
    title: 'Quản lý tour du lịch',
    description: 'Thêm, sửa thông tin tour, lịch trình từng ngày, thư viện ảnh và áp dụng quy tắc Chỉ xóa mềm (Đang hoạt động / Ngừng hoạt động).',
    icon: Compass,
    action: '+ Tạo tour mới',
  },
  '/admin/staff': {
    title: 'Quản lý nhân viên',
    description: 'Tạo tài khoản staff, xem trạng thái hoạt động, ngừng hoạt động hoặc kích hoạt lại theo phân quyền RBAC.',
    icon: Users,
    action: '+ Thêm nhân viên',
  },
  '/admin/bookings': {
    title: 'Danh sách toàn bộ booking',
    description: 'Quyền xem chỉ đọc toàn bộ booking trong hệ thống và thu hồi booking điều phối lại cho Pool.',
    icon: Ticket,
    action: 'Xuất danh sách',
  },
  '/admin/transactions': {
    title: 'Doanh thu & Giao dịch thanh toán',
    description: 'Lịch sử giao dịch VNPay và MoMo, đối soát mã IPN, quản lý hoàn tiền toàn phần qua API.',
    icon: Receipt,
    action: 'Đối soát cổng',
  },
  '/admin/sla-alerts': {
    title: 'Cảnh báo vi phạm thời gian SLA',
    description: 'Quản lý các booking tồn đọng trong Pool chưa có nhân viên tiếp nhận quá 2 giờ (job quét 30 phút / lần).',
    icon: WarningCircle,
    action: 'Quét lại hệ thống',
  },
};

export default function AdminPlaceholderPage() {
  const location = useLocation();
  const current = pageConfig[location.pathname] || {
    title: 'Tính năng quản trị',
    description: 'Mô-đun quản trị của Wayfare.',
    icon: ShieldCheck,
    action: 'Thao tác',
  };

  const Icon = current.icon;

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200 shadow-sm text-center max-w-3xl mx-auto my-6 space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-bay-100 text-bay-700 flex items-center justify-center mx-auto border border-bay-200 shadow-inner">
        <Icon size={32} weight="duotone" />
      </div>

      <div className="space-y-2 max-w-lg mx-auto">
        <h2 className="text-2xl font-heading font-bold text-ink">
          {current.title}
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          {current.description}
        </p>
      </div>

      <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-500 max-w-md mx-auto space-y-2 text-left">
        <div className="flex items-center gap-2 text-stone-700 font-semibold">
          <CheckCircle size={16} className="text-moss-500" weight="fill" />
          <span>Thông tin phân quyền & Quy tắc thiết kế:</span>
        </div>
        <p>• <strong>Khu Admin:</strong> Mật độ cao dạng bảng, nền white, đường kẻ 1px stone-200, font mono cho số liệu.</p>
        <p>• <strong>Quy tắc xóa mềm:</strong> Không có nút xóa cứng. Chỉ chuyển đổi trạng thái "Đang hoạt động" và "Ngừng hoạt động".</p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-4">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-bay-700 text-white font-medium text-xs hover:bg-bay-800 active:scale-[0.98] transition-all shadow-sm"
        >
          <ArrowLeft size={16} />
          <span>Về trang Tổng quan Admin</span>
        </Link>
      </div>
    </div>
  );
}
