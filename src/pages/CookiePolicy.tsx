import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CookiePolicy() {
  const navigate = useNavigate();

  return (
    <div className="page-container max-w-4xl mx-auto">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="bg-card border rounded-lg p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>This Cookie Policy explains how Advanced Consulting Services ("ACS", "we", "us", or "our") uses cookies and similar tracking technologies when you visit our website or use our services. This policy explains what these technologies are, why we use them, and your rights to control our use of them.</p>
          <p>By continuing to use our website, you consent to our use of cookies as described in this policy.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. What are Cookies</h2>
          <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners about how their site is being used.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Types of Cookies</h3>
          <p>Cookies can be classified in several ways:</p>
          
          <h4 className="text-lg font-semibold mt-4 mb-2">By Duration:</h4>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser</li>
            <li><strong>Persistent Cookies:</strong> Cookies that remain on your device for a specified period or until you delete them</li>
          </ul>
          
          <h4 className="text-lg font-semibold mt-4 mb-2">By Source:</h4>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li><strong>First-Party Cookies:</strong> Set directly by our website</li>
            <li><strong>Third-Party Cookies:</strong> Set by external services we use on our website</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Cookies</h2>
          <p>We use cookies for several reasons. Some cookies are required for technical reasons for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our website.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Essential Cookies</h3>
          <p>These cookies are strictly necessary to provide you with services available through our website and to use some of its features:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li><strong>Authentication:</strong> To remember you when you log in and keep you logged in</li>
            <li><strong>Security:</strong> To protect against fraudulent activity and enhance security</li>
            <li><strong>Site Functionality:</strong> To remember your preferences and settings</li>
            <li><strong>Load Balancing:</strong> To distribute website traffic efficiently</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Performance and Analytics Cookies</h3>
          <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li><strong>Google Analytics:</strong> To understand website usage patterns and improve user experience</li>
            <li><strong>Page Performance:</strong> To monitor website speed and performance</li>
            <li><strong>Error Tracking:</strong> To identify and fix technical issues</li>
            <li><strong>A/B Testing:</strong> To test different versions of pages and features</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Functionality Cookies</h3>
          <p>These cookies allow our website to remember choices you make and provide enhanced, more personal features:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li><strong>Language Preferences:</strong> To remember your language settings</li>
            <li><strong>Theme Preferences:</strong> To remember if you prefer dark or light mode</li>
            <li><strong>Form Data:</strong> To remember information you've entered in forms</li>
            <li><strong>Customization:</strong> To remember your layout and display preferences</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Third Party Cookies</h2>
          <p>We also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li><strong>Google Analytics:</strong> We use Google Analytics which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience.</li>
            <li><strong>Social Media:</strong> We use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways. For these to work, social media sites including Facebook, Twitter, Instagram will set cookies through our site.</li>
            <li><strong>Payment Processing:</strong> We use secure third-party payment processors like Stripe and PayPal which may set cookies for fraud prevention and security.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Managing Cookies</h2>
          <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org/" className="text-cause hover:underline">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org/" className="text-cause hover:underline">www.allaboutcookies.org</a>.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">5.1 Browser Controls</h3>
          <p>You can control cookies through your browser settings:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li><strong>Chrome:</strong> Settings {' > '} Privacy and security {' > '} Cookies and other site data</li>
            <li><strong>Firefox:</strong> Options {' > '} Privacy & Security {' > '} Cookies and Site Data</li>
            <li><strong>Safari:</strong> Preferences {' > '} Privacy {' > '} Cookies and website data</li>
            <li><strong>Edge:</strong> Settings {' > '} Site permissions {' > '} Cookies and site data</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">5.2 Opt-Out Options</h3>
          <p>To opt out of being tracked by Google Analytics across all websites, visit <a href="https://tools.google.com/dlpage/gaoptout" className="text-cause hover:underline">https://tools.google.com/dlpage/gaoptout</a>.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to Our Cookie Policy</h2>
          <p>Any changes we may make to our cookie policy in the future will be posted on this page. Please check back frequently to see any updates or changes to our cookie policy.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact</h2>
          <p>If you have any questions about our cookies policy, please contact us:</p>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p><strong>Advanced Consulting Services</strong></p>
            <p>Email: privacy@advancedconsulting.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Business District, Suite 456<br />
            Professional City, State 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
}
