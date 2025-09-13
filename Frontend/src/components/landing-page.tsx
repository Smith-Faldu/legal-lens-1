import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  Scale, 
  Shield, 
  FileText, 
  MessageSquare, 
  Zap, 
  Users, 
  ArrowRight, 
  Github, 
  ExternalLink,
  CheckCircle,
  Brain,
  Clock,
  Lock
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [activeNav, setActiveNav] = useState('');

  const scrollToSection = (sectionId: string) => {
    setActiveNav(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning algorithms analyze your legal documents for risks, obligations, and key terms in seconds.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Risk Assessment',
      description: 'Identify potential legal risks and get actionable recommendations to protect your interests and minimize exposure.'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Interactive Chat',
      description: 'Ask questions about your documents and get instant, intelligent responses from our AI legal assistant.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Time Saving',
      description: 'Reduce document review time from hours to minutes while maintaining accuracy and thoroughness.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Documents Analyzed' },
    { number: '95%', label: 'Accuracy Rate' },
    { number: '80%', label: 'Time Saved' },
    { number: '500+', label: 'Happy Users' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Legal Lens
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('features')}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  activeNav === 'features' ? 'text-blue-600' : 'text-muted-foreground'
                }`}
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  activeNav === 'about' ? 'text-blue-600' : 'text-muted-foreground'
                }`}
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('docs')}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  activeNav === 'docs' ? 'text-blue-600' : 'text-muted-foreground'
                }`}
              >
                Docs
              </button>
              <Button size="sm" onClick={onGetStarted}>
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button size="sm" onClick={onGetStarted}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950"></div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-foreground mb-2 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>Legal Lens</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
                AI-Powered Legal Assistant
              </span>
            </h1>
          </div>

          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in"
             style={{ animationDelay: '0.6s' }}>
            Revolutionize your legal document review with AI. Get instant insights, 
            risk assessments, and chat with your documents for faster, smarter legal decisions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => scrollToSection('features')}
              className="text-lg px-8 py-6 border-2 hover:bg-muted/50 transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto animate-fade-in">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to streamline your legal document workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                About Legal Lens
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Legal Lens transforms how legal professionals and businesses handle document review. 
                Our advanced AI technology processes complex legal documents in seconds, identifying 
                key risks, obligations, and opportunities that might take hours to find manually.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Built by legal experts and AI specialists, Legal Lens understands the nuances of 
                legal language and provides actionable insights that help you make better, faster decisions.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-base">Enterprise-grade security and privacy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-base">Support for 50+ document types</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-base">Real-time collaboration features</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-base">API integration capabilities</span>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <div className="text-2xl font-bold mb-2">Smart Analysis</div>
                    <div className="text-sm opacity-80">AI-powered document insights</div>
                  </div>
                  <div className="text-center">
                    <Lock className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <div className="text-2xl font-bold mb-2">Secure</div>
                    <div className="text-sm opacity-80">Bank-level encryption</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <div className="text-2xl font-bold mb-2">Collaborative</div>
                    <div className="text-sm opacity-80">Team-friendly workflows</div>
                  </div>
                  <div className="text-center">
                    <Zap className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <div className="text-2xl font-bold mb-2">Fast</div>
                    <div className="text-sm opacity-80">Results in seconds</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Docs Section */}
      <section id="docs" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of legal professionals who trust Legal Lens for their document analysis needs.
              Access our comprehensive documentation and API guides.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <Github className="w-8 h-8 text-foreground mb-2" />
                  <CardTitle>GitHub Repository</CardTitle>
                  <CardDescription>
                    Explore our open-source components and contribute to the project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" disabled>
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <FileText className="w-8 h-8 text-foreground mb-2" />
                  <CardTitle>API Documentation</CardTitle>
                  <CardDescription>
                    Complete API reference and integration guides for developers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" disabled>
                    <FileText className="w-4 h-4 mr-2" />
                    Read the Docs
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="text-lg px-12 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Start Analyzing Documents
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Legal Lens
              </span>
            </div>

            <div className="text-center md:text-right">
              <p className="text-muted-foreground mb-2">
                © 2024 Legal Lens. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground">
                Made with ❤️ by the Legal Lens Team
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}