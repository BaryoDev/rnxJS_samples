from django.shortcuts import render
from .forms import ContactForm


def index(request):
    """Home page with reactive state demo"""
    context = {
        'app_state': {
            'page_title': 'Welcome to rnxJS + Django',
            'user': {
                'name': 'Demo User',
                'email': 'demo@example.com',
                'role': 'Developer'
            },
            'stats': {
                'projects': 12,
                'tasks': 48,
                'completed': 35
            }
        }
    }
    return render(request, 'index.html', context)


def contact(request):
    """Contact form with django-rnx integration"""
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # In a real app, you would send an email or save to database
            context = {
                'success': True,
                'message': f"Thank you, {form.cleaned_data['name']}! We'll get back to you soon."
            }
            return render(request, 'contact.html', context)
    else:
        form = ContactForm()
    
    context = {
        'form': form,
        'page_title': 'Contact Us'
    }
    return render(request, 'contact.html', context)


def profile(request):
    """User profile with reactive data"""
    context = {
        'user_data': {
            'name': 'Alice Johnson',
            'email': 'alice@example.com',
            'role': 'Senior Developer',
            'bio': 'Full-stack developer with 5+ years of experience',
            'location': 'San Francisco, CA',
            'joined': '2020-01-15',
            'projects': [
                {'name': 'E-Commerce Platform', 'status': 'Active', 'progress': 75},
                {'name': 'Mobile App', 'status': 'Completed', 'progress': 100},
                {'name': 'Dashboard Redesign', 'status': 'Planning', 'progress': 25},
            ]
        }
    }
    return render(request, 'profile.html', context)
