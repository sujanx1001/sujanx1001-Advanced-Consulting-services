
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TermsOfService() {
  const navigate = useNavigate();

  return (
    <div className="page-container max-w-4xl mx-auto">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="bg-card border rounded-lg p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-4">Last Updated: May 3, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using the Social Impact Platform, you accept and agree to be bound by the terms and provision of this agreement. Additionally, when using the platform's particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
          <p>Social Impact Platform provides users with access to a rich collection of resources, including various communication tools, forums, and personalized content (the "Service"). The Service is made available to you by Social Impact Platform.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Conduct</h2>
          <p>You agree to use the Service for lawful purposes only and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the platform. Prohibited behavior includes:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>Conduct which is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically or otherwise objectionable.</li>
            <li>Impersonating any person or entity, or falsely stating or otherwise misrepresenting your affiliation with a person or entity.</li>
            <li>Posting or transmitting any content that you do not have a right to make available or that infringes any patent, trademark, trade secret, copyright or other proprietary rights of any party.</li>
            <li>Posting, publishing, or transmitting any unsolicited advertising, promotional materials, junk mail, spam, or any other form of solicitation.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Donations</h2>
          <p>Social Impact Platform facilitates donations to various campaigns. By making a donation, you agree to the following:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>All donations are final and non-refundable.</li>
            <li>Social Impact Platform takes a small percentage of each donation to maintain the platform.</li>
            <li>You represent and warrant that any credit/debit card or bank information you provide is accurate.</li>
            <li>You acknowledge that you are the authorized holder of any payment method used.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitation of Liability</h2>
          <p>You expressly understand and agree that Social Impact Platform shall not be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses resulting from the use or the inability to use the service.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Changes to Terms</h2>
          <p>Social Impact Platform reserves the right, at its sole discretion, to modify or replace these Terms at any time. It is your responsibility to check these Terms periodically for changes. Your continued use of the Service following the posting of any changes constitutes acceptance of those changes.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Contact</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p className="mt-2">Email: terms@socialimpact.example.com</p>
        </div>
      </div>
    </div>
  );
}
