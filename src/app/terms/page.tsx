import type { Metadata } from "next";
import {
  LegalHero,
  LegalBody,
  H2,
  P,
  Divider,
} from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "XeedlyAI Terms of Service. Terms governing the use of our Intelligence Platforms and Automated Growth Systems.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <LegalHero title="Terms of Service" updated="April 2026" />
      <LegalBody>
        <H2>1. Acceptance of Terms</H2>
        <P>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to
          and use of the services provided by XeedlyAI (&ldquo;we,&rdquo;
          &ldquo;us,&rdquo; &ldquo;our&rdquo;), including our website at
          xeedly.com, our Automated Growth Systems, our Intelligence
          Platforms, and any related services (collectively, the
          &ldquo;Services&rdquo;).
        </P>
        <P>
          By accessing or using our Services, you agree to be bound by these
          Terms. If you do not agree, do not use our Services.
        </P>

        <Divider />

        <H2>2. Description of Services</H2>
        <P>
          <strong>Automated Growth Systems.</strong> AI-powered marketing and
          operations automation including advertising management (AI Ad
          Engine), search engine optimization (SEO Autopilot), voice and chat
          AI communication agents, review intelligence and management, and
          payment automation. Growth Systems are offered on a monthly
          subscription basis.
        </P>
        <P>
          <strong>Intelligence Platforms.</strong> Custom-deployed AI
          intelligence platforms that ingest operational events from your
          connected business systems, process them through a signal engine,
          and deliver proactive intelligence via briefings, alerts, and an AI
          concierge. Intelligence Platforms are offered as one-time
          deployments with optional ongoing managed services.
        </P>
        <P>
          <strong>Product Licenses.</strong> Purpose-built vertical products
          including Sovvrn (restaurant intelligence), Propertyolio (property
          management intelligence), PropertyDocz (document operations), and
          PropertyJobz (vendor management), offered on a SaaS subscription
          basis.
        </P>

        <Divider />

        <H2>3. Consent to Automated Communications</H2>
        <P>
          <strong>
            By providing your telephone number to XeedlyAI, you agree and
            consent to receive automated telephone calls and text messages
            (including SMS and MMS) from or on behalf of XeedlyAI at the
            telephone number(s) you have provided.
          </strong>{" "}
          These may include marketing and promotional messages about XeedlyAI
          products and services; transactional messages related to your
          account, including billing notifications, service updates, and
          delivery confirmations; AI-generated voice calls for appointment
          reminders, follow-ups, customer engagement, and service
          notifications; and alerts and notifications related to your
          Intelligence Platform signals and briefings.
        </P>
        <P>
          <strong>
            Your consent to receive automated communications is not a
            condition of purchasing any goods or services from XeedlyAI.
          </strong>
        </P>
        <P>
          You may revoke your consent at any time by replying STOP to any SMS
          message, informing our AI voice agent during a call, or contacting
          us at privacy@xeedly.com. Standard message and data rates may
          apply. Message frequency varies.
        </P>
        <P>
          <strong>For Growth Systems customers:</strong> When you use our
          Growth Systems to communicate with your customers, you are
          responsible for obtaining proper consent from your customers before
          sending automated messages on their behalf. You agree to comply
          with all applicable laws regarding automated communications,
          including the Telephone Consumer Protection Act (TCPA), CAN-SPAM
          Act, and any applicable state laws. XeedlyAI provides the tools —
          compliance with how those tools are used is your responsibility.
        </P>

        <Divider />

        <H2>4. Account Registration and Responsibilities</H2>
        <P>
          To access certain features of our Services, you may need to create
          an account. You agree to provide accurate, current, and complete
          information during registration and to keep your account
          information updated.
        </P>
        <P>
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activities that occur under your
          account. You agree to notify us immediately of any unauthorized
          access to or use of your account.
        </P>

        <Divider />

        <H2>5. Payment Terms</H2>
        <P>
          <strong>Growth Systems.</strong> Subscriptions are billed monthly.
          Your subscription will automatically renew each month unless you
          cancel before the next billing date. You may cancel at any time —
          cancellation takes effect at the end of your current billing
          period. No refunds are issued for partial months. Prices may change
          with 30 days&rsquo; notice.
        </P>
        <P>
          <strong>Intelligence Platform Deployments.</strong> Pricing is based
          on a custom quote and governed by a separate service agreement.
          Payment terms, milestones, and schedules will be specified in your
          service agreement.
        </P>
        <P>
          <strong>Managed Intelligence.</strong> Monthly subscriptions billed
          on the same terms as Growth Systems unless otherwise specified in
          your service agreement.
        </P>
        <P>
          <strong>Product Licenses.</strong> Subscription terms vary by
          product and are specified during sign-up.
        </P>
        <P>
          All payments are processed through Stripe. By providing payment
          information, you authorize us to charge the applicable fees to
          your payment method.
        </P>

        <Divider />

        <H2>6. Intellectual Property</H2>
        <P>
          <strong>Our IP.</strong> The XeedlyAI platform, including its
          software, architecture, signal engine, AI models, design system,
          documentation, and all related intellectual property, is owned by
          XeedlyAI and protected by applicable intellectual property laws.
          You may not copy, modify, distribute, or reverse-engineer any part
          of our platform.
        </P>
        <P>
          <strong>Your Data.</strong> You retain ownership of all data you
          provide to us or that is ingested from your connected systems. We
          process your data solely to provide the Services and as described
          in our Privacy Policy. When your service ends, you may request
          export of your data within 30 days.
        </P>
        <P>
          <strong>AI-Generated Content.</strong> Intelligence briefings,
          signals, recommendations, and other AI-generated content produced
          by our platform are provided as informational outputs. You may use
          this content in your business operations but may not represent it
          as human-authored analysis.
        </P>

        <Divider />

        <H2>7. AI Disclaimer</H2>
        <P>
          Our Services use artificial intelligence to generate intelligence
          briefings, signals, recommendations, voice interactions, and
          marketing content. While we strive for accuracy and usefulness,
          AI-generated content may contain errors, inaccuracies, or outdated
          information; should not be the sole basis for critical business
          decisions; does not constitute professional advice (legal,
          financial, medical, or otherwise); and may not reflect real-time
          conditions.
        </P>
        <P>
          You are responsible for independently verifying AI-generated
          intelligence before taking action based on it.
        </P>

        <Divider />

        <H2>8. Acceptable Use</H2>
        <P>
          You agree not to use our Services to violate any applicable law or
          regulation, including telecommunications and privacy laws; send
          spam, unsolicited messages, or communications to individuals who
          have not consented; transmit any material that is defamatory,
          obscene, threatening, or otherwise objectionable; interfere with
          or disrupt the integrity or performance of our Services; attempt
          to gain unauthorized access to our systems or other users&rsquo;
          accounts; use our AI systems to generate misleading, fraudulent,
          or harmful content; or resell or redistribute our Services without
          written authorization.
        </P>
        <P>
          For Growth Systems customers: you are responsible for ensuring
          that your use of our marketing automation tools complies with all
          applicable advertising platform policies (Meta, Google) and
          telecommunications regulations (TCPA, CAN-SPAM).
        </P>

        <Divider />

        <H2>9. Service Availability and Modifications</H2>
        <P>
          We strive to maintain high availability of our Services but do not
          guarantee uninterrupted access. We may modify, suspend, or
          discontinue any part of our Services at any time with reasonable
          notice.
        </P>
        <P>
          For Intelligence Platform customers, service level commitments are
          specified in your service agreement.
        </P>

        <Divider />

        <H2>10. Limitation of Liability</H2>
        <P>
          To the maximum extent permitted by law, XeedlyAI shall not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages, including but not limited to loss of profits,
          data, business opportunities, or goodwill, arising from your use
          of or inability to use our Services.
        </P>
        <P>
          Our total liability for any claims arising from these Terms or your
          use of our Services shall not exceed the total amount you paid to
          XeedlyAI in the twelve (12) months preceding the claim.
        </P>

        <Divider />

        <H2>11. Indemnification</H2>
        <P>
          You agree to indemnify, defend, and hold harmless XeedlyAI and its
          officers, directors, employees, and agents from and against any
          claims, liabilities, damages, losses, and expenses (including
          reasonable attorneys&rsquo; fees) arising from: (a) your use of our
          Services, (b) your violation of these Terms, (c) your violation of
          any third-party rights, or (d) your customers&rsquo; claims arising
          from communications sent using our Growth Systems.
        </P>

        <Divider />

        <H2>12. Governing Law and Dispute Resolution</H2>
        <P>
          These Terms are governed by the laws of the State of Utah, without
          regard to its conflict of laws principles. Any disputes arising
          from these Terms or your use of our Services shall be resolved
          through binding arbitration in Salt Lake City, Utah, under the
          rules of the American Arbitration Association. You agree to waive
          your right to a jury trial and to participate in a class action
          lawsuit.
        </P>

        <Divider />

        <H2>13. Termination</H2>
        <P>
          We may terminate or suspend your access to our Services
          immediately, without prior notice, for conduct that we believe
          violates these Terms or is harmful to other users, us, or third
          parties, or for any other reason at our sole discretion.
        </P>
        <P>
          Upon termination: (a) your right to use the Services will cease
          immediately, (b) you remain liable for all amounts due, and (c)
          you may request export of your data within 30 days.
        </P>

        <Divider />

        <H2>14. Severability</H2>
        <P>
          If any provision of these Terms is found to be unenforceable, the
          remaining provisions will remain in full force and effect.
        </P>

        <Divider />

        <H2>15. Changes to Terms</H2>
        <P>
          We may update these Terms from time to time. We will notify you of
          material changes by posting the updated Terms on this page and
          updating the &ldquo;Last updated&rdquo; date. Continued use of our
          Services after changes are posted constitutes your acceptance of
          the updated Terms.
        </P>

        <Divider />

        <H2>16. Contact Us</H2>
        <P>If you have questions about these Terms, contact us at:</P>
        <P>
          XeedlyAI
          <br />
          Email: legal@xeedly.com
          <br />
          Address: Salt Lake City, Utah [Full mailing address to be added]
        </P>
      </LegalBody>
    </>
  );
}
