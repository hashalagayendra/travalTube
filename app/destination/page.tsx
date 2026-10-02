"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer";
import { SearchDialog } from "@/components/landing-page/SearchDialog";

interface DestinationItem {
  id: string;
  location: string;
  title: string;
  category: "all" | "beach" | "heritage" | "wildlife" | "highlands";
  image: string;
  description: string;
  highlights: string[];
  duration: string;
  bestSeason: string;
  isPinned?: boolean;
}

const allDestinations: DestinationItem[] = [
  {
    id: "galle-fort",
    location: "Galle",
    title: "GALLE FORT",
    category: "heritage",
    image: "/images/dest-galle-fort.jpg",
    description:
      "Galle Fort is one of the heart touched places of tourists in Sri Lanka. It is a place with historical, archeological and architectural heritage in Sri Lanka. It was constructed by Portuguese in 1588. Galle Fort is designated as a world cultural heritage by UNESCO. This wonderful place explores European architecture and South Asian traditions as well. So many tourists will never forget to visit this place. The amazing sun rising scenery surely will catch your eyes. The Galle Fort is known as Dutch Fort or the 'Ramparts of Galle'. De Groote Kerk, Old Dutch Hospital, National Maritime Archaeology Museum are some of the other beautiful places you can visit in Galle Fort.",
    highlights: [
      "17th Century Dutch Ramparts & Bastions",
      "Historic Lighthouse overlooking the Indian Ocean",
      "De Groote Kerk & Old Dutch Hospital",
    ],
    duration: "Full Day / Overnight",
    bestSeason: "November – April",
    isPinned: true,
  },
  {
    id: "hikkaduwa",
    location: "Hikkaduwa",
    title: "HIKKADUWA",
    category: "beach",
    image: "/images/dest-hikkaduwa.jpg",
    description:
      "Hikkaduwa is an amazing small town in the Southern Province of Sri Lanka which is located 98km away from Colombo. Hikkaduwa city keeps its popularity by strong surf and beaches with restaurants and bars. Most of the tourists visit Hikkaduwa to see the wonderful coral sanctuary and it has 70 varieties of multicolors. It is located a few hundred meters offshore. Watching turtles, Surfing, you can Go to Tsunami Museum. You can enjoy delicious seafood, Other than all your traveling milestones you will enjoy these variety of seafood. Hikkaduwa is the place that is designated as the second best-surfing spot in Sri Lanka.",
    highlights: [
      "70+ multicolored coral species sanctuary",
      "Wild sea turtle watching in shallow surf",
      "Second best surfing destination in Sri Lanka",
    ],
    duration: "1 – 3 Days",
    bestSeason: "November – April",
    isPinned: true,
  },
  {
    id: "jungle-beach",
    location: "Unawatuna",
    title: "JUNGLE BEACH",
    category: "beach",
    image: "/images/dest-jungle-beach.jpg",
    description:
      "Among the marvelous beach sides in Sri Lanka, Jungle Beach is a beautiful beach in the jungle a few kilometers from Unawatuna. In the past, it was a secret hidden beach. Because of the nice weather, lots of tourists are attracted to this place. The Jungle beach gives you an amazing feeling. The beautiful and calm beach, sunbeds, nice weather, greeny surrounding and shiny sands will help you to enjoy your travel.",
    highlights: [
      "Secluded jungle trail walk to the shore",
      "Calm turquoise waters for snorkeling and swimming",
      "Dense rainforest canopy framing golden sand",
    ],
    duration: "Half Day",
    bestSeason: "November – April",
  },
  {
    id: "yatagala-temple",
    location: "Inland Unawatuna",
    title: "YATAGALA TEMPLE",
    category: "heritage",
    image: "/images/dest-yatagala-temple.jpg",
    description:
      "Yatagala Temple is one of the most important places inland Unawatuna of Galle district for temple lovers. It is built around and within giant boulder-like rock formations. People believe that Yatagala Temple has a relationship with the Anuradhapura Kingdom. In this temple, you can see a large statue of Buddha which is nine meters in length. Lord Buddha's lifestyle and other interesting things are painted in the temple. During your travel to Yatagala Temple you will get a mental and physical relaxation for sure.",
    highlights: [
      "Built inside colossal granite rock boulders",
      "Nine-meter reclining Buddha statue",
      "Ancient Anuradhapura era historic connection",
    ],
    duration: "2 – 3 Hours",
    bestSeason: "Year Round",
  },
  {
    id: "ambalangoda",
    location: "Ambalangoda",
    title: "AMBALANGODA",
    category: "heritage",
    image: "/images/dest-ambalangoda.jpg",
    description:
      "Ambalangoda is an amazing town which is located in Galle District, Southern Province of Sri Lanka, approximately 107 kilometers from Colombo. The main reason for this attraction is the marvelous colorful wooden devil masks and puppets in Sri Lanka and to catch the historical story behind these ubiquitous devil masks. Dutch Courthouse, Sunandarama Temple, Madhu River Wetlands are the other attractive milestones in Ambalangoda. And the most enjoyable thing for you is here you can enjoy the traditional mask dancing shows.",
    highlights: [
      "World-famous Ariyapala traditional mask workshops",
      "Traditional Kolam and devil mask dancing performances",
      "Madhu River wetlands and Dutch heritage architecture",
    ],
    duration: "Half Day",
    bestSeason: "November – April",
  },
  {
    id: "moonstone-mine",
    location: "Meetiyagoda",
    title: "MOONSTONE MINE",
    category: "heritage",
    image: "/images/dest-moonstone-mine.jpg",
    description:
      "Meetiyagoda is one place famous in Moonstone mines. It is situated about 10km away from Hikkaduwa town and 4km from the ocean. You can get a wonderful experience with a guided tour at the main mine in the adjacent village of Domanwila. The world-famous Moonstone mining place in Sri Lanka is Meetiyagoda. There are historical stories about Moonstone mines related to European travelers and sellers. Tourists who are interested in the jewellery side in Sri Lanka never forget to visit this place.",
    highlights: [
      "World's primary source of rare blue moonstones",
      "Down-in-the-mine guided artisanal shafts tour",
      "Traditional gem cutting and polishing demonstrations",
    ],
    duration: "2 Hours",
    bestSeason: "Year Round",
  },
  {
    id: "ridiyagama-safari",
    location: "Hambantota",
    title: "RIDIYAGAMA SAFARI",
    category: "wildlife",
    image: "/images/welcome-wildlife.jpg",
    description:
      "The first animal kingdom of Sri Lanka is Ridiyagama Safari Park. It is situated in Hambantota District, Sri Lanka. This Safari Park spreads over 500 acres. Ridiyagama Safari park is divided into six zones. Among them, 4 zones are for carnivorous animals and 2 zones are for herbivorous animals. The African Lion zone with 35 acres and Sri Lankan elephant zone with 54 acres are opened for the public as the first phase. In your traveling schedule do not forget to add this place as Yala and Udawalawe.",
    highlights: [
      "500-acre open-concept drive-through safari park",
      "35-acre dedicated African Lion roaming zone",
      "54-acre Sri Lankan Asian elephant sanctuary",
    ],
    duration: "Half Day",
    bestSeason: "Year Round",
  },
  {
    id: "tsunami-museum",
    location: "Hikkaduwa",
    title: "TSUNAMI MUSEUM",
    category: "heritage",
    image: "/images/dest-hikkaduwa.jpg",
    description:
      "Do you like to get an emotional experience on your trip? One only place for that is the Tsunami Museum in Hikkaduwa, Sri Lanka. Tsunami Museum is the place where we can get all the details of the Tsunami disaster and where we can see the photographs of that emotional experience in 2004. Here you can learn how a tsunami occurs, how it is measured and what warning systems that we can use to decrease the damage. Do not forget to visit the Tsunami Museum and add something new to your knowledge.",
    highlights: [
      "Compelling photographic archive of 2004 Indian Ocean Tsunami",
      "Scientific exhibits on oceanic tectonic wave warning systems",
      "Inspirational community rebuild and resilience stories",
    ],
    duration: "1 – 2 Hours",
    bestSeason: "Year Round",
  },
  {
    id: "colombo",
    location: "Colombo",
    title: "COLOMBO",
    category: "heritage",
    image: "/images/services-hero-banner.jpg",
    description:
      "Colombo is the capital city of Sri Lanka, located on the west coast of the island. Colombo City is a world full of nice destinations: Galle Face Green, Viharamahadevi Park, Beira Lake, Dutch Hospital, National Museum, Gangarama Temple, Nelum Pokuna Theatre, Lotus Tower, Mount Lavinia beach and Independence Square. There are so many large shopping complexes like Colombo City Center and One Galle Face.",
    highlights: [
      "Iconic Lotus Tower with panoramic revolving dining",
      "Vibrant Galle Face Green oceanfront promenade",
      "Sacred Seema Malaka & Gangaramaya Buddhist temples",
    ],
    duration: "1 – 2 Days",
    bestSeason: "November – April",
  },
  {
    id: "adams-peak",
    location: "Ratnapura / Hatton",
    title: "ADAMS PEAK",
    category: "highlands",
    image: "/images/destination-hero-banner.jpg",
    description:
      "Adams Peak (Sri Pada) is a 2,243m high sacred mountain valuable for Buddhists, Hindus, Muslims and Christians. Many religions have stories related to this mountain. Lots of people believe their religious leader's footprint is on the top of this mountain. Tourists visit this place not only for worship, but to see a beautiful surrounding with forested mountains, waterfalls, rivers, streams and wildlife.",
    highlights: [
      "Sacred 2,243m summit pilgrimage above the clouds",
      "Legendary 'Shadow of the Peak' triangular sunrise spectacle",
      "Surrounding lush Peak Wilderness Sanctuary",
    ],
    duration: "Full Night / Sunrise Climb",
    bestSeason: "December – May",
  },
  {
    id: "dambulla",
    location: "Matale District",
    title: "DAMBULLA",
    category: "heritage",
    image: "/images/package-18.jpg",
    description:
      "Dambulla City has immense historical and religious value. Rangiri Dambulla Royal Cave Temple, Pidurangala Royal Cave Temple, Ibbankatuwa Megalithic Tombs, and Kandalama lake are great places which attract tourists. Rangiri Dambulla Cave Temple takes a prominent place, with more than 80 caves in the surrounding area. Do not miss this place in your traveling schedule.",
    highlights: [
      "UNESCO World Heritage Cave Temple with 150+ Buddha statues",
      "Ancient ceiling murals spanning over 2,100 square meters",
      "Panoramic views overlooking Sigiriya and Kandalama",
    ],
    duration: "Half Day",
    bestSeason: "Year Round",
  },
  {
    id: "habarana",
    location: "Habarana",
    title: "HABARANA",
    category: "wildlife",
    image: "/images/package-3.jpg",
    description:
      "For safari lovers, Habarana is the best place. Lots of tourists are attracted to this small city because of elephant encounters and safaris. You can visit Habarana Buddhist Temple, Habarana Lake, Hurulu Eco Park, and Kaudulla National Park. This small city is full of cultural and natural attractions, forested surroundings, mountain hikes and safaris.",
    highlights: [
      "Central gateway to Minneriya & Kaudulla elephant safaris",
      "Scenic Habarana Lake village walks and boat rides",
      "Hurulu Eco Park jeep excursions",
    ],
    duration: "1 – 2 Days",
    bestSeason: "July – October",
  },
  {
    id: "kandy",
    location: "Kandy",
    title: "KANDY",
    category: "heritage",
    image: "/images/dest-kandy.jpg",
    description:
      "Kandy is a major city in Central Province which has historical, religious and natural value. Kandy City is the last capital city of the ancient kings era. Places to visit in Kandy include the Temple of the Tooth, Gadaladeniya, Embekke, Ambuluwawa, Nelligala, Hanthana mountain range, and Knuckles mountain range.",
    highlights: [
      "Sacred Sri Dalada Maligawa (Temple of the Sacred Tooth Relic)",
      "Peaceful walks along the historic Kandy lakefront",
      "Peradeniya Royal Botanical Gardens & cultural dance shows",
    ],
    duration: "1 – 2 Days",
    bestSeason: "January – April",
  },
  {
    id: "kitulgala",
    location: "Kitulgala",
    title: "KITULGALA",
    category: "highlands",
    image: "/images/we-1.jpg",
    description:
      "Kitulgala is a rain forest in the wet zone on the west side of Sri Lanka. Kitulgala is popular among Sri Lankans and tourists because of white water rafting starting a few kilometers upstream on the Kelani River. For adventure-based training and adrenaline, this is the most suitable place. In drier months it provides an attractive place to swim, with rich plant and animal species.",
    highlights: [
      "Thrilling Grade 3 & 4 white water river rafting",
      "Waterfall abseiling, canyoning and river canyon jumping",
      "Filming location of the Oscar-winning 'Bridge on the River Kwai'",
    ],
    duration: "Full Day / Adventure Trip",
    bestSeason: "Year Round",
  },
  {
    id: "pinnawala",
    location: "Kegalle",
    title: "PINNAWALA",
    category: "wildlife",
    image: "/images/welcome-wildlife.jpg",
    description:
      "When we hear about Pinnawala we memorize the Pinnawala Elephant Orphanage. In Pinnawala, you can see the largest herd of captive elephants in the world. This elephant orphanage is built to protect and care for unweaned wild elephants. You can see elephants bathing in the river and feeding. Tourists love this place very much.",
    highlights: [
      "Largest herd of Asian elephants in human care",
      "Spectacular daily river bathing march at Maha Oya",
      "Baby elephant milk bottle feeding sessions",
    ],
    duration: "Half Day",
    bestSeason: "Year Round",
  },
  {
    id: "trincomalee",
    location: "Trincomalee",
    title: "TRINCOMALEE",
    category: "beach",
    image: "/images/welcome-coast.jpg",
    description:
      "Trincomalee is one of the best attractive cities in the Northern Province of Sri Lanka. The major thing is the amazing beach and the natural deep-water harbor. Koneswaram Kovil, Pigeon Island, Marble Beach, and Nilaweli Beach are some of the places that you can enjoy. If you are searching for a place to relax your mind with nice sunshine and pristine beaches, this is the best place.",
    highlights: [
      "Pigeon Island National Park coral reef snorkeling",
      "Clifftop sacred Koneswaram Temple overlooking Swami Rock",
      "Powder-white sands of Nilaveli and Marble Beach",
    ],
    duration: "2 – 4 Days",
    bestSeason: "April – October",
  },
  {
    id: "thissamaharama",
    location: "Hambantota",
    title: "THISSAMAHARAMAYA",
    category: "heritage",
    image: "/images/about-collage-stupa-hd.jpg",
    description:
      "Tissamaharama is a town in Hambantota district, Southern province of Sri Lanka. Tissamaharama is a beautiful city full of natural beauty. The surrounding is decorated by Tissamaharama Dagaba, Tissamaharama lake, paddy fields and lakes. It gives you an amazing feeling of authentic village life. Yala and Bundala National Parks play a major role nearby.",
    highlights: [
      "Ancient Tissamaharama Dagaba stupa dating back to 2nd century BC",
      "Serene scenic sunsets over Tissa Wewa reservoir",
      "Strategic gateway for Yala and Bundala birding safaris",
    ],
    duration: "1 – 2 Days",
    bestSeason: "November – April",
  },
  {
    id: "unawatuna",
    location: "Unawatuna",
    title: "UNAWATUNA",
    category: "beach",
    image: "/images/dest-jungle-beach.jpg",
    description:
      "Unawatuna is a coastal town in Galle district, Southern province. The major attraction of tourists to this place is the beach full of beauty and valuable corals. Jungle Beach is also near Unawatuna beach. Delicious seafood will surely give you an amazing experience, and surfing is another nice adventure you can get from Unawatuna.",
    highlights: [
      "Horseshoe-shaped sheltered bay with safe swimming",
      "Vibrant beachfront dining, cocktail shacks and live music",
      "Close proximity to Japanese Peace Pagoda & Jungle Beach",
    ],
    duration: "2 – 4 Days",
    bestSeason: "November – April",
  },
  {
    id: "wasgamuwa-national-park",
    location: "Matale / Polonnaruwa",
    title: "WASGAMUWA NATIONAL PARK",
    category: "wildlife",
    image: "/images/about-collage-leopard-hd.jpg",
    description:
      "Wasgamuwa National Park was built to protect wild animals. In Wasgamuwa National Park we can see elephants in large herds and important bird areas. This park spreads over 36,900 hectares. This park is distinguished from other parks because of many species of sloth bears, offering an authentic wilderness wildlife experience.",
    highlights: [
      "Exceptional sloth bear and leopard habitat",
      "Herds of wild elephants grazing along the Mahaweli River",
      "Over 140 recorded resident and migratory bird species",
    ],
    duration: "Full Day Safari",
    bestSeason: "May – September",
  },
  {
    id: "yapahuwa",
    location: "Kurunegala",
    title: "YAPAHUWA",
    category: "heritage",
    image: "/images/package-14.jpg",
    description:
      "Yapahuwa is a royal kingdom in ancient times in Sri Lanka built by King Buwanekabahu. It is a valuable and historical place proving our proud history. You can see how our ancient people's stone technology is high from the wonderful rock creations and monumental ornamental staircase. You can learn more about our history by visiting this place.",
    highlights: [
      "Dramatic 90-meter sheer granite fortress rock",
      "Masterpiece monumental stone staircase with lion sculptures",
      "Ancient royal relic chamber ruins and caves",
    ],
    duration: "Half Day",
    bestSeason: "Year Round",
  },
  {
    id: "piduruthalagala-mountain",
    location: "Nuwara Eliya",
    title: "PIDURUTHALAGALA MOUNTAIN",
    category: "highlands",
    image: "/images/dest-ella.jpg",
    description:
      "Piduruthalagala is the tallest mountain in Sri Lanka reaching 2,524 meters. It is situated North-North-East from the town of Nuwara Eliya, easily visible from Central Province. The surrounding is full of greenery and rare endemic montane plants, trees, and animals, with beautiful panoramic views of Sri Lanka.",
    highlights: [
      "Highest geographical point in Sri Lanka (2,524m)",
      "Lush cloud forest with endemic highland flora",
      "Expansive views over Nuwara Eliya and central massifs",
    ],
    duration: "Half Day",
    bestSeason: "January – April",
  },
  {
    id: "horton-plains",
    location: "Central Highlands",
    title: "HORTON PLAINS",
    category: "highlands",
    image: "/images/dest-ella.jpg",
    description:
      "Horton Plains National Park is a protected area covered by cloud forests and montane grasslands, situated 32km from Nuwara Eliya. It is a popular destination because of amazing natural beauty, serving as headwaters of Mahaweli, Kelani, and Walawe rivers. Rare plants, species of birds, Baker's Falls and World's End will touch your heart.",
    highlights: [
      "Breathtaking 880-meter vertical drop at World's End",
      "Scenic hike to roaring Baker's Falls",
      "Encounters with wild Sambar deer on the plains",
    ],
    duration: "Morning Trek (4 – 5 Hours)",
    bestSeason: "January – March",
  },
  {
    id: "hakgala",
    location: "Nuwara Eliya",
    title: "HAKGALA",
    category: "highlands",
    image: "/images/we-2.jpg",
    description:
      "Hakgala is a beautiful town in Nuwara Eliya district with nice climate and surrounding full of natural beauty. Hakgala Botanical Garden is the second-largest garden in Sri Lanka, situated 12km from Nuwara Eliya. It has a peak of visitors in the spring season because flowers bloom beautifully alongside Hakgala Rock.",
    highlights: [
      "Second largest botanical garden in Sri Lanka",
      "Extensive sub-tropical rose gardens and fernery",
      "Sheer 500-meter Hakgala crag mountain backdrop",
    ],
    duration: "2 – 3 Hours",
    bestSeason: "March – May",
  },
  {
    id: "royal-botanical-garden",
    location: "Peradeniya / Kandy",
    title: "ROYAL BOTANICAL GARDEN",
    category: "heritage",
    image: "/images/we-3.jpg",
    description:
      "Royal Botanical Garden is situated in Peradeniya about 5.5km west of Kandy. Annually it attracts over 2 million visitors to see more than 4,000 species of plants including orchids, rare endemic trees, and medicinal plants. Mahaweli River wraps around this 147-acre garden at 460m above sea level with calm natural surroundings.",
    highlights: [
      "World-class orchid house with hundreds of species",
      "Avenue of Royal Palms and soaring cannonball trees",
      "Enormous century-old giant Javan fig tree lawn",
    ],
    duration: "Half Day",
    bestSeason: "Year Round",
  },
  {
    id: "mathale",
    location: "Matale",
    title: "MATHALE",
    category: "highlands",
    image: "/images/package-18.jpg",
    description:
      "Matale is a town full of natural beauty in Central Province, 142km from Colombo. Lots of people visit Matale for Sembuwatta lake, Kalebokka 360 view point, Aluvihara temple, Knuckles mountain range, Nalanda Gedige, Riverston, Pitawala Pathana and waterfalls like Sera Ella, blessed with cool climate and spice gardens.",
    highlights: [
      "Scenic Sembuwatta man-made pine mountain lake",
      "Historic Aluvihara Cave Temple where Tripitaka was written",
      "Misty Riverston Peak and Pitawala Pathana plains",
    ],
    duration: "1 – 2 Days",
    bestSeason: "Year Round",
  },
  {
    id: "mathara",
    location: "Matara",
    title: "MATHARA",
    category: "beach",
    image: "/images/dest-mirissa.jpg",
    description:
      "Matara is a major city in Southern Province, 160km from Colombo. Matara city has a beautiful beach and places like Parewi Dupatha island temple, Wewurukannala temple, Weherahena temple, and Dutch Reformed Church. Matara is a beautiful place for culture, seafood, relaxation, and adventure.",
    highlights: [
      "Picturesque Parewi Duwa shrine connected by suspension bridge",
      "Weherahena and Wewurukannala colossal Buddha statues",
      "Historic 18th-century Dutch Star Fort",
    ],
    duration: "1 – 2 Days",
    bestSeason: "November – April",
  },
  {
    id: "kataragama",
    location: "Monaragala",
    title: "KATARAGAMA",
    category: "heritage",
    image: "/images/welcome-heritage.jpg",
    description:
      "Kataragama is located in Monaragala district, a pilgrimage city for Buddhism, Hinduism, and Veddas in Sri Lanka as well as South India. Kataragama Devalaya and Kiri Vehera stupa stand side by side, allowing travelers to experience deep spiritual blessings, cultural rituals, and ancient traditions.",
    highlights: [
      "Sacred Ruhunu Maha Kataragama Devalaya shrine",
      "Ancient Kiri Vehera Buddhist stupa dating back to 6th century BC",
      "Vibrant evening puja rituals with camphor flames and drums",
    ],
    duration: "1 – 2 Days",
    bestSeason: "July – August",
  },
  {
    id: "arugam-bay",
    location: "Ampara",
    title: "ARUGAM BAY",
    category: "beach",
    image: "/images/dest-mirissa.jpg",
    description:
      "Arugam Bay keeps its popularity because of wide beautiful sandy beaches and world-class surfing points. There you can enjoy surfing, diving, wildlife safaris and bird watching. Muhudu Maha Viharaya, Magul Maha Viharaya, Pottuvil Point, Crocodile Rock and Okanda are prominent places to visit.",
    highlights: [
      "Internationally celebrated right-hand point surf breaks",
      "Scenic Crocodile Rock and Elephant Rock sunset vantage points",
      "Pottuvil lagoon peaceful mangrove boat safaris",
    ],
    duration: "3 – 5 Days",
    bestSeason: "May – September",
  },
  {
    id: "polonnaruwa",
    location: "Polonnaruwa",
    title: "POLONNARUWA",
    category: "heritage",
    image: "/images/package-19.jpg",
    description:
      "Polonnaruwa is an ancient royal city in North Central Province which has proud historical value. It consists of temples and palaces including the Royal Palace, Audience Hall, Sacred Quadrangle, Shiva Devale, Pabalu Vehera, Rankoth Vihara, Lankatilaka, and the world-renowned Gal Viharaya rock statues.",
    highlights: [
      "Gal Vihara rock temple with colossal carved Buddha statues",
      "Ancient Parakrama Samudra reservoir engineering marvel",
      "Royal Palace and Sacred Quadrangle architectural ruins",
    ],
    duration: "Full Day",
    bestSeason: "Year Round",
  },
  {
    id: "minneriya-park",
    location: "North Central Province",
    title: "MINNERIYA PARK",
    category: "wildlife",
    image: "/images/package-3.jpg",
    description:
      "Minneriya National Park spreads over 90 square kilometers in the dry zone. Home to buffalos, deer, purple-faced leaf monkeys, and lovely birdlife, it is most famous for 'The Gathering' of hundreds of Asian elephants on the shores of the ancient Minneriya reservoir during dry months.",
    highlights: [
      "The Gathering: World's largest congregation of wild Asian elephants",
      "Open jeep safaris across sweeping reservoir grasslands",
      "Rich endemic birdlife, leopards and sambar deer",
    ],
    duration: "Afternoon Safari (3 – 4 Hours)",
    bestSeason: "July – October",
  },
  {
    id: "anuradhapura",
    location: "North Central Province",
    title: "ANURADHAPURA",
    category: "heritage",
    image: "/images/about-collage-stupa-hd.jpg",
    description:
      "Anuradhapura was the first ancient capital city of Sri Lanka with proud history and religious value. Buddhists worldwide know this city because Sri Maha Bodhiya is situated here, the oldest historically documented tree in the world. Other monumental places include Ruwanwelisaya, Kuttam Pokuna twin ponds, Isurumuniya, and Samadhi Statue.",
    highlights: [
      "Sacred Jaya Sri Maha Bodhi tree planted in 288 BC",
      "Magnificent white Ruwanwelisaya and Jetavanaramaya stupas",
      "Ancient royal Kuttam Pokuna twin bathing pools",
    ],
    duration: "1 – 2 Days",
    bestSeason: "Year Round",
  },
  {
    id: "negambo",
    location: "Western Province",
    title: "NEGOMBO",
    category: "beach",
    image: "/images/dest-hikkaduwa.jpg",
    description:
      "Negombo is a beautiful coastal town 10km from Bandaranaike International Airport. Popular due to sandy beaches and historic fishing industry. Known as 'Little Rome' for its large beautiful Catholic churches, bustling fish markets, lagoon boat rides, hotels, and nightlife along the beach.",
    highlights: [
      "Lively traditional Lellama lagoon fish markets",
      "Historic Dutch canal boat cruises and Dutch Fort",
      "Sun-soaked sandy beaches lined with resorts and restaurants",
    ],
    duration: "1 – 2 Days",
    bestSeason: "November – April",
  },
  {
    id: "nuwara-eliya",
    location: "Central Province",
    title: "NUWARA ELIYA",
    category: "highlands",
    image: "/images/dest-ella.jpg",
    description:
      "Nuwara Eliya is known as 'Little England' with cool subtropical highland climate, tea plantations, and natural beauty. Key places include Victoria Park, Gregory Lake, Bakers Falls, Hakgala garden, and Horton Plains, famous for fresh strawberries and world-renowned Ceylon high-grown tea.",
    highlights: [
      "Scenic pedal boating and strolls around Gregory Lake",
      "Century-old colonial Tudor architecture and Queen's Cottage",
      "Pedro and Mackwoods world-class tea estate tours",
    ],
    duration: "2 – 3 Days",
    bestSeason: "December – April",
  },
  {
    id: "sigiriya",
    location: "Matale District",
    title: "SIGIRIYA",
    category: "heritage",
    image: "/images/sigiriya.jpg",
    description:
      "Known as the 8th Wonder of the World, Sigiriya is an ancient rock fortress in Matale district near Dambulla built by King Kashyapa in the 5th century. Tourists visit this kingdom to admire the palace ruins atop the rock, the ancient frescoes, mirror walls, Colossal lion paws, and symmetrical royal water gardens.",
    highlights: [
      "200-meter sheer monolithic rock fortress palace",
      "Famous 5th-century ancient Sigiriya celestial frescoes",
      "World's oldest landscaped symmetrical royal water gardens",
    ],
    duration: "Full Day Trip",
    bestSeason: "Year Round",
  },
  {
    id: "sinharaja-rain-forest",
    location: "South-West Lowlands",
    title: "SINHARAJA RAIN FOREST",
    category: "wildlife",
    image: "/images/we-1.jpg",
    description:
      "Sinharaja Rain Forest is a UNESCO World Heritage biosphere reserve on the top rung of biodiversity. Spreading 21km east to west, over 60% of trees are endemic. It is a treasure trove of rare plants, insects, amphibians, reptiles, mammals, and famous mixed-species bird feeding flocks.",
    highlights: [
      "UNESCO World Heritage primary virgin tropical rainforest",
      "Over 60% endemic tree canopy and rare medicinal plants",
      "World-famous multi-species bird feeding waves",
    ],
    duration: "Full Day Trek",
    bestSeason: "December – April",
  },
  {
    id: "kanneliya",
    location: "Galle District",
    title: "KANNELIYA",
    category: "wildlife",
    image: "/images/we-2.jpg",
    description:
      "Kanneliya is one of the most valuable lowland rainforests in Sri Lanka, designated a UNESCO biosphere reserve in 2004. Located 35km northwest of Galle, it spreads over 5,306 hectares. Home to many endemic plants and animals of ancient Gondwana origin, with beautiful Anagimale waterfall and crystal jungle streams.",
    highlights: [
      "Rich lowland biosphere reserve with pristine canopy trails",
      "Picturesque Anagimale and Narangas Ella jungle waterfalls",
      "Natural freshwater swimming rock pools in pure rainforest water",
    ],
    duration: "Half Day Trek",
    bestSeason: "December – April",
  },
  {
    id: "yala-national-park",
    location: "Southern & Uva Provinces",
    title: "YALA NATIONAL PARK",
    category: "wildlife",
    image: "/images/about-collage-leopard-hd.jpg",
    description:
      "Yala National Park takes premier place among national parks in Sri Lanka. Located 300km from Colombo and spreading over 979 square kilometers, Yala has 215 bird species, 44 recorded mammal species, and boasts one of the highest leopard densities in the world alongside wild elephants and sloth bears.",
    highlights: [
      "Highest density of wild leopards on Earth",
      "Thrilling open 4x4 safaris across lagoons and scrub jungle",
      "Majestic herds of Asian elephants and sloth bears",
    ],
    duration: "Full Day or Morning/Afternoon Safari",
    bestSeason: "February – June",
  },
  {
    id: "mirissa",
    location: "Matara District",
    title: "MIRISSA",
    category: "beach",
    image: "/images/dest-mirissa.jpg",
    description:
      "Mirissa is one of the most popular destinations in Southern Province. Mirissa beach is a marvelous place to catch coastal sceneries and feel relaxed in nightlife. Here you can join world-class Whale Watching. Other heart touched places are Parrot Rock and the iconic Coconut Tree Hill promontory.",
    highlights: [
      "Premier global location for Blue Whale watching safaris",
      "Instagram-famous panoramic Coconut Tree Hill",
      "Crescent golden sand beach with relaxed evening dining",
    ],
    duration: "2 – 4 Days",
    bestSeason: "November – April",
  },
  {
    id: "ella",
    location: "Badulla District",
    title: "ELLA",
    category: "highlands",
    image: "/images/dest-ella.jpg",
    description:
      "Ella is an amazing village in the Hill Country of Sri Lanka, 200km from Colombo. Mini Adams Peak, Ella Rock, Nine Arch Bridge, Ravana Falls, Lipton's Seat, and Adisham Bungalow are the most heart touched places. Scenic train travel through tea plantations and mountain hikes give you wonderful memories.",
    highlights: [
      "Iconic Nine Arch colonial stone viaduct railway bridge",
      "Little Adam's Peak & Ella Rock panoramic mountain hikes",
      "Gushing Ravana Falls and scenic Ceylon tea factories",
    ],
    duration: "2 – 3 Days",
    bestSeason: "December – May",
  },
  {
    id: "udawalawe",
    location: "Sabaragamuwa / Uva",
    title: "UDAWALAWE",
    category: "wildlife",
    image: "/images/welcome-wildlife.jpg",
    description:
      "Udawalawe National Park is a prominent animal sanctuary covering 30,821 hectares. Created around the Udawalawe reservoir on the Walawe River, it is globally celebrated for large herds of wild elephants roaming in open savannah landscapes, waterbirds, and the Elephant Transit Home.",
    highlights: [
      "Guaranteed wild Asian elephant sightings in open savannah",
      "Visit to the Udawalawe Elephant Transit Home orphanage",
      "Scenic reservoir lake vistas with waterbirds and raptors",
    ],
    duration: "Half Day Safari",
    bestSeason: "Year Round",
  },
  {
    id: "virgin-white-tea-plantation",
    location: "Handungoda / Galle",
    title: "VIRGIN WHITE TEA PLANTATION",
    category: "highlands",
    image: "/images/plan-trip.jpg",
    description:
      "Virgin White Tea Factory is located in Handungoda near Galle, Sri Lanka, only 30 minutes from Galle Fort. It is one of the closest tea plantations to the sea in the world. The process of tea plucking follows an ancient imperial Chinese ritual untouched by human hands. Identified as one of the healthiest and most exclusive teas in the world.",
    highlights: [
      "Only sea-breeze Ceylon tea plantation in the world",
      "Exclusive imperial 'Virgin White Tea' harvested with gold scissors",
      "Interactive tea museum, plantation walk and tea tasting pavilion",
    ],
    duration: "2 – 3 Hours",
    bestSeason: "Year Round",
  },
];

