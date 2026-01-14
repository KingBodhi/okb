export type VentureStatus = "LIVE" | "BUILDING";
export type VentureType = "venture" | "nonprofit" | "agency" | "fund";

export interface Venture {
  id: string;
  name: string;
  tagline: string;
  sector: string;
  category: "Infrastructure" | "Philanthropy" | "Agency" | "Oklahoma" | "Fund";
  status: VentureStatus;
  type: VentureType;
  description: string;
  features?: string[];
  url?: string;
  location?: string;
}

export interface PCGClient {
  id: string;
  name: string;
  tagline: string;
  sector: string;
  description: string;
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

  // === THE FUND ===
  {
    id: "okb-ventures",
    name: "OKB Ventures",
    tagline: "Investing in Tomorrow's Legacy",
    sector: "Venture Capital",
    category: "Fund",
    status: "LIVE",
    type: "fund",
    description: "The investment arm of the Family Office. OKB Ventures deploys capital into early-stage ventures that enhance the quality of life for individuals in Oklahoma and beyond — from technology infrastructure to community development.",
    features: [
      "Early-stage venture investments",
      "Oklahoma-focused economic development",
      "Technology and infrastructure focus",
      "Community impact initiatives"
    ],
    url: "https://okb-ventures.vercel.app"
  },

  // === OKLAHOMA ===
  {
    id: "wahzhazhe-industries",
    name: "Wahzhazhe Industries",
    tagline: "Sovereign Manufacturing for a Sovereign Nation",
    sector: "Manufacturing",
    category: "Oklahoma",
    status: "BUILDING",
    type: "venture",
    description: "A manufacturing enterprise on the Osage reservation, building facilities to make the Osage Nation a leading exporter in Oklahoma. From computer parts to aerospace components, creating jobs and economic prosperity for the Wahzhazhe people.",
    features: [
      "Computer parts manufacturing",
      "Robotics and drone production",
      "Aerospace components",
      "Defense equipment manufacturing"
    ],
    location: "Osage Nation, Oklahoma"
  },
  {
    id: "mahnshee-estates",
    name: "Mahⁿshee Estates",
    tagline: "Elevating Communities, One Home at a Time",
    sector: "Real Estate Development",
    category: "Oklahoma",
    status: "BUILDING",
    type: "venture",
    description: "Redeveloping Oklahoma neighborhoods into thriving communities through strategic acquisition, renovation, and resale of homes. Building wealth and stability for Oklahoma families.",
    features: [
      "Neighborhood revitalization",
      "Home renovation and resale",
      "Community development",
      "Affordable housing initiatives"
    ],
    location: "Oklahoma"
  }
];

// PCG Portfolio - Clients and projects powered by PowerClub Global
export const pcgPortfolio: PCGClient[] = [];

// Helper functions
export const agencyVenture = ventures.find(v => v.type === "agency")!;
export const fundVenture = ventures.find(v => v.type === "fund")!;
export const infrastructureVentures = ventures.filter(v => v.category === "Infrastructure");
export const philanthropyVentures = ventures.filter(v => v.category === "Philanthropy");
export const oklahomaVentures = ventures.filter(v => v.category === "Oklahoma");
export const liveVentures = ventures.filter(v => v.status === "LIVE");
export const buildingVentures = ventures.filter(v => v.status === "BUILDING");
export const portfolioVentures = ventures.filter(v => v.type !== "agency" && v.type !== "fund");
