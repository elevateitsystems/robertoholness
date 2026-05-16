import { 
  Bath, 
  Truck, 
  HeartPulse, 
  Store, 
  Clock, 
  MapPin, 
  ShoppingBag, 
  ClipboardCheck, 
  Apple, 
  BrainCircuit,
  Package,
  DollarSign,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Calendar,
  ChevronRight
} from "lucide-react";

// Mapping string icon names to Lucide components
export const iconMap: Record<string, any> = {
  bath: Bath,
  truck: Truck,
  "heart-pulse": HeartPulse,
  store: Store,
  clock: Clock,
  "map-pin": MapPin,
  "shopping-bag": ShoppingBag,
  "clipboard-check": ClipboardCheck,
  apple: Apple,
  "brain-circuit": BrainCircuit,
  package: Package,
  "dollar-sign": DollarSign,
  "check-circle-2": CheckCircle2,
  "shield-check": ShieldCheck,
  phone: Phone,
  calendar: Calendar,
  "chevron-right": ChevronRight
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string;
  fullDescription?: string;
  imageUrl?: string;
  icon?: string;
  category?: string;

  priceType?: "free" | "fixed" | "starting_from" | "custom";
  price?: number;

  durationMinutes?: number;

  availabilityType?: "walk_in" | "appointment" | "scheduled" | "anytime";

  actionType?: "call" | "book" | "order" | "message" | "directions";
  actionLabel?: string;
  actionUrl?: string;

  metadata?: {
    gradientTitle?: string;
    badge?: string;
    theme?: {
      primary: string;
      secondary: string;
      gradient: string;
      badgeBg: string;
      badgeText: string;
      iconBg: string;
      borderColor: string;
    };
    features?: {
      icon: string;
      title: string;
      description: string;
    }[];
    listingFeatures?: string[];
    steps?: {
      icon: string;
      title: string;
      text: string;
      gradient?: string;
    }[];
    pricing?: {
      label: string;
      price: string;
    }[];
    proTip?: string;
    includedListTitle?: string;
    includedItems?: string[];
    [key: string]: any;
  };
};

