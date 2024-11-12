import { useState } from 'react';
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Card, CompanyGridCellData, MarketGridCellData } from '../../types';

export function useDragAndDrop(
  companyFactors: CompanyGridCellData[],
  setCompanyFactors: React.Dispatch<React.SetStateAction<CompanyGridCellData[]>>,
  marketFactors: MarketGridCellData[],
  setMarketFactors: React.Dispatch<React.SetStateAction<MarketGridCellData[]>>,
  suggestions: Card[],
  setSuggestions: React.Dispatch<React.SetStateAction<Card[]>>
) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    
    // Find the card in any of the possible locations
    let card: Card | undefined;
    
    // Check company factors
    for (const factor of companyFactors) {
      card = factor.currentCards.find(c => c.id === active.id) ||
             factor.futureCards.find(c => c.id === active.id);
      if (card) break;
    }
    
    // Check market factors
    if (!card) {
      for (const factor of marketFactors) {
        card = factor.cards.find(c => c.id === active.id);
        if (card) break;
      }
    }
    
    // Check suggestions
    if (!card) {
      card = suggestions.find(c => c.id === active.id);
    }

    if (card) {
      setActiveCard(card);
    }
  };

  const findContainer = (id: string): { containerId: string; index: number } | null => {
    // Check company factors
    for (const factor of companyFactors) {
      const currentIndex = factor.currentCards.findIndex(card => card.id === id);
      if (currentIndex !== -1) {
        return { containerId: `company-${factor.id}-current`, index: currentIndex };
      }
      const futureIndex = factor.futureCards.findIndex(card => card.id === id);
      if (futureIndex !== -1) {
        return { containerId: `company-${factor.id}-future`, index: futureIndex };
      }
    }

    // Check market factors
    for (const factor of marketFactors) {
      const index = factor.cards.findIndex(card => card.id === id);
      if (index !== -1) {
        return { containerId: `market-${factor.id}`, index };
      }
    }

    // Check suggestions
    const suggestionIndex = suggestions.findIndex(card => card.id === id);
    if (suggestionIndex !== -1) {
      return { containerId: 'suggestions', index: suggestionIndex };
    }

    return null;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over || !activeCard) {
      setActiveId(null);
      setActiveCard(null);
      return;
    }

    const activeContainer = findContainer(active.id as string);
    const overContainer = over.id as string;

    if (!activeContainer) {
      setActiveId(null);
      setActiveCard(null);
      return;
    }

    // Remove from source
    if (activeContainer.containerId.startsWith('company-')) {
      const [_, factorId, type] = activeContainer.containerId.split('-');
      setCompanyFactors(prev => prev.map(factor => {
        if (factor.id === factorId) {
          const cards = type === 'current' ? factor.currentCards : factor.futureCards;
          return {
            ...factor,
            [type === 'current' ? 'currentCards' : 'futureCards']: 
              cards.filter(c => c.id !== activeCard.id)
          };
        }
        return factor;
      }));
    } else if (activeContainer.containerId.startsWith('market-')) {
      const factorId = activeContainer.containerId.split('-')[1];
      setMarketFactors(prev => prev.map(factor => {
        if (factor.id === factorId) {
          return {
            ...factor,
            cards: factor.cards.filter(c => c.id !== activeCard.id)
          };
        }
        return factor;
      }));
    } else if (activeContainer.containerId === 'suggestions') {
      setSuggestions(prev => prev.filter(c => c.id !== activeCard.id));
    }

    // Add to destination
    if (overContainer.startsWith('company-')) {
      const [_, factorId, type] = overContainer.split('-');
      setCompanyFactors(prev => prev.map(factor => {
        if (factor.id === factorId) {
          const cards = type === 'current' ? factor.currentCards : factor.futureCards;
          return {
            ...factor,
            [type === 'current' ? 'currentCards' : 'futureCards']: [...cards, activeCard]
          };
        }
        return factor;
      }));
    } else if (overContainer.startsWith('market-')) {
      const factorId = overContainer.split('-')[1];
      setMarketFactors(prev => prev.map(factor => {
        if (factor.id === factorId) {
          return {
            ...factor,
            cards: [...factor.cards, activeCard]
          };
        }
        return factor;
      }));
    } else if (overContainer === 'suggestions') {
      setSuggestions(prev => [...prev, activeCard]);
    }

    setActiveId(null);
    setActiveCard(null);
  };

  return {
    activeId,
    activeCard,
    handleDragStart,
    handleDragEnd
  };
}