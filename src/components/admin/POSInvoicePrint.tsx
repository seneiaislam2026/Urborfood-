import React, { forwardRef } from 'react';
import { Order } from '../../context/CartContext';
import QRCode from 'react-qr-code';
import Barcode from 'react-barcode';

interface POSInvoicePrintProps {
  order: Order;
  adminName?: string;
}

// Helper to format date and time
const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatTime = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const POSInvoicePrint = forwardRef<HTMLDivElement, POSInvoicePrintProps>(({ order, adminName = 'Admin' }, ref) => {
  const invoiceNo = `ORD-${order.id.substring(0, 8).toUpperCase()}`;
  
  // Calculate totals
  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharge = order.total - subtotal;

  return (
    <div ref={ref} className="bg-white text-black mx-auto p-4" style={{ width: '80mm', fontFamily: 'monospace', fontSize: '12px', lineHeight: '1.4' }}>
      
      {/* --- Shop Header --- */}
      <div className="text-center mb-4">
        <div className="flex justify-center mb-2">
          <img src="/logo.jpg" alt="Logo" className="w-16 h-16 grayscale object-contain" />
        </div>
        <h1 className="font-bold text-xl mb-1 leading-none tracking-wider">URBOR FOOD</h1>
        <p className="font-semibold text-sm mb-1">Super Shop</p>
        <p className="text-[11px] leading-snug max-w-[90%] mx-auto">
          40 Feet Main Road, China Factory Mor,<br/>
          Bosila Garden City, Mohammadpur, Dhaka
        </p>
        <p className="text-[11px] mt-1 font-semibold">Phone: 01335273946</p>
        <p className="text-[11px]">BIN: 000000000-0000</p>
        <div className="mt-2 text-[11px] font-bold">Mushak - 6.3</div>
      </div>

      <div className="border-t-2 border-black border-dashed mb-3"></div>

      {/* --- Bill Info --- */}
      <div className="text-[11px] mb-3 space-y-1">
        <div className="flex justify-between">
          <span>Bill No: <span className="font-bold">{invoiceNo}</span></span>
          <span>Date: {formatDate(order.date)}</span>
        </div>
        <div className="flex justify-between">
          <span>Cashier: {adminName}</span>
          <span>Time: {formatTime(order.date)}</span>
        </div>
        {order.customerName && order.customerName !== 'শপ কাস্টমার' && (
          <div className="flex justify-between mt-1">
            <span>Customer: {order.customerName}</span>
          </div>
        )}
        {order.phone && order.phone !== 'N/A' && (
          <div className="flex justify-between">
            <span>Mobile: {order.phone}</span>
          </div>
        )}
      </div>

      <div className="border-t-2 border-black border-dashed mb-2"></div>

      {/* --- Items Table --- */}
      <table className="w-full text-[11px] mb-2">
        <thead>
          <tr className="border-b-2 border-black border-dashed">
            <th className="text-left font-semibold pb-1">Item</th>
            <th className="text-right font-semibold pb-1 w-8">Qty</th>
            <th className="text-right font-semibold pb-1 w-12">Price</th>
            <th className="text-right font-semibold pb-1 w-14">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <React.Fragment key={index}>
              <tr>
                <td colSpan={4} className="pt-1 pb-0 font-medium truncate max-w-[200px]">{item.name}</td>
              </tr>
              <tr>
                <td></td>
                <td className="text-right pb-1 align-top text-gray-700">{item.quantity}</td>
                <td className="text-right pb-1 align-top text-gray-700">{item.price.toFixed(2)}</td>
                <td className="text-right pb-1 align-top font-semibold">{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="border-t-2 border-black border-dashed mb-2"></div>

      {/* --- Totals --- */}
      <div className="text-[12px] space-y-1 mb-3">
        <div className="flex justify-between">
          <span>Sub Total:</span>
          <span>{subtotal.toFixed(2)}</span>
        </div>
        {deliveryCharge > 0 && (
          <div className="flex justify-between">
            <span>Delivery/Other:</span>
            <span>{deliveryCharge.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t border-black mt-1 mb-1"></div>
        <div className="flex justify-between font-bold text-[14px]">
          <span>NET PAYABLE:</span>
          <span>Tk {order.total.toFixed(2)}</span>
        </div>
        <div className="border-t border-black mt-1 mb-1"></div>
        <div className="flex justify-between text-[11px]">
          <span>Paid Amount:</span>
          <span>{order.status === 'Completed' ? order.total.toFixed(2) : '0.00'}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span>Change Amount:</span>
          <span>0.00</span>
        </div>
      </div>

      <div className="border-t-2 border-black border-dashed mb-4"></div>

      {/* --- Barcode & Footer --- */}
      <div className="flex flex-col items-center gap-3 mb-4">
        <Barcode value={invoiceNo} width={1.2} height={30} fontSize={11} displayValue={true} margin={0} />
      </div>

      <div className="text-center text-[11px] mt-4 space-y-1">
        <p className="font-bold">*** THANK YOU FOR SHOPPING ***</p>
        <p>Please come again</p>
        <p className="text-[9px] mt-2 text-gray-600">Software by Arctic Technologies</p>
      </div>

    </div>
  );
});

POSInvoicePrint.displayName = 'POSInvoicePrint';
