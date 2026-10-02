import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const db = prisma as any;

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Seed Initial Admin Account
  const username = process.env.ADMIN_USERNAME || "admin";
  const rawPassword = process.env.ADMIN_PASSWORD || "traveltube_admin_2026";
  const email = "admin@traveltube.com";
  const name = "System Administrator";

  const existingAdmin = await prisma.admin.findFirst({
    where: { OR: [{ username }, { email }] },
  });

  if (existingAdmin) {
    console.log(`✅ Admin account already exists: ${existingAdmin.username}`);
  } else {
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const admin = await prisma.admin.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(`🎉 Initial Admin successfully created!`);
    console.log(`   Username: ${admin.username}`);
    console.log(`   Email:    ${admin.email}`);
    console.log(`   Password: (Configured in .env as ADMIN_PASSWORD)`);
  }

  // 2. Initialize / Seed Homepage Hero (Row id = 1)
  await db.homepageHero.upsert({
    where: { id: 1 },
    update: {
      heroFirst: "Discover the",
      heroSecond: "Real",
      heroScript: "Sri Lanka",
      heroDesc:
        "Unforgettable journeys, authentic experiences and memories that last a lifetime.",
      bgImage: "/images/hero-bg.jpg",
    },
    create: {
      id: 1,
      heroFirst: "Discover the",
      heroSecond: "Real",
      heroScript: "Sri Lanka",
      heroDesc:
        "Unforgettable journeys, authentic experiences and memories that last a lifetime.",
      bgImage: "/images/hero-bg.jpg",
    },
  });
  console.log(`✅ Default Homepage Hero initialized.`);

  // 3. Remove all data in TourCategory table and re-seed id 1, 2, 3 with existing categories
  console.log(`🧹 Removing all existing data from TourCategory (tour_categories)...`);
  await db.tourCategory.deleteMany();

  // Reset AUTO_INCREMENT in MySQL to ensure clean ID ordering
  try {
    await prisma.$executeRawUnsafe(`ALTER TABLE tour_categories AUTO_INCREMENT = 1;`);
  } catch (err) {
    console.log(`   ℹ️ Note: Auto-increment reset skipped or handled by database.`);
  }

  const defaultCategories = [
    {
      id: 1,
      title: "One Day Tours",
      badge: "Day Trips",
      description:
        "Feel with the nature in Sri Lanka. Can you arrange a trip on a day? We give you amazing and adventure feeling. Cover the most attractive areas within one day.",
      actionText: "Explore Tours",
      image: "/images/day-tours.jpg",
    },
    {
      id: 2,
      title: "Round Tours",
      badge: "Multi-Day",
      description:
        "In every country there are hidden places and stories. Explore ancient cultures, legends and history. Sri Lanka is the best destination to fulfill your travel diary.",
      actionText: "Explore Journeys",
      image: "/images/sigiriya.jpg",
    },
    {
      id: 3,
      title: "Plan your Trip",
      badge: "Tailor-Made",
      description:
        "Planning a trip is the hardest part of traveling. We will help you to arrange your trip, schedule your valuable time and choose the best routes with a cost-effective plan.",
      actionText: "Start Planning",
      image: "/images/package-13.jpg",
    },
  ];

  console.log(`📦 Seeding TourCategory table with IDs 1, 2, 3...`);
  for (const cat of defaultCategories) {
    const created = await db.tourCategory.create({
      data: {
        id: cat.id,
        title: cat.title,
        badge: cat.badge,
        description: cat.description,
        actionText: cat.actionText,
        image: cat.image,
      },
    });
    console.log(`   ✅ Category [ID ${created.id}] "${created.title}" seeded successfully.`);
  }

  // 4. Initialize / Seed About Us Intro Section (Row id = 1)
  console.log(`🌿 Initializing About Us Welcome Section (about_section row id = 1)...`);
  const defaultAbout = {
    id: 1,
    eyebrow: "WELCOME TO",
    titleMain: "Travel Tube Lanka",
    titleAccent: "(Pvt) Ltd",
    paragraph1:
      "Welcome to TRAVEL TUBE LANKA (PVT) LTD, your trusted partner for all travel and tourism services. We are committed to making your travel experience smooth, comfortable, and memorable.",
    paragraph2:
      "Our company provides a wide range of travel solutions for both local and international travelers. With a professional and friendly team, we help our clients plan their journeys with confidence and convenience.",
    topImage: "/images/about-collage-leopard-hd.jpg",
    bottomLeftImage: "/images/about-collage-turtle-hd.jpg",
    bottomRightImage: "/images/about-collage-stupa-hd.jpg",
  };

  try {
    if (db.aboutSection) {
      await db.aboutSection.upsert({
        where: { id: 1 },
        update: defaultAbout,
        create: defaultAbout,
      });
    } else {
      await prisma.$executeRawUnsafe(
        `INSERT INTO about_section (id, eyebrow, titleMain, titleAccent, paragraph1, paragraph2, topImage, bottomLeftImage, bottomRightImage, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3))
         ON DUPLICATE KEY UPDATE 
           eyebrow = VALUES(eyebrow),
           titleMain = VALUES(titleMain),
           titleAccent = VALUES(titleAccent),
           paragraph1 = VALUES(paragraph1),
           paragraph2 = VALUES(paragraph2),
           topImage = VALUES(topImage),
           bottomLeftImage = VALUES(bottomLeftImage),
           bottomRightImage = VALUES(bottomRightImage),
           updatedAt = NOW(3);`,
        defaultAbout.id,
        defaultAbout.eyebrow,
        defaultAbout.titleMain,
        defaultAbout.titleAccent,
        defaultAbout.paragraph1,
        defaultAbout.paragraph2,
        defaultAbout.topImage,
        defaultAbout.bottomLeftImage,
        defaultAbout.bottomRightImage
      );
    }
    console.log(`✅ Default About Us Welcome Section initialized successfully.`);
  } catch (err) {
    console.error(`⚠️ Could not seed about_section:`, err);
  }

  // 5. Initialize / Seed Why Choose Us Pillars (IDs 1, 2, 3, 4)
  console.log(`🛡️ Initializing Why Choose Us Highlights (why_choose_pillars)...`);
  const defaultPillars = [
    {
      id: 1,
      title: "Professional Service",
      description:
        "Professional and friendly service to ensure your comfort throughout the journey.",
    },
    {
      id: 2,
      title: "Competitive Packages",
      description:
        "Competitive travel packages tailored to your budget without compromising quality.",
    },
    {
      id: 3,
      title: "Personalized Planning",
      description:
        "Tailor-made itineraries designed to suit your personal schedule, budget, and travel style.",
    },
    {
      id: 4,
      title: "24/7 Dedicated Support",
      description:
        "Round-the-clock local support to give you complete peace of mind while exploring Sri Lanka.",
    },
  ];

  try {
    for (const pillar of defaultPillars) {
      if (db.whyChoosePillar) {
        await db.whyChoosePillar.upsert({
          where: { id: pillar.id },
          update: {
            title: pillar.title,
            description: pillar.description,
          },
          create: {
            id: pillar.id,
            title: pillar.title,
            description: pillar.description,
          },
        });
      } else {
        await prisma.$executeRawUnsafe(
          `INSERT INTO why_choose_pillars (id, title, description, createdAt, updatedAt)
           VALUES (?, ?, ?, NOW(3), NOW(3))
           ON DUPLICATE KEY UPDATE
             title = VALUES(title),
             description = VALUES(description),
             updatedAt = NOW(3);`,
          pillar.id,
          pillar.title,
          pillar.description
        );
      }
      console.log(`   ✅ Pillar [ID ${pillar.id}] "${pillar.title}" seeded successfully.`);
    }
    console.log(`✅ All 4 Why Choose Us pillars initialized successfully.`);
  } catch (err) {
    console.error(`⚠️ Could not seed why_choose_pillars:`, err);
  }

  // 6. Initialize / Seed Core Service Cards (9 Total)
  console.log(`✈️ Initializing Core Service Cards (service_cards)...`);
  const defaultServices = [
    {
      id: 1,
      title: "AIR TICKETING",
      description: "Domestic and international flight reservations at competitive prices.",
      icon: "Plane",
    },
    {
      id: 2,
      title: "PLAN YOUR TRIP",
      description: "Personalized travel planning according to your budget and preferences.",
      icon: "Map",
    },
    {
      id: 3,
      title: "ONE DAY TOURS",
      description: "Carefully designed day trips to popular attractions across Sri Lanka.",
      icon: "Calendar",
    },
    {
      id: 4,
      title: "VISA ASSISTANCE",
      description: "Guidance and support for visa applications and documentation.",
      icon: "FileText",
    },
    {
      id: 5,
      title: "ROUND TOURS",
      description: "Complete tour packages for individuals, families, and groups.",
      icon: "Globe",
    },
    {
      id: 6,
      title: "ACTIVITIES & DESTINATIONS",
      description: "Exciting activities and carefully selected destinations for unforgettable experiences.",
      icon: "Mountain",
    },
    {
      id: 7,
      title: "INBOUND & OUTBOUND TOURS",
      description: "Travel services for visitors coming into the country and travelers going abroad.",
      icon: "ArrowLeftRight",
    },
    {
      id: 8,
      title: "TRAVELLER'S CHEQUES",
      description: "Safe and convenient travel money services for your security.",
      icon: "CreditCard",
    },
    {
      id: 9,
      title: "AIRPORT TRANSFERS",
      description: "Comfortable and reliable airport pick-up and drop-off services.",
      icon: "Car",
    },
  ];

  try {
    for (const service of defaultServices) {
      if (db.serviceCard) {
        await db.serviceCard.upsert({
          where: { id: service.id },
          update: {
            title: service.title,
            description: service.description,
            icon: service.icon,
          },
          create: {
            id: service.id,
            title: service.title,
            description: service.description,
            icon: service.icon,
          },
        });
      } else {
        await prisma.$executeRawUnsafe(
          `INSERT INTO service_cards (id, title, description, icon, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, NOW(3), NOW(3))
           ON DUPLICATE KEY UPDATE
             title = VALUES(title),
             description = VALUES(description),
             icon = VALUES(icon),
             updatedAt = NOW(3);`,
          service.id,
          service.title,
          service.description,
          service.icon
        );
      }
      console.log(`   ✅ Service [ID ${service.id}] "${service.title}" (${service.icon}) seeded.`);
    }
    console.log(`✅ All 9 Core Service Cards initialized successfully.`);
  } catch (err) {
    console.error(`⚠️ Could not seed service_cards:`, err);
  }

  // 7. Initialize / Seed Tour Packages (tour_packages)
  console.log(`🏝️ Initializing Tour Packages (tour_packages)...`);
  const defaultPackages = [
    {
      id: 14,
      name: "Classic Cultural Tour",
      days: "5 Days",
      locations: "Sigiriya / Kandy / Dambulla",
      description:
        "Explore ancient wonders, royal heritage and Sri Lanka’s rich cultural heart.",
      rating: 4.8,
      reviews: 120,
      image: "/images/sigiriya.jpg",
      alt: "Sigiriya rock fortress rising above lush green forest at sunset",
      featured: true,
    },
    {
      id: 16,
      name: "Culture & Heritage Tour",
      days: "7 Days",
      locations: "Kandy / Cultural Triangle / Sigiriya",
      description:
        "Discover sacred temples, royal palaces and UNESCO world heritage treasures.",
      rating: 4.9,
      reviews: 98,
      image: "/images/package-16.jpg",
      alt: "The illuminated Temple of the Tooth in Kandy",
      featured: true,
    },
    {
      id: 18,
      name: "Family Holidays Sri Lanka",
      days: "13 Days",
      locations: "Bentota / Yala / Ella / Kandy",
      description:
        "A joyful family journey combining wildlife safaris, scenic trains and sunny beaches.",
      rating: 4.9,
      reviews: 145,
      image: "/images/package-18.jpg",
      alt: "Buddhist statues and painted ceilings in a Sri Lankan cave temple",
      featured: true,
    },
    {
      id: 19,
      name: "Honeymoon in Paradise",
      days: "11 Days",
      locations: "Mirissa / Nuwara Eliya / Ella",
      description:
        "Romantic getaways with tea-plantation retreats, coastal sunsets and private dining.",
      rating: 5.0,
      reviews: 84,
      image: "/images/package-19.jpg",
      alt: "Ancient stone architecture and a Buddha statue in Polonnaruwa",
      featured: true,
    },
    {
      id: 20,
      name: "Beach Holiday Tour",
      days: "12 Days",
      locations: "Galle / Bentota / Mirissa",
      description:
        "Golden coastlines, turquoise waves, whale watching and tropical ocean breezes.",
      rating: 4.7,
      reviews: 110,
      image: "/images/package-20.jpg",
      alt: "Travelers relaxing under a blue umbrella on a Sri Lankan beach",
      featured: false,
    },
    {
      id: 3,
      name: "Yala Safari Adventure",
      days: "1 Day",
      locations: "Yala National Park / Tissamaharama",
      description:
        "Thrilling leopard tracking, wild elephants and vibrant birdlife on a guided safari.",
      rating: 4.8,
      reviews: 215,
      image: "/images/package-3.jpg",
      alt: "Elephants crossing a road beside a safari jeep",
      featured: false,
    },
    {
      id: 13,
      name: "Ella Scenic Highlands",
      days: "1 Day",
      locations: "Ella / Nine Arch Bridge / Little Adam’s Peak",
      description:
        "Iconic blue train journeys, mist-covered mountain peaks and roaring waterfalls.",
      rating: 4.9,
      reviews: 180,
      image: "/images/package-13.jpg",
      alt: "A blue train crossing the Nine Arch Bridge in Ella",
      featured: false,
    },
  ];

  try {
    for (const pkg of defaultPackages) {
      if (db.tourPackage) {
        await db.tourPackage.upsert({
          where: { id: pkg.id },
          update: {
            name: pkg.name,
            days: pkg.days,
            locations: pkg.locations,
            description: pkg.description,
            rating: pkg.rating,
            reviews: pkg.reviews,
            image: pkg.image,
            alt: pkg.alt,
            featured: pkg.featured,
          },
          create: {
            id: pkg.id,
            name: pkg.name,
            days: pkg.days,
            locations: pkg.locations,
            description: pkg.description,
            rating: pkg.rating,
            reviews: pkg.reviews,
            image: pkg.image,
            alt: pkg.alt,
            featured: pkg.featured,
          },
        });
      } else {
        await prisma.$executeRawUnsafe(
          `INSERT INTO tour_packages (id, name, days, locations, description, rating, reviews, image, alt, featured, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3), NOW(3))
           ON DUPLICATE KEY UPDATE
             name = VALUES(name),
             days = VALUES(days),
             locations = VALUES(locations),
             description = VALUES(description),
             rating = VALUES(rating),
             reviews = VALUES(reviews),
             image = VALUES(image),
             alt = VALUES(alt),
             featured = VALUES(featured),
             updatedAt = NOW(3);`,
          pkg.id,
          pkg.name,
          pkg.days,
          pkg.locations,
          pkg.description,
          pkg.rating,
          pkg.reviews,
          pkg.image,
          pkg.alt,
          pkg.featured ? 1 : 0
        );
      }
      console.log(`   ✅ Package [ID ${pkg.id}] "${pkg.name}" (${pkg.days}) seeded.`);
    }
    console.log(`✅ All Tour Packages initialized successfully.`);
  } catch (err) {
    console.error(`⚠️ Could not seed tour_packages:`, err);
  }

  // 8. Initialize / Seed Destinations (destinations)
  console.log(`🗺️ Initializing Destinations (destinations)...`);
  const defaultDestinations = [
    {
      slug: "galle-fort",
      title: "GALLE FORT",
      badge: "Heritage",
      location: "Southern Province",
      image: "/images/dest-galle-fort.jpg",
      description:
        "Galle Fort is one of the heart touched places of tourists in Sri Lanka. It is a place with historical, archeological and architectural heritage in Sri Lanka. It was constructed by Portuguese in 1588. Galle Fort is designated as a world cultural heritage by UNESCO.",
      isHomepage: true,
      isPinned: true,
      category: "heritage",
    },
    {
      slug: "hikkaduwa",
      title: "HIKKADUWA",
      badge: "Beach & Surf",
      location: "98km from Colombo",
      image: "/images/dest-hikkaduwa.jpg",
      description:
        "Hikkaduwa is an amazing small town in the Southern Province of Sri Lanka which is located 98km away from Colombo. Hikkaduwa city keeps its popularity by strong surf and beaches with restaurants and bars. Most of the tourists visit for vibrant coral sanctuaries.",
      isHomepage: true,
      isPinned: true,
      category: "beach",
    },
    {
      slug: "jungle-beach",
      title: "JUNGLE BEACH",
      badge: "Hidden Gem",
      location: "Near Unawatuna",
      image: "/images/dest-jungle-beach.jpg",
      description:
        "Among the marvelous beach sides in Sri Lanka, Jungle Beach is a beautiful beach in the jungle a few kilometers from Unawatuna. In the past, it was a secret hidden beach. A peaceful cove surrounded by dense green forest with crystal-clear turquoise waters.",
      isHomepage: true,
      category: "beach",
    },
    {
      slug: "yatagala-temple",
      title: "YATAGALA TEMPLE",
      badge: "Sacred Temple",
      location: "Inland Unawatuna",
      image: "/images/dest-yatagala-temple.jpg",
      description:
        "Yatagala Temple is one of the most important places inland Unawatuna of Galle district for temple lovers. It is built around and within giant boulder-like rock formations. People believe that Yatagala Temple has a relationship with ancient Buddhist royalty dating back 2,300 years.",
      isHomepage: true,
      category: "heritage",
    },
    {
      slug: "ambalangoda",
      title: "AMBALANGODA",
      badge: "Masks & Culture",
      location: "Galle District, 107km from Colombo",
      image: "/images/dest-ambalangoda.jpg",
      description:
        "Ambalangoda is an amazing town which is located in Galle District, Southern Province of Sri Lanka. It is situated approximately 107 kilometers away from Colombo and sits on an elevation of 13 meters above the sea level. Lots of tourists are attracted to this town for marvelous colorful wooden devil masks and puppet traditions.",
      isHomepage: true,
      category: "heritage",
    },
    {
      slug: "moonstone-mine",
      title: "MOONSTONE MINE",
      badge: "Gem Mining",
      location: "Meetiyagoda, 10km from Hikkaduwa",
      image: "/images/dest-moonstone-mine.jpg",
      description:
        "Meetiyagoda is one place to famous in Moonstone mines. It is situated about 10km away from Hikkaduwa town and 4km from the ocean. The jewelry market is the main of this. But you will be not the invitees to the showrooms only. You can get a wonderful experience with a guided tour at the main mine.",
      isHomepage: true,
      category: "heritage",
    },
    {
      slug: "ridiyagama-safari",
      title: "RIDIYAGAMA SAFARI",
      badge: "Wildlife",
      location: "Hambantota",
      image: "/images/welcome-wildlife.jpg",
      description:
        "The first animal kingdom of Sri Lanka is Ridiyagama Safari Park. It is situated in Hambantota District, Sri Lanka. This Safari Park spreads over 500 acres with an African Lion zone and Sri Lankan elephant zone.",
      isHomepage: false,
      category: "wildlife",
    },
    {
      slug: "tsunami-museum",
      title: "TSUNAMI MUSEUM",
      badge: "Heritage",
      location: "Hikkaduwa",
      image: "/images/dest-hikkaduwa.jpg",
      description:
        "The Tsunami Museum in Hikkaduwa preserves the memories and photographs of the 2004 tsunami disaster, educational exhibits on ocean warning systems, and community resilience.",
      isHomepage: false,
      category: "heritage",
    },
    {
      slug: "colombo",
      title: "COLOMBO",
      badge: "Heritage",
      location: "Colombo",
      image: "/images/services-hero-banner.jpg",
      description:
        "Colombo is the capital city of Sri Lanka, located on the west coast. Features Galle Face Green, Viharamahadevi Park, Lotus Tower, Gangaramaya Temple, and modern shopping complexes.",
      isHomepage: false,
      category: "heritage",
    },
    {
      slug: "adams-peak",
      title: "ADAMS PEAK",
      badge: "Highlands",
      location: "Ratnapura / Hatton",
      image: "/images/destination-hero-banner.jpg",
      description:
        "Adams Peak (Sri Pada) is a 2,243m high sacred mountain valuable for multiple religions, famous for sunrise vistas above the clouds and lush surrounding wilderness.",
      isHomepage: false,
      category: "highlands",
    },
    {
      slug: "dambulla",
      title: "DAMBULLA",
      badge: "Heritage",
      location: "Matale District",
      image: "/images/package-18.jpg",
      description:
        "Rangiri Dambulla Royal Cave Temple has more than 80 caves with over 150 Buddha statues and ancient murals spanning 2,100 square meters.",
      isHomepage: false,
      category: "heritage",
    },
    {
      slug: "habarana",
      title: "HABARANA",
      badge: "Wildlife",
      location: "Habarana",
      image: "/images/package-3.jpg",
      description:
        "Gateway to Minneriya and Kaudulla National Parks for wild elephant safaris, peaceful lake walks, and forested village surroundings.",
      isHomepage: false,
      category: "wildlife",
    },
    {
      slug: "kandy",
      title: "KANDY",
      badge: "Heritage",
      location: "Kandy",
      image: "/images/dest-kandy.jpg",
      description:
        "The last ancient royal kingdom capital of Sri Lanka, home to the sacred Temple of the Tooth Relic, Royal Botanical Gardens, and scenic Kandy Lake.",
      isHomepage: false,
      category: "heritage",
    },
    {
      slug: "kitulgala",
      title: "KITULGALA",
      badge: "Highlands",
      location: "Kitulgala",
      image: "/images/we-1.jpg",
      description:
        "White-water rafting hub on the Kelani River, waterfall abseiling, canyoning, and rainforest adventures in Sri Lanka's wet zone.",
      isHomepage: false,
      category: "highlands",
    },
    {
      slug: "pinnawala",
      title: "PINNAWALA",
      badge: "Wildlife",
      location: "Kegalle",
      image: "/images/welcome-wildlife.jpg",
      description:
        "Pinnawala Elephant Orphanage cares for the largest captive herd of Asian elephants, featuring daily river bathing and bottle feeding sessions.",
      isHomepage: false,
      category: "wildlife",
    },
    {
      slug: "trincomalee",
      title: "TRINCOMALEE",
      badge: "Beach",
      location: "Trincomalee",
      image: "/images/welcome-coast.jpg",
      description:
        "Deep-water natural harbor, powder-white sands of Nilaveli and Marble Beach, clifftop Koneswaram Temple, and Pigeon Island coral reef snorkeling.",
      isHomepage: false,
      category: "beach",
    },
    {
      slug: "thissamaharama",
      title: "TISSAMAHARAMA",
      badge: "Heritage",
      location: "Hambantota",
      image: "/images/about-collage-stupa-hd.jpg",
      description:
        "Ancient Tissamaharama Dagaba stupa from the 2nd century BC, serene lake sunsets over Tissa Wewa, and gateway to Yala and Bundala safaris.",
      isHomepage: false,
      category: "heritage",
    },
    {
      slug: "unawatuna",
      title: "UNAWATUNA",
      badge: "Beach",
      location: "Unawatuna",
      image: "/images/dest-jungle-beach.jpg",
      description:
        "Horseshoe-shaped sheltered bay with safe swimming, coral reefs, Japanese Peace Pagoda, lively beach dining, and water sports.",
      isHomepage: false,
      category: "beach",
    },
    {
      slug: "wasgamuwa-national-park",
      title: "WASGAMUWA NATIONAL PARK",
      badge: "Wildlife",
      location: "Matale / Polonnaruwa",
      image: "/images/about-collage-leopard-hd.jpg",
      description:
        "Wilderness sanctuary famous for large herds of elephants grazing along the Mahaweli River, sloth bears, leopards, and over 140 bird species.",
      isHomepage: false,
      category: "wildlife",
    },
    {
      slug: "yapahuwa",
      title: "YAPAHUWA",
      badge: "Heritage",
      location: "Kurunegala",
      image: "/images/package-14.jpg",
      description:
        "Ancient 13th-century rock fortress kingdom featuring a monumental ornamental stone staircase with carved lion sculptures and sacred relic chambers.",
      isHomepage: false,
      category: "heritage",
    },
    {
      slug: "piduruthalagala-mountain",
      title: "PIDURUTHALAGALA",
      badge: "Highlands",
      location: "Nuwara Eliya",
      image: "/images/dest-ella.jpg",
      description:
        "Highest geographical summit in Sri Lanka at 2,524m, surrounded by rare endemic montane cloud forests and panoramic central highlands vistas.",
      isHomepage: false,
      category: "highlands",
    },
    {
      slug: "horton-plains",
      title: "HORTON PLAINS",
      badge: "Highlands",
      location: "Central Highlands",
      image: "/images/dest-ella.jpg",
      description:
        "Misty montane grasslands and cloud forests featuring the dramatic 880-meter World's End precipice, Baker's Falls, and wild sambar deer.",
      isHomepage: false,
      category: "highlands",
    },
    {
      slug: "hakgala",
      title: "HAKGALA",
      badge: "Highlands",
      location: "Nuwara Eliya",
      image: "/images/we-2.jpg",
      description:
        "Sub-tropical highland botanical gardens nestled against the sheer 500-meter Hakgala rock crag, famous for rose gardens, fernery, and cool climate flora.",
      isHomepage: false,
      category: "highlands",
    },
    {
      slug: "royal-botanical-garden",
      title: "ROYAL BOTANICAL GARDEN",
      badge: "Heritage",
      location: "Peradeniya / Kandy",
      image: "/images/we-3.jpg",
      description:
        "147-acre world-renowned botanical haven bordered by the Mahaweli River, boasting over 4,000 plant species, orchid houses, and majestic palm avenues.",
      isHomepage: false,
      category: "heritage",
    },
    {
      slug: "mathale",
      title: "MATALE",
      badge: "Highlands",
      location: "Matale",
      image: "/images/package-18.jpg",
      description:
        "Central highland town known for fragrant spice gardens, Sembuwatta mountain lake, historic Aluvihara Cave Temple, and Riverston peaks.",
      isHomepage: false,
      category: "highlands",
    },
    {
      slug: "mathara",
      title: "MATARA",
      badge: "Beach",
      location: "Matara",
      image: "/images/dest-mirissa.jpg",
      description:
        "Historic southern coastal hub featuring Parewi Duwa island temple, 18th-century Dutch Star Fort, and serene beaches.",
      isHomepage: false,
      category: "beach",
    },
    {
      slug: "kataragama",
      title: "KATARAGAMA",
      badge: "Heritage",
      location: "Monaragala",
      image: "/images/welcome-heritage.jpg",
      description:
        "Sacred multi-faith pilgrimage destination featuring Ruhunu Maha Kataragama Devalaya and ancient Kiri Vehera stupa with evening puja rituals.",
      isHomepage: false,
      category: "heritage",
    },
    {
      slug: "arugam-bay",
      title: "ARUGAM BAY",
      badge: "Beach",
      location: "Ampara",
      image: "/images/dest-mirissa.jpg",
      description:
        "World-class right-hand point surf breaks, golden sands, Crocodile Rock sunset viewpoints, and peaceful mangrove lagoon boat safaris.",
      isHomepage: false,
      category: "beach",
    },
    {
      slug: "polonnaruwa",
      title: "POLONNARUWA",
      badge: "Heritage",
      location: "Polonnaruwa",
      image: "/images/package-19.jpg",
      description:
        "Ancient medieval capital city featuring Gal Vihara's colossal rock-carved Buddha statues, Royal Palace ruins, and Parakrama Samudra reservoir.",
      isHomepage: false,
      category: "heritage",
    },
    {
      slug: "minneriya-park",
      title: "MINNERIYA PARK",
      badge: "Wildlife",
      location: "North Central Province",
      image: "/images/package-3.jpg",
      description:
        "Famous for 'The Gathering' of hundreds of wild elephants at the Minneriya reservoir during dry season, open jeep safaris, and rich birdlife.",
      isHomepage: false,
      category: "wildlife",
    },
    {
      slug: "anuradhapura",
      title: "ANURADHAPURA",
      badge: "Heritage",
      location: "North Central Province",
      image: "/images/about-collage-stupa-hd.jpg",
      description:
        "Sri Lanka's first royal capital with ancient sacred Bodhi Tree (Jaya Sri Maha Bodhi), soaring white stupas like Ruwanwelisaya, and royal twin ponds.",
      isHomepage: false,
      category: "heritage",
    },
    {
      slug: "negombo",
      title: "NEGOMBO",
      badge: "Beach",
      location: "Western Province",
      image: "/images/dest-hikkaduwa.jpg",
      description:
        "Coastal town 10km from the international airport known as 'Little Rome' with historic Dutch canals, lively fish markets, and wide golden beaches.",
      isHomepage: false,
      category: "beach",
    },
    {
      slug: "nuwara-eliya",
      title: "NUWARA ELIYA",
      badge: "Highlands",
      location: "Central Province",
      image: "/images/dest-ella.jpg",
      description:
        "Known as 'Little England' with cool climate, colonial Tudor architecture, Gregory Lake, tea plantation tours, and fresh strawberry farms.",
      isHomepage: false,
      category: "highlands",
    },
    {
      slug: "sigiriya",
      title: "SIGIRIYA",
      badge: "Heritage",
      location: "Matale District",
      image: "/images/sigiriya.jpg",
      description:
        "Ancient 5th-century rock fortress built by King Kashyapa, featuring sheer 200m granite walls, celestial frescoes, mirror wall, and royal water gardens.",
      isHomepage: false,
      category: "heritage",
    },
    {
      slug: "sinharaja-rain-forest",
      title: "SINHARAJA RAIN FOREST",
      badge: "Wildlife",
      location: "South-West Lowlands",
      image: "/images/we-1.jpg",
      description:
        "UNESCO World Heritage primary virgin tropical rainforest with over 60% endemic flora, rare amphibians, and famous multi-species bird feeding flocks.",
      isHomepage: false,
      category: "wildlife",
    },
    {
      slug: "kanneliya",
      title: "KANNELIYA",
      badge: "Wildlife",
      location: "Galle District",
      image: "/images/we-2.jpg",
      description:
        "UNESCO lowland biosphere reserve 35km from Galle featuring lush virgin canopy trails, pure jungle streams, and Anagimale waterfall rock pools.",
      isHomepage: false,
      category: "wildlife",
    },
    {
      slug: "yala-national-park",
      title: "YALA NATIONAL PARK",
      badge: "Wildlife",
      location: "Southern & Uva Provinces",
      image: "/images/about-collage-leopard-hd.jpg",
      description:
        "Sri Lanka's premier national park boasting one of the world's highest leopard densities, wild elephants, sloth bears, and coastal scrub safaris.",
      isHomepage: false,
      category: "wildlife",
    },
    {
      slug: "mirissa",
      title: "MIRISSA",
      badge: "Beach",
      location: "Matara District",
      image: "/images/dest-mirissa.jpg",
      description:
        "Crescent-shaped tropical bay renowned as the prime global starting point for blue whale watching expeditions and scenic Coconut Tree Hill.",
      isHomepage: false,
      category: "beach",
    },
    {
      slug: "ella",
      title: "ELLA",
      badge: "Highlands",
      location: "Badulla District",
      image: "/images/dest-ella.jpg",
      description:
        "Highland mountain village featuring the iconic Nine Arch railway bridge, Little Adam's Peak, Ella Rock hike, and misty tea plantations.",
      isHomepage: false,
      category: "highlands",
    },
    {
      slug: "udawalawe",
      title: "UDAWALAWE",
      badge: "Wildlife",
      location: "Sabaragamuwa / Uva",
      image: "/images/welcome-wildlife.jpg",
      description:
        "Sprawling national park with guaranteed wild elephant sightings across open grasslands and visits to the Elephant Transit Home orphanage.",
      isHomepage: false,
      category: "wildlife",
    },
    {
      slug: "virgin-white-tea-plantation",
      title: "VIRGIN WHITE TEA PLANTATION",
      badge: "Highlands",
      location: "Handungoda / Galle",
      image: "/images/plan-trip.jpg",
      description:
        "Exclusive coastal tea estate 30 minutes from Galle Fort, world-renowned for imperial white tea harvested without human contact.",
      isHomepage: false,
      category: "highlands",
    },
  ];

  try {
    for (const dest of defaultDestinations) {
      if (db.destination) {
        await db.destination.upsert({
          where: { slug: dest.slug },
          update: {
            title: dest.title,
            badge: dest.badge,
            location: dest.location,
            description: dest.description,
            image: dest.image,
            isHomepage: dest.isHomepage,
            isPinned: (dest as any).isPinned ? true : false,
            category: dest.category,
          },
          create: {
            slug: dest.slug,
            title: dest.title,
            badge: dest.badge,
            location: dest.location,
            description: dest.description,
            image: dest.image,
            isHomepage: dest.isHomepage,
            isPinned: (dest as any).isPinned ? true : false,
            category: dest.category,
          },
        });
      } else {
        await prisma.$executeRawUnsafe(
          `INSERT INTO destinations (slug, title, badge, location, description, image, isHomepage, isPinned, category, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(3), NOW(3))
           ON DUPLICATE KEY UPDATE
             title = VALUES(title),
             badge = VALUES(badge),
             location = VALUES(location),
             description = VALUES(description),
             image = VALUES(image),
             isHomepage = VALUES(isHomepage),
             isPinned = VALUES(isPinned),
             category = VALUES(category),
             updatedAt = NOW(3);`,
          dest.slug,
          dest.title,
          dest.badge,
          dest.location,
          dest.description,
          dest.image,
          dest.isHomepage ? 1 : 0,
          (dest as any).isPinned ? 1 : 0,
          dest.category
        );
      }
    }
    console.log(`✅ All ${defaultDestinations.length} Destinations seeded successfully.`);
  } catch (err) {
    console.error(`⚠️ Could not seed destinations:`, err);
  }

  console.log(`\n🎉 Database seeding finished successfully!`);
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
