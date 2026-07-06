import { Link } from "react-router-dom";
import { FaFacebookF, FaTelegramPlane, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  const aboutLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
  ];

  const supportLinks = [
    { name: "Contact Me", path: "/contact" },
    { name: "FAQ", path: "/faq" },
    
  ];

  const socialLinks = [
    { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61591665988480&mibextid=ZbWKwL", icon: <FaFacebookF /> },
    // { name: "Instagram", href: "https://instagram.com", icon: <FaInstagram /> },
    // { name: "TikTok", href: "https://tiktok.com", icon: <SiTiktok /> },
    { name: "Telegram", href: "https://t.me/mezmur_tech", icon: <FaTelegramPlane /> },
    // { name: "YouTube", href: "https://youtube.com", icon: <FaYoutube /> },
    // { name: "X", href: "https://x.com", icon: <FaTwitter /> },
    { name: "Linkedin", href: "https://www.linkedin.com/in/mezmur-esmelalem-231860416", icon: <FaLinkedin /> },
    { name: "Github", href: "https://github.com/MezmurEsmelalem", icon: <FaGithub /> },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 relative">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* About me Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">About Us</h3>
          <ul className="space-y-2 text-sm">
            {aboutLinks.map(link => (
              <li key={link.name}>
                <Link to={link.path} className="hover:text-white transition">{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Support</h3>
          <ul className="space-y-2 text-sm">
            {supportLinks.map(link => (
              <li key={link.name}>
                <Link to={link.path} className="hover:text-white transition">{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* My Socials Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">My Socials</h3>
          <ul className="flex gap-4 items-center text-xl">
            {socialLinks.map(link => (
              <li key={link.name}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition"
                >
                  <span className="text-gray-300 hover:text-blue-500 transition">
                    {link.icon}
                  </span>
                  {/* <span className="text-sm">{link.name}</span> */}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-6"></div>

      {/* Bottom section */}
      <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-center">
        &copy; {new Date().getFullYear()} Mezmur Tech. All rights reserved.
      </div>
    </footer>
  );
}
