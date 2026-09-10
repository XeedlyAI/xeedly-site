import type { Metadata } from "next";
import {
  LegalHero,
  LegalBody,
  H2,
  H3,
  P,
  Divider,
} from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "XeedlyAI Privacy Policy. Learn how we collect, use, and protect your personal information, including our SMS, voice, and email communication practices.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <LegalHero title="Privacy Policy" updated="April 2026" />
      <LegalBody>
        <H2>1. Introduction</H2>
        <P>
          XeedlyAI (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;)
          operates the website xeedly.com and provides AI-powered intelligence
          platforms and automated growth systems (collectively, the
          &ldquo;Services&rdquo;). This Privacy Policy describes how we
          collect, use, disclose, and protect your personal information when
          you visit our website, use our Services, or communicate with us.
        </P>
        <P>
          By using our Services, you agree to the collection and use of
          information as described in this policy.
        </P>
        <P>
          <strong>Business name:</strong> XeedlyAI
          <br />
          <strong>Website:</strong> xeedly.com
          <br />
          <strong>Contact email:</strong> privacy@xeedly.com
          <br />
          <strong>Physical address:</strong> Salt Lake City, Utah [Full mailing
          address to be added]
        </P>

        <Divider />

        <H2>2. Information We Collect</H2>

        <H3>Information You Provide Directly</H3>
        <P>
          We collect information you provide when you create an account,
          request a quote, fill out our contact form, or communicate with us.
          This includes, but is not limited to: your name, email address,
          phone number, company name, and job title. We also collect business
          information including your industry, number of locations, and
          systems you use, typically via our contact form and onboarding
          process. Payment information is processed securely through Stripe —
          we do not store credit card numbers directly. We retain the content
          of messages you send us via email, contact forms, or the
          Intelligence Console on our website, as well as any queries you
          submit through the freeform query input.
        </P>

        <H3>Information Collected Automatically</H3>
        <P>
          When you visit our website, we automatically collect usage data
          including pages visited, time on site, click patterns, and referral
          source, as well as device information such as browser type,
          operating system, screen resolution, and IP address. We also use
          cookies and similar technologies for analytics and to improve your
          experience (see our Cookie Policy in Section 10).
        </P>

        <H3>Information from Third-Party Sources</H3>
        <P>
          If you connect business systems to our Intelligence Platform — such
          as point-of-sale, CRM, or vendor management tools — we ingest
          operational event data from those systems as described in your
          service agreement. We may also receive analytics data from services
          like Google Analytics.
        </P>

        <Divider />

        <H2>3. How We Use Your Information</H2>
        <P>
          We use the information we collect to provide, maintain, and improve
          our Services, including our Intelligence Platforms and Automated
          Growth Systems; to process transactions and send related
          information including purchase confirmations and invoices; to send
          transactional communications related to your account and services;
          and to respond to your comments, questions, and requests, including
          queries submitted through our Intelligence Console.
        </P>
        <P>
          We also use your information to{" "}
          <strong>
            send you marketing communications via email, SMS text messages,
            and AI-powered voice calls, including promotional messages about
            our products and services
          </strong>{" "}
          (see Section 4 below for details); to monitor and analyze trends,
          usage, and activities to improve our Services; to detect,
          investigate, and prevent fraudulent transactions and other illegal
          activities; to personalize your experience; and to generate
          AI-powered intelligence, briefings, and signals as part of our
          platform services.
        </P>

        <Divider />

        <H2>4. Communications — SMS, Voice, and Email</H2>

        <H3>Consent to Receive Communications</H3>
        <P>
          By providing your phone number to XeedlyAI — whether through our
          website, contact form, sign-up process, or in the course of using
          our Services — you expressly consent to receive automated
          communications from us. These may include transactional messages
          related to your account, services, and billing; marketing and
          promotional messages about XeedlyAI products and services;
          AI-generated voice calls for appointment reminders, follow-ups, and
          service notifications; and SMS text messages including alerts,
          updates, and promotional content.
        </P>
        <P>
          <strong>
            You are not required to consent to receive automated messages as a
            condition of purchasing any goods or services.
          </strong>
        </P>

        <H3>Message Frequency</H3>
        <P>
          Message frequency varies based on your account activity and the
          services you use. For Growth Systems customers, you may receive
          marketing messages on behalf of your business&rsquo;s customers
          based on the campaigns you have configured. For Intelligence
          Platform customers, you may receive briefing notifications and
          signal alerts based on your delivery preferences.
        </P>

        <H3>Message and Data Rates</H3>
        <P>
          Standard message and data rates may apply to any SMS messages sent
          to or received from XeedlyAI. Check with your mobile carrier for
          details about your messaging plan.
        </P>

        <H3>Opt-Out</H3>
        <P>
          You may opt out of receiving communications at any time. For SMS,
          reply STOP to any text message from us; you will receive a one-time
          confirmation message and will no longer receive SMS messages from
          us unless you re-subscribe. For email, click the unsubscribe link
          at the bottom of any marketing email — transactional emails related
          to your account cannot be opted out of while your account is
          active. For voice calls, inform the AI agent during any call that
          you wish to be removed from our call list, or contact us at the
          email address below. To opt out of all non-essential communications,
          contact us at privacy@xeedly.com.
        </P>
        <P>
          Opting out of marketing communications will not affect transactional
          communications related to your active services.
        </P>

        <H3>Supported Carriers</H3>
        <P>
          Our SMS services are supported on all major U.S. carriers including
          AT&amp;T, Verizon, T-Mobile, Sprint, and others. Carrier-specific
          terms may apply.
        </P>

        <H3>Help</H3>
        <P>
          For help with our messaging services, reply HELP to any text
          message from us or contact privacy@xeedly.com.
        </P>

        <Divider />

        <H2>5. How We Share Your Information</H2>
        <P>
          We do not sell your personal information. We share your information
          only in limited circumstances described below.
        </P>

        <H3>Service Providers</H3>
        <P>
          We share information with third-party service providers who perform
          services on our behalf, including: Stripe for payment processing;
          Twilio for SMS messaging and voice call services; Anthropic for AI
          processing used in intelligence generation, briefings, and the
          Intelligence Console; Supabase for database hosting and
          authentication; Vercel for website and application hosting; Meta
          (Facebook/Instagram) and Google for advertising platforms in Growth
          Systems campaigns; and Resend for transactional email delivery.
        </P>

        <H3>Legal Requirements</H3>
        <P>
          We may disclose your information if required to do so by law or if
          we believe in good faith that such action is necessary to comply
          with legal obligations, protect our rights or safety, or investigate
          fraud.
        </P>

        <H3>Business Transfers</H3>
        <P>
          If XeedlyAI is involved in a merger, acquisition, or sale of
          assets, your information may be transferred as part of that
          transaction.
        </P>

        <H3>With Your Consent</H3>
        <P>
          We may share your information with third parties when you have
          given us explicit consent to do so.
        </P>

        <H3>Intelligence Platform Clients</H3>
        <P>
          For businesses using our Intelligence Platform, operational event
          data ingested from your connected systems is processed within your
          dedicated platform instance. We do not share your operational data
          with other clients or use it for purposes outside of your service
          agreement.
        </P>

        <Divider />

        <H2>6. Data Retention</H2>
        <P>
          We retain your personal information for as long as your account is
          active or as needed to provide you with our Services. We will also
          retain your information as necessary to comply with our legal
          obligations, resolve disputes, and enforce our agreements.
        </P>
        <P>
          Intelligence Console queries submitted by website visitors are
          logged for product improvement and analytics purposes and are
          retained for up to 12 months.
        </P>
        <P>
          If you request deletion of your account, we will delete or
          anonymize your personal information within 30 days, except where
          retention is required by law.
        </P>

        <Divider />

        <H2>7. Data Security</H2>
        <P>
          We implement appropriate technical and organizational measures to
          protect your personal information, including encryption of data in
          transit (TLS/SSL), secure authentication, and access controls.
          However, no method of transmission over the Internet or electronic
          storage is 100% secure, and we cannot guarantee absolute security.
        </P>

        <Divider />

        <H2>8. Your Rights — California Residents (CCPA)</H2>
        <P>
          If you are a California resident, you have specific rights under the
          California Consumer Privacy Act (CCPA). You have the right to know
          what personal information we have collected about you, the
          categories of sources, the business purposes for collection, and
          the categories of third parties with whom we share it. You have the
          right to request that we delete your personal information, subject
          to certain exceptions. You have the right to opt out of the sale of
          your personal information — XeedlyAI does not sell personal
          information. And you have the right not to be discriminated against
          for exercising any of your CCPA rights.
        </P>
        <P>
          To exercise these rights, contact us at privacy@xeedly.com. We will
          respond to verifiable requests within 45 days.
        </P>

        <Divider />

        <H2>9. Your Rights — Other State Residents</H2>
        <P>
          Residents of Virginia, Colorado, Connecticut, Utah, and other
          states with comprehensive privacy laws may have similar rights to
          access, correct, delete, and opt out of certain processing of their
          personal information. To exercise these rights, contact us at
          privacy@xeedly.com.
        </P>

        <Divider />

        <H2>10. Cookie Policy</H2>
        <P>
          We use cookies and similar tracking technologies to collect usage
          information and improve our Services. The types of cookies we use
          include: essential cookies required for the website to function
          properly (authentication, security); analytics cookies that help us
          understand how visitors interact with our website (Google Analytics
          or similar); and preference cookies that remember your settings and
          preferences.
        </P>
        <P>
          You can control cookies through your browser settings. Disabling
          cookies may limit your ability to use certain features of our
          website.
        </P>

        <Divider />

        <H2>11. Children&rsquo;s Privacy</H2>
        <P>
          Our Services are not directed to individuals under the age of 16.
          We do not knowingly collect personal information from children
          under 16. If we become aware that we have collected personal
          information from a child under 16, we will take steps to delete
          such information.
        </P>

        <Divider />

        <H2>12. Third-Party Links</H2>
        <P>
          Our website may contain links to third-party websites and services.
          We are not responsible for the privacy practices of these third
          parties. We encourage you to review the privacy policies of any
          third-party sites you visit.
        </P>

        <Divider />

        <H2>13. Changes to This Privacy Policy</H2>
        <P>
          We may update this Privacy Policy from time to time. We will notify
          you of any material changes by posting the new Privacy Policy on
          this page and updating the &ldquo;Last updated&rdquo; date. Your
          continued use of our Services after changes are posted constitutes
          your acceptance of the updated policy.
        </P>

        <Divider />

        <H2>14. Contact Us</H2>
        <P>
          If you have questions about this Privacy Policy or our data
          practices, contact us at:
        </P>
        <P>
          XeedlyAI
          <br />
          Email: privacy@xeedly.com
          <br />
          Address: Salt Lake City, Utah [Full mailing address to be added
          before campaign launch]
        </P>
      </LegalBody>
    </>
  );
}
