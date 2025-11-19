from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Create test users and admin accounts'

    def handle(self, *args, **kwargs):
        # Create superuser/admin
        if not User.objects.filter(username='admin').exists():
            admin = User.objects.create_superuser(
                username='admin',
                email='admin@wavetech.com',
                password='admin123'
            )
            self.stdout.write(self.style.SUCCESS(f'✓ Created admin user'))
            self.stdout.write(f'  Username: admin')
            self.stdout.write(f'  Email: admin@wavetech.com')
            self.stdout.write(f'  Password: admin123')
        else:
            self.stdout.write(self.style.WARNING('Admin user already exists'))

        # Create regular test users
        test_users = [
            {
                'username': 'john',
                'email': 'john@example.com',
                'password': 'password123',
                'first_name': 'John',
                'last_name': 'Doe'
            },
            {
                'username': 'jane',
                'email': 'jane@example.com',
                'password': 'password123',
                'first_name': 'Jane',
                'last_name': 'Smith'
            },
            {
                'username': 'testuser',
                'email': 'test@example.com',
                'password': 'password123',
                'first_name': 'Test',
                'last_name': 'User'
            }
        ]

        created_count = 0
        for user_data in test_users:
            if not User.objects.filter(username=user_data['username']).exists():
                user = User.objects.create_user(
                    username=user_data['username'],
                    email=user_data['email'],
                    password=user_data['password'],
                    first_name=user_data.get('first_name', ''),
                    last_name=user_data.get('last_name', '')
                )
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'✓ Created user: {user.username}'))
                self.stdout.write(f'  Email: {user.email}')
                self.stdout.write(f'  Password: password123')
            else:
                self.stdout.write(self.style.WARNING(f'User {user_data["username"]} already exists'))

        self.stdout.write(
            self.style.SUCCESS(f'\n✓ Successfully created {created_count} regular users!')
        )
        self.stdout.write('\nYou can now login with any of these accounts.')
