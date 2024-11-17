import React, { useState, useEffect } from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import { validateAccountNumber, getStoredProfiles } from '../utils/validation';

interface AccountNumberInputProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  error?: string;
}

export default function AccountNumberInput({ value, onChange, error }: AccountNumberInputProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (value) {
      setIsValidating(true);
      setShowStatus(false);

      timeoutId = setTimeout(() => {
        const profiles = getStoredProfiles();
        const valid = validateAccountNumber(value, profiles);
        setIsValid(valid);
        setIsValidating(false);
        setShowStatus(true);
        onChange(value, valid);
      }, 500);
    } else {
      setShowStatus(false);
      onChange(value, false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [value, onChange]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Account Number *</label>
      <div className="mt-1 relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value, false)}
          className={`block w-full pr-10 rounded-md shadow-sm ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus:ring-theme focus:border-theme`}
          placeholder="Enter your account number"
        />
        {value && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {isValidating ? (
              <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
            ) : showStatus ? (
              isValid ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <X className="h-5 w-5 text-red-500" />
              )
            ) : null}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {!error && value && showStatus && !isValid && (
        <p className="mt-1 text-sm text-red-500">Account number not found</p>
      )}
    </div>
  );
}