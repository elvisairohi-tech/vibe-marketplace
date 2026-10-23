import { UserProfile, MarketplaceItem, SocialPost, StoryPulse, Conversation } from '../types';

export const POPULAR_LOCATIONS = [
  { city: 'New York', country: 'United States', flag: '🇺🇸', areaName: 'Brooklyn / Manhattan' },
  { city: 'London', country: 'United Kingdom', flag: '🇬🇧', areaName: 'Shoreditch / Hackney' },
  { city: 'Tokyo', country: 'Japan', flag: '🇯🇵', areaName: 'Shibuya / Daikanyama' },
  { city: 'Lagos', country: 'Nigeria', flag: '🇳🇬', areaName: 'Victoria Island / Lekki' },
  { city: 'Berlin', country: 'Germany', flag: '🇩🇪', areaName: 'Kreuzberg / Mitte' },
  { city: 'Paris', country: 'France', flag: '🇫🇷', areaName: 'Le Marais / Belleville' },
  { city: 'São Paulo', country: 'Brazil', flag: '🇧🇷', areaName: 'Vila Madalena / Pinheiros' },
  { city: 'Sydney', country: 'Australia', flag: '🇦🇺', areaName: 'Surry Hills / Bondi' },
  { city: 'Toronto', country: 'Canada', flag: '🇨🇦', areaName: 'Queen West / Kensington' },
  { city: 'Dubai', country: 'United Arab Emirates', flag: '🇦🇪', areaName: 'DIFC / Marina' },
];

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'user_alex',
    name: 'Alex Vance',
    handle: '@alexvance',
    avatar: 'AV',
    avatarBg: 'bg-indigo-600 text-white',
    age: 28,
    location: { city: 'New York', country: 'United States', flag: '🇺🇸', distanceKm: 2.4, areaName: 'Greenpoint, Brooklyn' },
    bio: 'Product architect & analog photographer. Collecting vintage synthesizers and Japanese architectural monographs.',
    occupation: 'Design Director',
    verified: true,
    joinedDate: 'Joined March 2024',
    stats: {
      vibesScore: 98,
      followers: 1420,
      itemsSold: 24,
      sellerRating: 4.9,
      reviewsCount: 31,
    },
    datingProfile: {
      active: true,
      gender: 'Non-binary / Man',
      interestedIn: 'Everyone',
      intent: 'Long-term relationship',
      height: "5'11\"",
      languages: ['English', 'French (conversational)'],
      passions: ['Analog Photography', 'Natural Wine', 'Architecture', 'Electronic Music', 'Bouldering'],
      prompts: [
        {
          question: 'The key to winning me over is...',
          answer: 'Taking me to an obscure basement record shop and arguing about whether Eno or Bowie made the better Berlin trilogy.'
        },
        {
          question: 'My ideal Sunday looks like...',
          answer: 'Pour-over coffee, 10-mile bike ride over the Williamsburg bridge, and roasting seasonal vegetables with friends.'
        }
      ],
      dateIdea: 'Late afternoon gallery walk through Chelsea followed by vinyl listening bar drinks at Tokyo Record Style lounge.',
      vibeAudioSnippet: {
        title: 'Sunday Morning Coffee & Synths',
        duration: '0:28'
      }
    }
  },
  {
    id: 'user_maya',
    name: 'Maya Lin',
    handle: '@mayadesign',
    avatar: 'ML',
    avatarBg: 'bg-rose-500 text-white',
    age: 26,
    location: { city: 'New York', country: 'United States', flag: '🇺🇸', distanceKm: 4.1, areaName: 'Lower East Side' },
    bio: 'Ceramicist & industrial furniture restorer. Obsessed with brutalist concrete structures and hand-brewed matcha.',
    occupation: 'Studio Ceramicist',
    verified: true,
    joinedDate: 'Joined January 2024',
    stats: {
      vibesScore: 99,
      followers: 3200,
      itemsSold: 42,
      sellerRating: 5.0,
      reviewsCount: 56,
    },
    datingProfile: {
      active: true,
      gender: 'Woman',
      interestedIn: 'Men & Women',
      intent: 'Long-term relationship',
      height: "5'7\"",
      languages: ['English', 'Mandarin'],
      passions: ['Ceramics', 'Architecture', 'Cooking with chili oil', 'Live Jazz', 'Flea Markets'],
      prompts: [
        {
          question: 'I will know it is a real vibe when...',
          answer: 'We can comfortably sit in 20 minutes of comfortable silence while reading without anyone feeling awkward.'
        },
        {
          question: 'A boundary of mine you should respect...',
          answer: 'I will never rush through a bookstore or a museum gift shop.'
        }
      ],
      dateIdea: 'Wheel-throwing session at my studio followed by spicy handmade noodles and unfiltered sake.',
      vibeAudioSnippet: {
        title: 'Studio Kiln Crackle & Thoughts',
        duration: '0:34'
      }
    }
  },
  {
    id: 'user_kenji',
    name: 'Kenji Sato',
    handle: '@kenjisato',
    avatar: 'KS',
    avatarBg: 'bg-emerald-600 text-white',
    age: 31,
    location: { city: 'Tokyo', country: 'Japan', flag: '🇯🇵', distanceKm: 10800, areaName: 'Daikanyama' },
    bio: 'Vintage audio curator & architectural archivist. Shipping rare Japanese gear worldwide.',
    occupation: 'Sound Engineer & Collector',
    verified: true,
    joinedDate: 'Joined November 2023',
    stats: {
      vibesScore: 97,
      followers: 8900,
      itemsSold: 118,
      sellerRating: 5.0,
      reviewsCount: 142,
    },
    datingProfile: {
      active: true,
      gender: 'Man',
      interestedIn: 'Women',
      intent: 'Travel & explore buddy',
      height: "5'10\"",
      languages: ['Japanese', 'English'],
      passions: ['Audiophile Systems', 'Cycling in Shonan', 'Minimalism', 'Ramen Culture', 'Film Noir'],
      prompts: [
        {
          question: 'My most spontaneous travel story...',
          answer: 'Booked a one-way sleeper train to Hokkaido in winter just to record the sound of cracking frozen lakes for a soundscape album.'
        }
      ],
      dateIdea: 'Hidden kissaten in Jinbocho with 1960s Tannoy speakers, talking about our favorite cities at midnight.',
      vibeAudioSnippet: {
        title: 'Tokyo Rain & 1970 Jazz Tape',
        duration: '0:42'
      }
    }
  },
  {
    id: 'user_amina',
    name: 'Amina Diallo',
    handle: '@aminacreative',
    avatar: 'AD',
    avatarBg: 'bg-amber-600 text-white',
    age: 27,
    location: { city: 'Lagos', country: 'Nigeria', flag: '🇳🇬', distanceKm: 8500, areaName: 'Victoria Island' },
    bio: 'Contemporary African fashion curator and creative director. Bridging Lagos streetwear with global runways.',
    occupation: 'Creative Director',
    verified: true,
    joinedDate: 'Joined September 2024',
    stats: {
      vibesScore: 96,
      followers: 5400,
      itemsSold: 67,
      sellerRating: 4.9,
      reviewsCount: 88,
    },
    datingProfile: {
      active: true,
      gender: 'Woman',
      interestedIn: 'Men',
      intent: 'Casual dating',
      height: "5'9\"",
      languages: ['English', 'Yoruba', 'French'],
      passions: ['Afrobeats', 'High Fashion', 'Contemporary Art', 'Tennis', 'Boat Cruises'],
      prompts: [
        {
          question: 'What energizes me most...',
          answer: 'The unstoppable rhythm and entrepreneurship of Lagos, coupled with late-night debates about pan-African design.'
        }
      ],
      dateIdea: 'Private art opening at Rele Gallery followed by rooftop cocktails looking over the Atlantic Ocean.',
      vibeAudioSnippet: {
        title: 'Lagos Vibes & Good Company',
        duration: '0:31'
      }
    }
  },
  {
    id: 'user_elena',
    name: 'Elena Rostova',
    handle: '@elenaberlin',
    avatar: 'ER',
    avatarBg: 'bg-purple-600 text-white',
    age: 29,
    location: { city: 'Berlin', country: 'Germany', flag: '🇩🇪', distanceKm: 6380, areaName: 'Kreuzberg' },
    bio: 'Electronic music producer & vintage synthesizer repair technician. Cycling through Tempelhof.',
    occupation: 'Audio Producer',
    verified: true,
    joinedDate: 'Joined August 2023',
    stats: {
      vibesScore: 95,
      followers: 2100,
      itemsSold: 39,
      sellerRating: 4.8,
      reviewsCount: 47,
    },
    datingProfile: {
      active: true,
      gender: 'Woman',
      interestedIn: 'Everyone',
      intent: 'Creative partner',
      height: "5'8\"",
      languages: ['German', 'English', 'Russian'],
      passions: ['Modular Synths', 'Industrial Design', 'Sauna Culture', 'Philosophy', 'Specialty Coffee'],
      prompts: [
        {
          question: 'Together we could build...',
          answer: 'An interactive audio-visual installation in an abandoned power station or just a very good vegetable garden.'
        }
      ],
      dateIdea: 'Vintage synth testing session followed by open-air coffee at Tempelhofer Feld at dusk.'
    }
  },
  {
    id: 'user_liam',
    name: 'Liam Gallagher',
    handle: '@liamg_ldn',
    avatar: 'LG',
    avatarBg: 'bg-teal-600 text-white',
    age: 30,
    location: { city: 'London', country: 'United Kingdom', flag: '🇬🇧', distanceKm: 5560, areaName: 'Hackney' },
    bio: 'Bespoke gravel bike builder & coffee roaster. Sourcing rare steel frames and sustainable parts.',
    occupation: 'Frame Builder & Craftsman',
    verified: true,
    joinedDate: 'Joined May 2024',
    stats: {
      vibesScore: 98,
      followers: 4100,
      itemsSold: 53,
      sellerRating: 5.0,
      reviewsCount: 62,
    },
    datingProfile: {
      active: true,
      gender: 'Man',
      interestedIn: 'Women',
      intent: 'Long-term relationship',
      height: "6'1\"",
      languages: ['English', 'Spanish'],
      passions: ['Cycling Tours', 'Specialty Coffee', 'Woodworking', 'Indie Cinema', 'Camping'],
      prompts: [
        {
          question: 'I get way too excited about...',
          answer: 'Flawless TIG welding on vintage Reynolds 853 steel tubes and naturally processed Ethiopian coffees.'
        }
      ],
      dateIdea: 'Tandem ride along Regent’s Canal up to Victoria Park market for sourdough pastries.'
    }
  }
];

