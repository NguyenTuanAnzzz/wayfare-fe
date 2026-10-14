import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import useUpdateUser from '../hooks/useUpdateUser';
import Alert from '../components/Alert';

export default function ProfilePage() {
  const { user } = useAuth();
  const { form, error, loading, handleChange, handleSubmit } = useUpdateUser();
  const [submitCount, setSubmitCount] = useState(0);

  const onFormSubmit = (e) => {
    setSubmitCount(c => c + 1);
    handleSubmit(e);
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-6">
      {error && (
        <Alert key={`err-${submitCount}`} variant="error" className="mb-4">
          {error}
        </Alert>
      )}
      <div>
        <h2 className="text-xl font-heading font-bold text-ink">Hồ sơ cá nhân</h2>
        <p className="text-sm text-stone-600 mt-1">
          Cập nhật thông tin chính xác để thuận tiện cho việc làm thủ tục đặt tour và bảo hiểm du lịch.
        </p>
      </div>

      <form className="space-y-5" onSubmit={onFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input
            label="Họ và tên"
            id="name"
            value={form.name || ''}
            placeholder="Nhập họ và tên đầy đủ"
            name="name"
            onChange={handleChange}
          />

          <Input
            label="Địa chỉ Email"
            id="email"
            type="email"
            value={user?.email || ''}
            disabled
          />

          <Input
            label="Số điện thoại"
            id="phone"
            value={form.phone || ''}
            placeholder="0912483076"
            name="phone"
            onChange={handleChange}
          />

          <Input
            label="Ngày sinh"
            id="dob"
            type="date"
            value={form.dob ? String(form.dob).substring(0, 10) : ''}
            name="dob"
            onChange={handleChange}
          />
        </div>

        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <p className="text-xs text-stone-500">
            Email được cố định để xác thực bảo mật tài khoản.
          </p>
          <Button type="submit" variant="primary" className="px-6" loading={loading}>
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </div>
  );
}
