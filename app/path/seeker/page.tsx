'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Target, Clock, Star, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const seekerPath = {
  title: 'مسار طالب العلم',
  description: 'رحلة شاملة لطلاب العلم الشرعي من المبتدئين إلى المتقدمين',
  totalLessons: 120,
  estimatedTime: '6 أشهر',
  difficulty: 'متوسط',
  modules: [
    {
      id: 1,
      title: 'أساسيات العقيدة',
      description: 'تعلم أركان الإيمان والتوحيد',
      lessons: 15,
      completed: 12,
      status: 'في التقدم'
    },
    {
      id: 2,
      title: 'أحكام الطهارة والصلاة',
      description: 'الأحكام الأساسية للعبادات',
      lessons: 25,
      completed: 25,
      status: 'مكتمل'
    },
    {
      id: 3,
      title: 'الأخلاق الإسلامية',
      description: 'تطبيق الأخلاق في الحياة اليومية',
      lessons: 20,
      completed: 8,
      status: 'في التقدم'
    },
    {
      id: 4,
      title: 'فقه المعاملات',
      description: 'أحكام البيع والشراء والمعاملات المالية',
      lessons: 30,
      completed: 0,
      status: 'لم يبدأ'
    },
    {
      id: 5,
      title: 'السيرة النبوية',
      description: 'دراسة حياة النبي صلى الله عليه وسلم',
      lessons: 30,
      completed: 0,
      status: 'لم يبدأ'
    }
  ]
};

export default function SeekerPath() {
  const completedLessons = seekerPath.modules.reduce((sum, module) => sum + module.completed, 0);
  const progressPercentage = (completedLessons / seekerPath.totalLessons) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-100 text-green-800';
      case 'في التقدم': return 'bg-blue-100 text-blue-800';
      case 'لم يبدأ': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2 main-text">{seekerPath.title}</h1>
              <p className="text-gray-600 main-text">{seekerPath.description}</p>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Star className="h-6 w-6 text-yellow-500" />
              <span className="text-2xl">★</span>
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
                    <p className="text-2xl font-bold">{seekerPath.totalLessons}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600 main-text">المدة المقدرة</p>
                    <p className="text-2xl font-bold main-text">{seekerPath.estimatedTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Target className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600 main-text">المستوى</p>
                    <p className="text-2xl font-bold main-text">{seekerPath.difficulty}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Star className="h-5 w-5 text-primary" />
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
              <CardTitle className="main-text">تقدم المسار</CardTitle>
              <CardDescription className="main-text">
                {completedLessons} من {seekerPath.totalLessons} درس مكتمل
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercentage} className="h-3" />
            </CardContent>
          </Card>
        </div>

        {/* Modules */}
        <div className="grid grid-cols-1 gap-6">
          {seekerPath.modules.map((module) => (
            <Card key={module.id} className="card-hover">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                      <Badge className={getStatusColor(module.status)}>
                        <span className="main-text">{module.status}</span>
                      </Badge>
                      <span className="text-sm text-gray-500 main-text">
                        {module.lessons} درس
                      </span>
                    </div>
                    <CardTitle className="text-xl mb-2 main-text">{module.title}</CardTitle>
                    <CardDescription className="main-text">{module.description}</CardDescription>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {module.completed}/{module.lessons}
                    </div>
                    <p className="text-xs text-gray-500 main-text">مكتمل</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <Progress 
                    value={(module.completed / module.lessons) * 100} 
                    className="h-2" 
                  />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 main-text">
                      {Math.round((module.completed / module.lessons) * 100)}% مكتمل
                    </span>
                    <Button 
                      variant={module.status === 'لم يبدأ' ? 'default' : 'outline'} 
                      size="sm"
                    >
                      <span className="main-text">
                        {module.status === 'لم يبدأ' ? 'ابدأ الآن' : 'متابعة'}
                      </span>
                      <ChevronLeft className="mr-1 h-4 w-4 rtl-flip" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}