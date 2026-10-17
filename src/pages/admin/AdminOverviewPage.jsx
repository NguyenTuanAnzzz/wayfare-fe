import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CurrencyDollarSimple,
  Ticket,
  Clock,
  ShieldCheck,
  CheckCircle,
  PhoneCall,
  XCircle,
  Prohibit,
  CreditCard,
  HourglassMedium,
  ArrowsClockwise,
  ArrowUUpLeft,
  WarningCircle,
  MagnifyingGlass,
  ArrowUpRight,
  Eye,
  ArrowCounterClockwise,
  MapPin,
  CalendarBlank,
  X,
  CaretRight,
} from '@phosphor-icons/react';

// Dữ liệu mẫu thực tế, "lộn xộn" theo đúng đặc tả:
// Giá tiền không làm tròn (2.847.000 đ, 3.520.000 đ), số điện thoại thực tế (0912 483 076)
const INITIAL_BOOKINGS = [
  {
    id: 'WF-30495',
    customerName: 'Trần Thị Thu Trang',
    customerPhone: '0983 291 048',
    customerEmail: 'trang.tran@gmail.com',
    tourName: 'Khám phá Vịnh Hạ Long - Đảo Ti Tốp & Hang Sửng Sốt',
    location: 'Quảng Ninh',
    departureDate: '28/11/2026',
    duration: '3 ngày 2 đêm',
    guests: '3 người lớn',
    totalAmount: '4.270.500 đ',
    totalAmountRaw: 4270500,
    bookingStatus: 'PENDING',
    paymentStatus: 'PAID',
    paymentMethod: 'VNPAY',
    transactionId: 'VNP148920194',
    assignedStaff: null,
    createdAt: '2026-11-20T08:15:00',
    waitingTimeMinutes: 165, // 2 giờ 45 phút -> VƯỢT SLA (>120 phút)
    isSlaBreached: true,
    staffNotes: [],
  },
  {
    id: 'WF-30510',
    customerName: 'Hoàng Minh Tuấn',
    customerPhone: '0905 771 832',
    customerEmail: 'tuan.hoang@outlook.com',
    tourName: 'Chinh phục Sapa - Ruộng bậc thang & Đỉnh Fansipan',
    location: 'Lào Cai',
    departureDate: '02/12/2026',
    duration: '4 ngày 3 đêm',
    guests: '2 người lớn',
    totalAmount: '3.520.000 đ',
    totalAmountRaw: 3520000,
    bookingStatus: 'PENDING',
    paymentStatus: 'PAID',
    paymentMethod: 'MOMO',
    transactionId: 'MOMO938210452',
    assignedStaff: null,
    createdAt: '2026-11-20T08:50:00',
    waitingTimeMinutes: 130, // 2 giờ 10 phút -> VƯỢT SLA (>120 phút)
    isSlaBreached: true,
    staffNotes: [],
  },
  {
    id: 'WF-30492',
    customerName: 'Nguyễn Văn An',
    customerPhone: '0912 483 076',
    customerEmail: 'an.nguyen@gmail.com',
    tourName: 'Khám phá Vịnh Hạ Long - Đảo Ti Tốp & Hang Sửng Sốt',
    location: 'Quảng Ninh',
    departureDate: '24/11/2026',
    duration: '3 ngày 2 đêm',
    guests: '2 người lớn, 1 trẻ em',
    totalAmount: '2.847.000 đ',
    totalAmountRaw: 2847000,
    bookingStatus: 'CONTACTING',
    paymentStatus: 'PAID',
    paymentMethod: 'VNPAY',
    transactionId: 'VNP148911048',
    assignedStaff: 'Chị Lan (NV Chăm sóc KH)',
    assignedStaffId: 'staff-01',
    createdAt: '2026-11-20T09:30:00',
    waitingTimeMinutes: 45,
    isSlaBreached: false,
    staffNotes: [
      { id: 1, staff: 'Chị Lan', note: 'Đã gọi lần 1 lúc 10h15, khách xác nhận đi 2 người lớn + bé 6 tuổi. Đang hỗ trợ xe đón tại Nhà hát Lớn Hà Nội.', time: '10:15' }
    ],
  },
  {
    id: 'WF-28104',
    customerName: 'Lê Hoàng Long',
    customerPhone: '0978 123 456',
    customerEmail: 'long.le@yahoo.com',
    tourName: 'Chinh phục Sapa - Ruộng bậc thang & Đỉnh Fansipan',
    location: 'Lào Cai',
    departureDate: '15/12/2026',
    duration: '4 ngày 3 đêm',
    guests: '2 người lớn',
    totalAmount: '3.520.000 đ',
    totalAmountRaw: 3520000,
    bookingStatus: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentMethod: 'MOMO',
    transactionId: 'MOMO847291033',
    assignedStaff: 'Anh Minh (NV Kinh doanh)',
    assignedStaffId: 'staff-02',
    createdAt: '2026-11-19T14:20:00',
    waitingTimeMinutes: 15,
    isSlaBreached: false,
    staffNotes: [
      { id: 1, staff: 'Anh Minh', note: 'Đã chốt vé cáp treo Fansipan và phòng homestay view thung lũng Mường Hoa.', time: 'Hôm qua' }
    ],
  },
  {
    id: 'WF-19520',
    customerName: 'Phạm Quỳnh Chi',
    customerPhone: '0934 567 890',
    customerEmail: 'chi.pham@gmail.com',
    tourName: 'Đà Nẵng - Bán đảo Sơn Trà & Phố cổ Hội An',
    location: 'Đà Nẵng',
    departureDate: '05/12/2026',
    duration: '4 ngày 3 đêm',
    guests: '4 người lớn',
    totalAmount: '8.300.000 đ',
    totalAmountRaw: 8300000,
    bookingStatus: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentMethod: 'VNPAY',
    transactionId: 'VNP148700291',
    assignedStaff: 'Chị Phương (NV CSKH)',
    assignedStaffId: 'staff-03',
    createdAt: '2026-11-18T11:00:00',
    waitingTimeMinutes: 10,
    isSlaBreached: false,
    staffNotes: [
      { id: 1, staff: 'Chị Phương', note: 'Khách yêu cầu phòng liền kề tầng cao tại khách sạn Mỹ Khê. Đã gửi voucher xe đưa đón sân bay.', time: '18/11' }
    ],
  },
  {
    id: 'WF-30522',
    customerName: 'Đỗ Hữu Nghĩa',
    customerPhone: '0945 889 012',
    customerEmail: 'nghia.do@company.vn',
    tourName: 'Phú Quốc - Hoàng hôn Sunset Sanato & Lặn san hô',
    location: 'Kiên Giang',
    departureDate: '10/12/2026',
    duration: '3 ngày 2 đêm',
    guests: '2 người lớn',
    totalAmount: '5.690.000 đ',
    totalAmountRaw: 5690000,
    bookingStatus: 'PENDING',
    paymentStatus: 'PAYMENT_PENDING',
    paymentMethod: 'VNPAY',
    transactionId: 'PENDING_9921',
    assignedStaff: null,
    createdAt: '2026-11-20T10:40:00',
    waitingTimeMinutes: 20,
    isSlaBreached: false,
    staffNotes: [],
  },
  {
    id: 'WF-29811',
    customerName: 'Vũ Thanh Hằng',
    customerPhone: '0918 334 556',
    customerEmail: 'hang.vu@gmail.com',
    tourName: 'Khám phá Vịnh Hạ Long - Đảo Ti Tốp & Hang Sửng Sốt',
    location: 'Quảng Ninh',
    departureDate: '26/11/2026',
    duration: '3 ngày 2 đêm',
    guests: '1 người lớn',
    totalAmount: '1.450.000 đ',
    totalAmountRaw: 1450000,
    bookingStatus: 'CANCELLED',
    paymentStatus: 'REFUNDED',
    paymentMethod: 'MOMO',
    transactionId: 'MOMO_REF_3910',
    assignedStaff: 'Chị Lan (NV Chăm sóc KH)',
    assignedStaffId: 'staff-01',
    createdAt: '2026-11-17T09:10:00',
    waitingTimeMinutes: 0,
    isSlaBreached: false,
    staffNotes: [
      { id: 1, staff: 'Chị Lan', note: 'Khách bận lịch công tác đột xuất nên hủy trước 7 ngày. Đã xác nhận hoàn tiền toàn phần qua MoMo theo chính sách.', time: '17/11' }
    ],
  },
];

