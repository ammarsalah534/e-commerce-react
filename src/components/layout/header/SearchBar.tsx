
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 w-full">
      <div className="relative">
        <Input
          type="search"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pr-10"
        />
        <Button 
          type="submit" 
          size="icon" 
          variant="ghost" 
          className="absolute right-0 top-0 h-full"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
