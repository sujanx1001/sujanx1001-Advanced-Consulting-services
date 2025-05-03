
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
          <p className="text-lg mb-4">Last Updated: May 3, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. What are Cookies</h2>
          <p>Cookies are small text files that are placed on your computer or mobile device when you browse websites. They are widely used in order to make websites work more efficiently, as well as to provide information to the owners of the site.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Cookies</h2>
          <p>Our website uses cookies to distinguish you from other users of our website. This helps us provide you with a good experience when you browse our website and also allows us to improve our site. By continuing to browse the site, you are agreeing to our use of cookies.</p>
          <p>We use the following types of cookies:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li><strong>Strictly necessary cookies.</strong> These are cookies that are required for the operation of our website.</li>
            <li><strong>Analytical/performance cookies.</strong> They allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.</li>
            <li><strong>Functionality cookies.</strong> These are used to recognize you when you return to our website.</li>
            <li><strong>Targeting cookies.</strong> These cookies record your visit to our website, the pages you have visited and the links you have followed.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Third Party Cookies</h2>
          <p>We also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>This site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience.</li>
            <li>We also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways. For these to work, social media sites including Facebook, Twitter, Instagram will set cookies through our site which may be used to enhance your profile on their site or contribute to the data they hold for various purposes outlined in their respective privacy policies.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Managing Cookies</h2>
          <p>Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org/" className="text-cause hover:underline">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org/" className="text-cause hover:underline">www.allaboutcookies.org</a>.</p>
          <p>To opt out of being tracked by Google Analytics across all websites, visit <a href="https://tools.google.com/dlpage/gaoptout" className="text-cause hover:underline">https://tools.google.com/dlpage/gaoptout</a>.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Changes to Our Cookie Policy</h2>
          <p>Any changes we may make to our cookie policy in the future will be posted on this page. Please check back frequently to see any updates or changes to our cookie policy.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact</h2>
          <p>If you have any questions about our cookies policy, please contact us at:</p>
          <p className="mt-2">Email: cookies@socialimpact.example.com</p>
        </div>
      </div>
    </div>
  );
}
