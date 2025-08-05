import Link from 'next/link';
import { BookOpen, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-gray-900 main-text">التعلم الإسلامي</span>
            </div>
            <p className="text-gray-500 text-base main-text">
              منصة شاملة للتعليم الإسلامي تتضمن مجموعات الأحاديث الأصيلة وأحكام الفقه العلمية وتجارب التعلم الشخصية.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase main-text">
                  التعلم
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/library" className="text-base text-gray-500 hover:text-gray-900 main-text">
                      مكتبة الأحاديث
                    </Link>
                  </li>
                  <li>
                    <Link href="/rulings" className="text-base text-gray-500 hover:text-gray-900 main-text">
                      أحكام الفقه
                    </Link>
                  </li>
                  <li>
                    <Link href="/quiz" className="text-base text-gray-500 hover:text-gray-900 main-text">
                      الاختبارات التفاعلية
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="text-base text-gray-500 hover:text-gray-900 main-text">
                      تتبع التقدم
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase main-text">
                  الدعم
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="/help" className="text-base text-gray-500 hover:text-gray-900 main-text">
                      مركز المساعدة
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900 main-text">
                      اتصل بنا
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900 main-text">
                      سياسة الخصوصية
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900 main-text">
                      شروط الخدمة
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center main-text">
            &copy; 2025 منصة التعلم الإسلامي. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}