import re
with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

imports = """
import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
"""
content = content.replace("import React, { useState, useEffect, useRef } from 'react';", "import React, { useState, useEffect, useRef } from 'react';\n" + imports)

# Remove the localStorage loading blocks for transactions
content = re.sub(r'// Load transactions from localStorage.*?\}, \[\]\);', '', content, flags=re.DOTALL)
content = re.sub(r'// Persist transactions to localStorage.*?\}, \[transactions\]\);', '', content, flags=re.DOTALL)

# For dues
content = re.sub(r'// Load dues from localStorage.*?\}, \[\]\);', '', content, flags=re.DOTALL)
content = re.sub(r'// Persist dues to localStorage.*?\}, \[dues\]\);', '', content, flags=re.DOTALL)

# For campaigns and coupons
content = re.sub(r'// Load campaigns.*?\}, \[\]\);', '', content, flags=re.DOTALL)
content = re.sub(r'// Save campaigns & coupons.*?\}, \[campaigns, coupons\]\);', '', content, flags=re.DOTALL)

# Insert Firebase sync
sync_effect = """
  // Firebase Sync
  useEffect(() => {
    const unsubTx = onSnapshot(doc(db, 'appData', 'transactions'), (docSnap) => {
      if (docSnap.exists()) {
        setTransactions(docSnap.data().data);
      }
    });
    const unsubDues = onSnapshot(doc(db, 'appData', 'dues'), (docSnap) => {
      if (docSnap.exists()) {
        setDues(docSnap.data().data);
      }
    });
    const unsubCamp = onSnapshot(doc(db, 'appData', 'campaigns'), (docSnap) => {
      if (docSnap.exists()) {
        setCampaigns(docSnap.data().data);
      }
    });
    const unsubCoup = onSnapshot(doc(db, 'appData', 'coupons'), (docSnap) => {
      if (docSnap.exists()) {
        setCoupons(docSnap.data().data);
      }
    });
    return () => { unsubTx(); unsubDues(); unsubCamp(); unsubCoup(); };
  }, []);

  // Sync to Firebase when state changes
  // To avoid loops with onSnapshot, it's better to update Firebase when actions occur, 
  // but since AdminDashboard has many setters, we can just use an effect that checks if data has changed?
  // Actually, setting state from onSnapshot and then writing back in an effect will cause an infinite loop!
  // BUT we can use a ref to prevent echoing. Or we can just use simple effects that write IF it's not the initial load, 
  // but it's tricky.
"""
content = content.replace("  const fileInputRef = useRef<HTMLInputElement>(null);", "  const fileInputRef = useRef<HTMLInputElement>(null);\n" + sync_effect)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
print("Done")
