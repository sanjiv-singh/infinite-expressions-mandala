
import React, { useState } from 'react';

interface FilterPanelProps {
  onFilterChange: (filters: any) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    type: 'all',
    primaryColor: 'all',
    priceRange: 'all',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const FilterSection: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <div className="py-6 border-b border-subtle-separator">
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        {children}
    </div>
  );

  return (
    <div className="sticky top-24 bg-primary-bg/50 backdrop-blur-sm p-6 rounded-lg border border-subtle-separator">
      <h2 className="text-2xl font-serif font-bold mb-6">Filters</h2>
      
      <FilterSection title="Status">
        <div className="space-y-2">
            <div>
                <input type="radio" id="type-all" name="type" value="all" checked={filters.type === 'all'} onChange={handleInputChange} className="mr-2 text-primary-accent focus:ring-primary-accent" />
                <label htmlFor="type-all">All</label>
            </div>
            <div>
                <input type="radio" id="type-original" name="type" value="Original" checked={filters.type === 'Original'} onChange={handleInputChange} className="mr-2 text-primary-accent focus:ring-primary-accent"/>
                <label htmlFor="type-original">Original</label>
            </div>
            <div>
                <input type="radio" id="type-print" name="type" value="Print" checked={filters.type === 'Print'} onChange={handleInputChange} className="mr-2 text-primary-accent focus:ring-primary-accent"/>
                <label htmlFor="type-print">Print</label>
            </div>
        </div>
      </FilterSection>

      <FilterSection title="Primary Color">
        {/* Placeholder for color swatches */}
        <div className="flex flex-wrap gap-2">
            <button className="w-8 h-8 rounded-full bg-blue-500 border-2 border-transparent focus:border-primary-accent"></button>
            <button className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-transparent focus:border-primary-accent"></button>
            <button className="w-8 h-8 rounded-full bg-cyan-500 border-2 border-transparent focus:border-primary-accent"></button>
            <button className="w-8 h-8 rounded-full bg-red-500 border-2 border-transparent focus:border-primary-accent"></button>
            <button className="w-8 h-8 rounded-full bg-green-500 border-2 border-transparent focus:border-primary-accent"></button>
            <button className="w-8 h-8 rounded-full bg-purple-500 border-2 border-transparent focus:border-primary-accent"></button>
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        {/* Placeholder for price slider */}
        <input type="range" min="0" max="5000" className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-primary-accent" />
        <div className="flex justify-between text-sm mt-2">
            <span>$0</span>
            <span>$5000+</span>
        </div>
      </FilterSection>
    </div>
  );
};

export default FilterPanel;
