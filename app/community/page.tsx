'use client';

import { useState, useRef } from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  MessageCircle, 
  Plus, 
  Search, 
  Bell, 
  Star, 
  Reply, 
  Heart, 
  Share2, 
  Paperclip, 
  Image as ImageIcon,
  Send,
  Shield,
  Clock,
  Eye,
  ChevronLeft,
  Filter
} from 'lucide-react';

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    isExpert: boolean;
    reputation: number;
  };
  category: string;
  replies: number;
  views: number;
  likes: number;
  createdAt: string;
  isPrivate: boolean;
  hasAttachment: boolean;
  tags: string[];
}

interface Reply {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    isExpert: boolean;
  };
  createdAt: string;
  likes: number;
  isExpertResponse: boolean;
}

const sampleDiscussions: Discussion[] = [
  {
    id: '1',
    title: 'ما هو الحكم في قراءة القرآن بدون وضوء؟',
    content: 'أريد أن أعرف الحكم الشرعي في قراءة القرآن الكريم بدون وضوء، وهل هناك فرق بين القراءة من المصحف والقراءة عن ظهر قلب؟',
    author: {
      name: 'أحمد محمد',
      isExpert: false,
      reputation: 150
    },
    category: 'الفقه',
    replies: 8,
    views: 245,
    likes: 12,
    createdAt: '2024-01-20',
    isPrivate: false,
    hasAttachment: false,
    tags: ['الطهارة', 'القرآن', 'الفقه']
  },
  {
    id: '2',
    title: 'شرح حديث "إنما الأعمال بالنيات"',
    content: 'هل يمكن لأحد العلماء أن يشرح لنا هذا الحديث الشريف وتطبيقاته في الحياة اليومية؟',
    author: {
      name: 'فاطمة أحمد',
      isExpert: false,
      reputation: 89
    },
    category: 'الحديث',
    replies: 15,
    views: 567,
    likes: 28,
    createdAt: '2024-01-19',
    isPrivate: false,
    hasAttachment: true,
    tags: ['الحديث', 'النية', 'الأخلاق']
  },
  {
    id: '3',
    title: 'مناقشة خاصة: أحكام الزكاة للتجار',
    content: 'أحتاج إلى استشارة خاصة حول كيفية حساب زكاة التجارة...',
    author: {
      name: 'عبدالله سالم',
      isExpert: false,
      reputation: 234
    },
    category: 'الزكاة',
    replies: 3,
    views: 45,
    likes: 5,
    createdAt: '2024-01-18',
    isPrivate: true,
    hasAttachment: false,
    tags: ['الزكاة', 'التجارة', 'المال']
  }
];

const sampleReplies: Reply[] = [
  {
    id: '1',
    content: 'بارك الله فيك على هذا السؤال المهم. بالنسبة لقراءة القرآن بدون وضوء، فإن العلماء اختلفوا في هذه المسألة...',
    author: {
      name: 'د. محمد العالم',
      isExpert: true
    },
    createdAt: '2024-01-20',
    likes: 25,
    isExpertResponse: true
  },
  {
    id: '2',
    content: 'جزاك الله خيراً دكتور، هل يمكن أن توضح لنا المذاهب المختلفة في هذه المسألة؟',
    author: {
      name: 'سارة محمود',
      isExpert: false
    },
    createdAt: '2024-01-20',
    likes: 8,
    isExpertResponse: false
  }
];

