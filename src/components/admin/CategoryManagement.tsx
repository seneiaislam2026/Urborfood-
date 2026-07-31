import React, { useState, useEffect } from 'react';
import { Tag, Plus, Trash2, Edit, Save, XCircle } from 'lucide-react';
import { safeGetItem, safeSetItem, safeRemoveItem } from '../../utils/storage';
import { useUI } from '../../context/UIContext';
import { compressImage } from '../../utils/imageUtils';


export default function CategoryManagement() {
  const { categories, setCategories, updateSettingsInDB } = useUI();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState<{id: string, name: string, image?: string}>({ id: '', name: '', image: '' });



  const saveCategories = (cats: {id: string, name: string}[]) => {
    setCategories(cats);
    safeSetItem('urbor_custom_categories', JSON.stringify(cats));
    if (updateSettingsInDB) {
      updateSettingsInDB({ categories: cats });
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.name || !newCategory.id) return;
    
    // Add or update
    if (editingId) {
      saveCategories(categories.map(c => c.id === editingId ? newCategory : c));
    } else {
      const exists = categories.find(c => c.id === newCategory.id);
      if (exists) {
        alert('এই আইডিটি ইতিমধ্যে ব্যবহৃত হচ্ছে।');
        return;
      }
      saveCategories([...categories, newCategory]);
    }
    
    setNewCategory({ id: '', name: '', image: '' });
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('আপনি কি নিশ্চিত?')) {
      saveCategories(categories.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-blue-50 rounded-[1.25rem] flex items-center justify-center text-blue-600 shadow-inner">
            <Tag size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">ক্যাটাগরি ম্যানেজমেন্ট</h2>
            <p className="text-sm font-bold text-slate-500 mt-1">পণ্যের ধরন এবং ক্যাটাগরি সেটআপ</p>
          </div>
        </div>
        <button 
          onClick={() => { setEditingId(null); setNewCategory({id:'', name:'', image:''}); setShowAddModal(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 w-full sm:w-auto justify-center"
        >
          <Plus size={20} strokeWidth={2.5} /> নতুন ক্যাটাগরি
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100">
          <h3 className="text-lg font-black text-slate-800">সকল ক্যাটাগরি</h3>
        </div>
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-black tracking-wider border-b border-slate-100">
              <tr>
                <th className="px-6 md:px-8 py-4">ছবি</th>
                <th className="px-6 md:px-8 py-4">ক্যাটাগরির নাম</th>
                <th className="px-6 md:px-8 py-4">আইডি (Slug)</th>
                <th className="px-6 md:px-8 py-4 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map(cat => (
                <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 md:px-8 py-4">
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} className="w-12 h-12 object-cover rounded-2xl border border-slate-200 shadow-sm" />
                    ) : (
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400">
                        <Tag size={20} />
                      </div>
                    )}
                  </td>
                  <td className="px-6 md:px-8 py-4 font-black text-slate-800 text-base">{cat.name}</td>
                  <td className="px-6 md:px-8 py-4">
                    <span className="font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg text-xs">{cat.id}</span>
                  </td>
                  <td className="px-6 md:px-8 py-4 text-right space-x-2">
                    <button 
                      onClick={() => { setEditingId(cat.id); setNewCategory(cat); setShowAddModal(true); }}
                      className="text-blue-500 hover:bg-blue-50 p-2.5 rounded-xl transition-colors inline-flex items-center justify-center border border-transparent hover:border-blue-100"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(cat.id)}
                      className="text-rose-500 hover:bg-rose-50 p-2.5 rounded-xl transition-colors inline-flex items-center justify-center border border-transparent hover:border-rose-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile View - Elegant List */}
        <div className="md:hidden divide-y divide-slate-100">
          {categories.map(cat => (
            <div key={cat.id} className="p-4 flex items-center gap-4 hover:bg-slate-50/50 transition-colors">
              {cat.image ? (
                <img src={cat.image} alt={cat.name} className="w-14 h-14 object-cover rounded-2xl border border-slate-200 shadow-sm shrink-0" />
              ) : (
                <div className="w-14 h-14 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-400 shrink-0">
                  <Tag size={20} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-slate-800 text-base truncate">{cat.name}</h4>
                <div className="mt-1">
                  <span className="font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg text-[10px] uppercase tracking-wider">{cat.id}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button 
                  onClick={() => { setEditingId(cat.id); setNewCategory(cat); setShowAddModal(true); }}
                  className="text-blue-500 bg-blue-50 hover:bg-blue-100 p-2.5 rounded-xl transition-colors inline-flex items-center justify-center"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(cat.id)}
                  className="text-rose-500 bg-rose-50 hover:bg-rose-100 p-2.5 rounded-xl transition-colors inline-flex items-center justify-center"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-white/20">
            <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-black text-xl text-slate-800">{editingId ? 'ক্যাটাগরি আপডেট' : 'নতুন ক্যাটাগরি'}</h3>
              <button 
                onClick={() => setShowAddModal(false)} 
                className="text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 p-2 rounded-full transition-colors border border-slate-100 shadow-sm"
              >
                <XCircle size={20} />
              </button>
            </div>
            <form onSubmit={handleAddCategory} className="p-6 md:p-8 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">ক্যাটাগরির ছবি (Image)</label>
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
                      compressImage(file, 400, 0.6).then(base64 => {
                        setNewCategory({...newCategory, image: base64});
                      });
                    }
                  }}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all bg-slate-50 focus:bg-white"
                />
                {newCategory.image && (
                  <div className="mt-3 relative inline-block">
                    <img src={newCategory.image} alt="Preview" className="w-20 h-20 object-cover rounded-xl border border-slate-200 shadow-sm" />
                    <button type="button" onClick={() => setNewCategory({...newCategory, image: ''})} className="absolute -top-2 -right-2 bg-white text-rose-500 rounded-full shadow-md border border-slate-100 hover:scale-110 transition-transform">
                      <XCircle size={20} className="fill-white" />
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">ক্যাটাগরি আইডি (ইংরেজি)</label>
                <input 
                  type="text" 
                  required
                  value={newCategory.id}
                  onChange={e => setNewCategory({...newCategory, id: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all bg-slate-50 focus:bg-white"
                  placeholder="যেমন: beef, fish"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">ক্যাটাগরির নাম (বাংলা)</label>
                <input 
                  type="text" 
                  required
                  value={newCategory.name}
                  onChange={e => setNewCategory({...newCategory, name: e.target.value})}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all bg-slate-50 focus:bg-white"
                  placeholder="যেমন: গরুর মাংস"
                />
              </div>
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <Save size={18} /> ক্যাটাগরি সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
