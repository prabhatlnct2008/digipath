import { Card } from '../../components/ui/Card';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2c5282] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            AIIMS Telepathology Teaching Initiative
          </h1>
          <p className="text-xl text-blue-100">
            Transforming pathology education through digital innovation
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="mb-12">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The AIIMS Telepathology Teaching Initiative was established to bridge the gap in
              pathology education across India. By leveraging digital slide technology and
              telepathology platforms, we aim to democratize access to world-class pathology
              teaching from expert faculty at AIIMS.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is to provide comprehensive, interactive, and accessible pathology
              education to medical students, residents, and practicing pathologists across the
              country, regardless of their geographical location.
            </p>
          </Card>
        </section>

        <section className="mb-12">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Faculty Leadership</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Our teaching sessions are conducted by renowned pathologists from the All India
              Institute of Medical Sciences (AIIMS), New Delhi. Each faculty member brings decades
              of experience in diagnostic pathology, teaching, and research.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              The initiative is led by the Department of Pathology at AIIMS, with contributions
              from faculty members specializing in various sub-disciplines including surgical
              pathology, cytopathology, hematopathology, and molecular pathology.
            </p>
          </Card>
        </section>

        <section className="mb-12">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Teaching Philosophy</h2>
            <div className="space-y-4 text-lg text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Interactive Learning
                </h3>
                <p className="leading-relaxed">
                  Our sessions emphasize interactive discussion and case-based learning, allowing
                  participants to engage directly with expert faculty and explore digital slides
                  in real-time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Digital Slide Technology
                </h3>
                <p className="leading-relaxed">
                  We utilize high-resolution whole slide imaging technology, enabling participants
                  to examine pathology slides with the same detail as traditional microscopy.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Structured Curriculum
                </h3>
                <p className="leading-relaxed">
                  Sessions are organized by organ system, pathology type, and difficulty level,
                  ensuring a systematic approach to learning that caters to learners at different
                  stages of training.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Continuous Access
                </h3>
                <p className="leading-relaxed">
                  All sessions are recorded and made available in our library, allowing learners
                  to revisit concepts and continue their education at their own pace.
                </p>
              </div>
            </div>
          </Card>
        </section>

        <section className="mb-12">
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">National Reach</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Since its inception, the AIIMS Telepathology Teaching Initiative has reached medical
              institutions across India, from metropolitan teaching hospitals to smaller medical
              colleges in rural areas.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              By eliminating geographical barriers, we've enabled pathology educators and learners
              from diverse settings to participate in the same high-quality educational
              experiences, fostering a national community of pathology practitioners.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our initiative continues to grow, with plans to expand into specialized topics,
              collaborative case discussions, and continuing medical education programs for
              practicing pathologists.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}
