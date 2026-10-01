"use client";

import { useState } from "react";
import Link from "next/link";

export interface DestinationCardItem {
  id: string;
  title: string;
  badge: string;
  location: string;
  description: string;
  image: string;
  isHomepage?: boolean;
}

export function DestinationsView() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingDest, setEditingDest] = useState<DestinationCardItem | null>(null);

  // Exact destinations from components/landing-page/DestinationsSection.tsx & app/destination/page.tsx
  // Only the exact details used in destination cards: title, badge, location, image, description
  const [destinations, setDestinations] = useState<DestinationCardItem[]>([
    {
      id: "galle-fort",
      title: "GALLE FORT",
      badge: "Heritage",
      location: "Southern Province",
      image: "/images/dest-galle-fort.jpg",
      description:
        "Galle Fort is one of the heart touched places of tourists in Sri Lanka. It is a place with historical, archeological and architectural heritage in Sri Lanka. It was constructed by Portuguese in 1588. Galle Fort is designated as a world cultural heritage by UNESCO.",
      isHomepage: true,
    },
    {
      id: "hikkaduwa",
      title: "HIKKADUWA",
      badge: "Beach & Surf",
      location: "98km from Colombo",
      image: "/images/dest-hikkaduwa.jpg",
      description:
        "Hikkaduwa is an amazing small town in the Southern Province of Sri Lanka which is located 98km away from Colombo. Hikkaduwa city keeps its popularity by strong surf and beaches with restaurants and bars. Most of the tourists visit for vibrant coral sanctuaries.",
      isHomepage: true,
    },
    {
      id: "jungle-beach",
      title: "JUNGLE BEACH",
      badge: "Hidden Gem",
      location: "Near Unawatuna",
      image: "/images/dest-jungle-beach.jpg",
      description:
        "Among the marvelous beach sides in Sri Lanka, Jungle Beach is a beautiful beach in the jungle a few kilometers from Unawatuna. In the past, it was a secret hidden beach. A peaceful cove surrounded by dense green forest with crystal-clear turquoise waters.",
      isHomepage: true,
    },
    {
      id: "yatagala-temple",
      title: "YATAGALA TEMPLE",
      badge: "Sacred Temple",
      location: "Inland Unawatuna",
      image: "/images/dest-yatagala-temple.jpg",
      description:
        "Yatagala Temple is one of the most important places inland Unawatuna of Galle district for temple lovers. It is built around and within giant boulder-like rock formations. People believe that Yatagala Temple has a relationship with ancient Buddhist royalty dating back 2,300 years.",
      isHomepage: true,
    },
    {
      id: "ambalangoda",
      title: "AMBALANGODA",
      badge: "Masks & Culture",
      location: "Galle District, 107km from Colombo",
      image: "/images/dest-ambalangoda.jpg",
      description:
        "Ambalangoda is an amazing town which is located in Galle District, Southern Province of Sri Lanka. It is situated approximately 107 kilometers away from Colombo and sits on an elevation of 13 meters above the sea level. Lots of tourists are attracted to this town for marvelous colorful wooden devil masks and puppet traditions.",
      isHomepage: true,
    },
    {
      id: "moonstone-mine",
      title: "MOONSTONE MINE",
      badge: "Gem Mining",
      location: "Meetiyagoda, 10km from Hikkaduwa",
      image: "/images/dest-moonstone-mine.jpg",
      description:
        "Meetiyagoda is one place to famous in Moonstone mines. It is situated about 10km away from Hikkaduwa town and 4km from the ocean. The jewelry market is the main of this. But you will be not the invitees to the showrooms only. You can get a wonderful experience with a guided tour at the main mine.",
      isHomepage: true,
    },
    {
      id: "ridiyagama-safari",
      title: "RIDIYAGAMA SAFARI",
      badge: "Wildlife",
      location: "Hambantota",
      image: "/images/welcome-wildlife.jpg",
      description:
        "The first animal kingdom of Sri Lanka is Ridiyagama Safari Park. It is situated in Hambantota District, Sri Lanka. This Safari Park spreads over 500 acres with an African Lion zone and Sri Lankan elephant zone.",
      isHomepage: false,
    },
    {
      id: "tsunami-museum",
      title: "TSUNAMI MUSEUM",
      badge: "Heritage",
      location: "Hikkaduwa",
      image: "/images/dest-hikkaduwa.jpg",
      description:
        "The Tsunami Museum in Hikkaduwa preserves the memories and photographs of the 2004 tsunami disaster, educational exhibits on ocean warning systems, and community resilience.",
      isHomepage: false,
    },
    {
      id: "colombo",
      title: "COLOMBO",
      badge: "Heritage",
      location: "Colombo",
      image: "/images/services-hero-banner.jpg",
      description:
        "Colombo is the capital city of Sri Lanka, located on the west coast. Features Galle Face Green, Viharamahadevi Park, Lotus Tower, Gangaramaya Temple, and modern shopping complexes.",
      isHomepage: false,
    },
    {
      id: "adams-peak",
      title: "ADAMS PEAK",
      badge: "Highlands",
      location: "Ratnapura / Hatton",
      image: "/images/destination-hero-banner.jpg",
      description:
        "Adams Peak (Sri Pada) is a 2,243m high sacred mountain valuable for multiple religions, famous for sunrise vistas above the clouds and lush surrounding wilderness.",
      isHomepage: false,
    },
    {
      id: "dambulla",
      title: "DAMBULLA",
      badge: "Heritage",
      location: "Matale District",
      image: "/images/package-18.jpg",
      description:
        "Rangiri Dambulla Royal Cave Temple has more than 80 caves with over 150 Buddha statues and ancient murals spanning 2,100 square meters.",
      isHomepage: false,
    },
    {
      id: "habarana",
      title: "HABARANA",
      badge: "Wildlife",
      location: "Habarana",
      image: "/images/package-3.jpg",
      description:
        "Gateway to Minneriya and Kaudulla National Parks for wild elephant safaris, peaceful lake walks, and forested village surroundings.",
      isHomepage: false,
    },
    {
      id: "kandy",
      title: "KANDY",
      badge: "Heritage",
      location: "Kandy",
      image: "/images/dest-kandy.jpg",
      description:
        "The last ancient royal kingdom capital of Sri Lanka, home to the sacred Temple of the Tooth Relic, Royal Botanical Gardens, and scenic Kandy Lake.",
      isHomepage: false,
    },
    {
      id: "kitulgala",
      title: "KITULGALA",
      badge: "Highlands",
      location: "Kitulgala",
      image: "/images/we-1.jpg",
      description:
        "White-water rafting hub on the Kelani River, waterfall abseiling, canyoning, and rainforest adventures in Sri Lanka's wet zone.",
      isHomepage: false,
    },
    {
      id: "pinnawala",
      title: "PINNAWALA",
      badge: "Wildlife",
      location: "Kegalle",
      image: "/images/welcome-wildlife.jpg",
      description:
        "Pinnawala Elephant Orphanage cares for the largest captive herd of Asian elephants, featuring daily river bathing and bottle feeding sessions.",
      isHomepage: false,
    },
    {
      id: "trincomalee",
      title: "TRINCOMALEE",
      badge: "Beach",
      location: "Trincomalee",
      image: "/images/welcome-coast.jpg",
      description:
        "Deep-water natural harbor, powder-white sands of Nilaveli and Marble Beach, clifftop Koneswaram Temple, and Pigeon Island coral reef snorkeling.",
      isHomepage: false,
    },
    {
      id: "thissamaharama",
      title: "TISSAMAHARAMA",
      badge: "Heritage",
      location: "Hambantota",
      image: "/images/about-collage-stupa-hd.jpg",
      description:
        "Ancient Tissamaharama Dagaba stupa from the 2nd century BC, serene lake sunsets over Tissa Wewa, and gateway to Yala and Bundala safaris.",
      isHomepage: false,
    },
    {
      id: "unawatuna",
      title: "UNAWATUNA",
      badge: "Beach",
      location: "Unawatuna",
      image: "/images/dest-jungle-beach.jpg",
      description:
        "Horseshoe-shaped sheltered bay with safe swimming, coral reefs, Japanese Peace Pagoda, lively beach dining, and water sports.",
      isHomepage: false,
    },
    {
      id: "wasgamuwa-national-park",
      title: "WASGAMUWA NATIONAL PARK",
      badge: "Wildlife",
      location: "Matale / Polonnaruwa",
      image: "/images/about-collage-leopard-hd.jpg",
      description:
        "Wilderness sanctuary famous for large herds of elephants grazing along the Mahaweli River, sloth bears, leopards, and over 140 bird species.",
      isHomepage: false,
    },
    {
      id: "yapahuwa",
      title: "YAPAHUWA",
      badge: "Heritage",
      location: "Kurunegala",
      image: "/images/package-14.jpg",
      description:
        "Ancient 13th-century rock fortress kingdom featuring a monumental ornamental stone staircase with carved lion sculptures and sacred relic chambers.",
      isHomepage: false,
    },
    {
      id: "piduruthalagala-mountain",
      title: "PIDURUTHALAGALA",
      badge: "Highlands",
      location: "Nuwara Eliya",
      image: "/images/dest-ella.jpg",
      description:
        "Highest geographical summit in Sri Lanka at 2,524m, surrounded by rare endemic montane cloud forests and panoramic central highlands vistas.",
      isHomepage: false,
    },
    {
      id: "horton-plains",
      title: "HORTON PLAINS",
      badge: "Highlands",
      location: "Central Highlands",
      image: "/images/dest-ella.jpg",
      description:
        "Misty montane grasslands and cloud forests featuring the dramatic 880-meter World's End precipice, Baker's Falls, and wild sambar deer.",
      isHomepage: false,
    },
    {
      id: "hakgala",
      title: "HAKGALA",
      badge: "Highlands",
      location: "Nuwara Eliya",
      image: "/images/we-2.jpg",
      description:
        "Sub-tropical highland botanical gardens nestled against the sheer 500-meter Hakgala rock crag, famous for rose gardens, fernery, and cool climate flora.",
      isHomepage: false,
    },
    {
      id: "royal-botanical-garden",
      title: "ROYAL BOTANICAL GARDEN",
      badge: "Heritage",
      location: "Peradeniya / Kandy",
      image: "/images/we-3.jpg",
      description:
        "147-acre world-renowned botanical haven bordered by the Mahaweli River, boasting over 4,000 plant species, orchid houses, and majestic palm avenues.",
      isHomepage: false,
    },
    {
      id: "mathale",
      title: "MATALE",
      badge: "Highlands",
      location: "Matale",
      image: "/images/package-18.jpg",
      description:
        "Central highland town known for fragrant spice gardens, Sembuwatta mountain lake, historic Aluvihara Cave Temple, and Riverston peaks.",
      isHomepage: false,
    },
    {
      id: "mathara",
      title: "MATARA",
      badge: "Beach",
      location: "Matara",
      image: "/images/dest-mirissa.jpg",
      description:
        "Historic southern coastal hub featuring Parewi Duwa island temple, 18th-century Dutch Star Fort, and serene beaches.",
      isHomepage: false,
    },
    {
      id: "kataragama",
      title: "KATARAGAMA",
      badge: "Heritage",
      location: "Monaragala",
      image: "/images/welcome-heritage.jpg",
      description:
        "Sacred multi-faith pilgrimage destination featuring Ruhunu Maha Kataragama Devalaya and ancient Kiri Vehera stupa with evening puja rituals.",
      isHomepage: false,
    },
    {
      id: "arugam-bay",
      title: "ARUGAM BAY",
      badge: "Beach",
      location: "Ampara",
      image: "/images/dest-mirissa.jpg",
      description:
        "World-class right-hand point surf breaks, golden sands, Crocodile Rock sunset viewpoints, and peaceful mangrove lagoon boat safaris.",
      isHomepage: false,
    },
    {
      id: "polonnaruwa",
      title: "POLONNARUWA",
      badge: "Heritage",
      location: "Polonnaruwa",
      image: "/images/package-19.jpg",
      description:
        "Ancient medieval capital city featuring Gal Vihara's colossal rock-carved Buddha statues, Royal Palace ruins, and Parakrama Samudra reservoir.",
      isHomepage: false,
    },
    {
      id: "minneriya-park",
      title: "MINNERIYA PARK",
      badge: "Wildlife",
      location: "North Central Province",
      image: "/images/package-3.jpg",
      description:
        "Famous for 'The Gathering' of hundreds of wild elephants at the Minneriya reservoir during dry season, open jeep safaris, and rich birdlife.",
      isHomepage: false,
    },
    {
      id: "anuradhapura",
      title: "ANURADHAPURA",
      badge: "Heritage",
      location: "North Central Province",
      image: "/images/about-collage-stupa-hd.jpg",
      description:
        "Sri Lanka's first royal capital with ancient sacred Bodhi Tree (Jaya Sri Maha Bodhi), soaring white stupas like Ruwanwelisaya, and royal twin ponds.",
      isHomepage: false,
    },
    {
      id: "negombo",
      title: "NEGOMBO",
      badge: "Beach",
      location: "Western Province",
      image: "/images/dest-hikkaduwa.jpg",
      description:
        "Coastal town 10km from the international airport known as 'Little Rome' with historic Dutch canals, lively fish markets, and wide golden beaches.",
      isHomepage: false,
    },
    {
      id: "nuwara-eliya",
      title: "NUWARA ELIYA",
      badge: "Highlands",
      location: "Central Province",
      image: "/images/dest-ella.jpg",
      description:
        "Known as 'Little England' with cool climate, colonial Tudor architecture, Gregory Lake, tea plantation tours, and fresh strawberry farms.",
      isHomepage: false,
    },
    {
      id: "sigiriya",
      title: "SIGIRIYA",
      badge: "Heritage",
      location: "Matale District",
      image: "/images/sigiriya.jpg",
      description:
        "Ancient 5th-century rock fortress built by King Kashyapa, featuring sheer 200m granite walls, celestial frescoes, mirror wall, and royal water gardens.",
      isHomepage: false,
    },
    {
      id: "sinharaja-rain-forest",
      title: "SINHARAJA RAIN FOREST",
      badge: "Wildlife",
      location: "South-West Lowlands",
      image: "/images/we-1.jpg",
      description:
        "UNESCO World Heritage primary virgin tropical rainforest with over 60% endemic flora, rare amphibians, and famous multi-species bird feeding flocks.",
      isHomepage: false,
    },
    {
      id: "kanneliya",
      title: "KANNELIYA",
      badge: "Wildlife",
      location: "Galle District",
      image: "/images/we-2.jpg",
      description:
        "UNESCO lowland biosphere reserve 35km from Galle featuring lush virgin canopy trails, pure jungle streams, and Anagimale waterfall rock pools.",
      isHomepage: false,
    },
    {
      id: "yala-national-park",
      title: "YALA NATIONAL PARK",
      badge: "Wildlife",
      location: "Southern & Uva Provinces",
      image: "/images/about-collage-leopard-hd.jpg",
      description:
        "Sri Lanka's premier national park boasting one of the world's highest leopard densities, wild elephants, sloth bears, and coastal scrub safaris.",
      isHomepage: false,
    },
    {
      id: "mirissa",
      title: "MIRISSA",
      badge: "Beach",
      location: "Matara District",
      image: "/images/dest-mirissa.jpg",
      description:
        "Crescent-shaped tropical bay renowned as the prime global starting point for blue whale watching expeditions and scenic Coconut Tree Hill.",
      isHomepage: false,
    },
    {
      id: "ella",
      title: "ELLA",
      badge: "Highlands",
      location: "Badulla District",
      image: "/images/dest-ella.jpg",
      description:
        "Highland mountain village featuring the iconic Nine Arch railway bridge, Little Adam's Peak, Ella Rock hike, and misty tea plantations.",
      isHomepage: false,
    },
    {
      id: "udawalawe",
      title: "UDAWALAWE",
      badge: "Wildlife",
      location: "Sabaragamuwa / Uva",
      image: "/images/welcome-wildlife.jpg",
      description:
        "Sprawling national park with guaranteed wild elephant sightings across open grasslands and visits to the Elephant Transit Home orphanage.",
      isHomepage: false,
    },
    {
      id: "virgin-white-tea-plantation",
      title: "VIRGIN WHITE TEA PLANTATION",
      badge: "Highlands",
      location: "Handungoda / Galle",
      image: "/images/plan-trip.jpg",
      description:
        "Exclusive coastal tea estate 30 minutes from Galle Fort, world-renowned for imperial white tea harvested without human contact.",
      isHomepage: false,
    },
  ]);

  const filtered = destinations.filter((dest) => {
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "homepage" && dest.isHomepage) ||
      dest.badge.toLowerCase().includes(selectedFilter.toLowerCase());

    const matchesSearch =
      searchQuery.trim() === "" ||
      dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const homepageCount = destinations.filter((d) => d.isHomepage).length;

  const handleSave = (updated: DestinationCardItem) => {
    if (editingDest) {
      setDestinations((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    } else {
      setDestinations((prev) => [...prev, updated]);
    }
    setShowModal(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          padding: "24px 28px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#073e36", margin: 0 }}>
              Destination Cards Manager
            </h1>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: "4px",
                background: "#ecfdf5",
                color: "#065f46",
              }}
            >
              Controls: Homepage & /destination Cards
            </span>
          </div>
          <p style={{ fontSize: "13.5px", color: "#64748b", margin: 0 }}>
            Managing <strong>{destinations.length} destination cards</strong> ({homepageCount} featured on Homepage). Using only the exact details shown on public destination cards.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link
            href="/destination"
            target="_blank"
            style={{
              background: "#f1f5f9",
              border: "1px solid #cbd5e1",
              color: "#073e36",
              padding: "9px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ↗ View /destination
          </Link>
          <Link
            href="/#destinations"
            target="_blank"
            style={{
              background: "#f1f5f9",
              border: "1px solid #cbd5e1",
              color: "#073e36",
              padding: "9px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ↗ View Homepage Cards
          </Link>

          <button
            onClick={() => {
              setEditingDest(null);
              setShowModal(true);
            }}
            style={{
              background: "#073e36",
              color: "#ffffff",
              border: "none",
              padding: "9px 18px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span>+</span> Add Destination Card
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[
            { id: "all", label: `All Cards (${destinations.length})` },
            { id: "homepage", label: `★ Homepage Cards (${homepageCount})` },
            { id: "heritage", label: "Heritage" },
            { id: "beach", label: "Beach" },
            { id: "wildlife", label: "Wildlife" },
            { id: "highlands", label: "Highlands" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              style={{
                padding: "7px 16px",
                borderRadius: "20px",
                fontSize: "12.5px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                background: selectedFilter === cat.id ? "#073e36" : "#ffffff",
                color: selectedFilter === cat.id ? "#ffffff" : "#475569",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search destination cards..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "8px 14px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            fontSize: "13px",
            minWidth: "240px",
            background: "#ffffff",
          }}
        />
      </div>

      {/* Destinations Grid - Using ONLY card details: Image, Badge, Title, Location, Description */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {filtered.map((dest) => (
          <div
            key={dest.id}
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 2px 4px rgba(0,0,0,0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Card Media with Badge Overlay */}
            <div
              style={{
                height: "175px",
                backgroundImage: `url(${dest.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  display: "flex",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    background: "rgba(255, 255, 255, 0.94)",
                    color: "#073e36",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "3px 9px",
                    borderRadius: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.4px",
                  }}
                >
                  {dest.badge}
                </span>

                {dest.isHomepage && (
                  <span
                    style={{
                      background: "#f0642b",
                      color: "#ffffff",
                      fontSize: "11px",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    ★ Homepage Card
                  </span>
                )}
              </div>
            </div>

            {/* Card Body - ONLY Title, Location, Description */}
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "8px",
                  color: "#f0642b",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span style={{ color: "#556c75" }}>{dest.location}</span>
              </div>

              <h2
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  color: "#073e36",
                  margin: "0 0 10px 0",
                  textTransform: "uppercase",
                  letterSpacing: "-0.2px",
                }}
              >
                {dest.title}
              </h2>

              <p
                style={{
                  fontSize: "13px",
                  color: "#556c75",
                  margin: "0 0 16px 0",
                  lineHeight: 1.55,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {dest.description}
              </p>

              {/* Card Footer Actions */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "12px",
                  borderTop: "1px solid #edf2f7",
                }}
              >
                <span style={{ fontSize: "11px", color: "#94a3b8" }}>
                  Image: <code>{dest.image}</code>
                </span>

                <button
                  onClick={() => {
                    setEditingDest(dest);
                    setShowModal(true);
                  }}
                  style={{
                    background: "#073e36",
                    color: "#ffffff",
                    border: "none",
                    padding: "7px 16px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Edit Card
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal - Exactly matching the card details: Title, Badge, Location, Image, Description */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "28px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ fontSize: "19px", fontWeight: 800, color: "#073e36", margin: 0 }}>
                {editingDest ? `Edit: ${editingDest.title}` : "Add New Destination Card"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const updated: DestinationCardItem = {
                  id: editingDest
                    ? editingDest.id
                    : (form.elements.namedItem("title") as HTMLInputElement).value
                        .toLowerCase()
                        .replace(/\s+/g, "-"),
                  title: (form.elements.namedItem("title") as HTMLInputElement).value,
                  badge: (form.elements.namedItem("badge") as HTMLInputElement).value,
                  location: (form.elements.namedItem("location") as HTMLInputElement).value,
                  image: (form.elements.namedItem("image") as HTMLInputElement).value,
                  description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
                  isHomepage: (form.elements.namedItem("isHomepage") as HTMLInputElement).checked,
                };
                handleSave(updated);
              }}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Destination Title
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  defaultValue={editingDest?.title || ""}
                  placeholder="e.g. GALLE FORT"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#334155",
                      marginBottom: "6px",
                    }}
                  >
                    Badge / Category Tag
                  </label>
                  <input
                    name="badge"
                    type="text"
                    required
                    defaultValue={editingDest?.badge || "Heritage"}
                    placeholder="e.g. Heritage, Beach & Surf, Wildlife"
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#334155",
                      marginBottom: "6px",
                    }}
                  >
                    Location
                  </label>
                  <input
                    name="location"
                    type="text"
                    required
                    defaultValue={editingDest?.location || ""}
                    placeholder="e.g. Southern Province"
                    style={{
                      width: "100%",
                      padding: "9px 12px",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Image Path
                </label>
                <input
                  name="image"
                  type="text"
                  required
                  defaultValue={editingDest?.image || "/images/dest-galle-fort.jpg"}
                  placeholder="e.g. /images/dest-galle-fort.jpg"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#334155",
                    marginBottom: "6px",
                  }}
                >
                  Card Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  defaultValue={editingDest?.description || ""}
                  placeholder="Enter the destination overview paragraph shown on the card..."
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "8px",
                    fontSize: "13px",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 12px",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <input
                  type="checkbox"
                  name="isHomepage"
                  id="isHomepage"
                  defaultChecked={editingDest ? !!editingDest.isHomepage : false}
                  style={{ width: "16px", height: "16px", accentColor: "#f0642b", cursor: "pointer" }}
                />
                <label
                  htmlFor="isHomepage"
                  style={{ fontSize: "12.5px", fontWeight: 600, color: "#334155", cursor: "pointer" }}
                >
                  Feature in Homepage &quot;Top Destinations in Sri Lanka&quot; section
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    background: "#f1f5f9",
                    border: "1px solid #cbd5e1",
                    padding: "9px 16px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: "#073e36",
                    color: "#ffffff",
                    border: "none",
                    padding: "9px 18px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Update Destination Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
