import React, { useState } from 'react';
import { X, Smartphone, CheckCircle, Lock, Loader2, ShieldCheck } from 'lucide-react';
import { Pack } from '../types';
import { Button } from '../components/Button';

interface PaymentScreenProps {
  pack: Pack;
  onClose: () => void;
  onSuccess: (pack: Pack) => void;
}

export const PaymentScreen: React.FC<PaymentScreenProps> = ({ pack, onClose, onSuccess }) => {
  const [method, setMethod] = useState<'google' | 'cinetpay'>('google');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [operator, setOperator] = useState('orange');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'select' | 'processing' | 'success'>('select');

  const handlePayment = () => {
    setLoading(true);
    setStep('processing');

    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      // Auto close after success
      setTimeout(() => {
        onSuccess(pack);
      }, 2000);
    }, 2500);
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 animate-in zoom-in-95 duration-300">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle className="text-green-600" size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Paiement Réussi !</h2>
        <p className="text-gray-500 text-center mb-8">
          Le pack "{pack.title}" a été ajouté à votre bibliothèque.
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center sm:justify-center pointer-events-none">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" onClick={onClose} />
      
      <div className="bg-white w-full sm:w-[450px] sm:rounded-2xl rounded-t-3xl shadow-2xl pointer-events-auto animate-slide-up overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Lock size={18} className="text-green-600" /> Paiement Sécurisé
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {/* Product Summary */}
          <div className="flex gap-4 mb-8 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <img src={pack.coverImage} alt="" className="w-16 h-16 rounded-lg object-cover" />
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Vous achetez</p>
              <h3 className="font-bold text-gray-900">{pack.title}</h3>
              <p className="text-purple-600 font-bold mt-1">{pack.price} {pack.currency}</p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4 mb-8">
            <h3 className="font-bold text-gray-800 text-sm">Moyen de paiement</h3>
            
            <button 
              onClick={() => setMethod('google')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                method === 'google' 
                  ? 'border-purple-600 bg-purple-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-sm">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Google_Play_2022_icon.svg/512px-Google_Play_2022_icon.svg.png" className="w-6 h-6" alt="Google Play" />
              </div>
              <div className="text-left flex-1">
                <span className="block font-bold text-gray-900 text-sm">Google Play</span>
                <span className="block text-xs text-gray-500">Carte bancaire, PayPal, Solde Play</span>
              </div>
              {method === 'google' && <div className="w-4 h-4 bg-purple-600 rounded-full" />}
            </button>

            <button 
              onClick={() => setMethod('cinetpay')}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                method === 'cinetpay' 
                  ? 'border-purple-600 bg-purple-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-sm">
                <Smartphone className="text-orange-500" size={20} />
              </div>
              <div className="text-left flex-1">
                <span className="block font-bold text-gray-900 text-sm">Mobile Money (CinetPay)</span>
                <span className="block text-xs text-gray-500">Orange, MTN, Moov, Wave</span>
              </div>
              {method === 'cinetpay' && <div className="w-4 h-4 bg-purple-600 rounded-full" />}
            </button>
          </div>

          {/* CinetPay Form */}
          {method === 'cinetpay' && (
            <div className="mb-6 animate-in fade-in slide-in-from-top-2">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                   {['orange', 'mtn', 'moov', 'wave'].map((op) => (
                     <button 
                       key={op}
                       onClick={() => setOperator(op)}
                       className={`py-2 rounded-lg border text-xs font-bold uppercase ${operator === op ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-500'}`}
                     >
                       {op}
                     </button>
                   ))}
                </div>
                <div>
                   <label className="block text-xs font-bold text-gray-700 mb-1">Numéro de téléphone</label>
                   <input 
                    type="tel" 
                    placeholder="07 07 07 07 07"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                   />
                </div>
              </div>
            </div>
          )}

          {/* Footer Info */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-6">
            <ShieldCheck size={14} />
            <span>Paiement crypté SSL 256-bit</span>
          </div>

          {/* Action Button */}
          <Button 
            fullWidth 
            size="lg" 
            onClick={handlePayment}
            disabled={loading || (method === 'cinetpay' && phoneNumber.length < 8)}
            className="shadow-xl shadow-purple-500/30"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} /> Traitement...
              </>
            ) : (
              `Payer ${pack.price} ${pack.currency}`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};