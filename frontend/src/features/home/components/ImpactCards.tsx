import { Card } from '../../../components/ui/Card';

interface ImpactCard {
  title: string;
  description: string;
  icon: string;
}

const impactData: ImpactCard[] = [
  {
    title: 'Digital Slide Learning',
    description:
      'Access high-quality digital pathology slides and learn microscopic examination techniques from expert faculty.',
    icon: '🔬',
  },
  {
    title: 'Expert-Led Sessions',
    description:
      'Interactive live sessions conducted by renowned pathologists from AIIMS, sharing their expertise and insights.',
    icon: '👨‍⚕️',
  },
  {
    title: 'National Reach',
    description:
      'Bridging the gap between premier institutions and medical colleges across India, democratizing pathology education.',
    icon: '🌏',
  },
];

export function ImpactCards() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why This Matters</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transforming pathology education through technology and expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impactData.map((impact, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">{impact.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{impact.title}</h3>
              <p className="text-gray-600">{impact.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
