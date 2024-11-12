import React, { useState } from 'react';
import { Grid, Building2, Globe2 } from 'lucide-react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { CompanyGridCellData, MarketGridCellData, Card } from '../types';
import CompanyGridCell from './CompanyGridCell';
import MarketGridCell from './MarketGridCell';
import EditableCard from './EditableCard';
import SuggestionPanel from './SuggestionPanel';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { useCardActions } from './hooks/useCardActions';
import { initialCompanyFactors, initialMarketFactors } from '../data/initialData';

export default function ResearchGrid() {
  const [companyFactors, setCompanyFactors] = useState<CompanyGridCellData[]>(initialCompanyFactors);
  const [marketFactors, setMarketFactors] = useState<MarketGridCellData[]>(initialMarketFactors);
  const [suggestions, setSuggestions] = useState<Card[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const {
    activeId,
    activeCard,
    handleDragStart,
    handleDragEnd
  } = useDragAndDrop(
    companyFactors,
    setCompanyFactors,
    marketFactors,
    setMarketFactors,
    suggestions,
    setSuggestions
  );

  const {
    handleAddCompanyCard,
    handleUpdateCompanyCard,
    handleDeleteCompanyCard,
    handleCompanyCardPriorityChange,
    handleAddMarketCard,
    handleUpdateMarketCard,
    handleDeleteMarketCard,
    handleMarketCardPriorityChange
  } = useCardActions(setCompanyFactors, setMarketFactors);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-aws-light-bg">
        <div className="pr-96">
          <header className="bg-aws-blue text-white py-4 px-8 mb-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3">
                <Grid className="h-6 w-6 text-aws-orange" />
                <h1 className="text-2xl font-bold">Customer Research Grid</h1>
              </div>
            </div>
          </header>

          <div className="px-8">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Company Factors Section */}
              <div className="rounded-lg bg-gradient-to-br from-aws-blue/5 to-aws-blue/10 p-6 border border-aws-blue/20 shadow-aws hover:shadow-aws-hover transition-shadow">
                <div className="flex items-center gap-2 mb-6">
                  <Building2 className="h-7 w-7 text-aws-light-blue" />
                  <h2 className="text-2xl font-bold text-aws-blue">Company Factors</h2>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {companyFactors.map((factor) => (
                    <CompanyGridCell
                      key={factor.id}
                      {...factor}
                      onAddCard={(type) => handleAddCompanyCard(factor.id, type)}
                      onUpdateCard={(type, cardId, content) => 
                        handleUpdateCompanyCard(factor.id, type, cardId, content)
                      }
                      onDeleteCard={(type, cardId) => 
                        handleDeleteCompanyCard(factor.id, type, cardId)
                      }
                      onPriorityChange={(type, cardId, priority) =>
                        handleCompanyCardPriorityChange(factor.id, type, cardId, priority)
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Market Factors Section */}
              <div className="rounded-lg bg-gradient-to-br from-aws-orange/5 to-aws-orange/10 p-6 border border-aws-orange/20 shadow-aws hover:shadow-aws-hover transition-shadow">
                <div className="flex items-center gap-2 mb-6">
                  <Globe2 className="h-7 w-7 text-aws-orange" />
                  <h2 className="text-2xl font-bold text-aws-blue">Market Factors</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketFactors.map((factor) => (
                    <MarketGridCell
                      key={factor.id}
                      {...factor}
                      onAddCard={() => handleAddMarketCard(factor.id)}
                      onUpdateCard={(cardId, content) => 
                        handleUpdateMarketCard(factor.id, cardId, content)
                      }
                      onDeleteCard={(cardId) => 
                        handleDeleteMarketCard(factor.id, cardId)
                      }
                      onPriorityChange={(cardId, priority) =>
                        handleMarketCardPriorityChange(factor.id, cardId, priority)
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <SuggestionPanel
          suggestions={suggestions}
          setSuggestions={setSuggestions}
        />

        <DragOverlay>
          {activeId && activeCard && (
            <EditableCard
              card={activeCard}
              onSave={() => {}}
              onDelete={() => {}}
              onPriorityChange={() => {}}
            />
          )}
        </DragOverlay>
      </div>
    </DndContext>
  );
}