'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Loader2 } from 'lucide-react';

interface AdvancedSearchProps {
  onSearch?: (searchTerm: string, category: string) => void;
  className?: string;
}

export function AdvancedSearch({ onSearch, className = '' }: AdvancedSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: 'all', label: 'الكل' },
    { value: 'rulings', label: 'الأحكام' },
    { value: 'hadith', label: 'الأحاديث' }
  ];

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Advanced Search:', { searchTerm, category });
      if (onSearch) {
        onSearch(searchTerm, category);
      }
      setIsOpen(false);
      setSearchTerm('');
      setCategory('all');
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSearchTerm('');
    setCategory('all');
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary/30 ${className}`}
        >
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-full h-screen rounded-none border-0 shadow-none bg-white p-8 flex flex-col">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            البحث المتقدم
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            ابحث في الأحكام والأحاديث باستخدام مرشحات مخصصة
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4 flex-1 overflow-y-auto">
          {/* Search Input */}
          <div className="space-y-2">
            <Label htmlFor="search-term" className="text-sm font-medium">
              كلمات البحث
            </Label>
            <div className="relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="search-term"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="أدخل كلمات البحث..."
                className="pr-10 rounded-xl border-2 focus:border-primary/50 transition-colors"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              الفئة
            </Label>
            <Select value={category} onValueChange={setCategory} disabled={isLoading}>
              <SelectTrigger className="rounded-xl border-2 focus:border-primary/50 transition-colors">
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="rounded-full px-6 hover:bg-gray-50 transition-colors"
          >
            إلغاء
          </Button>
          
          <Button
            onClick={handleSearch}
            disabled={isLoading || !searchTerm.trim()}
            className="rounded-full px-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:shadow-lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                جاري البحث...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                بحث
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
