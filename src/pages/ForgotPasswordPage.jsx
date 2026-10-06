import { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeSimple } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import AuthLayout from '../layouts/AuthLayout';
import useForgotPassword from '../hooks/useForgotPassword';
import Alert from '../components/Alert';

export default function ForgotPasswordPage() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const { email, setEmail, forgotPassword, loading, error } = useForgotPassword();
  const [submitCount, setSubmitCount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitCount(c => c + 1);
    try {
        await forgotPassword();
    } catch {
        // Error is handled by the hook and displayed below
    }
  };

  return (
    <AuthLayout
      title="Quên mật khẩu"
      imageSrc="https://picsum.photos/seed/wayfare-forgot/1200/1600"
      imageTitle="Lấy lại quyền truy cập tài khoản của bạn."
      imageSubtitle="Bảo mật an toàn"
    >
      <motion.div variants={fadeUpVariant} className="mb-6">
        <p className="text-stone-600 text-sm">
          Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn mã OTP để đặt lại mật khẩu.
        </p>
      </motion.div>

      <motion.form variants={fadeUpVariant} className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <Alert key={`err-${submitCount}`} variant="error">
            {error}
          </Alert>
        )}
        
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="ten@wayfare.vn"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="pt-2">
          <Button type="submit" className="w-full" icon={EnvelopeSimple} loading={loading}>
            Gửi mã xác nhận
          </Button>
        </div>
      </motion.form>

      <motion.div variants={fadeUpVariant} className="mt-5 text-center">
        <p className="text-sm text-stone-600">
          Nhớ mật khẩu?{' '}
          <Link to="/login" className="font-semibold text-bay-700 hover:underline hover:text-bay-600 transition-colors">
            Đăng nhập
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
