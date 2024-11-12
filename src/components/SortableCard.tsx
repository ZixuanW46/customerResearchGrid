import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Card } from '../types';
import EditableCard from './EditableCard';

interface SortableCardProps {
  card: Card;
  onSave: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onPriorityChange: (id: string, priority: 'high' | 'medium' | 'low') => void;
}

export default function SortableCard({ card, onSave, onDelete, onPriorityChange }: SortableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: card.id,
    data: card
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex"
    >
      <div 
        {...listeners} 
        className="flex items-center px-2 cursor-grab active:cursor-grabbing hover:text-blue-500 text-gray-400 transition-colors"
      >
        <GripVertical className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <EditableCard
          card={card}
          onSave={onSave}
          onDelete={onDelete}
          onPriorityChange={onPriorityChange}
        />
      </div>
    </div>
  );
}