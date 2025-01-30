from django.urls import path, include
from django.contrib import admin

urlpatterns = [
    path('diet/', include('main.urls')),
    path('fitness/', include('fitness.urls')),
    path('api/', include('accountsApi.urls')),
    # path('', include('socialMedia.urls')),
    path('admin/', admin.site.urls),
]

# http://127.0.0.1:8000/diet/
# http://127.0.0.1:8000/fitness/
# http://127.0.0.1:8000/api/
# http://127.0.0.1:8000/api/users/login/
# http://127.0.0.1:8000/api/users/register/
# http://127.0.0.1:8000/api/logout/
# http://127.0.0.1:8000/api/activate/<uidb64>/<token>/
# http://127.0.0.1:8000/api/forgot-password/
# http://127.0.0.1:8000/api/reset-password/<uidb64>/<token>/
# http://127.0.0.1:8000/api/change-password/
# http://127.0.0.1:8000/api/
# http://127.0.0.1:8000/api/