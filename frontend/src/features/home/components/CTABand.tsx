import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';

export function CTABand() {
  return (
    <div className="bg-[#1e3a5f] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to expand your pathology knowledge?</h2>
        <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
          Join our community of learners and access expert-led teaching sessions
        </p>
        <Link to="/sessions">
          <Button
            size="lg"
            className="bg-white text-[#1e3a5f] hover:bg-gray-100"
          >
            Find a Session
          </Button>
        </Link>
      </div>
    </div>
  );
}
