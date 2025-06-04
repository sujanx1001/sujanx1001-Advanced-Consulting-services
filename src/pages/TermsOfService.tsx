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
          <p className="text-lg mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using the Advanced Consulting Services platform ("ACS", "we", "us", or "our"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service. Additionally, when using our particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
          <p>Advanced Consulting Services provides a platform that connects businesses with charitable campaigns and social impact initiatives. Our services include:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>Campaign creation and management tools</li>
            <li>Business promotion and networking opportunities</li>
            <li>Consulting services for business growth and sustainability</li>
            <li>Social impact measurement and reporting</li>
            <li>Community engagement and collaboration features</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts and Registration</h2>
          <p>To access certain features of our platform, you must register for an account. You agree to:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>Provide accurate, current, and complete information during registration</li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the security of your password and account</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Conduct</h2>
          <p>You agree to use the Service for lawful purposes only and in a way that does not infringe the rights of others. Prohibited behavior includes:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>Conduct which is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically or otherwise objectionable</li>
            <li>Impersonating any person or entity, or falsely stating or misrepresenting your affiliation</li>
            <li>Posting content that infringes any intellectual property rights</li>
            <li>Transmitting spam, advertising, or unsolicited promotional materials</li>
            <li>Attempting to gain unauthorized access to the platform or other users' accounts</li>
            <li>Using the platform for fraudulent activities or misrepresenting campaigns</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Campaigns and Donations</h2>
          <p>By creating a campaign or making a donation through our platform, you agree to the following:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>All campaign information must be accurate and truthful</li>
            <li>Campaign creators are responsible for fulfilling their stated objectives</li>
            <li>Donations are voluntary contributions and may be subject to processing fees</li>
            <li>ACS may take a small percentage of donations to maintain and improve the platform</li>
            <li>Refund policies are subject to individual campaign terms and applicable laws</li>
            <li>Campaign creators must provide regular updates on progress and fund usage</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Consulting Services</h2>
          <p>When engaging our consulting services, additional terms apply:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>Consulting agreements will be provided separately for each engagement</li>
            <li>Payment terms will be specified in individual service agreements</li>
            <li>Confidentiality agreements may apply to protect sensitive business information</li>
            <li>Results are not guaranteed, though we commit to professional best practices</li>
            <li>Client cooperation is required for successful engagement outcomes</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Intellectual Property Rights</h2>
          <p>The ACS platform and its original content, features, and functionality are owned by Advanced Consulting Services and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You retain rights to content you create, but grant us a license to use, display, and distribute such content on our platform.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Privacy and Data Protection</h2>
          <p>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Service. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.</p>
          
          <h2 className="text-2xl font-semibond mt-8 mb-4">9. Payment and Billing</h2>
          <p>For paid services:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>All fees are stated in USD unless otherwise specified</li>
            <li>Payment is due upon invoice unless other terms are agreed</li>
            <li>Late payments may incur additional fees</li>
            <li>We reserve the right to suspend services for non-payment</li>
            <li>Refunds are subject to our refund policy and applicable laws</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Limitation of Liability</h2>
          <p>You expressly understand and agree that Advanced Consulting Services shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses resulting from:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>The use or inability to use the service</li>
            <li>Unauthorized access to or alteration of your transmissions or data</li>
            <li>Statements or conduct of any third party on the service</li>
            <li>Any other matter relating to the service</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Indemnification</h2>
          <p>You agree to defend, indemnify, and hold harmless ACS and its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your access to or use of the Service.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Termination</h2>
          <p>We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">13. Governing Law</h2>
          <p>These Terms shall be interpreted and governed by the laws of the jurisdiction in which Advanced Consulting Services operates, without regard to its conflict of law provisions. Any disputes arising from these terms will be resolved through binding arbitration or in the courts of competent jurisdiction.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">14. Changes to Terms</h2>
          <p>Advanced Consulting Services reserves the right, at its sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. Your continued use of the Service following the posting of any changes constitutes acceptance of those changes.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">15. Contact Information</h2>
          <p>If you have any questions about these Terms of Service, please contact us at:</p>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p><strong>Advanced Consulting Services</strong></p>
            <p>Email: legal@advancedconsulting.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Business District, Suite 456<br />
            Professional City, State 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
}
