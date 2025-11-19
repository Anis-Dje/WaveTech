from django.core.management.base import BaseCommand
from products.models import Product


class Command(BaseCommand):
    help = 'Populate database with tech products'

    def handle(self, *args, **kwargs):
        # Clear existing products
        Product.objects.all().delete()
        
        products = [
            {
                'name': 'MacBook Pro 16" M3',
                'price': 2499.00,
                'description': 'Apple MacBook Pro 16-inch with M3 chip, 16GB RAM, 512GB SSD. Perfect for professionals and creators.',
                'image': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'
            },
            {
                'name': 'iPhone 15 Pro Max',
                'price': 1199.00,
                'description': 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. 256GB storage.',
                'image': 'https://images.unsplash.com/photo-1592286927505-8c6e399f8e90?w=500'
            },
            {
                'name': 'iPad Air M2',
                'price': 599.00,
                'description': 'Powerful iPad Air with M2 chip, 11-inch Liquid Retina display, 128GB storage.',
                'image': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500'
            },
            {
                'name': 'AirPods Pro (2nd Gen)',
                'price': 249.00,
                'description': 'Premium wireless earbuds with active noise cancellation and spatial audio.',
                'image': 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500'
            },
            {
                'name': 'Apple Watch Ultra 2',
                'price': 799.00,
                'description': 'Rugged smartwatch with GPS, cellular, advanced health tracking, and dive computer.',
                'image': 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500'
            },
            {
                'name': 'Sony WH-1000XM5',
                'price': 399.00,
                'description': 'Industry-leading noise cancelling wireless headphones with exceptional sound quality.',
                'image': 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500'
            },
            {
                'name': 'Samsung Galaxy S24 Ultra',
                'price': 1299.00,
                'description': 'Flagship Android phone with S Pen, 200MP camera, and Snapdragon 8 Gen 3.',
                'image': 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500'
            },
            {
                'name': 'Dell XPS 15',
                'price': 1799.00,
                'description': 'Premium Windows laptop with Intel i7, 16GB RAM, 512GB SSD, and stunning OLED display.',
                'image': 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500'
            },
            {
                'name': 'PlayStation 5',
                'price': 499.00,
                'description': 'Next-gen gaming console with 4K gaming, ray tracing, and ultra-fast SSD.',
                'image': 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500'
            },
            {
                'name': 'Nintendo Switch OLED',
                'price': 349.00,
                'description': 'Hybrid gaming console with vibrant 7-inch OLED screen and versatile gameplay.',
                'image': 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500'
            },
            {
                'name': 'LG 27" 4K Monitor',
                'price': 449.00,
                'description': '27-inch UHD monitor with HDR10, USB-C connectivity, and IPS panel.',
                'image': 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500'
            },
            {
                'name': 'Logitech MX Master 3S',
                'price': 99.00,
                'description': 'Advanced wireless mouse with MagSpeed scrolling and multi-device support.',
                'image': 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'
            },
            {
                'name': 'Keychron K8 Pro',
                'price': 109.00,
                'description': 'Wireless mechanical keyboard with hot-swappable switches and RGB backlighting.',
                'image': 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'
            },
            {
                'name': 'Samsung 1TB SSD',
                'price': 89.00,
                'description': 'High-speed portable SSD with 1050MB/s read speed and USB-C connectivity.',
                'image': 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500'
            },
            {
                'name': 'GoPro Hero 12',
                'price': 399.00,
                'description': 'Action camera with 5.3K video, waterproof design, and advanced stabilization.',
                'image': 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500'
            },
            {
                'name': 'DJI Mini 4 Pro',
                'price': 759.00,
                'description': 'Compact drone with 4K HDR video, omnidirectional obstacle sensing, and 34min flight time.',
                'image': 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500'
            },
            {
                'name': 'Razer DeathAdder V3',
                'price': 69.00,
                'description': 'Ergonomic gaming mouse with 30K DPI sensor and ultra-lightweight design.',
                'image': 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'
            },
            {
                'name': 'Blue Yeti Microphone',
                'price': 129.00,
                'description': 'Professional USB microphone for streaming, podcasting, and recording.',
                'image': 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=500'
            },
            {
                'name': 'Anker PowerCore 20K',
                'price': 49.00,
                'description': 'High-capacity portable charger with 20,000mAh and fast charging support.',
                'image': 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500'
            },
            {
                'name': 'Ring Video Doorbell Pro',
                'price': 249.00,
                'description': 'Smart doorbell with 1080p HD video, two-way talk, and motion detection.',
                'image': 'https://images.unsplash.com/photo-1558089687-aa41ca74f375?w=500'
            },
            {
                'name': 'Nest Learning Thermostat',
                'price': 249.00,
                'description': 'Smart thermostat that learns your schedule and saves energy automatically.',
                'image': 'https://images.unsplash.com/photo-1545259742-24f9031c96e6?w=500'
            },
            {
                'name': 'Amazon Echo Dot (5th Gen)',
                'price': 49.00,
                'description': 'Compact smart speaker with Alexa, improved sound, and smart home control.',
                'image': 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=500'
            },
            {
                'name': 'Fitbit Charge 6',
                'price': 159.00,
                'description': 'Fitness tracker with built-in GPS, heart rate monitoring, and sleep tracking.',
                'image': 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500'
            },
            {
                'name': 'Canon EOS R6 Mark II',
                'price': 2499.00,
                'description': 'Full-frame mirrorless camera with 24MP sensor, 4K 60fps video, and advanced AF.',
                'image': 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500'
            },
            {
                'name': 'Bose SoundLink Flex',
                'price': 149.00,
                'description': 'Portable Bluetooth speaker with waterproof design and 12-hour battery life.',
                'image': 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'
            },
        ]

        created_count = 0
        for product_data in products:
            product = Product.objects.create(**product_data)
            created_count += 1
            self.stdout.write(f'Created: {product.name}')

        self.stdout.write(
            self.style.SUCCESS(f'\nSuccessfully created {created_count} products!')
        )
