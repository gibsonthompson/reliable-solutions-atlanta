// app/privacy-policy/page.js

export const metadata = {
  title: 'Privacy Policy | Reliable Solutions Atlanta',
  description: 'Privacy Policy for Reliable Solutions Atlanta. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://www.waterhelpme.com/privacy-policy',
  },
};

export default function PrivacyPolicy() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative bg-gradient-to-br from-[#0c1e3a] via-[#273373] to-[#115997] py-16 text-center">
        <h1 className="font-display text-white text-3xl md:text-4xl lg:text-5xl font-black mb-3">
          Privacy Policy
        </h1>
        <p className="text-white/60 text-base font-medium">
          How we collect, use, and protect your information
        </p>
      </section>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-16">
        <span className="inline-block bg-[#115997] text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider mb-8">
          Effective Date: May 8, 2026
        </span>

        <p className="mb-4 text-[15px] leading-7 text-[#2d2d2d]">
          Reliable Solutions Atlanta LLC (&quot;RSA,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website{' '}
          <a href="https://www.waterhelpme.com" className="text-[#115997] underline underline-offset-2 hover:text-[#273373]">
            waterhelpme.com
          </a>
          . This Privacy Policy describes how we collect, use, disclose, and protect the personal information of visitors to our website and users of our services, including individuals who interact with our advertising on third-party platforms such as Facebook and Instagram (Meta Platforms).
        </p>

        <p className="mb-4 text-[15px] leading-7 text-[#2d2d2d]">
          By using our website or submitting your information through any of our forms, advertisements, or lead generation tools, you agree to the practices described in this policy.
        </p>

        {/* Section 1 */}
        <h2 className="font-display text-xl font-bold text-[#273373] mt-10 mb-4 pb-2 border-b-2 border-gray-200">
          1. Information We Collect
        </h2>
        <p className="mb-3 text-[15px] leading-7 text-[#2d2d2d]">
          We may collect the following types of personal information:
        </p>
        <ul className="list-disc ml-6 mb-4 text-[15px] leading-7 text-[#2d2d2d] marker:text-[#115997]">
          <li className="mb-1.5">
            <strong>Contact Information:</strong> Name, email address, phone number, and property address provided through our website contact form, lead forms, or phone calls.
          </li>
          <li className="mb-1.5">
            <strong>Service Information:</strong> The type of service you are requesting (e.g., basement waterproofing, crawl space encapsulation, foundation repair, drainage) and how you heard about us.
          </li>
          <li className="mb-1.5">
            <strong>Device and Usage Data:</strong> IP address, browser type, operating system, pages visited, time spent on pages, referring URLs, and other standard web analytics data collected automatically when you visit our website.
          </li>
          <li className="mb-1.5">
            <strong>Advertising Data:</strong> Information collected through Meta Pixel (Facebook Pixel) and similar tracking technologies, including page views, button clicks, form submissions, and other interactions used to measure advertising effectiveness and deliver relevant ads.
          </li>
          <li className="mb-1.5">
            <strong>Communication Records:</strong> Records of phone calls, text messages, and emails exchanged between you and RSA in the course of providing our services.
          </li>
        </ul>

        {/* Section 2 */}
        <h2 className="font-display text-xl font-bold text-[#273373] mt-10 mb-4 pb-2 border-b-2 border-gray-200">
          2. How We Collect Information
        </h2>
        <p className="mb-3 text-[15px] leading-7 text-[#2d2d2d]">
          We collect personal information through the following methods:
        </p>
        <ul className="list-disc ml-6 mb-4 text-[15px] leading-7 text-[#2d2d2d] marker:text-[#115997]">
          <li className="mb-1.5">
            <strong>Website Forms:</strong> When you submit a request for a free estimate or contact us through our website.
          </li>
          <li className="mb-1.5">
            <strong>Meta Lead Forms (Instant Forms):</strong> When you submit your contact information through a lead generation ad on Facebook or Instagram. These forms may pre-populate fields using information from your Meta profile.
          </li>
          <li className="mb-1.5">
            <strong>Cookies and Tracking Technologies:</strong> We use the Meta Pixel and similar tools to collect data about how visitors interact with our website after viewing or clicking on our advertisements.
          </li>
          <li className="mb-1.5">
            <strong>Phone and SMS:</strong> When you call our business number or receive text messages related to appointment scheduling and service updates.
          </li>
          <li className="mb-1.5">
            <strong>Third-Party Platforms:</strong> We may receive information from advertising platforms (Meta, Google), review platforms, and referral sources.
          </li>
        </ul>

        {/* Section 3 */}
        <h2 className="font-display text-xl font-bold text-[#273373] mt-10 mb-4 pb-2 border-b-2 border-gray-200">
          3. How We Use Your Information
        </h2>
        <p className="mb-3 text-[15px] leading-7 text-[#2d2d2d]">
          We use the information we collect for the following purposes:
        </p>
        <ul className="list-disc ml-6 mb-4 text-[15px] leading-7 text-[#2d2d2d] marker:text-[#115997]">
          <li className="mb-1.5">To respond to your inquiries and schedule free inspections or estimates.</li>
          <li className="mb-1.5">To provide, maintain, and improve our waterproofing and foundation repair services.</li>
          <li className="mb-1.5">To communicate with you about your project, including appointment confirmations, scheduling updates, and follow-up communications via phone, email, or SMS.</li>
          <li className="mb-1.5">To measure the performance of our advertising campaigns on Meta platforms and other channels.</li>
          <li className="mb-1.5">To deliver targeted advertisements to you on Facebook, Instagram, and other platforms based on your interactions with our website (retargeting).</li>
          <li className="mb-1.5">To create lookalike or similar audiences on advertising platforms to reach other potential customers.</li>
          <li className="mb-1.5">To improve our website, services, and overall customer experience.</li>
          <li className="mb-1.5">To comply with legal obligations and protect our rights.</li>
        </ul>

        {/* Section 4 */}
        <h2 className="font-display text-xl font-bold text-[#273373] mt-10 mb-4 pb-2 border-b-2 border-gray-200">
          4. Meta (Facebook) Pixel and Advertising
        </h2>
        <p className="mb-3 text-[15px] leading-7 text-[#2d2d2d]">
          Our website uses the Meta Pixel, a piece of code that allows us to track visitor activity on our website for the purposes of advertising measurement, optimization, and retargeting. When you visit our website, the Meta Pixel may collect:
        </p>
        <ul className="list-disc ml-6 mb-4 text-[15px] leading-7 text-[#2d2d2d] marker:text-[#115997]">
          <li className="mb-1.5">Pages you view and actions you take (such as submitting a form).</li>
          <li className="mb-1.5">Your IP address, browser information, and device identifiers.</li>
          <li className="mb-1.5">Information about your interaction with our ads on Facebook and Instagram.</li>
        </ul>
        <p className="mb-3 text-[15px] leading-7 text-[#2d2d2d]">
          This data is shared with Meta Platforms, Inc. and is subject to{' '}
          <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-[#115997] underline underline-offset-2 hover:text-[#273373]">
            Meta&apos;s Privacy Policy
          </a>
          . Meta may use this information to show you targeted ads on Facebook, Instagram, Messenger, and the Meta Audience Network.
        </p>
        <p className="mb-3 text-[15px] leading-7 text-[#2d2d2d]">
          You can manage your ad preferences and opt out of targeted advertising through your{' '}
          <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer" className="text-[#115997] underline underline-offset-2 hover:text-[#273373]">
            Facebook Ad Preferences
          </a>{' '}
          or by adjusting your device settings.
        </p>

        {/* Section 5 */}
        <h2 className="font-display text-xl font-bold text-[#273373] mt-10 mb-4 pb-2 border-b-2 border-gray-200">
          5. Information Sharing and Disclosure
        </h2>
        <p className="mb-3 text-[15px] leading-7 text-[#2d2d2d]">
          We do not sell your personal information. We may share your information with the following parties:
        </p>
        <ul className="list-disc ml-6 mb-4 text-[15px] leading-7 text-[#2d2d2d] marker:text-[#115997]">
          <li className="mb-1.5">
            <strong>Meta Platforms, Inc.:</strong> Through the use of Meta Pixel and lead ad forms for advertising measurement and optimization.
          </li>
          <li className="mb-1.5">
            <strong>Google:</strong> Through Google Analytics and Google Ads tracking for website analytics and advertising purposes.
          </li>
          <li className="mb-1.5">
            <strong>GreenSky® / Synovus Bank:</strong> If you choose to apply for financing for your project, your information may be shared with our financing partner as part of the credit application process.
          </li>
          <li className="mb-1.5">
            <strong>Service Providers:</strong> Third-party tools and platforms we use to operate our business, including website hosting, customer relationship management, SMS/email communication, and scheduling services.
          </li>
          <li className="mb-1.5">
            <strong>Legal Requirements:</strong> We may disclose your information if required by law, regulation, legal process, or government request.
          </li>
        </ul>

        {/* Section 6 */}
        <h2 className="font-display text-xl font-bold text-[#273373] mt-10 mb-4 pb-2 border-b-2 border-gray-200">
          6. Cookies and Tracking Technologies
        </h2>
        <p className="mb-3 text-[15px] leading-7 text-[#2d2d2d]">
          Our website uses cookies and similar tracking technologies to enhance your browsing experience and support our advertising efforts. These include:
        </p>
        <ul className="list-disc ml-6 mb-4 text-[15px] leading-7 text-[#2d2d2d] marker:text-[#115997]">
          <li className="mb-1.5"><strong>Essential Cookies:</strong> Required for basic website functionality.</li>
          <li className="mb-1.5"><strong>Analytics Cookies:</strong> Help us understand how visitors use our website (e.g., Google Analytics).</li>
          <li className="mb-1.5"><strong>Advertising Cookies:</strong> Used by Meta Pixel and similar tools to track conversions, build audiences, and deliver relevant ads.</li>
        </ul>
        <p className="mb-3 text-[15px] leading-7 text-[#2d2d2d]">
          You can control cookies through your browser settings. Please note that disabling certain cookies may affect website functionality.
        </p>

        {/* Section 7 */}
        <h2 className="font-display text-xl font-bold text-[#273373] mt-10 mb-4 pb-2 border-b-2 border-gray-200">
          7. Data Retention
        </h2>
        <p className="mb-3 text-[15px] leading-7 text-[#2d2d2d]">
          We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. Lead information collected through advertising is typically retained for up to 24 months unless you request deletion sooner.
        </p>

        {/* Section 8 */}
        <h2 className="font-display text-xl font-bold text-[#273373] mt-10 mb-4 pb-2 border-b-2 border-gray-200">
          8. Your Rights and Choices
        </h2>
        <p className="mb-3 text-[15px] leading-7 text-[#2d2d2d]">
          Depending on your location, you may have the following rights regarding your personal information:
        </p>
        <ul className="list-disc ml-6 mb-4 text-[15px] leading-7 text-[#2d2d2d] marker:text-[#115997]">
          <li className="mb-1.5"><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
          <li className="mb-1.5"><strong>Correction:</strong> Request that we correct inaccurate or incomplete information.</li>
          <li className="mb-1.5"><strong>Deletion:</strong> Request that we delete your personal information, subject to certain legal exceptions.</li>
          <li className="mb-1.5">
            <strong>Opt-Out of Targeted Advertising:</strong> You may opt out of targeted advertising by adjusting your settings on{' '}
            <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer" className="text-[#115997] underline underline-offset-2 hover:text-[#273373]">
              Facebook
            </a>
            , using the{' '}
            <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-[#115997] underline underline-offset-2 hover:text-[#273373]">
              Digital Advertising Alliance opt-out tool
            </a>
            , or adjusting your browser and device privacy settings.
          </li>
          <li className="mb-1.5">
            <strong>Opt-Out of Communications:</strong> You may opt out of marketing emails or SMS messages by replying STOP to any text message or by contacting us directly.
          </li>
        </ul>
        <p className="mb-3 text-[15px] leading-7 text-[#2d2d2d]">
          To exercise any of these rights, please contact us using the information below.
        </p>

        {/* Section 9 */}
        <h2 className="font-display text-xl font-bold text-[#273373] mt-10 mb-4 pb-2 border-b-2 border-gray-200">
          9. Data Security
        </h2>
        <p className="mb-3 text-[15px] leading-7 text-[#2d2d2d]">
          We implement reasonable administrative, technical, and physical safeguards to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
        </p>

        {/* Section 10 */}
        <h2 className="font-display text-xl font-bold text-[#273373] mt-10 mb-4 pb-2 border-b-2 border-gray-200">
          10. Children&apos;s Privacy
        </h2>
        <p className="mb-3 text-[15px] leading-7 text-[#2d2d2d]">
          Our website and services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected information from a child under 18, we will take steps to delete that information promptly.
        </p>

        {/* Section 11 */}
        <h2 className="font-display text-xl font-bold text-[#273373] mt-10 mb-4 pb-2 border-b-2 border-gray-200">
          11. Third-Party Links
        </h2>
        <p className="mb-3 text-[15px] leading-7 text-[#2d2d2d]">
          Our website may contain links to third-party websites or services, such as our BBB profile, Google Reviews, or financing partner. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
        </p>

        {/* Section 12 */}
        <h2 className="font-display text-xl font-bold text-[#273373] mt-10 mb-4 pb-2 border-b-2 border-gray-200">
          12. Changes to This Privacy Policy
        </h2>
        <p className="mb-3 text-[15px] leading-7 text-[#2d2d2d]">
          We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make changes, we will update the &quot;Effective Date&quot; at the top of this page. We encourage you to review this page periodically.
        </p>

        {/* Section 13 */}
        <h2 className="font-display text-xl font-bold text-[#273373] mt-10 mb-4 pb-2 border-b-2 border-gray-200">
          13. Contact Us
        </h2>
        <p className="mb-3 text-[15px] leading-7 text-[#2d2d2d]">
          If you have any questions about this Privacy Policy, your personal information, or wish to exercise your privacy rights, please contact us:
        </p>

        <div className="bg-white border border-gray-200 border-l-4 border-l-[#115997] rounded-md p-6 my-7">
          <p className="mb-1 text-[15px] text-[#2d2d2d]"><strong className="text-[#273373]">Reliable Solutions Atlanta LLC</strong></p>
          <p className="mb-1 text-[15px] text-[#2d2d2d]">Serving Metro Atlanta, Georgia</p>
          <p className="mb-1 text-[15px] text-[#2d2d2d]">
            Phone:{' '}
            <a href="tel:770-895-2039" className="text-[#115997] underline underline-offset-2 hover:text-[#273373]">
              770-895-2039
            </a>
          </p>
          <p className="mb-1 text-[15px] text-[#2d2d2d]">
            Email:{' '}
            <a href="mailto:rsolrepair@gmail.com" className="text-[#115997] underline underline-offset-2 hover:text-[#273373]">
              rsolrepair@gmail.com
            </a>
          </p>
          <p className="text-[15px] text-[#2d2d2d]">
            Website:{' '}
            <a href="https://www.waterhelpme.com" className="text-[#115997] underline underline-offset-2 hover:text-[#273373]">
              waterhelpme.com
            </a>
          </p>
        </div>
      </main>
    </>
  );
}