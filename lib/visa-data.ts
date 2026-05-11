// All data for the France student-visa journey lives here so pages stay declarative.

export type ChecklistItem = {
  id: string;
  label: string;
  detail?: string;
  original?: boolean;
  conditional?: "scholarship" | "self-funded";
  qty?: number;
};

export type ChecklistGroup = {
  id: string;
  title: string;
  icon: string;
  items: ChecklistItem[];
};

export const FRANCE_CHECKLIST: ChecklistGroup[] = [
  {
    id: "forms",
    title: "Application forms & photos",
    icon: "📝",
    items: [
      { id: "schengen-forms", label: "2 completed Schengen visa application forms", detail: "Each with a Schengen-sized photo glued to it.", qty: 2 },
      { id: "extra-photo", label: "1 additional Schengen-sized photo (unattached)" },
    ],
  },
  {
    id: "identity",
    title: "Identity documents",
    icon: "🪪",
    items: [
      { id: "passport", label: "Passport information page", detail: "Photocopy + copies of any existing visas." },
      { id: "nic", label: "National ID card (A4 photocopy)" },
      { id: "birth", label: "Birth certificate (photocopy)" },
      { id: "parent-nic", label: "Father's or mother's national ID card (A4 photocopy)" },
    ],
  },
  {
    id: "academic",
    title: "Academic & admission",
    icon: "🎓",
    items: [
      { id: "cv", label: "2 copies of your CV", qty: 2 },
      { id: "cover-letter", label: "Cover letter", detail: "Use the Comskills template under Templates." },
      { id: "eef-admission", label: "EEF admission letter" },
      { id: "uni-admission", label: "University admission letter" },
      { id: "eef-receipt", label: "EEF payment receipt" },
      { id: "aeg-slip", label: "AEG appointment slip" },
      { id: "uni-degree", label: "University degree & transcripts" },
      { id: "fsc-matric", label: "FSc and Matric degrees & marksheets" },
      { id: "internship", label: "Internship letter" },
      { id: "recommendations", label: "Recommendation letters from professors" },
      { id: "language", label: "IELTS certificate or EPL (French proficiency)" },
    ],
  },
  {
    id: "financial",
    title: "Financial proof",
    icon: "💼",
    items: [
      { id: "scholarship-letter", label: "Scholarship letter", detail: "Only if on a scholarship.", conditional: "scholarship" },
      { id: "affidavit", label: "Affidavit of support (ORIGINAL)", detail: "Use the Comskills template under Templates.", original: true, conditional: "self-funded" },
      { id: "bank-statement", label: "Bank statement (ORIGINAL)", original: true, conditional: "self-funded" },
      { id: "tax-returns", label: "Tax returns", conditional: "self-funded" },
    ],
  },
  {
    id: "housing",
    title: "Accommodation",
    icon: "🏠",
    items: [
      { id: "booking", label: "Booking.com accommodation confirmation" },
      { id: "accommodation-letter", label: "Accommodation letter", detail: "Explains your CROUS situation and reason for hotel/Airbnb. Template available." },
    ],
  },
  {
    id: "extras",
    title: "Bring extras to your appointment",
    icon: "🎒",
    items: [
      { id: "blank-forms", label: "1–2 extra blank Schengen visa forms" },
      { id: "extra-photos", label: "Extra Schengen-sized photos" },
      { id: "extra-copies", label: "Extra passport and/or ID card photocopies" },
      { id: "extra-aeg", label: "Extra AEG appointment slip printouts (1–2)" },
    ],
  },
  {
    id: "cash",
    title: "Cash to carry",
    icon: "💰",
    items: [
      { id: "visa-fee", label: "Exact visa processing fee in cash", detail: "Amount is on your AEG slip." },
      { id: "transport-cash", label: "~5,000 PKR for transport, shuttle & general expenses" },
    ],
  },
];

export type JourneyStep = {
  id: string;
  number: number;
  title: string;
  description: string;
  status: "done" | "active" | "upcoming";
  duration: string;
};

export const JOURNEY_STEPS: JourneyStep[] = [
  { id: "admission", number: 1, title: "University admission", description: "You've received your offer — congrats!", status: "done", duration: "Completed" },
  { id: "eef-aeg", number: 2, title: "EEF / Campus France interview", description: "Complete EEF online + attend the Campus France academic interview.", status: "done", duration: "2–4 weeks" },
  { id: "documents", number: 3, title: "Assemble visa documents", description: "Gather every photocopy and original per the embassy checklist.", status: "active", duration: "1–2 weeks" },
  { id: "appointment", number: 4, title: "Book AEG / VFS appointment", description: "Pay the fee, lock a slot, and print every confirmation.", status: "upcoming", duration: "1 week" },
  { id: "biometrics", number: 5, title: "Submit application & biometrics", description: "Submit your file at VFS and provide fingerprints.", status: "upcoming", duration: "1 day" },
  { id: "decision", number: 6, title: "Visa decision & passport pickup", description: "Track your application, then collect your passport.", status: "upcoming", duration: "2–4 weeks" },
];

export type TemplateDoc = {
  slug: string;
  type: "docx" | "pdf";
  title: string;
  description: string;
  pdfFile?: string;
  body?: string;
};

