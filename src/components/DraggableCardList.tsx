import React from 'react';
import { 
  SortableContext, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { Card } from '../types';
import SortableCard from './SortableCard';

interface DraggableCardListProps {
  containerId: string;
  cards: Card[];
  onUpdateCard: (id: string, content: string) => void;
  onDeleteCard: (id: string) => void;
  onPriorityChange: (id: string, priority: 'high' | 'medium' | 'low') => void;
}

export default function DraggableCardList({
  containerId,
  cards,
  onUpdateCard,
  onDeleteCard,
  onPriorityChange
}: DraggableCardListProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: containerId
  });

  return (
    <SortableContext 
      id={containerId}
      items={cards}
      strategy={verticalListSortingStrategy}
    >
      <div 
        ref={setNodeRef} 
        className={`space-y-2 min-h-[50px] p-2 rounded-md transition-all ${
          isOver ? 'bg-blue-50 outline outline-2 outline-blue-200' : 'bg-black/5'
        }`}
      >
        {cards.map((card) => (
          <SortableCard
            key={card.id}
            card={card}
            onSave={onUpdateCard}
            onDelete={onDeleteCard}
            onPriorityChange={onPriorityChange}
          />
        ))}
      </div>
    </SortableContext>
  );
}