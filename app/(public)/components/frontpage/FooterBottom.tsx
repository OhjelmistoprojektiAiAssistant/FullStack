'use client';
import React from 'react';
import Link from 'next/link';

export default function FooterBottom() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-violet-400 mb-4">AI Career Assistant</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Land your dream job with AI-powered applications. Create tailored job applications in minutes, not hours.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/newApplication" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  New Application
                </Link>
              </li>
              <li>
                <Link href="/drafts" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Drafts
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-white mb-4">Get in Touch</h4>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">
                📧 support@aicareerassistant.com
              </p>
              <p className="text-gray-400 text-sm">
                🌐 www.aicareerassistant.com
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 AI Career Assistant. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Made with ❤️ for job seekers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}