export const TEMPLATES: TemplateDoc[] = [
  {
    slug: "cover-letter",
    type: "docx",
    title: "Cover Letter Template",
    description: "Personal cover letter addressed to the French Embassy explaining your study plans.",
    body: `[Your Full Name]
[Your Address]
[City, Postal Code]
[Email]  •  [Phone]
[Date]

The Consul General
Embassy of France
[Consulate City]

Subject: Application for a long-stay student visa (VLS-TS étudiant)

Respected Sir / Madam,

I am writing to formally apply for a long-stay student visa to pursue my [Degree Programme] at [University Name], [City], France, beginning [Intake Month, Year]. I have completed the Études en France procedure and successfully attended my Campus France interview on [AEG Appointment Date].

My academic journey so far has prepared me for this opportunity. I completed my [Last Degree] from [Institution], where I built a strong foundation in [Field]. The [Programme Name] at [University Name] is the natural next step: its curriculum on [specific modules / research themes] aligns precisely with the direction I want to take in [career goal].

I am financially prepared for the duration of my studies. [Briefly mention scholarship OR sponsorship by parent/guardian, attached bank statements, and affidavit of support.] I have also arranged temporary accommodation through [Booking confirmation / Airbnb / hotel] while my CROUS application is processed.

I assure you that I will respect every condition of the visa, complete my studies diligently, and return to Pakistan upon completion of my programme. I have attached all required supporting documents for your review.

Thank you for considering my application.

Respectfully,

[Your Full Name]
Passport No: [XXXXXXX]`,
  },
  {
    slug: "accommodation-letter",
    type: "docx",
    title: "Accommodation Letter Template",
    description: "Explains your CROUS situation and the reason for a hotel / Airbnb / Booking.com stay.",
    body: `[Your Full Name]
Passport No: [XXXXXXX]
[Date]

To Whom It May Concern,
Embassy of France

Subject: Explanation of accommodation arrangements

Respected Sir / Madam,

I am submitting this letter alongside my long-stay student visa application for studies at [University Name], starting [Intake Month, Year].

Regarding my accommodation in France: I have applied for student housing through CROUS, however a final room allocation is typically issued only after arrival in France and after the student physically registers at the local CROUS office. As of today, I have not yet received a confirmed CROUS room allotment.

To ensure I have verified accommodation for the start of my stay, I have booked [Hotel / Airbnb / Booking.com property name] in [City] from [Check-in Date] to [Check-out Date]. The confirmation is attached.

Once I arrive in France I will finalise my CROUS allotment, or alternatively secure a private student residence, and update my address with the relevant authorities within the required timeframe.

I hope this clarifies my housing plan. Please let me know if any further information is required.

Sincerely,

[Your Full Name]`,
  },
  {
    slug: "affidavit-of-support",
    type: "docx",
    title: "Affidavit of Financial Support",
    description: "Sponsor's sworn statement of financial support. Original on stamp paper required at submission.",
    body: `AFFIDAVIT OF FINANCIAL SUPPORT

I, [Sponsor Full Name], son/daughter of [Sponsor Parent Name], holder of CNIC No. [XXXXX-XXXXXXX-X], resident of [Full Address], do hereby solemnly affirm and declare on oath as under:

1. That I am the [father / mother / legal guardian] of [Student Full Name], holder of Passport No. [XXXXXXX], who intends to pursue [Degree Programme] at [University Name], [City], France, commencing [Intake Month, Year].

2. That I undertake full financial responsibility for the entire duration of my [son's / daughter's / ward's] studies in France, including but not limited to tuition fees, accommodation, food, health insurance, travel, books, and any other living expenses.

3. That I am financially capable of meeting these expenses. My monthly / annual income from [source — business / employment / agriculture / etc.] is [Amount in PKR]. Supporting documents (bank statements, tax returns, property documents) are attached with this affidavit.

4. That the funds being used to support these studies are from legitimate, lawful, and tax-paid sources.

5. That I will continue to financially support [Student Name] until [he / she] completes [his / her] education and returns to Pakistan.

6. That the contents of this affidavit are true and correct to the best of my knowledge and belief, and nothing has been concealed therefrom.

Deponent
[Sponsor Full Name]
CNIC: [XXXXX-XXXXXXX-X]
Signature: ______________________
Date: ___________________________

(To be executed on judicial stamp paper of the appropriate value and attested by an Oath Commissioner / Notary Public.)`,
  },
  {
    slug: "documents-for-visa",
    type: "pdf",
    title: "Documents for Visa (Reference PDF)",
    description: "Official reference list of every document needed for the French student visa.",
    pdfFile: "documents-for-visa.pdf",
  },
  {
    slug: "steps-direct-admission-campus-france",
    type: "pdf",
    title: "Steps after Direct Admission (Campus France)",
    description: "What to do after a direct on-campus admission via Campus France.",
    pdfFile: "steps-direct-admission-campus-france.pdf",
  },
  {
    slug: "steps-eef-admission",
    type: "pdf",
    title: "Steps after EEF Admission",
    description: "Procedure to follow after admission through the Études en France (EEF) platform.",
    pdfFile: "steps-eef-admission.pdf",
  },
];

export function getTemplate(slug: string) {
  return TEMPLATES.find((t) => t.slug === slug);
}