// Top tour bán chạy
const TOP_TOURS = [
  {
    id: 1,
    name: 'Khám phá Vịnh Hạ Long - Đảo Ti Tốp & Hang Sửng Sốt',
    location: 'Quảng Ninh',
    duration: '3 ngày 2 đêm',
    price: '2.847.000 đ',
    bookedCount: 48,
    revenue: '136.656.000 đ',
    isActive: true,
  },
  {
    id: 2,
    name: 'Chinh phục Sapa - Ruộng bậc thang & Đỉnh Fansipan',
    location: 'Lào Cai',
    duration: '4 ngày 3 đêm',
    price: '3.520.000 đ',
    bookedCount: 34,
    revenue: '119.680.000 đ',
    isActive: true,
  },
  {
    id: 3,
    name: 'Đà Nẵng - Bán đảo Sơn Trà & Phố cổ Hội An',
    location: 'Đà Nẵng - Quảng Nam',
    duration: '4 ngày 3 đêm',
    price: '4.150.000 đ',
    bookedCount: 26,
    revenue: '107.900.000 đ',
    isActive: true,
  },
  {
    id: 4,
    name: 'Phú Quốc - Hoàng hôn Sunset Sanato & Lặn san hô',
    location: 'Kiên Giang',
    duration: '3 ngày 2 đêm',
    price: '3.850.000 đ',
    bookedCount: 22,
    revenue: '84.700.000 đ',
    isActive: true,
  },
];