export default function Community() {
  const [activeTab, setActiveTab] = useState('public');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: '',
    category: '',
    isPrivate: false,
    tags: ''
  });
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['all', 'الفقه', 'الحديث', 'العقيدة', 'الأخلاق', 'الزكاة', 'الصلاة', 'الحج'];
  const notifications = [
    { id: '1', message: 'رد جديد على سؤالك عن الوضوء', time: '5 دقائق', unread: true },
    { id: '2', message: 'إجابة من خبير على موضوعك', time: '1 ساعة', unread: true },
    { id: '3', message: 'إعجاب جديد على تعليقك', time: '3 ساعات', unread: false }
  ];

  const filteredDiscussions = sampleDiscussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    const matchesTab = activeTab === 'public' ? !discussion.isPrivate : discussion.isPrivate;
    
    return matchesSearch && matchesCategory && matchesTab;
  });

  const handleCreateDiscussion = () => {
    // Here you would typically send the data to your backend
    console.log('Creating discussion:', newDiscussion);
    setIsCreateDialogOpen(false);
    setNewDiscussion({ title: '', content: '', category: '', isPrivate: false, tags: '' });
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleReply = () => {
    // Here you would typically send the reply to your backend
    console.log('Sending reply:', replyContent);
    setReplyContent('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 main-text">التعلم المجتمعي</h1>
              <p className="text-gray-600 main-text">
                تواصل مع المجتمع الإسلامي، اطرح أسئلتك واحصل على إجابات من الخبراء
              </p>
            </div>
            
            {/* Notifications */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="relative">
                <Button variant="outline" size="icon">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500">
                    {notifications.filter(n => n.unread).length}
                  </Badge>
                </Button>
              </div>
              
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Plus className="h-4 w-4" />
                    <span className="main-text">موضوع جديد</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="main-text">إنشاء موضوع جديد</DialogTitle>
                    <DialogDescription className="main-text">
                      شارك سؤالك أو موضوعك مع المجتمع
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="main-text">عنوان الموضوع</Label>
                      <Input
                        id="title"
                        value={newDiscussion.title}
                        onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
                        placeholder="اكتب عنواناً واضحاً لموضوعك"
                        className="main-text"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category" className="main-text">الفئة</Label>
                      <Select value={newDiscussion.category} onValueChange={(value) => setNewDiscussion({...newDiscussion, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.slice(1).map(category => (
                            <SelectItem key={category} value={category}>
                              <span className="main-text">{category}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="content" className="main-text">المحتوى</Label>
                      <Textarea
                        id="content"
                        value={newDiscussion.content}
                        onChange={(e) => setNewDiscussion({...newDiscussion, content: e.target.value})}
                        placeholder="اكتب سؤالك أو موضوعك بالتفصيل..."
                        rows={6}
                        className="main-text"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="tags" className="main-text">الكلمات المفتاحية</Label>
                      <Input
                        id="tags"
                        value={newDiscussion.tags}
                        onChange={(e) => setNewDiscussion({...newDiscussion, tags: e.target.value})}
                        placeholder="مثال: الصلاة، الطهارة، الفقه"
                        className="main-text"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Button variant="outline" size="sm" onClick={handleFileUpload}>
                          <Paperclip className="h-4 w-4 mr-1" />
                          <span className="main-text">إرفاق ملف</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleFileUpload}>
                          <ImageIcon className="h-4 w-4 mr-1" />
                          <span className="main-text">إرفاق صورة</span>
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          accept="image/*,.pdf,.doc,.docx"
                          multiple
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                          <span className="main-text">إلغاء</span>
                        </Button>
                        <Button onClick={handleCreateDiscussion}>
                          <span className="main-text">نشر الموضوع</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600 main-text">الأعضاء النشطون</p>
                    <p className="text-2xl font-bold">1,247</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600 main-text">المواضيع</p>
                    <p className="text-2xl font-bold">3,456</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600 main-text">الخبراء المعتمدون</p>
                    <p className="text-2xl font-bold">89</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Reply className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-600 main-text">الردود اليوم</p>
                    <p className="text-2xl font-bold">234</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="public" className="main-text">المناقشات العامة</TabsTrigger>
                  <TabsTrigger value="private" className="main-text">المناقشات الخاصة</TabsTrigger>
                </TabsList>
                
                {/* Search and Filters */}
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="البحث في المواضيع..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10 w-64 main-text"
                    />
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="الفئة" />
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

              <TabsContent value="public" className="space-y-4">
                {filteredDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="card-hover cursor-pointer" onClick={() => setSelectedDiscussion(discussion)}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium main-text">{discussion.author.name}</p>
                              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-500">
                                <Clock className="h-3 w-3" />
                                <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                                {discussion.author.isExpert && (
                                  <Badge variant="secondary" className="text-xs">
                                    <Shield className="h-3 w-3 mr-1" />
                                    <span className="main-text">خبير معتمد</span>
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <CardTitle className="text-lg mb-2 main-text">{discussion.title}</CardTitle>
                          <p className="text-gray-600 mb-3 main-text line-clamp-2">{discussion.content}</p>
                          
                          <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <Badge variant="outline">
                              <span className="main-text">{discussion.category}</span>
                            </Badge>
                            {discussion.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                <span className="main-text">{tag}</span>
                              </Badge>
                            ))}
                            {discussion.hasAttachment && (
                              <Badge variant="outline" className="text-xs">
                                <Paperclip className="h-3 w-3 mr-1" />
                                <span className="main-text">مرفق</span>
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Reply className="h-4 w-4" />
                            <span>{discussion.replies}</span>
                          </div>
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Eye className="h-4 w-4" />
                            <span>{discussion.views}</span>
                          </div>
                          <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            <Heart className="h-4 w-4" />
                            <span>{discussion.likes}</span>
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          <span className="main-text">عرض التفاصيل</span>
                          <ChevronLeft className="mr-1 h-4 w-4 rtl-flip" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="private" className="space-y-4">
                {filteredDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="card-hover cursor-pointer border-orange-200 bg-orange-50/30">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium main-text">{discussion.author.name}</p>
                              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-500">
                                <Clock className="h-3 w-3" />
                                <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                                <Badge variant="outline" className="text-xs bg-orange-100">
                                  <span className="main-text">خاص</span>
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <CardTitle className="text-lg mb-2 main-text">{discussion.title}</CardTitle>
                          <p className="text-gray-600 mb-3 main-text line-clamp-1">{discussion.content}</p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Expert Scholars */}
            <Card>
              <CardHeader>
                <CardTitle className="main-text flex items-center space-x-2 rtl:space-x-reverse">
                  <Shield className="h-5 w-5" />
                  <span>العلماء المعتمدون</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'د. محمد العالم', specialty: 'الفقه الإسلامي', online: true },
                  { name: 'د. أحمد الفقيه', specialty: 'الحديث الشريف', online: false },
                  { name: 'د. فاطمة الأزهري', specialty: 'العقيدة', online: true }
                ].map((expert, index) => (
                  <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{expert.name.split(' ')[1].charAt(0)}</AvatarFallback>
                      </Avatar>
                      {expert.online && (
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm main-text">{expert.name}</p>
                      <p className="text-xs text-gray-500 main-text">{expert.specialty}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="main-text flex items-center space-x-2 rtl:space-x-reverse">
                  <Bell className="h-5 w-5" />
                  <span>الإشعارات الأخيرة</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {notifications.map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg ${notification.unread ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}>
                    <p className="text-sm main-text">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="main-text">الكلمات المفتاحية الشائعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['الصلاة', 'الزكاة', 'الحج', 'الطهارة', 'الأخلاق', 'الحديث', 'الفقه', 'العقيدة'].map(tag => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white">
                      <span className="main-text">{tag}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Discussion Detail Modal */}
        {selectedDiscussion && (
          <Dialog open={!!selectedDiscussion} onOpenChange={() => setSelectedDiscussion(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="main-text">{selectedDiscussion.title}</DialogTitle>
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-500">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{selectedDiscussion.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="main-text">{selectedDiscussion.author.name}</span>
                  <span>•</span>
                  <span>{new Date(selectedDiscussion.createdAt).toLocaleDateString()}</span>
                </div>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="main-text leading-relaxed">{selectedDiscussion.content}</p>
                </div>
                
                {/* Replies */}
                <div className="space-y-4">
                  <h3 className="font-semibold main-text">الردود ({sampleReplies.length})</h3>
                  {sampleReplies.map((reply) => (
                    <div key={reply.id} className={`p-4 rounded-lg border ${reply.isExpertResponse ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}>
                      <div className="flex items-start space-x-3 rtl:space-x-reverse">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                            <p className="font-medium main-text">{reply.author.name}</p>
                            {reply.author.isExpert && (
                              <Badge variant="secondary" className="text-xs">
                                <Shield className="h-3 w-3 mr-1" />
                                <span className="main-text">خبير معتمد</span>
                              </Badge>
                            )}
                            <span className="text-sm text-gray-500">{new Date(reply.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="main-text mb-2">{reply.content}</p>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Button variant="ghost" size="sm">
                              <Heart className="h-4 w-4 mr-1" />
                              <span>{reply.likes}</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Reply className="h-4 w-4 mr-1" />
                              <span className="main-text">رد</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Reply Form */}
                <div className="border-t pt-4">
                  <div className="space-y-3">
                    <Textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="اكتب ردك هنا..."
                      rows={4}
                      className="main-text"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Button variant="outline" size="sm" onClick={handleFileUpload}>
                          <Paperclip className="h-4 w-4 mr-1" />
                          <span className="main-text">إرفاق</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleFileUpload}>
                          <ImageIcon className="h-4 w-4 mr-1" />
                          <span className="main-text">صورة</span>
                        </Button>
                      </div>
                      <Button onClick={handleReply} disabled={!replyContent.trim()}>
                        <Send className="h-4 w-4 mr-1" />
                        <span className="main-text">إرسال الرد</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </main>

      <Footer />
    </div>
  );
}