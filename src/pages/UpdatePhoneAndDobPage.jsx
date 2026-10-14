import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import Alert from '../components/Alert';
import useUpdateUser from '../hooks/useUpdateUser';
import { useAuth } from '../contexts/AuthContext';

export default function UpdatePhoneAndDobPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { form, loading, error, handleChange, handleSubmit } = useUpdateUser();
  const [submitCount, setSubmitCount] = useState(0);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  // Nếu chưa đăng nhập -> chuyển về login; nếu đã có đủ phone và dob -> chuyển về trang chủ
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/login', { replace: true });
      } else if (user.phone && user.dob) {
        navigate('/', { replace: true });
      }
    }
  }, [user, authLoading, navigate]);

  const onFormSubmit = async (e) => {
    setSubmitCount((c) => c + 1);
    const result = await handleSubmit(e);
    if (result) {
      navigate('/', { replace: true });
    }
  };

  // Giới hạn ngày sinh tối đa (người dùng đủ 18 tuổi)
  const maxDob = new Date(new Date().setFullYear(new Date().getFullYear() - 18))
    .toISOString()
    .split('T')[0];

  return (
    <AuthLayout
      title="Bổ sung thông tin"
      imageSrc="https://picsum.photos/seed/wayfare-complete-profile/1200/1600"
      imageTitle="Hoàn tất hồ sơ để trải nghiệm trọn vẹn chuyến đi."
      imageSubtitle="Wayfare Journeys"
    >
      <motion.div variants={fadeUpVariant} className="mb-5">
        <p className="text-sm text-stone-600 leading-relaxed">
          Vui lòng bổ sung số điện thoại và ngày sinh của bạn để hoàn tất hồ sơ đặt tour và kích hoạt bảo hiểm du lịch.
        </p>
      </motion.div>

      <motion.form variants={fadeUpVariant} className="space-y-4" onSubmit={onFormSubmit}>
        {error && (
          <Alert key={`err-${submitCount}`} variant="error">
            {error}
          </Alert>
        )}

        <Input
          id="phone"
          name="phone"
          label="Số điện thoại"
          placeholder="0912345678"
          value={form.phone || ''}
          onChange={handleChange}
          required
        />

        <Input
          id="dob"
          name="dob"
          type="date"
          label="Ngày sinh"
          max={maxDob}
          value={form.dob ? String(form.dob).substring(0, 10) : ''}
          onChange={handleChange}
          required
        />

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full"
            icon={ArrowRight}
            loading={loading}
          >
            Lưu và tiếp tục
          </Button>
        </div>
      </motion.form>
    </AuthLayout>
  );
}
