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
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const validateAccountNumber = async () => {
      if (!value || value.length < 4) {
        setShowStatus(false);
        setIsValid(false);
        setValidationMessage('');
        onChange(value, false);
        return;
      }

      setIsValidating(true);
      setShowStatus(false);
      setValidationMessage('');

      try {
        // Query Firestore for the account number in the profiles collection
        const profilesRef = collection(db, 'profiles');
        const q = query(profilesRef, where('customerNumber', '==', value));
        const querySnapshot = await getDocs(q);
        
        const valid = !querySnapshot.empty;
        
        // If valid, get the customer details
        let customerName = '';
        if (valid) {
          const userData = querySnapshot.docs[0].data();
          customerName = userData.fullName || '';
        }

        setIsValid(valid);
        setValidationMessage(valid ? `Verified: ${customerName}` : 'Account number not found');
        onChange(value, valid);
      } catch (error) {
        console.error('Error validating account number:', error);
        setIsValid(false);
        setValidationMessage('Error validating account number');
        onChange(value, false);
      } finally {
        setIsValidating(false);
        setShowStatus(true);
      }
    };

    // Debounce the validation to avoid too many requests
    timeoutId = setTimeout(validateAccountNumber, 800);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [value, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.trim();
    // Only allow alphanumeric characters (letters and numbers)
    if (/^[a-zA-Z0-9]*$/.test(newValue) || newValue === '') {
      onChange(newValue, false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Account Number * <span className="text-xs text-gray-500">(letters and numbers only)</span>
      </label>
      <div className="mt-1 relative">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          className={`block w-full pr-10 rounded-md shadow-sm ${
            error ? 'border-red-500' : isValid ? 'border-green-500' : 'border-gray-300'
          } focus:ring-theme focus:border-theme`}
          placeholder="Enter your account number"
          maxLength={20}
          pattern="[a-zA-Z0-9]*"
        />
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
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {!error && showStatus && validationMessage && (
        <p className={`mt-1 text-sm ${isValid ? 'text-green-600' : 'text-red-500'}`}>
          {validationMessage}
        </p>
      )}
    </div>
  );
}