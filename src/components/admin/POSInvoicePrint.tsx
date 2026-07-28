import React, { forwardRef } from 'react';
import { Order } from '../../context/CartContext';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';

interface POSInvoicePrintProps {
  order: Order;
  adminName?: string;
}

// Convert numbers to words for "Amount in words"
function numberToWords(num: number): string {
  const a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
  const b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];

  let numStr = num.toString();
  if (numStr.length > 9) return 'overflow';
  const n = ('000000000' + numStr).substring(numStr.length > 9 ? numStr.length - 9 : 0).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return ''; 
  let str = '';
  str += (n[1] != '00') ? (a[Number(n[1])] || b[n[1][0] as any] + ' ' + a[n[1][1] as any]) + 'Crore ' : '';
  str += (n[2] != '00') ? (a[Number(n[2])] || b[n[2][0] as any] + ' ' + a[n[2][1] as any]) + 'Lakh ' : '';
  str += (n[3] != '00') ? (a[Number(n[3])] || b[n[3][0] as any] + ' ' + a[n[3][1] as any]) + 'Thousand ' : '';
  str += (n[4] != '0') ? (a[Number(n[4])] || b[n[4][0] as any] + ' ' + a[n[4][1] as any]) + 'Hundred ' : '';
  str += (n[5] != '00') ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0] as any] + ' ' + a[n[5][1] as any]) : '';
  return str.trim() ? str.trim() : 'Zero';
}

export const POSInvoicePrint = forwardRef<HTMLDivElement, POSInvoicePrintProps>(({ order, adminName = 'Admin' }, ref) => {
  const dateStr = new Date(order.date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const amountInWords = numberToWords(order.total) + ' Taka Only';
  const invoiceNo = `SEL-UFB-${order.id.substring(0, 6).padStart(6, '0').toUpperCase()}`;

  return (
    <div ref={ref} className="bg-white p-4 text-black mx-auto text-[11px]" style={{ width: '80mm', fontFamily: 'monospace' }}>
      {/* Header */}
      <div className="text-center mb-4">
        {/* Logo Placeholder */}
        <div className="flex justify-center mb-2">
          <img src="/logo.jpg" alt="Logo" className="w-12 h-12 grayscale object-contain" />
        </div>
        <h1 className="font-bold text-lg mb-1">URBOR FOOD</h1>
        <p className="leading-tight">
          40 Feet Main Road, China Factory Mor, Bosila Garden City, Mohammadpur, Dhaka-1207
        </p>
        <p className="mt-1">Mobile: 01335273946</p>
      </div>

      {/* Info */}
      <div className="mb-4">
        <div className="flex justify-between">
          <span className="w-20">Invoice No:</span>
          <span className="flex-1">{invoiceNo}</span>
        </div>
        <div className="flex justify-between">
          <span className="w-20">Date:</span>
          <span className="flex-1">{dateStr}</span>
        </div>
        <div className="flex justify-between">
          <span className="w-20">Customer:</span>
          <span className="flex-1">{order.customerName}</span>
        </div>
        <div className="flex justify-between">
          <span className="w-20">Mobile:</span>
          <span className="flex-1">{order.phone}</span>
        </div>
        <div className="flex justify-between">
          <span className="w-20">User:</span>
          <span className="flex-1">{adminName}</span>
        </div>
        <div className="text-center mt-3 font-bold text-sm">Mushak - 6.3</div>
        <div className="text-center font-bold border-b border-black pb-1 mt-1 text-sm">INVOICE</div>
      </div>

      {/* Table */}
      <table className="w-full mb-4 border-collapse">
        <thead>
          <tr className="border-b border-black border-dashed">
            <th className="text-left font-normal pb-1 w-6">Sl.</th>
            <th className="text-left font-normal pb-1">Name</th>
            <th className="text-right font-normal pb-1 w-12">Price</th>
            <th className="text-right font-normal pb-1 w-8">Qty</th>
            <th className="text-right font-normal pb-1 w-14">L.Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index} className="border-b border-black border-dashed">
              <td className="py-1 align-top">{index + 1}</td>
              <td className="py-1 pr-1 truncate max-w-[90px]">{item.name}</td>
              <td className="py-1 text-right align-top">{item.price.toFixed(2)}</td>
              <td className="py-1 text-right align-top">{item.quantity}</td>
              <td className="py-1 text-right align-top">{(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex flex-col items-end mb-4 pr-1">
        <div className="flex justify-between w-40 border-b border-black border-dashed pb-1">
          <span>Sub Total:</span>
          <span>{order.total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between w-40 border-b border-black border-dashed py-1">
          <span>Gross Total:</span>
          <span>{order.total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between w-40 border-b border-black border-dashed py-1">
          <span>Paid Amount:</span>
          <span>{order.status === 'Completed' ? order.total.toFixed(2) : '0.00'}</span>
        </div>
        <div className="flex justify-between w-40 border-b border-black border-dashed py-1">
          <span>Outstanding:</span>
          <span>{order.status === 'Completed' ? '0.00' : order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="italic mb-4 break-words">
        Amount in words:{amountInWords}
      </div>

      {/* Barcode & QR Code */}
      <div className="flex flex-col items-center gap-4 mb-4 mt-8">
        <Barcode value={invoiceNo} width={1.2} height={40} fontSize={12} displayValue={false} margin={0} />
        <QRCode value={invoiceNo} size={80} level="M" />
      </div>

      {/* Footer */}
      <div className="text-center space-y-1 text-gray-700 mt-6">
        <p>Thank you for choosing us!</p>
        <p className="text-[10px]">© Arctic Technologies</p>
      </div>
    </div>
  );
});

POSInvoicePrint.displayName = 'POSInvoicePrint';
