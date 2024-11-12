import { CompanyGridCellData, MarketGridCellData } from '../types';

export const initialCompanyFactors: CompanyGridCellData[] = [
  {
    id: 'business',
    title: 'Business Model',
    subtitle: 'What do they do to make money?',
    currentPrompt: 'Overview of how the company creates, delivers, and captures value. Key building blocks: Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partnerships, and Cost Structure.',
    futurePrompt: "What's their business strategy going forward? i.e. changes in business model that are being planned? e.g. new business segment, repositioning of products.",
    currentCards: [],
    futureCards: []
  },
  {
    id: 'financials',
    title: 'Key Financials',
    subtitle: 'How they doing with making money?',
    currentPrompt: 'List their key financial figures. Benchmark with key competitors and the industry standards.',
    futurePrompt: 'Any noticeable trends from the past few years financials figure? What is the forecast for the years to come?',
    currentCards: [],
    futureCards: []
  },
  {
    id: 'success',
    title: 'Key Success Factor',
    subtitle: 'What do the customers of our customer care?',
    currentPrompt: "In the client's industry, what are the purchasing selection criteria of their customers?",
    futurePrompt: 'Shift in customer preferences and priorities?',
    currentCards: [],
    futureCards: []
  },
  {
    id: 'competition',
    title: 'Competitive Landscape',
    subtitle: 'What is helping/stoping them making more money?',
    currentPrompt: 'How does the client compare with the competitors? Could elaborate both qualitatively and quantitatively.',
    futurePrompt: 'Significant market share growths or reputation shifts for a competitor? Potential new entrants? Potential M&A between competitors?',
    currentCards: [],
    futureCards: []
  },
  {
    id: 'tech',
    title: 'Tech Set-up',
    subtitle: 'What technical infrastructure or services they are using now?',
    currentPrompt: "What's their technology solution? Cloud maturity level? Which services provider do they use? What does AWS currently/previously do with them?",
    futurePrompt: 'Intention to change? Any gaps identified?',
    currentCards: [],
    futureCards: []
  },
  {
    id: 'decision',
    title: 'Key Decision Maker/Influencer',
    subtitle: "What's in power?",
    currentPrompt: "Who's the user? Who's the buyer? How much impact do they have? Do they have strong opinions on certain things?",
    futurePrompt: "Any planned personnel change? How is the new person's attitude differs?",
    currentCards: [],
    futureCards: []
  },
  {
    id: 'org',
    title: 'Organizational Structure',
    subtitle: 'How is the company set up?',
    currentPrompt: 'How is the organization structured? By BU, by region? Are the operational decisions centrally made or distributed?',
    futurePrompt: 'Org transformation? Potential M&A?',
    currentCards: [],
    futureCards: []
  }
];

export const initialMarketFactors: MarketGridCellData[] = [
  {
    id: 'political',
    title: 'Political',
    prompt: 'Government regulations, trade policies, political stability affecting the industry',
    cards: []
  },
  {
    id: 'economic',
    title: 'Economic',
    prompt: 'Economic growth, interest rates, inflation, market conditions impact',
    cards: []
  },
  {
    id: 'social',
    title: 'Social',
    prompt: 'Demographics, cultural trends, consumer behavior changes',
    cards: []
  },
  {
    id: 'technological',
    title: 'Technological',
    prompt: 'Tech innovations, digital transformation trends, emerging technologies',
    cards: []
  },
  {
    id: 'environmental',
    title: 'Environmental',
    prompt: 'Sustainability concerns, environmental regulations, green initiatives',
    cards: []
  },
  {
    id: 'legal',
    title: 'Legal',
    prompt: 'Regulatory changes, compliance requirements, legal frameworks',
    cards: []
  }
];