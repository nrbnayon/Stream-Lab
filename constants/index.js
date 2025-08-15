import { AiMagicIcon, CreditCardValidationIcon, DashboardSquare03Icon, Film01Icon, MoneySend02Icon, PlayListIcon, Settings02Icon, Unlink04Icon, Upload01Icon, UserGroupIcon, Wallet05Icon } from "@hugeicons/core-free-icons/index";

const loginAs = ["Viewer", "Film Maker"];

const moviesData = [
   {
      id: 1,
      title: "The Last Journey",
      year: 2025,
      logline:
         "In a gripping tale of courage and discovery, a lone traveler embarks on his final expedition to unearth secrets hidden beneath layers of time and mystery. As he ventures deeper into uncharted lands, every step reveals ancient civilizations, forgotten histories, and dangers that threaten not only his life but the fate of humanity itself.",
      type: "movie",
      genre: ["Action"],
      duration: 128,
      thumbnail_url:
         "https://i.pinimg.com/736x/a1/84/5a/a1845a62b076849b90f30b625b105f0d.jpg",
      trailer_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      full_film_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      rent_price: 4.99,
      buy_price: 14.99,
   },
   {
      id: 2,
      title: "Shadows Over Horizon",
      year: 2024,
      logline:
         "In a futuristic metropolis plagued by corruption and shadowy conspiracies, one detective races against time to unravel the truth behind a mysterious force threatening the city’s fragile peace. Battling powerful enemies and his own demons, he must uncover secrets buried deep in the neon-lit streets before everything falls into chaos.",
      type: "movie",
      genre: ["Sci-Fi", "Thriller"],
      duration: 115,
      thumbnail_url:
         "https://i.pinimg.com/736x/ba/d0/93/bad0936276a699608b5f8ff8e7ad7d14.jpg",
      trailer_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      full_film_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      rent_price: 3.99,
      buy_price: 12.99,
   },
   {
      id: 3,
      title: "Echoes of the Sea",
      year: 2023,
      logline:
         "When a passionate marine biologist uncovers signs of a hidden civilization beneath the ocean’s surface, she embarks on a daring quest filled with peril and wonder. Facing the mysteries of the deep and unexpected alliances, she must protect her discovery from forces eager to exploit it and change the course of history forever.",
      type: "movie",
      genre: ["Adventure", "Fantasy"],
      duration: 142,
      thumbnail_url:
         "https://i.pinimg.com/1200x/5e/a3/2d/5ea32d22203c77ac258aa62c98eef275.jpg",
      trailer_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      full_film_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      rent_price: 5.49,
      buy_price: 15.99,
   },
   {
      id: 4,
      title: "Rise of the Forgotten",
      year: 2025,
      logline:
         "In a world teetering on the brink of darkness, a young hero discovers ancient warriors hidden away by time. With courage and determination, he must rally these forgotten champions to stand against the encroaching shadows and protect the fragile balance between light and dark, facing impossible odds and forging unbreakable bonds.",
      type: "movie",
      genre: ["Action", "Fantasy"],
      duration: 130,
      thumbnail_url:
         "https://i.pinimg.com/736x/f1/80/9c/f1809cf269d723d0b1dc2aedf6d3e546.jpg",
      trailer_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      full_film_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      rent_price: 4.49,
      buy_price: 13.99,
   },
   {
      id: 5,
      title: "Whispers in the Wind",
      year: 2022,
      logline:
         "A poet finds her life forever changed when the whispers carried by the wind reveal voices from another world. Navigating a delicate balance between reality and the mystical, she embarks on a soulful journey to understand these messages, confronting her past and unlocking truths that bind her to a destiny beyond imagination.",
      type: "movie",
      genre: ["Drama", "Romance"],
      duration: 108,
      thumbnail_url:
         "https://i.pinimg.com/736x/c3/a4/1b/c3a41bf5f2e30e8bbe4b0f8a896613bb.jpg",
      trailer_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      full_film_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      rent_price: 3.49,
      buy_price: 11.99,
   },
   {
      id: 6,
      title: "Steel and Ash",
      year: 2024,
      logline:
         "In a brutal dystopian wasteland ravaged by war and chaos, a lone warrior rises from the ashes. With relentless determination, he fights to defend the last bastion of hope and safety, navigating a world where trust is scarce and danger lurks at every turn, testing his strength and spirit to the limit.",
      type: "movie",
      genre: ["Action", "Sci-Fi"],
      duration: 119,
      thumbnail_url:
         "https://i.pinimg.com/736x/25/88/10/2588108b631c8263ab51bb21bf04dbfd.jpg",
      trailer_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      full_film_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      rent_price: 4.99,
      buy_price: 14.49,
   },
   {
      id: 7,
      title: "City of Glass",
      year: 2025,
      logline:
         "In a city where everyone hides behind mirrored masks, a sharp detective must solve a chilling murder mystery. As secrets unravel and illusions shatter, he delves deep into the underworld to expose truths that threaten the fragile facade of society, risking everything to bring justice to the glass city.",
      type: "movie",
      genre: ["Mystery", "Thriller"],
      duration: 124,
      thumbnail_url:
         "https://i.pinimg.com/1200x/61/26/4c/61264ce8f02ac56c9cb7709c920eecbc.jpg",
      trailer_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      full_film_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      rent_price: 4.29,
      buy_price: 13.79,
   },
   {
      id: 8,
      title: "Veil of the Moon",
      year: 2023,
      logline:
         "Bound by a mysterious lunar prophecy, a young woman discovers her destiny intertwines with celestial forces. As the veil between worlds thins, she embarks on a perilous journey filled with magic, secrets, and self-discovery that will change the fate of her family and the world forever.",
      type: "movie",
      genre: ["Fantasy", "Mystery"],
      duration: 137,
      thumbnail_url:
         "https://i.pinimg.com/1200x/6f/65/46/6f654637d171089e3f1f4525212e8ac8.jpg",
      trailer_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      full_film_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      rent_price: 5.19,
      buy_price: 15.29,
   },
   {
      id: 9,
      title: "Ashes and Embers",
      year: 2022,
      logline:
         "Two survivors navigate a world consumed by relentless fires and despair, clinging to hope amidst the ashes. Their journey is a testament to resilience and the human spirit’s power to overcome even the darkest of times, forging bonds that light the way through the embers of their shattered world.",
      type: "movie",
      genre: ["Drama", "Adventure"],
      duration: 111,
      thumbnail_url:
         "https://i.pinimg.com/1200x/82/81/f2/8281f2139e4209f043e9409e8bcfdca1.jpg",
      trailer_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      full_film_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      rent_price: 3.79,
      buy_price: 12.59,
   },
   {
      id: 10,
      title: "The Silent Frontier",
      year: 2024,
      logline:
         "On the edge of the cosmos, an isolated crew receives a mysterious signal from an unknown source. As they venture deeper into the silent frontier, they confront the vast unknown, testing their courage, unity, and the limits of human exploration in a quest that may redefine their existence forever.",
      type: "movie",
      genre: ["Sci-Fi", "Adventure"],
      duration: 126,
      thumbnail_url:
         "https://i.pinimg.com/1200x/d4/99/4a/d4994ac3e2c3c7338f51513a74745f3a.jpg",
      trailer_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      full_film_url:
         "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      rent_price: 4.69,
      buy_price: 14.39,
   },
];

