import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

export default function SecurityPage() {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-heading font-bold text-ink">Bảo mật & Mật khẩu</h2>
        <p className="text-sm text-stone-600 mt-1">
          Đảm bảo tài khoản của bạn được an toàn bằng mật khẩu mạnh.
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-5 max-w-lg">
        <Input
          label="Mật khẩu hiện tại"
          id="currentPassword"
          type="password"
          placeholder="Nhập mật khẩu hiện tại"
        />

        <Input
          label="Mật khẩu mới"
          id="newPassword"
          type="password"
          placeholder="Tối thiểu 8 ký tự, gồm số và ký tự đặc biệt"
        />

        <Input
          label="Xác nhận mật khẩu mới"
          id="confirmNewPassword"
          type="password"
          placeholder="Nhập lại mật khẩu mới"
        />

        <div className="pt-4 border-t border-stone-100">
          <Button type="submit" variant="primary">
            Cập nhật mật khẩu
          </Button>
        </div>
      </form>
    </div>
  );
}
