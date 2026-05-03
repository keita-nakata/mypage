export interface Hobby {
  imageUrl: string;
  title: string;
  description: string[];
  scale: number;
}

export const hobbies: Hobby[] = [
  {
    imageUrl: "/img/profile/baseball.jpeg",
    title: "Baseball",
    description: [
      "Started playing baseball in 1st grade of elementary school.",
      "Played on baseball teams through university.",
    ],
    scale: 0.7,
  },
  {
    imageUrl: "/img/profile/fishing.jpg",
    title: "Fishing",
    description: [
      "Started with bass fishing, but have mostly switched to sea fishing lately. My dream catch is a yellowtail.",
      "Couldn't find a good recent photo — this one is from middle school. Turns out it's the biggest largemouth bass I've ever caught.",
    ],
    scale: 0.5,
  },
  {
    imageUrl: "/img/profile/running_1.png",
    title: "Running",
    description: [
      "Running in pursuit of the lean physique I had in high school.",
      "Living in Tokyo, I'd love to run the Tokyo Marathon if I ever get the chance.",
      "Photo: 2024 Tsu City Marathon.",
    ],
    scale: 0.6,
  },
];
