import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables FIRST
dotenv.config({ path: path.join(__dirname, '.env') });

// Sample Brands Data
const brandsData = [
  {
    name: '3M ESPE',
    logo: '/logos/3m.png',
    description: 'Leading dental materials manufacturer with innovative solutions',
    featured: true
  },
  {
    name: 'Dentsply Sirona',
    logo: '/logos/dentsply.png',
    description: 'Complete dental solutions and equipment provider',
    featured: true
  },
  {
    name: 'Ivoclar Vivadent',
    logo: '/logos/ivoclar.png',
    description: 'Innovative dental products and materials',
    featured: true
  },
  {
    name: 'Kerr Dental',
    logo: '/logos/kerr.png',
    description: 'Quality dental supplies and materials',
    featured: false
  },
  {
    name: 'GC Corporation',
    logo: '/logos/gc.png',
    description: 'Japanese dental excellence and innovation',
    featured: false
  },
  {
    name: 'Ultradent',
    logo: '/logos/ultradent.png',
    description: 'Advanced dental materials and equipment',
    featured: false
  },
  {
    name: 'Shofu Dental',
    logo: '/logos/shofu.png',
    description: 'Premium dental products from Japan',
    featured: false
  },
  {
    name: 'Septodont',
    logo: '/logos/septodont.png',
    description: 'Anesthesia and pharmaceutical specialists',
    featured: false
  },
  {
    name: 'Bisco Dental',
    logo: '/logos/bisco.png',
    description: 'Bonding and restorative materials',
    featured: false
  },
  {
    name: 'Coltene',
    logo: '/logos/coltene.png',
    description: 'Swiss dental quality and precision',
    featured: false
  },
  {
    name: 'Angelus',
    logo: '/logos/angelus.png',
    description: 'Endodontic solutions and materials',
    featured: false
  },
  {
    name: 'Miltex',
    logo: '/logos/miltex.png',
    description: 'Surgical instruments and tools',
    featured: false
  },
  {
    name: 'Woodpecker',
    logo: '/logos/woodpecker.png',
    description: 'Dental equipment and ultrasonic scalers',
    featured: true
  },
  {
    name: 'NSK',
    logo: '/logos/nsk.png',
    description: 'High-speed handpieces and equipment',
    featured: false
  },
  {
    name: 'Hu-Friedy',
    logo: '/logos/hu-friedy.png',
    description: 'Premium dental instruments',
    featured: false
  },
  {
    name: 'Straumann',
    logo: '/logos/straumann.png',
    description: 'Dental implant systems and solutions',
    featured: true
  },
  {
    name: 'Nobel Biocare',
    logo: '/logos/nobel.png',
    description: 'Implant dentistry innovations',
    featured: false
  },
  {
    name: 'Zimmer Biomet',
    logo: '/logos/zimmer.png',
    description: 'Dental implants and regenerative solutions',
    featured: false
  },
  {
    name: 'Colgate Professional',
    logo: '/logos/colgate.png',
    description: 'Professional oral care products',
    featured: false
  },
  {
    name: 'Oral-B Professional',
    logo: '/logos/oral-b.png',
    description: 'Professional dental hygiene products',
    featured: false
  }
];

// Sample Products for each brand
const productsTemplate = [
  {
    suffix: 'Composite Resin',
    category: 'materials',
    basePrice: 2500,
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=400&fit=crop'
  },
  {
    suffix: 'Bonding Agent',
    category: 'materials',
    basePrice: 1800,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=400&fit=crop'
  },
  {
    suffix: 'Dental Burs Set',
    category: 'instruments',
    basePrice: 3200,
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=400&fit=crop'
  },
  {
    suffix: 'Impression Material',
    category: 'materials',
    basePrice: 4500,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=400&fit=crop'
  },
  {
    suffix: 'Dental Mirror Set',
    category: 'instruments',
    basePrice: 1200,
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=400&fit=crop'
  },
  {
    suffix: 'Scaler Tips',
    category: 'consumables',
    basePrice: 2800,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=400&fit=crop'
  },
  {
    suffix: 'Endodontic Files',
    category: 'instruments',
    basePrice: 3500,
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=400&fit=crop'
  },
  {
    suffix: 'Dental Gloves (100pcs)',
    category: 'consumables',
    basePrice: 800,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=400&fit=crop'
  },
  {
    suffix: 'Polishing Kit',
    category: 'materials',
    basePrice: 2200,
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=400&fit=crop'
  },
  {
    suffix: 'Dental Chair Unit',
    category: 'equipment',
    basePrice: 125000,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=400&fit=crop'
  },
  {
    suffix: 'LED Curing Light',
    category: 'equipment',
    basePrice: 8500,
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=400&fit=crop'
  },
  {
    suffix: 'Ultrasonic Scaler',
    category: 'equipment',
    basePrice: 15000,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=400&fit=crop'
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Dynamic import AFTER env variables are loaded
    const { Brand, Product, sequelize } = await import('./models/index.js');

    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Database connected successfully\n');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Product.destroy({ where: {}, force: true });
    await Brand.destroy({ where: {}, force: true });
    console.log('✅ Existing data cleared\n');

    // Create brands
    console.log('📦 Creating brands...');
    const createdBrands = [];
    for (const brandData of brandsData) {
      const brand = await Brand.create(brandData);
      createdBrands.push(brand);
      console.log(`   ✓ Created: ${brand.name}`);
    }
    console.log(`✅ Created ${createdBrands.length} brands\n`);

    // Create products for each brand
    console.log('🦷 Creating products...');
    let totalProducts = 0;
    
    for (const brand of createdBrands) {
      // Each brand gets 8-12 random products
      const numProducts = Math.floor(Math.random() * 5) + 8;
      const selectedProducts = [];
      
      // Randomly select products for this brand
      for (let i = 0; i < numProducts; i++) {
        const template = productsTemplate[Math.floor(Math.random() * productsTemplate.length)];
        selectedProducts.push(template);
      }
      
      for (const template of selectedProducts) {
        const discount = Math.floor(Math.random() * 30) + 5; // 5-35% discount
        const price = template.basePrice;
        const mrp = Math.round(price / (1 - discount / 100));
        
        await Product.create({
          name: `${brand.name} ${template.suffix}`,
          brand: brand.name,
          price: price,
          mrp: mrp,
          discount: discount,
          rating: (Math.random() * 2 + 3).toFixed(1), // 3.0-5.0
          numReviews: Math.floor(Math.random() * 200) + 10,
          image: template.image,
          category: template.category,
          inStock: Math.random() > 0.1, // 90% in stock
          featured: Math.random() > 0.7, // 30% featured
          description: `High-quality ${template.suffix.toLowerCase()} from ${brand.name}. Professional grade dental product designed for optimal performance and reliability.`,
          specifications: JSON.stringify({
            manufacturer: brand.name,
            warranty: '1 year',
            origin: 'Imported',
            certification: 'ISO 13485'
          })
        });
        
        totalProducts++;
      }
      
      console.log(`   ✓ Created ${selectedProducts.length} products for ${brand.name}`);
    }
    
    console.log(`✅ Created ${totalProducts} products\n`);

    // Summary
    console.log('📊 Seeding Summary:');
    console.log(`   • Brands: ${createdBrands.length}`);
    console.log(`   • Products: ${totalProducts}`);
    console.log(`   • Featured Brands: ${createdBrands.filter(b => b.featured).length}`);
    console.log('\n✨ Database seeding completed successfully!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase();
