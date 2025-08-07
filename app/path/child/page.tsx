'use client';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, Smile, BookOpen, Star, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const childPath = {
  title: 'مسار الطفل المسلم',
  description: 'تعليم الأطفال أساسيات الدين الإسلامي بطريقة ممتعة وتفاعلية',
  totalLessons: 60,
  estimatedTime: '3 أشهر',
  difficulty: 'مبتدئ',
  ageRange: '6-12 سنة',
  modules: [
    {
      id: 1,
      title: 'أركان الإسلام',
      description: 'تعلم الأركان الخمسة للإسلام',
      lessons: 10,
      completed: 8,
      status: 'في التقدم',
      icon: '🕌'
    },
    {
      id: 2,
      title: 'أركان الإيمان',
      description: 'فهم أركان الإيمان الستة',
      lessons: 12,
      completed: 12,
      status: 'مكتمل',
      icon: '💫'
    },
    {
      id: 3,
      title: 'الأدعية اليومية',
      description: 'حفظ الأدعية المهمة للطفل المسلم',
      lessons: 15,
      completed: 5,
      status: 'في التقدم',
      icon: '🤲'
    },
    {
      id: 4,
      title: 'الأخلاق الحسنة',
      description: 'تعلم الأخلاق الإسلامية الجميلة',
      lessons: 13,
      completed: 0,
      status: 'لم يبدأ',
      icon: '😊'
    },
    {
      id: 5,
      title: 'قصص الأنبياء',
      description: 'قصص مبسطة عن الأنبياء والرسل',
      lessons: 10,
      completed: 0,
      status: 'لم يبدأ',
      icon: '📖'
    }
  ]
};

export default function ChildPath() {
  const completedLessons = childPath.modules.reduce((sum, module) => sum + module.completed, 0);
  const progressPercentage = (completedLessons / childPath.totalLessons) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-100 text-green-800';
      case 'في التقدم': return 'bg-blue-100 text-blue-800';
      case 'لم يبدأ': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2 main-text">{childPath.title}</h1>
              <p className="text-gray-600 main-text">{childPath.description}</p>
              <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2">
                <Badge variant="secondary">
                  <span className="main-text">{childPath.ageRange}</span>
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Heart className="h-6 w-6 text-pink-500" />
              <span className="text-2xl">🌟</span>
            </div>
          </div>

          {/* Path Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-blue-700 main-text">إجمالي الدروس</p>
                    <p className="text-2xl font-bold text-blue-800">{childPath.totalLessons}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-green-100">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Smile className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-green-700 main-text">المدة المقدرة</p>
                    <p className="text-2xl font-bold text-green-800 main-text">{childPath.estimatedTime}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Star className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-purple-700 main-text">المستوى</p>
                    <p className="text-2xl font-bold text-purple-800 main-text">{childPath.difficulty}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Heart className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm text-yellow-700 main-text">التقدم</p>
                    <p className="text-2xl font-bold text-yellow-800">{Math.round(progressPercentage)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overall Progress */}
          <Card className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50">
            <CardHeader>
              <CardTitle className="main-text flex items-center space-x-2 rtl:space-x-reverse">
                <span>🎯</span>
                <span>تقدم المسار</span>
              </CardTitle>
              <CardDescription className="main-text">
                {completedLessons} من {childPath.totalLessons} درس مكتمل - أحسنت! 🌟
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercentage} className="h-4" />
            </CardContent>
          </Card>
        </div>

        {/* Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {childPath.modules.map((module) => (
            <Card key={module.id} className="card-hover bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-3">
                      <span className="text-2xl">{module.icon}</span>
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
                    className="h-3" 
                  />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 main-text">
                      {Math.round((module.completed / module.lessons) * 100)}% مكتمل
                    </span>
                    <Button 
                      variant={module.status === 'لم يبدأ' ? 'default' : 'outline'} 
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      <span className="main-text">
                        {module.status === 'لم يبدأ' ? 'ابدأ المتعة! 🚀' : 'تابع التعلم! 📚'}
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