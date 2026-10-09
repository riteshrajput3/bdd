/**
 * =========================================================================
 *  HAPPY BIRTHDAY MEENU 🎂❤️ - PERSONALIZATION CONFIGURATION
 * =========================================================================
 * 
 * 💡 HOW TO EDIT THE BIRTHDAY LETTER:
 * Scroll down to section 5 (letter) below, and you can edit:
 * - salutation: How you want to address her (e.g. "My Dearest Meenu,")
 * - paragraphs: Array of sentences/paragraphs written from your heart
 * - closing: Closing sign-off (e.g. "Forever yours,")
 * - signature: Your name or sign-off
 * =========================================================================
 */

export const siteConfig = {
  // --- Names & General Info ---
  recipientName: "Meenu",
  nickname: "Meenu",
  senderName: "Yours Forever ❤️",
  specialDate: "10th October, 2026",
  birthdayDate: "2026-10-10T00:00:00+05:30",

  // --- Audio Settings ---
  audio: {
    trackTitle: "Happy Birthday Melody 🎂🎵",
    audioSrc: "/audio/romantic-ambient.mp3",
    synthFallback: true,
  },

  // --- 1. HERO / LANDING SCREEN ---
  hero: {
    badge: "🎂 10th October • It's Meenu's Birthday! 🎂",
    greeting: "Happy Birthday, Meenu! 🎂❤️",
    subtitle: "Today is all about celebrating the most incredible, beautiful girl in my life.",
    ctaButton: "Open Your Birthday Surprise →",
    hintText: "Click anywhere for floating birthday sparkles & melody",
    heroImage: "/images/photo1.jpg",
  },

  // --- 2. OUR STORY TIMELINE ---
  story: {
    heading: "Our Beautiful Journey ❤️",
    subheading: "Every single moment with you, Meenu, is a memory I will treasure forever.",
    chapters: [
      {
        number: "Chapter 01",
        title: "The Day You Entered My Life",
        date: "When My World Changed",
        description:
          "Life was just regular days turning into nights until the day you walked in. That very first conversation, that effortless smile, and the warmth of your presence changed everything for me. I knew right then that someone truly special had arrived.",
        icon: "Sparkles",
        tag: "Where our magic began",
        image: "/images/photo2.jpg",
        quote: "You felt like home before I even knew you.",
      },
      {
        number: "Chapter 02",
        title: "Late Night Talks & Endless Laughs",
        date: "Falling Deeper Everyday",
        description:
          "From sharing silly random thoughts to talking about our deepest dreams until the early morning hours. Somewhere between our shared laughter, secrets, and comfortable silences, you quietly became my favorite person in the entire world.",
        icon: "HeartHandshake",
        tag: "When you became my favorite",
        image: "/images/photo3.jpg",
        quote: "Every love song suddenly sounded like you.",
      },
      {
        number: "Chapter 03",
        title: "Precious Moments & Candid Memories",
        date: "Treasured In My Heart",
        description:
          "Every snapshot we captured, every candid expression, every spontaneous plan, and even the simple quiet moments sitting beside you. You bring genuine color, peace, and warmth into my world every single day.",
        icon: "Camera",
        tag: "Pure happiness together",
        image: "/images/photo4.jpg",
        quote: "My favorite place in the world is right beside you.",
      },
      {
        number: "Chapter 04",
        title: "Today & Countless Birthdays Ahead",
        date: "10th October 2026 & Forever",
        description:
          "Today on your birthday, we celebrate the wonderful human you are. This is just one of the infinite birthdays we are going to celebrate together. I promise to always stand by your side, make you smile, and love you more and more every single day.",
        icon: "Compass",
        tag: "Forever & always, Meenu",
        image: "/images/photo6.jpg",
        quote: "I choose you today, tomorrow, and in every lifetime.",
      },
    ],
  },

  // --- 3. REASONS WHY MEENU IS SO SPECIAL ---
  reasons: {
    heading: "Why You Mean The World To Me",
    subheading: "There are a million reasons why I fell for you, but here are the ones that make my heart beat faster every day...",
    items: [
      {
        id: 1,
        title: "You Are My Safe Haven 🏡❤️",
        preview: "In a chaotic and noisy world, your presence is my quiet peace.",
        description:
          "With you, I never have to wear a mask or pretend to be someone else. You understand me without me having to explain a single word. Being wrapped in your warmth is the only place that truly feels like home.",
        icon: "Heart",
        gradient: "from-rose-500/25 via-pink-500/20 to-purple-500/20",
      },
      {
        id: 2,
        title: "That Radiant, Irresistible Smile ✨😊",
        preview: "It has the power to turn my worst days into pure sunshine.",
        description:
          "The genuine sparkle in your eyes when you laugh freely, the little crinkle when you're amused, and the effortless grace you carry everywhere. Your smile is honestly my favorite sight on this entire planet.",
        icon: "Smile",
        gradient: "from-amber-500/25 via-rose-500/20 to-pink-500/20",
      },
      {
        id: 3,
        title: "Your Pure & Caring Soul 🌸",
        preview: "A rare heart filled with deep kindness, empathy, and grace.",
        description:
          "You notice the small things, you love unconditionally, and you treat everyone with such gentle tenderness. Having someone with a heart as rare and pure as yours is the greatest blessing of my life.",
        icon: "Sparkles",
        gradient: "from-pink-500/25 via-rose-500/20 to-red-500/20",
      },
      {
        id: 4,
        title: "Our Unspoken Connection & Laughs 😂💕",
        preview: "We can communicate an entire story with just one shared look.",
        description:
          "From uncontrollable laughing fits over the silliest things to deep 2:00 AM philosophical conversations. You match my energy, understand my humor, and share my world like nobody else ever could.",
        icon: "Laugh",
        gradient: "from-fuchsia-500/25 via-pink-500/20 to-rose-500/20",
      },
      {
        id: 5,
        title: "You Are My Person — Today & Always 👑❤️",
        preview: "Loving you is the easiest, most natural decision I've ever made.",
        description:
          "Out of 8 billion people on this planet, my heart chose you without a single hesitation. You are my best friend, my greatest adventure, and my true love. Happy Birthday, my gorgeous Meenu.",
        icon: "Flame",
        gradient: "from-rose-600/30 via-pink-600/25 to-amber-500/25",
      },
    ],
  },

  // --- 4. MEMORY WALL & MAKING MEMORIES SPOTLIGHT ---
  gallery: {
    heading: "Making Memories Together 📸",
    subheading: "Every picture holds a story, every glance holds a feeling. Here's a glimpse into our most cherished moments.",
    // Special AI / Couple Photo Spotlight Card:
    coupleSpotlight: {
      badge: "✨ Our Special Spotlight ✨",
      title: "Making Memories With You",
      subtitle: "You & Me, Writing Our Beautiful Story",
      image: "/images/couple.jpg",
      quote: "In a sea of people, my eyes will always search for you.",
      tag: "Best Moments • Together Forever",
      note: "Every journey is sweeter, every memory is brighter, and every tomorrow is exciting because I get to spend it by your side, Meenu.",
    },
    photos: [
      {
        id: 1,
        src: "/images/photo1.jpg",
        caption: "My Gorgeous Meenu 💕",
        date: "Precious Moment",
        rotation: "-rotate-2",
      },
      {
        id: 2,
        src: "/images/photo2.jpg",
        caption: "The Day We Met ✨",
        date: "Where It All Began",
        rotation: "rotate-3",
      },
      {
        id: 3,
        src: "/images/photo3.jpg",
        caption: "Late Night Talks 😊",
        date: "Endless Laughs",
        rotation: "-rotate-1",
      },
      {
        id: 4,
        src: "/images/photo4.jpg",
        caption: "Walking Together 🌸",
        date: "Pure Joy",
        rotation: "rotate-2",
      },
      {
        id: 5,
        src: "/images/photo5.jpg",
        caption: "You & Me, Always ❤️",
        date: "Together Forever",
        rotation: "-rotate-3",
      },
      {
        id: 6,
        src: "/images/photo6.jpg",
        caption: "Happy Birthday Love 🎂",
        date: "10th October 2026",
        rotation: "rotate-1",
      },
    ],
  },

  // --- 5. BIRTHDAY LETTER FOR MEENU (EDIT HERE) ---
  letter: {
    heading: "A Birthday Letter For Meenu 💌",
    buttonText: "Open Letter 💌",
    closeButtonText: "Fold Letter ✉️",
    senderNote: "Sealed with endless love for Meenu on 10th October 🎂",
    date: "10th October, 2026",
    salutation: "My Dearest Meenu,",
    paragraphs: [
      "Happy Birthday to the most amazing girl in the universe! 🎂❤️",
      "On this special day, I just want to tell you how truly grateful I am that you exist in my life. You bring warmth, sunshine, and boundless happiness wherever you go.",
      "Every conversation with you, every smile we share, and every little memory we create means the entire world to me. You make me laugh like nobody else, you understand me without even saying words, and you inspire me every single day.",
      "On your birthday today, I promise to always stand by you, celebrate your victories, hold your hand through challenges, and love you more with every passing day. I hope this year brings you infinite smiles, great health, success in everything you dream of, and all the happiness you deserve.",
      "Thank you for being my peace, my smile, and my favorite human. Here's to celebrating you today and for all the years to come. ❤️",
    ],
    closing: "Happy Birthday, with all my love,",
    signature: "❤️ Yours Forever",
  },

  // --- 6. FOOTER ---
  footer: {
    message: "Made with endless ❤️, specially for Meenu's Birthday.",
    footnote: "Happy Birthday to my favorite person • 10th October 2026 🎂",
  },
};
