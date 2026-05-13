export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  date: string;
  month: string;
  year: string;
  fullDate: string;
  comments: number;
  image: string;
  category: string;
  author: string;
  authorAvatar: string;
}

export const blogCategories = [
  "All",
  "Pet Care",
  "Nutrition",
  "Grooming",
  "Health",
  "Lifestyle",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "pet-patio",
    title: "How to Create a Pet's Patio, or Outdoor Space",
    excerpt:
      "Transform your backyard into a pet-friendly paradise with these tips on creating safe, stimulating outdoor areas that both you and your furry companion will love.",
    content: [
      "Creating a pet-friendly outdoor space is one of the best investments you can make for your furry friend's happiness and well-being. Whether you have a sprawling backyard or a cozy balcony, there are plenty of ways to make it a paradise for your pet.",
      "Start by ensuring the area is fully fenced and secure. Check for any gaps or weak spots where a curious pet might escape. For dogs, a fence height of at least 6 feet is recommended for larger breeds, while smaller dogs may be fine with 4 feet.",
      "Choose pet-safe plants for your outdoor space. Avoid toxic varieties like lilies, azaleas, and oleander. Instead, opt for pet-friendly options like sunflowers, petunias, and rosemary. These not only look beautiful but are completely safe if your pet decides to take a nibble.",
      "Create shaded areas where your pet can rest and cool down. This is especially important during hot summer months. Consider installing a pergola, shade sail, or even planting a tree that will provide natural shade as it grows.",
      "Add enrichment features like digging zones, obstacle courses, or water features. A shallow kiddie pool can be a great way for dogs to cool off, while cats might enjoy a catio with climbing shelves and perches.",
      "Don't forget the basics: fresh water stations, comfortable resting spots, and easy access back into the house. Your pet's outdoor space should be an extension of their indoor comfort, not a replacement for it.",
    ],
    date: "09",
    month: "JUL",
    year: "2025",
    fullDate: "July 9, 2025",
    comments: 0,
    image:
      "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&q=80&w=800",
    category: "Lifestyle",
    author: "Diego Martinez",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
  },
  {
    slug: "exhausted-from-fun",
    title: "Overload Is When A Girl Is Exhausted From Fun",
    excerpt:
      "Understanding the signs of overstimulation in pets and how to ensure your furry friend gets the right balance of play and rest for optimal health.",
    content: [
      "Every pet owner has seen it – your dog or cat has been playing non-stop, and suddenly they collapse into the deepest sleep you've ever seen. While it's adorable, it's also a reminder that our pets need balance between activity and rest.",
      "Overstimulation can manifest in different ways depending on the animal. Dogs might become hyperactive, start nipping, or show signs of anxiety. Cats might hide, become aggressive, or refuse to eat. Recognizing these signs early is key to preventing behavioral issues.",
      "The solution isn't to eliminate play – it's to structure it. Aim for multiple shorter play sessions throughout the day rather than one long marathon. For dogs, 15-30 minute play sessions followed by rest periods work well. Cats typically prefer even shorter bursts of activity.",
      "Mental stimulation is just as important as physical exercise. Puzzle feeders, training sessions, and interactive toys can tire your pet out without the risk of physical overexertion. A 10-minute training session can be as tiring as a 30-minute walk for many dogs.",
      "Watch for signs that your pet has had enough: yawning, looking away, slowing down, or seeking a quiet spot. These are all signals that it's time to wind down. Respect these boundaries and your pet will be happier and healthier for it.",
      "Remember, a well-rested pet is a well-behaved pet. Ensure your furry friend has a comfortable, quiet space where they can retreat when the world gets too exciting.",
    ],
    date: "09",
    month: "JUN",
    year: "2025",
    fullDate: "June 9, 2025",
    comments: 3,
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
    category: "Pet Care",
    author: "Sarah Wilson",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  },
  {
    slug: "dog-flu",
    title: "Dog Flu – Does Your Dog Need Protecting?",
    excerpt:
      "Learn about canine influenza, its symptoms, prevention strategies, and when to visit your veterinarian for the best care of your beloved companion.",
    content: [
      "Canine influenza, commonly known as dog flu, is a highly contagious respiratory disease that has been spreading across the United States. As a responsible pet owner, understanding this illness is crucial for protecting your furry family member.",
      "Dog flu is caused by two main strains: H3N8 and H3N2. Unlike human flu, canine influenza can occur year-round and is spread through respiratory droplets, contaminated surfaces, and direct contact with infected dogs.",
      "Symptoms of dog flu include persistent coughing, nasal discharge, fever, lethargy, reduced appetite, and eye discharge. While most dogs recover within 2-3 weeks, some can develop severe complications like pneumonia, especially puppies, senior dogs, and those with compromised immune systems.",
      "Prevention is your best defense. The canine influenza vaccine is available and recommended for dogs that are frequently in social settings like dog parks, daycare, boarding facilities, or dog shows. Talk to your veterinarian about whether the vaccine is right for your dog.",
      "If you suspect your dog has the flu, isolate them from other dogs immediately and contact your veterinarian. Most cases can be managed with rest, fluids, and supportive care. However, severe cases may require hospitalization and antibiotics to prevent secondary bacterial infections.",
      "At Simply Diego's, we carry immune-boosting supplements and nutritional support products that can help keep your dog's immune system strong. Come visit us to learn more about protecting your pet's health naturally.",
    ],
    date: "07",
    month: "JUN",
    year: "2025",
    fullDate: "June 7, 2025",
    comments: 0,
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=800",
    category: "Health",
    author: "Dr. James Chen",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
  },
  {
    slug: "puppy-growth",
    title: "The Best Natural Foods for Puppy Growth",
    excerpt:
      "Discover the top natural food options that support healthy puppy development, from premium proteins to essential vitamins your growing pup needs.",
    content: [
      "The first year of a puppy's life is a critical period for growth and development. What they eat during this time can set the foundation for their long-term health. Choosing the right natural foods is one of the most important decisions you'll make as a new pet parent.",
      "Protein is the cornerstone of puppy nutrition. Look for foods with high-quality animal proteins like chicken, turkey, fish, or lamb as the first ingredient. Puppies need about 22-32% protein in their diet, compared to 18-25% for adult dogs.",
      "Healthy fats, particularly DHA (docosahexaenoic acid), are essential for brain and eye development. Fish oil, salmon, and flaxseed are excellent sources. Aim for foods that contain at least 8% fat for optimal puppy growth.",
      "Don't overlook the importance of calcium and phosphorus for developing bones and teeth. However, too much can be just as harmful as too little, especially for large breed puppies. A calcium-to-phosphorus ratio of 1.2:1 is generally recommended.",
      "Whole food ingredients like sweet potatoes, blueberries, spinach, and pumpkin provide natural vitamins, minerals, and antioxidants. These are preferable to synthetic supplements because they're more bioavailable and come with beneficial fiber.",
      "At Simply Diego's, we specialize in natural, wholesome puppy food options. Our nutrition counselors can help you choose the perfect diet plan based on your puppy's breed, size, and activity level. Stop by for a free nutrition consultation!",
    ],
    date: "12",
    month: "AUG",
    year: "2025",
    fullDate: "August 12, 2025",
    comments: 2,
    image:
      "https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?auto=format&fit=crop&q=80&w=800",
    category: "Nutrition",
    author: "Diego Martinez",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
  },
  {
    slug: "winter-care",
    title: "Winter Care Tips for Your Senior Dog",
    excerpt:
      "Keep your aging companion comfortable and healthy during cold months with these essential winter care strategies designed for senior dogs.",
    content: [
      "Winter can be particularly challenging for senior dogs. As dogs age, they become more susceptible to cold weather, joint pain, and seasonal ailments. With proper care and attention, you can help your aging companion stay comfortable throughout the colder months.",
      "Arthritis and joint pain tend to worsen in cold weather. Keep your senior dog warm with a cozy bed away from drafts, and consider a heated pet pad for extra comfort. Shorter, more frequent walks are better than long outings in harsh weather.",
      "Paw care is essential during winter. Road salt and ice can irritate and crack your dog's paw pads. Use pet-safe paw balm before walks and wipe their paws when you come inside. Dog boots are a great option for sensitive paws.",
      "Maintain a healthy diet with foods rich in omega-3 fatty acids to support joint health. Glucosamine and chondroitin supplements can also help. Ask us at Simply Diego's about our range of senior dog supplements and joint support products.",
      "Keep your senior dog active indoors when it's too cold outside. Gentle indoor games, puzzle toys, and short training sessions can provide mental and physical stimulation without exposure to harsh weather.",
      "Regular veterinary check-ups become even more important during winter. Cold weather can exacerbate existing health conditions. Stay on top of your senior dog's health with regular wellness visits and don't hesitate to call your vet if you notice any changes in behavior or appetite.",
    ],
    date: "15",
    month: "DEC",
    year: "2024",
    fullDate: "December 15, 2024",
    comments: 5,
    image:
      "https://images.unsplash.com/photo-1477884213360-7e9d7dcc8f9b?auto=format&fit=crop&q=80&w=800",
    category: "Pet Care",
    author: "Sarah Wilson",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  },
  {
    slug: "diy-grooming-tips",
    title: "DIY Grooming Tips Every Pet Owner Should Know",
    excerpt:
      "Master the basics of at-home pet grooming with these professional techniques that will keep your pet looking great between professional sessions.",
    content: [
      "Regular grooming is essential for your pet's health and well-being. While professional grooming is important, there's a lot you can do at home to keep your pet looking and feeling great between visits. Here are some expert tips to get you started.",
      "Brushing should be a regular part of your routine. For long-haired breeds, daily brushing prevents mats and tangles. Short-haired breeds benefit from weekly brushing to remove loose fur and distribute natural oils. Always brush in the direction of hair growth.",
      "Bath time doesn't have to be stressful. Use lukewarm water and a pet-specific shampoo. Avoid human shampoos as they can disrupt your pet's skin pH. For dogs, bathing every 4-6 weeks is typically sufficient unless they get particularly dirty.",
      "Nail trimming is one of the most dreaded grooming tasks, but it's crucial. Overgrown nails can cause pain and walking issues. If you can hear your pet's nails clicking on the floor, they're too long. Use sharp, pet-specific clippers and trim just the tip to avoid the quick.",
      "Don't forget dental care! Dental disease is one of the most common health issues in pets. Brush your pet's teeth regularly with pet-safe toothpaste and provide dental chews. At Simply Diego's, we carry a variety of dental health products for dogs and cats.",
      "Come visit our DIY Dog Wash station at Simply Diego's! We provide all the supplies – professional-grade shampoo, conditioner, towels, and dryers. It's the perfect way to give your pup a thorough bath without the mess at home.",
    ],
    date: "22",
    month: "MAY",
    year: "2025",
    fullDate: "May 22, 2025",
    comments: 7,
    image:
      "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800",
    category: "Grooming",
    author: "Diego Martinez",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(
  currentSlug: string,
  count: number = 3
): BlogPost[] {
  const currentPost = getBlogPost(currentSlug);
  if (!currentPost) return blogPosts.slice(0, count);

  // Prioritize same category, then most recent
  return blogPosts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      if (a.category === currentPost.category && b.category !== currentPost.category) return -1;
      if (b.category === currentPost.category && a.category !== currentPost.category) return 1;
      return 0;
    })
    .slice(0, count);
}
