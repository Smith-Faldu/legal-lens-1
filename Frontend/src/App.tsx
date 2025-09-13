import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/landing-page';
import { AuthPage } from './components/auth-page';
import { Dashboard } from './components/dashboard';
import { UploadPage } from './components/upload-page';
import { AnalysisPage } from './components/analysis-page';
import { ChatPage } from './components/chat-page';
import { ProfilePage } from './components/profile-page';
import { Navbar } from './components/navbar';
import { Sidebar } from './components/sidebar';
import { Toaster } from './components/ui/sonner';
import { onAuthStateChange, logout, updateUserProfile, getCurrentUser } from './services/authService';
import { User } from 'firebase/auth';

// Simple user interface for components
interface SimpleUser {
  uid: string;
  email: string;
  displayName?: string;
}

// Convert Firebase User to SimpleUser
const convertUser = (firebaseUser: User | null): SimpleUser | null => {
  if (!firebaseUser) return null;
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email || '',
    displayName: firebaseUser.displayName || undefined
  };
};

type Page = 'landing' | 'auth' | 'dashboard' | 'upload' | 'analysis' | 'chat' | 'profile';

interface RouteParams {
  id?: string;
}

export default function App() {
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [routeParams, setRouteParams] = useState<RouteParams>({});
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChange((firebaseUser) => {
      const simpleUser = convertUser(firebaseUser);
      setUser(simpleUser);
      if (simpleUser) {
        setCurrentPage('dashboard');
      } else {
        setCurrentPage('landing');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentPage('landing');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigate = (page: Page, params?: RouteParams) => {
    setCurrentPage(page);
    setRouteParams(params || {});
  };

  const updateUser = async (updates: { displayName?: string }) => {
    try {
      if (updates.displayName) {
        await updateUserProfile(updates.displayName);
        // Refresh user data
        const currentUser = getCurrentUser();
        const simpleUser = convertUser(currentUser);
        setUser(simpleUser);
      }
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleGetStarted = () => {
    setCurrentPage('auth');
  };

  const handleAuthSuccess = () => {
    setCurrentPage('dashboard');
  };

  const renderPage = () => {
    // If user is logged in, don't show landing or auth pages
    if (user && (currentPage === 'landing' || currentPage === 'auth')) {
      return <Dashboard user={user} onNavigate={navigate} />;
    }

    // If user is not logged in and trying to access protected pages
    if (!user && currentPage !== 'landing' && currentPage !== 'auth') {
      return <LandingPage onGetStarted={handleGetStarted} />;
    }

    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      case 'auth':
        return <AuthPage onAuthSuccess={handleAuthSuccess} />;
      case 'dashboard':
        return <Dashboard user={user!} onNavigate={navigate} />;
      case 'upload':
        return <UploadPage onNavigate={navigate} />;
      case 'analysis':
        return <AnalysisPage documentId={routeParams.id} onNavigate={navigate} />;
      case 'chat':
        return <ChatPage documentId={routeParams.id} onNavigate={navigate} />;
      case 'profile':
        return <ProfilePage user={user!} onUpdateUser={updateUser} onLogout={handleLogout} />;
      default:
        return user ? <Dashboard user={user} onNavigate={navigate} /> : <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {user && currentPage !== 'landing' && (
        <Navbar 
          user={user} 
          isDark={isDark} 
          onToggleTheme={() => setIsDark(!isDark)} 
          onLogout={handleLogout}
        />
      )}
      
      <div className="flex">
        {user && currentPage !== 'landing' && (
          <Sidebar 
            currentPage={currentPage === 'auth' ? 'dashboard' : currentPage} 
            onNavigate={navigate} 
          />
        )}
        
        <main className={`flex-1 ${user && currentPage !== 'landing' ? 'pl-64 pt-16' : ''}`}>
          {renderPage()}
        </main>
      </div>
      
      <Toaster />
    </div>
  );
}