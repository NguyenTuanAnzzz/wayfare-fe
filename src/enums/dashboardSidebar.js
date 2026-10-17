export const ADMIN_SIDEBAR_ITEMS = [
  {
    key: 'overview',
    label: 'Tổng quan',
    description: 'Thống kê doanh thu & cảnh báo',
    path: '/admin',
    icon: 'SquaresFour',
  },
  {
    key: 'tours',
    label: 'Quản lý tour',
    description: 'CRUD tour, ảnh & lịch trình',
    path: '/admin/tours',
    icon: 'Compass',
  },
  {
    key: 'staff',
    label: 'Quản lý nhân viên',
    description: 'Tài khoản & phân quyền staff',
    path: '/admin/staff',
    icon: 'Users',
  },
  {
    key: 'bookings',
    label: 'Danh sách booking',
    description: 'Xem tất cả đơn & thu hồi',
    path: '/admin/bookings',
    icon: 'Ticket',
    badgeKey: 'pendingCount',
  },
  {
    key: 'transactions',
    label: 'Doanh thu & Giao dịch',
    description: 'Đối soát VNPay / MoMo',
    path: '/admin/transactions',
    icon: 'Receipt',
  },
  {
    key: 'sla-alerts',
    label: 'Cảnh báo SLA',
    description: 'Đơn treo quá 2 giờ',
    path: '/admin/sla-alerts',
    icon: 'WarningCircle',
    badgeKey: 'slaAlertCount',
    isAlert: true,
  },
];

export const STAFF_SIDEBAR_ITEMS = [
  {
    key: 'pool',
    label: 'Pool booking',
    description: 'Đơn chờ tiếp nhận xử lý',
    path: '/staff',
    icon: 'SquaresFour',
    badgeKey: 'pendingCount',
  },
  {
    key: 'my-bookings',
    label: 'Booking của tôi',
    description: 'Đơn đang chăm sóc & liên hệ',
    path: '/staff/my-bookings',
    icon: 'Ticket',
  },
];
