'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Loader2 } from 'lucide-react';

interface AdvancedSearchProps {
  onSearch?: (searchTerm: string, category: string) => void;
  open?: boolean;
  setOpen?: (state: boolean) => void;
}

export function AdvancedSearch({ onSearch, open, setOpen }: AdvancedSearchProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  const isOpen = open !== undefined ? open : internalOpen;
  const handleSetOpen = setOpen || setInternalOpen;

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
      if (onSearch) {
        onSearch(searchTerm, category);
      }
      handleSetOpen(false);
      setSearchTerm('');
      setCategory('all');
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    handleSetOpen(false);
    setSearchTerm('');
    setCategory('all');
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleSetOpen}>
      <DialogContent className="sm:max-w-lg rounded-2xl border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            البحث المتقدم
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            ابحث في الأحكام والأحاديث باستخدام مرشحات مخصصة
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="search-term" className="text-sm font-medium">كلمات البحث</Label>
            <div className="relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="search-term"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="أدخل كلمات البحث..."
                className="pr-10 rounded-xl border-2 focus:border-primary/50"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">الفئة</Label>
            <Select value={category} onValueChange={setCategory} disabled={isLoading}>
              <SelectTrigger className="rounded-xl border-2 focus:border-primary/50">
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

        <div className="flex items-center justify-between space-x-3 rtl:space-x-reverse pt-4">
          <Button variant="outline" onClick={handleCancel} disabled={isLoading} className="rounded-full px-6">
            إلغاء
          </Button>
          <Button
            onClick={handleSearch}
            disabled={isLoading || !searchTerm.trim()}
            className="rounded-full px-6 bg-gradient-to-r from-primary to-primary/80"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> جاري البحث...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" /> بحث
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
