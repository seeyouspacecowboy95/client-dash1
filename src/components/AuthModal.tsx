import React, { useState } from 'react';
import { X } from 'lucide-react';
import { validateCredentials } from '../utils/auth';
import ForgotPasswordForm from './ForgotPasswordForm';
import AccountNumberInput from './AccountNumberInput';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'signup';
  onLoginSuccess: (email: string) => void;
  onNewUserSignup: (email: string, name: string) => void;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  idNumber?: string;
  cellphone?: string;
  accountNumber?: string;
  password?: string;
  confirmPassword?: string;
}

const WelcomeMessage = () => (
  <div className="bg-theme/10 p-6 rounded-lg">
    <h3 className="text-xl font-bold text-theme mb-4">Welcome to Mohokare Municipality</h3>
    <p className="text-gray-800 mb-4">Access your municipal services with ease:</p>
    <ul className="space-y-2 text-gray-700">
      <li>✓ Check your municipal statement</li>
      <li>✓ Pay your account</li>
      <li>✓ Submit meter readings</li>
      <li>✓ Log queries online</li>
      <li>✓ Available 24/7 for your convenience</li>
    </ul>
  </div>
);

type View = 'login' | 'signup' | 'forgot-password';

export default function AuthModal({
  isOpen,
  onClose,
  initialView = 'login',
  onLoginSuccess,
  onNewUserSignup
}: AuthModalProps) {
  const [view, setView] = useState<View>(initialView);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    idNumber: '',
    cellphone: '',
    accountNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [isAccountValid, setIsAccountValid] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'fullName':
        return !value ? 'Full name is required' : '';
      case 'email':
        return !value
          ? 'Email is required'
          : !/\S+@\S+\.\S+/.test(value)
          ? 'Invalid email format'
          : '';
      case 'idNumber':
        return !value
          ? 'ID Number is required'
          : !/^\d{13}$/.test(value)
          ? 'ID Number must be exactly 13 digits'
          : '';
      case 'cellphone':
        return !value
          ? 'Cellphone number is required'
          : !/^\d{10}$/.test(value)
          ? 'Invalid cellphone number'
          : '';
      case 'accountNumber':
        return !value ? 'Account number is required' : !isAccountValid ? 'Invalid account number' : '';
      case 'password':
        return !value
          ? 'Password is required'
          : value.length < 8
          ? 'Password must be at least 8 characters'
          : '';
      case 'confirmPassword':
        return !value
          ? 'Please confirm your password'
          : value !== formData.password
          ? 'Passwords do not match'
          : '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'idNumber' && value.length > 13) return;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleAccountNumberChange = (value: string, isValid: boolean) => {
    setFormData(prev => ({ ...prev, accountNumber: value }));
    setIsAccountValid(isValid);
    setErrors(prev => ({
      ...prev,
      accountNumber: validateField('accountNumber', value)
    }));
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && isAccountValid) {
      onNewUserSignup(formData.email, formData.fullName);
      setView('login');
      setFormData({
        fullName: '',
        email: '',
        idNumber: '',
        cellphone: '',
        accountNumber: '',
        password: '',
        confirmPassword: ''
      });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (validateCredentials({ email: loginEmail, password: loginPassword })) {
      onLoginSuccess(loginEmail);
      onClose();
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleResetRequest = (email: string) => {
    console.log('Password reset requested for:', email);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {view === 'forgot-password' ? (
              <ForgotPasswordForm
                onBack={() => setView('login')}
                onResetRequest={handleResetRequest}
              />
            ) : view === 'login' ? (
              <>
                <h2 className="text-3xl font-bold text-gray-900">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-lg">
                      {loginError}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme focus:ring-theme"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-theme focus:ring-theme"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setView('forgot-password')}
                      className="text-theme hover:opacity-90 text-sm"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-theme text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Login
                  </button>
                  <p className="text-center text-gray-600">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setView('signup')}
                      className="text-theme hover:opacity-90"
                    >
                      Sign up
                    </button>
                  </p>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-gray-900">Sign Up</h2>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-theme focus:border-theme ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-theme focus:border-theme ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">ID Number</label>
                      <input
                        type="text"
                        name="idNumber"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-theme focus:border-theme ${
                          errors.idNumber ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your 13-digit ID number"
                        maxLength={13}
                      />
                      {errors.idNumber && (
                        <p className="mt-1 text-sm text-red-500">{errors.idNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cellphone Number</label>
                      <input
                        type="text"
                        name="cellphone"
                        value={formData.cellphone}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-theme focus:border-theme ${
                          errors.cellphone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your cellphone number"
                      />
                      {errors.cellphone && (
                        <p className="mt-1 text-sm text-red-500">{errors.cellphone}</p>
                      )}
                    </div>

                    <AccountNumberInput
                      value={formData.accountNumber}
                      onChange={handleAccountNumberChange}
                      error={errors.accountNumber}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-theme focus:border-theme ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Create a password"
                      />
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md shadow-sm focus:ring-theme focus:border-theme ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Confirm your password"
                      />
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-theme text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity mt-6"
                  >
                    Sign Up
                  </button>

                  <p className="text-center text-gray-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setView('login')}
                      className="text-theme hover:opacity-90"
                    >
                      Login
                    </button>
                  </p>
                </form>
              </>
            )}
          </div>
          <div>
            <WelcomeMessage />
          </div>
        </div>
      </div>
    </div>
  );
}