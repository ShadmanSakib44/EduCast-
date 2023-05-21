import React, { useEffect, useState } from 'react';
import { API } from '../../service/api';
import { jsPDF } from 'jspdf';

const Admin = () => {
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    const response = await API.getAllTutorsForAdmin();
    setTutors(response.data);
  };

  const handlePayment = (tutor) => {
    setSelectedTutor(tutor);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = () => {
    // Simulate payment verification
    const cardNumber = document.getElementById('cardNumber').value;
    const expirationDate = document.getElementById('expirationDate').value;
    const cvc = document.getElementById('cvc').value;

    // Regular expression pattern for matching Visa card numbers
    const visaCardPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;

    // Check if the entered card number matches the Visa card pattern
    if (visaCardPattern.test(cardNumber)) {
      // Payment successful
      alert('Payment successful!');
      generateReceipt();
    } else {
      // Payment failed
      alert('Payment failed. Please check your card details.');
    }

    // Close the payment modal
    setShowPaymentModal(false);
  };

  const generateReceipt = () => {
    const paymentId = Math.floor(Math.random() * 1000000000);
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a6',
    });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Educast', 52.5, 10.5, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Receipt', 52.5, 16.5, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.line(10.5, 19.5, 94.5, 19.5);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Tutor: ${selectedTutor.name}`, 10.5, 26.5);
    doc.text(`Subject: ${selectedTutor.subject}`, 10.5, 31.5);
    doc.text(`Amount: $${amount}`, 10.5, 36.5);
    doc.text(`Payment ID: ${paymentId}`, 10.5, 41.5);

    doc.setFontSize(8);
    doc.text('Thank you for your payment!', 52.5, 47.5, { align: 'center' });

    doc.setFontSize(8);
    doc.text('© Educast. All rights reserved.', 52.5, 141, { align: 'center' });
    //doc.text(`Payment ID: ${paymentId}`, 10.5, 41.5);
    doc.save('receipt.pdf');
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'Source Sans Pro, sans-serif', margin: '0' }}>
      <h2 style={{ margin: '0' }}>Available Tutors:</h2>
      <div style={{ width: '100%', border: '1px solid #EEEEEE', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 0' }}>
        <div style={{ display: 'flex', width: '100%', background: '#000', padding: '18px 0', color: 'white', textTransform: 'uppercase' }}>
          <div style={{ flex: ' 10%', textAlign: 'center' }}>Name</div>
          <div style={{ flex: '1 1 10%', textAlign: 'center' }}>Subject</div>
          <div style={{ flex: '1 1 10%', textAlign: 'center' }}>Hourly Rate</div>
          <div style={{ flex: '1 1 10%', textAlign: 'center' }}>Payment</div>
        </div>
        <div style={{ width: '100%' }}>
          {tutors.map((tutor) => (
            <div key={tutor._id} style={{ display: 'flex', width: '100%', padding: '18px 0', background: tutor._id % 2 === 0 ? '#EEEEEE' : 'transparent' }}>
              <div style={{ flex: '1 1 16%', textAlign: 'center' }}>{tutor.name}</div>
              <div style={{ flex: '1 1 16%', textAlign: 'center' }}>{tutor.subject}</div>
              
              <div style={{ flex: '1 1 16%', textAlign: 'center' }}>{tutor.hourlyRate}</div>
              
              <div style={{ flex: '1 1 20%', textAlign: 'center' }}>
                <button onClick={() => handlePayment(tutor)}>Pay</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPaymentModal && selectedTutor && (
        <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: '#FFF', padding: '24px', borderRadius: '4px', maxWidth: '400px' }}>
            <h2>Payment Details</h2>
            <p>Tutor: {selectedTutor.name}</p>
            <p>Subject: {selectedTutor.subject}</p>
            <input id="cardNumber" type="text" placeholder="Card Number" />
            <input id="expirationDate" type="text" placeholder="Expiration Date" />
            <input id="cvc" type="text" placeholder="CVV" />
            <input id="amount" type="text" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button onClick={handlePaymentSubmit}>Pay with Visa</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