export default function DestinationPage() {
  const searchDialog = useRef<HTMLDialogElement>(null);
  const gridSectionRef = useRef<HTMLDivElement>(null);

  const [destinationsList, setDestinationsList] = useState<DestinationItem[]>(allDestinations);
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | "beach" | "heritage" | "wildlife" | "highlands"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedDestination, setSelectedDestination] =
    useState<DestinationItem | null>(null);

  useEffect(() => {
    async function loadDestinations() {
      try {
        const res = await fetch("/api/destinations");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const apiMap = new Map(json.data.map((d: any) => [d.slug, d]));
          const merged = allDestinations.map((orig) => {
            const apiItem: any = apiMap.get(orig.id);
            if (apiItem) {
              return {
                ...orig,
                title: apiItem.title || orig.title,
                location: apiItem.location || orig.location,
                description: apiItem.description || orig.description,
                image: apiItem.image || orig.image,
                category: (apiItem.category || orig.category) as any,
                isPinned: Boolean(apiItem.isPinned),
              };
            }
            return orig;
          });

          for (const d of json.data as any[]) {
            if (!allDestinations.some((orig) => orig.id === d.slug)) {
              merged.push({
                id: d.slug,
                title: d.title,
                location: d.location,
                description: d.description,
                image: d.image,
                category: (d.category || "heritage") as any,
                isPinned: Boolean(d.isPinned),
                highlights: d.highlights
                  ? d.highlights.split("\n").filter(Boolean)
                  : ["Popular sightseeing highlight", "Scenic photography spot", "Guided local tour available"],
                duration: d.duration || "Full Day",
                bestSeason: d.bestSeason || "Year Round",
              });
            }
          }
          setDestinationsList(merged);
        }
      } catch (err) {
        console.error("Failed to load destinations:", err);
      }
    }
    loadDestinations();
  }, []);

  const handleOpenSearch = () => {
    if (typeof window !== "undefined") {
      const scrollPos = window.scrollY;
      searchDialog.current?.showModal();
      window.scrollTo({ top: scrollPos, behavior: "instant" });
    } else {
      searchDialog.current?.showModal();
    }
  };

  // Dynamic category counts calculated directly from destination data
  const categoryCounts = useMemo(() => {
    return {
      all: destinationsList.length,
      beach: destinationsList.filter((d) => d.category === "beach").length,
      heritage: destinationsList.filter((d) => d.category === "heritage").length,
      wildlife: destinationsList.filter((d) => d.category === "wildlife").length,
      highlands: destinationsList.filter((d) => d.category === "highlands").length,
    };
  }, [destinationsList]);

  // Filtered destinations based on category and search query
  const filteredDestinations = useMemo(() => {
    return destinationsList.filter((dest) => {
      const matchesCategory =
        selectedCategory === "all" || dest.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [destinationsList, selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredDestinations.length / itemsPerPage));

  const paginatedDestinations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDestinations.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDestinations, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (gridSectionRef.current) {
      const yOffset = -70;
      const y = gridSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Top 2 featured spotlight destinations dynamically driven by isPinned attribute
  const featuredTwo = useMemo(() => {
    const pinned = destinationsList.filter((d) => d.isPinned);
    if (pinned.length >= 2) {
      return pinned.slice(0, 2);
    }
    const remaining = destinationsList.filter((d) => !pinned.some((p) => p.id === d.id));
    return [...pinned, ...remaining].slice(0, 2);
  }, [destinationsList]);

  // Smart pagination items with ellipsis (e.g. 1, 2, 3, 4, 5, '...', 10)
  const paginationItems = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | string)[] = [];
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }, [totalPages, currentPage]);

  const startCount = filteredDestinations.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endCount = Math.min(currentPage * itemsPerPage, filteredDestinations.length);

  return (
    <>
      <style>{`
        .destPageWrapper {
          min-height: 100vh;
          background: #ffffff;
          color: #173832;
        }

        /* Top Header Bar */
        .destHeaderBar {
          background: #073e36;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Hero Banner */
        .destHeroBanner {
          position: relative;
          width: 100%;
          height: clamp(185px, 22vw, 280px);
          overflow: hidden;
          background: #0d211a;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .destBannerImg {
          object-fit: cover;
          object-position: center 30%;
        }

        .bannerOverlayGradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(7, 30, 25, 0.38) 0%,
            rgba(7, 30, 25, 0.65) 100%
          );
          z-index: 2;
        }

        .destBannerContent {
          position: relative;
          z-index: 5;
          text-align: center;
          padding: 10px 24px;
        }

        .destBannerTitle {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 4vw, 54px);
          font-weight: 700;
          letter-spacing: -0.5px;
          line-height: 1.15;
          color: #ffffff;
          text-shadow: 0 3px 18px rgba(0, 0, 0, 0.7), 0 1px 4px rgba(0, 0, 0, 0.9);
        }

        .bannerTitleAccent {
          color: #ed8a28;
        }

        .destBannerDivider {
          width: 36px;
          height: 2.5px;
          background: #ed8a28;
          margin: 10px auto 12px;
          border-radius: 2px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
        }

        .destBreadcrumbs {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: clamp(12px, 1.2vw, 14px);
          letter-spacing: 0.5px;
        }

        .destBreadcrumbs .crumbLink {
          color: #ffffff;
          font-weight: 500;
          text-decoration: none;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
          transition: color 0.2s ease;
        }

        .destBreadcrumbs .crumbLink:hover {
          color: #ffb11b;
          text-decoration: underline;
        }

        .destBreadcrumbs .crumbSlash {
          color: rgba(255, 255, 255, 0.65);
          font-weight: 400;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
        }

        .destBreadcrumbs .crumbActive {
          color: #ed8a28;
          font-weight: 600;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
        }

        /* Main Section Content */
        .destMainSection {
          position: relative;
          padding: 65px 0 90px;
          background: #ffffff;
          overflow: hidden;
        }

        .destContainer {
          position: relative;
          z-index: 5;
          width: min(1320px, 92%);
          margin: 0 auto;
        }

        /* Section Heading */
        .destHeadingWrapper {
          text-align: center;
          max-width: 820px;
          margin: 0 auto 46px;
        }

        .destEyebrow {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          color: #ed8a28;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .destEyebrowLine {
          display: inline-block;
          width: 38px;
          height: 2px;
          background: #073e36;
          border-radius: 1px;
        }

        .destSectionTitle {
          margin: 0 0 14px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(30px, 3.4vw, 45px);
          font-weight: 700;
          letter-spacing: -0.4px;
          line-height: 1.2;
          color: #073e36;
        }

        .destTitleAccent {
          color: #ed8a28;
          display: inline-block;
          margin-left: 8px;
        }

        .destSectionDesc {
          margin: 0;
          color: #556c75;
          font-size: clamp(14px, 1.2vw, 15px);
          line-height: 1.7;
        }

        /* Row 1: Featured 2-Column Wide Cards */
        .destFeaturedGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
          margin-bottom: 42px;
        }

        .destWideCard {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          background: #ffffff;
          border: 1px solid #e7efec;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(7, 62, 54, 0.03);
          transition: border-color 0.28s ease, transform 0.28s ease, box-shadow 0.28s ease;
        }

        .destWideCard:hover {
          border-color: #bad5ce;
          transform: translateY(-4px);
          box-shadow: 0 14px 32px rgba(7, 62, 54, 0.09);
        }

        .wideCardMedia {
          position: relative;
          min-height: 250px;
          background: #eef3f1;
          overflow: hidden;
        }

        .cardCoverPhoto {
          object-fit: cover;
          transition: transform 0.45s ease;
        }

        .destWideCard:hover .cardCoverPhoto,
        .destGridCard:hover .cardCoverPhoto {
          transform: scale(1.06);
        }

        .wideCardInfo {
          padding: 28px 26px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .destLocationTag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #ed8a28;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .locationPinIcon {
          width: 14px;
          height: 14px;
          color: #ed8a28;
          flex-shrink: 0;
        }

        .destCardTitle {
          margin: 0 0 10px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          font-weight: 700;
          color: #073e36;
          letter-spacing: 0.3px;
          line-height: 1.25;
        }

        .destCardDesc {
          margin: 0 0 18px;
          color: #556c75;
          font-size: 13.5px;
          line-height: 1.65;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .viewDetailsBtn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          color: #073e36;
          font-size: 13.5px;
          font-weight: 700;
          letter-spacing: 0.2px;
          transition: color 0.2s ease;
          align-self: flex-start;
        }

        .viewDetailsBtn:hover {
          color: #ed8a28;
        }

        .arrowCircle {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #ed8a28;
          color: #ffffff;
          transition: transform 0.25s ease, background 0.25s ease;
          flex-shrink: 0;
        }

        .viewDetailsBtn:hover .arrowCircle {
          background: #d87618;
          transform: translateX(3px);
        }

        /* Filter Controls & Search Bar */
        .filterToolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 18px;
          margin-bottom: 34px;
          padding: 16px 20px;
          background: #f8fbfa;
          border: 1px solid #e5edea;
          border-radius: 16px;
        }

        .categoryPills {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .categoryBtn {
          background: #ffffff;
          color: #073e36;
          border: 1px solid #d9e6e2;
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .categoryBtn:hover {
          border-color: #ed8a28;
          color: #ed8a28;
        }

        .categoryBtn.activeCategory {
          background: #003f3b;
          color: #ffffff;
          border-color: #003f3b;
        }

        .searchBoxWrapper {
          position: relative;
          min-width: 260px;
        }

        .searchInput {
          width: 100%;
          padding: 8px 16px 8px 36px;
          border-radius: 9999px;
          border: 1px solid #d9e6e2;
          font-size: 13px;
          background: #ffffff;
          color: #073e36;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .searchInput:focus {
          border-color: #ed8a28;
        }

        .searchIcon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 15px;
          height: 15px;
          color: #7b948e;
          pointer-events: none;
        }

        /* Row 2: Grid 4-Column Cards */
        .destBottomGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .destGridCard {
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border: 1px solid #e7efec;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(7, 62, 54, 0.03);
          transition: border-color 0.28s ease, transform 0.28s ease, box-shadow 0.28s ease;
        }

        .destGridCard:hover {
          border-color: #bad5ce;
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(7, 62, 54, 0.09);
        }

        .gridCardMedia {
          position: relative;
          width: 100%;
          aspect-ratio: 1.65 / 1;
          background: #eef3f1;
          overflow: hidden;
        }

        .gridCardInfo {
          padding: 22px 20px 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .gridCardInfo .destCardTitle {
          font-size: 17.5px;
        }

        .gridCardInfo .destCardDesc {
          font-size: 13px;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Better Way Pagination */
        .betterPaginationWrapper {
          margin-top: 48px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .paginationMetaBar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          font-size: 13.5px;
          color: #475569;
          flex-wrap: wrap;
          gap: 12px;
        }

        .paginationCountText {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .paginationCountText strong {
          color: #073e36;
          font-weight: 700;
        }

        .paginationPageBadge {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 20px;
          background: #edf7f5;
          color: #073e36;
          font-size: 12px;
          font-weight: 700;
          border: 1px solid #c2e2da;
        }

        .paginationPerPageRow {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .perPageLabel {
          font-size: 12.5px;
          font-weight: 600;
          color: #64748b;
        }

        .perPageBtn {
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #334155;
          padding: 4px 11px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .perPageBtn:hover {
          border-color: #073e36;
          color: #073e36;
          background: #f1f5f9;
        }

        .perPageBtn.activePerPage {
          background: #073e36;
          color: #ffffff;
          border-color: #073e36;
        }

        .paginationControlsRow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .pageNumbersGroup {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: wrap;
        }

        .pageEllipsis {
          display: grid;
          place-items: center;
          width: 36px;
          height: 42px;
          color: #94a3b8;
          font-size: 14px;
          letter-spacing: 2px;
          user-select: none;
        }

        .pageNumberBtn {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 1px solid #d9e6e2;
          background: #ffffff;
          color: #073e36;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pageNumberBtn:hover {
          border-color: #ed8a28;
          color: #ed8a28;
          transform: translateY(-1px);
        }

        .pageNumberBtn.activePageBtn {
          background: #ed8a28;
          color: #ffffff;
          border-color: #ed8a28;
          box-shadow: 0 4px 12px rgba(237, 138, 40, 0.35);
        }

        .pageNavBtn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 0 14px;
          height: 42px;
          border-radius: 12px;
          border: 1px solid #d9e6e2;
          background: #ffffff;
          color: #073e36;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pageNavBtn:hover:not(:disabled) {
          border-color: #073e36;
          background: #f4faf8;
          transform: translateY(-1px);
        }

        .pageNavBtn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .destPinnedBadge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(7, 62, 54, 0.92);
          color: #ffb11b;
          font-size: 10.5px;
          font-weight: 800;
          letter-spacing: 1px;
          padding: 5px 11px;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 177, 27, 0.4);
          z-index: 3;
          backdrop-filter: blur(4px);
        }

        .gridCardPinnedBadge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(7, 62, 54, 0.88);
          color: #ffb11b;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid rgba(255, 177, 27, 0.3);
          z-index: 2;
        }

        /* Background Botanical Vector Accents */
        .decorPalmTreeLeft {
          position: absolute;
          left: -45px;
          top: 40px;
          width: 220px;
          height: 460px;
          color: #bad3cd;
          opacity: 0.4;
          pointer-events: none;
          z-index: 1;
        }

        .decorLeafBranchRight {
          position: absolute;
          right: -30px;
          top: 35px;
          width: 200px;
          height: 440px;
          color: #bad3cd;
          opacity: 0.4;
          pointer-events: none;
          z-index: 1;
        }

        .decorSigiriyaSilhouette {
          position: absolute;
          right: 10px;
          bottom: 40px;
          width: 240px;
          height: 190px;
          color: #c4ded8;
          opacity: 0.35;
          pointer-events: none;
          z-index: 1;
        }

        .decorDotGridRight {
          position: absolute;
          right: 35px;
          top: 80px;
          z-index: 2;
          pointer-events: none;
          opacity: 0.85;
        }

        .decorWaveCornerLeft {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 280px;
          height: 140px;
          color: #ebf6f4;
          pointer-events: none;
          z-index: 0;
        }

        .decorWaveCornerRight {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 290px;
          height: 150px;
          color: #ebf6f4;
          pointer-events: none;
          z-index: 0;
        }

        /* Interactive Destination Details Modal */
        .destModalBackdrop {
          position: fixed;
          inset: 0;
          background: rgba(7, 30, 25, 0.72);
          backdrop-filter: blur(6px);
          z-index: 200;
          display: grid;
          place-items: center;
          padding: 20px;
        }

        .destModalCard {
          position: relative;
          background: #ffffff;
          border-radius: 24px;
          max-width: 640px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
          border: 1px solid #e1ebe7;
        }

        .modalMedia {
          position: relative;
          width: 100%;
          height: 280px;
          background: #0d211a;
        }

        .modalMediaImg {
          object-fit: cover;
        }

        .modalCloseBtn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.6);
          color: #ffffff;
          border: none;
          cursor: pointer;
          display: grid;
          place-items: center;
          font-size: 18px;
          transition: background 0.2s ease, transform 0.2s ease;
          z-index: 5;
        }

        .modalCloseBtn:hover {
          background: #ed8a28;
          transform: scale(1.08);
        }

        .modalBody {
          padding: 28px 32px 34px;
        }

        .modalLocationBadge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fef0e7;
          color: #ed8a28;
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 12.5px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .modalTitle {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 26px;
          font-weight: 700;
          color: #073e36;
          margin: 0 0 14px;
        }

        .modalDesc {
          color: #556c75;
          font-size: 14.5px;
          line-height: 1.75;
          margin: 0 0 22px;
        }

        .modalMetaGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          background: #f4faf8;
          padding: 16px 20px;
          border-radius: 14px;
          margin-bottom: 22px;
        }

        .metaItemLabel {
          font-size: 11.5px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #6d8881;
          font-weight: 700;
          margin-bottom: 3px;
        }

        .metaItemValue {
          font-size: 14px;
          font-weight: 600;
          color: #073e36;
        }

        .modalHighlightsTitle {
          font-size: 14px;
          font-weight: 700;
          color: #073e36;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin: 0 0 10px;
        }

        .modalHighlightsList {
          list-style: none;
          padding: 0;
          margin: 0 0 26px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .modalHighlightsList li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13.5px;
          color: #4a635d;
        }

        .highlightCheck {
          color: #ed8a28;
          font-size: 14px;
          font-weight: bold;
        }

        .modalActionRow {
          display: flex;
          gap: 14px;
        }

        .modalPlanBtn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 13px 24px;
          border-radius: 9999px;
          background: #003f3b;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.25s ease;
        }

        .modalPlanBtn:hover {
          background: #ed8a28;
        }

        /* Call To Action Banner */
        .destCtaSection {
          background: #073e36;
          color: #ffffff;
          padding: 60px 0;
          text-align: center;
          position: relative;
        }

        .destCtaInner {
          width: min(840px, 92%);
          margin: 0 auto;
        }

        .destCtaTag {
          display: inline-block;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: #ffb11b;
          margin-bottom: 12px;
        }

        .destCtaTitle {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(26px, 3.2vw, 38px);
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 14px;
          line-height: 1.25;
        }

        .destCtaDesc {
          color: #cbe0da;
          font-size: 15px;
          line-height: 1.7;
          margin: 0 auto 30px;
          max-width: 660px;
        }

        .destCtaBtnRow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .ctaPrimaryBtn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 32px;
          min-height: 48px;
          border-radius: 9999px;
          background: #ed8a28;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.25s ease;
          box-shadow: 0 4px 16px rgba(237, 138, 40, 0.35);
        }

        .ctaPrimaryBtn:hover {
          background: #d87618;
          transform: translateY(-2px);
        }

        .ctaOutlineBtn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          min-height: 48px;
          border-radius: 9999px;
          background: transparent;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          border: 1.5px solid rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .ctaOutlineBtn:hover {
          border-color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1100px) {
          .destBottomGrid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .decorPalmTreeLeft, .decorLeafBranchRight, .decorSigiriyaSilhouette, .decorDotGridRight {
            display: none;
          }
        }

        @media (max-width: 850px) {
          .destFeaturedGrid {
            grid-template-columns: 1fr;
            max-width: 580px;
            margin: 0 auto 28px;
          }
          .destWideCard {
            grid-template-columns: 1fr;
          }
          .wideCardMedia {
            height: 220px;
          }
          .wideCardInfo {
            padding: 24px 22px;
          }
        }

        @media (max-width: 640px) {
          .destMainSection {
            padding: 45px 0 65px;
          }
          .destHeadingWrapper {
            margin-bottom: 36px;
          }
          .filterToolbar {
            flex-direction: column;
            align-items: stretch;
          }
          .searchBoxWrapper {
            min-width: 100%;
          }
          .destBottomGrid {
            grid-template-columns: 1fr;
            max-width: 480px;
            margin: 0 auto;
            gap: 18px;
          }
          .destGridCard {
            border-radius: 18px;
          }
          .destCtaSection {
            padding: 45px 0;
          }
        }
      `}</style>

      <div className="destPageWrapper">
        {/* Header Navigation */}
        <div className="destHeaderBar">
          <Navbar activePage="destination" onOpenSearch={handleOpenSearch} />
        </div>

        {/* Top Scenic Sigiriya Sunrise Banner */}
        <div className="destHeroBanner">
          <Image
            src="/images/destination-hero-banner.jpg"
            alt="Scenic Sunrise over Sigiriya Rock Fortress in Sri Lanka"
            fill
            priority
            sizes="100vw"
            className="destBannerImg"
          />
          <div className="bannerOverlayGradient" aria-hidden="true" />

          <div className="destBannerContent">
            <h1 className="destBannerTitle">
              Desti<span className="bannerTitleAccent">nation</span>
            </h1>
            <div className="destBannerDivider" aria-hidden="true" />
            <nav className="destBreadcrumbs" aria-label="Breadcrumb">
              <Link href="/" className="crumbLink">Home</Link>
              <span className="crumbSlash" aria-hidden="true">/</span>
              <span className="crumbActive">Destination</span>
            </nav>
          </div>
        </div>

        {/* Main Destinations Section */}
        <main className="destMainSection">
          {/* Subtle Decorative Botanical SVGs on Left & Right */}
          <svg
            className="decorPalmTreeLeft"
            viewBox="0 0 200 360"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M70 360C62 260 58 145 88 65"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <path
              d="M87 69C45 22 14 33 2 60c36-11 55-1 85 9M87 69C32 54 6 75 2 105c33-24 55-27 85-36M87 69C30 83 15 113 22 146c13-39 34-59 65-77M87 69c6-48 33-59 63-49-33 10-48 24-63 49M87 69c44-40 77-24 94 6-39-12-62-15-94-6M87 69c53-8 79 21 85 52-31-32-50-44-85-52M87 69c38 18 48 49 41 83-13-37-23-59-41-83Z"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>

          <svg
            className="decorLeafBranchRight"
            viewBox="0 0 180 360"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M25 350C42 245 106 150 144 14c52 57 48 138 8 200-33 47-72 65-113 71M144 14c-57 34-97 83-100 146-3 59 18 95 2 130M130 60l37 62M113 109l-61-7M96 152l64 22M78 194l-38-16M61 233l68 9"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>

          {/* Sigiriya Rock Silhouette Sketch on the right */}
          <svg
            className="decorSigiriyaSilhouette"
            viewBox="0 0 240 160"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 140c10-2 25-10 40-12 18-3 30-18 45-25 15-7 25-25 40-28 12-3 28-2 40 4 15 8 25 25 35 38 10 12 15 20 20 23"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeDasharray="4 3"
            />
            <path
              d="M60 128c15-30 40-45 70-45s55 12 70 45"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>

          {/* Right Orange Dot Grid (3x3) */}
          <svg
            className="decorDotGridRight"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            aria-hidden="true"
          >
            {[0, 1, 2].map((r) =>
              [0, 1, 2].map((c) => (
                <circle
                  key={`dot-right-${r}-${c}`}
                  cx={c * 14 + 6}
                  cy={r * 14 + 6}
                  r="2"
                  fill="#ed8a28"
                />
              ))
            )}
          </svg>

          {/* Soft Bottom Wave Accents */}
          <svg
            className="decorWaveCornerLeft"
            viewBox="0 0 280 140"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M0 140V60c70 22 140-10 210 18 35 14 55 40 70 62H0z" />
          </svg>

          <svg
            className="decorWaveCornerRight"
            viewBox="0 0 290 150"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M290 150V40c-80 18-150 60-200 48-45-10-75-40-90-88v150h290z" />
          </svg>

          <div className="destContainer">
            {/* Header: Explore Sri Lanka Destinations */}
            <div className="destHeadingWrapper">
              <div className="destEyebrow">
                <span className="destEyebrowLine" aria-hidden="true" />
                <span>DISCOVER SRI LANKA</span>
                <span className="destEyebrowLine" aria-hidden="true" />
              </div>
              <h2 className="destSectionTitle">
                Explore Sri Lanka
                <span className="destTitleAccent">Destinations</span>
              </h2>
              <p className="destSectionDesc">
                From golden beaches and ancient cities to misty mountains and vibrant culture,
                Sri Lanka offers unforgettable destinations for every traveler. Explore our
                handpicked places and start planning your journey.
              </p>
            </div>

            {/* Row 1: Featured 2 Wide Cards */}
            <div className="destFeaturedGrid">
              {featuredTwo.map((dest) => (
                <div key={`featured-${dest.id}`} className="destWideCard">
                  <div className="wideCardMedia">
                    <Image
                      src={dest.image}
                      alt={dest.title}
                      fill
                      unoptimized={Boolean(dest.image?.startsWith("data:") || dest.image?.startsWith("http"))}
                      sizes="(max-width: 850px) 92vw, 30vw"
                      className="cardCoverPhoto"
                    />
                    {dest.isPinned && (
                      <span className="destPinnedBadge">
                        ★ TOP SPOTLIGHT
                      </span>
                    )}
                  </div>
                  <div className="wideCardInfo">
                    <div className="destLocationTag">
                      <svg
                        className="locationPinIcon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
                      <span>{dest.location}</span>
                    </div>
                    <h3 className="destCardTitle">{dest.title}</h3>
                    <p className="destCardDesc">{dest.description}</p>
                    <button
                      type="button"
                      className="viewDetailsBtn"
                      onClick={() => setSelectedDestination(dest)}
                    >
                      <span>View Details</span>
                      <span className="arrowCircle" aria-hidden="true">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Filter Toolbar & Search */}
            <div ref={gridSectionRef} className="filterToolbar">
              <div className="categoryPills">
                <button
                  type="button"
                  className={`categoryBtn ${selectedCategory === "all" ? "activeCategory" : ""}`}
                  onClick={() => {
                    setSelectedCategory("all");
                    setCurrentPage(1);
                  }}
                >
                  All ({categoryCounts.all})
                </button>
                <button
                  type="button"
                  className={`categoryBtn ${selectedCategory === "beach" ? "activeCategory" : ""}`}
                  onClick={() => {
                    setSelectedCategory("beach");
                    setCurrentPage(1);
                  }}
                >
                  Beaches & Coastal ({categoryCounts.beach})
                </button>
                <button
                  type="button"
                  className={`categoryBtn ${selectedCategory === "heritage" ? "activeCategory" : ""}`}
                  onClick={() => {
                    setSelectedCategory("heritage");
                    setCurrentPage(1);
                  }}
                >
                  Culture & Heritage ({categoryCounts.heritage})
                </button>
                <button
                  type="button"
                  className={`categoryBtn ${selectedCategory === "wildlife" ? "activeCategory" : ""}`}
                  onClick={() => {
                    setSelectedCategory("wildlife");
                    setCurrentPage(1);
                  }}
                >
                  Wildlife & Safaris ({categoryCounts.wildlife})
                </button>
                <button
                  type="button"
                  className={`categoryBtn ${selectedCategory === "highlands" ? "activeCategory" : ""}`}
                  onClick={() => {
                    setSelectedCategory("highlands");
                    setCurrentPage(1);
                  }}
                >
                  Hill Country & Peaks ({categoryCounts.highlands})
                </button>
              </div>

              <div className="searchBoxWrapper">
                <svg
                  className="searchIcon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="searchInput"
                  aria-label="Search destinations"
                />
              </div>
            </div>

            {/* Grid of Destination Cards */}
            {paginatedDestinations.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "#556c75" }}>
                <p style={{ fontSize: "16px", margin: "0 0 10px" }}>
                  No destinations found matching &quot;{searchQuery}&quot;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                    setCurrentPage(1);
                  }}
                  style={{
                    background: "#073e36",
                    color: "#ffffff",
                    border: "none",
                    padding: "8px 18px",
                    borderRadius: "9999px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="destBottomGrid">
                {paginatedDestinations.map((dest) => (
                  <div key={dest.id} className="destGridCard">
                    <div className="gridCardMedia">
                      <Image
                        src={dest.image}
                        alt={dest.title}
                        fill
                        unoptimized={Boolean(dest.image?.startsWith("data:") || dest.image?.startsWith("http"))}
                        sizes="(max-width: 640px) 92vw, (max-width: 1100px) 46vw, 23vw"
                        className="cardCoverPhoto"
                      />
                      {dest.isPinned && (
                        <span className="gridCardPinnedBadge">★ Spotlight</span>
                      )}
                    </div>
                    <div className="gridCardInfo">
                      <div className="destLocationTag">
                        <svg
                          className="locationPinIcon"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <span>{dest.location}</span>
                      </div>
                      <h3 className="destCardTitle">{dest.title}</h3>
                      <p className="destCardDesc">{dest.description}</p>
                      <button
                        type="button"
                        className="viewDetailsBtn"
                        onClick={() => setSelectedDestination(dest)}
                      >
                        <span>View Details</span>
                        <span className="arrowCircle" aria-hidden="true">→</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Better Way Pagination Bar */}
            {filteredDestinations.length > 0 && (
              <div className="betterPaginationWrapper" aria-label="Destination page navigation">
                {/* Meta bar: Range results counter & per page picker */}
                <div className="paginationMetaBar">
                  <div className="paginationCountText">
                    Showing <strong>{startCount}–{endCount}</strong> of <strong>{filteredDestinations.length}</strong> destinations
                    <span className="paginationPageBadge">Page {currentPage} of {totalPages}</span>
                  </div>

                  <div className="paginationPerPageRow">
                    <span className="perPageLabel">Per page:</span>
                    {[8, 12, 16, 24].map((size) => (
                      <button
                        key={`size-${size}`}
                        type="button"
                        className={`perPageBtn ${itemsPerPage === size ? "activePerPage" : ""}`}
                        onClick={() => {
                          setItemsPerPage(size);
                          setCurrentPage(1);
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation controls row with smart page window */}
                {totalPages > 1 && (
                  <div className="paginationControlsRow">
                    <button
                      type="button"
                      className="pageNavBtn"
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      title="First Page"
                      aria-label="First page"
                    >
                      « First
                    </button>

                    <button
                      type="button"
                      className="pageNavBtn"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      title="Previous Page"
                      aria-label="Previous page"
                    >
                      ‹ Prev
                    </button>

                    <div className="pageNumbersGroup">
                      {paginationItems.map((item, index) => {
                        if (item === "...") {
                          return (
                            <span key={`ellipsis-${index}`} className="pageEllipsis">
                              •••
                            </span>
                          );
                        }
                        const pageNum = Number(item);
                        return (
                          <button
                            key={`page-${pageNum}`}
                            type="button"
                            className={`pageNumberBtn ${currentPage === pageNum ? "activePageBtn" : ""}`}
                            onClick={() => handlePageChange(pageNum)}
                            aria-label={`Page ${pageNum}`}
                            aria-current={currentPage === pageNum ? "page" : undefined}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      className="pageNavBtn"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      title="Next Page"
                      aria-label="Next page"
                    >
                      Next ›
                    </button>

                    <button
                      type="button"
                      className="pageNavBtn"
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      title="Last Page"
                      aria-label="Last page"
                    >
                      Last »
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* Modal Dialog for Destination Details */}
        {selectedDestination && (
          <div
            className="destModalBackdrop"
            onClick={() => setSelectedDestination(null)}
          >
            <div
              className="destModalCard"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modalMedia">
                <Image
                  src={selectedDestination.image}
                  alt={selectedDestination.title}
                  fill
                  unoptimized={Boolean(selectedDestination.image?.startsWith("data:") || selectedDestination.image?.startsWith("http"))}
                  className="modalMediaImg"
                />
                <button
                  type="button"
                  className="modalCloseBtn"
                  onClick={() => setSelectedDestination(null)}
                  aria-label="Close dialog"
                >
                  ✕
                </button>
              </div>

              <div className="modalBody">
                <span className="modalLocationBadge">
                  📍 {selectedDestination.location}, Sri Lanka
                </span>
                <h3 className="modalTitle">{selectedDestination.title}</h3>
                <p className="modalDesc">{selectedDestination.description}</p>

                <div className="modalMetaGrid">
                  <div>
                    <div className="metaItemLabel">Suggested Duration</div>
                    <div className="metaItemValue">{selectedDestination.duration}</div>
                  </div>
                  <div>
                    <div className="metaItemLabel">Best Season To Visit</div>
                    <div className="metaItemValue">{selectedDestination.bestSeason}</div>
                  </div>
                </div>

                <div className="modalHighlightsTitle">Key Highlights</div>
                <ul className="modalHighlightsList">
                  {selectedDestination.highlights.map((highlight, idx) => (
                    <li key={idx}>
                      <span className="highlightCheck">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="modalActionRow">
                  <Link
                    href={`/#contact?destination=${encodeURIComponent(selectedDestination.title)}`}
                    className="modalPlanBtn"
                    onClick={() => setSelectedDestination(null)}
                  >
                    Plan A Trip To {selectedDestination.location} →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Tour Planning Call To Action */}
        <section className="destCtaSection" aria-label="Custom Tour Planning">
          <div className="destCtaInner">
            <span className="destCtaTag">PLAN YOUR JOURNEY</span>
            <h2 className="destCtaTitle">Ready to Explore Sri Lanka’s Wonders?</h2>
            <p className="destCtaDesc">
              Whether you want to combine heritage, wildlife, and tropical beaches into one seamless
              round trip, our destination specialists will craft the perfect itinerary for you.
            </p>
            <div className="destCtaBtnRow">
              <Link className="ctaPrimaryBtn" href="/#contact">
                Start Tailoring Your Tour →
              </Link>
              <Link className="ctaOutlineBtn" href="/#packages">
                View Ready-Made Packages
              </Link>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <Footer />

        {/* Global Search Dialog */}
        <SearchDialog
          dialogRef={searchDialog}
          onSelectJourney={() => searchDialog.current?.close()}
        />
      </div>
    </>
  );
}
