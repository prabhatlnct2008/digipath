import { Card } from '../../components/ui/Card';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2c5282] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100">
            Get in touch with the AIIMS Telepathology Teaching Initiative
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Department Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Department</h3>
                <p className="text-gray-700">Department of Pathology</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Institution</h3>
                <p className="text-gray-700">
                  All India Institute of Medical Sciences (AIIMS)
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                <p className="text-gray-700">
                  Ansari Nagar, New Delhi - 110029
                  <br />
                  India
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                <a
                  href="mailto:pathology.telepathology@aiims.edu"
                  className="text-primary-600 hover:text-primary-700"
                >
                  pathology.telepathology@aiims.edu
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                <p className="text-gray-700">+91-11-2658 8500</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Office Hours</h3>
                <p className="text-gray-700">
                  Monday - Friday: 9:00 AM - 5:00 PM IST
                  <br />
                  (Excluding public holidays)
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">General Inquiries</h2>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              For questions about upcoming sessions, technical support, or general information
              about the AIIMS Telepathology Teaching Initiative, please reach out to us via email
              or phone during office hours.
            </p>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Session Information</h3>
              <p className="leading-relaxed">
                All upcoming sessions are listed on the Sessions page. Session details including
                meeting links are sent to registered participants via email prior to each session.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Technical Support</h3>
              <p className="leading-relaxed">
                If you experience technical difficulties during a live session, please contact our
                technical support team at the email address provided above. We recommend testing
                your connection before each session.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Institutional Partnerships</h3>
              <p className="leading-relaxed">
                Medical institutions interested in formal partnerships or group participation can
                contact the Department of Pathology directly to discuss collaboration
                opportunities.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