// sidebar-links
const sidebarLinks = {
   user: [
      {
         groupName: "User Tools",
         links: [
            { name: "Dashboard", href: "/dashboard", icon: DashboardSquare03Icon },
            { name: "My Library", href: "/my-library", icon: Film01Icon },
            { name: "Reelbux", href: "/reelbux", icon: Wallet05Icon },
            { name: "Settings", href: "/settings", icon: Settings02Icon },
         ]
      },
      {
         groupName: "Creator Tools",
         links: [
            { name: "My Films", href: "/my-films", icon: PlayListIcon },
            { name: "Distro", href: "/distro", icon: Unlink04Icon },
            { name: "AI Creator Lab", href: "/ai-creator=lab", icon: AiMagicIcon },
            { name: "Submit Film", href: "/submit-film", icon: Upload01Icon },
         ]
      },
   ],
   admin: [
      {
         groupName: "Admin Tools",
         links: [
            { name: "Dashboard", href: "/admin/dashboard", icon: DashboardSquare03Icon },
            { name: "Users", href: "/admin/users", icon: UserGroupIcon },
            { name: "Films", href: "/admin/films", icon: PlayListIcon },
            { name: "Payments", href: "/admin/payments", icon: CreditCardValidationIcon },
            { name: "Distro", href: "/admin/distro", icon: Unlink04Icon },
            { name: "Subscribers", href: "/admin/subscribers", icon: MoneySend02Icon },
            { name: "Settings", href: "/admin/settings", icon: Settings02Icon },
         ]
      }
   ],
};



export { loginAs, moviesData, sidebarLinks };