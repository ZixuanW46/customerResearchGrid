import React from 'react';
import { Plus } from 'lucide-react';
import { Card } from '../types';

interface GridCellProps {
  title: string;
  currentCards: Card[];
  futureCards: Card[];
  onAddCard: (type: 'current' | 'future') => void;
}

export default function GridCell({ title, currentCards, futureCards, onAddCard }: GridCellProps) {
  return (
    <div className="col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="font-medium text-gray-900 mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Current State */}
        <div>
          <div className="text-sm font-medium text-gray-500 mb-2">Current State</div>
          <div className="space-y-2">
            {currentCards.map((card) => (
              <div
                key={card.id}
                className={`p-3 rounded-md text-sm ${
                  card.priority === 'high' ? 'bg-red-50 border-red-200' :
                  card.priority === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-green-50 border-green-200'
                } border shadow-sm hover:shadow-md transition-shadow`}
              >
                {card.content}
              </div>
            ))}
            <button
              onClick={() => onAddCard('current')}
              className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Card
            </button>
          </div>
        </div>

        {/* Future State */}
        <div>
          <div className="text-sm font-medium text-gray-500 mb-2">Future State</div>
          <div className="space-y-2">
            {futureCards.map((card) => (
              <div
                key={card.id}
                className={`p-3 rounded-md text-sm ${
                  card.priority === 'high' ? 'bg-red-50 border-red-200' :
                  card.priority === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-green-50 border-green-200'
                } border shadow-sm hover:shadow-md transition-shadow`}
              >
                {card.content}
              </div>
            ))}
            <button
              onClick={() => onAddCard('future')}
              className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}