import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BookOpen, Scale, Trophy, Users, Star, ArrowLeft, Search, Target, Clock } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: BookOpen,
    title: 'مكتبة شاملة للأحاديث',
    description: 'الوصول إلى آلاف الأحاديث الصحيحة مع التصنيفات التفصيلية والمصادر والتعليقات العلمية.',
  },
  {
    icon: Scale,
    title: 'أحكام فقهية علمية',
    description: 'استكشاف أحكام الفقه الإسلامي التفصيلية من جميع المذاهب الرئيسية مع المراجع المتقاطعة.',
  },
  {
    icon: Trophy,
    title: 'تتبع التقدم',
    description: 'راقب رحلة التعلم الخاصة بك مع التحليلات التفصيلية والمعالم وخطط الدراسة الشخصية.',
  },
  {
    icon: Users,
    title: 'التعلم المجتمعي',
    description: 'تواصل مع زملاء التعلم وشارك في المناقشات وتعلم من العلماء ذوي الخبرة.',
  },
  {
    icon: Search,
    title: 'البحث المتقدم',
    description: 'العثور على أحاديث وأحكام محددة باستخدام مرشحات البحث القوية حسب الموضوع والراوي والصحة.',
  },
  {
    icon: Target,
    title: 'اختبارات تكيفية',
    description: 'اختبر معرفتك بالاختبارات الذكية التي تتكيف مع تقدم التعلم والمناطق الضعيفة.',
  },
];

const stats = [
  { label: 'الأحاديث الصحيحة', value: '10,000+' },
  { label: 'أحكام الفقه', value: '2,500+' },
  { label: 'المتعلمون النشطون', value: '50,000+' },
  { label: 'معدل الإنجاز', value: '85%' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              <span className="main-text">اطلبوا العِلمَ مِنَ المهدِ إِلى اللَحدِ.</span>
            </Badge>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 main-text">
              أتقن المعرفة الإسلامية
              <span className="block text-primary">بثقة</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto main-text">
              منصة شاملة للتعليم الإسلامي تتضمن مجموعات الأحاديث الأصيلة وأحكام الفقه العلمية وتجارب التعلم الشخصية الموجهة بالمنهج التقليدي.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/library">
                  <span className="main-text">ابدأ التعلم</span>
                  <ArrowLeft className="mr-2 h-5 w-5 rtl-flip" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                <Link href="/auth/register" className="main-text">إنشاء حساب</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600 main-text">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 main-text">
              كل ما تحتاجه للتعلم الإسلامي
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto main-text">
              تجمع منصتنا بين النصوص الإسلامية الأصيلة وتكنولوجيا التعلم الحديثة لتوفير تجربة تعليمية لا مثيل لها.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isHadithLibrary = index === 0; // First feature is the Hadith library
              const isRulingsCard = index === 1; // Second feature is the Rulings card
              const isProgressCard = index === 2; // Third feature is the Progress card
              const isCommunityCard = index === 3; // Fourth feature is the Community card
              return (
                isHadithLibrary ? (
                  <Link key={index} href="/library" className="block">
                    <Card className="card-hover border-0 shadow-md cursor-pointer">
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl main-text">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base main-text">{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ) : isRulingsCard ? (
                  <Link key={index} href="/rulings" className="block">
                    <Card className="card-hover border-0 shadow-md cursor-pointer">
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl main-text">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base main-text">{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ) : isProgressCard ? (
                  <Link key={index} href="/dashboard" className="block">
                    <Card className="card-hover border-0 shadow-md cursor-pointer">
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl main-text">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base main-text">{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ) : isCommunityCard ? (
                  <Link key={index} href="/community" className="block">
                    <Card className="card-hover border-0 shadow-md cursor-pointer">
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl main-text">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base main-text">{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Card key={index} className="card-hover border-0 shadow-md">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl main-text">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base main-text">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                )
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4 main-text">
            ابدأ رحلة التعلم الإسلامي اليوم
          </h2>
          <p className="text-xl text-white/90 mb-8 main-text">
            انضم إلى آلاف الطلاب الذين يعمقون فهمهم للإسلام من خلال مواردنا التعليمية الشاملة والأصيلة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
              <Link href="/auth/register" className="main-text">ابدأ مجاناً</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Link href="/library" className="main-text">استكشف المكتبة</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}