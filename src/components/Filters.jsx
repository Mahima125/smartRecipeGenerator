import React from 'react';

const Filters = ({ filters, setFilters }) => {
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-100 rounded-lg shadow-inner mb-8">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Dietary</label>
        <select
          value={filters.dietary}
          onChange={(e) => handleFilterChange('dietary', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="All">All Diets</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Gluten-free">Gluten-free</option>
          <option value="None">Non-Restricted</option>
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
        <select
          value={filters.difficulty}
          onChange={(e) => handleFilterChange('difficulty', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">Max Time</label>
        <select
          value={filters.cookingTime}
          onChange={(e) => handleFilterChange('cookingTime', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="All">Any Time</option>
          <option value="30 min">30 min or less</option>
          <option value="60 min">1 hour or less</option>
          <option value="90 min">1.5 hours or less</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;