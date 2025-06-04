import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="page-container max-w-4xl mx-auto">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="bg-card border rounded-lg p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg mb-4">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Introduction</h2>
          <p>Welcome to Advanced Consulting Services ("ACS", "we", "us", or "our"). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, store, and protect your information when you visit our website, use our services, or interact with our platform. This policy also tells you about your privacy rights and how the law protects you.</p>
          <p>By using our services, you acknowledge that you have read and understood this Privacy Policy and agree to the collection and use of information in accordance with this policy.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Information We Collect</h2>
          <p>We collect several different types of information for various purposes to provide and improve our service to you:</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Personal Data</h3>
          <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li><strong>Identity Data:</strong> First name, last name, username, title, date of birth</li>
            <li><strong>Contact Data:</strong> Email address, telephone numbers, billing and delivery addresses</li>
            <li><strong>Financial Data:</strong> Bank account and payment card details (processed securely through third-party payment processors)</li>
            <li><strong>Transaction Data:</strong> Details about payments to and from you, donations made, campaigns supported</li>
            <li><strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone setting, operating system and platform</li>
            <li><strong>Profile Data:</strong> Username and password, preferences, interests, feedback and survey responses</li>
            <li><strong>Usage Data:</strong> Information about how you use our website, products and services</li>
            <li><strong>Marketing Data:</strong> Your preferences in receiving marketing from us and our third parties</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Automatically Collected Information</h3>
          <p>When you visit our website, we automatically collect certain information about your device and your interaction with our services:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>Log data (IP address, browser type, pages visited, time spent)</li>
            <li>Device information (device type, operating system, unique device identifiers)</li>
            <li>Location data (approximate location based on IP address)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">3. How We Use Your Information</h2>
          <p>We use the information we collect for various purposes, including:</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Service Provision</h3>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To process transactions and manage your account</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Communication</h3>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>To contact you about your account or transactions</li>
            <li>To send you technical notices, updates, security alerts and support messages</li>
            <li>To respond to your comments, questions and customer service requests</li>
            <li>To communicate with you about campaigns, services and events</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Marketing and Analytics</h3>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>To provide news, special offers and general information about services (with your consent)</li>
            <li>To monitor and analyze usage and trends to improve user experience</li>
            <li>To detect, prevent and address technical issues</li>
            <li>For research and analytics purposes</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Legal Basis for Processing</h2>
          <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li><strong>Performance of Contract:</strong> Where we need to perform the contract we are about to enter into or have entered into with you</li>
            <li><strong>Legitimate Interests:</strong> Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests</li>
            <li><strong>Legal Compliance:</strong> Where we need to comply with a legal or regulatory obligation</li>
            <li><strong>Consent:</strong> Where you have given clear consent for us to process your personal data for specific purposes</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Information Sharing and Disclosure</h2>
          <p>We may share your personal information in the following situations:</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">5.1 Service Providers</h3>
          <p>We may employ third-party companies and individuals to facilitate our Service, provide the Service on our behalf, perform Service-related services, or assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">5.2 Legal Requirements</h3>
          <p>We may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>Comply with a legal obligation</li>
            <li>Protect and defend the rights or property of ACS</li>
            <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
            <li>Protect the personal safety of users of the Service or the public</li>
            <li>Protect against legal liability</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">5.3 Business Transfers</h3>
          <p>If ACS is involved in a merger, acquisition, or asset sale, your Personal Data may be transferred. We will provide notice before your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Security</h2>
          <p>The security of your data is important to us. We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. These measures include:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>Encryption of data in transit and at rest</li>
            <li>Regular security assessments and audits</li>
            <li>Access controls and authentication measures</li>
            <li>Employee training on data protection</li>
            <li>Secure data storage and backup procedures</li>
          </ul>
          <p>However, remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">7. Data Retention</h2>
          <p>We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. To determine the appropriate retention period for personal data, we consider:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>The amount, nature, and sensitivity of the personal data</li>
            <li>The potential risk of harm from unauthorized use or disclosure</li>
            <li>The purposes for which we process your personal data</li>
            <li>Whether we can achieve those purposes through other means</li>
            <li>Applicable legal requirements</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">8. Your Privacy Rights</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data:</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">8.1 Access and Portability</h3>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li><strong>Right of Access:</strong> Request access to your personal data and certain information about our processing</li>
            <li><strong>Right to Data Portability:</strong> Request transfer of your personal data to you or a third party in a structured, commonly used format</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">8.2 Correction and Deletion</h3>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate personal data</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your personal data in certain circumstances</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">8.3 Processing Controls</h3>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li><strong>Right to Restrict Processing:</strong> Request restriction of processing of your personal data</li>
            <li><strong>Right to Object:</strong> Object to processing of your personal data in certain circumstances</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where we rely on consent to process your personal data</li>
          </ul>
          
          <p>If you wish to exercise any of these rights, please contact us using the information provided below. We may need to request specific information from you to help us confirm your identity and ensure your right to access your personal data.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">9. International Data Transfers</h2>
          <p>Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">10. Children's Privacy</h2>
          <p>Our Service is not intended for anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">11. Third-Party Services</h2>
          <p>Our Service may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">12. Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. For significant changes, we will provide more prominent notice (including, for certain services, email notification of privacy policy changes). You are advised to review this Privacy Policy periodically for any changes.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">13. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, your personal data, or would like to exercise your privacy rights, please contact us:</p>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p><strong>Advanced Consulting Services</strong></p>
            <p><strong>Data Protection Officer</strong></p>
            <p>Email: privacy@advancedconsulting.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Business District, Suite 456<br />
            Professional City, State 12345</p>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">14. Complaints</h2>
          <p>If you are not satisfied with our response to any complaint or believe our processing of your information does not comply with data protection law, you have the right to make a complaint to your local data protection authority. We would, however, appreciate the chance to deal with your concerns before you approach the regulator, so please contact us in the first instance.</p>
        </div>
      </div>
    </div>
  );
}
