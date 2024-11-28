type Site = {
  name: string;
  title: string;
  description: string;
  keywords: string[];
  siteUrl: string;
  creator: {
    name: string;
    url: string;
  };
  ogImage: string;
  links: {
    x: string;
    github: string;
  };
};

export const siteConfig: Site = {
  name: "Travelshare",
  title: "TravelShare - Discover & Share Hidden Places. ",
  description:
    " Discover and share hidden gems with breathtaking photos and precise locations, powered by the community. ",
  keywords: [
    "TravelShare",
    "Travel",
    "Share",
    "Discover",
    "Hidden",
    "Places",
    "github.com/ronitrajfr/travelshare",
    "Ronit Raj",
    "ronitrajfr",
    "Discover and share hidden places",
    "travelshare",
    "travelshare.ronitt.xyz",
    "x.com/travelshareHQ",
    "x.com/ronitrajr",
    "travelshareHQ",
    "TravelShare",
  ],
  siteUrl: "https://travelshare.ronitt.xyz",
  creator: {
    name: "Ronit Raj",
    url: "https://ronitt.xyz",
  },
  ogImage: "https://travelshare.ronitt.xyz/og.webp",
  links: {
    x: "https://x.com/travelshareHQ",
    github: "https://github.com/ronitrajfr/travelshare",
  },
};
