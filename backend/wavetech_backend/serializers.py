from djoser.serializers import UserCreatePasswordRetypeSerializer, UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class CustomUserSerializer(UserSerializer):
    """Custom user serializer that includes admin status fields"""
    class Meta(UserSerializer.Meta):
        model = User
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'is_staff', 'is_superuser')
        read_only_fields = ('id', 'is_staff', 'is_superuser')


class CustomUserCreateSerializer(UserCreatePasswordRetypeSerializer):
    class Meta(UserCreatePasswordRetypeSerializer.Meta):
        model = User
        # Only include real model fields in Meta; base class already defines
        # re_password separately as a write-only field when using the password retype serializer.
        fields = ('id', 'email', 'username', 'first_name', 'last_name', 'password')
        extra_kwargs = {"password": {"write_only": True}}
    
    def perform_create(self, validated_data):
        # Djoser calls perform_create from its create() implementation.
        # Ensure username exists; if not, derive from email prefix.
        username = validated_data.get('username')
        if not username:
            email = validated_data.get('email', '')
            username = email.split('@')[0] if email else 'user'
            # Avoid potential duplicates by appending a number if taken.
            original = username
            counter = 1
            while User.objects.filter(username=username).exists():
                username = f"{original}{counter}"
                counter += 1

        user = User.objects.create_user(
            username=username,
            email=validated_data.get('email'),
            password=validated_data.get('password'),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user
