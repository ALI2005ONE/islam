'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Scale, ChevronLeft, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface Ruling {
  id: string;
  title: string;
  content: string;
  school: string;
  category: string;
  hadithId?: string;
  createdAt: string;
}

const sampleRulings: Ruling[] = [
  {
    id: '1',
    title: 'أهمية النية في العبادة',
    content: 'وفقاً لجميع مذاهب الفقه الإسلامي، فإن النية أساسية لصحة العبادة. يجب أن تسبق كل عبادة نية صادقة.',
    school: 'جميع المذاهب',
    category: 'العبادة',
    hadithId: '1',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    title: 'قول الخير أو الصمت',
    content: 'تؤكد الأخلاق الإسلامية على أهمية الكلام المدروس. عندما لا يستطيع المرء أن يتكلم بما ينفع، فمن الأفضل أن يصمت لتجنب الضرر أو الإثم المحتمل.',
    school: 'الحنفي',
    category: 'الأخلاق',
    hadithId: '2',
    createdAt: '2024-01-02'
  },
  {
    id: '3',
    title: 'وجوب النصيحة الصادقة',
    content: 'تقديم النصيحة الصادقة يعتبر جزءاً لا يتجزأ من الإيمان الإسلامي، ويشمل النصيحة لله ولكتابه ولرسوله وللمسلمين.',
    school: 'الشافعي',
    category: 'العلاقات الاجتماعية',
    hadithId: '3',
    createdAt: '2024-01-03'
  }
];

export default function Rulings() {
  const [rulings, setRulings] = useState<Ruling[]>(sampleRulings);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSchool, setFilterSchool] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  const schools = ['all', 'الحنفي', 'الشافعي', 'المالكي', 'الحنبلي', 'جميع المذاهب'];
  const categories = ['all', 'العبادة', 'الأخلاق', 'العلاقات الاجتماعية', 'القانون التجاري', 'قانون الأسرة'];

  const filteredRulings = rulings.filter(ruling => {
    const matchesSearch = ruling.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ruling.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSchool = filterSchool === 'all' || ruling.school === filterSchool;
    const matchesCategory = filterCategory === 'all' || ruling.category === filterCategory;
    
    return matchesSearch && matchesSchool && matchesCategory;
  });

  const getSchoolColor = (school: string) => {
    switch (school) {
      case 'الحنفي': return 'bg-blue-100 text-blue-800';
      case 'الشافعي': return 'bg-green-100 text-green-800';
      case 'المالكي': return 'bg-purple-100 text-purple-800';
      case 'الحنبلي': return 'bg-orange-100 text-orange-800';
      case 'جميع المذاهب': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 main-text">أحكام الفقه</h1>
          <p className="text-gray-600 main-text">
            استكشف أحكام الفقه الإسلامي العلمية من جميع المذاهب الرئيسية
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث في الأحكام أو المواضيع..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 main-text"
                />
              </div>
            </div>
            
            <Select value={filterSchool} onValueChange={setFilterSchool}>
              <SelectTrigger>
                <SelectValue placeholder="المذهب" className="main-text" />
              </SelectTrigger>
              <SelectContent>
                {schools.map(school => (
                  <SelectItem key={school} value={school}>
                    <span className="main-text">{school === 'all' ? 'جميع المذاهب' : school}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
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
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600 main-text">
            عرض {filteredRulings.length} من {rulings.length} حكم
          </p>
        </div>

        {/* Rulings Grid */}
        <div className="grid grid-cols-1 gap-6">
          {filteredRulings.map((ruling) => (
            <Card key={ruling.id} className="card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                      <Badge className={getSchoolColor(ruling.school)}>
                        <span className="main-text">{ruling.school}</span>
                      </Badge>
                      <Badge variant="outline">
                        <span className="main-text">{ruling.category}</span>
                      </Badge>
                      {ruling.hadithId && (
                        <Badge variant="secondary" className="text-xs">
                          <BookOpen className="w-3 h-3 mr-1" />
                          <span className="main-text">مرتبط بحديث</span>
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl mb-2 main-text">{ruling.title}</CardTitle>
                  </div>
                  <Scale className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-700 mb-4 leading-relaxed main-text">
                  {ruling.content}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
                    <span className="main-text">الرقم: {ruling.id}</span>
                    {ruling.hadithId && (
                      <Link 
                        href={`/library/${ruling.hadithId}`}
                        className="text-primary hover:underline main-text"
                      >
                        عرض الحديث المرتبط
                      </Link>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/rulings/${ruling.id}`}>
                      <span className="main-text">عرض التفاصيل</span>
                      <ChevronLeft className="mr-1 h-4 w-4 rtl-flip" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRulings.length === 0 && (
          <div className="text-center py-12">
            <Scale className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2 main-text">لم يتم العثور على أحكام</h3>
            <p className="text-gray-500 main-text">جرب تعديل معايير البحث</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}