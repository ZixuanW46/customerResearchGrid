import React from 'react';
import { Plus } from 'lucide-react';
import DraggableCardList from './DraggableCardList';
import { Card } from '../types';

interface CompanyGridCellProps {
  id: string;
  title: string;
  subtitle: string;
  currentPrompt: string;
  futurePrompt: string;
  currentCards: Card[];
  futureCards: Card[];
  onAddCard: (type: 'current' | 'future') => void;
  onUpdateCard: (type: 'current' | 'future', id: string, content: string) => void;
  onDeleteCard: (type: 'current' | 'future', id: string) => void;
  onPriorityChange: (type: 'current' | 'future', id: string, priority: 'high' | 'medium' | 'low') => void;
}

export default function CompanyGridCell({ 
  id,
  title, 
  subtitle,
  currentPrompt, 
  futurePrompt, 
  currentCards, 
  futureCards, 
  onAddCard,
  onUpdateCard,
  onDeleteCard,
  onPriorityChange
}: CompanyGridCellProps) {
  return (
    <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-xl font-bold text-aws-blue mb-1">{title}</h3>
      <p className="text-lg font-semibold text-aws-light-blue mb-3">{subtitle}</p>
      <div className="grid grid-cols-2 gap-4">
        {/* Current State */}
        <div>
          <div className="text-lg font-semibold text-gray-700 mb-2">Current State</div>
          <div className="h-20 mb-3">
            <p className="text-xs text-gray-500 italic">{currentPrompt}</p>
          </div>
          <DraggableCardList
            containerId={`company-${id}-current`}
            cards={currentCards}
            onUpdateCard={(cardId, content) => onUpdateCard('current', cardId, content)}
            onDeleteCard={(cardId) => onDeleteCard('current', cardId)}
            onPriorityChange={(cardId, priority) => onPriorityChange('current', cardId, priority)}
          />
          <button
            onClick={() => onAddCard('current')}
            className="w-full mt-2 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Card
          </button>
        </div>

        {/* Future State */}
        <div>
          <div className="text-lg font-semibold text-gray-700 mb-2">Future State</div>
          <div className="h-20 mb-3">
            <p className="text-xs text-gray-500 italic">{futurePrompt}</p>
          </div>
          <DraggableCardList
            containerId={`company-${id}-future`}
            cards={futureCards}
            onUpdateCard={(cardId, content) => onUpdateCard('future', cardId, content)}
            onDeleteCard={(cardId) => onDeleteCard('future', cardId)}
            onPriorityChange={(cardId, priority) => onPriorityChange('future', cardId, priority)}
          />
          <button
            onClick={() => onAddCard('future')}
            className="w-full mt-2 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
}