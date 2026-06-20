import type { ChatMessage } from '../types';

/**
 * Parses the prompt user messages to extract context for dynamic mock generation
 */
export function parsePromptContext(messages: ChatMessage[]) {
  const userMsg = messages.find(m => m.role === 'user')?.content || '';

  // Extract Client Name
  const clientNameMatch = userMsg.match(/Name:\s*([^\r\n]+)/);
  const clientName = clientNameMatch ? clientNameMatch[1].trim() : 'Acme Corp';

  // Extract Client Industry
  const industryMatch = userMsg.match(/Industry:\s*([^\r\n]+)/);
  const industry = industryMatch ? industryMatch[1].trim() : 'Technology';

  // Extract Services
  const services: { name: string; category: string; basePrice: number; estimatedHours?: number }[] = [];
  // Standard regex to find selected service blocks in context format
  const serviceRegex = /\d+\.\s*([^\r\n(]+)\(([^)]+)\)[\s\S]*?Base Price:\s*\$?([\d,]+)/g;
  let match;
  while ((match = serviceRegex.exec(userMsg)) !== null) {
    services.push({
      name: match[1].trim(),
      category: match[2].trim(),
      basePrice: parseFloat(match[3].replace(/,/g, '')) || 5000,
    });
  }

  // If no services were extracted, let's look for line items (e.g. for invoices)
  const lineItems: { description: string; quantity: number; unitPrice: number }[] = [];
  const lineItemRegex = /\d+\.\s*"([^"]+)"\s*—\s*Qty:\s*(\d+),\s*Unit Price:\s*\$?([\d,]+)/g;
  while ((match = lineItemRegex.exec(userMsg)) !== null) {
    lineItems.push({
      description: match[1].trim(),
      quantity: parseInt(match[2], 10) || 1,
      unitPrice: parseFloat(match[3].replace(/,/g, '')) || 1000,
    });
  }

  return { clientName, industry, services, lineItems };
}

/**
 * Dynamic Mock Generator for Proposals
 */
export function generateMockProposal(messages: ChatMessage[]): string {
  const { clientName, industry, services } = parsePromptContext(messages);
  const today = new Date().toISOString().split('T')[0];

  const proposalServices = services.length > 0 ? services : [
    { name: 'Website Design & Development', category: 'website', basePrice: 15000 },
    { name: 'SEO Optimization Strategy', category: 'seo', basePrice: 4500 }
  ];

  const lineItems = proposalServices.map((s, index) => ({
    id: `item-${index + 1}`,
    description: `Professional implementation of ${s.name}`,
    quantity: 1,
    unitPrice: s.basePrice,
    total: s.basePrice,
    category: s.category
  }));

  const subtotal = lineItems.reduce((acc, curr) => acc + curr.total, 0);
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + tax;

  const res = {
    coverPage: {
      title: `${clientName} Digital Transformation Proposal`,
      subtitle: `${proposalServices.map(s => s.name).join(' & ')} Package`,
      clientName: clientName,
      date: today,
    },
    companyIntroduction: `We are thrilled to submit this proposal for ${clientName}. Based on your standing in the ${industry} industry, our modern digital approach is optimized to drive client engagement and increase conversion rates.`,
    problemStatement: `${clientName} is seeking to expand its market presence and optimize operational workflows. The current infrastructure requires enhancement to handle scaling loads and deliver a seamless experience in the ${industry} sector.`,
    proposedSolution: `Our solution provides a comprehensive suite covering ${proposalServices.map(s => s.name).join(', ')}. This integrates advanced responsive designs and search engine visibility strategies.`,
    deliverables: proposalServices.map(s => ({
      name: s.name,
      description: `Complete launch-ready deployment of the ${s.name} module, including wireframes, revision phases, and production setup.`,
      icon: s.category === 'website' ? 'language' : s.category === 'seo' ? 'trending_up' : 'campaign',
    })),
    timeline: [
      {
        phase: 1,
        name: 'Discovery & UX Architecture',
        duration: 'Week 1-2',
        startWeek: 1,
        endWeek: 2,
        deliverables: ['Creative Brief', 'Wireframes', 'Site Architecture Maps'],
        description: 'Collaborative alignment on visual requirements, product mappings, and technological stack decisions.',
      },
      {
        phase: 2,
        name: 'Development & Implementation',
        duration: 'Week 3-6',
        startWeek: 3,
        endWeek: 6,
        deliverables: ['Alpha Launch Review', 'API Integrations', 'Content Uploads'],
        description: 'Writing semantic React/Next.js code, setting up styles, and configuring API routes.',
      },
      {
        phase: 3,
        name: 'Quality Assurance & Launch',
        duration: 'Week 7-8',
        startWeek: 7,
        endWeek: 8,
        deliverables: ['Final Production Checklist', 'Deployment to Hosting', 'Client Training'],
        description: 'Cross-device browser testing, lighthouse speed audits, and deployment hand-off.',
      },
    ],
    pricingTable: {
      lineItems,
      subtotal,
      tax,
      total,
      paymentSchedule: '50% Upfront, 25% upon Alpha Release, 25% upon Launch approval.',
    },
    contractClauses: [
      {
        id: 'clause-1',
        title: 'Intellectual Property Ownership',
        content: `Upon full payment of all invoices, ownership of all custom source code, assets, and documentation created for ${clientName} shall transfer entirely to ${clientName}.`,
        category: 'ip',
        riskLevel: 'low',
        isIndustrySpecific: false,
        rationale: 'Standard property transfer clause protecting the client assets upon project completion.',
      },
      {
        id: 'clause-2',
        title: 'Termination for Convenience',
        content: 'Either party may terminate this agreement with 30 days written notice. In the event of termination, the client agrees to pay for all work completed up to the date of notice.',
        category: 'termination',
        riskLevel: 'medium',
        isIndustrySpecific: false,
        rationale: 'Protects the service provider from sudden project cancellations while offering client exit flexibility.',
      },
    ],
    upsellSuggestions: [
      {
        id: 'upsell-1',
        serviceName: 'Continuous Maintenance & Security Support',
        description: 'Monthly post-launch support package including bug patches, runtime updates, and daily cloud backups.',
        additionalRevenue: 1500,
        confidenceScore: 0.85,
        closingRateLift: 15,
        rationale: 'Provides long-term peace of mind and secures continuous system health monitoring.',
        industry: industry,
        priority: 'high',
      },
    ],
    callToAction: `We look forward to partnering with ${clientName} on this project. To move forward, please sign the proposal or contact our representative to arrange a kickoff meeting.`,
  };

  return JSON.stringify(res, null, 2);
}

