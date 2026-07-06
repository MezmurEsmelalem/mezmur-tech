import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

function PrivacyPolicy() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 my-1 bg-teal-200">

      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">
          Privacy Policy
        </h1>

        <p className="text-blue-600 italic font-semibold">
          Effective Date: July 3, 2026
        </p>
      </div>

      {/* Introduction */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Introduction
        </h2>

        <p>
          <strong>Mezmur Tech</strong> respects your privacy and is committed to protecting any personal information you provide while using this website.
        </p>
      </section>

      {/* Information We Collect */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Information We Collect
        </h2>
        <p className="mb-2">Depending on how you interact with the website, we may collect:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Name</li>
          <li>Email Address</li>
          <li>Phone Number(if provided)</li>
          <li>Messages submitted through the contact form</li>
          <li>Browser type</li>
          <li>Device information</li>
          <li>IP address</li>
          <li>Website usage statistics</li>
        </ul>
      </section>

      {/* How We Use Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          How We Use Your Information
        </h2>

        <p className="mb-2">The information collected may be used to:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Respond to inquiries submitted through the contact form.</li>
          <li>Communicate regarding freelance opportunities or collaborations.</li>
          <li>Improve website functionality and user experience.</li>
          <li>Maintain website security.</li>   
        </ul>
          <p className="mt-2">We do not sell, rent, or trade your personal information.</p>
      </section>

      {/* Contact Form */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Contact Form
        </h2>

        <p>Information submitted through the contact form is stored securely and used solely for responding to your inquiry or request.</p>
      </section>

{/* Contact Form */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
         Resume Download        
         </h2>
      
 <p>Visitors may download the resume provided on this website. Downloading the resume does not require visitors to submit personal information.</p>
      </section>


      {/* Cookies */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Cookies
        </h2>

        <p>This website may use cookies or similar technologies to improve browsing experience and analyze website usage. You may disable cookies through your browser settings if you prefer.</p>
      </section>

      {/* Third-Party Links */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Third-Party Links
        </h2>

        <p>This website may contain links to external services such as GitHub, LinkedIn, and live project demonstrations. These websites maintain their own privacy policies, and Mezmur Tech is not responsible for their practices.</p>
      </section>

      {/* Security */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Data Security
        </h2>

        <p>Reasonable technical and organizational measures are implemented to help protect collected information. However, no method of transmission over the Internet can be guaranteed to be completely secure.</p>
      </section>

       <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Your Rights
        </h2>

        <p className="mb-2">You may request to:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Access the personal information you have submitted.</li>
          <li>Correct inaccurate information.</li>
          <li>Request deletion of information submitted through the contact form, where applicable.</li>  
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Changes to This Policy
        </h2>

        <p>This Privacy Policy may be updated periodically. Any revisions will be posted on this page with an updated effective date.</p>
      </section>

      {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold mb-3">
                Contact
              </h2>
      
              <p>If you have any questions regarding these Terms of Service, please contact:</p>
              <div className="flex flex-col items-center justify-center gap-2 mb-1 mt-5">
              <Link
                to="/contact"
                className=""
              >
              <button
                  
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 hover:underline rounded-lg duration-200 text-blue-700 font-semibold mb-1"
                >
                  Make Contact
                </button>
                </Link>
                <div className="flex gap-1 bg-gray-100 items-center justify-center hover:underline mx-8 mt-8 px-2 py-2 rounded-lg w-32 font-semibold text-blue-500">
                
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=mezmurbusiness@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200 rounded"
                ><FaEnvelope/></a>
      
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=mezmurbusiness@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-200 rounded"
                >
                  Email Me
                  
                </a>
                
                </div>
                </div>
            </section>
    </div>
  );
}

export default PrivacyPolicy;