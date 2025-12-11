import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

export function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2c5282] text-white">
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            AIIMS Telepathology Teaching Initiative
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Advancing pathology education through digital slide learning and expert-led sessions,
            bringing world-class teaching to institutions across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sessions">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto shadow-md"
              >
                View Upcoming Sessions
              </Button>
            </Link>
            <Link to="/recordings">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10 w-full sm:w-auto shadow-md"
              >
                Browse Recordings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
