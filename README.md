# For You ❤️ — A Romantic Interactive Surprise Website for Vaidu (Vaidehi)

A cinematic, modern, deeply emotional interactive surprise website built with **React**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**.

Designed with a luxury dark romantic aesthetic featuring floating 3D rose petals, interactive stardust trails, glassmorphism cards, animated polaroid photo galleries, an authentic wax-sealed royal love letter, and a dramatic confetti finale.

---

## 🌹 Live Customization Guide

All personalization settings are centralized in a single file:  
👉 **[`src/data/content.js`](src/data/content.js)**

You **do not need to touch any component code**. Simply edit `content.js` and drop your photos/music into the folders as described below.

---

### 1. How to Replace Her Name & Your Name

Open `src/data/content.js` and look at the top section:

```javascript
export const siteConfig = {
  // Replace with her real name or nickname (currently customized for Vaidehi & Vaidu)
  recipientName: "Vaidehi",
  nickname: "Vaidu",

  // Replace with your name or signature (e.g., "Alex", "David", "Yours Always")
  senderName: "Yours Always",

  // Your special date (anniversary, the day you met, etc.)
  specialDate: "October 14, 2023",
  ...
```

Her name automatically updates on the Hero dedication, letter salutation, and badges across the website.

---

### 2. How to Replace Your Photos

Place your photos directly in the **`public/images/`** folder with these names:

- `public/images/photo1.jpg`
- `public/images/photo2.jpg`
- `public/images/photo3.jpg`
- `public/images/photo4.jpg`
- `public/images/photo5.jpg`
- `public/images/photo6.jpg`

> 💡 **Tip:** You can use JPG, PNG, or WebP. If you change file extensions or want more photos, simply update the `gallery.photos` list in `src/data/content.js`.

---

### 3. How to Replace Story Content

In `src/data/content.js`, edit the `story.chapters` array:

```javascript
story: {
  heading: "Our Little Story ❤️",
  subheading: "Every second with you, Vaidu, feels like my favorite chapter.",
  chapters: [
    {
      number: "Chapter 01",
      title: "The Beginning",
      date: "The Day We First Met",
      description: "It started as an ordinary day...",
      quote: "You felt like home before I even knew you.",
      tag: "Where it all began",
      image: "/images/photo1.jpg",
    },
    ...
  ]
}
```

---

### 4. How to Customize Reasons Why She Is Special

In `src/data/content.js`, edit `reasons.items`. You can add, edit, or remove cards:

```javascript
reasons: {
  heading: "Why Vaidu Is So Special",
  items: [
    {
      id: 1,
      title: "Vaidu's Smile 😊",
      preview: "It instantly lights up any room you walk into.",
      description: "No matter how heavy the world feels...",
      icon: "Smile",
    },
    ...
  ]
}
```

Each card supports tapping to reveal the heartfelt note, and she can click the heart button to favorite her favorite reasons!

---

### 5. How to Customize the Love Letter

In `src/data/content.js`, edit `letter`:

```javascript
letter: {
  heading: "Someone left a letter for Vaidu...",
  buttonText: "Open it 💌",
  closeButtonText: "Fold letter ✉️",
  senderNote: "Sealed with endless love for Vaidehi",
  date: "A quiet midnight",
  salutation: "Dear Vaidu (My Sweet Vaidehi),",
  paragraphs: [
    "I don't know exactly when you became such an important part of my life.",
    "Somehow, conversations became memories, ordinary days became special, and your smile became one of my favorite things.",
    "I just wanted to make this little corner of the internet to remind you that you are genuinely special to me.",
  ],
  closing: "Always & Forever Yours,",
  signature: "❤️",
}
```

When clicked on the website:
1. The wax seal breaks with a burst of stardust.
2. The royal envelope opens in 3D.
3. The textured vintage parchment letter slides out with authentic calligraphy handwriting.

---

### 6. How to Set Your Background Music

The website has a **smart dual-engine audio player**:

1. **Option A (Custom Song):**  
   Save your favorite song or romantic instrumental as **`romantic-ambient.mp3`** in the `public/audio/` folder:  
   `public/audio/romantic-ambient.mp3`  
   The website will automatically play your song!

2. **Option B (Zero Setup Procedural Synthesizer):**  
   If you don't provide an MP3, our built-in romantic Web Audio API synthesizer automatically generates a soothing, dreamy music-box / ambient piano melody in the key of D major.  
   **Audio will NEVER be silent or broken out of the box!**

> 🎵 **Music starts ONLY after she clicks "Open Your Surprise, Vaidu →"**, strictly adhering to browser autoplay policies. The floating music widget in the top-right corner allows her to pause, resume, and mute anytime.

---

## 🚀 Running the Project Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 🌐 Deploying Online (Free & Instant)

To send the link to your girlfriend so she can open it on her phone or computer:

### Option 1: Vercel (Recommended — 2 minutes)
1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository (`bdy`).
4. Click **Deploy**. Vercel will give you a free live URL (e.g. `bdy-five.vercel.app`) to send her!

### Option 2: Netlify
1. Run `npm run build`.
2. Drag and drop the generated `dist/` folder into [Netlify Drop](https://app.netlify.com/drop).
3. Your romantic surprise website is live instantly!

---

## 🎨 Feature Checklist

- [x] Full-screen cinematic landing screen with glowing 3D heart jewel
- [x] Interactive stardust cursor trail that follows mouse movements
- [x] Realistic falling & swaying rose petals canvas
- [x] Floating music equalizer & dual-mode audio engine
- [x] Responsive animated story timeline with photographic chapter memories
- [x] Interactive "Why You Are Special" cards with tap-to-reveal & heart counter
- [x] Vintage polaroid memory wall with washi tape, stamps, and full lightbox
- [x] 3D animated royal wax-sealed envelope with vintage deckled parchment letter
- [x] Dramatic poetic climax with grand multi-burst confetti cannon
- [x] Interactive "Forever & Always ❤️" response buttons
- [x] 100% mobile-optimized and responsive
- [x] High-performance & respects `prefers-reduced-motion`