// Dữ liệu biểu đồ doanh thu 7 ngày qua
// Sử dụng các màu chuẩn theo prompt: bay-700, turmeric-500, moss-500, stone-400
const REVENUE_CHART_DATA = [
  { day: 'Thứ 2', date: '14/11', revenue: 18450000, bookings: 7, formatted: '18.450.000 đ' },
  { day: 'Thứ 3', date: '15/11', revenue: 24800000, bookings: 9, formatted: '24.800.000 đ' },
  { day: 'Thứ 4', date: '16/11', revenue: 21300000, bookings: 8, formatted: '21.300.000 đ' },
  { day: 'Thứ 5', date: '17/11', revenue: 29650000, bookings: 11, formatted: '29.650.000 đ' },
  { day: 'Thứ 6', date: '18/11', revenue: 38200000, bookings: 14, formatted: '38.200.000 đ' },
  { day: 'Thứ 7', date: '19/11', revenue: 42100000, bookings: 16, formatted: '42.100.000 đ' },
  { day: 'Chủ nhật', date: '20/11', revenue: 31950000, bookings: 12, formatted: '31.950.000 đ' },
];

export default function AdminOverviewPage() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [selectedTab, setSelectedTab] = useState('ALL'); // ALL, SLA_ALERT, PENDING, PAID
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState('7_DAYS'); // TODAY, 7_DAYS, 30_DAYS, ALL_TIME

  // Modal xem chi tiết booking & xác nhận thu hồi
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [bookingToRevoke, setBookingToRevoke] = useState(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState(null);

  // Thống kê số lượng
  const totalRevenue = '186.450.000 đ';
  const totalBookingsCount = 142;
  const poolCount = bookings.filter((b) => b.assignedStaff === null).length;
  const slaAlertList = bookings.filter((b) => b.isSlaBreached && b.assignedStaff === null);
  const slaAlertCount = slaAlertList.length;

  // Xử lý thu hồi booking theo đặc tả Wayfare
  // "Admin: thu hồi booking đưa assigned_staff_id về NULL để quay lại pool cho nhân viên khác nhận"
  const handleRevokeBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            assignedStaff: null,
            assignedStaffId: null,
            bookingStatus: 'PENDING',
            staffNotes: [
              ...b.staffNotes,
              {
                id: Date.now(),
                staff: 'Admin',
                note: 'Quản trị viên đã thu hồi booking. Đơn đã được chuyển lại về Pool tiếp nhận.',
                time: 'Vừa xong',
              },
            ],
          };
        }
        return b;
      })
    );

    setRevokeModalOpen(false);
    setBookingToRevoke(null);
    if (selectedBooking?.id === bookingId) {
      setSelectedBooking(null);
    }

    setActionSuccessMessage(`Đã thu hồi booking #${bookingId} thành công. Đơn đã trở lại Pool chờ xử lý.`);
    setTimeout(() => {
      setActionSuccessMessage(null);
    }, 5000);
  };

  // Filtered bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      // Tab filter
      if (selectedTab === 'SLA_ALERT' && (!b.isSlaBreached || b.assignedStaff !== null)) {
        return false;
      }
      if (selectedTab === 'PENDING' && b.bookingStatus !== 'PENDING') {
        return false;
      }
      if (selectedTab === 'PAID' && b.paymentStatus !== 'PAID') {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchId = b.id.toLowerCase().includes(query);
        const matchName = b.customerName.toLowerCase().includes(query);
        const matchPhone = b.customerPhone.toLowerCase().includes(query);
        const matchTour = b.tourName.toLowerCase().includes(query);
        return matchId || matchName || matchPhone || matchTour;
      }

      return true;
    });
  }, [bookings, selectedTab, searchQuery]);

  // Badge components following exact color and icon specification
  const renderBookingStatusBadge = (status) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-700">
            <Clock size={14} weight="regular" />
            Chờ tiếp nhận
          </span>
        );
      case 'CONTACTING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-bay-100 text-bay-800">
            <PhoneCall size={14} weight="fill" />
            Đang liên hệ
          </span>
        );
      case 'CONFIRMED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-moss-100 text-moss-700">
            <CheckCircle size={14} weight="fill" />
            Đã xác nhận
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-lantern-100 text-lantern-700">
            <XCircle size={14} weight="fill" />
            Từ chối
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-600">
            <Prohibit size={14} weight="regular" />
            Đã hủy
          </span>
        );
      default:
        return <span className="text-xs text-stone-600">{status}</span>;
    }
  };

  const renderPaymentStatusBadge = (status, method) => {
    switch (status) {
      case 'PAID':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-moss-100 text-moss-700">
            <CheckCircle size={14} weight="bold" />
            Đã thanh toán {method && `(${method})`}
          </span>
        );
      case 'PAYMENT_PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-turmeric-100 text-turmeric-700">
            <HourglassMedium size={14} weight="bold" />
            Chờ thanh toán
          </span>
        );
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-700">
            <CreditCard size={14} weight="regular" />
            Chưa thanh toán
          </span>
        );
      case 'REFUND_PENDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-turmeric-100 text-turmeric-700">
            <ArrowsClockwise size={14} weight="bold" />
            Chờ hoàn tiền
          </span>
        );
      case 'REFUNDED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-bay-100 text-bay-800">
            <ArrowUUpLeft size={14} weight="bold" />
            Đã hoàn tiền
          </span>
        );
      default:
        return <span className="text-xs text-stone-600">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Action Success Toast Banner */}
      {actionSuccessMessage && (
        <div className="p-4 bg-moss-100 border border-moss-500/30 text-moss-700 rounded-2xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <CheckCircle size={20} weight="fill" className="shrink-0" />
            <p className="text-sm font-medium">{actionSuccessMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setActionSuccessMessage(null)}
            className="text-moss-700 hover:text-moss-900 p-1"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* 1. Header & Controls */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-heading font-bold text-ink tracking-tight">
              Tổng quan hoạt động
            </h2>
            <span className="bg-bay-50 text-bay-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-bay-200">
              Cập nhật tức thời
            </span>
          </div>
          <p className="text-sm text-stone-600 mt-1">
            Số liệu thống kê doanh thu bán tour, dòng tiền cổng VNPay/MoMo và cảnh báo tiếp nhận.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Time range selector */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-medium">
            <button
              type="button"
              onClick={() => setTimeFilter('TODAY')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeFilter === 'TODAY'
                  ? 'bg-white text-ink font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-ink'
              }`}
            >
              Hôm nay
            </button>
            <button
              type="button"
              onClick={() => setTimeFilter('7_DAYS')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeFilter === '7_DAYS'
                  ? 'bg-white text-ink font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-ink'
              }`}
            >
              7 ngày qua
            </button>
            <button
              type="button"
              onClick={() => setTimeFilter('30_DAYS')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeFilter === '30_DAYS'
                  ? 'bg-white text-ink font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-ink'
              }`}
            >
              Tháng này
            </button>
          </div>
        </div>
      </div>

      {/* 2. SLA Warning Banner (Nổi bật theo đúng đặc tả: booking chưa ai nhận quá 2 giờ) */}
      {slaAlertCount > 0 && (
        <div className="bg-lantern-100 border border-lantern-600/30 rounded-2xl p-5 text-lantern-700 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-lantern-600 text-white rounded-xl shrink-0 mt-0.5">
              <WarningCircle size={24} weight="fill" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-base text-lantern-700 leading-tight">
                  Cảnh báo SLA: Có {slaAlertCount} booking chờ tiếp nhận quá 2 giờ!
                </h3>
                <span className="text-xs font-mono font-bold bg-lantern-600 text-white px-2 py-0.5 rounded-full">
                  KHẨN
                </span>
              </div>
              <p className="text-xs text-lantern-700/90 mt-1 leading-relaxed">
                Hệ thống phát hiện các đơn chưa có nhân viên nhận xử lý quá thời gian quy định (120 phút).
                Quản trị viên có thể theo dõi và thực hiện điều phối phân công.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => setSelectedTab('SLA_ALERT')}
              className="w-full md:w-auto px-4 py-2 rounded-xl bg-lantern-600 text-white font-medium text-xs hover:bg-lantern-700 active:scale-[0.98] transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>Xem {slaAlertCount} đơn trễ SLA</span>
              <CaretRight size={14} weight="bold" />
            </button>
          </div>
        </div>
      )}

      {/* 3. 4 Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Doanh thu */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-600">Tổng doanh thu</span>
            <div className="w-9 h-9 rounded-xl bg-bay-50 text-bay-700 flex items-center justify-center border border-bay-100">
              <CurrencyDollarSimple size={20} weight="bold" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-mono font-bold text-ink tracking-tight">
              {totalRevenue}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center text-[11px] font-semibold text-moss-700 bg-moss-100 px-2 py-0.5 rounded-full">
                +14.8%
              </span>
              <span className="text-[11px] text-stone-500">so với 7 ngày trước</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
            Qua VNPay (64%) & MoMo (36%)
          </div>
        </div>

        {/* Tổng booking */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-600">Tổng số booking</span>
            <div className="w-9 h-9 rounded-xl bg-bay-50 text-bay-700 flex items-center justify-center border border-bay-100">
              <Ticket size={20} weight="bold" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-mono font-bold text-ink tracking-tight">
              {totalBookingsCount} <span className="text-sm font-sans font-normal text-stone-500">đơn</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-flex items-center text-[11px] font-semibold text-moss-700 bg-moss-100 px-2 py-0.5 rounded-full">
                +8.2%
              </span>
              <span className="text-[11px] text-stone-500">128 hoàn tất</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500 flex justify-between">
            <span>8 đang liên hệ</span>
            <span className="text-stone-400">6 đã hủy</span>
          </div>
        </div>

        {/* Pool booking chưa ai nhận */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-600">Pool chưa tiếp nhận</span>
            <div className="w-9 h-9 rounded-xl bg-turmeric-100 text-turmeric-700 flex items-center justify-center border border-turmeric-500/20">
              <Clock size={20} weight="bold" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-mono font-bold text-ink tracking-tight">
              {poolCount} <span className="text-sm font-sans font-normal text-stone-500">đơn chờ</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              {slaAlertCount > 0 ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-lantern-700 bg-lantern-100 px-2 py-0.5 rounded-full">
                  <WarningCircle size={12} weight="fill" />
                  {slaAlertCount} đơn quá hạn 2h
                </span>
              ) : (
                <span className="text-[11px] text-moss-700 bg-moss-100 px-2 py-0.5 rounded-full">
                  Đúng tiến độ SLA
                </span>
              )}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
            Chờ nhân viên bấm "Nhận xử lý"
          </div>
        </div>

        {/* Tour & Nhân viên (Quy tắc xóa mềm) */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-600">Trạng thái vận hành</span>
            <div className="w-9 h-9 rounded-xl bg-moss-100 text-moss-700 flex items-center justify-center border border-moss-500/20">
              <ShieldCheck size={20} weight="bold" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-base font-semibold text-ink flex items-center justify-between">
              <span>Tour hoạt động:</span>
              <span className="font-mono text-bay-700 font-bold">18 / 20</span>
            </div>
            <div className="text-base font-semibold text-ink flex items-center justify-between mt-1.5">
              <span>Nhân sự trực:</span>
              <span className="font-mono text-bay-700 font-bold">8 / 9</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
            2 tour & 1 staff đang ngừng hoạt động
          </div>
        </div>
      </div>

      {/* 4. Thống kê Doanh thu 7 ngày (Biểu đồ SVG) & Tour bán chạy nhất */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Biểu đồ Doanh thu (7 cột) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-bold text-base text-ink">
                  Doanh thu tuần qua (14/11 - 20/11)
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Ghi nhãn trực tiếp trên biểu đồ, số tiền hiển thị font tabular
                </p>
              </div>

              {/* Legend trực quan */}
              <div className="flex items-center gap-3 text-xs font-medium">
                <div className="flex items-center gap-1.5 text-stone-600">
                  <span className="w-3 h-3 rounded-sm bg-bay-700 inline-block"></span>
                  <span>Doanh thu VNĐ</span>
                </div>
                <div className="flex items-center gap-1.5 text-stone-600">
                  <span className="w-3 h-3 rounded-sm bg-turmeric-500 inline-block"></span>
                  <span>Đỉnh điểm</span>
                </div>
              </div>
            </div>

            {/* Custom SVG Column Chart with direct labels and no heavy external lib */}
            <div className="mt-6 pt-4 border-t border-stone-100">
              <div className="h-56 flex items-end justify-between gap-2 sm:gap-4 px-2">
                {REVENUE_CHART_DATA.map((item) => {
                  const maxRevenue = 45000000;
                  const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
                  const isHighest = item.day === 'Thứ 7';

                  return (
                    <div
                      key={item.day}
                      className="flex-1 flex flex-col items-center h-full justify-end group relative"
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-ink text-white text-[10px] px-2.5 py-1.5 rounded-lg pointer-events-none whitespace-nowrap z-20 shadow-md font-mono">
                        <p className="font-semibold">{item.formatted}</p>
                        <p className="text-stone-300 font-sans">{item.bookings} booking</p>
                      </div>

                      {/* Direct label on chart bar */}
                      <span className="text-[10px] font-mono text-stone-500 mb-1.5 hidden sm:block">
                        {(item.revenue / 1000000).toFixed(1)}Tr
                      </span>

                      {/* Bar */}
                      <div className="w-full max-w-[42px] bg-stone-100 rounded-t-lg overflow-hidden flex flex-col justify-end relative h-40">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t-lg transition-all duration-500 ${
                            isHighest
                              ? 'bg-turmeric-500 group-hover:bg-turmeric-600'
                              : 'bg-bay-700 group-hover:bg-bay-800'
                          }`}
                        />
                      </div>

                      {/* X Axis Label */}
                      <span className="text-[11px] font-medium text-stone-600 mt-2">
                        {item.day}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {item.date}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Payment method breakdown bar */}
          <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <span className="text-stone-500">Đối soát cổng thanh toán:</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-bay-700"></span>
                <span className="font-semibold text-ink">VNPay:</span>
                <span className="font-mono text-stone-600">119.328.000 đ (64%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-moss-500"></span>
                <span className="font-semibold text-ink">MoMo:</span>
                <span className="font-mono text-stone-600">67.122.000 đ (36%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top tour bán chạy (5 cột) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-bold text-base text-ink">
                  Tour bán chạy nhất
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Xếp theo số lượng khách và doanh thu thực nhận
                </p>
              </div>
              <Link
                to="/admin/tours"
                className="text-xs font-medium text-bay-700 hover:text-bay-600 flex items-center gap-1"
              >
                Tất cả tour <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>

            <div className="divide-y divide-stone-100">
              {TOP_TOURS.map((tour, idx) => (
                <div key={tour.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono font-bold text-xs text-stone-400 w-4">
                      0{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-ink truncate leading-tight">
                        {tour.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={12} />
                          {tour.location}
                        </span>
                        <span>•</span>
                        <span>{tour.bookedCount} khách</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono font-bold text-bay-900">
                      {tour.revenue}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-moss-700 bg-moss-100 px-2 py-0.5 rounded-full mt-1">
                      <CheckCircle size={10} weight="fill" />
                      Đang hoạt động
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Áp dụng quy tắc "Chỉ xóa mềm"</span>
            <span className="text-[11px] text-bay-700 font-medium">Không bao giờ xóa cứng</span>
          </div>
        </div>
      </div>

      {/* 5. High-Density Admin Table: Danh sách Booking mới nhất */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        {/* Table Top Controls & Tabs */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setSelectedTab('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 ${
                selectedTab === 'ALL'
                  ? 'bg-bay-700 text-white font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Tất cả booking ({bookings.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab('SLA_ALERT')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                selectedTab === 'SLA_ALERT'
                  ? 'bg-lantern-600 text-white font-semibold'
                  : 'bg-lantern-100 text-lantern-700 hover:bg-lantern-200'
              }`}
            >
              <WarningCircle size={14} weight="fill" />
              Cảnh báo SLA ({slaAlertCount})
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab('PENDING')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 ${
                selectedTab === 'PENDING'
                  ? 'bg-bay-700 text-white font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Chờ tiếp nhận ({poolCount})
            </button>
            <button
              type="button"
              onClick={() => setSelectedTab('PAID')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 ${
                selectedTab === 'PAID'
                  ? 'bg-bay-700 text-white font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Đã thanh toán (5)
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <MagnifyingGlass
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm mã đơn, tên, số điện thoại..."
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-bay-500/30 focus:border-bay-600 transition-all placeholder:text-stone-400"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* The 1px Border Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-[11px] font-semibold text-stone-600 uppercase tracking-wider">
                <th className="py-3 px-4">Mã đơn</th>
                <th className="py-3 px-4">Khách hàng</th>
                <th className="py-3 px-4">Tour & Ngày đi</th>
                <th className="py-3 px-4">Tổng tiền</th>
                <th className="py-3 px-4">Trạng thái booking</th>
                <th className="py-3 px-4">Thanh toán</th>
                <th className="py-3 px-4">Nhân viên tiếp nhận</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 text-xs">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-stone-500">
                    <p className="text-sm font-medium">Không tìm thấy booking nào phù hợp</p>
                    <p className="text-xs text-stone-400 mt-1">
                      Hãy thử đổi từ khóa tìm kiếm hoặc chọn bộ lọc khác.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr
                    key={b.id}
                    className={`hover:bg-stone-50/80 transition-colors ${
                      b.isSlaBreached && b.assignedStaff === null ? 'bg-lantern-100/20' : ''
                    }`}
                  >
                    {/* Mã đơn */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-xs text-bay-900 bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                          #{b.id}
                        </span>
                        {b.isSlaBreached && b.assignedStaff === null && (
                          <span
                            title="Quá hạn tiếp nhận 2 giờ"
                            className="text-lantern-600 shrink-0"
                          >
                            <WarningCircle size={16} weight="fill" />
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Khách hàng */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-ink">{b.customerName}</div>
                      <div className="text-[11px] font-mono text-stone-500 mt-0.5">
                        {b.customerPhone}
                      </div>
                    </td>

                    {/* Tour & Ngày đi */}
                    <td className="py-3 px-4 max-w-xs">
                      <div className="truncate font-medium text-stone-800" title={b.tourName}>
                        {b.tourName}
                      </div>
                      <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                        <span className="inline-flex items-center gap-1">
                          <CalendarBlank size={12} />
                          {b.departureDate}
                        </span>
                        <span>•</span>
                        <span>{b.guests}</span>
                      </div>
                    </td>

                    {/* Tổng tiền */}
                    <td className="py-3 px-4 font-mono font-bold text-ink whitespace-nowrap">
                      {b.totalAmount}
                    </td>

                    {/* Trạng thái Booking */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      {renderBookingStatusBadge(b.bookingStatus)}
                    </td>

                    {/* Thanh toán */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      {renderPaymentStatusBadge(b.paymentStatus, b.paymentMethod)}
                    </td>

                    {/* Nhân viên tiếp nhận */}
                    <td className="py-3 px-4">
                      {b.assignedStaff ? (
                        <div className="text-xs text-stone-700 font-medium flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-bay-600"></span>
                          <span>{b.assignedStaff}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-stone-400 italic">
                            Chưa có người nhận
                          </span>
                          {b.isSlaBreached ? (
                            <span className="text-[11px] font-semibold text-lantern-700 mt-0.5 inline-flex items-center gap-1">
                              <WarningCircle size={12} weight="fill" />
                              Chờ {Math.floor(b.waitingTimeMinutes / 60)}h{b.waitingTimeMinutes % 60}p (SLA trễ)
                            </span>
                          ) : (
                            <span className="text-[10px] text-stone-400 mt-0.5">
                              Chờ {b.waitingTimeMinutes} phút
                            </span>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Thao tác */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Chi tiết */}
                        <button
                          type="button"
                          onClick={() => setSelectedBooking(b)}
                          className="px-2.5 py-1.5 rounded-lg text-bay-700 hover:bg-bay-50 font-medium text-xs flex items-center gap-1 transition-colors border border-transparent hover:border-bay-200"
                        >
                          <Eye size={14} />
                          <span>Chi tiết</span>
                        </button>

                        {/* Thu hồi booking (nếu đã có staff nhận) */}
                        {b.assignedStaff && (
                          <button
                            type="button"
                            onClick={() => {
                              setBookingToRevoke(b);
                              setRevokeModalOpen(true);
                            }}
                            className="px-2.5 py-1.5 rounded-lg text-lantern-700 hover:bg-lantern-100 font-medium text-xs flex items-center gap-1 transition-colors border border-lantern-600/30"
                            title="Thu hồi booking về Pool chưa nhận"
                          >
                            <ArrowCounterClockwise size={14} />
                            <span>Thu hồi</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <div>
            Hiển thị <span className="font-semibold text-ink">{filteredBookings.length}</span> trên tổng số{' '}
            <span className="font-semibold text-ink">{bookings.length}</span> booking
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-stone-400">
              Chế độ Admin: Quyền chỉ đọc booking & thu hồi điều phối
            </span>
          </div>
        </div>
      </div>

      {/* ================= MODAL XEM CHI TIẾT BOOKING ================= */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedBooking(null)}
            aria-hidden="true"
          />

          <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl z-10 border border-stone-200 overflow-y-auto max-h-[90vh]">
            {/* Header Modal */}
            <div className="flex items-start justify-between pb-4 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono font-bold text-base text-bay-900 bg-stone-100 px-3 py-1 rounded-lg">
                    #{selectedBooking.id}
                  </span>
                  {renderBookingStatusBadge(selectedBooking.bookingStatus)}
                  {renderPaymentStatusBadge(selectedBooking.paymentStatus, selectedBooking.paymentMethod)}
                </div>
                <h3 className="text-xl font-heading font-bold text-ink mt-2">
                  {selectedBooking.tourName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="text-stone-400 hover:text-stone-600 p-1.5 rounded-xl hover:bg-stone-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-5 space-y-6">
              {/* Thông tin khách hàng & Chuyến đi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div>
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    Khách hàng
                  </h4>
                  <p className="text-sm font-bold text-ink">{selectedBooking.customerName}</p>
                  <p className="text-xs font-mono text-stone-600 mt-1">SĐT: {selectedBooking.customerPhone}</p>
                  <p className="text-xs text-stone-500 mt-0.5">Email: {selectedBooking.customerEmail}</p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                    Lịch trình & Chi phí
                  </h4>
                  <p className="text-xs text-stone-700">Khởi hành: <span className="font-semibold text-ink">{selectedBooking.departureDate}</span></p>
                  <p className="text-xs text-stone-700 mt-1">Thời lượng: <span className="font-semibold text-ink">{selectedBooking.duration}</span></p>
                  <p className="text-xs text-stone-700 mt-1">Số lượng khách: <span className="font-semibold text-ink">{selectedBooking.guests}</span></p>
                  <p className="text-xs text-stone-700 mt-1.5">
                    Tổng tiền: <span className="font-mono font-bold text-sm text-bay-700">{selectedBooking.totalAmount}</span>
                  </p>
                </div>
              </div>

              {/* Thông tin giao dịch đối soát IPN */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200">
                <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Chứng từ thanh toán cổng {selectedBooking.paymentMethod}</span>
                  <span className="text-[10px] text-moss-700 bg-moss-100 px-2 py-0.5 rounded-full font-bold">
                    IPN ĐÃ XÁC THỰC
                  </span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-500">Mã giao dịch (Idempotent):</span>
                    <p className="font-mono font-semibold text-ink mt-0.5">{selectedBooking.transactionId}</p>
                  </div>
                  <div>
                    <span className="text-stone-500">Thời gian tạo:</span>
                    <p className="font-mono text-stone-700 mt-0.5">
                      {new Date(selectedBooking.createdAt).toLocaleString('vi-VN')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Nhân viên phụ trách & Ghi chú nội bộ (Chỉ đọc) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Nhân viên & Ghi chú nội bộ
                  </h4>
                  <span className="text-[11px] text-stone-500 italic">
                    (Admin quyền chỉ đọc • Khách hàng không thấy)
                  </span>
                </div>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <span className="text-xs text-stone-600">Nhân viên tiếp nhận:</span>
                    {selectedBooking.assignedStaff ? (
                      <span className="text-xs font-bold text-bay-800 bg-bay-100 px-2.5 py-1 rounded-lg">
                        {selectedBooking.assignedStaff}
                      </span>
                    ) : (
                      <span className="text-xs font-semibold text-stone-400 italic">
                        Chưa có người nhận (Đang trong Pool)
                      </span>
                    )}
                  </div>

                  {/* Lịch sử ghi chú */}
                  <div className="space-y-2">
                    <span className="text-xs text-stone-500 block">Lịch sử xử lý:</span>
                    {selectedBooking.staffNotes.length === 0 ? (
                      <p className="text-xs text-stone-400 italic">Chưa có ghi chú nào từ nhân viên.</p>
                    ) : (
                      selectedBooking.staffNotes.map((note) => (
                        <div key={note.id} className="p-3 bg-white rounded-xl border border-stone-200 text-xs">
                          <div className="flex items-center justify-between text-stone-500 text-[11px] mb-1">
                            <span className="font-semibold text-ink">{note.staff}</span>
                            <span className="font-mono">{note.time}</span>
                          </div>
                          <p className="text-stone-700 leading-relaxed">{note.note}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-50 transition-colors"
              >
                Đóng
              </button>

              {selectedBooking.assignedStaff && (
                <button
                  type="button"
                  onClick={() => {
                    setBookingToRevoke(selectedBooking);
                    setRevokeModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-lantern-600 text-lantern-700 text-xs font-medium hover:bg-lantern-100 active:scale-[0.98] transition-all flex items-center gap-1.5"
                >
                  <ArrowCounterClockwise size={16} />
                  <span>Thu hồi booking này</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL XÁC NHẬN THU HỒI BOOKING ================= */}
      {revokeModalOpen && bookingToRevoke && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity"
            onClick={() => setRevokeModalOpen(false)}
            aria-hidden="true"
          />

          <div className="relative bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl z-10 border border-stone-200">
            <div className="w-12 h-12 rounded-2xl bg-lantern-100 text-lantern-700 flex items-center justify-center mb-4 border border-lantern-600/20">
              <ArrowCounterClockwise size={24} weight="bold" />
            </div>

            <h3 className="text-lg font-heading font-bold text-ink">
              Thu hồi booking #{bookingToRevoke.id}?
            </h3>

            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Theo quy định hệ thống, khi thu hồi booking:
            </p>

            <ul className="mt-2 space-y-1.5 text-xs text-stone-600 list-disc list-inside bg-stone-50 p-3 rounded-xl border border-stone-200">
              <li>Mã nhân viên phụ trách (<span className="font-semibold text-ink">{bookingToRevoke.assignedStaff}</span>) sẽ bị hủy gán.</li>
              <li>Booking sẽ được đưa về lại <strong>Pool chưa có người nhận</strong> để các nhân viên khác claim.</li>
              <li>Lịch sử ghi chú nội bộ vẫn được giữ nguyên đầy đủ.</li>
            </ul>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setRevokeModalOpen(false);
                  setBookingToRevoke(null);
                }}
                className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-medium hover:bg-stone-50 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={() => handleRevokeBooking(bookingToRevoke.id)}
                className="px-4 py-2.5 rounded-xl bg-lantern-600 text-white text-xs font-semibold hover:bg-lantern-700 active:scale-[0.98] transition-all shadow-sm"
              >
                Xác nhận thu hồi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