export const CURRENT_USER: UserProfile = MOCK_USERS[0];

export const MOCK_ITEMS: MarketplaceItem[] = [
  {
    id: 'item_1',
    title: 'Leica M6 Rangefinder 35mm (Black Paint 0.72x)',
    price: 2450,
    currency: 'USD',
    category: 'Electronics & Tech',
    condition: 'Like New',
    location: { city: 'New York', country: 'United States', flag: '🇺🇸', distanceKm: 3.2, areaName: 'Williamsburg' },
    shippingOption: 'Local Pickup Only',
    description: 'Fully serviced analog classic with buttery smooth shutter mechanism. Light meter calibrated this month. Comes with original leather neck strap, body cap, and presentation box. Zero brassing or scratches.',
    tags: ['photography', 'leica', 'analog', 'film camera', 'rangefinder'],
    sellerId: 'user_alex',
    createdAt: '2 hours ago',
    saved: false,
    views: 312,
    offersReceived: 4,
    status: 'available',
    themeColor: 'stone',
    visualType: 'camera'
  },
  {
    id: 'item_2',
    title: 'Mid-Century Sculptural Walnut Armchair (Original Fabric)',
    price: 680,
    currency: 'USD',
    category: 'Home, Furniture & Living',
    condition: 'Good',
    location: { city: 'New York', country: 'United States', flag: '🇺🇸', distanceKm: 4.1, areaName: 'Lower East Side' },
    shippingOption: 'Local Delivery',
    description: 'Danish modern lounge chair hand-restored with natural beeswax and organic wool boucle upholstery. Solid American black walnut frame with finger-jointed armrests. Incredibly comfortable reading posture.',
    tags: ['midcentury', 'furniture', 'danish modern', 'walnut', 'interior design'],
    sellerId: 'user_maya',
    createdAt: '5 hours ago',
    saved: true,
    views: 489,
    offersReceived: 6,
    status: 'available',
    themeColor: 'amber',
    visualType: 'chair'
  },
  {
    id: 'item_3',
    title: 'Technics SL-1200MK7 Turntable (Audiophile Modded)',
    price: 950,
    currency: 'USD',
    category: 'Electronics & Tech',
    condition: 'Like New',
    location: { city: 'Tokyo', country: 'Japan', flag: '🇯🇵', distanceKm: 10800, areaName: 'Daikanyama' },
    shippingOption: 'Worldwide Shipping',
    description: 'Direct-drive Japanese turntable with custom silver internal wiring and damping plates. Includes Ortofon Concorde cartridge, dust cover, and reinforced flight case. Express insured worldwide air delivery.',
    tags: ['audio', 'turntable', 'vinyl', 'technics', 'audiophile', 'japan'],
    sellerId: 'user_kenji',
    createdAt: '1 day ago',
    saved: false,
    views: 840,
    offersReceived: 8,
    status: 'available',
    themeColor: 'zinc',
    visualType: 'audio'
  },
  {
    id: 'item_4',
    title: 'Archival 21oz Japanese Selvedge Denim Jacket (Size M)',
    price: 320,
    currency: 'USD',
    category: 'Vintage & Fashion',
    condition: 'Brand New',
    location: { city: 'Lagos', country: 'Nigeria', flag: '🇳🇬', distanceKm: 8500, areaName: 'Victoria Island' },
    shippingOption: 'Worldwide Shipping',
    description: 'Unwashed raw indigo heavyweight shuttle-loom selvedge crafted in Okayama with custom brass buttons and custom Lagos embroidery patch. Stiff, architectural drape that fades into personalized honeycomb patterns.',
    tags: ['fashion', 'streetwear', 'selvedge', 'denim', 'raw denim', 'curated'],
    sellerId: 'user_amina',
    createdAt: '2 days ago',
    saved: false,
    views: 610,
    offersReceived: 3,
    status: 'available',
    themeColor: 'indigo',
    visualType: 'fashion'
  },
  {
    id: 'item_5',
    title: 'Handmade Stoneware Ceramic Vessel #14 (Wabi-Sabi)',
    price: 180,
    currency: 'USD',
    category: 'Art & Collectibles',
    condition: 'Brand New',
    location: { city: 'New York', country: 'United States', flag: '🇺🇸', distanceKm: 4.1, areaName: 'Lower East Side' },
    shippingOption: 'National Shipping',
    description: 'Thrown on the potter wheel using local New York clay infused with iron oxide. High-fired to cone 10 reduction with a matte volcanic ash glaze. Water-tight and weighted for dried branches or sculptural display.',
    tags: ['art', 'ceramics', 'pottery', 'sculpture', 'wabisabi'],
    sellerId: 'user_maya',
    createdAt: '3 days ago',
    saved: false,
    views: 290,
    offersReceived: 2,
    status: 'available',
    themeColor: 'orange',
    visualType: 'art'
  },
  {
    id: 'item_6',
    title: 'Custom Titanium All-Road Gravel Bicycle (54cm)',
    price: 3100,
    currency: 'USD',
    category: 'Vehicles & Mobility',
    condition: 'Like New',
    location: { city: 'London', country: 'United Kingdom', flag: '🇬🇧', distanceKm: 5560, areaName: 'Hackney' },
    shippingOption: 'Worldwide Shipping',
    description: 'Seamless aerospace 3Al/2.5V titanium frame equipped with Shimano GRX 810 groupset, carbon fork, hydraulic disc brakes, and tubeless René Herse 42mm tires. Weighs only 8.4kg. Ready for continent-crossing bikepacking.',
    tags: ['gravel bike', 'titanium', 'cycling', 'bikepacking', 'shimano'],
    sellerId: 'user_liam',
    createdAt: '4 days ago',
    saved: true,
    views: 1250,
    offersReceived: 5,
    status: 'available',
    themeColor: 'emerald',
    visualType: 'bike'
  },
  {
    id: 'item_7',
    title: 'Seiko Prospex "Alpinist" Automatic Watch (Sapphire)',
    price: 540,
    currency: 'USD',
    category: 'Vintage & Fashion',
    condition: 'Like New',
    location: { city: 'Tokyo', country: 'Japan', flag: '🇯🇵', distanceKm: 10800, areaName: 'Shibuya' },
    shippingOption: 'Worldwide Shipping',
    description: 'Iconic sunburst green dial with internal rotating compass ring. Caliber 6R35 automatic movement with 70-hour power reserve. Paired with hand-stitched horween chromexcel leather band.',
    tags: ['watch', 'seiko', 'horology', 'automatic', 'japan'],
    sellerId: 'user_kenji',
    createdAt: '5 days ago',
    saved: false,
    views: 740,
    offersReceived: 7,
    status: 'available',
    themeColor: 'stone',
    visualType: 'watch'
  },
  {
    id: 'item_8',
    title: 'Moog Subharmonicon Semi-Modular Analog Synthesizer',
    price: 580,
    currency: 'USD',
    category: 'Electronics & Tech',
    condition: 'Like New',
    location: { city: 'Berlin', country: 'Germany', flag: '🇩🇪', distanceKm: 6380, areaName: 'Kreuzberg' },
    shippingOption: 'Worldwide Shipping',
    description: 'Polyrhythmic analog synthesizer capable of generating hypnotic nested rhythms and subharmonic chords. 100% working order with all patch cables, power supply, and original box.',
    tags: ['synthesizer', 'moog', 'modular', 'electronic music', 'hardware'],
    sellerId: 'user_elena',
    createdAt: '6 days ago',
    saved: false,
    views: 520,
    offersReceived: 3,
    status: 'available',
    themeColor: 'purple',
    visualType: 'tech'
  }
];

