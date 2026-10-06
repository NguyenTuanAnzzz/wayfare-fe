import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoogleLogo, SignIn } from '@phosphor-icons/react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import AuthLayout from '../layouts/AuthLayout';
import useLogin from '../hooks/useLogin';
import Alert from '../components/Alert';

export default function LoginPage() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const { form, loading, error, handleChange, handleSubmit } = useLogin();
  const [submitCount, setSubmitCount] = useState(0);
  
  const location = useLocation();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');

  // Clear state so on refresh the message doesn't appear again
  useEffect(() => {
    if (location.state?.message) {
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const onFormSubmit = (e) => {
    setSuccessMessage(''); // clear on submit
    setSubmitCount(c => c + 1);
    handleSubmit(e);
  };
  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:8080/oauth2/authorization/google";
  };
  return (
    <AuthLayout
      title="Đăng nhập"
      imageSrc="https://picsum.photos/seed/wayfare-login/1200/1600"
      imageTitle="Khám phá vẻ đẹp đích thực của Việt Nam."
      imageSubtitle="Vịnh Hạ Long"
    >
      <motion.form variants={fadeUpVariant} className="space-y-3" onSubmit={onFormSubmit}>

        {successMessage && (
          <Alert variant="success">
            {successMessage}
          </Alert>
        )}

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
          value={form.email}
          name="email"
          onChange={handleChange}
        />

        <Input
          id="password"
          type="password"
          label="Mật khẩu"
          placeholder="••••••••"
          value={form.password}
          name="password"
          onChange={handleChange}
        />

        <div className="flex items-center justify-between pt-1 pb-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              name="rememberMe"
              checked={form.rememberMe}
              className="w-4 h-4 rounded border-stone-300 text-bay-600 focus:ring-bay-500 cursor-pointer transition-colors"
              onChange={handleChange}
            />
            <span className="text-sm text-stone-600 group-hover:text-stone-800 transition-colors">Ghi nhớ đăng nhập</span>
          </label>
          <Link to="/forgot-password" className="text-sm font-medium text-bay-700 hover:text-bay-600 hover:underline transition-colors">
            Quên mật khẩu?
          </Link>
        </div>

        <div className="pt-2">
          <Button type="submit" className="w-full" icon={SignIn} loading={loading} >
            Đăng nhập
          </Button>
        </div>
      </motion.form>

      <motion.div variants={fadeUpVariant} className="mt-5 pt-5 border-t border-stone-200">
        <Button variant="secondary" className="w-full" icon={GoogleLogo} onClick={handleGoogleLogin}>
          Tiếp tục với Google
        </Button>
      </motion.div>

      <motion.div variants={fadeUpVariant} className="mt-5 text-center">
        <p className="text-sm text-stone-600">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="font-semibold text-bay-700 hover:underline hover:text-bay-600 transition-colors">
            Đăng ký ngay
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
}