/**
 * Dynamic Mock Generator for Quotations
 */
export function generateMockQuotation(messages: ChatMessage[]): string {
  const { clientName, services, lineItems: customItems } = parsePromptContext(messages);
  const today = new Date();
  const validDate = new Date();
  validDate.setDate(today.getDate() + 30);

  const quotationServices = services.length > 0 ? services : [
    { name: 'Branding & Identity Design', category: 'design', basePrice: 6000 },
    { name: 'E-commerce Development', category: 'development', basePrice: 20000 }
  ];

  const lineItems = customItems.length > 0 ? customItems.map((item, index) => ({
    id: `q-item-${index + 1}`,
    description: item.description,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    total: item.quantity * item.unitPrice,
    category: 'custom'
  })) : quotationServices.map((s, index) => ({
    id: `q-item-${index + 1}`,
    description: `Provision of ${s.name} services`,
    quantity: 1,
    unitPrice: s.basePrice,
    total: s.basePrice,
    category: s.category
  }));

  const subtotal = lineItems.reduce((acc, curr) => acc + curr.total, 0);
  const discount = Math.round(subtotal * 0.05); // 5% discount
  const tax = Math.round((subtotal - discount) * 0.08);
  const total = subtotal - discount + tax;

  const res = {
    quotationNumber: `QT-2026-${Math.floor(Math.random() * 900 + 100)}`,
    validUntil: validDate.toISOString().split('T')[0],
    lineItems,
    tiers: [
      {
        name: 'Basic',
        description: 'Essential deliverables for budget-conscious project kickoff.',
        price: Math.round(subtotal * 0.8),
        features: ['Core features implementation', '1 round of revisions', 'Email support'],
        recommended: false,
      },
      {
        name: 'Standard',
        description: 'Recommended comprehensive package covering complete requirements.',
        price: subtotal,
        features: ['Complete requirements implementation', '3 rounds of revisions', 'Priority email & slack support', 'Performance tuning'],
        recommended: true,
        savings: 'Best value package',
      },
      {
        name: 'Premium',
        description: 'Ultimate scaling package with continuous post-launch security support.',
        price: Math.round(subtotal * 1.25),
        features: ['Complete requirements implementation', 'Unlimited revisions', '24/7 priority emergency support', '1-month post-launch maintenance'],
        recommended: false,
      },
    ],
    subtotal,
    discount,
    tax,
    total,
    terms: [
      'Quotation is valid for 30 days from issue date.',
      '50% deposit required to commence project scheduling.',
      'All prices exclude travel expenses unless explicitly specified.',
    ],
    notes: `Prepared specifically for ${clientName}. Estimated timeline starts upon receipt of deposit.`,
    estimatedTimeline: '6 to 8 weeks upon kickoff',
  };

  return JSON.stringify(res, null, 2);
}

/**
 * Dynamic Mock Generator for Invoices
 */
