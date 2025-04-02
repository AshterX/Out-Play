
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, User, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Discover', path: '/discover' },
    { icon: Calendar, label: 'Games', path: '/games' },
    { icon: MapPin, label: 'Venues', path: '/venues' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center">
              <span className="text-white font-bold">PC</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">PlayConnect</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/notifications')}>
              Notifications
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* Bottom navigation for mobile */}
      <nav className="md:hidden bg-white border-t fixed bottom-0 left-0 right-0 z-10">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                className={`flex flex-col items-center py-2 px-4 w-full ${
                  isActive ? 'text-brand-primary' : 'text-gray-500'
                }`}
                onClick={() => navigate(item.path)}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
      
      {/* Sidebar for desktop */}
      <div className="hidden md:block fixed inset-y-0 left-0 z-50">
        <div className="bg-white shadow-lg h-full w-16 flex flex-col items-center py-8">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary flex items-center justify-center mb-8">
            <span className="text-white font-bold">PC</span>
          </div>
          
          <div className="space-y-6 flex flex-col items-center flex-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  className={`p-2 rounded-lg ${
                    isActive 
                      ? 'bg-brand-light text-brand-primary' 
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                  onClick={() => navigate(item.path)}
                  title={item.label}
                >
                  <Icon size={24} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
