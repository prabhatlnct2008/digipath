import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

export function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary-400/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-24 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <div className="text-center lg:text-left animate-fade-in">
            {/* Eyebrow text */}
            <p className="text-primary-200 text-sm font-medium tracking-wider uppercase mb-4 animate-slide-up">
              AIIMS Department of Pathology
            </p>

            {/* Hero title */}
            <h1 className="text-hero text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Telepathology Teaching Initiative
            </h1>

            {/* Subheading */}
            <p className="text-xl text-primary-100 mb-4 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Advancing pathology education through digital slide learning and expert-led sessions.
            </p>

            {/* Supporting line */}
            <p className="text-primary-200 mb-8 max-w-lg mx-auto lg:mx-0">
              Bringing world-class pathology teaching to medical institutions across India.
            </p>

            {/* CTA Buttons - staggered animation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/sessions" className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto bg-white text-primary-600 hover:bg-gray-50 shadow-lg hover:shadow-xl"
                  rightIcon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  }
                >
                  View Upcoming Sessions
                </Button>
              </Link>
              <Link to="/recordings" className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-white/50 text-white hover:bg-white/10 hover:border-white"
                >
                  Browse Recordings
                </Button>
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-10 pt-8 border-t border-white/10">
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-white">500+</p>
                <p className="text-sm text-primary-200">Sessions Conducted</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-white">50+</p>
                <p className="text-sm text-primary-200">Expert Faculty</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-3xl font-bold text-white">100+</p>
                <p className="text-sm text-primary-200">Partner Institutions</p>
              </div>
            </div>
          </div>

          {/* Image/Illustration Column */}
          <div className="hidden lg:block relative animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="relative">
              {/* Main illustration placeholder - microscope/pathology themed */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-white/20 to-transparent flex items-center justify-center">
                  <svg className="w-48 h-48 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>

              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-status-success-light rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-status-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Live Now</p>
                    <p className="text-xs text-text-muted">Session in progress</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">HD Recordings</p>
                    <p className="text-xs text-text-muted">Watch anytime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
