import React, { useState, useEffect } from 'react';
import { Users, Plus, CheckCircle2, XCircle, Trash2, Calendar as CalendarIcon, DollarSign, Save } from 'lucide-react';
import { safeGetItem, safeSetItem, safeRemoveItem } from '../../utils/storage';
import { db } from '../../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';


interface StaffMember {
  id: string;
  name: string;
  role: string;
  baseSalary: number;
  username?: string;
  password?: string;
}

interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  staffId: string;
  status: 'present' | 'absent' | 'half-day';
}

export default function StaffManagement() {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', role: '', baseSalary: '', username: '', password: '' });
  
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  });

  const [currentDateStr, setCurrentDateStr] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  useEffect(() => {
    const savedStaff = safeGetItem('urbor_staff_list');
    if (savedStaff) setStaffList(JSON.parse(savedStaff));
    
    const savedAttendance = safeGetItem('urbor_staff_attendance');
    if (savedAttendance) setAttendance(JSON.parse(savedAttendance));

    const unsubAttendance = onSnapshot(doc(db, 'appData', 'staff_attendance'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.attendance) {
          setAttendance(data.attendance);
          safeSetItem('urbor_staff_attendance', JSON.stringify(data.attendance));
        }
      }
    });

    return () => {
      unsubAttendance();
    };
  }, []);

  const saveStaff = (newStaffList: StaffMember[]) => {
    setStaffList(newStaffList);
    safeSetItem('urbor_staff_list', JSON.stringify(newStaffList));
    setDoc(doc(db, 'appData', 'staff'), { staffList: newStaffList }, { merge: true }).catch(console.error);
  };

  const saveAttendance = (newAttendance: AttendanceRecord[]) => {
    setAttendance(newAttendance);
    safeSetItem('urbor_staff_attendance', JSON.stringify(newAttendance));
    setDoc(doc(db, 'appData', 'staff_attendance'), { attendance: newAttendance }, { merge: true }).catch(console.error);
  };

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.baseSalary) return;
    
    const staff: StaffMember = {
      id: Date.now().toString(),
      name: newStaff.name,
      role: newStaff.role || 'Staff',
      baseSalary: Number(newStaff.baseSalary),
      username: newStaff.username,
      password: newStaff.password,
    };
    
    saveStaff([...staffList, staff]);
    setNewStaff({ name: '', role: '', baseSalary: '' });
    setShowAddModal(false);
  };

  const handleDeleteStaff = (id: string) => {
    if (confirm('আপনি কি নিশ্চিত?')) {
      saveStaff(staffList.filter(s => s.id !== id));
    }
  };

  const handleMarkAttendance = (staffId: string, status: 'present' | 'absent' | 'half-day') => {
    const existingIndex = attendance.findIndex(a => a.staffId === staffId && a.date === currentDateStr);
    
    let newAttendance = [...attendance];
    if (existingIndex >= 0) {
      newAttendance[existingIndex].status = status;
    } else {
      newAttendance.push({ date: currentDateStr, staffId, status });
    }
    
    saveAttendance(newAttendance);
  };

  const calculateSalary = (staffId: string) => {
    const staff = staffList.find(s => s.id === staffId);
    if (!staff) return 0;
    
    const monthRecords = attendance.filter(a => a.staffId === staffId && a.date.startsWith(selectedMonth));
    const presentDays = monthRecords.filter(a => a.status === 'present').length;
    const halfDays = monthRecords.filter(a => a.status === 'half-day').length;
    
    const totalEffectiveDays = presentDays + (halfDays * 0.5);
    // Assuming 30 days a month for calculation
    const dailyRate = staff.baseSalary / 30;
    
    return Math.round(totalEffectiveDays * dailyRate);
  };

  return (
    <div className="space-y-8">
      {/* Header and Quick Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-emerald-50 rounded-[1.25rem] flex items-center justify-center text-emerald-600 shadow-inner">
            <Users size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">স্টাফ ম্যানেজমেন্ট</h2>
            <p className="text-sm font-bold text-slate-500 mt-1">দৈনন্দিন হাজিরা এবং সেলারি হিসাব</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-600/20 w-full sm:w-auto justify-center"
        >
          <Plus size={20} strokeWidth={2.5} /> নতুন স্টাফ যুক্ত করুন
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Daily Attendance Card */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <CalendarIcon size={20} />
              </div>
              আজকের হাজিরা
            </h3>
            <input 
              type="date" 
              value={currentDateStr}
              onChange={e => setCurrentDateStr(e.target.value)}
              className="border-2 border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all cursor-pointer w-full sm:w-auto"
            />
          </div>
          
          <div className="space-y-4">
            {staffList.length === 0 ? (
              <div className="text-center py-12 px-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-bold">কোনো স্টাফ যুক্ত করা হয়নি</p>
              </div>
            ) : (
              staffList.map(staff => {
                const record = attendance.find(a => a.staffId === staff.id && a.date === currentDateStr);
                return (
                  <div key={staff.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 rounded-2xl gap-4 border border-slate-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 font-black text-lg border border-slate-100 shadow-sm">
                        {staff.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-slate-800 text-base">{staff.name}</div>
                        <div className="text-xs font-bold text-slate-500 mt-0.5">{staff.role}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleMarkAttendance(staff.id, 'present')}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-black transition-all ${record?.status === 'present' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700'}`}
                      >
                        উপস্থিত
                      </button>
                      <button 
                        onClick={() => handleMarkAttendance(staff.id, 'half-day')}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-black transition-all ${record?.status === 'half-day' ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700'}`}
                      >
                        হাফ ডে
                      </button>
                      <button 
                        onClick={() => handleMarkAttendance(staff.id, 'absent')}
                        className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-black transition-all ${record?.status === 'absent' ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20' : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700'}`}
                      >
                        অনুপস্থিত
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Salary Report Card */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign size={20} />
              </div>
              মাসের সেলারি রিপোর্ট
            </h3>
            <input 
              type="month" 
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="border-2 border-slate-100 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all cursor-pointer w-full sm:w-auto"
            />
          </div>
          
          <div className="space-y-4">
            {staffList.length === 0 ? (
              <div className="text-center py-12 px-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <DollarSign className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-bold">কোনো স্টাফ যুক্ত করা হয়নি</p>
              </div>
            ) : (
              staffList.map(staff => {
                const monthRecords = attendance.filter(a => a.staffId === staff.id && a.date.startsWith(selectedMonth));
                const presentCount = monthRecords.filter(a => a.status === 'present').length;
                const halfCount = monthRecords.filter(a => a.status === 'half-day').length;
                const absentCount = monthRecords.filter(a => a.status === 'absent').length;
                const salary = calculateSalary(staff.id);
                
                return (
                  <div key={staff.id} className="p-5 bg-white rounded-2xl border-2 border-slate-100 shadow-sm hover:border-emerald-100 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-500 font-black text-sm">
                          {staff.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-black text-slate-800 text-base">{staff.name}</div>
                          <div className="text-xs font-bold text-slate-500 mt-0.5">মূল বেতন: <span className="text-slate-700">৳{staff.baseSalary.toLocaleString('bn-BD')}</span></div>
                        </div>
                      </div>
                      <div className="text-right bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100/50">
                        <div className="text-[10px] font-bold text-emerald-600/80 uppercase tracking-wider mb-0.5">প্রাপ্য বেতন</div>
                        <div className="text-lg font-black text-emerald-700">৳{salary.toLocaleString('bn-BD')}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex-1 bg-emerald-50/50 border border-emerald-100 rounded-xl py-2 px-3 flex flex-col items-center justify-center">
                        <span className="text-lg font-black text-emerald-600">{presentCount}</span>
                        <span className="text-[10px] font-bold text-emerald-600/70 uppercase">উপস্থিত</span>
                      </div>
                      <div className="flex-1 bg-amber-50/50 border border-amber-100 rounded-xl py-2 px-3 flex flex-col items-center justify-center">
                        <span className="text-lg font-black text-amber-600">{halfCount}</span>
                        <span className="text-[10px] font-bold text-amber-600/70 uppercase">হাফ ডে</span>
                      </div>
                      <div className="flex-1 bg-rose-50/50 border border-rose-100 rounded-xl py-2 px-3 flex flex-col items-center justify-center">
                        <span className="text-lg font-black text-rose-600">{absentCount}</span>
                        <span className="text-[10px] font-bold text-rose-600/70 uppercase">অনুপস্থিত</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Staff List Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100">
          <h3 className="text-lg font-black text-slate-800">সকল স্টাফ</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-black tracking-wider">
              <tr>
                <th className="px-6 md:px-8 py-4">নাম</th>
                <th className="px-6 md:px-8 py-4">পদবী</th>
                <th className="px-6 md:px-8 py-4">মাসিক বেতন</th>
                <th className="px-6 md:px-8 py-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {staffList.map(staff => (
                <tr key={staff.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 md:px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {staff.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800 text-sm">{staff.name}</span>
                    </div>
                  </td>
                  <td className="px-6 md:px-8 py-5 font-bold text-slate-500 text-sm">{staff.role}</td>
                  <td className="px-6 md:px-8 py-5 font-black text-slate-700 text-sm">৳{staff.baseSalary.toLocaleString('bn-BD')}</td>
                  <td className="px-6 md:px-8 py-5 text-right">
                    <button 
                      onClick={() => handleDeleteStaff(staff.id)}
                      className="text-rose-500 hover:bg-rose-50 p-2.5 rounded-xl transition-colors inline-flex items-center justify-center border border-transparent hover:border-rose-100"
                      title="মুছে ফেলুন"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {staffList.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-16 text-slate-400 font-bold text-sm bg-slate-50/50">
                    কোনো স্টাফ পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-white/20">
            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-black text-xl text-slate-800">নতুন স্টাফ যুক্ত করুন</h3>
              <button 
                onClick={() => setShowAddModal(false)} 
                className="text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 p-2 rounded-full transition-colors border border-slate-100 shadow-sm"
              >
                <XCircle size={20} />
              </button>
            </div>
            <form onSubmit={handleAddStaff} className="p-6 md:p-8 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">স্টাফের নাম</label>
                <input 
                  type="text" 
                  required
                  value={newStaff.name}
                  onChange={e => setNewStaff({...newStaff, name: e.target.value})}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-slate-50 focus:bg-white"
                  placeholder="যেমন: রহিম মিয়া"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">পদবী / কাজ</label>
                <input 
                  type="text" 
                  value={newStaff.role}
                  onChange={e => setNewStaff({...newStaff, role: e.target.value})}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-slate-50 focus:bg-white"
                  placeholder="যেমন: ডেলিভারি ম্যান"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">মাসিক বেতন (টাকা)</label>
                <input 
                  type="number" 
                  required
                  value={newStaff.baseSalary}
                  onChange={e => setNewStaff({...newStaff, baseSalary: e.target.value})}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-slate-50 focus:bg-white"
                  placeholder="যেমন: 15000"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">ইউজারনেম (লগইন এর জন্য)</label>
                <input 
                  type="text" 
                  value={newStaff.username}
                  onChange={e => setNewStaff({...newStaff, username: e.target.value})}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-slate-50 focus:bg-white"
                  placeholder="যেমন: rahim123"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">পাসওয়ার্ড</label>
                <input 
                  type="text" 
                  value={newStaff.password}
                  onChange={e => setNewStaff({...newStaff, password: e.target.value})}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-slate-50 focus:bg-white"
                  placeholder="স্টাফের লগইন পাসওয়ার্ড"
                />
              </div>
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Save size={18} /> স্টাফ সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