export const MOCK_POSTS: SocialPost[] = [
  {
    id: 'post_1',
    authorId: 'user_maya',
    content: 'Just pulled a fresh batch of wood-fired tea bowls from the kiln after a 72-hour firing run. The ash deposits turned into this deep celadon jade melt. Hosting an open studio viewing in Brooklyn this Saturday afternoon for anyone interested in functional stoneware!',
    location: { city: 'New York', country: 'United States', flag: '🇺🇸', isLocal: true },
    createdAt: '2 hours ago',
    likes: 84,
    hasLiked: false,
    shares: 12,
    vibeTag: 'Studio Life',
    themeGradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    linkedListingId: 'item_5',
    comments: [
      {
        id: 'comm_1',
        authorId: 'user_alex',
        text: 'The crystalline glaze texture on bowl #3 is breathtaking. Will definitely drop by around 3pm!',
        createdAt: '1 hour ago',
        likes: 6
      },
      {
        id: 'comm_2',
        authorId: 'user_liam',
        text: 'Wish I was in NY for this! Hope you do an international batch for shipping soon.',
        createdAt: '45 mins ago',
        likes: 2
      }
    ]
  },
  {
    id: 'post_2',
    authorId: 'user_kenji',
    content: 'Midnight session in Shibuya testing 1970s discrete transistor preamps with Japanese fusion records. The dynamic headroom and analog warmth of magnetic tape is still untouchable in 2026. What’s your desert-island vinyl record?',
    location: { city: 'Tokyo', country: 'Japan', flag: '🇯🇵', isLocal: false },
    createdAt: '6 hours ago',
    likes: 192,
    hasLiked: true,
    shares: 34,
    vibeTag: 'Global Soundscapes',
    themeGradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
    linkedListingId: 'item_3',
    comments: [
      {
        id: 'comm_3',
        authorId: 'user_elena',
        text: 'Ryuichi Sakamoto’s "Thousand Knives" on heavy vinyl. Every time.',
        createdAt: '5 hours ago',
        likes: 18
      }
    ]
  },
  {
    id: 'post_3',
    authorId: 'user_amina',
    content: 'Vibe check from Lagos Art & Runway Week! Our new collaborative capsule with local textile weavers blends hand-loomed Aso Oke with industrial streetwear silhouettes. Love seeing global collectors connecting directly through Vibe without corporate middlemen.',
    location: { city: 'Lagos', country: 'Nigeria', flag: '🇳🇬', isLocal: false },
    createdAt: '1 day ago',
    likes: 310,
    hasLiked: true,
    shares: 58,
    vibeTag: 'Global Runway',
    themeGradient: 'from-rose-500/10 via-amber-500/5 to-transparent',
    linkedListingId: 'item_4',
    comments: [
      {
        id: 'comm_4',
        authorId: 'user_alex',
        text: 'The jacket cut is stunning. Just checked out the listing!',
        createdAt: '18 hours ago',
        likes: 5
      }
    ]
  }
];

