// Content bank for the "Spot the Phish" game.
// All content is fictional / illustrative — no real brand impersonation intended
// to be malicious; used purely for security-awareness education.

export type ChallengeKind = 'email' | 'link' | 'sms';
export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface Challenge {
  id: string;
  kind: ChallengeKind;
  difficulty: Difficulty;
  isPhishing: boolean;
  // Email-specific
  fromName?: string;
  fromAddress?: string;
  subject?: string;
  // Link-specific
  displayUrl?: string;
  // SMS-specific
  senderLabel?: string;
  // Shared
  body: string;
  explanation: string;
  redFlags: string[];
}

export const CHALLENGES: Challenge[] = [
  // ---- Difficulty 1: obvious ----
  {
    id: 'e1',
    kind: 'email',
    difficulty: 1,
    isPhishing: true,
    fromName: 'PayPaI Security',
    fromAddress: 'security@paypal-verify-account.com',
    subject: 'URGENT: Your account will be suspended in 24 hours!!!',
    body: 'Dear Customer, we detected unusual activity. Click the link below immediately to verify your identity or your account will be permanently closed.',
    explanation: 'The domain is not paypal.com, urgency + threats are classic pressure tactics, and "PayPaI" uses a capital "I" instead of lowercase "l".',
    redFlags: ['Look-alike domain', 'Urgent threat language', 'Generic greeting', 'Misspelled brand name'],
  },
  {
    id: 'l1',
    kind: 'link',
    difficulty: 1,
    isPhishing: true,
    displayUrl: 'http://192.168.44.10/login/secure-bank-update.php',
    body: 'Shared in a text message: "Your bank account needs verification, click here to continue"',
    explanation: 'Raw IP addresses are almost never used by legitimate banks — real institutions use their registered domain name.',
    redFlags: ['Raw IP address instead of domain', 'No HTTPS', '.php login page for a "bank"'],
  },
  {
    id: 's1',
    kind: 'sms',
    difficulty: 1,
    isPhishing: true,
    senderLabel: '+1 (302) 555-0199',
    body: 'CONGRATULATIONS! You have WON a $1000 Amazon gift card! Claim now: bit.ly/claim-prize-now',
    explanation: 'Unsolicited prize messages with shortened links are a textbook scam — legitimate companies do not randomly text prizes you never entered to win.',
    redFlags: ['Unsolicited prize', 'Shortened URL hides destination', 'Excessive urgency/excitement'],
  },
  {
    id: 'e2',
    kind: 'email',
    difficulty: 1,
    isPhishing: false,
    fromName: 'GitHub',
    fromAddress: 'noreply@github.com',
    subject: 'A new SSH key was added to your account',
    body: 'Hi there, a new SSH key was recently added to your GitHub account. If you did not do this, please review your security settings.',
    explanation: 'This is a legitimate security notification: correct domain, no urgent demand for credentials, and it directs you to check settings rather than clicking a suspicious link.',
    redFlags: [],
  },

  // ---- Difficulty 2 ----
  {
    id: 'e3',
    kind: 'email',
    difficulty: 2,
    isPhishing: true,
    fromName: 'Netflix',
    fromAddress: 'billing@netflix-account-support.net',
    subject: 'Your payment method has failed',
    body: 'We were unable to process your last payment. Please update your billing information within 48 hours to avoid interruption of service.',
    explanation: 'Netflix owns netflix.com — "netflix-account-support.net" is a look-alike domain designed to appear official at a glance.',
    redFlags: ['Domain is not netflix.com', 'Creates billing anxiety', 'Time pressure (48 hours)'],
  },
  {
    id: 'l2',
    kind: 'link',
    difficulty: 2,
    isPhishing: true,
    displayUrl: 'https://accounts.google.verify-secure-login.com/signin',
    body: 'Email says: "Suspicious sign-in attempt blocked. Confirm your identity here:"',
    explanation: 'The real domain would be accounts.google.com. Here "google" is just a subdomain of the attacker\'s domain "verify-secure-login.com" — always check what comes right before the top-level domain (.com).',
    redFlags: ['"google" is a subdomain, not the real domain', 'Domain structure trick'],
  },
  {
    id: 's2',
    kind: 'sms',
    difficulty: 2,
    isPhishing: false,
    senderLabel: 'Chase',
    body: 'Chase Fraud Alert: Did you attempt a $412.50 charge at Best Buy? Reply YES or NO. We will never ask for your PIN or password.',
    explanation: 'This mirrors real bank fraud alerts: no link, no credential request, offers a simple reply, and explicitly states they will never ask for sensitive info.',
    redFlags: [],
  },
  {
    id: 'e4',
    kind: 'email',
    difficulty: 2,
    isPhishing: false,
    fromName: 'LinkedIn',
    fromAddress: 'notifications-noreply@linkedin.com',
    subject: 'You appeared in 12 searches this week',
    body: 'See who\'s been viewing your profile and searching for your skills this week.',
    explanation: 'Standard low-stakes engagement email from the correct domain, no request for credentials or payment, no urgency.',
    redFlags: [],
  },

  // ---- Difficulty 3 ----
  {
    id: 'e5',
    kind: 'email',
    difficulty: 3,
    isPhishing: true,
    fromName: 'Microsoft 365',
    fromAddress: 'admin@micros0ft-office365.com',
    subject: 'Action required: Mailbox storage almost full',
    body: 'Your mailbox has exceeded its storage limit. Emails will stop being delivered until you sign in to increase your quota.',
    explanation: 'Notice the zero in "micros0ft" — a classic character-substitution trick to fool a quick glance. Storage-full warnings are a very common phishing lure for corporate credentials.',
    redFlags: ['Zero replacing "o" in domain', 'Corporate credential harvesting theme'],
  },
  {
    id: 'l3',
    kind: 'link',
    difficulty: 3,
    isPhishing: true,
    displayUrl: 'https://paypal.com.secure-session-id48212.info/login',
    body: 'Text link shared claiming to be a PayPal receipt confirmation page.',
    explanation: 'The actual domain is "secure-session-id48212.info" — everything before it, including "paypal.com", is just a subdomain label attackers use to mislead the eye.',
    redFlags: ['Real brand name placed before the actual domain', 'Suspicious .info TLD with random numbers'],
  },
  {
    id: 's3',
    kind: 'sms',
    difficulty: 3,
    isPhishing: true,
    senderLabel: 'USPS',
    body: 'USPS: Your package could not be delivered due to incomplete address. Update your details within 24h: usps-redelivery.info/track',
    explanation: 'USPS uses usps.com, never third-party domains like "usps-redelivery.info". Delivery-failure smishing is one of the most common SMS scams.',
    redFlags: ['Wrong domain for a postal service', 'Time-limited threat', 'Generic delivery excuse'],
  },
  {
    id: 'e6',
    kind: 'email',
    difficulty: 3,
    isPhishing: false,
    fromName: 'Figma',
    fromAddress: 'team@figma.com',
    subject: 'Your teammate commented on "Landing Page v3"',
    body: 'Sarah left a comment on a frame you\'re following. Click to view the comment in Figma.',
    explanation: 'Correct sender domain, contextually specific (references a real-sounding project/teammate), and low-stakes — no credentials or payment involved.',
    redFlags: [],
  },

  // ---- Difficulty 4 ----
  {
    id: 'e7',
    kind: 'email',
    difficulty: 4,
    isPhishing: true,
    fromName: 'IT Support Desk',
    fromAddress: 'helpdesk@yourcompany-it-support.com',
    subject: 'Re: Password expiration reminder',
    body: 'As previously discussed, your password expires today. Use the self-service portal to reset it before you lose access: portal-reset-secure.yourcompany-it-support.com',
    explanation: 'This is a spear-phishing style message: it references a fake prior conversation ("Re:", "as previously discussed") to seem legitimate, and uses a domain that merely contains "yourcompany" but is not actually owned by your organization.',
    redFlags: ['Fake email thread reference', 'Domain merely contains company name', 'Password reset urgency'],
  },
  {
    id: 'l4',
    kind: 'link',
    difficulty: 4,
    isPhishing: true,
    displayUrl: 'https://docs.gooogle.com/document/d/1aB3-invoice-view',
    body: 'Shared "invoice" link received via email from a supposed vendor.',
    explanation: 'Look closely: "gooogle.com" has three o\'s, not two. This typosquatting technique is easy to miss when skimming quickly.',
    redFlags: ['Typosquatted domain (extra letter)', 'Unexpected invoice/document lure'],
  },
  {
    id: 's4',
    kind: 'sms',
    difficulty: 4,
    isPhishing: false,
    senderLabel: '78015',
    body: 'Your verification code is 482913. Do not share this code with anyone, including people claiming to be from our support team.',
    explanation: 'Legitimate one-time-passcode messages include an explicit warning not to share the code and come from a short numeric sender ID, with no links or requests for information.',
    redFlags: [],
  },

  // ---- Difficulty 5: hardest ----
  {
    id: 'e8',
    kind: 'email',
    difficulty: 5,
    isPhishing: true,
    fromName: 'Sarah Chen (HR)',
    fromAddress: 'sarah.chen@company-hr-payroll.co',
    subject: 'Updated direct deposit form — please review before Friday payroll',
    body: 'Hi, HR is updating banking records ahead of Friday\'s payroll run. Please confirm your direct deposit details using the secure form linked below so your payment isn\'t delayed.',
    explanation: 'This is a highly targeted "CEO/HR fraud" style attack: a plausible internal-sounding name, believable business context (payroll), and mild urgency (Friday deadline) — but the domain ".co" is not your real company domain, and legitimate HR should never ask you to re-submit banking info via an emailed link.',
    redFlags: ['Look-alike company domain (.co vs your real domain)', 'Payroll/banking data request via email link', 'Believable internal persona'],
  },
  {
    id: 'l5',
    kind: 'link',
    difficulty: 5,
    isPhishing: true,
    displayUrl: 'https://xn--80ak6aa92e.com/secure/login',
    body: 'Link shared in a professional-looking security alert claiming to be from "apple.com".',
    explanation: 'This is a punycode/homograph attack — "xn--80ak6aa92e.com" decodes to characters that visually resemble "apple.com" using Cyrillic look-alike letters, a technique that bypasses casual visual inspection entirely.',
    redFlags: ['Punycode domain (xn--)', 'Homograph attack — visually mimics a trusted brand'],
  },
  {
    id: 'e9',
    kind: 'email',
    difficulty: 5,
    isPhishing: false,
    fromName: 'Stripe',
    fromAddress: 'no-reply@stripe.com',
    subject: 'Your weekly payout summary is ready',
    body: 'Here is a summary of your account\'s payouts for the past 7 days. Log in to your dashboard directly (do not use links from emails) to review full details.',
    explanation: 'Legitimate sender domain, no embedded action link for sensitive data, and it explicitly encourages navigating directly instead of clicking — a security-conscious pattern real fintech companies use.',
    redFlags: [],
  },
  {
    id: 's5',
    kind: 'sms',
    difficulty: 5,
    isPhishing: true,
    senderLabel: 'Delta',
    body: 'Delta: Your flight DL2291 tomorrow has a gate change to B12. Seat upgrade available due to schedule change — confirm at delta-flightupdates.com/DL2291',
    explanation: 'Highly plausible and specific (real flight number format, believable scenario), but Delta\'s real domain is delta.com — this uses a separate, unrelated domain that merely mentions "delta" in the name.',
    redFlags: ['Specific, believable details lower suspicion', 'Domain unrelated to the real airline site'],
  },
];

export function getChallengesByDifficulty(difficulty: Difficulty): Challenge[] {
  return CHALLENGES.filter((c) => c.difficulty === difficulty);
}
