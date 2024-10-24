import { useState } from 'react';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    console.log(`Payment of ${amount} initiated`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded shadow">
      <label className="block mb-2">
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Pay with M-Pesa
      </button>
    </form>
  );
};

export default PaymentForm;
