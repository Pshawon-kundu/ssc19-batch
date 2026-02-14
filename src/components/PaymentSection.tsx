import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { RegistrationData } from '../api';
import { config } from '../config';

interface PaymentSectionProps {
  formData: RegistrationData;
  errors: Record<string, string>;
  onChange: (field: keyof RegistrationData, value: any) => void;
}

const paymentMethods = [
  {
    id: 'bkash',
    name: 'bKash',
    icon: '📱',
    color: 'from-pink-500 to-pink-600',
    number: config.paymentNumbers.bkash,
  },
  {
    id: 'nagad',
    name: 'Nagad',
    icon: '💳',
    color: 'from-orange-500 to-orange-600',
    number: config.paymentNumbers.nagad,
  },
  {
    id: 'rocket',
    name: 'Rocket',
    icon: '🚀',
    color: 'from-purple-500 to-purple-600',
    number: config.paymentNumbers.rocket,
  },
];

export function PaymentSection({ formData, errors, onChange }: PaymentSectionProps) {
  const [copiedNumber, setCopiedNumber] = useState(false);

  const copyToClipboard = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  return (
    <div className="space-y-6 border-t-2 border-gray-200 pt-6">
      <h3 className="text-xl font-bold text-gray-900">💳 Payment Information</h3>

      {/* Payment Method Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Select Payment Method *
        </label>
        <div className="grid sm:grid-cols-3 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => onChange('paymentMethod', method.id)}
              className={`relative p-4 border-2 rounded-lg transition-all ${formData.paymentMethod === method.id
                ? 'border-emerald-600 bg-emerald-50'
                : 'border-gray-200 hover:border-emerald-300'
                }`}
            >
              <div className="text-3xl mb-2">{method.icon}</div>
              <div className="font-semibold text-gray-900">{method.name}</div>
            </button>
          ))}
        </div>
        {errors.paymentMethod && (
          <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>
        )}
      </div>

      {/* Payment Number Display */}
      {formData.paymentMethod && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">
              {paymentMethods.find(m => m.id === formData.paymentMethod)?.icon}
            </span>
            <h4 className="font-semibold text-gray-900">
              Send money to this {paymentMethods.find(m => m.id === formData.paymentMethod)?.name} number:
            </h4>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-blue-700 tracking-wider flex-1">
              {paymentMethods.find(m => m.id === formData.paymentMethod)?.number}
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(paymentMethods.find(m => m.id === formData.paymentMethod)?.number || '')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {copiedNumber ? (
                <>
                  <Check size={18} />
                  <span className="text-sm font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={18} />
                  <span className="text-sm font-medium">Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            ⚠️ Please send the exact amount and keep the transaction ID
          </p>
        </div>
      )}

      {/* Transaction ID */}
      <div>
        <label htmlFor="transactionId" className="block text-sm font-semibold text-gray-700 mb-2">
          Transaction ID / Reference Number *
        </label>
        <input
          type="text"
          id="transactionId"
          value={formData.transactionId}
          onChange={(e) => onChange('transactionId', e.target.value)}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${errors.transactionId ? 'border-red-500' : 'border-gray-200'
            }`}
          placeholder="e.g., ABC123XYZ456"
        />
        {errors.transactionId && (
          <p className="text-red-500 text-sm mt-1">{errors.transactionId}</p>
        )}
      </div>

      {/* Last 2 Digits */}
      <div>
        <label htmlFor="lastTwoDigit" className="block text-sm font-semibold text-gray-700 mb-2">
          Last 2 Digits of Your Phone Number *
        </label>
        <input
          type="text"
          id="lastTwoDigit"
          value={formData.lastTwoDigit}
          onChange={(e) => onChange('lastTwoDigit', e.target.value)}
          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${errors.lastTwoDigit ? 'border-red-500' : 'border-gray-200'
            }`}
          placeholder="e.g., 78"
          maxLength={2}
        />
        {errors.lastTwoDigit && (
          <p className="text-red-500 text-sm mt-1">{errors.lastTwoDigit}</p>
        )}
        <p className="text-sm text-gray-500 mt-1">
          ℹ️ This helps us verify your payment
        </p>
      </div>
    </div>
  );
}
