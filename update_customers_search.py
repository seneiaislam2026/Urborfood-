import re

with open('src/pages/AdminDashboard.tsx', 'r') as f:
    content = f.read()

# 1. Add customerSearch state
state_target = "  const [orderSearch, setOrderSearch] = useState('');"
state_replacement = """  const [orderSearch, setOrderSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');"""
content = content.replace(state_target, state_replacement)

# 2. Add filteredCustomersList
filter_target = """  const filteredProductsList = (products || []).filter(p => {"""
filter_replacement = """  const filteredCustomersList = customersList.filter(c => {
    const query = customerSearch.toLowerCase();
    return c.name.toLowerCase().includes(query) || c.phone.includes(query);
  });

  const filteredProductsList = (products || []).filter(p => {"""
content = content.replace(filter_target, filter_replacement)

with open('src/pages/AdminDashboard.tsx', 'w') as f:
    f.write(content)
