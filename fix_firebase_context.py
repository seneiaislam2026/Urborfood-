import re
with open('src/context/CartContext.tsx', 'r') as f:
    content = f.read()

# I need to add Firebase imports
imports = """import { db } from '../firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
"""
if 'firebase/firestore' not in content:
    content = content.replace("import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';", "import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';\n" + imports)

with open('src/context/CartContext.tsx', 'w') as f:
    f.write(content)
print("Done")
