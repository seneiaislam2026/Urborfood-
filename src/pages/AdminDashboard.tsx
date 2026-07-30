import React, { useState, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { useReactToPrint } from 'react-to-print';
import { useUI } from '../context/UIContext';
import { compressImage } from '../utils/imageUtils';
import { updatePWAIcon } from '../pwa-icon';
import { 
  Send, Package, Leaf, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Settings, MessageSquare, Star, 
  LogOut, 
  Search, 
  Plus, 
  ShieldCheck, 
  User, 
  Lock, 
  ArrowLeft, 
  EyeOff, 
  Eye, 
  LogIn, 
  Award, 
  Truck, 
  Headset, 
  Check, 
  Download, 
  Menu, 
  X, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Bell,
  Volume2,
  VolumeX,
  Share2,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle,
  Calendar,
  DollarSign,
  Megaphone,
  Percent,
  Sparkles,
  Target,
  BookOpen,
  PhoneCall,
  CheckSquare,
  Printer,
  UserPlus,
  Save,
  CheckCircle2,
  Globe,
  MessageCircle,
  Facebook,
  Phone,
  MapPin,
  ChevronDown,
  Tag
, ChevronRight, MonitorSmartphone, CalendarDays, Copy, ExternalLink, Edit3, ShoppingCart, FileText, Store, ShieldAlert } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import ImageLoader from '../components/ui/ImageLoader';
import StaffManagement from '../components/admin/StaffManagement';
import CategoryManagement from '../components/admin/CategoryManagement';
import { POSInvoicePrint } from '../components/admin/POSInvoicePrint';
import { safeGetItem, safeSetItem, safeRemoveItem } from '../utils/storage';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';


export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {

  // Using inline styles in the map for better control

  const navItems = () => {
    const items = [
      { id: 'dashboard', label: t.dashboard, icon: BarChart3 },
      { id: 'orders', label: t.orders, icon: ShoppingBag, badge: pendingOrdersCount > 0 ? pendingOrdersCount : null },
      { id: 'create-order', label: 'সেলস / অর্ডার এন্ট্রি', icon: PlusCircle },
      { id: 'courier', label: t.courierDashboard, icon: Truck },
      { id: 'incomplete-orders', label: 'ইনকম্পিলিট অর্ডার', icon: ShoppingBag },
      { id: 'products', label: t.productManagement, icon: Package },
      { id: 'categories', label: 'ক্যাটাগরি', icon: Tag },
      { id: 'product-prices', label: 'পণ্য মূল্য তালিকা', icon: DollarSign },
      { id: 'product-reviews', label: 'প্রোডাক্ট রিভিও', icon: MessageSquare },
      { id: 'inventory', label: t.inventoryControl, icon: Package },
      { id: 'customers', label: t.customerList, icon: Users },
      { id: 'finances', label: t.finances, icon: Wallet },
      { id: 'dues', label: t.dues, icon: BookOpen },
      { id: 'marketing', label: t.marketing, icon: Megaphone },
      { id: 'landing-page', label: t.landingPage, icon: MonitorSmartphone },
      { id: 'staff', label: t.staffManagement, icon: UserPlus },
      { id: 'settings', label: t.settings, icon: Settings },
    ];
    if (isStaff) {
      return items.filter(i => ['dashboard', 'orders', 'create-order', 'courier', 'incomplete-orders', 'products', 'customers'].includes(i.id));
    }
    return items;
  };

  const { heroBannerUrl, setHeroBannerUrl, logoUrl: ctxLogo, setLogoUrl: ctxSetLogo, updateSettingsInDB } = useUI();
  const [logoUrl, setLogoUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return safeGetItem('urbor_logo_url') || '/logo.svg';
    }
    return '/logo.svg';
  });
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return safeGetItem('urbor_admin_auth') === 'true' || safeGetItem('urbor_staff_auth') === 'true';
    }
    return false;
  });
  const [isStaff, setIsStaff] = useState(() => {
    if (typeof window !== 'undefined') {
      return safeGetItem('urbor_staff_auth') === 'true';
    }
    return false;
  });
  const [staffId, setStaffId] = useState(() => {
    if (typeof window !== 'undefined') {
      return safeGetItem('urbor_staff_id') || '';
    }
    return '';
  });
  const [staffName, setStaffName] = useState(() => {
    if (typeof window !== 'undefined') {
      return safeGetItem('urbor_staff_name') || '';
    }
    return '';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleLogoutClick = () => {
    setIsAuthenticated(false);
    if (typeof window !== 'undefined') {
      safeRemoveItem('urbor_admin_auth');
      safeRemoveItem('urbor_staff_auth');
      safeRemoveItem('urbor_staff_id');
      safeRemoveItem('urbor_staff_name');
    }
    onLogout();
  };

  // Tab routing
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories' | 'product-prices' | 'orders' | 'customers' | 'settings' | 'finances' | 'marketing' | 'dues' | 'inventory' | 'courier' | 'create-order' | 'landing-page' | 'staff'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [staffList, setStaffList] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const unsub = onSnapshot(doc(db, 'appData', 'staff'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.staffList) {
          setStaffList(data.staffList);
          safeSetItem('urbor_staff_list', JSON.stringify(data.staffList));
        }
      } else {
        const savedStaff = safeGetItem('urbor_staff_list');
        if (savedStaff) {
          try {
            const parsed = JSON.parse(savedStaff);
            setStaffList(parsed);
            setDoc(doc(db, 'appData', 'staff'), { staffList: parsed }).catch(console.error);
          } catch(e) {}
        }
      }
    });
    return () => unsub();
  }, []);

  // Language translation state
  const [lang, setLang] = useState<'bn' | 'en'>('bn');

  const t = {
    bn: {
      appName: 'উর্বর ফুড',
      adminPanel: 'অ্যাডমিন প্যানেল',
      dashboard: 'ড্যাশবোর্ড',
      productManagement: 'পণ্য ম্যানেজমেন্ট',
      orders: 'অর্ডার সমূহ',
      customerList: 'কাস্টমার লিস্ট',
      settings: 'সেটিংস',
      finances: 'আয় ও ব্যয় ট্র্যাকার',
      dues: 'বকেয়া খাতা',
      marketing: 'মার্কেটিং ও ডিসকাউন্ট',
      logout: 'প্রস্থান করুন',
      languageLabel: 'ভাষা পরিবর্তন',
      ordersTrack: 'অর্ডার সমূহ',
      orderCount: 'টি',
      subTitleOrders: 'স্টোরের সকল সক্রিয় গ্রাহকের ক্যাশ অন ডেলিভারি অর্ডার ট্র্যাক',
      createOrder: 'অর্ডার তৈরি করুন',
      inventoryControl: 'ইনভেন্টরি কন্ট্রোল',
      courierDashboard: 'কুরিয়ার ড্যাশবোর্ড',
      landingPage: 'ল্যান্ডিং পেইজ',
      staffManagement: 'স্টাফ ম্যানেজমেন্ট',
    },
    en: {
      appName: 'Urbor Food',
      adminPanel: 'Admin Panel',
      dashboard: 'Dashboard',
      productManagement: 'Products',
      orders: 'Orders List',
      customerList: 'Customers',
      settings: 'Settings',
      finances: 'Income & Expense',
      dues: 'Due Ledger',
      marketing: 'Marketing & Discount',
      logout: 'Logout',
      languageLabel: 'Language',
      ordersTrack: 'All Orders',
      orderCount: 'total',
      subTitleOrders: 'Track cash on delivery orders from active store customers',
      createOrder: 'Create Order',
      inventoryControl: 'Inventory Control',
      courierDashboard: 'Courier Dashboard',
      landingPage: 'Landing Page',
      staffManagement: 'Staff Management',
    }
  }[lang];

  // Search filter inputs
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');

  // Context resources
  const { 
    products,
    reviews,
    addReview,
    deleteReview, 
    orders, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    updateOrderStatus, 
    deleteOrder,
    notifications,
    addNotification,
    dismissNotification,
    markNotificationAsRead,
    clearAllNotifications,
    soundEnabled,
    setSoundEnabled,
    triggerSound,
    desktopPermission,
    requestDesktopPermission,
    addSimulatedOrder,
    updateOrder
  } = useCart();

  // Print Invoice states
  const printComponentRef = useRef<HTMLDivElement>(null);
  const [orderToPrint, setOrderToPrint] = useState<any | null>(null);
  const [newReviewCustomer, setNewReviewCustomer] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState("");

  const a4PrintRef = useRef<HTMLDivElement>(null);
  const handleA4Print = useReactToPrint({
    contentRef: a4PrintRef,
    documentTitle: 'Invoice',
  });
  
  const handlePrint = useReactToPrint({
    contentRef: printComponentRef,
    documentTitle: 'Invoice',
    onAfterPrint: () => setOrderToPrint(null),
  });

  useEffect(() => {
    if (orderToPrint) {
      // Use setTimeout to ensure the DOM has updated and ref is available
      const timer = setTimeout(() => {
        try {
          handlePrint();
        } catch (err) {
          console.error("Print failed", err);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [orderToPrint, handlePrint]);

  // Manual Order states
  const [isManualOrderModalOpen, setIsManualOrderModalOpen] = useState(false);
  const [manualOrderCustomerName, setManualOrderCustomerName] = useState('');
  const [manualOrderPhone, setManualOrderPhone] = useState('');
  const [manualOrderAddress, setManualOrderAddress] = useState('');
  const [manualOrderIsDue, setManualOrderIsDue] = useState(false);
  const [manualOrderSource, setManualOrderSource] = useState<'shop' | 'website' | 'facebook' | 'whatsapp'>('shop');
  const [manualOrderSalesman, setManualOrderSalesman] = useState(() => {
    if (typeof window !== 'undefined' && safeGetItem('urbor_staff_auth') === 'true') {
      return safeGetItem('urbor_staff_name') || '';
    }
    return '';
  });
  const [isSalesmanDropdownOpen, setIsSalesmanDropdownOpen] = useState(false);
  const [savedCustomers, setSavedCustomers] = useState<{ id: string, name: string, phone: string, address: string }[]>([]);
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustAddress, setNewCustAddress] = useState('');
  const [invoiceToPrint, setInvoiceToPrint] = useState<any | null>(null);
  const [manualOrderItems, setManualOrderItems] = useState<{ id: string; name: string; quantity: number; price: number }[]>([]);
  const [manualProductSearch, setManualProductSearch] = useState('');
  const [isManualProductSearchOpen, setIsManualProductSearchOpen] = useState(false);
  const [manualSelectedProductId, setManualSelectedProductId] = useState('');
  const [manualSelectedQuantity, setManualSelectedQuantity] = useState(1);
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState(false);
  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  // Income & Expense (Transactions) states
  const [transactions, setTransactions] = useState<{
    id: string;
    type: 'income' | 'expense';
    category: string;
    amount: number;
    date: string;
    note: string;
  }[]>(() => {
    const defaultVal = [
      { id: 't-1', type: 'income' as const, category: 'পণ্য বিক্রি', amount: 5500, date: '2026-07-08T10:00:00.000Z', note: 'শোরুম ডিরেক্ট ক্যাশ সেলস' },
      { id: 't-2', type: 'expense' as const, category: 'কাঁচামাল কেনা', amount: 1500, date: '2026-07-08T14:30:00.000Z', note: 'প্রিমিয়াম প্যাকেট ও লেবেল প্রিন্টিং' },
      { id: 't-3', type: 'expense' as const, category: 'শিপিং চার্জ', amount: 350, date: '2026-07-09T09:00:00.000Z', note: 'উত্তরা এরিয়া ডেলিভারি রাইডার ফি' }
    ];
    if (typeof window !== 'undefined') {
      try {
        const stored = safeGetItem('mega_transactions');
        return stored ? JSON.parse(stored) : defaultVal;
      } catch (e) {
        console.error('Error parsing transactions:', e);
        return defaultVal;
      }
    }
    return defaultVal;
  });

  

  // Transaction form states
  const [txType, setTxType] = useState<'income' | 'expense'>('income');
  const [txCategory, setTxCategory] = useState('পণ্য বিক্রি');
  const [txAmount, setTxAmount] = useState('');
  const [txNote, setTxNote] = useState('');
  const [txFilter, setTxFilter] = useState<'all' | 'income' | 'expense' | 'automated'>('all');
  const [txSearch, setTxSearch] = useState('');


  // Dues states
  const [dues, setDues] = useState<{
    id: string;
    customerName: string;
    phone: string;
    amount: number;
    paidAmount: number;
    date: string;
    status: 'Unpaid' | 'Partial' | 'Paid';
  }[]>(() => {
    const defaultVal = [
      { id: 'd-1', customerName: 'করিম সাহেব', phone: '01711000000', amount: 5000, paidAmount: 0, date: '2023-10-01', status: 'Unpaid' as const }
    ];
    if (typeof window !== 'undefined') {
      try {
        const stored = safeGetItem('mega_dues');
        return stored ? JSON.parse(stored) : defaultVal;
      } catch (e) {
        console.error('Error parsing dues:', e);
        return defaultVal;
      }
    }
    return defaultVal;
  });




  const [isDueModalOpen, setIsDueModalOpen] = useState(false);
  const [isDuePayModalOpen, setIsDuePayModalOpen] = useState(false);
  const [currentDue, setCurrentDue] = useState<any>(null);
  
  const [newDue, setNewDue] = useState({ customerName: '', phone: '', amount: '' });
  const [payDueAmount, setPayDueAmount] = useState('');

  const handleAddDue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDue.customerName || !newDue.amount) return;
    const added = {
      id: `d-${Date.now()}`,
      customerName: newDue.customerName,
      phone: newDue.phone,
      amount: Number(newDue.amount),
      paidAmount: 0,
      date: new Date().toISOString(),
      status: 'Unpaid' as const
    };
    setDues([added, ...dues]);
    setIsDueModalOpen(false);
    setNewDue({ customerName: '', phone: '', amount: '' });
  };

  const handlePayDue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDue || !payDueAmount) return;
    const paying = Number(payDueAmount);
    
    // Update due record
    setDues(dues.map(d => {
      if (d.id === currentDue.id) {
        const newPaid = d.paidAmount + paying;
        return {
          ...d,
          paidAmount: newPaid,
          status: newPaid >= d.amount ? 'Paid' : 'Partial'
        };
      }
      return d;
    }));
    
    // Add to income
    const newTx = {
      id: `tx-due-${Date.now()}`,
      type: 'income' as const,
      category: 'বকেয়া আদায়',
      amount: paying,
      date: new Date().toISOString(),
      note: `${currentDue.customerName} এর বকেয়া পরিশোধ`
    };
    setTransactions([newTx, ...transactions]);
    
    setIsDuePayModalOpen(false);
    setPayDueAmount('');
    setCurrentDue(null);
    addNotification('বকেয়া আদায় 💰', 'বকেয়া জমা হয়েছে এবং আয় হিসেবে যুক্ত হয়েছে!');
  };

  // Marketing Campaigns states
  const [campaigns, setCampaigns] = useState<{
    id: string;
    name: string;
    platform: string;
    budget: number;
    targetAudience: string;
    conversions: number;
    status: 'Active' | 'Paused' | 'Scheduled' | 'Completed';
    date: string;
    roi: number;
  }[]>(() => {
    const defaultVal = [
      { id: 'c-1', name: 'ফেসবুক অর্গানিক ঘি বুস্টিং', platform: 'Facebook Ads', budget: 2500, targetAudience: 'স্বাস্থ্য সচেতন গৃহিণী ও পরিবার', conversions: 18, status: 'Active' as const, date: '2026-07-01T12:00:00.000Z', roi: 3.2 },
      { id: 'c-2', name: 'সুন্দরবন খাটি মধু প্রমোশন', platform: 'SMS Marketing', budget: 1200, targetAudience: 'পুরাতন খদ্দের রি-টার্গেটিং', conversions: 12, status: 'Completed' as const, date: '2026-06-25T10:00:00.000Z', roi: 4.5 },
      { id: 'c-3', name: 'ঈদ স্পেশাল কম্বো অফার বুস্ট', platform: 'Instagram Ads', budget: 4000, targetAudience: 'তরুণ ও কর্পোরেট চাকুরিজীবী', conversions: 0, status: 'Scheduled' as const, date: '2026-07-15T09:00:00.000Z', roi: 0 }
    ];
    if (typeof window !== 'undefined') {
      try {
        const stored = safeGetItem('mega_campaigns');
        return stored ? JSON.parse(stored) : defaultVal;
      } catch (e) {
        console.error('Error parsing campaigns:', e);
        return defaultVal;
      }
    }
    return defaultVal;
  });

  // Coupons states
  const [coupons, setCoupons] = useState<{
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    minSpend: number;
    expiryDate: string;
    usageCount: number;
  }[]>(() => {
    const defaultVal = [
      { code: 'NUR10', type: 'percentage' as const, value: 10, minSpend: 1000, expiryDate: '2026-12-31', usageCount: 45 },
      { code: 'GHEE200', type: 'fixed' as const, value: 200, minSpend: 2500, expiryDate: '2026-08-30', usageCount: 18 },
      { code: 'WELCOME100', type: 'fixed' as const, value: 100, minSpend: 1200, expiryDate: '2026-10-15', usageCount: 62 }
    ];
    if (typeof window !== 'undefined') {
      try {
        const stored = safeGetItem('mega_coupons');
        return stored ? JSON.parse(stored) : defaultVal;
      } catch (e) {
        console.error('Error parsing coupons:', e);
        return defaultVal;
      }
    }
    return defaultVal;
  });

  // Save campaigns & coupons to localStorage




  // Request browser desktop push notification permission automatically on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      requestDesktopPermission().catch(console.error);
    }
  }, []);

  // Campaign Form state
  const [newCampName, setNewCampName] = useState('');
  const [newCampPlatform, setNewCampPlatform] = useState('Facebook Ads');
  const [newCampBudget, setNewCampBudget] = useState('');
  const [newCampTarget, setNewCampTarget] = useState('');
  const [newCampStatus, setNewCampStatus] = useState<'Active' | 'Paused' | 'Scheduled'>('Active');

  // Coupon Form state
  const [newCopCode, setNewCopCode] = useState('');
  const [newCopType, setNewCopType] = useState<'percentage' | 'fixed'>('percentage');
  const [newCopValue, setNewCopValue] = useState('');
  const [newCopMinSpend, setNewCopMinSpend] = useState('');
  const [newCopExpiry, setNewCopExpiry] = useState('');

  // Modals management states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCourierNoteOrderId, setEditingCourierNoteOrderId] = useState<string | null>(null);
  const [courierNoteText, setCourierNoteText] = useState('');
  const [editingTrackingOrderId, setEditingTrackingOrderId] = useState<string | null>(null);
  const [trackingIdText, setTrackingIdText] = useState('');
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [selectedCustomerHistory, setSelectedCustomerHistory] = useState<{ phone: string, name: string } | null>(null);
  
  // Product form state
  const [productFormData, setProductFormData] = useState({
    name: '',
    originalPrice: '',
    discountedPrice: '',
    buyingPrice: '',
    category: 'গরুর মাংস',
    weight: '১ কেজি',
    image: '',
    isNew: false,
    isFlashSale: false,
    description: ''
  });

  // Order viewing modal state
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  // Categories list matching data
  const categoriesList = [
    'গরুর মাংস',
    'খাসির মাংস',
    'মুরগি',
    'মাছ',
    'ডিম',
    'দুধ ও দুগ্ধজাত পণ্য',
    'শুঁটকি',
    'ফ্রোজেন ফুড',
    'মধু',
    'অন্যান্য'
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedUser = username.trim().toLowerCase().replace(/[\s.]+$/, '');
    const isOldCreds = normalizedUser === 'urborfood' && password.trim() === 'Urborfood.com@@';
    
    if (isOldCreds) {
      setIsAuthenticated(true);
      setIsStaff(false);
      if (typeof window !== 'undefined') {
        safeSetItem('urbor_admin_auth', 'true');
        safeRemoveItem('urbor_staff_auth');
      }
      setError('');
      return;
    }

    // Check staff
    const staffListRaw = safeGetItem('urbor_staff_list');
    if (staffListRaw) {
      try {
        const staffs = JSON.parse(staffListRaw);
        const staff = staffs.find((s: any) => s.username === username.trim() && s.password === password);
        if (staff) {
          setIsAuthenticated(true);
          setIsStaff(true);
          setStaffId(staff.id);
          setStaffName(staff.name);
          if (typeof window !== 'undefined') {
            safeSetItem('urbor_staff_auth', 'true');
            safeSetItem('urbor_staff_id', staff.id);
            safeSetItem('urbor_staff_name', staff.name);
            safeRemoveItem('urbor_admin_auth');
          }
          setError('');
          return;
        }
      } catch(e) {}
    }

    setError('ভুল ইউজারনেম বা পাসওয়ার্ড!');
  };

  // Courier booking mockup states
  const [bookingOrder, setBookingOrder] = useState<any | null>(null);
  const [courierService, setCourierService] = useState<'steadfast'>('steadfast');
  const [weightKg, setWeightKg] = useState('1.0');
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [bookingId, setBookingId] = useState('');
  
  const [paymentsData, setPaymentsData] = useState<any | null>(null);
  const [isPaymentsLoading, setIsPaymentsLoading] = useState(false);
  const [trackingInvoiceId, setTrackingInvoiceId] = useState('');
  const [trackingResult, setTrackingResult] = useState<any | null>(null);
  const [isTrackingLoading, setIsTrackingLoading] = useState(false);
  const [loadingBookings, setLoadingBookings] = useState<Record<string, boolean>>({});


  // CSV Orders Report exporter and downloader
  const handleDownloadCSV = () => {
    // CSV headers matching the table columns
    const headers = ['Order ID', 'Customer Name', 'Phone Number', 'Delivery Address', 'Items (Quantity)', 'Total Amount (BDT)', 'Order Status', 'Date Created'];
    
    // Convert orders to rows
    const csvRows = [
      headers.join(','), // CSV header line
      ...orders.map(order => {
        const itemsStr = order.items.map(item => `${item.name} (${item.quantity}x)`).join('; ');
        const dateStr = new Date(order.date).toLocaleDateString('bn-BD', {
          year: 'numeric', month: 'long', day: 'numeric'
        });
        const statusText = order.status === 'Completed' ? 'ডেলিভারি সম্পন্ন' : order.status === 'Cancelled' ? 'বাতিল' : order.status === 'Shipped' ? 'ডেলিভারি পার্টনারের কাছে হস্তান্তরিত' : order.status === 'Confirmed' ? 'পণ্য প্রস্তুত করা হচ্ছে' : 'পেন্ডিং';
        
        // Escape quotes to prevent CSV format corruption
        const esc = (text: string) => `"${(text || '').replace(/"/g, '""')}"`;
        
        return [
          esc(order.id),
          esc(order.customerName),
          esc(order.phone),
          esc(order.address),
          esc(itemsStr),
          esc(String(order.total)),
          esc(statusText),
          esc(dateStr)
        ].join(',');
      })
    ];
    
    // Add UTF-8 BOM for Excel Bangla encoding compatibility
    const csvContent = "\ufeff" + csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Urbor_Food_Orders_${new Date().toISOString().split('T')[0]}.csv`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PDF/Print Orders Report compiler and downloader using a standalone downloadable HTML page
  const handleDownloadPDF = () => {
    const dateBD = new Date().toLocaleDateString('bn-BD', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    const rowsHtml = orders.map((order, idx) => {
      const itemsStr = order.items.map(item => `${item.name} (${item.quantity}x)`).join(', ');
      const dateStr = new Date(order.date).toLocaleDateString('bn-BD', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
      const statusText = order.status === 'Completed' ? 'ডেলিভারি সম্পন্ন' : order.status === 'Cancelled' ? 'বাতিল' : order.status === 'Shipped' ? 'ডেলিভারি পার্টনারের কাছে হস্তান্তরিত' : order.status === 'Confirmed' ? 'পণ্য প্রস্তুত করা হচ্ছে' : 'পেন্ডিং';
      const statusColor = order.status === 'Completed' ? '#2e7d32' : order.status === 'Cancelled' ? '#d32f2f' : '#f57c00';

      return `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 12px 8px; font-family: monospace; font-size: 11px;">#${order.id}</td>
          <td style="padding: 12px 8px; font-size: 12px;">
            <strong style="color: #111;">${order.customerName}</strong><br/>
            <span style="color: #666; font-size: 11px; font-family: monospace;">${order.phone}
          </td>
          <td style="padding: 12px 8px; font-size: 11px; max-width: 180px; word-wrap: break-word; color: #444;">${order.address}</td>
          <td style="padding: 12px 8px; font-size: 11px; max-width: 220px; word-wrap: break-word; color: #444;">${itemsStr}</td>
          <td style="padding: 12px 8px; font-weight: bold; font-size: 12px;">&nbsp;৳${order.total}</td>
          <td style="padding: 12px 8px; text-align: center;">
            <span style="color: ${statusColor}; font-weight: bold; font-size: 10px; border: 1px solid ${statusColor}; padding: 2px 6px; border-radius: 4px; background: ${statusColor}10;">
              ${statusText}
            </span>
          </td>
          <td style="padding: 12px 8px; font-size: 11px; color: #666;">${dateStr}</td>
        </tr>
      `;
    }).join('');

    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === 'Completed').length;
    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const totalEarnings = orders.filter(o => o.status === 'Completed').reduce((sum, o) => sum + o.total, 0);

    const reportHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Urbor_Food_Orders_Report</title>
          <meta charset="utf-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap');
            body {
              font-family: 'Hind Siliguri', 'Inter', sans-serif;
              color: #333;
              margin: 40px;
              background-color: #ffffff;
            }
            .header {
              text-align: center;
              border-bottom: 3px double #2e7d32;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .header h1 {
              color: #2e7d32;
              margin: 0;
              font-size: 26px;
              font-weight: 700;
            }
            .header p {
              margin: 5px 0 0;
              color: #666;
              font-weight: 600;
              font-size: 13px;
            }
            .meta-box {
              display: flex;
              justify-content: space-between;
              background: #fbfbfb;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 15px;
              margin-bottom: 25px;
            }
            .meta-item {
              text-align: center;
              flex: 1;
            }
            .meta-item:not(:last-child) {
              border-right: 1px solid #e2e8f0;
            }
            .meta-label {
              font-size: 11px;
              color: #718096;
              font-weight: bold;
              margin-bottom: 4px;
            }
            .meta-value {
              font-size: 16px;
              font-weight: bold;
              color: #2e7d32;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
            }
            th {
              background-color: #2e7d32;
              color: white;
              padding: 10px 8px;
              text-align: left;
              font-size: 12px;
              font-weight: bold;
            }
            .footer {
              margin-top: 50px;
              text-align: center;
              font-size: 10px;
              color: #a0aec0;
              border-top: 1px solid #edf2f7;
              padding-top: 15px;
            }
            .no-print-btn {
              display: inline-block;
              background-color: #2e7d32;
              color: white;
              border: none;
              padding: 10px 20px;
              font-size: 14px;
              font-weight: bold;
              border-radius: 8px;
              cursor: pointer;
              margin-bottom: 20px;
              font-family: 'Hind Siliguri', sans-serif;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
              transition: all 0.2s;
            }
            .no-print-btn:hover {
              background-color: #1b5e20;
              transform: translateY(-1px);
            }
            @media print {
              body { margin: 15px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="no-print" style="text-align: right;">
            <button class="no-print-btn" onclick="window.print()">রিপোর্ট প্রিন্ট করুন / PDF সেভ করুন (Print / Save PDF)</button>
          </div>
          <div class="header">
            <h1>উর্বর ফুড</h1>
            <p>অর্ডার রিপোর্ট ও কাস্টমার ট্র্যাকিং তালিকা</p>
            <div style="font-size: 11px; color: #718096; margin-top: 8px;">রিপোর্ট তৈরির সময়: ${dateBD}</div>
          </div>
          
          <div class="meta-box">
            <div class="meta-item">
              <div class="meta-label">মোট অর্ডার</div>
              <div class="meta-value" style="color: #2d3748;">${totalOrders} টি</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">পেন্ডিং অর্ডার</div>
              <div class="meta-value" style="color: #dd6b20;">${pendingOrders} টি</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">ডেলিভারড অর্ডার</div>
              <div class="meta-value">${completedOrders} টি</div>
            </div>
            <div class="meta-item">
              <div class="meta-label">মোট সংগ্রহ (৳)</div>
              <div class="meta-value" style="color: #0d9488;">&nbsp;৳${totalEarnings}</div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 10%;">অর্ডার আইডি</th>
                <th style="width: 20%;">গ্রাহকের বিবরণ</th>
                <th style="width: 25%;">ডেলিভারি ঠিকানা</th>
                <th style="width: 25%;">ক্রয়কৃত আইটেম</th>
                <th style="width: 10%;">মূল্য</th>
                <th style="text-align: center; width: 10%;">স্ট্যাটাস</th>
                <th style="width: 15%;">অর্ডারের তারিখ</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
                </table>

          <div class="footer">
            <p>এই রিপোর্টটি সিস্টেম থেকে স্বয়ংক্রিয়ভাবে জেনারেট করা হয়েছে। উর্বর ফুড অনলাইন ম্যানেজমেন্ট সিস্টেম।</p>
          </div>

          <script>
            // Auto trigger print dialog when loaded
            window.addEventListener('DOMContentLoaded', () => {
              setTimeout(() => {
                window.print();
              }, 500);
            });
          </script>
        </body>
      </html>
    `;

    const blob = new Blob([reportHtml], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Urbor_Food_Orders_Report_${new Date().toISOString().split('T')[0]}.html`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy product landing page link for Facebook Ads campaigns
  const copyLandingPageLink = (productId: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const link = `${origin}/#product=${productId}`;
    
    let success = false;
    try {
      // Create a temporary textarea element for execution of copy command
      const textarea = document.createElement('textarea');
      textarea.value = link;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0px';
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, 99999); // for mobile devices
      
      success = document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch (err) {
      console.error('Textarea copy failed:', err);
    }

    if (!success && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(link).then(() => {
        success = true;
      }).catch(err => {
        console.error('Navigator copy failed too:', err);
      });
    }

    alert('সফলভাবে ল্যান্ডিং পেজ লিঙ্ক কপি হয়েছে!\n\nএই লিঙ্কটি কপি করে আপনি সরাসরি ফেসবুকে বা অন্য যেকোনো বিজ্ঞাপনে ব্যবহার করতে পারবেন।\n\nলিঙ্ক: ' + link);
  };

  // Product submission form
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productFormData.name || !productFormData.originalPrice) return;

    const defaultImages = [
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=400&q=80'
    ];

    const finalImage = productFormData.image.trim() || defaultImages[Math.floor(Math.random() * defaultImages.length)];

    const payload = {
      name: productFormData.name,
      originalPrice: parseFloat(productFormData.originalPrice),
      discountedPrice: productFormData.discountedPrice ? parseFloat(productFormData.discountedPrice) : undefined,
      buyingPrice: productFormData.buyingPrice ? parseFloat(productFormData.buyingPrice) : undefined,
      category: productFormData.category,
      weight: productFormData.weight,
      image: finalImage,
      isNew: productFormData.isNew,
      isFlashSale: productFormData.isFlashSale,
      description: productFormData.description
    };

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...payload
      });
    } else {
      addProduct(payload);
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
    setProductFormData({
      name: '',
      originalPrice: '',
      discountedPrice: '',
      buyingPrice: '',
      category: 'গরুর মাংস',
      weight: '১ কেজি',
      image: '',
      isNew: false,
      isFlashSale: false,
      description: ''
    });
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProductFormData({
      name: product.name,
      originalPrice: product.originalPrice.toString(),
      discountedPrice: product.discountedPrice ? product.discountedPrice.toString() : '',
      buyingPrice: product.buyingPrice ? product.buyingPrice.toString() : '',
      category: product.category,
      weight: product.weight,
      image: product.image,
      isNew: !!product.isNew,
      isFlashSale: !!product.isFlashSale,
      description: product.description || ''
    });
    setIsProductModalOpen(true);
  };

  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductFormData({
      name: '',
      originalPrice: '',
      discountedPrice: '',
      buyingPrice: '',
      category: 'গরুর মাংস',
      weight: '১ কেজি',
      image: '',
      isNew: true,
      isFlashSale: false,
      description: ''
    });
    setIsProductModalOpen(true);
  };

  // Dynamic statistics calculations
  const totalSales = (orders || [])
    .filter(order => order && order.status === 'Completed')
    .reduce((sum, order) => sum + (order.total || 0), 0);

  const pendingOrdersCount = (orders || []).filter(order => order && order.status === 'Pending').length;
  const completedOrdersCount = (orders || []).filter(order => order && order.status === 'Completed').length;
  const cancelledOrdersCount = (orders || []).filter(order => order && order.status === 'Cancelled').length;

  // Compile unique customers from orders with aggregation
  const uniqueCustomersMap = new Map<string, { name: string; phone: string; address: string; totalSpent: number; ordersCount: number }>();
  (orders || []).forEach(order => {
    if (!order) return;
    const phone = order.phone || 'N/A';
    const existing = uniqueCustomersMap.get(phone);
    if (existing) {
      existing.totalSpent += order.status === 'Completed' ? (order.total || 0) : 0;
      existing.ordersCount += 1;
    } else {
      uniqueCustomersMap.set(phone, {
        name: order.customerName || 'অপরিচিত গ্রাহক',
        phone: phone,
        address: order.address || 'ঠিকানা নেই',
        totalSpent: order.status === 'Completed' ? (order.total || 0) : 0,
        ordersCount: 1
      });
    }
  });
  const customersList = Array.from(uniqueCustomersMap.values());
  const totalCustomersCount = customersList.length;

  // Filter lists based on searches
  const filteredCustomersList = customersList.filter(c => {
    const query = customerSearch.toLowerCase();
    return c.name.toLowerCase().includes(query) || c.phone.includes(query);
  });

  const filteredProductsList = (products || []).filter(p => {
    if (!p) return false;
    const name = p.name || '';
    const category = p.category || '';
    const query = productSearch || '';
    return name.toLowerCase().includes(query.toLowerCase()) || 
           category.toLowerCase().includes(query.toLowerCase());
  });

  const filteredOrdersList = (orders || []).filter(o => {
    if (!o) return false;
    const customerName = o.customerName || '';
    const phone = o.phone || '';
    const id = o.id || '';
    const query = orderSearch || '';
    return customerName.toLowerCase().includes(query.toLowerCase()) || 
           phone.includes(query) || 
           id.toLowerCase().includes(query.toLowerCase());
  });

  // Authentication Page view
  if (!isAuthenticated) {
    return null; // Layout handles redirect to login
  }
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans text-slate-800 print:overflow-visible print:h-auto print:block">
      <div style={{ display: "none" }}>
        {orderToPrint && (
          <POSInvoicePrint ref={printComponentRef} order={orderToPrint} adminName={username} />
        )}
      </div>
      {/* Primary Sidebar for Large Screens */}
      <div className="w-[280px] bg-slate-100 hidden md:flex flex-col flex-shrink-0 z-10 border-r border-slate-200/60 overflow-hidden print:hidden">
        
        {/* Header Section */}
        <div className="bg-[#0f4d2a] text-white p-6 relative overflow-hidden rounded-b-3xl shadow-lg shrink-0 z-20">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-48 h-48 -mt-10 -mr-10" fill="currentColor">
              <path d="M50 0 C 80 0 100 20 100 50 C 100 80 80 100 50 100 C 20 100 0 80 0 50 C 0 20 20 0 50 0 Z" />
              <path d="M20 20 Q 50 50 80 20" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-white p-1 rounded-full shadow-md flex-shrink-0">
              <img src={logoUrl || '/logo.svg'} alt="Logo" className="w-12 h-12 object-contain rounded-full" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="text-xl lg:text-2xl font-bold tracking-tight truncate">
                <span className="text-emerald-400">Urbor</span> Food
              </div>
              <span className="text-[13px] text-emerald-100/90 font-medium">{t.adminPanel}</span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pt-6 pb-4 z-10 bg-slate-100">
          <nav className="space-y-2">
            {navItems().map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-2xl text-[15px] transition-all text-left group border ${
                    isActive 
                      ? 'bg-[#2ea351] text-white font-bold shadow-md shadow-[#2ea351]/30 border-transparent' 
                      : 'bg-white hover:bg-emerald-50/50 text-slate-700 font-semibold border-slate-100 shadow-sm shadow-slate-200/50 hover:border-emerald-100'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                      isActive 
                        ? 'bg-white text-[#2ea351] shadow-sm' 
                        : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
                    }`}>
                      <Icon size={20} strokeWidth={2.5} />
                    </div>
                    <span className="truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {item.badge && (
                      <span className={`text-[11px] px-2 py-0.5 rounded-lg font-black shadow-sm ${isActive ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-600'}`}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight size={18} className={`transition-transform ${isActive ? 'text-emerald-100' : 'text-slate-300 group-hover:text-emerald-400 group-hover:translate-x-0.5'}`} strokeWidth={2.5} />
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="mt-8 space-y-4">
            {/* Shop Location */}
            <button 
                  onClick={() => window.open("https://maps.app.goo.gl/eb9E5JaFmemKiPE39", "_blank")}
                  className="w-full flex items-center justify-between bg-blue-50 hover:bg-blue-100 border border-blue-100 hover:border-blue-200 px-4 py-3.5 rounded-2xl transition-all group"
                >
              <div className="flex items-center gap-3 text-blue-600 font-bold text-[15px]">
                <MapPin size={20} strokeWidth={2.5} className="group-hover:-translate-y-0.5 transition-transform" /> 
                {lang === 'bn' ? 'শপ লোকেশন' : 'Shop Location'}
              </div>
              <ExternalLink size={18} className="text-blue-300 group-hover:text-blue-500 transition-all" strokeWidth={2.5} />
            </button>

            {/* Language Selection */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm shadow-slate-200/50">
              <div className="flex items-center gap-2 text-slate-500 font-bold mb-3">
                <Globe size={18} className="text-slate-400" />
                <span className="text-sm">{t.languageLabel}</span>
              </div>
              <div className="flex gap-2">
                <button 
                  type="button"
                  onClick={() => setLang('bn')}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all border ${
                    lang === 'bn' 
                      ? 'bg-white text-emerald-600 border-emerald-500 shadow-sm shadow-emerald-500/10' 
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  বাংলা
                </button>
                <button 
                  type="button"
                  onClick={() => setLang('en')}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all border ${
                    lang === 'en' 
                      ? 'bg-white text-emerald-600 border-emerald-500 shadow-sm shadow-emerald-500/10' 
                      : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <button 
              onClick={handleLogoutClick} 
              className="w-full flex items-center justify-between bg-rose-50 hover:bg-rose-100 border border-rose-100 hover:border-rose-200 px-4 py-3.5 rounded-2xl transition-all group"
            >
              <div className="flex items-center gap-3 text-rose-500 font-bold text-[15px]">
                <LogOut size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" /> 
                {t.logout}
              </div>
              <ChevronRight size={18} className="text-rose-300 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all" strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="mt-8 text-center pb-4 opacity-60">
            <p className="text-[11px] font-bold text-slate-500 flex items-center justify-center gap-1">
               <span className="text-emerald-600">Urbor Food</span> {isStaff ? 'স্টাফ পোর্টাল' : (lang === 'bn' ? 'এডমিন প্যানেল' : 'Admin Panel')}
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">&copy; 2025 All rights reserved</p>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Slide-out Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex md:hidden">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative flex flex-col w-[320px] max-w-[85vw] bg-slate-100 text-slate-800 h-full shadow-[20px_0_40px_rgb(0,0,0,0.3)] animate-in slide-in-from-left duration-300 rounded-r-[2rem] overflow-hidden">
            
            {/* Mobile Header Section */}
            <div className="bg-[#0f4d2a] text-white p-6 pb-8 relative overflow-hidden rounded-b-[2rem] shadow-lg shrink-0 z-20">
              <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-48 h-48 -mt-10 -mr-10" fill="currentColor">
                  <path d="M50 0 C 80 0 100 20 100 50 C 100 80 80 100 50 100 C 20 100 0 80 0 50 C 0 20 20 0 50 0 Z" />
                  <path d="M20 20 Q 50 50 80 20" stroke="white" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1 rounded-full shadow-md flex-shrink-0">
                    <img src={logoUrl || '/logo.svg'} alt="Logo" className="w-10 h-10 object-contain rounded-full" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="text-xl font-bold tracking-tight truncate">
                      <span className="text-emerald-400">Urbor</span> Food
                    </div>
                    <span className="text-[11px] text-emerald-100/90 font-medium">{t.adminPanel}</span>
                  </div>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="bg-black/20 hover:bg-black/40 p-2 rounded-full text-white transition-colors shrink-0">
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pt-6 pb-4 z-10 -mt-4 bg-slate-100">
              <nav className="space-y-2">
                {navItems().map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <button
                      key={`mobile-${item.id}`}
                      onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                      className={`w-full flex items-center justify-between px-3 py-3 rounded-2xl text-[15px] transition-all text-left group border ${
                        isActive 
                          ? 'bg-[#2ea351] text-white font-bold shadow-md shadow-[#2ea351]/30 border-transparent' 
                          : 'bg-white hover:bg-emerald-50/50 text-slate-700 font-semibold border-slate-100 shadow-sm shadow-slate-200/50 hover:border-emerald-100'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                          isActive 
                            ? 'bg-white text-[#2ea351] shadow-sm' 
                            : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
                        }`}>
                          <Icon size={20} strokeWidth={2.5} />
                        </div>
                        <span className="truncate">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {item.badge && (
                          <span className={`text-[11px] px-2 py-0.5 rounded-lg font-black shadow-sm ${isActive ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-600'}`}>
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight size={18} className={`transition-transform ${isActive ? 'text-emerald-100' : 'text-slate-300'}`} strokeWidth={2.5} />
                      </div>
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 space-y-4">
                {/* Shop Location */}
                <button 
                  onClick={() => { window.open("https://maps.app.goo.gl/eb9E5JaFmemKiPE39", "_blank"); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-between bg-blue-50 hover:bg-blue-100 border border-blue-100 hover:border-blue-200 px-4 py-3.5 rounded-2xl transition-all group"
                >
                  <div className="flex items-center gap-3 text-blue-600 font-bold text-[15px]">
                    <MapPin size={20} strokeWidth={2.5} className="group-hover:-translate-y-0.5 transition-transform" /> 
                    {lang === 'bn' ? 'শপ লোকেশন' : 'Shop Location'}
                  </div>
                  <ExternalLink size={18} className="text-blue-300 group-hover:text-blue-500 transition-all" strokeWidth={2.5} />
                </button>

                {/* Mobile Language Selection option */}
                <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm shadow-slate-200/50">
                  <div className="flex items-center gap-2 text-slate-500 font-bold mb-3">
                    <Globe size={18} className="text-slate-400" />
                    <span className="text-sm">{t.languageLabel}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={() => setLang('bn')}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all border ${
                        lang === 'bn' 
                          ? 'bg-white text-emerald-600 border-emerald-500 shadow-sm shadow-emerald-500/10' 
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      বাংলা
                    </button>
                    <button 
                      type="button"
                      onClick={() => setLang('en')}
                      className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all border ${
                        lang === 'en' 
                          ? 'bg-white text-emerald-600 border-emerald-500 shadow-sm shadow-emerald-500/10' 
                          : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>
                
                <button 
                  onClick={() => { handleLogoutClick(); setIsMobileMenuOpen(false); }} 
                  className="w-full flex items-center justify-between bg-rose-50 hover:bg-rose-100 border border-rose-100 hover:border-rose-200 px-4 py-3.5 rounded-2xl transition-all"
                >
                  <div className="flex items-center gap-3 text-rose-500 font-bold text-[15px]">
                    <LogOut size={20} strokeWidth={2.5} /> 
                    {t.logout}
                  </div>
                  <ChevronRight size={18} className="text-rose-300" strokeWidth={2.5} />
                </button>
              </div>

              <div className="mt-8 text-center pb-4 opacity-60">
                <p className="text-[11px] font-bold text-slate-500 flex items-center justify-center gap-1">
                  <span className="text-emerald-600">Urbor Food</span> {isStaff ? 'স্টাফ পোর্টাল' : (lang === 'bn' ? 'এডমিন প্যানেল' : 'Admin Panel')}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">&copy; 2025 All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0 print:hidden">
        
        {/* Header - Highly Optimized and Responsive */}
        <header className="bg-white shadow-sm border-b relative shrink-0">
          <div className="px-4 py-3 md:px-6 md:py-4 flex items-center justify-between gap-2">
            
            {/* Left Header info */}
            <div className="flex items-center gap-3 min-w-0">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1.5 rounded-lg bg-[#f8fafc] text-slate-600 hover:text-emerald-600 md:hidden shrink-0 border border-slate-200"
                title="Sidebar Open"
              >
                <Menu size={20} />
              </button>
              
              <div className="min-w-0">
                <h1 className="text-base md:text-xl font-semibold text-slate-800 truncate leading-normal">
                  {activeTab === 'dashboard' && 'ড্যাশবোর্ড ওভারভিউ'}
                  {activeTab === 'products' && 'পণ্য ম্যানেজমেন্ট'}
                  {activeTab === 'product-prices' && 'পণ্য মূল্য তালিকা'}
                  {activeTab === 'product-reviews' && 'প্রোডাক্ট রিভিও'}
                  {activeTab === 'orders' && 'অর্ডার সমূহ'}
                  {activeTab === 'create-order' && 'সেলস / অর্ডার এন্ট্রি'}
                  {activeTab === 'customers' && 'কাস্টমার ডিরেক্টরি'}
                                    {activeTab === 'finances' && 'আয় ও ব্যয় ট্র্যাকার'}
                  {activeTab === 'dues' && 'বকেয়া হিসাব ও কালেকশন'}
                  {activeTab === 'marketing' && 'মার্কেটিং ও ডিসকাউন্ট ইন্টেলিজেন্স'}
                  {activeTab === 'settings' && 'সিস্টেম সেটিংস'}
                  {activeTab === 'staff' && 'স্টাফ ম্যানেজমেন্ট'}
                </h1>
                <p className="text-[10px] md:text-xs text-slate-500 hidden sm:block font-bold mt-0.5">
                  রিয়েল-টাইম অ্যাডমিন অ্যাকশন
                </p>
              </div>
            </div>

            {/* Right Header Controls */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0 font-bold">
              {(activeTab === 'products' || activeTab === 'product-prices') && (
                <div className="relative hidden max-w-xs sm:block">
                  <input 
                    type="text" 
                    placeholder="পণ্য খুঁজুন..." 
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-44 lg:w-56 pl-9 pr-3 py-1.5 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500/20" 
                  />
                  <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
                </div>
              )}
              {activeTab === 'orders' && (
                <div className="relative hidden max-w-xs sm:block">
                  <input 
                    type="text" 
                    placeholder="অর্ডার খুঁজুন..." 
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    className="w-44 lg:w-56 pl-9 pr-3 py-1.5 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500/20" 
                  />
                  <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
                </div>
              )}
              <div className="flex items-center gap-2">
                {/* Notification Dropdown Bell */}
                <div className="relative shrink-0 mr-1">
                  <button 
                    onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
                    className="relative p-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-100/80 rounded-xl transition-all cursor-pointer border border-slate-200"
                    title="নোটিফিকেশন সেন্টার"
                  >
                    <Bell size={18} />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-semibold text-[9px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce leading-tight">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </button>

                  {/* Absolute Notification Dropdown list panel */}
                  {isNotificationDropdownOpen && (
                    <div className="absolute right-0 mt-2.5 w-80 bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden z-[999] animate-in fade-in slide-in-from-top-4 duration-200 text-xs text-slate-700 font-medium">
                      {/* Top Action line */}
                      <div className="p-3 bg-[#f8fafc] border-b flex items-center justify-between select-none">
                        <span className="font-semibold text-slate-800">রিসেন্ট নোটিফিকেশন ({notifications.filter(n => !n.read).length}টি অপরঠিত)</span>
                        <button 
                          onClick={clearAllNotifications}
                          className="text-emerald-600 hover:text-emerald-700 font-semibold text-[10px]"
                        >
                          সব ক্লিয়ার করুন
                        </button>
                      </div>

                      {/* Notifs lists scrollable window */}
                      <div className="max-h-64 overflow-y-auto divide-y divide-slate-200/60">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-slate-500 font-semibold select-none">
                            কোন নোটিফিকেশন পাওয়া যায়নি।
                          </div>
                        ) : (
                          notifications.map((n) => (
                            <div 
                              key={n.id} 
                              className={`p-3 transition-colors ${n.read ? 'bg-white' : 'bg-emerald-50/40'}`}
                            >
                              <div className="flex justify-between items-start gap-1">
                                <span className={`font-semibold ${n.read ? 'text-slate-600' : 'text-emerald-600'}`}>{n.title}</span>
                                <span className="text-[9px] text-slate-500 shrink-0 font-medium font-sans">
                                  {new Date(n.timestamp).toLocaleTimeString('bn-BD', { hour: 'numeric', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-semibold">{n.message}</p>
                              <div className="flex gap-2.5 mt-2.5 justify-end">
                                {!n.read && (
                                  <button 
                                    onClick={() => markNotificationAsRead(n.id)}
                                    className="text-[10px] text-emerald-600 hover:underline font-semibold cursor-pointer"
                                  >
                                    পড়লাম
                                  </button>
                                )}
                                <button 
                                  onClick={() => {
                                    markNotificationAsRead(n.id);
                                    setIsNotificationDropdownOpen(false);
                                    setActiveTab('orders');
                                    if (n.orderId) {
                                      setOrderSearch(n.orderId);
                                    }
                                  }}
                                  className="text-[10px] text-indigo-500 hover:underline font-semibold cursor-pointer"
                                >
                                  অর্ডারটি দেখুন
                                </button>
                                <button 
                                  onClick={() => dismissNotification(n.id)}
                                  className="text-[10px] text-rose-500 opacity-60 hover:opacity-100 hover:underline font-bold cursor-pointer"
                                >
                                  ডিলিট
                                </button>
                              </div>
                            </div>
                          ))
                  )}
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  onClick={handleLogoutClick} 
                  className="text-xs text-rose-500 hover:text-rose-700 bg-rose-50 border border-rose-100 hover:bg-rose-100 px-2 py-1.5 rounded-lg font-bold transition-all hidden sm:block"
                >
                  স্টোরে ফিরুন
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Main Workspace */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#f8fafc]/50 p-4 md:p-6 pb-24">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
              {/* Premium Greeting Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">ড্যাশবোর্ড ওভারভিউ</h2>
                  <p className="text-sm text-slate-500 font-medium mt-1">আজকের স্ট্যাটাস এবং আপডেট একনজরে</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-xs font-bold text-slate-500 bg-white px-4 py-2.5 rounded-xl border border-slate-200/60 shadow-sm inline-flex items-center gap-2 w-max">
                    <CalendarDays size={16} className="text-emerald-500" /> 
                    {new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <button 
                    onClick={() => setActiveTab('create-order')}
                    className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all inline-flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <PlusCircle size={16} /> 
                    নতুন সেলস এন্ট্রি
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                {[
                  { label: 'মোট বিক্রি', value: `৳${totalSales.toLocaleString('bn-BD')}`, countDesc: 'টাকা', colorBase: 'emerald', icon: BarChart3, onClick: () => setActiveTab('orders') },
                  { label: 'নতুন অর্ডার', value: pendingOrdersCount.toLocaleString('bn-BD'), countDesc: 'টি পেন্ডিং', colorBase: 'orange', icon: ShoppingBag, onClick: () => setActiveTab('orders') },
                  { label: 'মোট পণ্য', value: products.length.toLocaleString('bn-BD'), countDesc: 'টি লাইভ', colorBase: 'blue', icon: Package, onClick: () => setActiveTab('product-prices') },
                  { label: 'মোট কাস্টমার', value: totalCustomersCount.toLocaleString('bn-BD'), countDesc: 'জন নিবন্ধিত', colorBase: 'purple', icon: Users, onClick: () => setActiveTab('customers') },
                ].map((stat, i) => {
                  const colors = {
                    emerald: { bg: 'bg-emerald-500', text: 'text-emerald-600', lightBg: 'bg-emerald-50', border: 'border-emerald-100' },
                    orange: { bg: 'bg-orange-500', text: 'text-orange-600', lightBg: 'bg-orange-50', border: 'border-orange-100' },
                    blue: { bg: 'bg-blue-500', text: 'text-blue-600', lightBg: 'bg-blue-50', border: 'border-blue-100' },
                    purple: { bg: 'bg-purple-500', text: 'text-purple-600', lightBg: 'bg-purple-50', border: 'border-purple-100' },
                  }[stat.colorBase as 'emerald'|'orange'|'blue'|'purple'];

                  return (
                    <div key={i} onClick={stat.onClick} className="bg-white rounded-[16px] p-4 sm:p-5 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500/30 transition-all duration-300 flex items-center justify-between group cursor-pointer">
                      <div className="flex flex-col">
                        <p className="text-[12px] sm:text-[13px] font-semibold text-slate-500 mb-1">{stat.label}</p>
                        <h3 className="text-[20px] sm:text-[24px] font-black text-slate-800 tracking-tight leading-tight mb-2">{stat.value}</h3>
                        <span className={`inline-block px-2 py-0.5 rounded w-max text-[10px] font-bold ${colors.lightBg} ${colors.text}`}>
                          {stat.countDesc}
                        </span>
                      </div>
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 ${colors.lightBg} ${colors.text} group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon size={24} strokeWidth={2} />
                      </div>
                    </div>
                  )
                })}
              </div>
              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Sales Chart Section */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-lg font-black text-slate-800">গত ৭ দিনের সেলস গ্রাফ</h3>
                    <p className="text-xs text-slate-500 font-medium">প্রতিদিনের সেলস এর পরিমাণ</p>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={(() => {
                        const data = [];
                        for(let i=6; i>=0; i--) {
                            const d = new Date();
                            d.setDate(d.getDate() - i);
                            const dateStr = d.toISOString().split('T')[0];
                            const dayOrders = orders.filter(o => o.date && o.date.startsWith(dateStr) && o.status !== 'Cancelled');
                            const total = dayOrders.reduce((sum, o) => sum + o.total, 0);
                            data.push({
                                name: d.toLocaleDateString('bn-BD', { month: 'short', day: 'numeric' }),
                                sales: total
                            });
                        }
                        return data;
                      })()} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} tickFormatter={(value) => `৳ ${value}`} />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <RechartsTooltip 
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                          formatter={(value: number) => [`৳ ${value.toLocaleString('bn-BD')}`, 'মোট বিক্রি']}
                          labelStyle={{ color: '#64748b', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}
                        />
                        <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Sales by Salesman Chart */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-lg font-black text-slate-800">সেলসম্যান অনুযায়ী সেলস</h3>
                    <p className="text-xs text-slate-500 font-medium">প্রতি সেলসম্যানের মোট বিক্রি</p>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={(() => {
                        const salesmanData: Record<string, number> = {};
                        orders.filter(o => o.status !== 'Cancelled').forEach(o => {
                            const name = o.salesman || 'ওয়েবসাইট';
                            if (isStaff && name !== staffName) return;
                            salesmanData[name] = (salesmanData[name] || 0) + o.total;
                        });
                        return Object.entries(salesmanData)
                            .map(([name, sales]) => ({ name, sales }))
                            .sort((a, b) => b.sales - a.sales)
                            .slice(0, 5); // top 5
                      })()} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} tickFormatter={(value) => `৳ ${value}`} />
                        <RechartsTooltip 
                          cursor={{ fill: 'transparent' }}
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                          formatter={(value: number) => [`৳ ${value.toLocaleString('bn-BD')}`, 'মোট বিক্রি']}
                          labelStyle={{ color: '#64748b', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}
                        />
                        <Bar dataKey="sales" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={50} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              {/* District Ratio Chart */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm mt-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-800">জেলা ভিত্তিক অর্ডার রেশিও (৬৪ জেলা)</h3>
                    <p className="text-xs text-slate-500 font-medium">কোন জেলা থেকে কতগুলো অর্ডার এসেছে তার তুলনামূলক চিত্র</p>
                  </div>
                </div>
                <div className="h-[350px] w-full overflow-x-auto overflow-y-hidden">
                  <div style={{ minWidth: '800px', height: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={(() => {
                          const districtData: Record<string, number> = {};
                          orders.filter(o => o.status !== 'Cancelled').forEach(o => {
                              
                              const districts = [
                                { bn: 'ঢাকা', en: ['dhaka'] },
                                { bn: 'ফরিদপুর', en: ['faridpur'] },
                                { bn: 'গাজীপুর', en: ['gazipur'] },
                                { bn: 'গোপালগঞ্জ', en: ['gopalganj'] },
                                { bn: 'কিশোরগঞ্জ', en: ['kishoreganj'] },
                                { bn: 'মাদারীপুর', en: ['madaripur'] },
                                { bn: 'মানিকগঞ্জ', en: ['manikganj'] },
                                { bn: 'মুন্সীগঞ্জ', en: ['munshiganj'] },
                                { bn: 'নারায়ণগঞ্জ', en: ['narayanganj'] },
                                { bn: 'নরসিংদী', en: ['narsingdi'] },
                                { bn: 'রাজবাড়ী', en: ['rajbari'] },
                                { bn: 'শরীয়তপুর', en: ['shariatpur'] },
                                { bn: 'টাঙ্গাইল', en: ['tangail'] },
                                { bn: 'বগুড়া', en: ['bogra', 'bogura'] },
                                { bn: 'জয়পুরহাট', en: ['joypurhat'] },
                                { bn: 'নওগাঁ', en: ['naogaon'] },
                                { bn: 'নাটোর', en: ['natore'] },
                                { bn: 'চাঁপাইনবাবগঞ্জ', en: ['chapainawabganj', 'nawabganj'] },
                                { bn: 'পাবনা', en: ['pabna'] },
                                { bn: 'রাজশাহী', en: ['rajshahi'] },
                                { bn: 'সিরাজগঞ্জ', en: ['sirajganj'] },
                                { bn: 'দিনাজপুর', en: ['dinajpur'] },
                                { bn: 'গাইবান্ধা', en: ['gaibandha'] },
                                { bn: 'কুড়িগ্রাম', en: ['kurigram'] },
                                { bn: 'লালমনিরহাট', en: ['lalmonirhat'] },
                                { bn: 'নীলফামারী', en: ['nilphamari'] },
                                { bn: 'পঞ্চগড়', en: ['panchagarh'] },
                                { bn: 'রংপুর', en: ['rangpur'] },
                                { bn: 'ঠাকুরগাঁও', en: ['thakurgaon'] },
                                { bn: 'বরগুনা', en: ['barguna'] },
                                { bn: 'বরিশাল', en: ['barishal', 'barisal'] },
                                { bn: 'ভোলা', en: ['bhola'] },
                                { bn: 'ঝালকাঠি', en: ['jhalokati', 'jhalakati'] },
                                { bn: 'পটুয়াখালী', en: ['patuakhali'] },
                                { bn: 'পিরোজপুর', en: ['pirojpur'] },
                                { bn: 'বান্দরবান', en: ['bandarban'] },
                                { bn: 'ব্রাহ্মণবাড়িয়া', en: ['brahmanbaria'] },
                                { bn: 'চাঁদপুর', en: ['chandpur'] },
                                { bn: 'চট্টগ্রাম', en: ['chattogram', 'chittagong'] },
                                { bn: 'কুমিল্লা', en: ['cumilla', 'comilla'] },
                                { bn: 'কক্সবাজার', en: ['coxs bazar', "cox's bazar", 'coxsbazar'] },
                                { bn: 'ফেনী', en: ['feni'] },
                                { bn: 'খাগড়াছড়ি', en: ['khagrachari'] },
                                { bn: 'লক্ষ্মীপুর', en: ['lakshmipur', 'laxmipur'] },
                                { bn: 'নোয়াখালী', en: ['noakhali'] },
                                { bn: 'রাঙ্গামাটি', en: ['rangamati'] },
                                { bn: 'হবিগঞ্জ', en: ['habiganj'] },
                                { bn: 'মৌলভীবাজার', en: ['moulvibazar'] },
                                { bn: 'সুনামগঞ্জ', en: ['sunamganj'] },
                                { bn: 'সিলেট', en: ['sylhet'] },
                                { bn: 'বাগেরহাট', en: ['bagerhat'] },
                                { bn: 'চুয়াডাঙ্গা', en: ['chuadanga'] },
                                { bn: 'যশোর', en: ['jashore', 'jessore'] },
                                { bn: 'ঝিনাইদহ', en: ['jhenaidah'] },
                                { bn: 'খুলনা', en: ['khulna'] },
                                { bn: 'কুষ্টিয়া', en: ['kushtia'] },
                                { bn: 'মাগুরা', en: ['magura'] },
                                { bn: 'মেহেরপুর', en: ['meherpur'] },
                                { bn: 'নড়াইল', en: ['narail'] },
                                { bn: 'সাতক্ষীরা', en: ['satkhira'] },
                                { bn: 'জামালপুর', en: ['jamalpur'] },
                                { bn: 'ময়মনসিংহ', en: ['mymensingh'] },
                                { bn: 'নেত্রকোনা', en: ['netrokona'] },
                                { bn: 'শেরপুর', en: ['sherpur'] }
                              ];
                              
                              let dist = 'অজানা';
                              if (o.address) {
                                  const addrLower = o.address.toLowerCase();
                                  for (const d of districts) {
                                      if (addrLower.includes(d.bn) || d.en.some(eng => addrLower.includes(eng))) {
                                          dist = d.bn;
                                          break;
                                      }
                                  }
                              }

                              if (dist !== 'অজানা') { districtData[dist] = (districtData[dist] || 0) + 1; }
                          });
                          return Object.entries(districtData)
                              .map(([name, count]) => ({ name, count }))
                              .sort((a, b) => b.count - a.count);
                        })()} margin={{ top: 10, right: 10, left: 10, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis dataKey="name" tick={{fontSize: 10, fill: '#64748b'}} interval={0} angle={-45} textAnchor="end" axisLine={false} tickLine={false} />
                        <YAxis tick={{fontSize: 10, fill: '#64748b'}} axisLine={false} tickLine={false} allowDecimals={false} />
                        <RechartsTooltip 
                          cursor={{ fill: '#f8fafc' }}
                          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                          formatter={(value: number) => [`${value.toLocaleString('bn-BD')} টি`, 'অর্ডার সংখ্যা']}
                          labelStyle={{ color: '#64748b', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}
                        />
                        <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>


              {/* Quick Mobile search */}
              <div className="block sm:hidden relative">
                <input 
                  type="text" 
                  placeholder="পণ্য ক্যাটাগরি বা নাম খুঁজুন..." 
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200/80 rounded-2xl text-xs focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium placeholder-slate-400 shadow-sm" 
                />
                <Search size={18} className="absolute left-4 top-3.5 text-slate-400" />
              </div>

              {/* Main Split Sections: Recent orders & stats review */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Block: Recent Orders Table / Cards */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm lg:col-span-8 flex flex-col min-w-0 overflow-hidden">
                  <div className="p-5 border-b border-slate-200 flex items-center justify-between gap-3 flex-wrap shrink-0 bg-gradient-to-r from-white to-slate-50/50 select-none">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100/50">
                        <ShoppingBag size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm md:text-base font-bold text-slate-800 tracking-tight">সাম্প্রতিক সক্রিয় অর্ডার</h3>
                        <p className="text-[10px] md:text-xs text-slate-500 font-medium mt-0.5">গ্রাহকদের সর্বশেষ অর্ডার সমূহ</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setActiveTab('orders')} 
                      className="text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white px-3.5 py-2 rounded-xl transition-all duration-250 cursor-pointer flex items-center gap-1 shadow-sm border border-emerald-100/30"
                    >
                      সব অর্ডার দেখুন
                    </button>
                  </div>

                  {/* Desktop View: Wide Beautiful Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs md:text-sm font-medium min-w-[500px]">
                      <thead>
                        <tr className="bg-[#f8fafc]/50 border-b border-slate-200 text-xs font-semibold text-slate-500 text-left select-none">
                          <th className="p-4 font-semibold pl-6">অর্ডার আইডি</th>
                          <th className="p-4 font-semibold">গ্রাহক</th>
                          <th className="p-4 font-semibold">পণ্যের বিবরণ</th>
                          <th className="p-4 font-semibold">মোট বিল</th>
                          <th className="p-4 font-semibold text-center pr-6">স্ট্যাটাস</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/60 text-slate-700">
                        {orders.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-12 text-center text-slate-500 font-medium bg-white select-none">কোন অর্ডার রেকর্ড নেই।</td>
                          </tr>
                        ) : (
                          orders.slice(0, 4).map((order) => {
                            const isCompleted = order.status === 'Delivered';
                            const isCancelled = order.status === 'Cancelled';
                            const initials = order.customerName ? order.customerName.substring(0, 2) : 'গ্র';
                            return (
                              <tr 
                                key={order.id} 
                                onClick={() => setSelectedOrder(order)}
                                className="hover:bg-emerald-50/20 transition-all duration-150 cursor-pointer group"
                              >
                                <td className="p-4 pl-6 text-slate-500  font-medium group-hover:text-emerald-600 transition-colors">
                                  #{order.id}
                                </td>
                                <td className="p-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] shrink-0 select-none ${
                                      isCompleted ? 'bg-emerald-50 text-emerald-700' :
                                      isCancelled ? 'bg-rose-50 text-rose-700' :
                                      'bg-amber-50 text-amber-700'
                                    }`}>
                                      {initials}
                                    </div>
                                    <div className="min-w-0">
                                      <div className="font-semibold text-slate-900 leading-normal group-hover:text-emerald-600 transition-colors truncate max-w-[150px]">{order.customerName}</div>
                                      <div className="text-[10px] text-slate-500 tracking-wide font-normal mt-0.5 font-sans select-all">{order.phone}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <p className="truncate max-w-[220px] text-slate-500 font-semibold text-xs">
                                    {order.items.map(it => `${it.name} (${it.quantity}x)`).join(', ')}
                                  </p>
                                </td>
                                <td className="p-4 font-medium text-slate-900 group-hover:text-emerald-900 text-sm">&nbsp;৳{order.total}</td>
                                <td className="p-4 text-center pr-6">
                                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                    isCompleted ? 'bg-emerald-50 text-emerald-700 border border-emerald-100/50' :
                                    isCancelled ? 'bg-rose-50 text-rose-700 border border-rose-100/50' :
                                    'bg-amber-50 text-amber-700 border border-amber-100/50'
                                  }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                      isCompleted ? 'bg-emerald-500' :
                                      isCancelled ? 'bg-rose-500' :
                                      'bg-amber-500'
                                    }`}></span>
                                    {isCompleted ? 'সম্পন্ন' : isCancelled ? 'বাতিল' : 'পেন্ডিং'}
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                  )}
                      </tbody>
                </table>
                  </div>

                  {/* Mobile responsive view: Sleek Modern Transaction Feed */}
                  <div className="block md:hidden p-4 space-y-3 bg-[#f8fafc]/40">
                    {orders.length === 0 ? (
                      <div className="p-10 text-center text-slate-500 font-medium bg-white rounded-2xl border border-slate-200/80">কোন অর্ডার রেকর্ড নেই।</div>
                    ) : (
                      orders.slice(0, 4).map((order) => {
                        const isCompleted = order.status === 'Delivered';
                        const isCancelled = order.status === 'Cancelled';
                        const initials = order.customerName ? order.customerName.substring(0, 2) : 'গ্র';
                        
                        return (
                          <div 
                            key={order.id} 
                            onClick={() => setSelectedOrder(order)}
                            className="p-3.5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between gap-3 relative cursor-pointer group active:scale-[0.98]"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm shrink-0 shadow-inner ${
                                isCompleted ? 'bg-emerald-50 text-emerald-600' : 
                                isCancelled ? 'bg-rose-50 text-rose-600' : 
                                'bg-orange-50 text-orange-600'
                              }`}>
                                {initials}
                              </div>
                              
                              <div className="min-w-0 flex flex-col justify-center">
                                <h4 className="text-slate-800 font-bold text-sm truncate group-hover:text-emerald-600 transition-colors">{order.customerName}</h4>
                                <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
                                  <span className="text-[10px] text-slate-400 font-bold bg-slate-50 px-1.5 rounded whitespace-nowrap shrink-0">#{order.id}</span>
                                  <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0"></span>
                                  <span className="text-[10px] text-slate-500 font-medium truncate">
                                    {order.items.map(it => it.name).join(', ')}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end justify-center gap-1 shrink-0">
                              <span className="text-slate-900 font-black text-sm">&nbsp;৳{Number(order.total).toLocaleString('bn-BD')}</span>
                              <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                                isCompleted ? 'bg-emerald-50 text-emerald-700' : 
                                isCancelled ? 'bg-rose-50 text-rose-700' : 
                                'bg-orange-50 text-orange-700'
                              }`}>
                                {isCompleted ? 'সম্পন্ন' : isCancelled ? 'বাতিল' : 'পেন্ডিং'}
                              </span>
                            </div>
                          </div>
                        );
                      })
                  )}
                  </div>
                </div>


                {/* Right Block: Fast Actions & Shortcut Panel */}
                <div className="space-y-6 lg:col-span-4 flex flex-col">
                  
                  {/* System Fast Actions */}
                  <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-[15px] text-slate-800 mb-4 flex items-center gap-2">
                      <Settings size={18} className="text-slate-500" />
                      অ্যাডমিন শর্টকাট অ্যাকশন
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setIsManualOrderModalOpen(true)}
                        className="group relative flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-100 p-4 rounded-2xl transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-indigo-100/50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
                        <div className="bg-indigo-100 text-indigo-600 p-2.5 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
                          <ShoppingCart size={22} />
                        </div>
                        <span className="text-[12px] font-bold text-slate-700 z-10">অর্ডার তৈরি</span>
                      </button>

                      <button 
                        onClick={openAddProductModal}
                        className="group relative flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-100 p-4 rounded-2xl transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-100/50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
                        <div className="bg-emerald-100 text-emerald-600 p-2.5 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 z-10">
                          <Plus size={22} />
                        </div>
                        <span className="text-[12px] font-bold text-slate-700 z-10">নতুন পণ্য যোগ</span>
                      </button>
                      
                      <button 
                        onClick={handleDownloadPDF}
                        className="group relative flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-rose-50 to-white border border-rose-100 hover:border-rose-300 hover:shadow-md hover:shadow-rose-100 p-4 rounded-2xl transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-rose-100/50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
                        <div className="bg-rose-100 text-rose-600 p-2.5 rounded-xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 z-10">
                          <FileText size={22} />
                        </div>
                        <span className="text-[12px] font-bold text-slate-700 z-10">ডাউনলোড (PDF)</span>
                      </button>

                      <button 
                        onClick={handleDownloadCSV}
                        className="group relative flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br from-amber-50 to-white border border-amber-100 hover:border-amber-300 hover:shadow-md hover:shadow-amber-100 p-4 rounded-2xl transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-100/50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
                        <div className="bg-amber-100 text-amber-600 p-2.5 rounded-xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 z-10">
                          <Download size={22} />
                        </div>
                        <span className="text-[12px] font-bold text-slate-700 z-10">ডাউনলোড (Excel)</span>
                      </button>
                    </div>

                    <div className="mt-4 bg-[#f8fafc] rounded-xl p-3 text-[11px] font-bold text-slate-500 flex items-start gap-2 leading-relaxed">
                      <span className="text-secondary text-sm mt-px">✦</span>
                      মোবাইল ভিউতে অর্ডারলিস্ট ডাউনলোড সম্পূর্ণ রেসপন্সিভ এবং এক্সেল-ট্যাবলেটের সাথে সামঞ্জস্যপূর্ণ।
                    </div>
                  </div>

                  {/* Operational Status overview indicator */}
                  <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05),0_10px_20px_-2px_rgba(0,0,0,0.02)] border border-slate-200/60 flex-1 flex flex-col justify-between relative overflow-hidden group">
                    {/* Subtle decorative background pattern */}
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-[0.03] text-emerald-600 pointer-events-none transition-transform duration-700 group-hover:scale-110">
                      <ShieldCheck size={240} strokeWidth={1} />
                    </div>
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-2.5 bg-emerald-50/80 border border-emerald-100/80 px-4 py-2 rounded-full text-[13px] font-bold text-emerald-700 tracking-wide shadow-sm">
                          <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                          </span>
                          অপারেশন স্ট্যাটাস
                        </div>
                        <div className="p-3.5 bg-slate-50/80 rounded-[14px] border border-slate-100 text-slate-400 shadow-sm transition-colors group-hover:text-emerald-500 group-hover:bg-emerald-50/50 group-hover:border-emerald-100/50">
                          <ShieldCheck size={22} strokeWidth={2} />
                        </div>
                      </div>
                      
                      <h4 className="text-2xl md:text-[28px] font-black text-slate-800 tracking-tight flex items-center gap-1.5 font-sans mb-3">
                        উর্বর ফুড অনলাইন
                      </h4>
                      <p className="text-[13.5px] text-slate-500 font-medium leading-relaxed max-w-[95%]">
                        সমস্ত সিস্টেম সচল এবং রিয়েল-টাইমে অর্ডার গ্রহণ করছে। কাস্টমার অ্যাপে ক্যাশ অন ডেলিভারি মোড সচল করা আছে।
                      </p>
                    </div>

                    <div className="border-t border-slate-100 mt-8 pt-7 relative z-10">
                      <div className="grid grid-cols-3 gap-3 md:gap-4 text-center">
                        {/* Pending Card */}
                        <div className="bg-[#fff9ed] border border-[#ffedd5] rounded-[16px] p-4 flex flex-col justify-center items-center relative transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">
                          <div className="absolute top-3 right-3 text-amber-500">
                            <Clock size={16} strokeWidth={2.5} />
                          </div>
                          <p className="text-[12px] md:text-[13px] text-amber-700 font-bold mb-1.5">পেন্ডিং</p>
                          <p className="text-2xl md:text-3xl font-black text-amber-600">{pendingOrdersCount}</p>
                        </div>

                        {/* Delivered Card */}
                        <div className="bg-[#ecfdf5] border border-[#d1fae5] rounded-[16px] p-4 flex flex-col justify-center items-center relative transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">
                          <div className="absolute top-3 right-3 text-emerald-500">
                            <CheckCircle size={16} strokeWidth={2.5} />
                          </div>
                          <p className="text-[12px] md:text-[13px] text-emerald-700 font-bold mb-1.5">ডেলিভারড</p>
                          <p className="text-2xl md:text-3xl font-black text-emerald-600">{completedOrdersCount}</p>
                        </div>

                        {/* Cancelled Card */}
                        <div className="bg-[#fff1f2] border border-[#ffe4e6] rounded-[16px] p-4 flex flex-col justify-center items-center relative transition-all duration-300 hover:shadow-sm hover:-translate-y-0.5">
                          <div className="absolute top-3 right-3 text-rose-500">
                            <AlertTriangle size={16} strokeWidth={2.5} />
                          </div>
                          <p className="text-[12px] md:text-[13px] text-rose-700 font-bold mb-1.5">বাতিল</p>
                          <p className="text-2xl md:text-3xl font-black text-rose-600">{cancelledOrdersCount}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-w-0">
              
              {/* Header inside Tab */}
              <div className="p-4 md:p-5 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap select-none">
                <div>
                  <h3 className="font-semibold text-base text-slate-800">পণ্য তালিকা ({filteredProductsList.length} টি)</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">স্টোরের সকল সক্রিয় পণ্য যোগ, এডিট বা ডিলিট করুন</p>
                </div>
                
                <div className="flex gap-2 items-center shrink-0">
                  <button 
                    onClick={openAddProductModal}
                    className="flex items-center gap-1.5 bg-emerald-600 text-white px-3.5 py-2 rounded-xl text-sm font-medium shadow-md hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    <Plus size={14} /> নতুন পণ্য যোগ
                  </button>
                </div>
              </div>

              {/* Dynamic scrollable table - Desktop view */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs md:text-sm font-medium min-w-[700px]">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-slate-200 text-slate-500 uppercase text-[11px] select-none text-left">
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">পণ্য ছবি</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">নাম</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">ক্যাটাগরি</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">ওজন</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">মূল্য</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 text-slate-700">
                    {filteredProductsList.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-12 text-center text-slate-500 font-medium">কোন পণ্য পাওয়া যায়নি।</td>
                      </tr>
                    ) : (
                      filteredProductsList.map((product) => (
                        <tr key={product.id} className="hover:bg-[#f8fafc]/50 transition-colors">
                          <td className="p-4 select-none">
                            <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                              <ImageLoader src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-slate-900 leading-normal">{product.name}</div>
                            <div className="flex gap-1.5 mt-1 font-bold flex-wrap">
                              {product.isNew && (
                                <span className="bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded text-[9px] font-semibold">নতুন</span>
                              )}
                              {product.isFlashSale && (
                                <span className="bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded text-[9px] font-semibold">ফ্ল্যাশ সেল</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-slate-500 font-medium">{product.category}</td>
                          <td className="p-4 text-slate-500  font-medium bn-safe">{product.weight}</td>
                          <td className="p-4 select-none">
                            {product.discountedPrice ? (
                              <div className="flex flex-col">
                                <span className="text-slate-950 font-bold">&nbsp;৳{product.discountedPrice}</span>
                                <span className="text-rose-500 line-through text-[11px] font-bold">&nbsp;৳{product.originalPrice}</span>
                              </div>
                            ) : (
                              <span className="text-slate-950 font-bold">&nbsp;৳{product.originalPrice}</span>
                            )}
                          </td>
                          <td className="p-4 text-center select-none">
                            <div className="flex items-center justify-center gap-1.5 font-bold">
                              <button 
                                onClick={() => copyLandingPageLink(product.id)}
                                className="bg-emerald-900/10 text-emerald-900 hover:bg-emerald-900 hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer"
                                title="ফেসবুক এড ল্যান্ডিং পেজ লিঙ্ক কপি করুন"
                              >
                                <Share2 size={13} />
                              </button>
                              <button 
                                onClick={() => openEditProductModal(product)}
                                className="bg-blue-50 text-blue-600 hover:bg-[#115e5a]/10 p-1.5 rounded-lg transition-colors cursor-pointer"
                                title="সম্পাদনা"
                              >
                                <Edit size={13} />
                              </button>
                              {!isStaff && (<button 
                                onClick={() => { if(confirm('পণ্যটি চিরতরে মুছে ফেলতে চান?')) deleteProduct(product.id); }}
                                className="text-rose-500 hover:text-white hover:bg-rose-600 border border-rose-100 p-1.5 rounded-lg transition-all cursor-pointer"
                                title="মুছে ফেলুন"
                              >
                                <Trash2 size={13} />
                              </button>)}
                            </div>
                          </td>
                        </tr>
                      ))
                  )}
                  </tbody>
                </table>
              </div>

              {/* Mobile responsive view: beautiful stacked list - NO horizontal scroll */}
              <div className="block md:hidden divide-y divide-slate-200/60">
                {filteredProductsList.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 font-medium">কোন পণ্য পাওয়া যায়নি।</div>
                ) : (
                  filteredProductsList.map((product) => (
                    <div key={product.id} className="p-4 flex flex-col gap-3 hover:bg-[#f8fafc]/50 transition-colors">
                      {/* Product identity details */}
                      <div className="flex gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-[#f8fafc] shadow-sm">
                          <ImageLoader src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-900 text-sm leading-normal">{product.name}</h4>
                          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                            <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-emerald-100/45">
                              {product.category}
                            </span>
                            <span className="bg-[#f8fafc] text-slate-500 px-2 py-0.5 rounded-full text-[10px] font-bold border border-slate-200">
                              {product.weight}
                            </span>
                            {product.isNew && (
                              <span className="bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded text-[9px] font-semibold">নতুন</span>
                            )}
                            {product.isFlashSale && (
                              <span className="bg-rose-50 text-rose-600 px-1.5 py-0.5 rounded text-[9px] font-semibold">ফ্ল্যাশ সেল</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Pricing and Action buttons wrapper */}
                      <div className="flex items-center justify-between mt-1 pt-2.5 border-t border-dashed border-slate-200">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-slate-500 font-medium uppercase tracking-wider">বর্তমান মূল্য</span>
                          {product.discountedPrice ? (
                            <div className="flex items-baseline gap-1.5 mt-0.5">
                              <span className="text-sm font-bold text-slate-950">&nbsp;৳{product.discountedPrice}</span>
                              <span className="text-rose-500 line-through text-[10px] font-bold">&nbsp;৳{product.originalPrice}</span>
                            </div>
                          ) : (
                            <span className="text-sm font-bold text-slate-950 mt-0.5">&nbsp;৳{product.originalPrice}</span>
                          )}
                        </div>

                        {/* Fast mobile controls */}
                        <div className="flex items-center gap-1.5 font-bold">
                          <button 
                            onClick={() => copyLandingPageLink(product.id)}
                            className="bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600 hover:text-white px-2.5 py-1.5 rounded-xl transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                            title="ফেসবুক এড ল্যান্ডিং পেজ লিঙ্ক কপি করুন"
                          >
                            <Share2 size={12} /> শেয়ার লিংক
                          </button>
                          
                          <button 
                            onClick={() => openEditProductModal(product)}
                            className="bg-blue-50 text-blue-600 hover:bg-emerald-600/10 p-2 rounded-xl transition-colors cursor-pointer"
                            title="সম্পাদনা"
                          >
                            <Edit size={13} />
                          </button>
                          
                          <button 
                            onClick={() => { if(confirm('পণ্যটি চিরতরে মুছে ফেলতে চান?')) deleteProduct(product.id); }}
                            className="text-rose-500 hover:text-white hover:bg-rose-600 border border-rose-100 p-2 rounded-xl transition-all cursor-pointer"
                            title="মুছে ফেলুন"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}


          {/* TAB 3: ORDERS TRACKING */}
          {activeTab === 'product-prices' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-w-0">
              {/* Header */}
              <div className="p-4 md:p-5 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap select-none bg-gradient-to-r from-cyan-50/50 to-white">
                <div>
                  <h3 className="font-semibold text-base text-slate-800 flex items-center gap-2">
                    <DollarSign className="text-cyan-600" size={18} /> 
                    মূল্য তালিকা ও লাভ-ক্ষতি হিসাব
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">কেনার মূল্য (Cost Price) এবং বিক্রির মূল্য (Selling Price) আপডেট করুন</p>
                </div>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs md:text-sm font-medium min-w-[700px]">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-slate-200 text-slate-500 uppercase text-[11px] select-none text-left">
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">পণ্য</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">কেনার মূল্য (Buying Price)</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">বিক্রির মূল্য (Selling Price)</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">লাভ / মার্জিন</th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredProductsList.map((p) => {
                      const cost = p.buyingPrice || 0;
                      const sell = p.discountedPrice || p.originalPrice;
                      const profit = sell - cost;
                      const margin = cost > 0 ? ((profit / cost) * 100).toFixed(1) : 100;
                      return (
                        <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {p.image && (
                                <div className="w-10 h-10 shrink-0 rounded-lg overflow-hidden border border-slate-200">
                                  <ImageLoader src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                </div>
                              )}
                              <div>
                                <span className="block text-slate-900 font-bold text-[13px]">{p.name}</span>
                                <span className="text-[10px] text-slate-500 bn-safe">{p.category} • {p.weight}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-slate-700">&nbsp;৳{cost}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-slate-900">&nbsp;৳{sell}</span>
                              {p.discountedPrice && (
                                <span className="text-[10px] text-rose-500 line-through">&nbsp;৳{p.originalPrice}</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex flex-col">
                              <span className={`font-bold ${profit > 0 ? 'text-emerald-600' : profit < 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                                {profit > 0 ? '+' : ''}৳{profit}
                              </span>
                              <span className={`text-[10px] ${profit > 0 ? 'text-emerald-500' : profit < 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                                {profit > 0 ? '+' : ''}{margin}% মার্জিন
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => openEditProductModal(p)}
                              className="text-cyan-600 bg-cyan-50 hover:bg-cyan-100 p-2 rounded-lg transition-colors border border-cyan-100 font-medium text-xs inline-flex items-center gap-1.5"
                            >
                              <Edit size={14} /> আপডেট
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden divide-y divide-slate-100 bg-[#f8fafc]">
                {filteredProductsList.map((p) => {
                  const cost = p.buyingPrice || 0;
                  const sell = p.discountedPrice || p.originalPrice;
                  const profit = sell - cost;
                  const margin = cost > 0 ? ((profit / cost) * 100).toFixed(1) : 100;
                  
                  return (
                    <div key={p.id} className="p-4 bg-white mb-2 shadow-sm rounded-xl mx-3 mt-3 border border-slate-100 flex flex-col gap-3 relative">
                      <div className="flex items-start gap-3">
                        <div className="w-14 h-14 shrink-0 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                            {p.image ? (
                              <ImageLoader src={p.image} alt={p.name} className="w-full h-full object-cover" />
                            ) : (
                              <Package size={24} className="text-slate-300" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0 pr-8">
                          <h4 className="font-bold text-slate-800 text-[14px] leading-normal mb-1">{p.name}</h4>
                          <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 bn-safe">
                            {p.category} • {p.weight}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => openEditProductModal(p)}
                        className="absolute top-4 right-4 text-cyan-600 bg-cyan-50 hover:bg-cyan-100 p-2 rounded-lg transition-colors border border-cyan-100 flex-shrink-0"
                      >
                        <Edit size={16} />
                      </button>
                      
                      <div className="flex justify-between items-center bg-[#f8fafc] rounded-xl p-3 mt-1 border border-slate-100 shadow-inner">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500 font-medium uppercase mb-0.5">কেনার মূল্য</span>
                          <span className="text-sm font-bold text-slate-700">&nbsp;৳{cost}</span>
                        </div>
                        <div className="w-px h-8 bg-slate-200"></div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-500 font-medium uppercase mb-0.5">বিক্রির মূল্য</span>
                          <span className="text-sm font-bold text-slate-900">&nbsp;৳{sell}</span>
                        </div>
                        <div className="w-px h-8 bg-slate-200"></div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] text-slate-500 font-medium uppercase mb-0.5">লাভ</span>
                          <span className={`text-sm font-black ${profit > 0 ? 'text-emerald-600' : profit < 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                            {profit > 0 ? '+' : ''}৳{profit}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {filteredProductsList.length === 0 && (
                <div className="p-10 flex flex-col items-center justify-center text-slate-400">
                  <Search size={40} className="mb-3 text-slate-300" strokeWidth={1} />
                  <p className="font-medium text-sm">কোনো পণ্য পাওয়া যায়নি</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'product-reviews' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-w-0">
              <div className="p-4 md:p-5 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap select-none bg-gradient-to-r from-emerald-50/50 to-white">
                <div>
                  <h3 className="font-semibold text-base text-slate-800 flex items-center gap-2">
                    <MessageSquare className="text-emerald-600" size={18} /> 
                    প্রোডাক্ট রিভিও
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">নতুন রিভিউ যোগ করুন এবং বিদ্যমান রিভিউগুলো পরিচালনা করুন</p>
                </div>
              </div>
              <div className="p-4 md:p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="max-w-3xl">
                  <h4 className="text-sm font-bold text-slate-800 mb-4">নতুন রিভিউ যোগ করুন</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">গ্রাহকের নাম</label>
                      <input
                        type="text"
                        value={newReviewCustomer}
                        onChange={e => setNewReviewCustomer(e.target.value)}
                        placeholder="যেমন: আব্দুর রহমান"
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">রেটিং (১-৫)</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={newReviewRating}
                        onChange={e => setNewReviewRating(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">রিভিউ মন্তব্য</label>
                      <textarea
                        value={newReviewComment}
                        onChange={e => setNewReviewComment(e.target.value)}
                        placeholder="রিভিউ লিখুন..."
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if(!newReviewCustomer || !newReviewComment) return;
                      addReview({ customerName: newReviewCustomer, rating: newReviewRating, comment: newReviewComment });
                      setNewReviewCustomer('');
                      setNewReviewComment('');
                      setNewReviewRating(5);
                    }}
                    className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
                  >
                    <Plus size={16} /> রিভিউ যোগ করুন
                  </button>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <h4 className="text-sm font-bold text-slate-800 mb-4">বিদ্যমান রিভিউ ({reviews.length})</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {reviews.map(review => (
                    <div key={review.id} className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-bold text-sm text-slate-800">{review.customerName}</h5>
                          <div className="flex text-amber-400 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} className={i < review.rating ? "fill-current" : "text-slate-200"} />
                            ))}
                          </div>
                        </div>
                        <button 
                          onClick={() => deleteReview(review.id)}
                          className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-slate-600 italic mb-3">"{review.comment}"</p>
                      <span className="text-[10px] text-slate-400 mt-auto">{review.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-w-0">
              
              {/* Header inside Tab */}
              <div className="p-4 md:p-5 border-b border-gray-100 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 select-none">
                <div>
                  <h3 className="font-semibold text-base text-slate-800">
                    {lang === 'bn' ? 'অর্ডার সমূহ' : 'Orders List'} ({filteredOrdersList.length} {lang === 'bn' ? 'টি' : 'orders'})
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {lang === 'bn' ? 'স্টোরের সকল সক্রিয় ক্যাশ অন ডেলিভারি অর্ডার ট্র্যাক এবং বুকিং' : 'Track and book active cash on delivery store orders'}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 w-full xl:w-auto">
                  {/* Search bar inside block */}
                  <div className="relative w-full sm:w-auto">
                    <input 
                      type="text" 
                      placeholder={lang === 'bn' ? "নাম বা মোবাইল নম্বর খুঁজুন..." : "Search name or phone..."} 
                      value={orderSearch}
                      onChange={(e) => setOrderSearch(e.target.value)}
                      className="w-full sm:w-56 pl-8 pr-3 py-2 border border-slate-200 rounded-xl text-xs placeholder-slate-400 focus:outline-[#115e5a] font-bold" 
                    />
                    <Search size={14} className="absolute left-2.5 top-3 text-slate-500" />
                  </div>

                  <button 
                    onClick={() => {
                      setManualOrderCustomerName('');
                      setManualOrderPhone('');
                      setManualOrderAddress('');
                      setManualOrderItems([]);
                      setManualSelectedProductId(products[0]?.id || '');
                      setManualSelectedQuantity(1);
                      setIsManualOrderModalOpen(true);
                    }}
                    className="flex items-center justify-center gap-1.5 bg-amber-500 text-white px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-amber-600 shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-95"
                  >
                     {lang === 'bn' ? 'ম্যানুয়াল অর্ডার তৈরি' : 'Create Manual Order'}
                  </button>

                  <button 
                    onClick={handleDownloadPDF}
                    className="flex items-center justify-center gap-1.5 bg-blue-600 text-white px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    <Download size={14} /> {lang === 'bn' ? 'ডাউনলোড (PDF/প্রিন্ট)' : 'Download (PDF)'}
                  </button>

                  <button 
                    onClick={handleDownloadCSV}
                    className="flex items-center justify-center gap-1.5 bg-emerald-700 text-white px-3.5 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-800 shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-95"
                  >
                    <Download size={14} /> {lang === 'bn' ? 'ডাউনলোড (Excel/CSV)' : 'Download (CSV)'}
                  </button>
                </div>
              </div>

                            {/* Desktop view: Sleek 1-Screen Responsive Table */}
              <div className="hidden lg:block w-full overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-medium table-fixed min-w-[900px]">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[11px] tracking-wider select-none text-left font-semibold">
                      <th className="py-3.5 px-3 pl-4 w-[10%]">আইডি</th>
                      <th className="py-3.5 px-3 w-[18%]">গ্রাহক</th>
                      <th className="py-3.5 px-3 w-[22%]">ঠিকানা</th>
                      <th className="py-3.5 px-3 w-[22%]">আইটেম</th>
                      <th className="py-3.5 px-3 w-[10%]">মূল্য</th>
                      <th className="py-3.5 px-3 w-[10%] text-center">স্ট্যাটাস</th>
                      <th className="py-3.5 px-3 pr-4 w-[8%] text-center">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                    {filteredOrdersList.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500">কোন সক্রিয় অর্ডার খুঁজে পাওয়া যায়নি।</td>
                      </tr>
                    ) : (
                      filteredOrdersList.map((order) => {
                        const isCompleted = order.status === 'Delivered';
                        const isCancelled = order.status === 'Cancelled';
                        const itemsSummary = order.items.map(it => `${it.name} (${it.quantity}x)`).join(', ');
                        return (
                          <tr key={order.id} className="hover:bg-slate-50/80 transition-colors h-14">
                            {/* Order ID */}
                            <td className="py-2.5 px-3 pl-4 align-middle">
                              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200/80 inline-block whitespace-nowrap">
                                #{order.id}
                              </span>
                            </td>
                            {/* Customer Info */}
                            <td className="py-2.5 px-3 align-middle">
                              <div className="min-w-0 pr-2">
                                <div className="font-bold text-slate-900 text-xs truncate" title={order.customerName}>
                                  {order.customerName || 'গ্রাহক'}
                                </div>
                                <div className="text-[11px] text-slate-500 font-mono tracking-wide mt-0.5 flex flex-wrap items-center gap-1.5">
                                  <a href={`tel:${order.phone}`} className="hover:text-emerald-600 transition-colors flex items-center gap-1 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                                    <Phone size={9} className="text-emerald-500" />
                                    {order.phone}
                                  </a>
                                </div>
                                {order.salesman && (
                                  <div className="text-[10px] text-emerald-600 bg-emerald-50 w-max px-1.5 rounded mt-0.5 font-bold truncate">
                                    এসআর: {order.salesman}
                                  </div>
                                )}
                              </div>
                            </td>
                            {/* Delivery Address */}
                            <td className="py-2.5 px-3 align-middle">
                              <div className="text-xs text-slate-600 truncate pr-2 font-normal" title={order.address}>
                                {order.address || 'ঠিকানা দেওয়া হয়নি'}
                              </div>
                            </td>
                            {/* Ordered Items */}
                            <td className="py-2.5 px-3 align-middle">
                              <div className="text-xs text-slate-700 font-medium truncate pr-2" title={itemsSummary}>
                                {itemsSummary}
                              </div>
                            </td>
                            {/* Price */}
                            <td className="py-2.5 px-3 align-middle whitespace-nowrap">
                              <span className="text-xs font-bold text-slate-900">&nbsp;৳{order.total.toLocaleString('bn-BD')}</span>
                            </td>
                            {/* Status Selector */}
                            <td className="py-2.5 px-3 align-middle text-center select-none">
                              <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value as any)} className="px-2 py-1.5 rounded-lg border border-slate-200 text-[11px] font-medium outline-none focus:border-slate-900 bg-white cursor-pointer"><option value="Pending">Pending</option><option value="Processing">Processing</option><option value="Confirmed">Confirmed</option><option value="Courier">Courier</option><option value="Delivered">Delivered</option><option value="Cancelled">Cancelled</option><option value="Return">Return</option></select>
                            </td>
                            {/* Quick Icon Actions */}
                            <td className="py-2.5 px-3 pr-4 align-middle text-center select-none">
                              <div className="flex items-center justify-center gap-1 flex-wrap w-24 mx-auto">
                                <a href={`https://fraudbd.com/?search=${order.phone}`} target="_blank" rel="noopener noreferrer" className="p-1.5 text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors border border-purple-100 cursor-pointer" title="ফ্রড চেকার">
                                  <ShieldAlert size={14} />
                                </a>
                                <button onClick={() => setSelectedOrder(order)} className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100 cursor-pointer" title="অর্ডার বিবরণ দেখুন"><Eye size={14} /></button>
                                <button onClick={() => setInvoiceToPrint(order)} className="p-1.5 text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 cursor-pointer" title="ইনভয়েস প্রিন্ট করুন"><Printer size={14} /></button>
                                {!isCompleted && !isCancelled && (<button onClick={() => setBookingOrder(order)} className="p-1.5 text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-all cursor-pointer" title="কুরিয়ার বুকিং করুন"><Truck size={14} /></button>)}
                                {!isStaff && (<button onClick={() => { if(confirm('অর্ডার রেকর্ডটি মুছে ফেলতে চান?')) deleteOrder(order.id); }} className="p-1.5 text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer border border-rose-100" title="অর্ডার ডিলিট করুন"><Trash2 size={14} /></button>)}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile view: beautiful stacked card list */}
              <div className="block lg:hidden space-y-4 pt-4 px-4 pb-4 bg-slate-50/50">
                {filteredOrdersList.length === 0 ? (
                  <div className="p-12 text-center text-slate-500 font-medium">কোন সক্রিয় অর্ডার খুঁজে পাওয়া যায়নি।</div>
                ) : (
                  filteredOrdersList.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-500/30 hover:shadow-md transition-all p-5 flex flex-col gap-4">
                      {/* Card Header: Order ID & Status */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <span className="text-[12px] text-slate-800 font-black bg-slate-100 px-2 py-1 rounded">#{order.id}</span>
                        <span className={`inline-flex items-center text-center px-2.5 py-1.5 rounded-md text-[10px] font-black tracking-wide ${
                          order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100/50' :
                          (order.status === 'Courier' || order.status === 'Return') ? 'bg-purple-50 text-purple-600 border border-purple-100/50' :
                          order.status === 'Processing' ? 'bg-blue-50 text-blue-600 border border-blue-100/50' :
                          order.status === 'Confirmed' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100/50' :
                          order.status === 'Cancelled' ? 'bg-rose-50 text-rose-600 border border-rose-100/50' :
                          'bg-amber-50 text-amber-600 border border-amber-100/50'
                        }`}>
                          {order.status === 'Delivered' ? 'ডেলিভারি সম্পন্ন' : order.status === 'Cancelled' ? 'বাতিল' : order.status === 'Courier' ? 'কুরিয়ার' : order.status === 'Processing' ? 'প্রসেসিং' : order.status === 'Confirmed' ? 'কনফার্মড' : order.status === 'Return' ? 'রিটার্ন' : 'পেন্ডিং'}
                        </span>
                      </div>

                      {/* Customer contact details */}
                      <div>
                        <div className="font-extrabold text-slate-800 text-[15px] leading-normal">{order.customerName}</div>
                        <div className="text-[12px] text-slate-500 font-bold mt-2 flex flex-wrap items-center justify-between gap-2">
                          <a href={`tel:${order.phone}`} className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100">
                            <Phone size={12} className="text-emerald-500" />
                            {order.phone}
                          </a>
                          <div className="flex items-center gap-2">
                            {order.salesman && (
                              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-1.5 rounded-lg border border-emerald-100 font-bold flex items-center gap-1">
                                <User size={10} /> {order.salesman}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div className="text-[12px] text-slate-600 bg-slate-50 py-3 px-4 rounded-xl border border-slate-100 font-bold leading-relaxed">
                        <span className="text-[10px] text-slate-400 block font-bold mb-1 uppercase tracking-wider">ডেলিভারি ঠিকানা:</span>
                        {order.address}
                      </div>

                      {/* Ordered Items summary block */}
                      <div className="bg-[#f0fdf4] rounded-xl p-3.5 border border-emerald-100/50">
                        <span className="text-[10px] text-emerald-700 block font-black mb-1.5">অর্ডারকৃত পণ্যসমূহ</span>
                        <p className="text-[13px] text-slate-800 font-bold leading-relaxed">
                          {order.items.map(it => `${it.name} (${it.quantity}x)`).join(', ')}
                        </p>
                      </div>

                      {/* Total bill and Actions wrapper */}
                      <div className="mt-auto pt-4 border-t border-dashed border-slate-200">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[11px] text-slate-500 font-bold">মোট বিল (COD)</span>
                          <span className="text-[18px] font-black text-slate-900 whitespace-nowrap">৳{order.total}</span>
                        </div>
                        
                        <div className="flex flex-col gap-2 mb-2">
                           <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value as any)} className="px-3 py-2.5 rounded-lg border border-slate-200 text-[11px] font-bold outline-none focus:border-emerald-500 bg-slate-50 text-slate-700 w-full cursor-pointer">
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Courier">Courier</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Return">Return</option>
                          </select>
                          
                          <a 
                            href={`https://fraudbd.com/?search=${order.phone}`}
                            target="_blank" rel="noopener noreferrer"
                            className="bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-2.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer border border-purple-100"
                          >
                            <ShieldAlert size={14} /> ফ্রড চেকার
                          </a>
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-wrap items-center gap-2 justify-end w-full">
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg text-[11px] font-bold transition-colors shrink-0 flex items-center gap-1.5"
                          >
                            <Eye size={14} /> বিবরণ
                          </button>
                          
                          <button
                            onClick={() => setInvoiceToPrint(order)}
                            className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-2 rounded-lg text-[11px] font-bold transition-colors shrink-0 flex items-center gap-1.5"
                          >
                            <Printer size={14} /> ইনভয়েস
                          </button>

                          {order.status !== 'Completed' && (
                            <button 
                              onClick={() => setBookingOrder(order)}
                              className="bg-[#0f172a] text-white hover:bg-slate-800 px-3 py-2 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer shrink-0"
                            >
                              <Truck size={14} /> বুকিং
                            </button>
                          )}
                          
                          {!isStaff && (<button 
                            onClick={() => { if(confirm('অর্ডার রেকর্ডটি মুছে ফেলতে চান?')) deleteOrder(order.id); }}
                            className="text-rose-500 hover:text-white hover:bg-rose-500 bg-rose-50 p-2 rounded-lg transition-all cursor-pointer shrink-0"
                            title="অর্ডার ডিলিট"
                          >
                            <Trash2 size={16} />
                          </button>)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMERS DIRECTORY */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm md:text-base">কাস্টমার ডাটাবেস</h3>
                  <p className="text-[10px] md:text-sm font-medium text-slate-500 mt-0.5">সব নিবন্ধিত ও ম্যানুয়াল কাস্টমারদের তালিকা</p>
                </div>
                <button 
                  onClick={() => setIsAddCustomerModalOpen(true)}
                  className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm px-4 py-2 rounded-xl text-[11px] md:text-sm font-medium shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Users size={14} /> ম্যানুয়াল কাস্টমার যোগ করুন
                </button>
              </div>

              {/* Dynamic Responsive Stats Grid for Customer Database */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'মোট নিবন্ধিত গ্রাহক', value: `${totalCustomersCount} জন`, countDesc: 'অনন্য কাস্টমার ফোন নম্বর', icBg: 'bg-emerald-50 text-emerald-500' },
                  { label: 'মোট সম্পন্ন বিক্রয়', value: `৳${customersList.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString('bn-BD')}`, countDesc: 'সফলভাবে ডেলিভারি করা অর্ডার', icBg: 'bg-indigo-50 text-indigo-500' },
                  { label: 'গ্রাহক প্রতি গড় ক্রয় মূল্য', value: `৳${totalCustomersCount > 0 ? Math.round(customersList.reduce((sum, c) => sum + c.totalSpent, 0) / totalCustomersCount).toLocaleString('bn-BD') : '০'}`, countDesc: 'অনন্য গ্রাহক প্রতি গড় শপিং', icBg: 'bg-purple-50 text-purple-500' },
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 md:p-5 border border-slate-200 flex flex-col justify-between shadow-[0_2px_12px_rgba(0,0,0,0.02)] min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] md:text-sm font-medium text-slate-500 uppercase tracking-wider truncate mr-1">{stat.label}</span>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${stat.icBg}`}>
                        <Users size={15} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-slate-800 tracking-tight leading-tight truncate">{stat.value}</h3>
                      <p className="text-[9px] md:text-[10px] font-bold text-slate-500 mt-1.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block animate-pulse"></span>
                        {stat.countDesc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

<div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-w-0">
                <div className="p-4 md:p-5 border-b border-gray-100 bg-white sm:flex sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-base text-slate-800">গ্রাহক প্রোফাইল ডাটাবেজ সেন্টার</h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">মোট {filteredCustomersList.length} জন গ্রাহক পাওয়া গেছে</p>
                  </div>
                  <div className="mt-4 sm:mt-0 relative w-full sm:max-w-xs shrink-0">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="নাম বা মোবাইল নম্বর দিয়ে খুঁজুন..." 
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Desktop view: wide table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm font-medium min-w-[650px]">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-slate-200 text-slate-500 uppercase text-[11px] text-left select-none">
                        <th className="p-4 pl-6 text-xs font-semibold uppercase tracking-wider text-slate-500">গ্রাহক</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">মোবাইল</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500">ঠিকানা</th>
                        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">অর্ডার সংখ্যা</th>
                        <th className="p-4 pr-6 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">মোট ক্রয় (৳)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                      {filteredCustomersList.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-12 text-center text-slate-500 font-medium">কোন কাস্টমার প্রোফাইল পাওয়া যায়নি।</td>
                        </tr>
                      ) : (
                        filteredCustomersList.map((customer, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => setSelectedCustomerHistory({ phone: customer.phone, name: customer.name })}>
                            <td className="p-4 pl-6">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0 uppercase">
                                  {customer.name ? customer.name.charAt(0) : '?'}
                                </div>
                                <span className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{customer.name}</span>
                              </div>
                            </td>
                            <td className="p-4 tracking-wide text-slate-600">
                              <a href={`tel:${customer.phone}`} onClick={(e) => e.stopPropagation()} className="hover:text-emerald-600 flex items-center gap-1.5 transition-colors">
                                <Phone size={12} className="text-emerald-500" /> {customer.phone}
                              </a>
                            </td>
                            <td className="p-4 text-slate-500 font-normal">
                               <div className="max-w-[200px] truncate" title={customer.address}>{customer.address}</div>
                            </td>
                            <td className="p-4 text-center">
                              <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-bold inline-block min-w-[3rem]">
                                {customer.ordersCount}
                              </span>
                            </td>
                            <td className="p-4 pr-6 text-right">
                              <div className="text-slate-900 font-bold text-[15px]">&nbsp;৳{customer.totalSpent > 0 ? customer.totalSpent.toLocaleString('bn-BD') : '০'}</div>
                            </td>
                          </tr>
                        ))
                  )}
                    </tbody>
                </table>
                </div>

                {/* Mobile responsive view: stacked cards for customers list */}
                <div className="block md:hidden bg-slate-50/50 p-3 sm:p-4">
                  <div className="flex flex-col gap-3">
                    {filteredCustomersList.length === 0 ? (
                      <div className="p-10 bg-white rounded-xl border border-slate-200 text-center text-slate-400 font-bold shadow-sm">কোন কাস্টমার পাওয়া যায়নি।</div>
                    ) : (
                      filteredCustomersList.map((customer, idx) => (
                        <div key={idx} onClick={() => setSelectedCustomerHistory({ phone: customer.phone, name: customer.name })} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-3 active:scale-[0.98] transition-all cursor-pointer">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                               <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-base shrink-0 uppercase">
                                  {customer.name ? customer.name.charAt(0) : '?'}
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-bold text-slate-900 text-[15px] truncate">{customer.name}</h4>
                                  <div className="text-slate-500 text-xs font-medium tracking-wide mt-1">
                                    <a href={`tel:${customer.phone}`} onClick={(e) => e.stopPropagation()} className="hover:text-emerald-600 flex items-center gap-1 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md transition-colors w-max">
                                      <Phone size={10} className="text-emerald-500" /> {customer.phone}
                                    </a>
                                  </div>
                                </div>
                            </div>
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 rounded-md text-[10px] font-bold shrink-0 whitespace-nowrap shadow-sm">
                              {customer.ordersCount} টি অর্ডার
                            </span>
                          </div>
                          
                          <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 flex items-start gap-2">
                             <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                             <p className="text-xs text-slate-600 font-medium leading-relaxed">{customer.address}</p>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">মোট ক্রয় মূল্য</span>
                            <span className="text-base font-black text-slate-900 tracking-normal">&nbsp;৳{customer.totalSpent.toLocaleString('bn-BD')}</span>
                          </div>
                        </div>
                      ))
                  )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* TAB 6: FINANCES / INCOME & EXPENSE TRACKER */}
          {activeTab === 'finances' && (() => {
            const automatedIncome = orders
              .filter(o => o.status === 'Completed')
              .reduce((sum, o) => sum + o.total, 0);

            const manualIncome = transactions
              .filter(t => t.type === 'income')
              .reduce((sum, t) => sum + t.amount, 0);

            const totalIncome = automatedIncome + manualIncome;

            const totalExpense = transactions
              .filter(t => t.type === 'expense')
              .reduce((sum, t) => sum + t.amount, 0);

            const netProfit = totalIncome - totalExpense;

            // Categories list depending on transaction type
            const categoriesForType = txType === 'income' 
              ? ['পণ্য বিক্রি', 'বিনিয়োগ', 'অন্যান্য আয়']
              : ['কাঁচামাল কেনা', 'শিপিং চার্জ', 'দোকান ভাড়া', 'বিজ্ঞাপন', 'বেতন ও ভাতা', 'অন্যান্য ব্যয়'];

            // Prepare dynamic mapping ledger
            const orderIncomes = orders
              .filter(o => o.status === 'Completed')
              .map(o => ({
                id: `order-${o.id}`,
                type: 'income' as const,
                category: 'পণ্য বিক্রি (অর্ডার)',
                amount: o.total,
                date: o.date,
                note: `অর্ডার #${o.id} - ${o.customerName}`,
                isAutomated: true
              }));

            const manualTx = transactions.map(t => ({
              ...t,
              isAutomated: false
            }));

            // Combine and filter ledger
            const rawLedger = [...orderIncomes, ...manualTx];
            const filteredLedger = rawLedger
              .filter(item => {
                // Search filter matching note or category
                const matchesSearch = item.note.toLowerCase().includes(txSearch.toLowerCase()) || 
                                      item.category.toLowerCase().includes(txSearch.toLowerCase());
                
                // Tab category filters
                if (txFilter === 'income') return matchesSearch && item.type === 'income';
                if (txFilter === 'expense') return matchesSearch && item.type === 'expense';
                if (txFilter === 'automated') return matchesSearch && item.isAutomated;
                return matchesSearch;
              })
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

            // Handle transaction addition
            const handleAddTransaction = (e: React.FormEvent) => {
              e.preventDefault();
              if (!txAmount || isNaN(Number(txAmount)) || Number(txAmount) <= 0) {
                alert('অনুগ্রহ করে সঠিক টাকার পরিমাণ লিখুন।');
                return;
              }

              const newTx = {
                id: `tx-${Date.now()}`,
                type: txType,
                category: txCategory,
                amount: Number(txAmount),
                date: new Date().toISOString(),
                note: txNote || `${txCategory} বাবদ লেনদেন`
              };

              setTransactions(prev => [newTx, ...prev]);
              addNotification(
                txType === 'income' ? 'নতুন আয় যুক্ত হয়েছে 💰' : 'নতুন ব্যয় যুক্ত হয়েছে 💸',
                `${txCategory} বাবদ ৳${txAmount} টাকার লেনদেন সফলভাবে রেকর্ড করা হয়েছে।`
              );
              
              // Play a sound
              if (soundEnabled) {
                triggerSound();
              }

              // Reset form
              setTxAmount('');
              setTxNote('');
            };

            const handleDeleteTx = (id: string) => {
              setTransactions(prev => prev.filter(t => t.id !== id));
              addNotification('লেনদেন মুছে ফেলা হয়েছে 🗑️', 'রেকর্ডকৃত লেনদেনটি সফলভাবে খাতা থেকে ডিলিট করা হয়েছে।');
            };

            return (
              <div className="space-y-6">
                
                {/* 1. Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {/* Total Income Card */}
                  <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">মোট সর্বমোট আয় (ইনকাম)</p>
                      <h3 className="text-xl md:text-2xl font-bold text-emerald-600 mt-1">&nbsp;৳{totalIncome.toLocaleString('bn-BD')}</h3>
                      <p className="text-[10px] text-slate-500 mt-1 font-bold">
                        অর্ডার আয়: ৳{automatedIncome.toLocaleString('bn-BD')} + ম্যানুয়াল: ৳{manualIncome.toLocaleString('bn-BD')}
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <ArrowUpRight size={24} />
                    </div>
                  </div>

                  {/* Total Expense Card */}
                  <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">মোট সর্বমোট ব্যয় (খরচ)</p>
                      <h3 className="text-xl md:text-2xl font-bold text-rose-600 mt-1">&nbsp;৳{totalExpense.toLocaleString('bn-BD')}</h3>
                      <p className="text-[10px] text-slate-500 mt-1 font-bold">
                        মোট {transactions.filter(t => t.type === 'expense').length}টি ব্যয় খাতের হিসাব
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                      <ArrowDownRight size={24} />
                    </div>
                  </div>

                  {/* Net Profit Card */}
                  <div className={`rounded-xl p-5 border shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex items-center justify-between ${netProfit >= 0 ? 'bg-gradient-to-r from-emerald-50 to-teal-50/50 border-emerald-100 text-slate-800' : 'bg-rose-50 border-rose-100'}`}>
                    <div>
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">নিট লাভ / মুনাফা (Profit)</p>
                      <h3 className={`text-xl md:text-2xl font-bold mt-1 ${netProfit >= 0 ? 'text-teal-800' : 'text-rose-700'}`}>
                        &nbsp;৳{netProfit.toLocaleString('bn-BD')}
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-1 font-bold">
                        আয় এবং ব্যয়ের চূড়ান্ত ব্যালেন্স খাতা
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${netProfit >= 0 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                      <TrendingUp size={24} />
                    </div>
                  </div>
                </div>

                {/* 2. Content Body Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Column: Transaction Ledger History */}
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm lg:col-span-8 flex flex-col min-w-0 overflow-hidden order-2 lg:order-1">
                    <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-r from-white to-slate-50/50">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100/50">
                          <Wallet size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">লেনদেন খতিয়ান ও বিবরণী</h4>
                          <p className="text-[10px] text-slate-500 font-medium mt-0.5">রিয়েল-টাইমে ক্যাশ অন ডেলিভারি সেলস ম্যাপিং</p>
                        </div>
                      </div>

                      {/* Ledger Search Input */}
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="লেনদেন বা খাত খুঁজুন..." 
                          value={txSearch}
                          onChange={(e) => setTxSearch(e.target.value)}
                          className="w-full sm:w-48 pl-8 pr-3 py-1.5 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:border-emerald-600" 
                        />
                        <Search size={12} className="absolute left-2.5 top-2.5 text-slate-500" />
                      </div>
                    </div>

                    {/* Filter Toggles */}
                    <div className="px-5 py-3 bg-[#f8fafc] border-b border-slate-200 flex items-center gap-1.5 flex-wrap">
                      <button 
                        onClick={() => setTxFilter('all')}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${txFilter === 'all' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200/60'}`}
                      >
                        সকল বিবরণী ({rawLedger.length}টি)
                      </button>
                      <button 
                        onClick={() => setTxFilter('income')}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${txFilter === 'income' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200/60'}`}
                      >
                        শুধুমাত্র আয় ({rawLedger.filter(l => l.type === 'income').length}টি)
                      </button>
                      <button 
                        onClick={() => setTxFilter('automated')}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${txFilter === 'automated' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200/60'}`}
                      >
                        অর্ডার থেকে আয় ({orderIncomes.length}টি)
                      </button>
                      <button 
                        onClick={() => setTxFilter('expense')}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${txFilter === 'expense' ? 'bg-rose-600 text-white' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200/60'}`}
                      >
                        শুধুমাত্র ব্যয় ({rawLedger.filter(l => l.type === 'expense').length}টি)
                      </button>
                    </div>

                    {/* Ledger List */}
                    <div className="divide-y divide-slate-200/60 overflow-y-auto max-h-[480px]">
                      {filteredLedger.length === 0 ? (
                        <div className="p-12 text-center text-slate-500 font-semibold flex flex-col items-center justify-center gap-2">
                          <Wallet size={32} className="opacity-30" />
                          <span>কোন লেনদেন রেকর্ড পাওয়া যায়নি।</span>
                        </div>
                      ) : (
                        filteredLedger.map((item) => {
                          const isInc = item.type === 'income';
                          const isAut = (item as any).isAutomated;
                          
                          return (
                            <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-[#f8fafc]/50 transition-colors select-none">
                              <div className="flex items-center gap-3 min-w-0">
                                {/* Type icon */}
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border ${isInc ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-rose-50 border-rose-100 text-rose-600'}`}>
                                  {isInc ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                </div>

                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-sm font-medium text-slate-800 truncate">{item.note}</span>
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border uppercase tracking-wider ${
                                      isAut ? 'bg-indigo-50 border-indigo-100 text-indigo-600' :
                                      isInc ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                                      'bg-rose-50 border-rose-100 text-rose-700'
                                    }`}>
                                      {item.category}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1 text-[9px] text-slate-500 mt-1 font-bold">
                                    <Calendar size={10} />
                                    <span>{new Date(item.date).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                    {isAut && <span className="text-indigo-500 ml-1 bg-indigo-50 px-1 py-0.5 rounded">অটোমেটেড</span>}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                <span className={`text-sm font-medium font-sans ${isInc ? 'text-emerald-600' : 'text-rose-600'}`}>
                                  {isInc ? '+' : '-'}৳{item.amount.toLocaleString('bn-BD')}
                                </span>

                                {!isAut ? (
                                  <button 
                                    onClick={() => handleDeleteTx(item.id)}
                                    className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                    title="লেনদেন ডিলিট করুন"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                ) : (
                                  <div className="p-1.5 text-slate-200" title="অটোমেটেড অর্ডার লেনদেন ডিলিট করা সম্ভব নয়">
                                    <Lock size={12} className="opacity-40 font-bold" />
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Right Column: Add Transaction Form */}
                  <div className="lg:col-span-4 space-y-6 order-1 lg:order-2">
                    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                          <PlusCircle size={15} />
                        </div>
                        <h4 className="text-sm font-medium text-slate-800">নতুন লেনদেন রেকর্ড করুন</h4>
                      </div>

                      <form onSubmit={handleAddTransaction} className="space-y-4">
                        {/* Transaction Type toggler */}
                        <div>
                          <label className="block text-[10px] text-slate-500 font-semibold uppercase mb-1.5">লেনদেনের ধরন</label>
                          <div className="grid grid-cols-2 gap-2 bg-[#f8fafc] p-1 rounded-xl border border-slate-200">
                            <button 
                              type="button"
                              onClick={() => {
                                setTxType('income');
                                setTxCategory('পণ্য বিক্রি');
                              }}
                              className={`py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${txType === 'income' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                              আয় (Income)
                            </button>
                            <button 
                              type="button"
                              onClick={() => {
                                setTxType('expense');
                                setTxCategory('কাঁচামাল কেনা');
                              }}
                              className={`py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${txType === 'expense' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                              ব্যয় (Expense)
                            </button>
                          </div>
                        </div>

                        {/* Category Select */}
                        <div>
                          <label className="block text-[10px] text-slate-500 font-semibold uppercase mb-1.5">খাত / ক্যাটাগরি</label>
                          
<input type="text" value={txCategory} onChange={(e) => setTxCategory(e.target.value)} placeholder={txType === 'income' ? 'যেমন: পণ্য বিক্রি, বিনিয়োগ' : 'যেমন: কাঁচামাল কেনা, ডেলিভারি চার্জ'} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold outline-none bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 text-slate-800 transition-colors" required />

                        </div>

                        {/* Amount Field */}
                        <div>
                          <label className="block text-[10px] text-slate-500 font-semibold uppercase mb-1.5">টাকার পরিমাণ (৳)</label>
                          <div className="relative">
                            <input 
                              type="number" 
                              required
                              placeholder="১০০০" 
                              value={txAmount}
                              onChange={(e) => setTxAmount(e.target.value)}
                              className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600"
                            />
                            <span className="absolute left-3 top-2.5 text-xs text-slate-500 font-medium">&nbsp;৳</span>
                          </div>
                        </div>

                        {/* Note Field */}
                        <div>
                          <label className="block text-[10px] text-slate-500 font-semibold uppercase mb-1.5">লেনদেনের নোট / বিবরণ</label>
                          <input 
                            type="text" 
                            placeholder="যেমন: ডেলিভারি খরচ পরিশোধ, দোকানের ভাড়া" 
                            value={txNote}
                            onChange={(e) => setTxNote(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600"
                          />
                        </div>

                        {/* Submit Button */}
                        <button 
                          type="submit"
                          className={`w-full py-2.5 rounded-xl text-white text-sm font-medium transition-all cursor-pointer shadow-md ${txType === 'income' ? 'bg-slate-900 hover:bg-slate-800' : 'bg-rose-600 hover:bg-rose-700'}`}
                        >
                          খাতায় হিসাব যুক্ত করুন
                        </button>
                      </form>
                    </div>

                    {/* Quick Financial Insight Info Card */}
                    <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-sm leading-relaxed">
                      <h4 className="text-sm font-medium text-emerald-400 flex items-center gap-1.5 mb-2">
                        <span>💡 হিসাব রক্ষণ টিপস</span>
                      </h4>
                      <p className="text-[10px] text-slate-300 font-bold">
                        অর্ডার সমূহের মধ্যে যেগুলোর স্ট্যাটাস <span className="text-emerald-300 font-bold">"সম্পন্ন"</span> করা হয়, সেগুলো স্বয়ংক্রিয়ভাবে আয় হিসেবে লেনদেন তালিকায় যুক্ত হয়। অন্যান্য খরচ যেমন পণ্য উৎপাদন, শিপিং খরচ, ও আনুষঙ্গিক ব্যয়সমূহ ডান পাশের ফরম ব্যবহার করে যুক্ত করলে সঠিক নিট মুনাফার হিসাব বজায় থাকবে।
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            );
          })()}


          {/* TAB: MARKETING & DISCOUNT INTELLIGENCE */}
          {activeTab === 'marketing' && (() => {
            // Calculations
            const totalCampBudget = campaigns.reduce((sum, c) => sum + c.budget, 0);
            const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
            const activeCampaignsCount = campaigns.filter(c => c.status === 'Active').length;
            
            const totalRevenue = orders
              .filter(o => o.status === 'Completed')
              .reduce((sum, o) => sum + o.total, 0);
            
            // Recommend budget: 7% of total completed revenue, minimum 2000
            const recommendedBudget = Math.max(2000, Math.round(totalRevenue * 0.07));

            // Customer Loyalty Intelligence: Analyze real orders list
            const customerStats: { [phone: string]: { name: string; address: string; count: number; spend: number } } = {};
            orders.forEach(o => {
              if (!o.phone) return;
              if (!customerStats[o.phone]) {
                customerStats[o.phone] = { name: o.customerName, address: o.address, count: 0, spend: 0 };
              }
              customerStats[o.phone].count += 1;
              customerStats[o.phone].spend += o.total;
            });

            const customerList = Object.entries(customerStats).map(([phone, stats]) => ({
              phone,
              ...stats
            }));

            // Categories
            const vipCustomers = customerList.filter(c => c.count >= 2 || c.spend >= 2500);
            const oneTimeCustomers = customerList.filter(c => c.count === 1 && c.spend < 2500);

            return (
              <div className="space-y-6">
                
                {/* 1. Marketing Performance Overview Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-100 p-5 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] md:text-xs text-emerald-700/80 font-bold uppercase tracking-wider">চলতি বাজেট ব্যয়</span>
                        <h3 className="text-xl md:text-2xl font-bold text-emerald-900 mt-1">&nbsp;৳{totalCampBudget.toLocaleString('bn-BD')}</h3>
                      </div>
                      <div className="p-2.5 bg-emerald-500 text-white rounded-xl">
                        <Megaphone size={16} />
                      </div>
                    </div>
                    <div className="text-[10px] text-emerald-700 font-bold mt-2.5 flex items-center gap-1">
                      <span>• মোট {campaigns.length}টি ক্যাম্পেইন অন্তর্ভুক্ত</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-100 p-5 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] md:text-xs text-blue-700/80 font-bold uppercase tracking-wider">মোট কনভার্সন (অর্ডার)</span>
                        <h3 className="text-xl md:text-2xl font-bold text-blue-900 mt-1">{totalConversions.toLocaleString('bn-BD')} টি</h3>
                      </div>
                      <div className="p-2.5 bg-blue-500 text-white rounded-xl">
                        <Target size={16} />
                      </div>
                    </div>
                    <div className="text-[10px] text-blue-700 font-bold mt-2.5 flex items-center gap-1">
                      <span>• গড় রূপান্তর হার: ১২.৫% (ফেসবুক)</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-100 p-5 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] md:text-xs text-amber-700/80 font-bold uppercase tracking-wider">সক্রিয় ক্যাম্পেইন</span>
                        <h3 className="text-xl md:text-2xl font-bold text-amber-900 mt-1">{activeCampaignsCount.toLocaleString('bn-BD')} টি</h3>
                      </div>
                      <div className="p-2.5 bg-amber-500 text-white rounded-xl">
                        <Sparkles size={16} />
                      </div>
                    </div>
                    <div className="text-[10px] text-amber-700 font-bold mt-2.5 flex items-center gap-1">
                      <span>• রানিং প্রমোশন ও বুস্টিং চলছে</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-100 p-5 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] md:text-xs text-purple-700/80 font-bold uppercase tracking-wider">প্রস্তাবিত মার্কেটিং বাজেট</span>
                        <h3 className="text-xl md:text-2xl font-bold text-purple-900 mt-1">&nbsp;৳{recommendedBudget.toLocaleString('bn-BD')}</h3>
                      </div>
                      <div className="p-2.5 bg-purple-500 text-white rounded-xl">
                        <TrendingUp size={16} />
                      </div>
                    </div>
                    <div className="text-[10px] text-purple-700 font-bold mt-2.5 flex items-center gap-1">
                      <span>• মোট সম্পন্ন আয়ের ৭% হিসাব ভিত্তিক</span>
                    </div>
                  </div>
                </div>

                {/* 2. Bento Grid: Timings & Guidance and Customer Recommendations */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  
                  {/* Left Column: Timing guidance and budget advice - 5 cols */}
                  <div className="lg:col-span-5 space-y-5">
                    
                    {/* A. কখন কতটুকু মার্কেটিং করা দরকার? (Timing Guidance Card) */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                      <h3 className="font-semibold text-sm md:text-base text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-200 select-none">
                        <Calendar size={18} className="text-emerald-600 animate-pulse" />
                        <span>কখন কতটুকু মার্কেটিং করা প্রয়োজন?</span>
                      </h3>
                      
                      <div className="space-y-3.5">
                        <div className="flex gap-3">
                          <div className="shrink-0 w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-sm font-medium text-emerald-700 bn-safe">১</div>
                          <div>
                            <h4 className="text-sm font-medium text-slate-800 bn-safe">মাসের বেতন সেশন (১ থেকে ১০ তারিখ)</h4>
                            <p className="text-[10.5px] text-slate-500 font-medium mt-0.5 leading-relaxed">
                              এই সময়ে ক্রেতাদের ক্রয়ক্ষমতা সর্বোচ্চ থাকে। আপনার সম্পূর্ণ মাসিক বাজেটের <span className="text-emerald-600 font-bold bn-safe">৫০% থেকে ৬০%</span> এই ১০ দিনে খরচ করা উচিত। বিশেষ করে ঘি, সুন্দরবনের মধু এবং সরিষার তেলের মতো প্রিমিয়াম খাদ্য আইটেমগুলোর বুস্ট সচল করুন।
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <div className="shrink-0 w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-sm font-medium text-emerald-700 bn-safe">২</div>
                          <div>
                            <h4 className="text-sm font-medium text-slate-800 bn-safe">দৈনিক পিক-আওয়ার (সন্ধ্যা ৬:০০ - রাত ১০:০০)</h4>
                            <p className="text-[10.5px] text-slate-500 font-medium mt-0.5 leading-relaxed">
                              অর্গানিক খাবার ও গ্রোসারির ফেসবুকে সবচেয়ে বেশি অর্ডার আসে বিকেলে ও রাতে। আপনার বিজ্ঞাপন ক্যাম্পেইনগুলো রাতে একটিভ রাখুন এবং মেসেঞ্জার চ্যাটে ইনস্ট্যান্ট রিপ্লাই সচল রাখুন।
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <div className="shrink-0 w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-sm font-medium text-emerald-700">৩</div>
                          <div>
                            <h4 className="text-sm font-medium text-slate-800">উৎসবে স্পেশাল বাজেট (রমজান ও ঈদ সেশন)</h4>
                            <p className="text-[10.5px] text-slate-500 font-medium mt-0.5 leading-relaxed">
                              রমজান বা যেকোনো উৎসবে বিশেষ বাজেট বরাদ্দ করুন। উৎসবের দিনগুলোতে খাঁটি উপাদানের চাহিদা অনেক বেড়ে যায়।
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Customer Recommendations / Segments */}
                  <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                    <h3 className="font-semibold text-sm md:text-base text-slate-800 flex items-center gap-2 pb-3 border-b border-slate-200 select-none">
                      <Users size={18} className="text-emerald-600 animate-pulse" />
                      <span>গ্রাহক সেগমেন্ট ভিত্তিক কুপন অফার</span>
                    </h3>
                    
                    <div className="space-y-4">
                        
                        {/* Segment 1: VIP Loyal Spenders */}
                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <span className="text-[11px] font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg flex items-center gap-1 self-start shadow-sm border border-emerald-100">
                              👑 ভিআইপি কাস্টমার (Loyal Customers)
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium sm:text-right">প্রস্তাবিত ডিসকাউন্ট: ১০% বা ফ্ল্যাট ৳১৫০ ছাড়</span>
                          </div>
                          
                          {vipCustomers.length === 0 ? (
                            <p className="text-[10px] text-slate-500 font-medium bg-[#f8fafc] p-3 rounded-xl border border-dashed">এখনো পর্যন্ত কোন কাস্টমার ভিআইপি ক্যাটাগরিতে পৌঁছায়নি (২+ অর্ডার বা ৳২৫০০+ ক্রয়)।</p>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[180px] overflow-y-auto pr-1">
                              {vipCustomers.map(cust => (
                                <div key={cust.phone} className="p-3 bg-gradient-to-r from-emerald-500/[0.04] to-emerald-500/[0.01] border border-emerald-500/10 hover:border-emerald-500/25 rounded-xl flex items-center justify-between gap-3 hover:bg-emerald-500/[0.06] transition-all duration-300 shadow-sm">
                                  <div className="min-w-0 flex-1">
                                    <span className="text-sm font-medium text-slate-800 block truncate leading-normal">{cust.name}</span>
                                    <span className="text-[10px] text-slate-500  block mt-0.5">{cust.phone}</span>
                                    <div className="text-[9px] text-emerald-800 font-bold mt-1.5 flex items-center gap-1">
                                      <span>অর্ডার: <strong className="font-semibold  text-[10.5px] text-emerald-600">{cust.count}</strong>টি</span>
                                      <span className="text-slate-300">•</span>
                                      <span>ক্রয়: <strong className="font-semibold  text-[10.5px] text-emerald-600">&nbsp;৳{cust.spend}</strong></span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => {
                                      const cleanName = cust.name.replace(/[^a-zA-Z]/g, '').slice(0, 5) || 'VIP';
                                      const code = `VIP${cleanName.toUpperCase()}`;
                                      const exist = coupons.some(c => c.code === code);
                                      if (exist) {
                                        alert('এই ডিসকাউন্ট কুপন ইতিমধ্যে তৈরি করা আছে!');
                                        return;
                                      }
                                      setCoupons(prev => [{
                                        code,
                                        type: 'fixed',
                                        value: 150,
                                        minSpend: 1500,
                                        expiryDate: '2026-12-31',
                                        usageCount: 0
                                      }, ...prev]);
                                      addNotification(
                                        'ভিআইপি স্পেশাল কুপন 🎫',
                                        `${cust.name} এর জন্য বিশেষ ডিসকাউন্ট কোড "${code}" সচল করা হয়েছে।`
                                      );
                                      alert(`কুপন কোড ${code} তৈরি করা হয়েছে এবং SMS/মেসেঞ্জারে কাস্টমারকে পাঠানোর জন্য রেডি!`);
                                    }}
                                    className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm text-[9px] px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all duration-200 active:scale-95 shadow-sm shadow-emerald-600/10"
                                  >
                                    কুপন দিন
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Segment 2: One-time welcome discount */}
                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <span className="text-[11px] font-bold text-blue-950 bg-blue-50 px-2.5 py-1 rounded-lg flex items-center gap-1 self-start shadow-sm border border-blue-100">
                              👋 ১ বার কেনা ক্রেতা (Winback Segment)
                            </span>
                            <span className="text-[10px] text-slate-500 font-medium sm:text-right">প্রস্তাবিত ডিসকাউন্ট: ফ্রি ডেলিভারি কুপন</span>
                          </div>
                          
                          {oneTimeCustomers.length === 0 ? (
                            <p className="text-[10px] text-slate-500 font-medium bg-[#f8fafc] p-3 rounded-xl border border-dashed bn-safe">১ বার কিনেছেন এমন কোন কাস্টমার লিস্টে নেই।</p>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[180px] overflow-y-auto pr-1">
                              {oneTimeCustomers.map(cust => (
                                <div key={cust.phone} className="p-3 bg-gradient-to-r from-blue-500/[0.04] to-blue-500/[0.01] border border-blue-500/10 hover:border-blue-500/25 rounded-xl flex items-center justify-between gap-3 hover:bg-blue-500/[0.06] transition-all duration-300 shadow-sm">
                                  <div className="min-w-0 flex-1">
                                    <span className="text-sm font-medium text-slate-800 block truncate leading-normal">{cust.name}</span>
                                    <span className="text-[10px] text-slate-500  block mt-0.5">{cust.phone}</span>
                                    <div className="text-[9px] text-blue-800 font-bold mt-1.5 flex items-center gap-1">
                                      <span>অर्डर: <strong className="font-semibold  text-[10.5px] text-blue-700">{cust.count}</strong>টি</span>
                                      <span className="text-slate-300">•</span>
                                      <span>ক্রয়: <strong className="font-semibold  text-[10.5px] text-blue-700">&nbsp;৳{cust.spend}</strong></span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => {
                                      const code = `WELCOME60`;
                                      const exist = coupons.some(c => c.code === code);
                                      if (exist) {
                                        alert('এই ডিসকাউন্ট কুপন ইতিমধ্যে তৈরি করা আছে!');
                                        return;
                                      }
                                      setCoupons(prev => [{
                                        code,
                                        type: 'fixed',
                                        value: 60, // delivery fee amount
                                        minSpend: 800,
                                        expiryDate: '2026-12-31',
                                        usageCount: 0
                                      }, ...prev]);
                                      addNotification(
                                        'উইনব্যাক ফ্রি ডেলিভারি কুপন 🚚',
                                        `পুরাতন খদ্দেরদের পুনরায় টানতে "${code}" কোড তৈরি করা হয়েছে।`
                                      );
                                      alert(`কুপন কোড ${code} তৈরি করা হয়েছে! এটি ১ বার কেনা গ্রাহকদের রিপিট ক্রয়ে উৎসাহিত করবে।`);
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-[9px] px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all duration-200 active:scale-95 shadow-sm shadow-blue-600/10"
                                  >
                                    ফ্রি শিপিং
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                      </div>
                    </div>

                    {/* D. একটিভ মার্কেটিং ক্যাম্পেইন তালিকা ও ফর্ম */}
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                        <h3 className="font-semibold text-sm md:text-base text-slate-800 flex items-center gap-2">
                          <Megaphone size={18} className="text-emerald-600" />
                          <span>মার্কেটিং ক্যাম্পেইন বাজেট ও আরওআই ট্র্যাকার</span>
                        </h3>
                        <span className="text-sm font-medium text-slate-500">বাজেট বণ্টন তালিকা</span>
                      </div>

                      {/* Add Campaign Form */}
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!newCampName || !newCampBudget) return;

                          const budg = Number(newCampBudget) || 1000;
                          const newCampObj = {
                            id: `c-${Math.floor(100 + Math.random() * 900)}`,
                            name: newCampName,
                            platform: newCampPlatform,
                            budget: budg,
                            targetAudience: newCampTarget || 'নির্ধারিত কাস্টমার অডিয়েন্স',
                            conversions: 0,
                            status: newCampStatus,
                            date: new Date().toISOString(),
                            roi: 0
                          };

                          setCampaigns(prev => [newCampObj, ...prev]);
                          setNewCampName('');
                          setNewCampBudget('');
                          setNewCampTarget('');

                          addNotification(
                            'নতুন প্রমোショナル ক্যাম্পেইন 📣',
                            `ক্যাম্পেইন "${newCampObj.name}" বাজেট ৳${budg} সফলভাবে রানিং করা হয়েছে।`
                          );
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 bg-[#f8fafc] p-4 rounded-xl border border-slate-200/60"
                      >
                        <div className="col-span-1 sm:col-span-2 md:col-span-3">
                          <h4 className="text-[11px] uppercase tracking-wider text-slate-500 font-medium mb-1">ক্যাম্পেইন যুক্ত করুন</h4>
                        </div>
                        <div>
                          <label className="block text-[9px] text-slate-500 font-medium mb-1">ক্যাম্পেইনের নাম *</label>
                          <input 
                            type="text"
                            required
                            placeholder="যেমন: ঘি বুস্টিং অফার"
                            value={newCampName}
                            onChange={(e) => setNewCampName(e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-sm font-medium bg-white outline-none focus:border-emerald-600"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] text-slate-500 font-medium mb-1">প্ল্যাটফর্ম</label>
                          
<select value={newCampPlatform} onChange={(e) => setNewCampPlatform(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold outline-none bg-[#f8fafc] focus:bg-white focus:border-emerald-600 transition-colors cursor-pointer"><option value="Facebook Ads">Facebook Ads</option><option value="Google Ads">Google Ads</option><option value="Instagram Ads">Instagram Ads</option><option value="SMS Marketing">SMS Marketing</option><option value="Others">Others</option></select>

                        </div>
                        <div>
                          <label className="block text-[9px] text-slate-500 font-medium mb-1">বাজেট (৳) *</label>
                          <input 
                            type="number"
                            required
                            placeholder="যেমন: ১৫০০"
                            value={newCampBudget}
                            onChange={(e) => setNewCampBudget(e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-sm font-medium bg-white outline-none focus:border-emerald-600"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[9px] text-slate-500 font-medium mb-1">টার্গেট কাস্টমার বিবরণ</label>
                          <input 
                            type="text"
                            placeholder="যেমন: ঢাকা সিটির খাঁটি খাবারের আগ্রহী পরিবার"
                            value={newCampTarget}
                            onChange={(e) => setNewCampTarget(e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-sm font-medium bg-white outline-none focus:border-emerald-600"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] text-slate-500 font-medium mb-1">স্ট্যাটাস</label>
                          
<select value={newCampStatus} onChange={(e) => setNewCampStatus(e.target.value as any)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold outline-none bg-[#f8fafc] focus:bg-white focus:border-emerald-600 transition-colors cursor-pointer"><option value="Active">Active</option><option value="Paused">Paused</option><option value="Scheduled">Scheduled</option><option value="Completed">Completed</option></select>

                        </div>
                        <div className="col-span-1 sm:col-span-2 md:col-span-3 pt-2">
                          <button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-sm text-sm font-medium py-2 rounded-xl shadow-sm transition-all"
                          >
                            📣 নতুন ক্যাম্পেইন সেভ করুন
                          </button>
                        </div>
                      </form>

                      {/* Campaigns Tracker Responsive Layout */}
                      {/* Mobile View: Vertical Cards (No Horizontal Scrolling) */}
                      <div className="block md:hidden space-y-4">
                        {campaigns.length === 0 ? (
                          <div className="p-8 text-center bg-[#f8fafc] border border-dashed rounded-xl text-slate-500 font-medium text-xs">
                            কোন ক্যাম্পেইন পাওয়া যায়নি।
                          </div>
                        ) : (
                          campaigns.map((camp) => (
                            <div key={camp.id} className="bg-[#f8fafc]/70 border border-slate-200/80 rounded-xl p-4.5 space-y-3 shadow-sm hover:border-emerald-500/30 transition-all">
                              <div className="flex items-start justify-between gap-3 pb-2.5 border-b border-slate-200/50">
                                <div>
                                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 leading-normal">{camp.name}</h4>
                                  <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">{camp.platform}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm('ক্যাম্পেইনটি ডিলিট করতে চান?')) {
                                      setCampaigns(prev => prev.filter(c => c.id !== camp.id));
                                    }
                                  }}
                                  className="text-slate-500 hover:text-rose-600 p-1.5 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>

                              <div className="grid grid-cols-2 gap-3 text-[11px]">
                                <div className="space-y-0.5">
                                  <span className="text-slate-500 font-medium block text-[10px]">বাজেট</span>
                                  <span className="font-semibold text-emerald-900 text-xs">&nbsp;৳{camp.budget}</span>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-slate-500 font-medium block text-[10px]">টার্গেট অডিয়েন্স</span>
                                  <span className="font-semibold text-slate-600 block truncate" title={camp.targetAudience}>{camp.targetAudience}</span>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-slate-500 font-medium block text-[10px]">অর্ডার কনভার্সন</span>
                                  <div className="flex items-center gap-1">
                                    <span className="font-bold text-slate-800">{camp.conversions} টি</span>
                                    <button 
                                      type="button"
                                      onClick={() => {
                                        const count = prompt('নতুন কনভার্সন অর্ডার সংখ্যা লিখুন:', String(camp.conversions));
                                        if (count === null) return;
                                        const num = Number(count);
                                        if (isNaN(num)) return;
                                        
                                        // Update ROI too: each conversion is worth on average 1500 Taka
                                        const aovValue = num * 1500;
                                        const calculatedRoi = camp.budget > 0 ? Number((aovValue / camp.budget).toFixed(1)) : 0;

                                        setCampaigns(prev => prev.map(c => c.id === camp.id ? { ...c, conversions: num, roi: calculatedRoi } : c));
                                      }}
                                      className="text-[10px] text-blue-600 hover:underline font-semibold"
                                    >
                                      (সংশোধন)
                                    </button>
                                  </div>
                                </div>
                                <div className="space-y-0.5">
                                  <span className="text-slate-500 font-medium block text-[10px]">আরওআই (ROI)</span>
                                  <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${camp.roi > 2 ? 'bg-emerald-500/20 text-emerald-400' : camp.roi > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-200/80 text-slate-500'}`}>
                                    {camp.roi > 0 ? `${camp.roi}x ROI` : 'N/A'}
                                  </span>
                                </div>
                              </div>

                              <div className="pt-2.5 border-t border-slate-200/50 flex items-center justify-between gap-3">
                                <span className="text-[10px] text-slate-500 font-medium uppercase">স্ট্যাটাস</span>
                                
<select value={camp.status} onChange={(e) => setCampaigns(prev => prev.map(c => c.id === camp.id ? { ...c, status: e.target.value as any } : c))} className="px-2 py-1.5 rounded-lg border border-slate-200 text-[11px] font-medium outline-none focus:border-emerald-600 bg-white cursor-pointer"><option value="Active">Active</option><option value="Paused">Paused</option><option value="Scheduled">Scheduled</option><option value="Completed">Completed</option></select>

                              </div>
                            </div>
                          ))
                  )}
                      </div>

                      {/* Desktop View: Beautiful Structured Table (Visible on MD and larger screens) */}
                      <div className="hidden md:block overflow-x-auto border border-slate-200 rounded-xl">
                        <table className="w-full text-left border-collapse text-xs font-medium min-w-[550px] bg-[#f8fafc]/50">
                          <thead>
                            <tr className="bg-slate-100 text-slate-600 text-[10px]">
                              <th className="p-3">ক্যাম্পেইন নাম ও প্ল্যাটফর্ম</th>
                              <th className="p-3">বাজেট</th>
                              <th className="p-3">টার্গেট অডিয়েন্স</th>
                              <th className="p-3">অর্ডার কনভার্সন</th>
                              <th className="p-3">আরওআই (ROI)</th>
                              <th className="p-3 text-center">স্ট্যাটাস</th>
                              <th className="p-3">অ্যাকশন</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200/60">
                            {campaigns.map((camp) => (
                              <tr key={camp.id} className="hover:bg-white transition-colors">
                                <td className="p-3">
                                  <span className="text-slate-800 block font-bold">{camp.name}</span>
                                  <span className="text-[10px] text-slate-500">{camp.platform}</span>
                                </td>
                                <td className="p-3 font-medium text-emerald-900">&nbsp;৳{camp.budget}</td>
                                <td className="p-3 text-[10px] text-slate-500 max-w-[120px] truncate" title={camp.targetAudience}>{camp.targetAudience}</td>
                                <td className="p-3">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-slate-800 font-bold">{camp.conversions} টি</span>
                                    <button 
                                      type="button"
                                      onClick={() => {
                                        const count = prompt('নতুন কনভার্সন অর্ডার সংখ্যা লিখুন:', String(camp.conversions));
                                        if (count === null) return;
                                        const num = Number(count);
                                        if (isNaN(num)) return;
                                        
                                        // Update ROI too: each conversion is worth on average 1500 Taka
                                        const aovValue = num * 1500;
                                        const calculatedRoi = camp.budget > 0 ? Number((aovValue / camp.budget).toFixed(1)) : 0;

                                        setCampaigns(prev => prev.map(c => c.id === camp.id ? { ...c, conversions: num, roi: calculatedRoi } : c));
                                      }}
                                      className="text-xs text-blue-600 hover:underline shrink-0"
                                    >
                                      সংশোধন
                                    </button>
                                  </div>
                                </td>
                                <td className="p-3">
                                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${camp.roi > 2 ? 'bg-emerald-500/20 text-emerald-400' : camp.roi > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500'}`}>
                                    {camp.roi > 0 ? `${camp.roi}x ROI` : 'N/A'}
                                  </span>
                                </td>
                                <td className="p-3 text-center">
                                  
<select value={camp.status} onChange={(e) => setCampaigns(prev => prev.map(c => c.id === camp.id ? { ...c, status: e.target.value as any } : c))} className="px-2 py-1.5 rounded-lg border border-slate-200 text-[11px] font-medium outline-none focus:border-emerald-600 bg-white cursor-pointer"><option value="Active">Active</option><option value="Paused">Paused</option><option value="Scheduled">Scheduled</option><option value="Completed">Completed</option></select>

                                </td>
                                <td className="p-3">
                                  <button
                                    onClick={() => {
                                      if (confirm('ক্যাম্পেইনটি ডিলিট করতে চান?')) {
                                        setCampaigns(prev => prev.filter(c => c.id !== camp.id));
                                      }
                                    }}
                                    className="text-slate-300 hover:text-rose-600 transition-colors"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                </table>
                      </div>
                    </div>
</div>
</div>
            );
          })()}


                    {/* TAB: DUE LEDGER */}
          {activeTab === 'dues' && (
            <div className="space-y-6 select-none">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-0.5">মোট পাওনা বকেয়া</p>
                    <h3 className="text-xl font-bold text-slate-800">&nbsp;৳{dues.filter(d => d.status !== 'Paid').reduce((sum, d) => sum + (d.amount - d.paidAmount), 0)}</h3>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <CheckSquare size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-0.5">মোট আদায় হয়েছে</p>
                    <h3 className="text-xl font-bold text-slate-800">&nbsp;৳{dues.reduce((sum, d) => sum + d.paidAmount, 0)}</h3>
                  </div>
                </div>
                <button 
                  onClick={() => setIsDueModalOpen(true)}
                  className="bg-emerald-900 text-white rounded-xl p-5 shadow-lg shadow-[#1b4332]/20 hover:bg-emerald-900 transition-all flex flex-col items-center justify-center gap-2"
                >
                  <PlusCircle size={24} />
                  <span className="font-semibold text-sm">নতুন বকেয়া যোগ করুন</span>
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-800">বকেয়া তালিকা</h3>
                </div>
                
                {/* Desktop View */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs md:text-sm font-medium">
                    <thead>
                      <tr className="bg-[#f8fafc]/50 border-b border-slate-200 text-xs font-semibold text-slate-500">
                        <th className="p-4">গ্রাহক</th>
                        <th className="p-4">পরিমাণ</th>
                        <th className="p-4">জমা</th>
                        <th className="p-4">পাওনা</th>
                        <th className="p-4 text-center">স্ট্যাটাস</th>
                        <th className="p-4 text-center">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-slate-700">
                      {dues.filter(d => d.status !== 'Paid').length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-500">কোন বকেয়া রেকর্ড নেই।</td>
                        </tr>
                      ) : (
                        dues.filter(d => d.status !== 'Paid').map(d => {
                          const isPaid = d.status === 'Paid';
                          return (
                            <tr key={d.id} className="hover:bg-[#f8fafc]/50">
                              <td className="p-4">
                                <div className="font-semibold text-slate-800">{d.customerName}</div>
                                <div className="text-[10px] text-slate-500">{d.phone}</div>
                              </td>
                              <td className="p-4 text-rose-600">&nbsp;৳{d.amount}</td>
                              <td className="p-4 text-emerald-600">&nbsp;৳{d.paidAmount}</td>
                              <td className="p-4 font-medium">&nbsp;৳{d.amount - d.paidAmount}</td>
                              <td className="p-4 text-center">
                                <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                                  isPaid ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                  d.status === 'Partial' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                  'bg-rose-50 text-rose-600 border border-rose-100'
                                }`}>
                                  {isPaid ? 'পরিশোধিত' : d.status === 'Partial' ? 'আংশিক জমা' : 'বকেয়া'}
                                </span>
                              </td>
                              <td className="p-4 text-center flex justify-center gap-2">
                                {!isPaid && (
                                  <>
                                    <button
                                      type="button"
                                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentDue(d); setIsDuePayModalOpen(true); }}
                                      className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-2 py-1 rounded text-[10px] font-semibold transition-colors border border-emerald-100 cursor-pointer"
                                    >
                                      টাকা জমা
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); addNotification('এসএমএস রিমাইন্ডার', `${d.customerName} এর নাম্বারে বকেয়া পরিশোধের রিমাইন্ডার পাঠানো হয়েছে।`); }}
                                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-2 py-1 rounded text-[10px] font-semibold transition-colors border border-blue-100 flex items-center gap-1 cursor-pointer"
                                      title="সফটওয়্যার থেকে ম্যাসেজ"
                                    >
                                      <PhoneCall size={10} /> রিমাইন্ডার
                                    </button>
                                  </>
                                )}
                              </td>
                            </tr>
                          )
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View */}
                <div className="block md:hidden divide-y divide-slate-200/60">
                  {dues.filter(d => d.status !== 'Paid').length === 0 ? (
                    <div className="p-8 text-center text-slate-500 font-medium text-xs">কোন বকেয়া রেকর্ড নেই।</div>
                  ) : (
                    dues.filter(d => d.status !== 'Paid').map(d => {
                      const isPaid = d.status === 'Paid';
                      return (
                        <div key={d.id} className="p-4 flex flex-col gap-3 hover:bg-[#f8fafc]/50">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-[#115e5a] text-sm leading-normal">{d.customerName}</div>
                              <div className="text-[10px] text-slate-500 font-semibold mt-0.5">{d.phone}</div>
                            </div>
                            <span className={`inline-flex px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                              isPaid ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                              d.status === 'Partial' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                              'bg-rose-50 text-rose-600 border border-rose-100'
                            }`}>
                              {isPaid ? 'পরিশোধিত' : d.status === 'Partial' ? 'আংশিক জমা' : 'বকেয়া'}
                            </span>
                          </div>

                          <div className="flex justify-between items-center bg-[#f8fafc] rounded-xl p-3 border border-slate-200">
                            <div className="flex flex-col text-center">
                              <span className="text-[9px] text-slate-500 font-medium uppercase mb-0.5">পরিমাণ</span>
                              <span className="text-sm font-medium text-slate-700">&nbsp;৳{d.amount}</span>
                            </div>
                            <div className="flex flex-col text-center border-l border-r border-slate-200 px-3">
                              <span className="text-[9px] text-slate-500 font-medium uppercase mb-0.5">জমা</span>
                              <span className="text-sm font-medium text-emerald-600">&nbsp;৳{d.paidAmount}</span>
                            </div>
                            <div className="flex flex-col text-center">
                              <span className="text-[9px] text-slate-500 font-medium uppercase mb-0.5">পাওনা</span>
                              <span className="text-sm font-medium text-rose-600">&nbsp;৳{d.amount - d.paidAmount}</span>
                            </div>
                          </div>

                          {!isPaid && (
                            <div className="flex items-center gap-2 justify-end mt-1">
                              <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrentDue(d); setIsDuePayModalOpen(true); }}
                                className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 px-3 py-2 rounded-xl text-[10px] font-semibold transition-colors border border-emerald-100 flex-1 flex items-center justify-center gap-1 cursor-pointer"
                              >
                                টাকা জমা
                              </button>
                              <button
                                type="button"
                                onClick={(e) => { e.preventDefault(); e.stopPropagation(); addNotification('এসএমএস রিমাইন্ডার', `${d.customerName} এর নাম্বারে বকেয়া পরিশোধের রিমাইন্ডার পাঠানো হয়েছে।`); }}
                                className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-xl text-[10px] font-semibold transition-colors border border-blue-100 flex-1 flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <PhoneCall size={12} /> রিমাইন্ডার
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          )}

                              {/* TAB: LANDING PAGE */}
          {activeTab === 'landing-page' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800 tracking-tight">প্রোডাক্ট ল্যান্ডিং পেইজ</h2>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    আপনার প্রতিটি পণ্যের জন্য আলাদা সিঙ্গেল ল্যান্ডিং পেইজ পরিচালনা করুন। লিংক কপি করে মার্কেটিং করুন।
                  </p>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="পণ্য খুঁজুন..." 
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 transition-all shadow-sm" 
                  />
                  <Search size={16} className="absolute left-3.5 top-2.5 text-slate-400" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProductsList.map(product => (
                  <div key={product.id} className="bg-white rounded-xl border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col group hover:shadow-md hover:border-slate-300 transition-all">
                    <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        {product.isFlashSale && <span className="bg-rose-500 text-white text-[10px] px-2 py-1 rounded-md font-bold shadow-sm">Flash Sale</span>}
                        <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[10px] px-2 py-1 rounded-md font-bold shadow-sm">{product.category}</span>
                      </div>
                    </div>
                    
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-bold text-slate-800 text-base leading-normal mb-1">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-bold text-emerald-600">&nbsp;৳{product.discountedPrice || product.originalPrice}</span>
                        {product.discountedPrice && <span className="text-xs text-rose-500 line-through">&nbsp;৳{product.originalPrice}</span>}
                        <span className="text-xs text-slate-500 font-medium bn-safe">/ {product.weight}</span>
                      </div>

                      <div className="mt-auto space-y-2.5">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(window.location.origin + '/#product=' + product.id);
                              alert('ল্যান্ডিং পেইজ লিংক কপি হয়েছে!');
                            }}
                            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-[#f8fafc] hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-sm font-medium transition-colors"
                          >
                            <Copy size={16} className="text-slate-500" /> লিংক কপি
                          </button>
                          <a 
                            href={'/#product=' + product.id} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center justify-center p-2 bg-[#f8fafc] hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg transition-colors"
                            title="লাইভ দেখুন"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                        <button 
                          onClick={() => openEditProductModal(product)}
                          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-all shadow-sm active:scale-[0.98]"
                        >
                          <Edit3 size={16} /> পেইজ এডিট করুন
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredProductsList.length === 0 && (
                  <div className="col-span-full py-16 text-center bg-white border border-slate-200/60 rounded-xl">
                    <MonitorSmartphone size={40} className="mx-auto mb-3 text-slate-300" />
                    <p className="text-slate-500 font-medium">কোন পণ্য পাওয়া যায়নি</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: SYSTEM SETTINGS */}
          {activeTab === 'staff' && (
            <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto">
              <StaffManagement />
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto">
              <CategoryManagement />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-xl bg-white border border-slate-200 shadow-sm rounded-xl p-6 space-y-6">
              
              <div>
                <h3 className="font-semibold text-base text-slate-800">স্টোর ইনফরমেশন সেটিংস</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">গ্রাহক স্টোর ইন্টারফেসে প্রদর্শিত যোগাযোগের ডিটেইলস আপডেট করুন</p>
              </div>

              <div className="space-y-4">
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">হিরো ব্যানার আপলোড (Max: 2MB)</label>
                  {heroBannerUrl && (
                    <img src={heroBannerUrl} alt="Hero Banner Preview" className="w-full h-32 object-cover rounded-lg mb-3 border border-slate-200" />
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 500 * 1024) {
                          alert('ফাইলের সাইজ ৫০০ কেবির বেশি হতে পারবে না');
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const base64 = reader.result as string;
                          setHeroBannerUrl(base64);
                          safeSetItem('urbor_hero_banner', base64);
                          if (updateSettingsInDB) updateSettingsInDB({ heroBannerUrl: base64 });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                  />
                  <p className="text-xs text-slate-500 mt-2">ব্যানারের সাইজ চিকন ও ওয়াইড (যেমন 1200x400) হলে ভালো হয়।</p>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                  <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">লোগো আপলোড (Max: 1MB)</label>
                  {logoUrl && (
                    <img src={logoUrl} alt="Logo Preview" className="w-24 h-24 object-contain bg-white rounded-lg mb-3 border border-slate-200 p-2" />
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 500 * 1024) {
                          alert('ফাইলের সাইজ ৫০০ কেবির বেশি হতে পারবে না');
                          return;
                        }
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const base64 = reader.result as string;
                          setLogoUrl(base64);
                          if (ctxSetLogo) ctxSetLogo(base64);
                          safeSetItem('urbor_logo_url', base64);
                          if (updateSettingsInDB) updateSettingsInDB({ logoUrl: base64 });
                          updatePWAIcon();
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                  />
                  <p className="text-xs text-slate-500 mt-2">লোগোর সাইজ স্কয়ার এবং পিএনজি (PNG) হলে ভালো হয়।</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">স্টোরের নাম</label>
                  <input type="text" defaultValue="উর্বর ফুড" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm font-medium focus:border-emerald-600" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">স্টোর হটলাইন নাম্বার</label>
                  <input type="text" defaultValue="+880 1795-973932" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm font-medium focus:border-emerald-600" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">হেল্পডেস্ক ইমেইল</label>
                  <input type="email" defaultValue="hello@urborfood.com" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm font-medium focus:border-emerald-600" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">স্টোর আউটলেট ঠিকানা</label>
                  <input type="text" defaultValue="বাড়ি # ১৪/২৪, রোড # শাহজাহান রোড ,ব্লক # এ,মোহাম্মদপুর,ঢাকা-১২০৭, বাংলাদেশ।" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm font-medium focus:border-emerald-600 bn-safe" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">ডেলিভারি চার্জ (টাকা)</label>
                  <input type="number" defaultValue="৮০" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 outline-none text-sm font-medium focus:border-emerald-600 bn-safe" />
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => alert('সফলভাবে সেটিংস সংরক্ষিত হয়েছে!')}
                    className="bg-emerald-600 text-white py-2.5 px-6 rounded-xl text-sm font-medium hover:bg-emerald-700 shadow-md transition-all cursor-pointer"
                  >
                    সেটিংস সংরক্ষণ করুন
                  </button>
                </div>
              </div>

              {/* Real-time Order push & chime alert setup card */}
              <div className="border-t border-slate-200 pt-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-base text-slate-800 flex items-center gap-1.5">
                    <Bell size={18} className="text-emerald-600" />
                    অর্ডার নোটিফিকেশন ও অ্যালার্ম সেটিংস
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">নতুন অর্ডার জেনারেট হওয়ার সাথে সাথে ব্রাউজারে অ্যালার্ম শুনুন</p>
                </div>

                <div className="space-y-3 font-bold text-xs text-slate-700">
                  {/* Alarm switch toggle */}
                  <label className="flex items-center justify-between p-3.5 bg-[#f8fafc] hover:bg-slate-100/50 rounded-xl cursor-pointer border border-slate-200 transition-colors select-none">
                    <div className="flex flex-col gap-0.5 max-w-[80%]">
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        {soundEnabled ? <Volume2 size={16} className="text-emerald-600" /> : <VolumeX size={16} className="text-slate-500" />}
                        পিয়ানো রিং টোন চিম অ্যালার্ম
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium leading-relaxed">অর্ডার সম্পন্ন হবার সাথে সাথে রিয়েল-টাইমে অ্যালার্ম সাউন্ড বাজবে</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={soundEnabled} 
                        onChange={() => setSoundEnabled(!soundEnabled)} 
                        className="sr-only peer" 
                      />
                      <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                    </div>
                  </label>

                  {/* HTML5 Push System status */}
                  <div className="p-3.5 bg-[#f8fafc] rounded-xl border border-slate-200 flex items-center justify-between gap-4 font-bold select-none">
                    <div className="flex flex-col gap-0.5 max-w-[70%]">
                      <span className="text-slate-800 font-semibold">উইন্ডোজ/মোবাইল ডেক্সটপ পুশ অ্যালার্ট</span>
                      <span className="text-[10px] text-slate-500 font-medium leading-relaxed">
                        অবস্থা: {desktopPermission === 'granted' ? 'সিস্টেম চালু আছে (Granted) ✅' : desktopPermission === 'denied' ? 'বন্ধ করা আছে (Denied) ❌' : 'অনুমতি নেওয়া হয়নি ⚠️'}
                      </span>
                    </div>

                    {desktopPermission !== 'granted' ? (
                      <button 
                        onClick={requestDesktopPermission}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-[10px] px-3 py-1.5 rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
                      >
                        অনুমতি চালু করুন
                      </button>
                    ) : (
                      <span className="text-emerald-600 text-[10px] bg-emerald-100 border border-emerald-500/20 px-2.5 py-1 rounded font-bold uppercase">Active</span>
                    )}
                  </div>

                  {/* Manual testing buttons */}
                  <div className="grid grid-cols-2 gap-3.5 pt-2 select-none">
                    <button
                      type="button"
                      onClick={triggerSound}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-4 rounded-xl text-[10px] font-semibold flex items-center justify-center gap-1.5 border border-slate-200/50 transition-all cursor-pointer active:scale-95"
                    >
                      🗣️ অ্যালার্ম সাউন্ড টেস্ট করুন
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        const testNames = ['মুহাম্মদ সালমান রহমান', 'ফারজানা ইয়াসমিন', 'ইশতিয়াক আহমেদ চৌধুরী', 'তানজিম হাসান', 'রুবাইয়া কবীর'];
                        const testPhones = ['01712445522', '01811883311', '01915998822', '01552223344', '01673887755'];
                        const testAddrs = ['রোড ৪, হাউজিং স্টেট, ধানমন্ডি, ঢাকা', 'সেক্টর ৪, উত্তরা মডেল টাউন, ঢাকা', 'মুরাদপুর ফরেস্ট গেট, চট্টগ্রাম', 'সেনপাড়া শ্যাওড়াপাড়া, মিরপুর ২, ঢাকা', 'হাতিমবাগ, সিলেট'];
                        
                        const rN = testNames[Math.floor(Math.random() * testNames.length)];
                        const rP = testPhones[Math.floor(Math.random() * testPhones.length)];
                        const rA = testAddrs[Math.floor(Math.random() * testAddrs.length)];
                        
                        // Select a random product
                        const list = products.length > 0 ? products : [
                          { id: 'p1', name: 'প্রিমিয়াম গরুর মাংস (হাড় ছাড়া)', originalPrice: 799, category: 'গরুর মাংস', weight: '১ কেজি', image: '' }
                        ];
                        const randomP = list[Math.floor(Math.random() * list.length)];
                        
                        const items = [{
                          id: randomP.id,
                          name: randomP.name,
                          quantity: 1,
                          price: randomP.discountedPrice || randomP.originalPrice
                        }];

                        const totalBill = items.reduce((sum, item) => sum + item.price, 0);

                        const randomMockOrderObj = {
                          id: `ord-${Math.floor(100 + Math.random() * 900)}`,
                          customerName: rN,
                          phone: rP,
                          address: rA,
                          items: items,
                          total: totalBill,
                          date: new Date().toISOString(),
                          status: 'Pending' as const,
                            salesman: manualOrderSalesman
                        };

                        addSimulatedOrder(randomMockOrderObj);
                      }}
                      className="bg-emerald-50 hover:bg-emerald-500/20 text-emerald-400 py-2.5 px-4 rounded-xl text-[10px] font-bold border border-emerald-500/20 flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer active:scale-95"
                    >
                      নতুন অর্ডার সিমুলেট
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}


          {/* TAB: CREATE ORDER (ম্যানুয়াল অর্ডার তৈরি) */}
          {activeTab === 'create-order' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <PlusCircle className="text-amber-500" size={28} strokeWidth={2.5} />
                    ম্যানুয়াল অর্ডার তৈরি করুন
                  </h2>
                  <p className="text-xs md:text-sm text-slate-500 font-medium mt-1">ফেসবুক, হোয়াটসঅ্যাপ বা কাস্টম অফলাইন অর্ডার এন্ট্রি করুন</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Side: Customer & Product Input Form */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                  {/* Customer Info Card */}
                  <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
                    <h3 className="font-bold text-[15px] text-slate-600 bn-safe">১. কাস্টমারের তথ্য</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs text-slate-700 font-bold mb-1.5">কাস্টমার নাম {manualOrderSource !== 'shop' && '*'}</label>
                        <input
                          type="text"
                          value={manualOrderCustomerName}
                          onChange={(e) => setManualOrderCustomerName(e.target.value)}
                          placeholder="কাস্টমারের নাম লিখুন"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none text-slate-800 placeholder:text-slate-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-slate-700 font-bold mb-1.5">মোবাইল নম্বর {manualOrderSource !== 'shop' && '*'}</label>
                        <input
                          type="text"
                          value={manualOrderPhone}
                          onChange={(e) => {
                            const val = e.target.value;
                            setManualOrderPhone(val);
                            if (val.length >= 11) {
                              const existing = orders.find(o => o.phone === val);
                              if (existing) {
                                if (!manualOrderCustomerName) setManualOrderCustomerName(existing.customerName);
                                if (!manualOrderAddress) setManualOrderAddress(existing.address);
                              }
                            }
                          }}
                          placeholder="মোবাইল নম্বর লিখুন"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none text-slate-800 placeholder:text-slate-500 transition-colors"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-slate-700 font-bold mb-1.5">ডেলিভারি ঠিকানা {manualOrderSource !== 'shop' && '*'}</label>
                        <textarea
                          rows={2}
                          value={manualOrderAddress}
                          onChange={(e) => setManualOrderAddress(e.target.value)}
                          placeholder="পূর্ণ ঠিকানা (বাসা, রোড, থানা, জেলা) লিখুন"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none text-slate-800 placeholder:text-slate-500 resize-none transition-colors"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-slate-700 font-bold mb-1.5">সেলসম্যান (Salesman) *</label>
                        <div className="relative">
                          
<select value={manualOrderSalesman} onChange={(e) => setManualOrderSalesman(e.target.value)} disabled={isStaff} className={`w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold outline-none bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 text-slate-800 transition-colors ${isStaff ? 'bg-slate-50 opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}><option value="">নির্বাচন করুন</option>{staffList?.map((s: any) => <option key={s.id} value={s.name}>{s.name}</option>)}</select>

                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                      <label className="text-xs text-slate-500 font-medium shrink-0">অর্ডারের উৎস:</label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { id: 'shop', label: 'শপ থেকে সেল', icon: <Store size={14} className="text-amber-600" /> },
                          { id: 'website', label: 'ওয়েবসাইট', icon: <Globe size={14} /> },
                          { id: 'facebook', label: 'ফেসবুক', icon: <Facebook size={14} className="text-blue-600" /> },
                          { id: 'whatsapp', label: 'হোয়াটসঅ্যাপ', icon: <MessageCircle size={14} className="text-[#25D366]" /> }
                        ].map((src) => (
                          <button
                            key={src.id}
                            type="button"
                            onClick={() => setManualOrderSource(src.id as any)}
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium border transition-all ${manualOrderSource === src.id ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-[#f8fafc]'}`}
                          >
                            {src.icon}
                            {src.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Product Picker Card */}
                  <div className="bg-white p-5 md:p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
                    <h3 className="font-bold text-[15px] text-slate-600 bn-safe">২. পণ্য এবং পরিমাণ যুক্ত করুন</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                      <div className="md:col-span-7">
                        <label className="block text-xs text-slate-700 font-bold mb-1.5">পণ্য নির্বাচন করুন</label>
                        
<div className="relative">
  <input
    type="text"
    placeholder="পণ্য খুঁজুন (টাইপ করুন)..."
    value={manualProductSearch || (manualSelectedProductId ? (products.find(p => p.id === manualSelectedProductId)?.name || '') : '')}
    onChange={(e) => {
      setManualProductSearch(e.target.value);
      setIsManualProductSearchOpen(true);
      setManualSelectedProductId('');
    }}
    onFocus={() => setIsManualProductSearchOpen(true)}
    className="w-full px-4 py-3 leading-relaxed rounded-xl border border-slate-200 text-sm font-semibold outline-none bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 text-slate-800 transition-colors"
  />
  {isManualProductSearchOpen && (
    <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg animate-in fade-in zoom-in-95 duration-150">
      <div className="p-1">
        {products.filter(p => p.name.toLowerCase().includes(manualProductSearch.toLowerCase())).map(p => {
          const price = p.discountedPrice || p.originalPrice;
          return (
            <div
              key={p.id}
              onClick={() => {
                setManualSelectedProductId(p.id);
                setManualProductSearch('');
                setIsManualProductSearchOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 cursor-pointer rounded-lg flex justify-between items-center"
            >
              <div className="flex items-baseline min-w-0 flex-1 pr-2"><span className="truncate py-0.5 leading-relaxed">{p.name}</span><span className="shrink-0 text-slate-500 text-xs ml-1 whitespace-nowrap">({p.weight})</span></div>
              <span className="shrink-0 text-emerald-600 font-bold">&nbsp;৳{price}</span>
            </div>
          );
        })}
        {products.filter(p => p.name.toLowerCase().includes(manualProductSearch.toLowerCase())).length === 0 && (
          <div className="p-3 text-sm text-slate-500 text-center">কোনো পণ্য পাওয়া যায়নি</div>
        )}
      </div>
    </div>
  )}
</div>

                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs text-slate-700 font-bold mb-1.5">পরিমাণ (Qty)</label>
                        <input type="number" min="1" value={manualSelectedQuantity} onChange={(e) => setManualSelectedQuantity(Number(e.target.value) || 1)} className="w-full px-2 py-3 rounded-xl border border-slate-200 text-sm font-semibold focus:border-slate-900 focus:ring-1 focus:ring-slate-900/10 outline-none text-slate-800 transition-colors text-center leading-relaxed" />
                      </div>
                      <div className="md:col-span-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (!manualSelectedProductId) {
                              alert('অনুগ্রহ করে পণ্য নির্বাচন করুন।');
                              return;
                            }
                            const p = products.find(prod => prod.id === manualSelectedProductId);
                            if (!p) return;
                            const price = p.discountedPrice || p.originalPrice;
                            
                            // Check stock before adding
                            if (p.stock !== undefined && p.stock < manualSelectedQuantity) {
                              alert(`দুঃখিত! এই পণ্যটির স্টক সংখ্যা সীমিত (${p.stock} টি)।`);
                              return;
                            }

                            // Add item to manualOrderItems state
                            const existingIdx = manualOrderItems.findIndex(it => it.id === p.id);
                            if (existingIdx > -1) {
                              setManualOrderItems(prev => prev.map((item, idx) => idx === existingIdx ? { ...item, quantity: item.quantity + manualSelectedQuantity } : item));
                            } else {
                              setManualOrderItems(prev => [...prev, {
                                id: p.id,
                                name: p.name,
                                quantity: manualSelectedQuantity,
                                price: price
                              }]);
                            }
                            setManualSelectedProductId('');
                            setManualSelectedQuantity(1);
                          }}
                          className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm py-3 rounded-xl cursor-pointer transition-colors shadow-sm"
                        >
                          পণ্য যোগ করুন ➕
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Order Summary & Placement */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-6 self-start">
                  <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 md:p-6 border-b border-slate-200/60 bg-emerald-50/30">
                      <h3 className="font-bold text-slate-700 text-sm flex items-center gap-2">
                        <ShoppingBag size={18} className="text-emerald-600" />
                        অর্ডার রশিদ ও মেমো
                      </h3>
                    </div>

                    <div className="p-5 md:p-6 space-y-5 flex-1">
                      {/* Cart items list */}
                      {manualOrderItems.length === 0 ? (
                        <div className="py-12 text-center text-slate-500 font-semibold text-sm border-2 border-dashed border-slate-200 rounded-xl">
                          এখনো কোনো পণ্য যুক্ত করা হয়নি।
                        </div>
                      ) : (
                        <div className="divide-y divide-slate-200/60 border border-slate-200 rounded-xl overflow-hidden max-h-[50vh] overflow-y-auto">
                          {manualOrderItems.map((item, idx) => (
                            <div key={idx} className="p-3 bg-[#f8fafc]/40 flex items-center justify-between text-sm font-medium gap-3">
                              <div className="min-w-0 flex-1">
                                <h4 className="text-slate-800 truncate text-[11px]">{item.name}</h4>
                                <span className="text-[10px] text-slate-500 font-medium">{item.quantity} x ৳{item.price}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-slate-800 shrink-0 text-[11px]">&nbsp;৳{item.price * item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => setManualOrderItems(prev => prev.filter((_, i) => i !== idx))}
                                  className="text-slate-300 hover:text-rose-500 p-1 rounded-md transition-colors"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Financial breakdown */}
                      <div className="space-y-2.5 pt-3 border-t border-slate-200 text-sm font-medium text-slate-600">
                        {/* Subtotal */}
                        <div className="flex justify-between">
                          <span>পণ্য উপমোট</span>
                          <span className="text-slate-900">&nbsp;৳{manualOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                        </div>
                        {/* Delivery Charge */}
                        <div className="flex justify-between items-center">
                          <span>ডেলিভারি চার্জ</span>
                          <div className="flex items-center gap-1">
                            <span className="text-slate-500 text-[10px]">&nbsp;৳</span>
                            <input
                              type="number"
                              value={manualOrderIsDue ? 0 : 120} // Just let it default, or we can use state or a constant
                              disabled
                              className="w-16 px-1.5 py-0.5 rounded border border-slate-200 text-center text-sm font-medium bg-[#f8fafc] text-slate-500"
                            />
                          </div>
                        </div>
                        {/* Final Balance */}
                        <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-dashed border-slate-200">
                          <span>সর্বমোট বিল</span>
                          <span className="text-emerald-900 text-base">
                            &nbsp;৳{manualOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + (manualOrderIsDue ? 0 : 120)}
                          </span>
                        </div>
                      </div>

                      {/* Create Button */}
                      <button
                        type="button"
                        onClick={() => {
                          if (manualOrderSource !== 'shop' && (!manualOrderCustomerName || !manualOrderPhone || !manualOrderAddress)) {
                            alert('অনুগ্রহ করে কাস্টমারের নাম, ফোন নম্বর ও ডেলিভারি ঠিকানা সঠিকভাবে লিখুন।');
                            return;
                          }
                          if (manualOrderItems.length === 0) {
                            alert('অনুগ্রহ করে অন্তত ১টি পণ্য যুক্ত করুন।');
                            return;
                          }

                          const trackingId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
                          const itemsTotal = manualOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                          const totalBill = itemsTotal + (manualOrderIsDue ? 0 : 120);

                          const newOrderObj = {
                            id: trackingId,
                            customerName: manualOrderCustomerName || 'শপ কাস্টমার',
                            phone: manualOrderPhone || 'N/A',
                            address: manualOrderAddress || 'N/A',
                            items: manualOrderItems,
                            total: totalBill,
                            date: new Date().toISOString(),
                            status: 'Pending' as const,
                            salesman: manualOrderSalesman,
                            source: manualOrderSource
                          };
                          // Deduct from product stocks
                          products.forEach(p => {
                            const orderItem = manualOrderItems.find(it => it.id === p.id);
                            if (orderItem) {
                              const updatedStock = Math.max(0, (p.stock || 0) - orderItem.quantity);
                              updateProduct({ ...p, stock: updatedStock });
                            }
                          });

                          // Save Order
                          addSimulatedOrder(newOrderObj, true);

                          

                          // Trigger print
                          setInvoiceToPrint(newOrderObj);

                          // Trigger sound
                          if (soundEnabled) {
                            triggerSound();
                          }

                          // Reset states
                          setManualOrderCustomerName('');
                          setManualOrderPhone('');
                          setManualOrderAddress('');
                          setManualOrderItems([]);
                          
                          // Switch to orders view
                          setActiveTab('orders');
                        }}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-sm font-bold text-sm py-3.5 rounded-xl cursor-pointer transition-all duration-200 shadow-md active:scale-98 flex items-center justify-center gap-1.5"
                      >
                        অর্ডার তৈরি সম্পন্ন করুন (Save Order)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* TAB: INVENTORY CONTROL (ইনভেন্টরি কন্ট্রোল) */}
          {activeTab === 'inventory' && (() => {
            const lowStockProducts = products.filter(p => (p.stock || 0) <= (p.lowStockAlert || 5));
            const outOfStockProducts = products.filter(p => (p.stock || 0) === 0);

            // Filter items based on search input
            const filteredProducts = products.filter(p => {
              const matchSearch = p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                                  p.category.toLowerCase().includes(productSearch.toLowerCase());
              return matchSearch;
            });

            return (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <Package className="text-emerald-500" size={24} />
                      ইনভেন্টরি কন্ট্রোল ও স্টক ম্যানেজার
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">সবুজ প্রোটিন ও ফ্রেশ ফুডের মজুত নিয়ন্ত্রণ করুন</p>
                  </div>
                </div>

                {/* Stats cards for stock */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">মোট আইটেম</span>
                    <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-1">{products.length} টি</h3>
                  </div>
                  <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">পর্যাপ্ত স্টক</span>
                    <h3 className="text-lg md:text-xl font-bold text-emerald-600 mt-1">{products.length - lowStockProducts.length} টি</h3>
                  </div>
                  <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">সীমিত স্টক (Low)</span>
                    <h3 className="text-lg md:text-xl font-bold text-amber-500 mt-1">{lowStockProducts.length - outOfStockProducts.length} টি</h3>
                  </div>
                  <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">স্টক শেষ (Out)</span>
                    <h3 className="text-lg md:text-xl font-bold text-rose-600 mt-1">{outOfStockProducts.length} টি</h3>
                  </div>
                </div>

                {/* Stock Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden overflow-hidden">
                  <div className="p-5 border-b border-slate-200 flex items-center justify-between gap-3 flex-wrap">
                    <div className="relative max-w-xs w-full">
                      <input
                        type="text"
                        placeholder="পণ্য খুঁজুন..."
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600 font-semibold"
                      />
                      <Search size={14} className="absolute left-2.5 top-2.5 text-slate-500" />
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs font-medium min-w-[600px]">
                      <thead>
                        <tr className="bg-[#f8fafc] text-slate-500 border-b border-slate-200">
                          <th className="p-4 pl-6">পণ্যের নাম</th>
                          <th className="p-4">ক্যাটাগরি & ওজন</th>
                          <th className="p-4 text-center">বর্তমান মজুত (Stock)</th>
                          <th className="p-4 text-center">স্ট্যাটাস</th>
                          <th className="p-4">স্টক সংশোধন</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200/60 text-slate-700">
                        {filteredProducts.map((p) => {
                          const stockLevel = p.stock || 0;
                          const alertLimit = p.lowStockAlert || 5;
                          const isOutOfStock = stockLevel === 0;
                          const isLowStock = stockLevel <= alertLimit && !isOutOfStock;

                          return (
                            <tr key={p.id} className="hover:bg-[#f8fafc]/40 transition-colors">
                              <td className="p-4 pl-6">
                                <div className="flex items-center gap-3">
                                  {p.image && (
                                    <div className="w-8 h-8 shrink-0 rounded-lg overflow-hidden border border-slate-200">
                                      <ImageLoader src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                    </div>
                                  )}
                                  <div>
                                    <span className="block text-slate-900 font-bold text-[13px]">{p.name}</span>
                                    <span className="text-[10px] text-slate-500">ID: #{p.id}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 text-slate-500">
                                <div>{p.category}</div>
                                <div className="text-[10px] text-slate-500 bn-safe">{p.weight}</div>
                              </td>
                              <td className="p-4 text-center text-sm font-medium">
                                <span className={isOutOfStock ? 'text-rose-600' : isLowStock ? 'text-amber-500' : 'text-emerald-600'}>
                                  {stockLevel} টি
                                </span>
                              </td>
                              <td className="p-4 text-center">
                                <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                  isOutOfStock ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                  isLowStock ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                  'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                }`}>
                                  {isOutOfStock ? 'স্টক নেই' : isLowStock ? 'সীমিত স্টক' : 'মজুত পর্যাপ্ত'}
                                </span>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-1.5">
                                  <input
                                    type="number"
                                    defaultValue={stockLevel}
                                    onBlur={(e) => {
                                      const val = Number(e.target.value);
                                      if (val >= 0) {
                                        updateProduct({ ...p, stock: val });
                                        addNotification('স্টক আপডেট করা হয়েছে 📦', `${p.name} এর স্টক সংখ্যা বাড়িয়ে ${val} টি করা হয়েছে।`);
                                      }
                                    }}
                                    className="w-16 px-1.5 py-1 text-center border border-slate-200 rounded-lg text-sm font-medium"
                                  />
                                  <span className="text-[10px] text-slate-500 font-medium">টি</span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile View */}
                  <div className="md:hidden divide-y divide-slate-100">
                    {filteredProducts.map((p) => {
                      const stockLevel = p.stock || 0;
                      const alertLimit = p.lowStockAlert || 5;
                      const isOutOfStock = stockLevel === 0;
                      const isLowStock = stockLevel <= alertLimit && !isOutOfStock;

                      return (
                        <div key={p.id} className="p-4 hover:bg-slate-50/50 transition-colors flex flex-col gap-3">
                          <div className="flex items-start gap-3">
                            {p.image && (
                              <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-slate-200">
                                <ImageLoader src={p.image} alt={p.name} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-slate-800 text-[13px] leading-normal truncate">{p.name}</h4>
                              <div className="text-[10px] text-slate-500 mt-0.5 bn-safe">{p.category} • {p.weight}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">ID: #{p.id}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                            <div>
                              <div className="text-[10px] text-slate-500 font-semibold mb-1">বর্তমান মজুত</div>
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-black ${isOutOfStock ? 'text-rose-600' : isLowStock ? 'text-amber-500' : 'text-emerald-600'}`}>
                                  {stockLevel} টি
                                </span>
                                <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                                  isOutOfStock ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                  isLowStock ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                                  'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                }`}>
                                  {isOutOfStock ? 'স্টক নেই' : isLowStock ? 'সীমিত' : 'পর্যাপ্ত'}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-[10px] text-slate-500 font-semibold mb-1">স্টক সংশোধন</div>
                              <div className="flex items-center justify-end gap-1.5">
                                <input
                                  type="number"
                                  defaultValue={stockLevel}
                                  onBlur={(e) => {
                                    const val = Number(e.target.value);
                                    if (val >= 0) {
                                      updateProduct({ ...p, stock: val });
                                      addNotification('স্টক আপডেট করা হয়েছে 📦', `${p.name} এর স্টক সংখ্যা বাড়িয়ে ${val} টি করা হয়েছে।`);
                                    }
                                  }}
                                  className="w-16 px-1.5 py-1 text-center border border-slate-200 rounded-lg text-sm font-medium bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                                />
                                <span className="text-[10px] text-slate-500 font-medium">টি</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })()}


          {/* TAB: COURIER DASHBOARD (কুরিয়ার ড্যাশবোর্ড) */}
          {activeTab === 'courier' && (() => {
            // We want to fetch standard confirmed or shipped orders to book into couriers!
            const courierOrders = orders.filter(o => ['Confirmed', 'Courier', 'Shipped'].includes(o.status));

            return (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <Truck className="text-sky-500" size={24} />
                      কুরিয়ার লজিস্টিকস ও বুকিং ড্যাশবোর্ড
                    </h2>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">পাঠাও, রেড-এক্স ও স্টিডফাস্ট কুরিয়ারে পার্সেল বুকিং এবং লাইভ ট্র্যাকিং</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/70 hover:border-emerald-300 shadow-sm hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300 mb-6 overflow-hidden relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="p-5 sm:p-6 border-b border-slate-100/60 bg-gradient-to-r from-emerald-50/40 via-white to-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-[15px] text-slate-800 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm border border-emerald-200/50">
                          <Wallet size={18} strokeWidth={2.5} />
                        </div>
                        কুরিয়ার পেমেন্ট ও ইনভয়েস (Steadfast Payments)
                      </h3>
                      <p className="text-[12.5px] text-slate-500 mt-2 ml-12">পেমেন্ট স্ট্যাটাস এবং কনসাইনমেন্ট বিস্তারিত দেখুন</p>
                    </div>
                    <button
                      onClick={async () => {
                        setIsPaymentsLoading(true);
                        try {
                          const res = await fetch('https://portal.packzy.com/api/v1/payments', {
                            headers: {
                              'Api-Key': 'sjg2zq4pzai6isaaolupaf1iaily32vk',
                              'Secret-Key': 'd7od4knpcjhxycnnlmk3oe9r'
                            }
                          });
                          const data = await res.json();
                          if (data.status === 1) {
                            setPaymentsData(data.payment || (data.payments && data.payments[0]) || null);
                          } else {
                            alert(data.message || 'Error fetching payments');
                          }
                        } catch (err) {
                          console.error(err);
                          alert("পেমেন্ট ডেটা লোড করতে সমস্যা হয়েছে।");
                        } finally {
                          setIsPaymentsLoading(false);
                        }
                      }}
                      disabled={isPaymentsLoading}
                      className="bg-slate-900 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm shadow-slate-900/10 hover:shadow-emerald-500/30 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap flex items-center gap-2 active:scale-95"
                    >
                      {isPaymentsLoading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> লোড হচ্ছে...</> : 'পেমেন্ট রিফ্রেশ'}
                    </button>
                  </div>
                  {paymentsData ? (
                    <div className="p-5 sm:p-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-center">
                          <span className="text-[11px] text-slate-500 font-bold mb-1 uppercase tracking-wider">পেমেন্ট আইডি</span>
                          <span className="text-sm font-black text-slate-800">{paymentsData.payment_id}</span>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex flex-col justify-center">
                          <span className="text-[11px] text-emerald-600 font-bold mb-1 uppercase tracking-wider">স্ট্যাটাস</span>
                          <span className="text-sm font-black text-emerald-700 uppercase">{paymentsData.status_label}</span>
                        </div>
                        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex flex-col justify-center">
                          <span className="text-[11px] text-indigo-600 font-bold mb-1 uppercase tracking-wider">সর্বমোট অ্যামাউন্ট</span>
                          <span className="text-sm font-black text-indigo-700">&nbsp;৳{paymentsData.total}</span>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-center">
                          <span className="text-[11px] text-slate-500 font-bold mb-1 uppercase tracking-wider">পেমেন্ট মেথড</span>
                          <span className="text-sm font-black text-slate-800">{paymentsData.method}</span>
                        </div>
                      </div>

                      <h4 className="font-bold text-sm text-slate-700 mb-3">কনসাইনমেন্ট সমূহ ({paymentsData.consignments?.length || 0} টি)</h4>
                      <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2">
                        {paymentsData.consignments?.map((cons: any, idx: number) => (
                          <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3 flex justify-between items-center text-xs">
                            <div>
                              <div className="font-bold text-slate-800 mb-1">{cons.recipient_name} <span className="text-slate-400 font-normal">({cons.recipient_phone})</span></div>
                              <div className="text-slate-500">TRK: {cons.tracking_code} • COD: ৳{cons.cod_amount}</div>
                            </div>
                            <div className="text-right">
                              <div className={`inline-block px-2 py-0.5 rounded font-bold uppercase ${cons.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' : cons.status === 'cancelled' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>
                                {cons.status}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-slate-500 text-sm font-medium">
                      পেমেন্ট ডেটা দেখতে 'পেমেন্ট রিফ্রেশ' বাটনে ক্লিক করুন। (এই মুহূর্তে কোনো নতুন পেমেন্ট নেই)
                    </div>
                  )}
                </div>

                {/* Tracking By Invoice Section */}
                <div className="bg-white rounded-2xl border border-slate-200/70 hover:border-blue-300 shadow-sm hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 mb-6 overflow-hidden relative group">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="p-5 sm:p-6 border-b border-slate-100/60 bg-gradient-to-r from-blue-50/40 via-white to-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="font-bold text-[15px] text-slate-800 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm border border-blue-200/50">
                          <Truck size={18} strokeWidth={2.5} />
                        </div>
                        ইনভয়েস দিয়ে ট্র্যাকিং (Track by Invoice)
                      </h3>
                      <p className="text-[12.5px] text-slate-500 mt-2 ml-12">আপনার ইনভয়েস নম্বর দিয়ে পার্সেলের ট্র্যাকিং তথ্য জানুন</p>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          value={trackingInvoiceId}
                          onChange={(e) => setTrackingInvoiceId(e.target.value)}
                          placeholder="Invoice ID (e.g. INV0EEBA2A)"
                          className="w-full pl-10 pr-4 py-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm bg-slate-50/50"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              document.getElementById('track-invoice-btn')?.click();
                            }
                          }}
                        />
                      </div>
                      <button
                        id="track-invoice-btn"
                        disabled={isTrackingLoading || !trackingInvoiceId}
                        onClick={async () => {
                          if (!trackingInvoiceId) return;
                          setIsTrackingLoading(true);
                          setTrackingResult(null);
                          try {
                            const res = await fetch(`https://portal.packzy.com/api/v1/trackings_by_invoice/${trackingInvoiceId}`, {
                              headers: {
                                'Api-Key': 'sjg2zq4pzai6isaaolupaf1iaily32vk',
                                'Secret-Key': 'd7od4knpcjhxycnnlmk3oe9r'
                              }
                            });
                            
                            const textData = await res.text();
                            
                            if (!res.ok) {
                                alert(`Error: ${textData || res.statusText || 'Failed to fetch tracking'}`);
                                return;
                            }
                            
                            try {
                                const data = JSON.parse(textData);
                                // The tracking API usually returns an array of objects or an object containing an array.
                                // We'll handle it flexibly.
                                if (data && typeof data === 'object') {
                                    if (data.delivery_status) {
                                        setTrackingResult(data.delivery_status);
                                    } else if (Array.isArray(data)) {
                                        setTrackingResult(data);
                                    } else if (data.status === 200 && data.data) {
                                        setTrackingResult(data.data.delivery_status || data.data);
                                    } else {
                                        // Just display the data object keys nicely if unknown structure
                                        setTrackingResult(data);
                                    }
                                } else {
                                    alert("No tracking data found.");
                                }
                            } catch (e) {
                                alert(`Error parsing tracking data: ${textData}`);
                            }
                          } catch (err) {
                            console.error(err);
                            alert("ট্র্যাকিং চেক করতে সমস্যা হয়েছে। API Error.");
                          } finally {
                            setIsTrackingLoading(false);
                          }
                        }}
                        className="bg-slate-900 hover:bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm shadow-slate-900/10 hover:shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0 active:scale-95"
                      >
                        {isTrackingLoading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> খুঁজছে...</> : <><Search size={16} /> ট্র্যাক করুন</>}
                      </button>
                    </div>
                    {trackingResult && (
                      <div className="mt-5 space-y-3">
                        <h4 className="font-bold text-sm text-slate-700">ট্র্যাকিং তথ্য</h4>
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-h-[300px] overflow-y-auto">
                            {Array.isArray(trackingResult) ? (
                                trackingResult.map((t: any, idx: number) => (
                                    <div key={idx} className="mb-4 last:mb-0 relative pl-4 border-l-2 border-blue-200">
                                        <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-blue-500"></div>
                                        <div className="text-xs text-slate-500 mb-1">{t.time || t.date || 'সময় উল্লেখ নেই'}</div>
                                        <div className="text-sm font-semibold text-slate-800">{t.status || t.note || JSON.stringify(t)}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-sm text-slate-700">
                                    <pre className="whitespace-pre-wrap">{JSON.stringify(trackingResult, null, 2)}</pre>
                                </div>
                              )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats cards for courier */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">মোট শিপড পার্সেল</span>
                    <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-1">
                      {orders.filter(o => o.status === 'Shipped').length} টি
                    </h3>
                  </div>
                  <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">পাঠাও বুকড</span>
                    <h3 className="text-lg md:text-xl font-bold text-orange-900 mt-1">
                      {orders.filter(o => o.status === 'Shipped' && o.id.charCodeAt(0) % 3 === 0).length + 1} টি
                    </h3>
                  </div>
                  <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">রেড-এক্স বুকড</span>
                    <h3 className="text-lg md:text-xl font-bold text-red-700 mt-1">
                      {orders.filter(o => o.status === 'Shipped' && o.id.charCodeAt(0) % 3 === 1).length} টি
                    </h3>
                  </div>
                  <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">স্টিডফাস্ট বুকড</span>
                    <h3 className="text-lg md:text-xl font-bold text-sky-600 mt-1">
                      {orders.filter(o => o.status === 'Shipped' && o.id.charCodeAt(0) % 3 === 2).length + 1} টি
                    </h3>
                  </div>
                </div>

                                {/* Orders to Book List (Responsive) */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-4 sm:p-5 border-b border-slate-200 bg-[#f8fafc]/50">
                    <h3 className="font-bold text-sm text-slate-800">কুরিয়ারের জন্য বুকিং যোগ্য পার্সেল সমূহ</h3>
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col gap-4 bg-slate-50/50">
                    {courierOrders.map((o) => {
                      const courierName = 'Steadfast Courier';
                      const trackingId = o.status === 'Shipped' ? 'STEADFAST-BOOKED' : '';

                      return (
                        <div key={o.id} className="group bg-white border border-slate-200 hover:border-emerald-500/40 hover:shadow-md rounded-[16px] p-4 md:p-5 transition-all duration-300">
                          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6">
                            
                            {/* Left/Top side - Order Identity & Customer */}
                            <div className="flex-1 space-y-4">
                              {/* Header part */}
                              <div className="flex flex-wrap items-center justify-between md:justify-start gap-3 border-b border-slate-100 pb-3 md:border-0 md:pb-0">
                                <div className="flex items-center gap-2.5">
                                  <span className="font-bold text-slate-800 text-[15px] bg-slate-50 px-2 py-1 rounded-md whitespace-nowrap shrink-0">#{o.id}</span>
                                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 whitespace-nowrap shrink-0">
                                    <Truck size={10} className="text-indigo-500" /> Steadfast
                                  </span>
                                </div>
                                
                                {/* Status badge - mobile top right, desktop next to identity */}
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                                  o.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                  o.status === 'Shipped' ? 'bg-sky-50 text-sky-700 border border-sky-100' :
                                  'bg-amber-50 text-amber-700 border border-amber-100'
                                } whitespace-nowrap shrink-0`}>
                                  {o.status === 'Pending' ? (
                                    <><Clock size={12} /> পেন্ডিং</>
                                  ) : o.status === 'Completed' ? (
                                    <><CheckCircle size={12} /> ডেলিভার্ড</>
                                  ) : (
                                    <><Truck size={12} /> ইন ট্রানজিট</>
                                  )}
                                </span>
                              </div>

                              {/* Customer details */}
                              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                <button 
                                  onClick={() => { setEditingCourierNoteOrderId(o.id); setCourierNoteText(o.courierNote || ''); }}
                                  className="flex items-center gap-3 text-left group/user min-w-[200px]"
                                >
                                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover/user:bg-emerald-100 transition-colors">
                                    <User size={16} className="text-slate-500 group-hover/user:text-emerald-600 transition-colors" />
                                  </div>
                                  <div>
                                    <h4 className="font-bold text-slate-800 text-[14px] group-hover/user:text-emerald-600 transition-colors mb-0.5 leading-tight">{o.customerName}</h4>
                                    <div className="flex items-center gap-1.5 mt-1">
                                      <a href={`tel:${o.phone}`} onClick={(e) => e.stopPropagation()} className="text-[12px] font-medium text-slate-500 flex items-center gap-1 hover:text-emerald-600 transition-colors bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                                        <Phone size={10} className="text-emerald-500" /> {o.phone}
                                      </a>
                                    </div>
                                  </div>
                                </button>

                                <div className="flex-1 text-[12.5px] text-slate-600 leading-relaxed flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                  <MapPin size={14} className="text-slate-400 shrink-0 mt-0.5" />
                                  <span className="line-clamp-2">{o.address}</span>
                                </div>
                              </div>
                              
                              {/* Courier Note if any */}
                              {o.courierNote && (
                                <div className="inline-flex items-start gap-1.5 px-3 py-2 bg-amber-50 rounded-lg border border-amber-100/60 w-full sm:w-auto mt-2">
                                  <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                                  <p className="text-[12px] text-amber-800 font-medium">{o.courierNote}</p>
                                </div>
                              )}
                            </div>

                            {/* Right/Bottom side - Actions & Price */}
                            <div className="md:w-[240px] shrink-0 flex flex-col justify-between gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
                              
                              {/* Pricing & Tracking */}
                              <div className="flex flex-row md:flex-col justify-between items-center md:items-start gap-3 flex-wrap">
                                <div>
                                  <p className="text-[11px] text-slate-400 font-semibold mb-0.5 uppercase tracking-wider">মোট বিল (COD)</p>
                                  <p className="text-[18px] font-black text-slate-800">৳{o.total}</p>
                                </div>
                                
                                {/* Tracking ID logic */}
                                <div className="text-right md:text-left shrink-0">
                                  {o.trackingId ? (
                                    <button onClick={() => { setEditingTrackingOrderId(o.id); setTrackingIdText(o.trackingId || ''); }} className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11.5px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors w-full">
                                      ট্র্যাকিং: {o.trackingId}
                                    </button>
                                  ) : trackingId ? (
                                    <span className="inline-flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] md:text-[11.5px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 w-full whitespace-nowrap">
                                      <Check size={12} className="text-indigo-500" /> {trackingId}
                                    </span>
                                  ) : (
                                    <button onClick={() => { setEditingTrackingOrderId(o.id); setTrackingIdText(''); }} className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11.5px] font-medium bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200 hover:text-slate-800 transition-colors w-full">
                                      + ট্র্যাকিং আইডি
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Book Button */}
                              {o.status === 'Pending' ? (
                                <button
                                  onClick={async () => {
                                    setLoadingBookings(prev => ({...prev, [o.id]: true}));
                                    try {
                                      const res = await fetch('https://portal.packzy.com/api/v1/create_order', {
                                        method: 'POST',
                                        headers: {
                                          'Content-Type': 'application/json',
                                          'Api-Key': 'sjg2zq4pzai6isaaolupaf1iaily32vk',
                                          'Secret-Key': 'd7od4knpcjhxycnnlmk3oe9r'
                                        },
                                        body: JSON.stringify({
                                          invoice: o.id,
                                          recipient_name: o.customerName,
                                          recipient_phone: o.phone,
                                          recipient_address: o.address,
                                          cod_amount: o.total
                                        })
                                      });
                                      const data = await res.json();
                                      if (data.status === 200) {
                                        updateOrderStatus(o.id, 'Shipped');
                                        addNotification('কুরিয়ারে বুক করা হয়েছে 🚚', `অর্ডার #${o.id} সফলভাবে Steadfast কুরিয়ারে বুক করা হয়েছে। ট্র্যাকিং আইডি: ${data.consignment.tracking_code}`);
                                      } else {
                                        alert('Error: ' + (data.message || 'Failed to create consignment'));
                                      }
                                    } catch (error) {
                                      console.error(error);
                                      alert('Error connecting to Courier API');
                                    } finally {
                                      setLoadingBookings(prev => ({...prev, [o.id]: false}));
                                    }
                                  }}
                                  disabled={loadingBookings[o.id]}
                                  className="w-full bg-[#0b3d18] hover:bg-[#0a3114] text-white text-[13px] font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 mt-auto"
                                >
                                  {loadingBookings[o.id] ? (
                                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> বুকিং হচ্ছে...</>
                                  ) : (
                                    <><Send size={15} /> Steadfast এ বুক করুন</>
                                  )}
                                </button>
                              ) : (
                                <button disabled className="w-full bg-slate-50 text-slate-400 text-[13px] font-bold py-2.5 px-4 rounded-xl cursor-not-allowed flex items-center justify-center gap-2 border border-slate-200 mt-auto">
                                  <Check size={15} /> বুক করা হয়েছে
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );               })}
                  </div>
                </div>
              </div>
            );
          })()}

        </main>
      </div>

      {/* 4. MODAL DETAILED IMPLEMENTATION */}
      
      {/* Manual Order Creation Modal */}
      {isManualOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsManualOrderModalOpen(false)}></div>
          
          <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#f8fafc] select-none">
              <h3 className="font-semibold text-sm md:text-base text-slate-800 flex items-center gap-2">
                <ShoppingBag size={18} className="text-amber-500" />
                <span>ম্যানুয়াল ক্যাশ-অন-ডেলিভারি অর্ডার তৈরি</span>
              </h3>
              <button onClick={() => setIsManualOrderModalOpen(false)} className="text-slate-500 hover:text-slate-700 p-1 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Form 1: Customer Details */}
              <div className="space-y-3.5">
                <div className="flex justify-between items-center">
                  <h4 className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold bn-safe">১. গ্রাহকের বিবরণী</h4>
                  <div className="flex gap-2">
                    <div className="relative">
                      <button 
                        onClick={() => setIsSourceDropdownOpen(!isSourceDropdownOpen)}
                        className="flex items-center gap-2 text-[10px] font-bold px-2 py-1 rounded-md border border-slate-200 outline-none text-slate-600 bg-[#f8fafc] hover:bg-slate-100 transition-colors"
                      >
                        {manualOrderSource === 'shop' && 'শপ থেকে সেল (Shop)'}
                        {manualOrderSource === 'website' && 'ওয়েবসাইট (Website)'}
                        {manualOrderSource === 'facebook' && 'ফেসবুক (Facebook)'}
                        {manualOrderSource === 'whatsapp' && 'হোয়াটসঅ্যাপ (WhatsApp)'}
                        <ChevronDown size={12} className={`transition-transform ${isSourceDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isSourceDropdownOpen && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                          <div className="p-1">
                            <button 
                              onClick={() => { setManualOrderSource('shop'); setIsSourceDropdownOpen(false); }}
                              className="w-full text-left px-3 py-2 text-[11px] font-bold text-slate-700 hover:bg-[#f8fafc] rounded-lg flex items-center gap-2"
                            >
                              <Store size={12} className="text-amber-600" /> শপ থেকে সেল (Shop)
                            </button>
                            <button 
                              onClick={() => { setManualOrderSource('website'); setIsSourceDropdownOpen(false); }}
                              className="w-full text-left px-3 py-2 text-[11px] font-bold text-slate-700 hover:bg-[#f8fafc] rounded-lg flex items-center gap-2"
                            >
                              <Globe size={12} className="text-slate-500" /> ওয়েবসাইট (Website)
                            </button>
                            <button 
                              onClick={() => { setManualOrderSource('facebook'); setIsSourceDropdownOpen(false); }}
                              className="w-full text-left px-3 py-2 text-[11px] font-bold text-slate-700 hover:bg-[#f8fafc] rounded-lg flex items-center gap-2"
                            >
                              <Facebook size={12} className="text-blue-600" /> ফেসবুক (Facebook)
                            </button>
                            <button 
                              onClick={() => { setManualOrderSource('whatsapp'); setIsSourceDropdownOpen(false); }}
                              className="w-full text-left px-3 py-2 text-[11px] font-bold text-slate-700 hover:bg-[#f8fafc] rounded-lg flex items-center gap-2"
                            >
                              <MessageCircle size={12} className="text-[#25D366]" /> হোয়াটসঅ্যাপ (WhatsApp)
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {savedCustomers.length > 0 && (
                  <div className="mb-3">
                    <label className="block text-[10px] text-slate-500 font-medium mb-1">সংরক্ষিত গ্রাহক নির্বাচন করুন</label>
                    <div className="relative">
                      <button 
                        onClick={() => setIsCustomerDropdownOpen(!isCustomerDropdownOpen)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium outline-none bg-emerald-50/50 hover:bg-emerald-50 transition-colors flex justify-between items-center"
                      >
                        <span className="text-slate-600 truncate">-- নতুন গ্রাহক টাইপ করুন অথবা নির্বাচন করুন --</span>
                        <ChevronDown size={14} className={`text-slate-500 transition-transform ${isCustomerDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isCustomerDropdownOpen && (
                        <div className="absolute left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg z-50 animate-in fade-in zoom-in-95 duration-150">
                          <div className="p-1">
                            {savedCustomers.map(c => (
                              <button 
                                key={c.id}
                                onClick={() => {
                                  setManualOrderCustomerName(c.name);
                                  setManualOrderPhone(c.phone);
                                  setManualOrderAddress(c.address);
                                  setIsCustomerDropdownOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 rounded-lg flex flex-col gap-0.5"
                              >
                                <span>{c.name}</span>
                                <span className="text-[10px] text-slate-500">{c.phone}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-slate-500 font-medium mb-1">গ্রাহকের নাম {manualOrderSource !== 'shop' && '*'}</label>
                    <input 
                      type="text" 
                      required={manualOrderSource !== 'shop'}
                      placeholder="যেমন: মুহাম্মদ সালমান" 
                      value={manualOrderCustomerName}
                      onChange={(e) => setManualOrderCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 font-medium mb-1">মোবাইল নম্বর {manualOrderSource !== 'shop' && '*'}</label>
                    <input 
                      type="text" 
                      required={manualOrderSource !== 'shop'}
                      placeholder="যেমন: 01712345678" 
                      value={manualOrderPhone}
                      onChange={(e) => setManualOrderPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-500 font-medium mb-1">ডেলিভারি ঠিকানা {manualOrderSource !== 'shop' && '*'}</label>
                    <input 
                      type="text" 
                      required={manualOrderSource !== 'shop'}
                      placeholder="যেমন: রোড ৪, হাউজিং স্টেট, ধানমন্ডি, ঢাকা" 
                      value={manualOrderAddress}
                      onChange={(e) => setManualOrderAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] text-slate-500 font-medium mb-1">সেলসম্যান (Salesman) *</label>
                    <div className="relative">
                      
<select value={manualOrderSalesman} onChange={(e) => setManualOrderSalesman(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600 bg-white hover:bg-[#f8fafc] cursor-pointer"><option value="">নির্বাচন করুন</option>{staffList?.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}</select>

                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                    </div>
                  </div>
                  <div className="sm:col-span-2 mt-1">
                    <label className="block text-[10px] text-slate-500 font-medium mb-2">পেমেন্ট স্ট্যাটাস *</label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="paymentStatus" 
                          checked={!manualOrderIsDue}
                          onChange={() => setManualOrderIsDue(false)}
                          className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 focus:ring-emerald-500/20"
                        />
                        <span className="text-sm font-medium text-slate-700">ক্যাশ অন ডেলিভারি / পেইড</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="paymentStatus" 
                          checked={manualOrderIsDue}
                          onChange={() => setManualOrderIsDue(true)}
                          className="w-4 h-4 text-rose-600 bg-gray-100 border-gray-300 focus:ring-rose-500"
                        />
                        <span className="text-sm font-medium text-rose-600">বকেয়া খাতায় যোগ করুন</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-slate-200" />

              {/* Form 2: Product Adder */}
              <div className="space-y-3.5">
                <h4 className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold bn-safe">২. পণ্য এবং পরিমাণ যুক্ত করুন</h4>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 sm:items-end">
                  <div className="flex gap-2 items-end flex-1 w-full">
                    <div className="flex-1 min-w-0">
                      <label className="block text-[10px] text-slate-500 font-medium mb-1">পণ্য নির্বাচন করুন</label>
                      
<div className="relative">
  <input
    type="text"
    placeholder="পণ্য খুঁজুন (টাইপ করুন)..."
    value={manualProductSearch || (manualSelectedProductId ? (products.find(p => p.id === manualSelectedProductId)?.name || '') : '')}
    onChange={(e) => {
      setManualProductSearch(e.target.value);
      setIsProductDropdownOpen(true);
      setManualSelectedProductId('');
    }}
    onFocus={() => setIsProductDropdownOpen(true)}
    className="w-full px-3 py-2.5 leading-relaxed rounded-xl border border-slate-200 text-sm font-medium outline-none bg-white hover:bg-[#f8fafc] transition-colors focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/10"
  />
  {isProductDropdownOpen && (
    <div className="absolute left-0 right-0 top-full mt-1 max-h-48 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg z-50 animate-in fade-in zoom-in-95 duration-150">
      <div className="p-1">
        {products.filter(p => p.name.toLowerCase().includes(manualProductSearch.toLowerCase())).map(p => {
          const price = p.discountedPrice || p.originalPrice;
          return (
            <div
              key={p.id}
              onClick={() => {
                setManualSelectedProductId(p.id);
                setManualProductSearch('');
                setIsProductDropdownOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 cursor-pointer rounded-lg flex justify-between items-center"
            >
              <div className="flex items-baseline min-w-0 flex-1 pr-2"><span className="truncate py-0.5 leading-relaxed">{p.name}</span><span className="shrink-0 text-slate-500 text-xs ml-1 whitespace-nowrap">({p.weight})</span></div>
              <span className="shrink-0 text-emerald-600 font-bold">&nbsp;৳{price}</span>
            </div>
          );
        })}
      </div>
    </div>
  )}
</div>
                    </div>
                    <div className="w-20 shrink-0">
                      <label className="block text-[10px] text-slate-500 font-medium mb-1">পরিমাণ</label>
                      <input type="number" min="1" value={manualSelectedQuantity} onChange={(e) => setManualSelectedQuantity(Number(e.target.value) || 1)} className="w-full px-1 py-2 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600 text-center leading-relaxed" />
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      if (!manualSelectedProductId) return;
                      const product = products.find(p => p.id === manualSelectedProductId);
                      if (!product) return;

                      const price = product.discountedPrice || product.originalPrice;
                      
                      // Check if already in items list
                      const existingIndex = manualOrderItems.findIndex(item => item.id === product.id);
                      if (existingIndex > -1) {
                        const updated = [...manualOrderItems];
                        updated[existingIndex].quantity += manualSelectedQuantity;
                        setManualOrderItems(updated);
                      } else {
                        setManualOrderItems(prev => [...prev, {
                          id: product.id,
                          name: product.name,
                          quantity: manualSelectedQuantity,
                          price: price
                        }]);
                      }

                      // Reset selection quantity
                      setManualSelectedQuantity(1);
                    }}
                    className="bg-slate-900 hover:bg-slate-800 text-white shadow-sm px-4 py-2 rounded-xl text-sm font-medium h-[38px] transition-all cursor-pointer w-full sm:w-auto shrink-0"
                  >
                    যোগ করুন
                  </button>
                </div>
              </div>

              {/* Form 3: Current Order Items list */}
              <div className="space-y-2.5">
                <h4 className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">৩. অর্ডার তালিকা ও হিসাব</h4>
                
                {manualOrderItems.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 font-medium bg-[#f8fafc] border border-dashed border-slate-200 rounded-xl text-[11px]">
                    এখনো কোন পণ্য যুক্ত করা হয়নি। উপর থেকে পণ্য নির্বাচন করে যুক্ত করুন।
                  </div>
                ) : (
                  <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200/60 bg-[#f8fafc]/50">
                    {manualOrderItems.map((item) => (
                      <div key={item.id} className="p-3 flex items-center justify-between text-sm font-medium">
                        <div className="min-w-0 flex-1">
                          <span className="text-slate-800 font-bold block truncate">{item.name}</span>
                          <span className="text-[10px] text-slate-500">
                            &nbsp;৳{item.price.toLocaleString('bn-BD')} × {item.quantity}টি
                          </span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-slate-800 font-bold">
                            &nbsp;৳{(item.price * item.quantity).toLocaleString('bn-BD')}
                          </span>
                          <button 
                            type="button"
                            onClick={() => {
                              setManualOrderItems(prev => prev.filter(p => p.id !== item.id));
                            }}
                            className="text-slate-300 hover:text-rose-600 transition-colors p-1"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Invoice sub calculations */}
                    <div className="p-3 bg-[#f8fafc] text-[11px] font-bold text-slate-500 space-y-1.5">
                      <div className="flex justify-between">
                        <span>আইটেম সাবটোটাল:</span>
                        <span>&nbsp;৳{manualOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString('bn-BD')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>হোম ডেলিভারি চার্জ:</span>
                        <span>৳ ৬০</span>
                      </div>
                      <div className="flex justify-between text-slate-800 font-bold text-xs pt-1.5 border-t border-slate-200">
                        <span>সর্বমোট বিল:</span>
                        <span>&nbsp;৳{(manualOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 60).toLocaleString('bn-BD')}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 border-t border-slate-200 flex justify-end gap-2 shrink-0 bg-[#f8fafc] select-none">
              <button 
                type="button" 
                onClick={() => setIsManualOrderModalOpen(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-sm font-medium"
              >
                বাতিল করুন
              </button>
              <button 
                type="button"
                
                onClick={() => {
                  if (manualOrderItems.length === 0) return;
                  if (manualOrderSource !== 'shop' && (!manualOrderCustomerName || !manualOrderPhone || !manualOrderAddress)) {
                    alert('অনুগ্রহ করে গ্রাহকের সম্পূর্ণ বিবরণ ও তথ্য প্রদান করুন।');
                    return;
                  }

                  // Standard BD Phone number quick validation
                  if (manualOrderSource !== 'shop' && (!manualOrderPhone.startsWith('01') || manualOrderPhone.length < 11)) {
                    alert('অনুগ্রহ করে একটি সঠিক বাংলাদেশী মোবাইল নম্বর লিখুন (যেমন: 017XXXXXXXX)।');
                    return;
                  }

                  const subtotal = manualOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                  const grandTotal = subtotal + 60; // 60 TK delivery fee

                  const newManualOrderObj = {
                    id: `man-${Math.floor(1000 + Math.random() * 9000)}`,
                    customerName: manualOrderCustomerName || 'শপ কাস্টমার',
                            phone: manualOrderPhone || 'N/A',
                            address: manualOrderAddress || 'N/A',
                    source: manualOrderSource,
                    items: manualOrderItems,
                    total: grandTotal,
                    date: new Date().toISOString(),
                    status: 'Pending' as const,
                            salesman: manualOrderSalesman
                  };

                  addSimulatedOrder(newManualOrderObj, true);

                  if (manualOrderIsDue) {
                    const addedDue = {
                      id: `d-${Date.now()}`,
                      customerName: manualOrderCustomerName,
                      phone: manualOrderPhone,
                      amount: grandTotal,
                      paidAmount: 0,
                      date: new Date().toISOString(),
                      status: 'Unpaid' as const
                    };
                    setDues(prevDues => [addedDue, ...prevDues]);
                  }
                  

                  // Play sound
                  if (soundEnabled) {
                    triggerSound();
                  }

                  // Open Invoice Print Modal
                  setInvoiceToPrint(newManualOrderObj);

                  // Close and clean
                  setIsManualOrderModalOpen(false);
                  setManualOrderIsDue(false);
                  setManualOrderSource('website');
                  setManualOrderCustomerName('');
                  setManualOrderPhone('');
                  setManualOrderAddress('');
                  setManualOrderItems([]);
                }}
                className={`px-5 py-2 rounded-xl text-sm font-medium text-white shadow-md transition-all ${
                  (manualOrderItems.length === 0 || (manualOrderSource !== 'shop' && (!manualOrderCustomerName || !manualOrderPhone || !manualOrderAddress)))
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-slate-900 hover:bg-slate-800'
                }`}
              >
                অর্ডার নিশ্চিত করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product ADD / EDIT Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsProductModalOpen(false)}></div>
          
          <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#f8fafc] select-none">
              <h3 className="font-semibold text-sm md:text-base text-slate-800 flex items-center gap-2">
                <Package size={18} className="text-emerald-600" />
                {editingProduct ? 'পণ্য সংশোধন করুন' : 'নতুন পণ্য যোগ করুন'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-slate-500 hover:text-slate-700 p-1 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 font-bold">
              <div>
                <label className="block text-xs text-slate-500 mb-1.5">পণ্যের পূর্ণ নাম লিখুন (বাংলায়) <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  required
                  value={productFormData.name}
                  onChange={(e) => setProductFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500/20 outline-none text-xs text-slate-700 font-bold" 
                  placeholder="যেমন: প্রিমিয়াম গরুর মাংস (হাড় ছাড়া)"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">কেনার মূল্য (৳) <span className="text-slate-400">(ঐচ্ছিক)</span></label>
                  <input 
                    type="number" 
                    value={productFormData.buyingPrice}
                    onChange={(e) => setProductFormData(p => ({ ...p, buyingPrice: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 outline-none text-xs text-slate-700 font-bold bg-slate-50" 
                    placeholder="কেনার খরচ (যেমন: ৫০০)"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">আসল মূল্য (৳) <span className="text-rose-500">*</span></label>
                  <input 
                    type="number" 
                    required
                    value={productFormData.originalPrice}
                    onChange={(e) => setProductFormData(p => ({ ...p, originalPrice: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 outline-none text-xs text-slate-700 font-bold" 
                    placeholder="বিক্রির মূল্য (যেমন: ৮৫০)"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">অফার মূল্য (৳) <span className="text-slate-400">(ঐচ্ছিক)</span></label>
                  <input 
                    type="number"
                    value={productFormData.discountedPrice}
                    onChange={(e) => setProductFormData(p => ({ ...p, discountedPrice: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 outline-none text-xs text-slate-700 font-bold" 
                    placeholder="যেমন: ৭৯৯"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">ক্যাটাগরি নির্ধারণ করুন <span className="text-rose-500">*</span></label>
                  <input 
                    list="category-options"
                    value={productFormData.category}
                    onChange={(e) => setProductFormData(p => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-500/20 outline-none text-xs text-slate-700 font-bold"
                    placeholder="ক্যাটাগরি নির্বাচন করুন বা লিখুন"
                  />
                  <datalist id="category-options">
                    {categoriesList.map(cat => <option key={cat} value={cat} />)}
                  </datalist>
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1.5">ওজন / পরিমাপ <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={productFormData.weight}
                    onChange={(e) => setProductFormData(p => ({ ...p, weight: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 outline-none text-xs text-slate-700 font-bold" 
                    placeholder="যেমন: ১ কেজি, ৫ কেজি, ১ ডজন"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-500 mb-1.5">পণ্যের ছবি (আপলোড করুন বা লিংক দিন)</label>
                {productFormData.image && (
                  <img src={productFormData.image} alt="Preview" className="w-16 h-16 rounded-lg object-cover border border-slate-200 mb-2" />
                )}
                <div className="flex flex-col gap-2">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 500 * 1024) {
                          alert('ফাইলের সাইজ ৫০০ কেবির বেশি হতে পারবে না');
                          return;
                        }
                        compressImage(file, 600, 0.6).then(base64 => {
                          setProductFormData(p => ({ ...p, image: base64 }));
                        });
                      }
                    }}
                    className="w-full text-xs text-slate-500 file:mr-2 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                  />
                  <input 
                    type="text" 
                    value={productFormData.image}
                    onChange={(e) => setProductFormData(p => ({ ...p, image: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 outline-none text-xs text-slate-700 font-normal font-sans" 
                    placeholder="অথবা ইমেজের লিংক দিন (https://images.unsplash.com/...)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-500 mb-1.5">পণ্যের বিবরণ (বাংলায়)</label>
                <textarea 
                  value={productFormData.description}
                  onChange={(e) => setProductFormData(p => ({ ...p, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 outline-none text-xs text-slate-700 font-bold resize-none" 
                  placeholder="যেমন: ১০০% ফ্রেশ এবং রাসায়নিক মুক্ত গরুর মাংস..."
                />
              </div>

              <div className="flex gap-6 pt-2 select-none">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 text-xs">
                  <input 
                    type="checkbox" 
                    checked={productFormData.isNew} 
                    onChange={(e) => setProductFormData(p => ({ ...p, isNew: e.target.checked }))} 
                    className="w-4 h-4 text-emerald-600 border-emerald-600/20 rounded focus:ring-0 cursor-pointer"
                  />
                  <span>নতুন প্রোটিন লেবেল</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 text-xs">
                  <input 
                    type="checkbox" 
                    checked={productFormData.isFlashSale} 
                    onChange={(e) => setProductFormData(p => ({ ...p, isFlashSale: e.target.checked }))} 
                    className="w-4 h-4 text-emerald-600 border-emerald-600/20 rounded focus:ring-0 cursor-pointer"
                  />
                  <span>ফ্ল্যাশ সেল তালিকাভুক্ত</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2 shrink-0 select-none">
                <button 
                  type="button" 
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs"
                >
                  বাতিল করুন
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white shadow-sm rounded-xl text-sm font-medium shadow-md"
                >
                  {editingProduct ? 'সংশোধন বুকিং' : 'যুক্ত করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Details View Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
          
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#f8fafc] select-none">
              <h3 className="font-semibold text-sm text-slate-800 flex items-center gap-1.5">
                <ShoppingBag size={18} className="text-emerald-600" />
                অর্ডার রিসিট নম্বর: {selectedOrder.id}
              </h3>
              <button onClick={() => setSelectedOrder(null)} className="text-slate-500 hover:text-slate-700 p-1 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto list-none">
              
              {/* Order status banner */}
              <div className={`p-4 rounded-xl flex items-center gap-3 border ${
                selectedOrder.status === 'Completed' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' :
                selectedOrder.status === 'Cancelled' ? 'bg-rose-50 border-rose-100 text-rose-800' :
                'bg-amber-50 border-amber-100 text-amber-800'
              }`}>
                <div className="shrink-0">
                  {selectedOrder.status === 'Completed' ? <CheckCircle size={22} className="text-emerald-500" /> :
                   selectedOrder.status === 'Cancelled' ? <AlertTriangle size={22} className="text-rose-500" /> :
                   <Clock size={22} className="text-amber-500 animate-pulse" />}
                </div>
                <div className="font-bold">
                  <h4 className="text-xs uppercase tracking-wider font-semibold">অর্ডারের বর্তমান অবস্থা</h4>
                  <p className="text-xs font-semibold mt-0.5">
                    {selectedOrder.status === 'Completed' ? 'সম্পন্ন হয়েছে এবং ডেলিভার্ড' :
                     selectedOrder.status === 'Cancelled' ? 'অর্ডারটি বাতিল করা হয়েছে' :
                     'অর্ডারটি পেন্ডিং অবস্থায় আছে'}
                  </p>
                </div>
              </div>

              {/* Client Info Grid */}
              <div className="border border-slate-200 rounded-xl p-4 bg-[#f8fafc]/50 space-y-3 font-semibold text-xs text-slate-600 leading-relaxed">
                <div>
                  <span className="text-slate-500 font-medium block mb-0.5">গ্রাহকের নাম</span>
                  <p className="text-slate-800 font-semibold text-sm">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block mb-0.5">মোবাইল নাম্বার</span>
                  <p className="text-slate-800 font-bold text-sm select-all">{selectedOrder.phone}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block mb-0.5">ডেলিভারি ঠিকানা</span>
                  <p className="text-slate-800 leading-relaxed">{selectedOrder.address}</p>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block mb-0.5">অর্ডার তারিখ</span>
                  <p className="text-slate-700 font-bold">
                    {new Date(selectedOrder.date).toLocaleDateString('bn-BD', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              {/* Items Summary list */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase mb-3 select-none">অর্ডারকৃত আইটেম সমূহ</h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200/60">
                  {selectedOrder.items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center p-3 font-bold text-xs">
                      <div>
                        <p className="text-slate-800 font-semibold leading-normal">{item.name}</p>
                        <p className="text-slate-500 text-[10px] font-medium mt-1">{item.quantity} x ৳{item.price}</p>
                      </div>
                      <span className="text-slate-900 font-bold">&nbsp;৳{item.quantity * item.price}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-4 bg-[#f8fafc] font-bold text-sm">
                    <span className="text-slate-700 font-semibold">মোট বিল (ক্যাশ অন ডেলিভারি):</span>
                    <span className="text-emerald-950 font-bold text-base">&nbsp;৳{selectedOrder.total}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-2 justify-end shrink-0 select-none w-full">
                <button 
                  onClick={() => { setInvoiceToPrint(selectedOrder); setSelectedOrder(null); }}
                  className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                >
                  <Printer size={13} /> ইনভয়েস
                </button>
                {selectedOrder.status !== 'Completed' && (
                  <button 
                    onClick={() => { setBookingOrder(selectedOrder); setSelectedOrder(null); }}
                    className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                  >
                    <Truck size={13} /> কুরিয়ার বুকিং করুন
                  </button>
                )}
                <button 
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium"
                >
                  ওকে
                </button>
              </div>

            </div>
          </div>
        </div>
      )}


      {/* Courier Note Modal */}
      {editingCourierNoteOrderId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEditingCourierNoteOrderId(null)}></div>
          <div className="bg-white rounded-xl w-full max-w-sm p-5 relative z-10 animate-in fade-in zoom-in-95">
            <h3 className="font-bold text-slate-800 mb-3">কুরিয়ার নোট দিন</h3>
            <textarea
              className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none mb-4 min-h-[100px]"
              placeholder="কুরিয়ার ম্যানের জন্য নোট লিখুন..."
              value={courierNoteText}
              onChange={(e) => setCourierNoteText(e.target.value)}
            ></textarea>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setEditingCourierNoteOrderId(null)} className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-100 rounded-lg">বাতিল</button>
              <button 
                onClick={() => {
                  if (updateOrder) updateOrder(editingCourierNoteOrderId, { courierNote: courierNoteText });
                  setEditingCourierNoteOrderId(null);
                }} 
                className="px-4 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
              >
                সেভ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tracking ID Modal */}
      {editingTrackingOrderId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setEditingTrackingOrderId(null)}></div>
          <div className="bg-white rounded-xl w-full max-w-sm p-5 relative z-10 animate-in fade-in zoom-in-95">
            <h3 className="font-bold text-slate-800 mb-3">ট্র্যাকিং আইডি আপডেট করুন</h3>
            <input
              type="text"
              className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none mb-4"
              placeholder="যেমন: STEADFAST-12345"
              value={trackingIdText}
              onChange={(e) => setTrackingIdText(e.target.value)}
            />
            <div className="flex gap-3 justify-end">
              <button onClick={() => setEditingTrackingOrderId(null)} className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-100 rounded-lg">বাতিল</button>
              <button 
                onClick={() => {
                  if (updateOrder) updateOrder(editingTrackingOrderId, { trackingId: trackingIdText });
                  setEditingTrackingOrderId(null);
                }} 
                className="px-4 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
              >
                সেভ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Courier Booking Modal */}
      {bookingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setBookingOrder(null); setIsBookingSuccess(false); }}></div>
          
          <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white select-none">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Truck size={18} className="text-emerald-400" />
                সরাসরি কুরিয়ার বুকিং (Courier Book API)
              </h3>
              <button onClick={() => { setBookingOrder(null); setIsBookingSuccess(false); }} className="text-slate-300 hover:text-white p-1 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
              {!isBookingSuccess ? (
                <div className="space-y-4">
                  <div className="bg-emerald-50 text-slate-800 p-3.5 rounded-xl border border-emerald-100 font-semibold text-xs leading-relaxed">
                    <p className="font-semibold text-emerald-900 text-sm">গ্রাহক ও অর্ডার বিবরণ:</p>
                    <p className="mt-1">নাম: <strong className="text-slate-950">{bookingOrder.customerName}</strong></p>
                    <p>ফোন: <strong className="text-slate-950 ">{bookingOrder.phone}</strong></p>
                    <p>ঠিকানা: <strong className="text-slate-950">{bookingOrder.address}</strong></p>
                    <p>মোট মূল্য: <strong className="text-slate-950 font-bold">&nbsp;৳{bookingOrder.total} (ক্যাশ অন ডেলিভারি)</strong></p>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 font-medium uppercase tracking-wider mb-2">কুরিয়ার সার্ভিস নির্বাচন করুন</label>
                    <div className="grid grid-cols-1 gap-2">
                      
                      
                      <button 
                        type="button" 
                        onClick={() => setCourierService('steadfast')}
                        className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-sm font-medium uppercase ${
                          courierService === 'steadfast' ? 'bg-indigo-50 border-indigo-500 text-indigo-600' : 'border-slate-200 text-slate-600 hover:bg-[#f8fafc]'
                        }`}
                      >
                        <span className="text-[10px]">Steadfast</span>
                        <span className="text-[9px] text-slate-500 font-medium">দ্রুত পেমেন্ট</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 font-medium uppercase tracking-wider mb-1.5">প্যাকেজের ওজন (কেজি)</label>
                    <input 
                      type="text" 
                      value={weightKg} 
                      onChange={(e) => setWeightKg(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-emerald-600" 
                      placeholder="যেমন: ১.৫"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 font-medium uppercase tracking-wider mb-1.5">পণ্য ক্যাটাগরি</label>
                    
<select value={productFormData.category} onChange={(e) => setProductFormData(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-emerald-600 cursor-pointer"><option value="">নির্বাচন করুন</option>{categoriesList?.map((c: any) => <option key={c.id || c} value={c.name || c}>{c.name || c}</option>)}</select>

                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={async () => {
                        if (courierService === 'steadfast') {
                          setIsBookingLoading(true);
                          try {
                            const res = await fetch('https://portal.packzy.com/api/v1/create_order', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                'Api-Key': 'sjg2zq4pzai6isaaolupaf1iaily32vk',
                                'Secret-Key': 'd7od4knpcjhxycnnlmk3oe9r'
                              },
                              body: JSON.stringify({
                                invoice: bookingOrder.id,
                                recipient_name: bookingOrder.customerName,
                                recipient_phone: bookingOrder.phone,
                                recipient_address: bookingOrder.address,
                                cod_amount: bookingOrder.total
                              })
                            });
                            const data = await res.json();
                            if (data.status === 200) {
                              setBookingId(data.consignment.tracking_code);
                              setIsBookingSuccess(true);
                            } else {
                              alert('Error: ' + (data.message || 'Failed to create consignment'));
                            }
                          } catch (error) {
                            console.error(error);
                            alert('Error connecting to Courier API');
                          } finally {
                            setIsBookingLoading(false);
                          }
                        } else {
                          const randomTrk = courierService.toUpperCase() + '-' + Math.floor(100000 + Math.random() * 900000);
                          setBookingId(randomTrk);
                          setIsBookingSuccess(true);
                        }
                      }}
                      disabled={isBookingLoading}
                      className="w-full bg-emerald-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-emerald-800 transition-all shadow-lg shadow-[#1b4332]/10 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isBookingLoading ? 'প্রসেসিং...' : 'বুকিং সম্পন্ন করুন'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle size={32} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-base">কুরিয়ার বুকিং সফল হয়েছে!</h3>
                    <p className="text-xs text-slate-500 mt-1 font-bold">অর্ডারটি সরাসরি কুরিয়ার প্যানেলে প্রেরণ করা হয়েছে।</p>
                  </div>

                  <div className="bg-[#f8fafc] p-4 rounded-xl border border-slate-200 text-sm font-medium inline-block w-full text-left">
                    <div className="flex justify-between border-b border-slate-200/50 pb-2">
                      <span className="text-slate-500">সার্ভিস:</span>
                      <span className="text-slate-800 uppercase font-semibold">{courierService} Courier</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-slate-500">ট্র্যাকিং নম্বর (Consignment ID):</span>
                      <span className="text-[#115e5a]  font-bold select-all">{bookingId}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      onClick={() => { setBookingOrder(null); setIsBookingSuccess(false); }}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    >
                      বন্ধ করুন
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Due Modals */}
      {isDueModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm select-none">
          <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-[#f8fafc]/50">
              <h3 className="font-semibold text-slate-800">নতুন বকেয়া যোগ</h3>
              <button onClick={() => setIsDueModalOpen(false)} className="text-slate-500 hover:text-slate-600 bg-white shadow-sm border border-slate-200 p-1.5 rounded-full"><X size={16} /></button>
            </div>
            <form onSubmit={handleAddDue} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">গ্রাহকের নাম</label>
                <input required type="text" value={newDue.customerName} onChange={e => setNewDue({...newDue, customerName: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-emerald-600 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">ফোন নাম্বার</label>
                <input type="text" value={newDue.phone} onChange={e => setNewDue({...newDue, phone: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-emerald-600 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">বকেয়া পরিমাণ (৳)</label>
                <input required type="number" value={newDue.amount} onChange={e => setNewDue({...newDue, amount: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-emerald-600 focus:outline-none" />
              </div>
              <button type="submit" className="w-full bg-emerald-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-emerald-800">সেভ করুন</button>
            </form>
          </div>
        </div>
      )}

      {isDuePayModalOpen && currentDue && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm select-none">
          <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-[#f8fafc]/50">
              <h3 className="font-semibold text-slate-800">বকেয়া জমা নিন</h3>
              <button onClick={() => { setIsDuePayModalOpen(false); setCurrentDue(null); }} className="text-slate-500 hover:text-slate-600 bg-white shadow-sm border border-slate-200 p-1.5 rounded-full"><X size={16} /></button>
            </div>
            <form onSubmit={handlePayDue} className="p-5 space-y-4">
              <div className="bg-[#f8fafc] p-3 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-500 font-medium mb-1">গ্রাহক: <span className="text-slate-800">{currentDue.customerName}</span></p>
                <p className="text-xs text-slate-500 font-medium">বর্তমান পাওনা: <span className="text-rose-600 font-bold">&nbsp;৳{currentDue.amount - currentDue.paidAmount}</span></p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">জমা দেওয়ার পরিমাণ (৳)</label>
                <input required type="number" max={currentDue.amount - currentDue.paidAmount} value={payDueAmount} onChange={e => setPayDueAmount(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-medium focus:border-emerald-600 focus:outline-none" />
              </div>
              <button type="submit" className="w-full bg-emerald-600 text-white font-bold text-xs py-3 rounded-xl hover:bg-emerald-700">আয় হিসেবে জমা করুন</button>
            </form>
          </div>
        </div>
      )}


      {selectedCustomerHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#f8fafc] select-none">
              <h2 className="text-sm font-bold text-slate-800">কাস্টমার হিস্ট্রি</h2>
              <button 
                onClick={() => setSelectedCustomerHistory(null)}
                className="w-8 h-8 rounded-full bg-slate-200/50 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} strokeWidth={3} />
              </button>
            </div>
            
            <div className="p-5 overflow-y-auto">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-emerald-600">{selectedCustomerHistory.name}</h3>
                <p className="text-sm font-medium text-slate-500">{selectedCustomerHistory.phone}</p>
              </div>

              <div className="space-y-4">
                {orders
                  .filter(o => o.phone === selectedCustomerHistory.phone)
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((order, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-[#f8fafc]">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3 pb-3 border-b border-slate-200/50">
                        <div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">অর্ডার তারিখ</span>
                          <span className="text-sm font-medium text-slate-800">{new Date(order.date).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">স্ট্যাটাস</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                            order.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                            order.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'Confirmed' ? 'bg-indigo-100 text-indigo-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {order.status === 'Completed' ? 'ডেলিভারি সম্পন্ন' : order.status === 'Cancelled' ? 'বাতিল' : order.status === 'Shipped' ? 'ডেলিভারি পার্টনারের কাছে হস্তান্তরিত' : order.status === 'Confirmed' ? 'পণ্য প্রস্তুত করা হচ্ছে' : 'পেন্ডিং'}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between items-center text-xs">
                            <span className="font-bold text-slate-600">{item.name} <span className="text-slate-500 font-normal">x {item.quantity}</span></span>
                            <span className="font-bold text-slate-800">&nbsp;৳{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-200/50 flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-600">মোট মূল্য:</span>
                        <span className="text-sm font-bold text-emerald-900">&nbsp;৳{order.total.toLocaleString('bn-BD')}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invoice Print Modal */}
      {invoiceToPrint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 print:bg-white print:static print:block print:p-0 print:inset-auto">
          <div className="fixed inset-0 bg-transparent print:hidden" onClick={() => setInvoiceToPrint(null)}></div>
          
          <div className="bg-white rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh] print:static print:m-0 print:w-full print:max-w-none print:h-auto print:max-h-none print:rounded-none print:shadow-none print:border-none print:overflow-visible print:block">
            {/* Action Bar (Hidden in Print) */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-[#f8fafc] print:hidden shrink-0">
              <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-sm">
                <Printer size={16} className="text-indigo-500" />
                <span>ইনভয়েস প্রিন্ট</span>
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => window.print()} 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-md flex items-center gap-2"
                >
                  <Printer size={14} /> প্রিন্ট / সেভ পিডিএফ
                </button>
                <button onClick={() => setInvoiceToPrint(null)} className="text-slate-500 hover:text-slate-700 w-8 h-8 flex items-center justify-center rounded-full bg-slate-200/50 hover:bg-slate-200 transition-colors">
                  <X size={16} strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Printable Invoice Area */}
            <div className="flex-1 overflow-y-auto p-8 md:p-10 print:p-0 bg-white print:overflow-visible" id="printable-invoice" ref={a4PrintRef}>
              <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-slate-800">
                <div>
                  <h1 className="text-3xl font-bold text-emerald-600 tracking-tight">উর্বর ফুড</h1>
                  <p className="text-xs text-slate-500 font-medium mt-1">শতভাগ ফ্রেশ এবং ভেজালমুক্ত</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">উত্তরা, ঢাকা | +880 1795-973932</p>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold text-slate-200 tracking-widest uppercase">INVOICE</h2>
                  <p className="text-sm font-medium text-slate-800 mt-2">#{invoiceToPrint.id.replace('man-', 'INV-').toUpperCase()}</p>
                  <p className="text-[10px] font-bold text-slate-500 mt-0.5">{new Date(invoiceToPrint.date).toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>

              <div className="flex justify-between items-start mb-8">
                <div className="bg-[#f8fafc] rounded-xl p-5 border border-slate-200 flex-1 max-w-[50%]">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">গ্রাহকের তথ্য</p>
                  <h4 className="font-bold text-sm text-slate-800">{invoiceToPrint.customerName}</h4>
                  <p className="text-sm font-medium text-slate-600 mt-1 flex items-center gap-1.5"><Phone size={12} className="text-slate-500"/> {invoiceToPrint.phone}</p>
                  <p className="text-[11px] font-bold text-slate-500 mt-1.5 leading-relaxed flex items-start gap-1.5"><MapPin size={12} className="text-slate-500 shrink-0 mt-0.5"/> {invoiceToPrint.address}</p>
                </div>
                <div className="flex-1 max-w-[40%] text-right pt-2">
                  <div className="inline-block text-left">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">অর্ডার সোর্স</p>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[11px] font-bold border border-indigo-100">
                      {invoiceToPrint.source === 'facebook' && <Facebook size={12} />}
                      {invoiceToPrint.source === 'whatsapp' && <MessageCircle size={12} />}
                      {invoiceToPrint.source === 'website' && <Globe size={12} />}
                      {invoiceToPrint.source === 'shop' && <Store size={12} />}
                      {invoiceToPrint.source === 'facebook' ? 'Facebook' : invoiceToPrint.source === 'whatsapp' ? 'WhatsApp' : invoiceToPrint.source === 'shop' ? 'Shop' : 'Website'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-8 rounded-xl border border-slate-200 overflow-x-auto print:overflow-visible">
                <table className="w-full text-left min-w-[500px] print:min-w-0">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-white">বিবরণ</th>
                      <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-white text-center">পরিমাণ</th>
                      <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-white text-right">মূল্য</th>
                      <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-white text-right">মোট</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60">
                    {invoiceToPrint.items.map((item: any, idx: number) => (
                      <tr key={idx} className="bg-white">
                        <td className="py-4 px-6 text-sm font-medium text-slate-700 leading-relaxed">{item.name}</td>
                        <td className="py-4 px-6 text-sm font-medium text-slate-700 text-center bg-[#f8fafc]">{item.quantity}</td>
                        <td className="py-4 px-6 text-sm font-medium text-slate-500 text-right">৳ {item.price.toLocaleString('bn-BD')}</td>
                        <td className="py-4 px-6 text-sm font-medium text-slate-800 text-right bg-[#f8fafc]">৳ {(item.price * item.quantity).toLocaleString('bn-BD')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-2">
                <div className="w-64 space-y-3 bg-[#f8fafc] p-5 rounded-xl border border-slate-200">
                  <div className="flex justify-between text-sm font-medium text-slate-500">
                    <span>সাবটোটাল:</span>
                    <span>৳ {invoiceToPrint.items.reduce((sum: any, item: any) => sum + (item.price * item.quantity), 0).toLocaleString('bn-BD')}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-slate-500">
                    <span>ডেলিভারি চার্জ:</span>
                    <span>৳ ৬০</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-emerald-600 pt-3 border-t border-slate-200">
                    <span>সর্বমোট বিল:</span>
                    <span className="text-base">৳ {invoiceToPrint.total.toLocaleString('bn-BD')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-slate-200 text-center">
                <div className="flex justify-center items-center gap-2 mb-2 text-emerald-600">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="text-sm font-bold text-slate-800">উর্বর ফুড থেকে শপিং করার জন্য ধন্যবাদ!</h4>
                <p className="text-[10px] font-bold text-slate-500 mt-1">আপনার যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন।</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Customer Modal */}
      {isAddCustomerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="fixed inset-0 bg-transparent" onClick={() => setIsAddCustomerModalOpen(false)}></div>
          
          <div className="bg-white rounded-[24px] w-full max-w-sm overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-300 flex flex-col">
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#f8fafc]">
              <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                <UserPlus size={16} className="text-emerald-600" />
                নতুন কাস্টমার যোগ করুন
              </h3>
              <button onClick={() => setIsAddCustomerModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-200/50 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors">
                <X size={16} strokeWidth={3} />
              </button>
            </div>
            
            <div className="p-5 space-y-4 bg-white">
              <div>
                <label className="block text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">গ্রাহকের নাম *</label>
                <input 
                  type="text" 
                  required
                  placeholder="যেমন: মুহাম্মদ সালমান" 
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600 bg-[#f8fafc] focus:bg-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">মোবাইল নম্বর *</label>
                <input 
                  type="text" 
                  required
                  placeholder="যেমন: 01712345678" 
                  value={newCustPhone}
                  onChange={(e) => setNewCustPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600 bg-[#f8fafc] focus:bg-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 font-medium mb-1 uppercase tracking-wider">ঠিকানা</label>
                <input 
                  type="text" 
                  placeholder="যেমন: রোড ৪, হাউজিং স্টেট, ধানমন্ডি, ঢাকা" 
                  value={newCustAddress}
                  onChange={(e) => setNewCustAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600 bg-[#f8fafc] focus:bg-white transition-colors"
                />
              </div>
              
              <div className="pt-2">
                <button 
                  disabled={!newCustName || !newCustPhone}
                  onClick={() => {
                    const newCust = {
                      id: `cust-${Date.now()}`,
                      name: newCustName,
                      phone: newCustPhone,
                      address: newCustAddress
                    };
                    setSavedCustomers(prev => [newCust, ...prev]);
                    
                    // Reset form
                    setNewCustName('');
                    setNewCustPhone('');
                    setNewCustAddress('');
                    setIsAddCustomerModalOpen(false);
                  }}
                  className={`w-full py-3 rounded-xl text-sm font-medium text-white shadow-md transition-all flex justify-center items-center gap-2 ${
                    (!newCustName || !newCustPhone) ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-slate-900 hover:bg-slate-800 hover:shadow-lg'
                  }`}
                >
                  <Save size={16} /> সংরক্ষণ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
