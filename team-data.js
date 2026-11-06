// Team page content. For each person:
//   short = their contributions (one entry per bullet in their profile). A list adds more bullets, e.g.
//           short: ["First contribution", "Second contribution"],
//   bio   = the longer description shown in the profile pop-up.
//   links = buttons under the bio. Each needs a label and a full address starting with https://
//   gallery = pictures/videos (optional). See the example format at the bottom of this file.

// Helper that makes grey placeholder pictures. Only needed if you use ph("...") in a gallery.
const ph = (text) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>` +
      `<rect width='800' height='500' fill='#2a1517'/>` +
      `<rect x='20' y='20' width='760' height='460' fill='none' stroke='#b3924f'/>` +
      `<text x='400' y='260' fill='#e9dfcd' font-family='Georgia' font-size='36' text-anchor='middle'>${text}</text>` +
      `</svg>`
  );

const TEAM = [
  {
    title: "Project Lead",
    people: [
      {
        name: "Mateus",
        role: "Project Lead / Producer",
        photo: "",
        short: [
          "Created and maintained the project timeline and roadmap.",
          "Kept tasks on track across the team.",
          "Prioritised tasks to maintain consistent progress throughout development.",
        ],
        gallery: [],
      },
    ],
  },
  {
    title: "Design",
    people: [
      {
        name: "Tadgh Gibson",
        role: "Game Designer",
        photo: "",
        short: [
          "Character, enemy and environment concept art and design.",
          "Gameplay design.",
          "Narrative.",
        ],
        bio: "Tadgh is a 2D artist, author and games designer based in Lancaster, UK. They have been published in Reverb, Literary Hatchet, Comics Youth and more, as well as worked freelance with Manchester Museum and Dreamlabs Studio. Tadgh loves anything gothic, horrific, or involving cats.",
        links: [{ label: "Portfolio", url: "https://tagusdog1.wixsite.com/tagusdog" }],
        gallery: [],
      },
      {
        name: "Dylan Liriano",
        role: "Game Designer",
        photo: "",
        short: "Card games & Enemy Design",
        links: [{ label: "Portfolio", url: "https://DylanThinksGames.com" }],
        gallery: [],
      },
    ],
  },
  {
    title: "Programming",
    people: [
      {
        name: "Adam Wright",
        role: "Programmer",
        photo: "",
        short: [
          "Worked on programming across the game, including multiplayer networking, all table games, the campaign loop and ticket shop.",
          "Implemented sophisticated AI players and enemies.",
          "Worked on level design and helped design the games and their rules.",
        ],
        links: [{ label: "Portfolio", url: "https://adamcwright2002.myportfolio.com/" }],
        gallery: [],
      },
      {
        name: "Isaac",
        role: "Gameplay Programmer",
        photo: "",
        short: "Coming Soon",
        bio: "Coming Soon",
        links: [],
        gallery: [],
      },
    ],
  },
  {
    title: "Art",
    people: [
      {
        name: "Raina Fuson",
        role: "3D Character Artist",
        photo: "",
        short: [
          "Character Concepting.",
          "3D character modelling and creation",
        ],
        bio: "Hi I'm Rain! Based in Rural Oregon I have a love for nature and Beasts. I adore a number of creative arts, though my favorites are Writing and Modeling stylized realism. I strive to continue to grow and learn and create new things!",
        links: [
          { label: "LinkedIn", url: "https://www.linkedin.com/in/raina-fuson/" },
          { label: "Portfolio", url: "https://rainingrays.com/" },
        ],
      },
      {
        name: "Abigail Weeden",
        role: "3D Prop Artist",
        photo: "",
        short: "Through the development of the game, I contributed by creating various 3D assets and props. This included assets for the \"Flypt\" game board, the Skeleton Arm, shop and box items such as the Card Lighter, Choir Shell, Reverse Turn Order, Owl Fingers, and the Jumpscare Item, as well as assets used in the gameplay of \"Flashfire\".",
        bio: "My focus is in 3D applications with a specialization in 3D prop creation. I believe that a story can be told with not only audible dialogue, but that strong visuals can enhance and drive a narrative even further. I aspire to keep growing my pool of knowledge to not only better myself as an artist but to be able to share my excitement and passion with others.",
        links: [
          { label: "LinkedIn", url: "https://www.linkedin.com/in/abigail-weeden" },
          { label: "ArtStation", url: "https://abigail_weeden.artstation.com" },
        ],
      },
      {
        name: "Mike Toone",
        role: "Artist / Animator",
        photo: "",
        short: [
          "Models for props and items.",
          "Animations for characters and environment pieces.",
        ],
        bio: "Developer with a passion for systems design and classic RPGs.",
        links: [{ label: "LinkedIn", url: "https://www.linkedin.com/in/mike-toone-jr/" }],
      },
      {
        name: "Anastasia",
        role: "2D Artist",
        photo: "",
        short: "Coming Soon",
        bio: "Coming Soon",
        links: [],
      },
    ],
  },
];

/* Gallery example (add inside a person, after links):

   gallery: [
     { type: "image", src: "images/team/pic.jpg", alt: "what it shows", caption: "optional" },
     { type: "video", src: "images/team/clip.mp4", caption: "optional" },
     { type: "youtube", id: "dQw4w9WgXcQ", caption: "optional" },   // the part after v= in the link
   ],
*/
