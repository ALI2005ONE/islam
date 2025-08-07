'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Scale, BookOpen, Users, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const schoolsPath = {
  title: 'مسار المذاهب الإسلامية',
  description: 'دراسة مقارنة للمذاهب الفقهية الأربعة وأصولها',
  totalLessons: 80,
  estimatedTime: '4 أشهر',
  difficulty: 'متقدم',
  schools: [
    {
      id: 1,
      name: 'المذهب الحنفي',
      founder: 'الإمام أبو حنيفة النعمان',
      description: 'أكبر المذاهب الفقهية انتشاراً في العالم',
      lessons: 20,
      completed: 15,
      status: 'في التقدم',
      color: 'blue',
      regions: 'تركيا، آسيا الوسطى، الهند'
    },
    {
      id: 2,
      name: 'المذهب المالكي',
      founder: 'الإمام مالك بن أنس',
      description: 'مذهب أهل المدينة المنورة',
      lessons: 20,
      completed: 20,
      status: 'مكتمل',
      color: 'green',
      regions: 'المغرب العربي، غرب أفريقيا'
    },
    {
      id: 3,
      name: 'المذهب الشافعي',
      founder: 'الإمام محمد بن إدريس الشافعي',
      description: 'مذهب الإمام الشافعي وأصول الفقه',
      lessons: 20,
      completed: 8,
      status: 'في التقدم',
      color: 'purple',
      regions: 'مصر، الشام، جنوب شرق آسيا'
    },
    {
      id: 4,
      name: 'المذهب الحنبلي',
      founder: 'الإمام أحمد بن حنبل',
      description: 'مذهب الإمام أحمد والسلف الصالح',
      lessons: 20,
      completed: 0,
      status: 'لم يبدأ',
      color: 'orange',
      regions: 'الجزيرة العربية، الخليج'
    }
  ]
};

export default function SchoolsPath() {
  const completedLessons = schoolsPath.schools.reduce((sum, school) => sum + school.completed, 0);
  const progressPercentage = (completedLessons / schoolsPath.totalLessons) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-100 text-green-800';
      case 'في التقدم': return 'bg-blue-100 text-blue-800';
      case 'لم يبدأ': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-50 to-blue-100 border-blue-200';
      case 'green': return 'from-green-50 to-green-100 border-green-200';
      case 'purple': return 'from-purple-50 to-purple-100 border-purple-200';
      case 'orange': return 'from-orange-50 to-orange-100 border-orange-200';
      default: return 'from-gray-50 to-gray-100 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
            <Link href="/library" className="text-primary hover:underline main-text">
              المكتبة
            </Link>
            <ChevronLeft className="h-4 w-4 text-gray-400 rtl-flip" />
            <span className="text-gray-600 main-text">المسار التعليمي</span>
          </div>
          
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 main-text">{schoolsPath.title}</h1>
              <p className="text-gray-600 main-text">{schoolsPath.description}</p>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Scale className="h-6 w-6 text-primary" />
              <span className="text-2xl">⚖️</span>
            </div>
          </div>

          {/* Path Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600 main-text">إجمالي الدروس</p>
                    <p className="text-2xl font-bold">{schoolsPath.totalLessons}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Scale className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600 main-text">المدة المقدرة</p>
                    <p className="text-2xl font-bold main-text">{schoolsPath.estimatedTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600 main-text">المستوى</p>
                    <p className="text-2xl font-bold main-text">{schoolsPath.difficulty}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Scale className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600 main-text">التقدم</p>
                    <p className="text-2xl font-bold">{Math.round(progressPercentage)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overall Progress */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="main-text">تقدم دراسة المذاهب</CardTitle>
              <CardDescription className="main-text">
                {completedLessons} من {schoolsPath.totalLessons} درس مكتمل
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercentage} className="h-3" />
            </CardContent>
          </Card>
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schoolsPath.schools.map((school) => (
            <Card key={school.id} className={`card-hover bg-gradient-to-br ${getColorClasses(school.color)} border`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                      <Badge className={getStatusColor(school.status)}>
                        <span className="main-text">{school.status}</span>
                      </Badge>
                      <span className="text-sm text-gray-500 main-text">
                        {school.lessons} درس
                      </span>
                    </div>
                    <CardTitle className="text-xl mb-2 main-text">{school.name}</CardTitle>
                    <p className="text-sm text-gray-600 mb-2 main-text">
                      <strong>المؤسس:</strong> {school.founder}
                    </p>
                    <CardDescription className="main-text mb-3">{school.description}</CardDescription>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <span className="text-xs text-gray-500 main-text">المناطق:</span>
                      <span className="text-xs text-gray-600 main-text">{school.regions}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {school.completed}/{school.lessons}
                    </div>
                    <p className="text-xs text-gray-500 main-text">مكتمل</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <Progress 
                    value={(school.completed / school.lessons) * 100} 
                    className="h-2" 
                  />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 main-text">
                      {Math.round((school.completed / school.lessons) * 100)}% مكتمل
                    </span>
                    <Button 
                      variant={school.status === 'لم يبدأ' ? 'default' : 'outline'} 
                      size="sm"
                    >
                      <span className="main-text">
                        {school.status === 'لم يبدأ' ? 'ابدأ الدراسة' : 'متابعة الدراسة'}
                      </span>
                      <ChevronLeft className="mr-1 h-4 w-4 rtl-flip" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparative Study Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="main-text">الدراسة المقارنة</CardTitle>
            <CardDescription className="main-text">
              مقارنة الآراء الفقهية بين المذاهب الأربعة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2 main-text">أصول الفقه</h4>
                <p className="text-sm text-blue-700 main-text">
                  دراسة مقارنة لأصول الاستنباط في كل مذهب
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2 main-text">فقه العبادات</h4>
                <p className="text-sm text-green-700 main-text">
                  مقارنة أحكام الصلاة والزكاة والحج
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2 main-text">فقه المعاملات</h4>
                <p className="text-sm text-purple-700 main-text">
                  الاختلافات في أحكام البيع والشراء
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2 main-text">الأحوال الشخصية</h4>
                <p className="text-sm text-orange-700 main-text">
                  مقارنة أحكام الزواج والطلاق والميراث
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}