export function generateMockInvoice(messages: ChatMessage[]): string {
  const { clientName, lineItems: customItems } = parsePromptContext(messages);
  const today = new Date();
  const due = new Date();
  due.setDate(today.getDate() + 30);

  const items = customItems.length > 0 ? customItems.map((item, index) => ({
    id: `inv-item-${index + 1}`,
    description: item.description,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    total: item.quantity * item.unitPrice,
  })) : [
    {
      id: 'inv-item-1',
      description: 'Milestone 1 Payment: Discovery and Wireframe Approval',
      quantity: 1,
      unitPrice: 7500,
      total: 7500,
    },
    {
      id: 'inv-item-2',
      description: 'Development Surcharge: API Gateway Setup',
      quantity: 1,
      unitPrice: 2500,
      total: 2500,
    }
  ];

  const subtotal = items.reduce((acc, curr) => acc + curr.total, 0);
  const taxRate = 8;
  const taxAmount = Math.round(subtotal * (taxRate / 100));
  const total = subtotal + taxAmount;

  const res = {
    invoiceNumber: `INV-2026-${Math.floor(Math.random() * 900 + 100)}`,
    issueDate: today.toISOString().split('T')[0],
    dueDate: due.toISOString().split('T')[0],
    lineItems: items,
    subtotal,
    taxRate,
    taxAmount,
    total,
    paymentTerms: 'Net 30',
    paymentMethods: ['Bank Wire Transfer', 'ACH Direct Debit', 'Credit Card (Stripe link)'],
    latePaymentPolicy: 'Overdue invoices are subject to interest of 1.5% per month, calculated daily from the due date.',
    notes: `Thank you for your business. Please reference the invoice number on your payment transfer. Prepared for client: ${clientName}.`,
    currency: 'USD',
  };

  return JSON.stringify(res, null, 2);
}

/**
 * Dynamic Mock Generator for Scope of Work (SOW)
 */
export function generateMockScopeOfWork(messages: ChatMessage[]): string {
  const { clientName, services } = parsePromptContext(messages);

  const sowServices = services.length > 0 ? services : [
    { name: 'Website Design & Development', category: 'website', basePrice: 15000 },
    { name: 'SEO Strategy', category: 'seo', basePrice: 4500 }
  ];

  const deliverables = sowServices.map((s, index) => ({
    id: `del-${index + 1}`,
    name: `${s.name} Blueprint`,
    description: `Complete deliverables list for ${s.name} implementation.`,
    acceptanceCriteria: [
      'Must pass responsive display testing across iOS, Android, and Desktop.',
      'Must resolve all console errors.',
      'Documentation signed off by project managers.',
    ],
    estimatedHours: s.estimatedHours || Math.round(s.basePrice / 150) || 40,
    dependencies: index > 0 ? [`del-${index}`] : [],
    phase: 1,
  }));

  const res = {
    projectTitle: `${clientName} Custom System Implementation`,
    projectOverview: `This Scope of Work (SOW) describes the project objectives, deliverables, timelines, and acceptance criteria for deploying high-performance systems for ${clientName}.`,
    objectives: [
      'Deploy responsive frontend pages integrating core user services.',
      'Enhance discoverability and loading performance scores.',
      'Provide structured system documentation for user operations.',
    ],
    scope: {
      inScope: sowServices.map(s => `Implementation of ${s.name} standard features.`)
        .concat(['Unit testing of key flows', 'Final hand-off documentation']),
      outOfScope: [
        'Post-launch database administration and custom server support.',
        'Continuous copywriting (unless templates are supplied).',
        'Acquisition of custom media licenses (images, stock videos).',
      ],
    },
    deliverables,
    timeline: [
      {
        phase: 1,
        name: 'Project Setup & Design Mockups',
        duration: 'Week 1-3',
        startWeek: 1,
        endWeek: 3,
        deliverables: ['UI/UX Designs', 'Sitemap Mapping', 'Setup of Dev Repo'],
        description: 'Laying visual guides and framework scaffolding.',
      },
      {
        phase: 2,
        name: 'Integration & Testing',
        duration: 'Week 4-7',
        startWeek: 4,
        endWeek: 7,
        deliverables: ['Custom Code base', 'Testing Reports', 'Interactive Demo'],
        description: 'Writing software modules and completing testing checks.',
      },
    ],
    assumptions: [
      'Client will provide design assets and content within 5 business days of kickoff.',
      'Client staff will participate in reviews within 3 business days of submission.',
    ],
    constraints: [
      'API endpoints must comply with standard JSON format.',
      'Target deployment must complete before the annual corporate planning event.',
    ],
    acceptanceCriteria: [
      'All deliverable criteria specified in this SOW are met and verified.',
      'Lighthouse accessibility score exceeding 90.',
    ],
    changeManagement: 'Any request for out-of-scope services will be routed via a Change Request form. Work will commence upon approval and signing of the change request with revised budget.',
    communicationPlan: 'Weekly status reports via email, bi-weekly progress review calls via Google Meet, Slack channel for daily coordination.',
  };

  return JSON.stringify(res, null, 2);
}
