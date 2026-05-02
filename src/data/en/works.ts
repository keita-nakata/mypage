export interface Work {
  title: string;
  imageSrc: string;
  description: string[];
  technologies: string;
  githubUrl?: string;
  publicUrl?: string;
  slideUrl?: string;
  imageList: string[];
}

export const works: Work[] = [
  {
    title: "[Hackathon Grand Prize] Nice Buddy",
    imageSrc: "/img/works/nicebuddy_2.png",
    description: [
      "Won the Grand Prize at a generative AI hackathon hosted by PKSHA Technology (Oct–Nov 2024).",
      "An AI assistant that watches your screen and gives spoken guidance using OpenAI's Chat and Audio APIs.",
      "The AI autonomously judges whether screen context is needed; if so, it automatically takes a screenshot and bases its answer on that information.",
      "When code appears in the response, the code sections are separated from speech and delivered as audio + inline text.",
    ],
    technologies: "React, TypeScript, MUI, Python, FastAPI, OpenAI API",
    githubUrl: "https://github.com/KimuraAkikazu/Nice-Buddy",
    publicUrl: "",
    slideUrl: "https://drive.google.com/drive/folders/1ulu0WAIaY4l3QHyB8974IFvRjzSjrjRJ?usp=sharing",
    imageList: [
      "/img/works/nicebuddy_1.png",
      "/img/works/nicebuddy_2.png",
      "/img/works/nicebuddy_3.png",
      "/img/works/nicebuddy_4.png",
    ],
  },
  {
    title: "Hatai Guest House — Official Website",
    imageSrc: "/img/works/hatai_1.png",
    description: [
      "Official website for Hatai Guest House, a traditional inn in Kumano City, Mie Prefecture.",
      "Built with Next.js + TypeScript on the frontend and Supabase on the backend. An admin panel was also developed to manage news posts and reservation status.",
    ],
    technologies: "Next.js, TypeScript, MUI, Supabase, PostgreSQL",
    githubUrl: "",
    publicUrl: "https://hatai-official.vercel.app/",
    imageList: ["/img/works/hatai_1.png"],
  },
  {
    title: "UEC Map",
    imageSrc: "/img/works/uec-map.png",
    description: [
      "Team project for the 'Real System Creation' course.",
      "A campus map app that makes the most of location data — notably, users can pin comments directly on the map. The UI was polished down to the finest detail.",
      "See the presentation slide linked below.",
    ],
    technologies: "Kotlin, Android Studio",
    githubUrl: "",
    slideUrl:
      "https://www.canva.com/design/DAGi3bgf5Qw/Y1Dv93knYp7Sg5CWCco1dg/view?utm_content=DAGi3bgf5Qw&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h652ab350cc",
    imageList: ["/img/works/uec-map_2.png"],
  },
  {
    title: "Portfolio Site",
    imageSrc: "/img/works/portfolio-site_1.png",
    description: [
      "This very site.",
      "Built with React + TypeScript.",
      "Aimed for a clean, modern design — spacing, font sizes, and image proportions were tuned carefully.",
      "Most UI elements are implemented as reusable components configurable via props.",
    ],
    technologies: "React, TypeScript, MUI, Recharts, Github Pages",
    githubUrl: "https://github.com/keita-nakata/my-portfolio-site",
    publicUrl: "https://keita-nakata.github.io/my-portfolio-site/",
    imageList: ["/img/works/portfolio-site_1.png", "/img/works/portfolio-site_2.png"],
  },
  {
    title: "One Punch Favicon",
    imageSrc: "/img/works/favimaker-preview.png",
    description: [
      "A tool that generates all the files needed for a favicon in one shot.",
      "While setting up favicons for my portfolio, I discovered you need multiple PNG and ICO files. Finding that process tedious, I built this to create the whole set at once.",
      "Uploaded images are sent to the backend, converted into every required format, and stored on AWS S3. The frontend receives the generated URLs so the user can download them. Files on S3 are auto-deleted after a set period.",
      "Frontend deployed on Vercel, backend on Heroku.",
    ],
    technologies: "React, TypeScript, Node.js, Python, FastAPI, AWS (S3)",
    githubUrl: "https://github.com/keita-nakata/one-punch-favicon",
    publicUrl: "https://one-punch-favicon.vercel.app/",
    imageList: [
      "/img/works/favimaker-preview.png",
      "/img/works/favimaker_1.png",
      "/img/works/favimaker_2.png",
    ],
  },
  {
    title: "LINE Ramen Bot",
    imageSrc: "/img/works/ramen-prev.png",
    description: [
      "Built during an internship at System Server Co. (Nagoya) in my third undergraduate year.",
      "A LINE chatbot that infers your mood from a selfie and recommends nearby ramen shops to match.",
      "Uses FaceAPI for emotion detection and the Hot Pepper Gourmet API for restaurant search.",
      "The key challenge was mapping moods to restaurants. Solved it by assigning each emotion a set of keywords, counting keyword matches in shop descriptions, and classifying shops by their highest-matching emotion.",
      "Attempted to migrate to Google Cloud Vision API after FaceAPI discontinued its emotion feature, but abandoned due to complexity.",
    ],
    technologies: "Google Apps Script, FaceAPI, Hot Pepper Gourmet API, LINE Messaging API",
    githubUrl: "https://github.com/keita-nakata/ramen-bot",
    publicUrl: "",
    imageList: ["/img/works/ramen-adviser_1.jpg", "/img/works/ramen-adviser_2.jpg"],
  },
  {
    title: "Lab Attendance Management System",
    imageSrc: "/img/works/osms_1.png",
    description: [
      "A web system showing the in-room status of lab members.",
      "Digitised the paper-and-magnet attendance board the lab had been using.",
      "Wi-Fi connection status is obtained via arp-scan and matched against registered MAC addresses to determine presence.",
      "Focused on replicating every feature of the paper board while keeping the UI intuitive for all members.",
      "To minimise false absences, a member is only marked 'out' after going undetected for a set duration, not after a single missed scan.",
    ],
    technologies: "HTML, CSS, PHP, MySQL, Raspberry Pi, Apache",
    githubUrl: "",
    publicUrl: "",
    imageList: ["/img/works/osms_1.png"],
  },
  {
    title: "L4D2 Custom Map Directory",
    imageSrc: "/img/works/l4d2_2.png",
    description: [
      "A website cataloguing custom maps for Left 4 Dead 2, searchable and sortable by name, difficulty, recommendation score, and more.",
      "A classmate was managing this in Excel, but as the data grew it became hard to maintain — and we wanted to make it publicly accessible. I handle the frontend table view as part of a five-person team.",
    ],
    technologies: "React, TypeScript, MUI, Python, FastAPI",
    githubUrl: "",
    publicUrl: "",
    imageList: ["/img/works/l4d2_1.png", "/img/works/l4d2_2.png"],
  },
  {
    title: "Escape Game: Escape from the Lab",
    imageSrc: "/img/works/game_5.png",
    description: [
      "Started building an escape game with a goal of creating and selling games.",
      "All illustration assets are hand-drawn.",
      "Still in development.",
    ],
    technologies: "Unity, C#, IrisPaint",
    githubUrl: "https://github.com/keita-nakata/EscapeRikei",
    publicUrl: "",
    imageList: [
      "/img/works/game_1.png",
      "/img/works/game_2.png",
      "/img/works/game_3.png",
      "/img/works/game_4.png",
      "/img/works/game_5.png",
    ],
  },
  {
    title: "Color Accessibility App",
    imageSrc: "/img/works/rainbow-colors-154569_640.png",
    description: [
      "A desktop app that reads out color names from anywhere on screen for people with color vision deficiency.",
      "Inspired by a color-blind friend who said conversations often broke down when both sides perceived 'that color on the screen' differently.",
      "Standard Euclidean distance in RGB/CMYK gave perceptually inaccurate results, so I adopted CIEDE2000 — a metric aligned to human color perception — for more natural color name matching.",
      "The backend (returning a color name from an image + screen coordinates) is complete; frontend is planned.",
    ],
    technologies: "Python, OpenCV, CIEDE2000, Swift, Xcode",
    githubUrl: "https://github.com/work1",
    publicUrl: "",
    imageList: ["/img/common/construction.png"],
  },
];
