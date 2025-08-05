'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { 
  Trophy, 
  BookOpen, 
  Target, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  Clock,
  Star,
  Award,
  CheckCircle
} from 'lucide-react';

interface StudyProgress {
  totalHadiths: number;
  studiedHadiths: number;
  masteredHadiths: number;
  currentStreak: number;
  totalQuizzes: number;
  passedQuizzes: number;
  studyTime: number; // in minutes
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [progress, setProgress] = useState<StudyProgress>({
    totalHadiths: 150,
    studiedHadiths: 85,
    masteredHadiths: 42,
    currentStreak: 7,
    totalQuizzes: 25,
    passedQuizzes: 18,
    studyTime: 1250
  });

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'الخطوات الأولى',
      description: 'أكمل دراسة حديثك الأول',
      icon: '🎯',
      earned: true,
      earnedAt: '2024-01-01'
    },
    {
      id: '2',
      title: 'طالب العلم',
      description: 'ادرس 50 حديثاً',
      icon: '📚',
      earned: true,
      earnedAt: '2024-01-15'
    },
    {
      id: '3',
      title: 'أستاذ الاختبارات',
      description: 'اجتز 20 اختباراً',
      icon: '🏆',
      earned: false
    },
    {
      id: '4',
      title: 'المتعلم المثابر',
      description: 'ادرس لمدة 7 أيام متتالية',
      icon: '🔥',
      earned: true,
      earnedAt: '2024-01-20'
    }
  ];

  const recentActivities = [
    { date: '2024-01-20', activity: 'أكمل حديث عن الصلاة', type: 'دراسة' },
    { date: '2024-01-20', activity: 'اجتاز اختبار الأخلاق', type: 'اختبار' },
    { date: '2024-01-19', activity: 'درس 3 أحاديث عن الزكاة', type: 'دراسة' },
    { date: '2024-01-19', activity: 'راجع أحكام الحنفية', type: 'حكم' },
  ];

  const studyGoal = 100;
  const progressPercentage = (progress.studiedHadiths / studyGoal) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 main-text">لوحة التعلم</h1>
          <p className="text-gray-600 main-text">
            تتبع تقدمك واستمر في رحلة التعلم الإسلامي
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium main-text">الأحاديث المدروسة</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progress.studiedHadiths}</div>
              <p className="text-xs text-muted-foreground main-text">
                من {progress.totalHadiths} متاح
              </p>
              <Progress value={(progress.studiedHadiths / progress.totalHadiths) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium main-text">السلسلة الحالية</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progress.currentStreak}</div>
              <p className="text-xs text-muted-foreground main-text">
                أيام متتالية
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium main-text">أداء الاختبارات</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round((progress.passedQuizzes / progress.totalQuizzes) * 100)}%
              </div>
              <p className="text-xs text-muted-foreground main-text">
                {progress.passedQuizzes} من {progress.totalQuizzes} نجح
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium main-text">وقت الدراسة</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(progress.studyTime / 60)}س</div>
              <p className="text-xs text-muted-foreground main-text">
                {progress.studyTime % 60}د إجمالي الوقت
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Study Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="main-text">تقدم هدف الدراسة</CardTitle>
                <CardDescription className="main-text">
                  هدفك هو دراسة {studyGoal} حديث هذا الشهر
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="main-text">التقدم</span>
                    <span className="font-medium">{progress.studiedHadiths}/{studyGoal}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <p className="text-sm text-muted-foreground main-text">
                    {Math.round(progressPercentage)}% مكتمل • {studyGoal - progress.studiedHadiths} متبقي
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="main-text">النشاط الأخير</CardTitle>
                <CardDescription className="main-text">أنشطة التعلم الأخيرة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium main-text">{activity.activity}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        <span className="main-text">{activity.type}</span>
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="main-text">الإنجازات</CardTitle>
                <CardDescription className="main-text">معالم التعلم الخاصة بك</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg border ${
                        achievement.earned ? 'bg-primary/5 border-primary/20' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start space-x-3 rtl:space-x-reverse">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <h4 className={`font-medium main-text ${achievement.earned ? 'text-primary' : 'text-gray-500'}`}>
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1 main-text">
                            {achievement.description}
                          </p>
                          {achievement.earned && achievement.earnedAt && (
                            <p className="text-xs text-primary mt-2 main-text">
                              حصل عليه في {new Date(achievement.earnedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        {achievement.earned && (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="main-text">تقويم الدراسة</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="main-text">الإجراءات السريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <a href="/library">
                    <BookOpen className="mr-2 h-4 w-4" />
                    <span className="main-text">دراسة الأحاديث</span>
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/quiz">
                    <Trophy className="mr-2 h-4 w-4" />
                    <span className="main-text">خذ اختباراً</span>
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/rulings">
                    <Star className="mr-2 h-4 w-4" />
                    <span className="main-text">تصفح الأحكام</span>
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}