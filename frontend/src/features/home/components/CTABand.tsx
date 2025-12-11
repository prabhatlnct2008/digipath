import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

export function CTABand() {
  return (
    <section className="bg-blue-600 text-white py-16 lg:py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Heading */}
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          Ready to expand your pathology knowledge?
        </h2>

        {/* Supporting text */}
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          Join our community of learners and access expert-led teaching sessions from AIIMS faculty
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/sessions">
            <Button
              size="lg"
              className="
                w-full sm:w-auto
                bg-white text-blue-600
                hover:bg-gray-100 hover:text-blue-700
                shadow-lg hover:shadow-xl
                transition-all duration-200
              "
              rightIcon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            >
              Find a Session
            </Button>
          </Link>
          <Link to="/recordings">
            <Button
              size="lg"
              variant="outline"
              className="
                w-full sm:w-auto
                border-2 border-white/50 text-white
                hover:bg-white/10 hover:border-white
              "
            >
              Browse Recordings
            </Button>
          </Link>
        </div>

        {/* Additional info */}
        <p className="mt-8 text-sm text-blue-200">
          Free access for all medical professionals and students
        </p>
      </div>
    </section>
  );
}
