export type VentureStatus = "LIVE" | "BUILDING";
export type VentureType = "venture" | "nonprofit" | "agency";

export interface Venture {
  id: string;
  name: string;
  tagline: string;
  sector: string;
  category: "Infrastructure" | "Philanthropy" | "Fine Art" | "Agency";
  status: VentureStatus;
  type: VentureType;
  description: string;
  features?: string[];
  url?: string;
  location?: string;
}

export const ventures: Venture[] = [
  // === THE AGENCY ===
  {
    id: "powerclub-global",
    name: "PowerClub Global",
    tagline: "Championing the Bold to Achieve the Extraordinary",
    sector: "Agency",
    category: "Agency",
    status: "LIVE",
    type: "agency",
    description: "An international agency specializing in branding, marketing, and digital innovation for early to mid-stage technology startups.",
    features: [
      "Road show management",
      "Social media strategy",
      "Custom web development",
      "Event production"
    ],
    url: "https://powerclubglobal.com"
  },

  // === INFRASTRUCTURE ===
  {
    id: "alpha-protocol",
    name: "Alpha Protocol",
    tagline: "Where the Web Begins",
    sector: "Decentralized Infrastructure",
    category: "Infrastructure",
    status: "LIVE",
    type: "venture",
    description: "Building the decentralized infrastructure for a free and open internet — returning power to the people.",
    url: "https://alphaprotocol.network"
  },
  {
    id: "omega-wireless",
    name: "Omega Wireless",
    tagline: "Privacy Without Compromise",
    sector: "Privacy Hardware",
    category: "Infrastructure",
    status: "LIVE",
    type: "venture",
    description: "Privacy-focused hardware for sovereign individuals. Enterprise-grade mesh routers, privacy phones, and decentralized network infrastructure — all open source and auditable.",
    features: [
      "GrapheneOS privacy phones",
      "WiFi 6E mesh routers",
      "LoRa long-range relay nodes",
      "Alpha Protocol Network integration"
    ],
    url: "https://omegawireless.xyz"
  },
  {
    id: "spectrum-galactic",
    name: "Spectrum Galactic",
    tagline: "Beyond the Horizon",
    sector: "Aerospace Technology",
    category: "Infrastructure",
    status: "BUILDING",
    type: "venture",
    description: "Advancing humanity's reach through aerospace and spectrum technology."
  },
  {
    id: "pythia-ai",
    name: "Pythia AI",
    tagline: "Intelligence Amplified",
    sector: "Artificial Intelligence",
    category: "Infrastructure",
    status: "BUILDING",
    type: "venture",
    description: "Developing advanced artificial intelligence systems for the betterment of humanity.",
    url: "https://pythia-ai.xyz"
  },

  // === PHILANTHROPY (Non-Profit) ===
  {
    id: "emergence-institute",
    name: "Emergence Institute",
    tagline: "Cultivating Brilliance",
    sector: "Non-Profit",
    category: "Philanthropy",
    status: "LIVE",
    type: "nonprofit",
    description: "A nonprofit dedicated to supporting gifted youth in Ponca City, Oklahoma — providing resources, workshops, and collaborative spaces for the next generation of innovators.",
    features: [
      "Cutting-edge equipment access",
      "Workshops and seminars",
      "Exhibitions and showcases",
      "Networking and collaboration"
    ],
    url: "https://www.emergence-institute.org",
    location: "223 West Grand Ave, Ponca City, OK"
  },

  // === FINE ART ===
  {
    id: "fine-art-society",
    name: "Fine Art Society",
    tagline: "Timeless Fine Art for the Modern Collector",
    sector: "Art Gallery",
    category: "Fine Art",
    status: "LIVE",
    type: "venture",
    description: "Bridging classical art appreciation with contemporary collecting through physical and virtual gallery experiences.",
    features: [
      "Physical gallery in Ponca City, OK",
      "Virtual 3D gallery experience",
      "Featured artists program",
      "Events and expositions"
    ],
    url: "https://fineartsociety.xyz",
    location: "223 West Grand Ave, Ponca City, OK"
  }
];

// Helper functions
export const agencyVenture = ventures.find(v => v.type === "agency")!;
export const infrastructureVentures = ventures.filter(v => v.category === "Infrastructure");
export const philanthropyVentures = ventures.filter(v => v.category === "Philanthropy");
export const fineArtVentures = ventures.filter(v => v.category === "Fine Art");
export const liveVentures = ventures.filter(v => v.status === "LIVE");
export const buildingVentures = ventures.filter(v => v.status === "BUILDING");
