# Express rnxJS Integration Demo

This is a complete Express.js project demonstrating the `@arnelirobles/express-rnx` middleware for integrating rnxJS reactive components into EJS templates.

## Features

- ✅ Express middleware for rnxJS
- ✅ EJS view helpers
- ✅ Reactive state from server data
- ✅ Component rendering with props
- ✅ Plugin initialization

## Prerequisites

- Node.js 12+
- npm or yarn

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Visit** `http://localhost:3000`

## Project Structure

```
express-demo/
├── app.js                # Express server
├── package.json          # Dependencies
├── views/               # EJS templates
│   ├── layout.ejs       # Base layout
│   ├── index.ejs        # Home page
│   ├── profile.ejs      # User profile
│   └── components.ejs   # Components showcase
└── README.md           # This file
```

## View Helpers Reference

### Include rnxJS scripts

```ejs
<%- rnx.scripts() %>
```

### Create reactive state

```ejs
<%- rnx.state(userData, 'user') %>
```

### Render components

```ejs
<%- rnx.component('Button', { variant: 'primary', label: 'Save' }) %>
<%- rnx.component('Input', { type: 'email', data_bind: 'state.email' }) %>
```

### Initialize plugins

```ejs
<%- rnx.plugin('toast', { position: 'top-right' }) %>
<%- rnx.plugin('router', { mode: 'hash' }) %>
```

## Example Routes

### Home Page

```javascript
app.get('/', (req, res) => {
    res.render('index', {
        user: {
            name: 'John Doe',
            email: 'john@example.com'
        },
        notifications: [...]
    });
});
```

### Template

```ejs
<%
  const appState = {
    user: user,
    notifications: notifications
  };
%>

<%- rnx.state(appState, 'appState') %>

<h1>Welcome, <span data-bind="appState.user.name"></span>!</h1>

<%- rnx.component('Button', {
  variant: 'primary',
  label: 'View Profile',
  onclick: 'window.location.href = "/profile"'
}) %>
```

## Available Pages

- **Home** (`/`) - Landing page with notifications
- **Profile** (`/profile`) - User profile with reactive data
- **Components** (`/components`) - Component showcase with DataTable

## Customization

1. **Add routes** in `app.js`
2. **Create views** in `views/`
3. **Modify middleware** configuration in `app.js`

## Learn More

- [rnxJS Documentation](https://github.com/BaryoDev/rnxjs)
- [express-rnx Package](https://www.npmjs.com/package/@arnelirobles/express-rnx)
- [Express Documentation](https://expressjs.com/)

## License

MIT License - Free to use in your projects!
