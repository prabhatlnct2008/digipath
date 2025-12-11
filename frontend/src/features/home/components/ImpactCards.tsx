import React from 'react';

interface ImpactCardData {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const impactData: ImpactCardData[] = [
  {
    title: 'Digital Slide Learning',
    description:
      'Access high-quality digital pathology slides and learn microscopic examination techniques from expert faculty.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
      </svg>
    ),
  },
  {
    title: 'Expert-Led Sessions',
    description:
      'Interactive live sessions conducted by renowned pathologists from AIIMS, sharing their expertise and insights.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'National Reach',
    description:
      'Bridging the gap between premier institutions and medical colleges across India, democratizing pathology education.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function ImpactCards() {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why This Initiative Matters
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transforming pathology education through technology, expertise, and accessibility
          </p>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {impactData.map((impact, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-200
                hover:-translate-y-1 hover:shadow-lg hover:border-blue-200
                transition-all duration-200
                focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6
                text-blue-500 group-hover:scale-105 transition-transform duration-200">
                {impact.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3
                group-hover:text-blue-600 transition-colors duration-150">
                {impact.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {impact.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
