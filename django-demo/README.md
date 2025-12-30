# Django rnxJS Integration Demo

This is a complete Django project demonstrating the `django-rnx` package for integrating rnxJS reactive components into Django templates.

## Features

- ✅ Django template tags for rnxJS
- ✅ Reactive state from Django context
- ✅ Form integration with Django forms
- ✅ Plugin usage (router, toast, storage)
- ✅ Component rendering with props

## Prerequisites

- Python 3.8+
- pip

## Installation

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run migrations** (if any):
   ```bash
   python manage.py migrate
   ```

3. **Start the development server**:
   ```bash
   python manage.py runserver
   ```

4. **Visit** `http://localhost:8000`

## Project Structure

```
django-demo/
├── manage.py                 # Django management script
├── myproject/               # Project settings
│   ├── __init__.py
│   ├── settings.py          # Django settings
│   ├── urls.py              # URL routing
│   └── wsgi.py              # WSGI config
├── demo/                    # Demo app
│   ├── __init__.py
│   ├── views.py             # View functions
│   ├── forms.py             # Django forms
│   └── templates/           # Templates
│       ├── base.html        # Base template
│       ├── index.html       # Home page
│       ├── contact.html     # Contact form
│       └── profile.html     # User profile
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## Template Tags Reference

### Load rnx tags

```django
{% load rnx %}
```

### Include rnxJS scripts

```django
{% rnx_scripts cdn=True theme='bootstrap' %}
```

### Create reactive state

```django
{% rnx_state user_data 'state' %}
```

### Render components

```django
{% rnx_component 'Button' variant='primary' label='Save' %}
{% rnx_component 'Input' type='email' data_bind='state.email' %}
```

### Initialize plugins

```django
{% rnx_plugin 'toast' position='top-right' %}
{% rnx_plugin 'router' mode='hash' %}
```

### Render Django forms

```django
{% rnx_form form %}
```

## Example Views

### Contact Form

```python
from django import forms
from django.shortcuts import render

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100)
    email = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea)

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Process form
            return render(request, 'success.html')
    else:
        form = ContactForm()
    
    return render(request, 'contact.html', {'form': form})
```

### Template

```django
{% extends "base.html" %}
{% load rnx %}

{% block content %}
    {% rnx_plugin 'toast' position='top-right' %}
    
    <h1>Contact Us</h1>
    
    <form method="post">
        {% csrf_token %}
        {% rnx_form form %}
        {% rnx_component 'Button' type='submit' variant='primary' label='Send Message' %}
    </form>
{% endblock %}
```

## Available Pages

- **Home** (`/`) - Landing page with reactive state
- **Contact** (`/contact`) - Contact form with validation
- **Profile** (`/profile`) - User profile with reactive data

## Customization

1. **Modify templates** in `demo/templates/`
2. **Add views** in `demo/views.py`
3. **Create forms** in `demo/forms.py`
4. **Update URLs** in `myproject/urls.py`

## Learn More

- [rnxJS Documentation](https://github.com/BaryoDev/rnxjs)
- [django-rnx Package](https://www.npmjs.com/package/@arnelirobles/django-rnx)
- [Django Documentation](https://docs.djangoproject.com/)

## License

MIT License - Free to use in your projects!
