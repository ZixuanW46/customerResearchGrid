import { useState } from 'react';
import { Card, CompanyGridCellData, MarketGridCellData } from '../../types';

export function useCardActions(
  setCompanyFactors: React.Dispatch<React.SetStateAction<CompanyGridCellData[]>>,
  setMarketFactors: React.Dispatch<React.SetStateAction<MarketGridCellData[]>>
) {
  const handleAddCompanyCard = (factorId: string, type: 'current' | 'future') => {
    const newCard: Card = {
      id: `${type}-${Date.now()}`,
      content: '',
      priority: 'low',
      isEditing: true
    };

    setCompanyFactors(prev => prev.map(factor => {
      if (factor.id === factorId) {
        return {
          ...factor,
          [type === 'current' ? 'currentCards' : 'futureCards']: 
            [...factor[type === 'current' ? 'currentCards' : 'futureCards'], newCard]
        };
      }
      return factor;
    }));
  };

  const handleUpdateCompanyCard = (factorId: string, type: 'current' | 'future', cardId: string, content: string) => {
    setCompanyFactors(prev => prev.map(factor => {
      if (factor.id === factorId) {
        return {
          ...factor,
          [type === 'current' ? 'currentCards' : 'futureCards']: 
            factor[type === 'current' ? 'currentCards' : 'futureCards']
              .map((card: Card) => card.id === cardId ? { ...card, content, isEditing: false } : card)
        };
      }
      return factor;
    }));
  };

  const handleDeleteCompanyCard = (factorId: string, type: 'current' | 'future', cardId: string) => {
    setCompanyFactors(prev => prev.map(factor => {
      if (factor.id === factorId) {
        return {
          ...factor,
          [type === 'current' ? 'currentCards' : 'futureCards']: 
            factor[type === 'current' ? 'currentCards' : 'futureCards']
              .filter((card: Card) => card.id !== cardId)
        };
      }
      return factor;
    }));
  };

  const handleCompanyCardPriorityChange = (
    factorId: string, 
    type: 'current' | 'future', 
    cardId: string, 
    priority: 'high' | 'medium' | 'low'
  ) => {
    setCompanyFactors(prev => prev.map(factor => {
      if (factor.id === factorId) {
        return {
          ...factor,
          [type === 'current' ? 'currentCards' : 'futureCards']: 
            factor[type === 'current' ? 'currentCards' : 'futureCards']
              .map((card: Card) => card.id === cardId ? { ...card, priority } : card)
        };
      }
      return factor;
    }));
  };

  const handleAddMarketCard = (factorId: string) => {
    const newCard: Card = {
      id: `market-${Date.now()}`,
      content: '',
      priority: 'low',
      isEditing: true
    };

    setMarketFactors(prev => prev.map(factor => {
      if (factor.id === factorId) {
        return {
          ...factor,
          cards: [...factor.cards, newCard]
        };
      }
      return factor;
    }));
  };

  const handleUpdateMarketCard = (factorId: string, cardId: string, content: string) => {
    setMarketFactors(prev => prev.map(factor => {
      if (factor.id === factorId) {
        return {
          ...factor,
          cards: factor.cards.map(card => 
            card.id === cardId ? { ...card, content, isEditing: false } : card
          )
        };
      }
      return factor;
    }));
  };

  const handleDeleteMarketCard = (factorId: string, cardId: string) => {
    setMarketFactors(prev => prev.map(factor => {
      if (factor.id === factorId) {
        return {
          ...factor,
          cards: factor.cards.filter(card => card.id !== cardId)
        };
      }
      return factor;
    }));
  };

  const handleMarketCardPriorityChange = (
    factorId: string, 
    cardId: string, 
    priority: 'high' | 'medium' | 'low'
  ) => {
    setMarketFactors(prev => prev.map(factor => {
      if (factor.id === factorId) {
        return {
          ...factor,
          cards: factor.cards.map(card => 
            card.id === cardId ? { ...card, priority } : card
          )
        };
      }
      return factor;
    }));
  };

  return {
    handleAddCompanyCard,
    handleUpdateCompanyCard,
    handleDeleteCompanyCard,
    handleCompanyCardPriorityChange,
    handleAddMarketCard,
    handleUpdateMarketCard,
    handleDeleteMarketCard,
    handleMarketCardPriorityChange
  };
}