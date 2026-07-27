const fs = require('fs');
const file = 'src/components/ui/OrderTrackingModal.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace trackingResult with trackingResults
content = content.replace('const [trackingResult, setTrackingResult] = useState<any>(null);', 'const [trackingResults, setTrackingResults] = useState<any[]>([]);');

content = content.replace(/if \(\!foundOrder\) \{[\s\S]*?return;\n    \}/, `if (foundOrders.length === 0) {
      setTrackingResults([]);
      return;
    }`);

content = content.replace(/const foundOrder = orders\.find\(.*?\);/, `const foundOrders = orders.filter(o => o.id.toUpperCase() === cleanId || o.phone.replace(/[\\s-]/g, '') === cleanId.replace(/[\\s-]/g, ''));`);

content = content.replace(/let statusSteps = \[[\s\S]*?\}\);/m, `const results = foundOrders.map(foundOrder => {
      let statusSteps = [
        { title: 'অর্ডার সফল হয়েছে', date: new Date(foundOrder.date).toLocaleString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }), completed: true },
        { title: 'পণ্য প্রস্তুত করা হচ্ছে', date: '', completed: false },
        { title: 'ডেলিভারি পার্টনারের কাছে হস্তান্তরিত', date: '', completed: false },
        { title: 'ডেলিভারি সম্পন্ন', date: '', completed: false }
      ];

      let currentStep = 0;
      let statusText = 'পেন্ডিং';

      if (foundOrder.status === 'Confirmed') {
        currentStep = 1;
        statusSteps[1].completed = true;
        statusText = 'অর্ডার কনফার্মড';
      } else if (foundOrder.status === 'Shipped') {
        currentStep = 2;
        statusSteps[1].completed = true;
        statusSteps[2].completed = true;
        statusText = 'শিপমেন্ট হয়েছে';
      } else if (foundOrder.status === 'Completed') {
        currentStep = 3;
        statusSteps[1].completed = true;
        statusSteps[2].completed = true;
        statusSteps[3].completed = true;
        statusText = 'ডেলিভারি সম্পন্ন';
      } else if (foundOrder.status === 'Cancelled') {
        statusText = 'অর্ডার বাতিল হয়েছে';
      }

      return {
        orderId: foundOrder.id,
        customerName: foundOrder.customerName,
        phone: foundOrder.phone,
        address: foundOrder.address,
        paymentMethod: 'ক্যাশ অন ডেলিভারি (COD)',
        totalAmount: foundOrder.total,
        statusText,
        currentStep,
        steps: statusSteps,
        isCancelled: foundOrder.status === 'Cancelled',
        items: foundOrder.items
      };
    });

    setTrackingResults(results);`);

fs.writeFileSync(file, content);