export const servicesData: Record<string, Service> = {
  "diy-dog-wash": {
    id: "1",
    slug: "diy-dog-wash",
    name: "DIY Dog Wash",
    category: "pet_care",
    shortDescription: "Our state-of-the-art DIY dog wash stations make bath time a breeze. No more backaches or messy bathrooms – we provide the professional-grade tubs, premium shampoos, brushes, and towels.",
    fullDescription: "Keep your home clean and your pup fresh. Our professional-grade tubs are designed for comfort and safety, making bath time a fun bonding experience.",
    icon: "bath",
    imageUrl: "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&q=80&w=1200",
    priceType: "fixed",
    price: 15,
    durationMinutes: 30,
    availabilityType: "walk_in",
    actionType: "book",
    actionLabel: "Book Wash",
    actionUrl: "https://shop.simplydlegos.com",
    metadata: {
      gradientTitle: "Stress-Free Bathing.",
      badge: "Our Most Popular Service",
      theme: {
        primary: "primary",
        secondary: "secondary",
        gradient: "from-primary/10 to-primary/5",
        badgeBg: "bg-primary/15",
        badgeText: "text-primary",
        iconBg: "bg-gradient-to-br from-primary to-warm-orange",
        borderColor: "border-primary/20"
      },
      features: [
        {
          icon: "bath",
          title: "Professional Tubs",
          description: "Waist-high tubs designed to prevent back strain while keeping your pet secure."
        },
        {
          icon: "shield-check",
          title: "Premium Supplies",
          description: "We provide natural shampoos, conditioners, and professional-grade dryers."
        },
        {
          icon: "check-circle-2",
          title: "We Clean Up",
          description: "The best part: you leave the mess to us! We sanitize every tub after use."
        }
      ],
      listingFeatures: [
        "Professional Tubs",
        "Premium Shampoos",
        "Towels Provided",
        "No Cleanup for You",
      ],
      includedListTitle: "What's Included?",
      includedItems: [
        'Professional Waist-High Tubs',
        'Aprons for Humans',
        'Natural Shampoos & Conditioners',
        'Variety of Brushes & Combs',
        'High-Velocity Dryers',
        'Fluffy Towels',
        'Ear Cleaner & Cotton Balls',
        'Sanitized Workspace'
      ],
      pricing: [
        { label: 'Small Dogs (under 25lbs)', price: '$15' },
        { label: 'Medium Dogs (25-50lbs)', price: '$18' },
        { label: 'Large Dogs (50-90lbs)', price: '$22' },
        { label: 'Extra Large Dogs (90lbs+)', price: '$25' },
      ],
      proTip: "We recommend bringing your dog's favorite treats to keep them happy during the bath."
    }
  },
  "local-delivery": {
    id: "2",
    slug: "local-delivery",
    name: "Local Delivery",
    category: "delivery",
    shortDescription: "Can't make it to the store? No problem! We offer fast, reliable local delivery across Albuquerque. Get your pet's favorite food delivered right to your porch.",
    fullDescription: "Albuquerque's fastest way to get natural pet food. Skip the trip and let us bring the best supplies directly to you.",
    icon: "truck",
    imageUrl: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80&w=1200",
    priceType: "starting_from",
    price: 5,
    availabilityType: "scheduled",
    actionType: "order",
    actionLabel: "Order Delivery",
    actionUrl: "https://shop.simplydlegos.com",
    metadata: {
      gradientTitle: "Right to Your Porch.",
      badge: "Convenient & Reliable",
      theme: {
        primary: "secondary",
        secondary: "accent-green",
        gradient: "from-secondary/10 to-secondary/5",
        badgeBg: "bg-secondary/15",
        badgeText: "text-secondary",
        iconBg: "bg-gradient-to-br from-secondary to-deep-teal",
        borderColor: "border-secondary/20"
      },
      features: [
        {
          icon: "package",
          title: "Order Online",
          description: "Browse our full selection of food, treats, and toys on our online store."
        },
        {
          icon: "dollar-sign",
          title: "Free Over $50",
          description: "Delivery is FREE for orders over $50. Small flat fee for smaller orders."
        },
        {
          icon: "clock",
          title: "Same-Day Delivery",
          description: "Order by 12 PM for guaranteed same-day delivery in the Albuquerque area."
        }
      ],
      listingFeatures: [
        "Fast Turnaround",
        "Albuquerque Area",
        "Free Over $50",
        "Contactless Option",
      ],
      steps: [
        { icon: "package", title: '1. Order Online', text: 'Select "Local Delivery" at checkout.' },
        { icon: "dollar-sign", title: '2. Free Over $50', text: 'Orders under $50 have a small flat fee of $5.99.' },
        { icon: "check-circle-2", title: '3. Same-Day Delivery', text: 'Fast turnaround so your pet never goes hungry.' }
      ]
    }
  },
  "nutritional-counseling": {
    id: "3",
    slug: "nutritional-counseling",
    name: "Nutritional Counseling",
    category: "consultation",
    shortDescription: "Every pet is unique. Our expert counselors help you navigate the complex world of pet nutrition to find the perfect diet for your dog or cat.",
    fullDescription: "What you put in their bowl matters. Our experts help you unlock your pet's full potential through science-backed, natural nutrition.",
    icon: "heart-pulse",
    imageUrl: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1200",
    priceType: "custom",
    availabilityType: "appointment",
    durationMinutes: 60,
    actionType: "book",
    actionLabel: "Schedule Session",
    actionUrl: "/contact",
    metadata: {
      gradientTitle: "Counseling.",
      badge: "Expert Guidance",
      theme: {
        primary: "accent-green",
        secondary: "secondary",
        gradient: "from-accent-green/10 to-accent-green/5",
        badgeBg: "bg-accent-green/15",
        badgeText: "text-accent-green",
        iconBg: "bg-gradient-to-br from-accent-green to-[#6BA033]",
        borderColor: "border-accent-green/20"
      },
      features: [
        {
          icon: "clipboard-check",
          title: "Tailored Analysis",
          description: "We evaluate your pet's age, breed, weight, and activity level to create a custom profile."
        },
        {
          icon: "apple",
          title: "Ingredient Clarity",
          description: "We explain exactly what's in the food and why it matters for your pet's specific health goals."
        },
        {
          icon: "brain-circuit",
          title: "Problem Solving",
          description: "From allergies and skin issues to weight management, we address specific health concerns."
        }
      ],
      listingFeatures: [
        "Expert Guidance",
        "Allergy Support",
        "Weight Management",
        "Custom Meal Plans",
      ],
      steps: [
        { icon: "clock", title: '01. Schedule Call', text: "Book a 15-minute introductory call to discuss your pet's current diet." },
        { icon: "clipboard-check", title: '02. In-Depth Review', text: "We perform a deep dive into your pet's history and health markers." },
        { icon: "brain-circuit", title: '03. Custom Roadmap', text: 'Receive a detailed nutrition plan including recommended foods.' },
        { icon: "check-circle-2", title: '04. Ongoing Support', text: "We're with you every step with follow-up check-ins." },
      ],
      includedListTitle: "What We Address:",
      includedItems: [
        'Food Sensitivities & Allergies',
        'Weight Management (Gain/Loss)',
        'Digestive Health Issues',
        'Joint & Mobility Support',
        'Dull Coat & Skin Irritations',
        'Picky Eaters & Appetite Loss'
      ]
    }
  },
  "pickup-services": {
    id: "4",
    slug: "pickup-services",
    name: "Pickup Services",
    category: "pickup",
    shortDescription: 'Short on time? Order through our online store and select "Pickup". We\'ll have your items ready and waiting.',
    fullDescription: "Order from your couch and grab it on the go. Choose between quick in-store pickup or our convenient contactless curbside service.",
    icon: "store",
    imageUrl: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=1200",
    priceType: "free",
    price: 0,
    availabilityType: "scheduled",
    actionType: "directions",
    actionLabel: "Get Directions",
    actionUrl: "https://shop.simplydlegos.com",
    metadata: {
      gradientTitle: "On Your Schedule.",
      badge: "Fast & Contactless",
      theme: {
        primary: "warm-orange",
        secondary: "primary",
        gradient: "from-warm-orange/10 to-warm-orange/5",
        badgeBg: "bg-warm-orange/15",
        badgeText: "text-warm-orange",
        iconBg: "bg-gradient-to-br from-warm-orange to-primary",
        borderColor: "border-warm-orange/20"
      },
      features: [
        {
          icon: "store",
          title: "In-Store Pickup",
          description: "Swing by and say hi! Your order will be waiting at our dedicated pickup counter."
        },
        {
          icon: "map-pin",
          title: "Curbside Pickup",
          description: "Park in our designated spots and we'll bring your order right to your car."
        },
        {
          icon: "shield-check",
          title: "Safe & Fresh",
          description: "We ensure all items are stored correctly and securely until you arrive."
        }
      ],
      listingFeatures: [
        "Easy Online Ordering",
        "Curbside Available",
        "Ready in Minutes",
        "No Extra Fees",
      ],
      steps: [
        { icon: "shopping-bag", title: 'Shop Online', text: 'Select "Store Pickup" at checkout.' },
        { icon: "clock", title: 'We Prep', text: 'We pick and pack your items with care.' },
        { icon: "shield-check", title: 'Get Notified', text: "Receive an email when it's ready." },
        { icon: "map-pin", title: 'Pick It Up', text: 'Swing by and grab your gear!' }
      ]
    }
  }
};
