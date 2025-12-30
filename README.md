# rnxJS Samples

Welcome to the **rnxJS Samples** repository! This collection showcases the power and flexibility of [rnxJS](https://github.com/BaryoDev/rnxjs) - The Bootstrap-Native Framework for Production Apps.

## 🚀 What is rnxJS?

rnxJS is a lightweight (~10KB gzipped), zero-build framework that brings reactive programming to Bootstrap applications. Perfect for backend developers (Django, Rails, Laravel, Express) and internal tools.

### Key Features

- ✅ **Zero Build Required** - No Webpack, no bundlers, just HTML and JS
- ✅ **46+ Components** - Production-ready Bootstrap & Material Design components
- ✅ **Reactive State** - Proxy-based reactivity with automatic UI updates
- ✅ **Two-Way Binding** - Built-in `data-bind` for forms and elements
- ✅ **Form Validation** - Built-in validation rules
- ✅ **Backend Integration** - Official packages for Django, Express, Rails, Laravel

## 📂 Repository Structure

```
rnxJS_samples/
├── index.html           # Landing page with all demos
├── dashboard.html       # Admin dashboard demo
├── shop.html           # E-commerce product catalog
├── forms.html          # Form validation demo
├── datatable.html      # Data table with sorting/filtering
├── tasks.html          # Task manager (todo app)
├── chat.html           # Chat interface
├── settings.html       # Settings panel
├── styles.css          # Shared custom styles
├── django-demo/        # Django integration demo
│   └── README.md
├── express-demo/       # Express.js integration demo
│   └── README.md
└── README.md           # This file
```

## 🎯 Standalone HTML Demos

All standalone demos are **copy-paste ready** and require no build step. Just open them in a browser!

### 1. **Landing Page** (`index.html`)
- Overview of all demos
- Quick start guide
- Resource links

### 2. **Admin Dashboard** (`dashboard.html`)
- Real-time stat cards
- User management table
- Activity feed
- Search and filtering

**Components Used**: `StatCard`, `DataTable`, `Input`, `Button`, `Card`

### 3. **E-Commerce Shop** (`shop.html`)
- Product catalog with images
- Category and price filtering
- Shopping cart with sidebar
- Reactive cart totals

**Components Used**: `Card`, `Badge`, `Modal`, `Search`, `Select`, `Button`

### 4. **Form Validation** (`forms.html`)
- Multi-step form
- Built-in validation rules
- File upload
- Real-time error messages

**Components Used**: `Input`, `Textarea`, `Select`, `Checkbox`, `Radio`, `Switch`, `FileUpload`

### 5. **Data Table** (`datatable.html`)
- Sortable columns
- Search and filtering
- Pagination
- Row actions (edit/delete)

**Components Used**: `DataTable`, `Search`, `Pagination`, `Dropdown`

### 6. **Task Manager** (`tasks.html`)
- Add/edit/delete tasks
- Status tracking (todo, in progress, done)
- Filtering by status
- Due date management

**Components Used**: `List`, `Checkbox`, `FAB`, `Chips`, `DatePicker`, `Tabs`

### 7. **Chat Interface** (`chat.html`)
- Real-time message list
- Send/receive messages
- Toast notifications
- Auto-scroll to latest message

**Components Used**: `List`, `Input`, `Toast`, `Button`

### 8. **Settings Panel** (`settings.html`)
- Theme switching (light/dark)
- Tabbed interface
- Slider controls
- Accordion sections

**Components Used**: `Tabs`, `Switch`, `Slider`, `Select`, `Accordion`, `Sidebar`

## 🔧 Backend Integration Demos

### Django Integration (`django-demo/`)

Complete Django project demonstrating `@arnelirobles/django-rnx` integration.

**Features**:
- Django template tags (`{% rnx_scripts %}`, `{% rnx_state %}`, `{% rnx_component %}`)
- Form integration with Django forms
- Reactive state from Django context
- Plugin usage (router, toast, storage)

**Setup**:
```bash
cd django-demo
pip install -r requirements.txt
python manage.py runserver
```

See `django-demo/README.md` for detailed instructions.

### Express Integration (`express-demo/`)

Complete Express.js project demonstrating `@arnelirobles/express-rnx` integration.

**Features**:
- EJS view helpers (`rnx.scripts()`, `rnx.state()`, `rnx.component()`)
- Reactive state from server data
- Component rendering in templates
- Middleware configuration

**Setup**:
```bash
cd express-demo
npm install
npm start
```

See `express-demo/README.md` for detailed instructions.

## 🏃 Running the Demos

### Option 1: Open Directly in Browser

Simply open any `.html` file in your browser. No server required!

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

### Option 2: Use a Local Server

For a better development experience:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📚 Learning Resources

- **Official Documentation**: [GitHub - BaryoDev/rnxjs](https://github.com/BaryoDev/rnxjs)
- **npm Package**: [@arnelirobles/rnxjs](https://www.npmjs.com/package/@arnelirobles/rnxjs)
- **CLI Tool**: [@arnelirobles/create-rnxjs-app](https://www.npmjs.com/package/@arnelirobles/create-rnxjs-app)
- **Django Integration**: [@arnelirobles/django-rnx](https://www.npmjs.com/package/@arnelirobles/django-rnx)
- **Express Integration**: [@arnelirobles/express-rnx](https://www.npmjs.com/package/@arnelirobles/express-rnx)

## 🎨 Customization

All demos use a shared `styles.css` file with modern styling including:
- Glassmorphism effects
- Gradient backgrounds
- Smooth animations
- Responsive design
- Custom scrollbars

Feel free to modify `styles.css` to match your brand!

## 🚀 Quick Start with rnxJS

### CDN (No Build)

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>
<body>
    <Container>
        <h1 data-bind="message"></h1>
        <Input data-bind="message" placeholder="Type something..." />
        <Button label="Click Me" variant="primary" onclick="alert(state.message)" />
    </Container>

    <!-- rnxJS Library -->
    <script src="https://cdn.jsdelivr.net/npm/@arnelirobles/rnxjs/dist/rnx.global.js"></script>
    
    <script>
        const { createReactiveState, autoRegisterComponents, loadComponents } = rnx;
        
        const state = createReactiveState({
            message: 'Hello, rnxJS!'
        });
        
        autoRegisterComponents();
        loadComponents(document.body, state);
    </script>
</body>
</html>
```

### NPM (With Bundler)

```bash
npm install @arnelirobles/rnxjs
```

```javascript
import { createReactiveState, autoRegisterComponents, loadComponents } from '@arnelirobles/rnxjs';
import '@arnelirobles/rnxjs/css/bootstrap-m3-theme.css'; // Optional M3 theme

const state = createReactiveState({ count: 0 });
autoRegisterComponents();
loadComponents(document.body, state);
```

### CLI Scaffolding

```bash
npx @arnelirobles/create-rnxjs-app@latest
```

## 🤝 Contributing

Found a bug or have a suggestion? Please open an issue on the [main rnxJS repository](https://github.com/BaryoDev/rnxjs/issues).

## 📄 License

These samples are provided under the **MIT License** - feel free to use them in your projects!

The rnxJS library itself is licensed under **MPL-2.0**.

## 💡 Tips

1. **Start Simple**: Begin with `index.html` to understand the basics
2. **Explore Components**: Check `dashboard.html` for component variety
3. **Learn Reactivity**: `shop.html` demonstrates reactive cart management
4. **Backend Integration**: Try `django-demo/` or `express-demo/` for full-stack apps
5. **Customize**: Modify `styles.css` to match your design system

## 🌟 Why rnxJS?

| Feature             | rnxJS      | jQuery   | Vue 3         | React 18   |
| ------------------- | ---------- | -------- | ------------- | ---------- |
| **Bundle Size**     | ~10KB      | ~30KB    | ~16KB         | ~42KB      |
| **Zero Build**      | ✅ Yes      | ✅ Yes    | ⚠️ Recommended | ❌ Required |
| **Components**      | 46         | 0        | 0             | 0          |
| **Two-Way Binding** | ✅ Built-in | ❌ Manual | ✅ v-model     | ❌ Manual   |
| **Form Validation** | ✅ Built-in | ❌ Plugin | ❌ Library     | ❌ Library  |
| **Learning Curve**  | 1 hour     | 1 hour   | 1 day         | 1 week     |

## 📞 Support

- **GitHub Issues**: [BaryoDev/rnxjs/issues](https://github.com/BaryoDev/rnxjs/issues)
- **GitHub Discussions**: [BaryoDev/rnxjs/discussions](https://github.com/BaryoDev/rnxjs/discussions)

---

**Built with ❤️ by [BaryoDev](https://github.com/BaryoDev)**

Enjoy exploring rnxJS! 🚀
