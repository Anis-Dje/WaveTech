from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class EmailOrUsernameModelBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        
        # Try email first if '@' is in username
        if '@' in username:
            try:
                user = UserModel.objects.get(email=username)
                if user.check_password(password):
                    return user
            except UserModel.DoesNotExist:
                pass
        
        # Fall back to username authentication
        return super().authenticate(request, username=username, password=password, **kwargs)