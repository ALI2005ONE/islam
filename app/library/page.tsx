'use client';

import { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, BookOpen, Star, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface Hadith {
  id: string;
  text: string;
  source: string;
  classification: string;
  category: string;
  narrator: string;
  createdAt: string;
}

const sampleHadiths: Hadith[] = [
  {
    id: '1',
    text: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
    source: 'صحيح البخاري',
    classification: 'صحيح',
    category: 'النيات',
    narrator: 'عمر بن الخطاب',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    text: 'مَن كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
    source: 'صحيح البخاري',
    classification: 'صحيح',
    category: 'الأخلاق',
    narrator: 'أبو هريرة',
    createdAt: '2024-01-02'
  },
  {
    id: '3',
    text: 'الدِّينُ النَّصِيحَةُ',
    source: 'صحيح مسلم',
    classification: 'صحيح',
    category: 'الدين',
    narrator: 'تميم الداري',
    createdAt: '2024-01-03'
  }
];

export default function Library() {
  const [hadiths, setHadiths] = useState<Hadith[]>(sampleHadiths);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterClassification, setFilterClassification] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = ['all', 'النيات', 'الأخلاق', 'الصلاة', 'الزكاة', 'الحج', 'الدين'];
  const classifications = ['all', 'صحيح', 'حسن', 'ضعيف'];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filteredHadiths = hadiths.filter(hadith => {
    const matchesSearch = hadith.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hadith.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hadith.narrator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || hadith.category === filterCategory;
    const matchesClassification = filterClassification === 'all' || hadith.classification === filterClassification;
    
    return matchesSearch && matchesCategory && matchesClassification;
  });

  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'صحيح': return 'bg-green-100 text-green-800';
      case 'حسن': return 'bg-yellow-100 text-yellow-800';
      case 'ضعيف': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 main-text">مكتبة الأحاديث</h1>
          <p className="text-gray-600 main-text">
            استكشف مجموعتنا الشاملة من الأحاديث الصحيحة من المجموعات الرئيسية
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في الأحاديث أو المصادر أو الرواة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 main-text"
                />
              </div>
            </div>
            
            {/* Learning Path Dropdown */}
            <div className="lp-dropdown" ref={dropdownRef}>
              <button 
                className="lp-btn flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1" 
                aria-haspopup="true" 
                aria-expanded={isDropdownOpen}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="main-text">المسار التعليمي</span>
                <span className="mr-2">▼</span>
              </button>
              {isDropdownOpen && (
                <ul className="lp-menu" role="menu">
                  <li role="none">
                    <a role="menuitem" href="/path/seeker" className="lp-item main-text">
                      <span className="ml-2">★</span>
                      طالب العلم
                    </a>
                  </li>
                  <li role="none">
                    <a role="menuitem" href="/path/child" className="lp-item main-text">
                      <span className="ml-2">★</span>
                      الطفل المسلم
                    </a>
                  </li>
                  <li role="none">
                    <a role="menuitem" href="/path/schools" className="lp-item main-text">
                      <span className="ml-2">★</span>
                      المذاهب الإسلامية
                    </a>
                  </li>
                </ul>
              )}
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="الفئة" className="main-text" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    <span className="main-text">{category === 'all' ? 'جميع الفئات' : category}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filterClassification} onValueChange={setFilterClassification}>
              <SelectTrigger>
                <SelectValue placeholder="التصنيف" className="main-text" />
              </SelectTrigger>
              <SelectContent>
                {classifications.map(classification => (
                  <SelectItem key={classification} value={classification}>
                    <span className="main-text">{classification === 'all' ? 'جميع التصنيفات' : classification}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600 main-text">
            عرض {filteredHadiths.length} من {hadiths.length} حديث
          </p>
        </div>

        {/* Hadiths Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHadiths.map((hadith) => (
            <Card key={hadith.id} className="card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                      <Badge className={getClassificationColor(hadith.classification)}>
                        <span className="main-text">{hadith.classification}</span>
                      </Badge>
                      <Badge variant="outline">
                        <span className="main-text">{hadith.category}</span>
                      </Badge>
                    </div>
                    <CardTitle className="text-lg main-text">{hadith.source}</CardTitle>
                    <CardDescription className="main-text">رواه {hadith.narrator}</CardDescription>
                  </div>
                  <BookOpen className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="arabic-text text-lg mb-4 p-4 bg-gray-50 rounded-lg">
                  {hadith.text}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                    <span className="main-text">الرقم: {hadith.id}</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/library/${hadith.id}`}>
                      <span className="main-text">عرض التفاصيل</span>
                      <ChevronLeft className="mr-1 h-4 w-4 rtl-flip" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHadiths.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2 main-text">لم يتم العثور على أحاديث</h3>
            <p className="text-gray-500 main-text">جرب تعديل معايير البحث</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}