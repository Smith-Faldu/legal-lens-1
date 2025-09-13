import React, { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { AuthPage } from './components/auth-page';
import { Dashboard } from './components/dashboard';
import { UploadPage } from './components/upload-page';
import { AnalysisPage } from './components/analysis-page';
import { ChatPage } from './components/chat-page';
import { ProfilePage } from './components/profile-page';
import { Navbar } from './components/navbar';
import { Sidebar } from './components/sidebar';
import { Toaster } from './components/ui/sonner';
import { onAuthStateChange, logout, updateUserProfile } from './services/authService';

// Local User interface to match component expectations
interface User {
  uid: string;
  email: string;
  displayName?: string;
}

// Convert Firebase User to local User interface
const convertFirebaseUser = (firebaseUser: FirebaseUser): User => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email || '',
  displayName: firebaseUser.displayName || undefined,
});

type Page = 'auth' | 'dashboard' | 'upload' | 'analysis' | 'chat' | 'profile';

interface RouteParams {
  id?: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('auth');
  const [routeParams, setRouteParams] = useState<RouteParams>({});
  const [isDark, setIsDark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChange((firebaseUser) => {
      if (firebaseUser) {
        setUser(convertFirebaseUser(firebaseUser));
        setCurrentPage('dashboard');
      } else {
        setUser(null);
        setCurrentPage('auth');
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

  const handleAuthSuccess = () => {
    // Auth state change will be handled by onAuthStateChange listener
  };

  const handleLogout = async () => {
    try {
      await logout();
      setCurrentPage('auth');
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
        // The user state will be updated automatically via onAuthStateChange
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const renderPage = () => {
    if (currentPage === 'auth') {
      return <AuthPage onAuthSuccess={handleAuthSuccess} />;
    }

    if (!user) {
      return <AuthPage onAuthSuccess={handleAuthSuccess} />;
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} onNavigate={navigate} />;
      case 'upload':
        return <UploadPage onNavigate={navigate} />;
      case 'analysis':
        return <AnalysisPage documentId={routeParams.id} onNavigate={navigate} />;
      case 'chat':
        return <ChatPage onNavigate={navigate} />;
      case 'profile':
        return <ProfilePage user={user} onUpdateUser={updateUser} onLogout={handleLogout} />;
      default:
        return <Dashboard user={user} onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {user && (
        <Navbar 
          user={user} 
          isDark={isDark} 
          onToggleTheme={() => setIsDark(!isDark)} 
          onLogout={handleLogout}
        />
      )}
      
      <div className="flex">
        {user && (
          <Sidebar 
            currentPage={currentPage === 'auth' ? 'dashboard' : currentPage} 
            onNavigate={navigate} 
          />
        )}
        
        <main className={`flex-1 ${user ? 'pl-64 pt-16' : ''}`}>
          {renderPage()}
        </main>
      </div>
      
      <Toaster />
    </div>
  );
}