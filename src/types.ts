export interface Card {
  id: string;
  content: string;
  priority: 'high' | 'medium' | 'low';
  isEditing?: boolean;
}

export interface CompanyGridCellData {
  id: string;
  title: string;
  subtitle: string;
  currentPrompt: string;
  futurePrompt: string;
  currentCards: Card[];
  futureCards: Card[];
}

export interface MarketGridCellData {
  id: string;
  title: string;
  prompt: string;
  cards: Card[];
}