export const MOCK_STORIES: StoryPulse[] = [
  {
    id: 'story_1',
    authorId: 'user_alex',
    caption: 'Testing 35mm film stock in Greenpoint',
    location: 'Brooklyn, NYC',
    gradient: 'from-indigo-600 to-rose-600',
    timeAgo: '2h ago',
    views: 140,
    hasViewed: false
  },
  {
    id: 'story_2',
    authorId: 'user_maya',
    caption: 'Glazing ceramics for weekend studio sale',
    location: 'Lower East Side',
    gradient: 'from-amber-600 to-orange-700',
    timeAgo: '4h ago',
    views: 290,
    hasViewed: false
  },
  {
    id: 'story_3',
    authorId: 'user_kenji',
    caption: 'Audio archive night in Daikanyama',
    location: 'Tokyo, JP',
    gradient: 'from-emerald-600 to-teal-800',
    timeAgo: '7h ago',
    views: 480,
    hasViewed: false
  },
  {
    id: 'story_4',
    authorId: 'user_amina',
    caption: 'Sunset fitting session on Victoria Island',
    location: 'Lagos, NG',
    gradient: 'from-purple-600 to-pink-600',
    timeAgo: '9h ago',
    views: 620,
    hasViewed: true
  },
  {
    id: 'story_5',
    authorId: 'user_liam',
    caption: 'Bespoke titanium frame on the alignment jig',
    location: 'Hackney, London',
    gradient: 'from-cyan-700 to-blue-900',
    timeAgo: '12h ago',
    views: 310,
    hasViewed: true
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_1',
    participantId: 'user_maya',
    category: 'marketplace',
    relatedItemId: 'item_2',
    lastMessage: 'Would love to do $640 for pickup this Friday afternoon!',
    lastMessageTime: '12m ago',
    unreadCount: 1,
    messages: [
      {
        id: 'msg_1',
        senderId: 'user_alex',
        text: 'Hi Maya, love the Scandinavian walnut armchair! Is it still available for local pickup in LES?',
        timestamp: '10:14 AM'
      },
      {
        id: 'msg_2',
        senderId: 'user_maya',
        text: 'Hey Alex! Yes, still here in my studio. It is ready for pickup anytime this week.',
        timestamp: '10:18 AM'
      },
      {
        id: 'msg_3',
        senderId: 'user_alex',
        text: 'I submitted an offer for $640. Would love to pick it up Friday afternoon if that works for you.',
        timestamp: '10:22 AM',
        isOffer: true,
        offerAmount: 640,
        offerStatus: 'pending'
      },
      {
        id: 'msg_4',
        senderId: 'user_maya',
        text: 'Would love to do $640 for pickup this Friday afternoon! Offer accepted.',
        timestamp: '10:25 AM'
      }
    ]
  },
  {
    id: 'conv_2',
    participantId: 'user_maya',
    category: 'dating',
    lastMessage: 'Let’s check out that listening bar in Chinatown!',
    lastMessageTime: '1h ago',
    unreadCount: 0,
    messages: [
      {
        id: 'msg_d1',
        senderId: 'user_maya',
        text: 'Hey! Loved your prompt about Bowie and Eno. The Berlin trilogy is unmatched.',
        timestamp: 'Yesterday'
      },
      {
        id: 'msg_d2',
        senderId: 'user_alex',
        text: 'Right?! Low side 2 ambient textures changed everything. Are you free for coffee or drinks this Thursday?',
        timestamp: 'Yesterday'
      },
      {
        id: 'msg_d3',
        senderId: 'user_maya',
        text: 'Let’s check out that listening bar in Chinatown! 7:30pm works great for me.',
        timestamp: '1h ago'
      }
    ]
  },
  {
    id: 'conv_3',
    participantId: 'user_kenji',
    category: 'marketplace',
    relatedItemId: 'item_3',
    lastMessage: 'Packed and ready with tracking number provided via DHL express.',
    lastMessageTime: '3h ago',
    unreadCount: 0,
    messages: [
      {
        id: 'msg_k1',
        senderId: 'user_alex',
        text: 'Kenji, does the Technics turntable support 110V/220V dual voltage?',
        timestamp: '2 days ago'
      },
      {
        id: 'msg_k2',
        senderId: 'user_kenji',
        text: 'Konbanwa Alex. Yes, it has a built-in multi-voltage transformer switch under the platter.',
        timestamp: '1 day ago'
      },
      {
        id: 'msg_k3',
        senderId: 'user_kenji',
        text: 'Packed and ready with tracking number provided via DHL express.',
        timestamp: '3h ago'
      }
    ]
  }
];
