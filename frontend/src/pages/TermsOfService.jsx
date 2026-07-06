import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

function TermsOfService() {
  return (
    <div className="max-w-5xl my-1 mx-auto px-6 py-12 bg-teal-200">

      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-3">
          Terms of Service
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

        <p>Welcome to <strong>Mezmur Tech</strong>. These Terms of Service govern your use of this website. By accessing or using this website, you agree to comply with these terms. If you do not agree with any part of these Terms, please discontinue using the website.</p>
      </section>

      {/* Website Purpose */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Website Purpose
        </h2>

        <p>Mezmur Tech is a personal website designed to showcase software development projects, technical skills, blog articles, and professional services. Visitors may browse the content, download the resume, view project demonstrations, and contact the owner for collaboration or freelance opportunities.</p>
      </section>

      {/* Acceptable Use */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Acceptable Use
        </h2>
        <p className="mb-2">You agree to use this website responsibly and only for lawful purposes. You must not:</p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Attempt to gain unauthorized access to the website or server.</li>
          <li>Disrupt or interfere with the operation of the website.</li>
          <li>Copy, reproduce, or redistribute website content without permission.</li>
          <li>Use the website for fraudulent, abusive, or illegal activities.</li>
        </ul>
      </section>

      {/* Intellectual Property */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Intellectual Property
        </h2>

        <p>Unless otherwise stated, all original content on this website-including source code samples, articles, graphics, logos, designs, portfolio content, and documentation-is the intellectual property of Mezmur Tech and is protected under applicable copyright laws.</p>
      </section>

      {/* Portfolio Projects */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Portfolio Projects
        </h2>

        <p>Projects displayed on this website may include personal, academic, freelance, or demonstration projects. Some client work may omit confidential information or proprietary source code.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Third-Party Links
        </h2>

        <p>This website may contain links to external websites, including GitHub, LinkedIn, or live project demonstrations. Mezmur Tech is not responsible for the content, security, availability, or privacy practices of these third-party websites.</p>
      </section>

      {/* Freelance Services */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Freelance Services
        </h2>

        <p>Information regarding software development services is provided for informational purposes. Any freelance engagement, pricing, project scope, timelines, and deliverables will be governed by a separate agreement between Mezmur Tech and the client.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Service Refund Policy
        </h2>

        <ol className="list-decimal pl-6 space-y-5">
          <li>
            <h3 className="font-semibold text-lg">Full Refund</h3>
            <p>Available if the client cancels before development work has started.</p>
          </li>

          <li>
            <h3 className="font-semibold text-lg">Partial Refund</h3>
            <p>
              May be available if the project is canceled after work has begun but before
              major deliverables are completed. The refunded amount is determined based
              on the work already completed.
            </p>
          </li>

          <li>
            <h3 className="font-semibold text-lg">No Refund</h3>
            <p>
              After the final deliverable has been approved and delivered to the client.
            </p>
          </li>
        </ol>
      </section>

      {/* Disclaimer */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Disclaimer
        </h2>

        <p>The information presented on this website is provided in good faith. While reasonable efforts are made to keep the content accurate and up to date, no guarantees are made regarding its completeness, accuracy, or reliability.</p>
      </section>

      {/* Limitation of Liability */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Limitation of Liability
        </h2>

        <p>Mezmur Tech shall not be liable for any direct or indirect damages resulting from the use of this website or reliance on its content.</p>
      </section>

      {/* Changes */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">
          Changes to These Terms
        </h2>

        <p>These Terms of Service may be updated from time to time. Changes become effective immediately after they are published on this page.</p>
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

export default TermsOfService;