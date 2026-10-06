import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoogleLogo, UserPlus } from '@phosphor-icons/react';
import Button from '../components/Button';
import Input from '../components/Input';
import AuthLayout from '../layouts/AuthLayout';
import useRegister from '../hooks/useRegister';
import Alert from '../components/Alert';

export default function RegisterPage() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const { form, message, error, loading, handleChange, handleSubmit } = useRegister();
  const [submitCount, setSubmitCount] = React.useState(0);

  const onFormSubmit = (e) => {
    setSubmitCount(c => c + 1);
    handleSubmit(e);
  };

  return (
    <AuthLayout
      title="Đăng ký tài khoản"
      imageSrc="https://picsum.photos/seed/wayfare-register/1200/1600"
      imageTitle="Bắt đầu hành trình của riêng bạn."
      imageSubtitle="Sapa, Việt Nam"
    >
      <motion.form variants={fadeUpVariant} className="space-y-3" onSubmit={onFormSubmit}>

        {error && (
          <Alert key={`err-${submitCount}`} variant="error" className="mb-4">
            {error}
          </Alert>
        )}

        {message && (
          <Alert key={`msg-${submitCount}`} variant="success" className="mb-4">
            {message}
          </Alert>
        )}

        <Input
          id="name"
          name="name"
          type="text"
          label="Họ và tên"
          placeholder="Nguyễn Văn A"
          value={form.name}
          onChange={handleChange}
          required
        />

        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="ten@wayfare.vn"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className="flex flex-col md:flex-row gap-3">
          <Input
            id="phone"
            name="phone"
            type="tel"
            label="Số điện thoại"
            placeholder="0912 345 678"
            className="w-full"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <Input
            id="dob"
            name="dob"
            type="date"
            label="Ngày sinh"
            className="w-full"
            value={form.dob}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          id="password"
          name="password"
          type="password"
          label="Mật khẩu"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          required
        />

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Xác nhận mật khẩu"
          placeholder="••••••••"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <div className="flex items-start gap-2 py-1">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            checked={form.agreeTerms}
            onChange={handleChange}
            className="mt-1 w-4 h-4 rounded border-stone-400 text-bay-700 focus:ring-bay-500/30 cursor-pointer"
          />
          <label htmlFor="agreeTerms" className="text-sm text-stone-600 cursor-pointer select-none">
            Bằng việc đăng ký, bạn đồng ý với <a href="#" className="font-semibold text-bay-700 hover:underline">Điều khoản dịch vụ</a> và <a href="#" className="font-semibold text-bay-700 hover:underline">Chính sách bảo mật</a> của chúng tôi.
          </label>
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full" icon={UserPlus} loading={loading}>
            Đăng ký
          </Button>
        </div>
      </motion.form>

      <motion.div variants={fadeUpVariant} className="mt-4 pt-4 border-t border-stone-200">
        <Button variant="secondary" className="w-full" icon={GoogleLogo} disabled={loading}>
          Tiếp tục với Google
        </Button>
      </motion.div>

      <motion.div variants={fadeUpVariant} className="mt-4 text-center">
        <p className="text-sm text-stone-600">
          Đã có tài khoản?{' '}
          <Link to="/login" className="font-semibold text-bay-700 hover:underline hover:text-bay-600 transition-colors">
            Đăng nhập ngay
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
