import React, { useState, useEffect } from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

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

    const validateAccountNumber = async () => {
      if (value) {
        setIsValidating(true);
        setShowStatus(false);

        try {
          const accountsRef = collection(db, 'accounts');
          const q = query(accountsRef, where('accountNumber', '==', value));
          const querySnapshot = await getDocs(q);
          
          const valid = !querySnapshot.empty;
          setIsValid(valid);
          onChange(value, valid);
        } catch (error) {
          console.error('Error validating account number:', error);
          setIsValid(false);
          onChange(value, false);
        } finally {
          setIsValidating(false);
          setShowStatus(true);
        }
      } else {
        setShowStatus(false);
        setIsValid(false);
        onChange(value, false);
      }
    };

    timeoutId = setTimeout(validateAccountNumber, 500);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [value, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    onChange(newValue, false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Account Number *</label>
      <div className="mt-1 relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
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