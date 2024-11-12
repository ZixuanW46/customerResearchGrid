import React, { useState, useRef, useEffect } from 'react';
import { Trash2, AlertTriangle, AlertCircle, Info, Edit2 } from 'lucide-react';
import { Card } from '../types';

interface EditableCardProps {
  card: Card;
  onSave: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onPriorityChange?: (id: string, priority: 'high' | 'medium' | 'low') => void;
}

export default function EditableCard({ card, onSave, onDelete, onPriorityChange }: EditableCardProps) {
  const [isEditing, setIsEditing] = useState(card.isEditing || false);
  const [content, setContent] = useState(card.content);
  const [isHovered, setIsHovered] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setContent(card.content);
  }, [card.content]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (content.trim()) {
      onSave(card.id, content);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setContent(card.content);
      setIsEditing(false);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleTextareaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handlePriorityClick = (priority: 'high' | 'medium' | 'low', e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPriorityChange) {
      onPriorityChange(card.id, priority);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(card.id);
  };

  const priorityStyles = {
    high: 'bg-red-50 border-red-200',
    medium: 'bg-yellow-50 border-yellow-200',
    low: 'bg-gray-50 border-gray-200'
  };

  const PriorityIcon = {
    high: AlertTriangle,
    medium: AlertCircle,
    low: Info
  }[card.priority];

  const priorityColors = {
    high: 'text-red-500',
    medium: 'text-yellow-500',
    low: 'text-gray-400'
  };

  return (
    <div
      className={`group relative p-3 rounded-md text-sm border ${priorityStyles[card.priority]} hover:shadow-md transition-all min-h-[72px] ${
        isEditing ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => e.stopPropagation()}
    >
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          onClick={handleTextareaClick}
          className="w-full bg-transparent resize-none focus:outline-none rounded p-1"
          rows={3}
          style={{ minHeight: '60px' }}
        />
      ) : (
        <div className="whitespace-pre-wrap pr-8 pb-8">{content}</div>
      )}
      
      {/* Priority indicator */}
      <PriorityIcon className={`absolute bottom-3 left-2 h-4 w-4 ${priorityColors[card.priority]}`} />

      {/* Priority controls */}
      {isHovered && onPriorityChange && (
        <div className="absolute bottom-3 right-2 flex space-x-1">
          <button
            onClick={(e) => handlePriorityClick('high', e)}
            className={`p-1 rounded-full hover:bg-red-100 ${card.priority === 'high' ? 'bg-red-100' : ''}`}
          >
            <div className="w-3 h-3 rounded-full bg-red-500" />
          </button>
          <button
            onClick={(e) => handlePriorityClick('medium', e)}
            className={`p-1 rounded-full hover:bg-yellow-100 ${card.priority === 'medium' ? 'bg-yellow-100' : ''}`}
          >
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
          </button>
          <button
            onClick={(e) => handlePriorityClick('low', e)}
            className={`p-1 rounded-full hover:bg-gray-100 ${card.priority === 'low' ? 'bg-gray-100' : ''}`}
          >
            <div className="w-3 h-3 rounded-full bg-gray-400" />
          </button>
        </div>
      )}
      
      {/* Action buttons */}
      <div className={`absolute top-2 right-2 flex space-x-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        {/* Edit button */}
        <button
          onClick={handleEditClick}
          className="p-1 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50"
        >
          <Edit2 className="h-4 w-4" />
        </button>
        {/* Delete button */}
        <button
          onClick={handleDeleteClick}
          className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}