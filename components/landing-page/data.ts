export interface Journey {
  name: string;
  tags: string;
  description: string;
  days: string;
  style: string;
  color: string;
}

export const journeys: Journey[] = [
  {
    name: "The Cultural Triangle",
    tags: "Sigiriya · Dambulla · Kandy",
    description:
      "Follow ancient footsteps, climb the Lion Rock and discover the island’s living heritage.",
    days: "7 days",
    style: "Culture & heritage",
    color: "culture",
  },
  {
    name: "Into the Hill Country",
    tags: "Ella · Nuwara Eliya · Kandy",
    description:
      "Slow train rides, misty mountain mornings and a cup of tea straight from the hills.",
    days: "5 days",
    style: "Nature & adventure",
    color: "hills",
  },
  {
    name: "A Little Coastal Bliss",
    tags: "Galle · Mirissa · Bentota",
    description:
      "Find your rhythm between golden beaches, ocean sunsets and charming coastal towns.",
    days: "6 days",
    style: "Beaches & relaxation",
    color: "coast",
  },
];
