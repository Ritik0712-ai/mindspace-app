// Pseudonym Generator for MindSpace
// Generates anonymous animal identities like "Blue Elephant 🐘"

const animals = [
  { name: "Elephant", emoji: "🐘" },
  { name: "Fox", emoji: "🦊" },
  { name: "Deer", emoji: "🦌" },
  { name: "Owl", emoji: "🦉" },
  { name: "Bear", emoji: "🐻" },
  { name: "Wolf", emoji: "🐺" },
  { name: "Rabbit", emoji: "🐰" },
  { name: "Tiger", emoji: "🐯" },
  { name: "Panda", emoji: "🐼" },
  { name: "Dolphin", emoji: "🐬" },
  { name: "Eagle", emoji: "🦅" },
  { name: "Lion", emoji: "🦁" },
  { name: "Turtle", emoji: "🐢" },
  { name: "Otter", emoji: "🦦" },
  { name: "Koala", emoji: "🐨" },
  { name: "Cat", emoji: "🐱" },
  { name: "Dog", emoji: "🐶" },
  { name: "Penguin", emoji: "🐧" },
  { name: "Peacock", emoji: "🦚" },
  { name: "Butterfly", emoji: "🦋" },
];

const colors = [
  { name: "Blue", hex: "#60A5FA" },
  { name: "Green", hex: "#34D399" },
  { name: "Purple", hex: "#A78BFA" },
  { name: "Teal", hex: "#2DD4BF" },
  { name: "Orange", hex: "#FB923C" },
  { name: "Pink", hex: "#F472B6" },
  { name: "Indigo", hex: "#818CF8" },
  { name: "Amber", hex: "#FBBF24" },
  { name: "Cyan", hex: "#22D3EE" },
  { name: "Rose", hex: "#FB7185" },
  { name: "Emerald", hex: "#10B981" },
  { name: "Violet", hex: "#8B5CF6" },
  { name: "Sky", hex: "#38BDF8" },
  { name: "Lime", hex: "#A3E635" },
  { name: "Fuchsia", hex: "#D946EF" },
];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export interface Pseudonym {
  pseudonym: string;     // "Blue Elephant"
  emoji: string;         // "🐘"
  color: string;         // "#60A5FA"
  colorName: string;     // "Blue"
  animalName: string;    // "Elephant"
}

/**
 * Generate a random pseudonym for anonymous user identity
 * Returns an object with pseudonym details
 */
export function generatePseudonym(): Pseudonym {
  const color = getRandomElement(colors);
  const animal = getRandomElement(animals);
  
  return {
    pseudonym: `${color.name} ${animal.name}`,
    emoji: animal.emoji,
    color: color.hex,
    colorName: color.name,
    animalName: animal.name,
  };
}

/**
 * Generate avatar color from palette
 */
export function generateAvatarColor(): string {
  return getRandomElement(colors).hex;
}

/**
 * Get a list of available colors
 */
export function getColorPalette(): typeof colors {
  return colors;
}

/**
 * Get a list of available animals
 */
export function getAnimalPalette(): typeof animals {
  return animals;
}
