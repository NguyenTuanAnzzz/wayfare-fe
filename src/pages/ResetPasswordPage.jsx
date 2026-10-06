import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Key, EnvelopeSimple } from '@phosphor-icons/react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import AuthLayout from '../layouts/AuthLayout';
import useResetPassword from '../hooks/useResetPassword';
import useResendResetPasswordOtp from '../hooks/useResendResetPasswordOtp';
import Alert from '../components/Alert';

export default function ResetPasswordPage() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const location = useLocation();
  
  const emailFromState = location.state?.email || "";

  const [expiresAt, setExpiresAt] = useState(
    location.state?.expiresAt || null
  );

  const [timeLeft, setTimeLeft] = useState(0);

  const { form, handleChange, resetPassword, loading, error } = useResetPassword();
  
  const { 
    setEmail: setResendEmail, 
    resendResetPasswordOtp, 
    loading: resendLoading, 
    error: resendError 
  } = useResendResetPasswordOtp();
  
  const [submitCount, setSubmitCount] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
      if (emailFromState) {
          handleChange({ target: { name: 'email', value: emailFromState } });
          setResendEmail(emailFromState);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailFromState]);

  useEffect(() => {
    if (!expiresAt) {
      setTimeLeft(0);
      return;
    }

    const updateTimeLeft = () => {
      const remaining = Math.max(
        0,
        Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 1000)
      );
      setTimeLeft(remaining);
    };

    updateTimeLeft();
    const timer = setInterval(updateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [expiresAt]);

  if (!emailFromState) {
      return <Navigate to="/forgot-password" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitCount(c => c + 1);
    setResendSuccess(false);
    try {
        await resetPassword();
    } catch {
        // Error handled by hook
    }
  };

  const handleResendOtp = async () => {
    setResendCount(c => c + 1);
    setResendSuccess(false);
    try {
        const result = await resendResetPasswordOtp();
        if (result && result.expiresAt) {
            setExpiresAt(result.expiresAt);
        }
        setResendSuccess(true);
    } catch {
        // Error handled by hook
    }
  };

  return (
    <AuthLayout
      title="Đặt lại mật khẩu"
      imageSrc="https://picsum.photos/seed/wayfare-reset/1200/1600"
      imageTitle="Bảo vệ tài khoản của bạn."
      imageSubtitle="An toàn và bảo mật"
    >
      <motion.div variants={fadeUpVariant} className="mb-6">
        <p className="text-stone-600 text-sm">
          Mã xác nhận (OTP) đã được gửi đến email <span className="font-semibold text-stone-800">{emailFromState}</span>. 
          Vui lòng kiểm tra email và nhập mã để đặt lại mật khẩu.
        </p>
      </motion.div>

      <motion.form variants={fadeUpVariant} className="space-y-4" onSubmit={handleSubmit}>
        {(error || resendError) && (
          <Alert key={`err-${submitCount}-${resendCount}`} variant="error">
            {error || resendError}
          </Alert>
        )}
        
        {resendSuccess && (
          <Alert variant="success">
            Mã OTP mới đã được gửi đến email của bạn!
          </Alert>
        )}

        <Input
          id="otp"
          type="text"
          label="Mã OTP"
          placeholder="Nhập mã OTP 6 số"
          value={form.otp}
          name="otp"
          onChange={handleChange}
        />

        <Input
          id="newPassword"
          type="password"
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          value={form.newPassword}
          name="newPassword"
          onChange={handleChange}
        />

        <div className="pt-2">
          <Button type="submit" className="w-full" icon={Key} loading={loading}>
            Đặt lại mật khẩu
          </Button>
        </div>
      </motion.form>

      <motion.div variants={fadeUpVariant} className="mt-6 text-center">
        <p className="text-sm text-stone-600">
          Chưa nhận được mã?{' '}
          <button 
            type="button"
            onClick={handleResendOtp}
            disabled={timeLeft > 0 || resendLoading}
            className={`font-semibold transition-colors inline-flex items-center gap-1 ${
              timeLeft > 0 || resendLoading
                ? 'text-stone-400 cursor-not-allowed'
                : 'text-bay-700 hover:underline hover:text-bay-600'
            }`}
          >
            <EnvelopeSimple weight="bold" />
            {resendLoading
              ? 'Đang gửi...'
              : timeLeft > 0
                ? `Gửi lại mã sau ${timeLeft}s`
                : 'Gửi lại mã'
            }
          </button>
        </p>
        <p className="text-sm text-stone-600 mt-2 border-t border-stone-200 pt-4">
          <Link to="/login" className="font-medium text-stone-500 hover:underline hover:text-stone-800 transition-colors">
            Quay lại Đăng nhập
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
