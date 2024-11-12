import React, { useState } from 'react';
import { Upload, Send, Lightbulb } from 'lucide-react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { Card } from '../types';
import SortableCard from './SortableCard';

interface SuggestionPanelProps {
  suggestions: Card[];
  setSuggestions: React.Dispatch<React.SetStateAction<Card[]>>;
}

export default function SuggestionPanel({ suggestions, setSuggestions }: SuggestionPanelProps) {
  const [prompt, setPrompt] = useState('');

  const { setNodeRef } = useDroppable({
    id: 'suggestions'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    const newSuggestion: Card = {
      id: `suggestion-${Date.now()}`,
      content: prompt,
      priority: 'low'
    };
    setSuggestions(prev => [...prev, newSuggestion]);
    setPrompt('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === 'string') {
          const newSuggestion: Card = {
            id: `suggestion-${Date.now()}`,
            content: event.target.result.slice(0, 500),
            priority: 'low'
          };
          setSuggestions(prev => [...prev, newSuggestion]);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleUpdateCard = (id: string, content: string) => {
    setSuggestions(prev => prev.map(card =>
      card.id === id ? { ...card, content, isEditing: false } : card
    ));
  };

  const handleDeleteCard = (id: string) => {
    setSuggestions(prev => prev.filter(card => card.id !== id));
  };

  const handlePriorityChange = (id: string, priority: 'high' | 'medium' | 'low') => {
    setSuggestions(prev => prev.map(card =>
      card.id === id ? { ...card, priority } : card
    ));
  };

  return (
    <div className="fixed right-0 top-0 w-96 h-full bg-aws-blue text-white shadow-xl">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-aws-dark-blue flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-aws-orange" />
            <h2 className="text-lg font-semibold">AI Suggestions</h2>
          </div>
        </div>

        <div className="p-4 border-b border-aws-dark-blue">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium mb-1">
                Enter prompt
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="flex-1 rounded-md border border-aws-dark-blue bg-aws-hover-blue text-white px-3 py-2 text-sm focus:ring-1 focus:ring-aws-orange focus:border-aws-orange placeholder-gray-400"
                  placeholder="Type to generate suggestions..."
                />
                <button
                  type="submit"
                  className="p-2 bg-aws-orange text-white rounded-md hover:bg-opacity-90"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div>
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full px-4 py-2 border border-aws-dark-blue rounded-md text-sm font-medium bg-aws-hover-blue hover:bg-opacity-90 cursor-pointer"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileUpload}
                accept=".txt,.md,.json"
              />
            </div>
          </form>
        </div>

        <div className="flex-1 overflow-y-auto p-4 cards-container">
          <SortableContext 
            id="suggestions"
            items={suggestions}
            strategy={verticalListSortingStrategy}
          >
            <div ref={setNodeRef} className="space-y-3">
              {suggestions.map((suggestion) => (
                <SortableCard
                  key={suggestion.id}
                  card={suggestion}
                  onSave={handleUpdateCard}
                  onDelete={handleDeleteCard}
                  onPriorityChange={handlePriorityChange}
                />
              ))}
            </div>
          </SortableContext>
        </div>
      </div>
    </div>
  );
}