const express = require('express');
const rnxMiddleware = require('@arnelirobles/express-rnx');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(rnxMiddleware({
  cdn: true,
  theme: 'bootstrap',
  toastPosition: 'top-right',
  toastDuration: 3000
}));

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Mock data
const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'Developer',
  bio: 'Full-stack developer passionate about building great web applications',
  location: 'San Francisco, CA',
  joined: '2020-01-15'
};

const mockNotifications = [
  { id: 1, title: 'Welcome!', message: 'Welcome to rnxJS + Express demo', type: 'info', time: '2 min ago' },
  { id: 2, title: 'New Feature', message: 'Check out the new components', type: 'success', time: '1 hour ago' },
  { id: 3, title: 'Update Available', message: 'A new version is available', type: 'warning', time: '2 hours ago' }
];

const mockUsers = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Manager', status: 'Inactive' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'User', status: 'Active' }
];

// Routes
app.get('/', (req, res) => {
  res.render('index', {
    user: mockUser,
    notifications: mockNotifications
  });
});

app.get('/profile', (req, res) => {
  res.render('profile', {
    user: mockUser
  });
});

app.get('/components', (req, res) => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' }
  ];

  res.render('components', {
    users: mockUsers,
    columns: columns
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available routes:');
  console.log('  - http://localhost:${PORT}/');
  console.log('  - http://localhost:${PORT}/profile');
  console.log('  - http://localhost:${PORT}/components');
});
