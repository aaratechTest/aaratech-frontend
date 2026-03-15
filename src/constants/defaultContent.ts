/**
 * Default content for all pages, used as fallback when API is unavailable.
 * Mirrors the backend defaultContent.js structure.
 */
export const defaultContent: Record<string, { sections: Record<string, any> }> = {
  home: {
    sections: {
      hero: {
        slides: [
          {
            title: "DIGITAL SOLUTIONS",
            description: "",
            bulletPoints: ["Legacy Modernization", "SMAC - Social, Mobile, Analytics, Cloud", "Banking and Financial Services", "Mobile Applications"],
            image: "",
            redirectUrl: "/services",
          },
          {
            title: "PRODUCTS",
            description: "",
            bulletPoints: ["Lending Solutions", "Leasing Solutions", "Customer Acquisition", "Collection System", "Safe Deposit Box"],
            image: "",
            redirectUrl: "",
          },
          {
            title: "IT Strategy Consulting",
            description: "Aara Tech focuses on serving the technology needs with an innovative business model to help our clients achieve their business goals.",
            bulletPoints: [],
            image: "",
            redirectUrl: "/services",
          },
          {
            title: "IT SERVICES OUTSOURCING",
            description: "Software Testing Services & Innovative technology Solutions",
            bulletPoints: [],
            image: "",
            redirectUrl: "/services",
          },
        ],
      },
      products: {
        heading: "Our Product Offerings",
        items: [
          { title: "COBOL Conversion", description: "Modernize legacy systems into secure, cloud-native, and future-proof your business.", image: "" },
          { title: "Digital Solutions", description: "Build intelligent digital platforms that enhance customer experience and business efficiency.", image: "" },
          { title: "Mobile Wallet", description: "Secure mobile payment solutions for fast and seamless transactions.", image: "" },
          { title: "Safe Deposit Box", description: "Smart management system ensuring secure handling of customer assets.", image: "" },
          { title: "Lending Solutions", description: "End-to-end lending platforms with automation and compliance support.", image: "" },
        ],
      },
      services: {
        heading: "Our Services",
        items: [
          { title: "IT Services Outsourcing", description: "Customized services in IT Software Development, Testing, Maintenance and Outsourcing Services for Banking, Logistics and E-commerce verticals.", icon: "\u2699\uFE0F" },
          { title: "IT Strategy Consulting", description: "Aara Tech focuses on serving the technology needs with an innovative business model to help our clients achieve their business goals.", icon: "\uD83D\uDC64" },
          { title: "Digital Solutions", description: "End-to-end digital transformation using Mobility, Big Data Analytics, and Cloud technologies to enhance business efficiency.", icon: "\uD83D\uDCBB" },
          { title: "Testing Services", description: "Comprehensive quality assurance including software testing, performance testing, and specialized testing services.", icon: "\uD83D\uDEE0\uFE0F" },
        ],
      },
      clients: {
        label: "Our Clients",
        heading: "Trusted by Leading Banks & Enterprises",
        description: "We are proud to partner with some of the most prestigious financial institutions and enterprises across the globe. Our solutions power critical operations for banks, NBFCs, and fintech companies.",
        stats: [
          { value: "50+", label: "Clients Worldwide" },
          { value: "14+", label: "Years of Trust" },
          { value: "100+", label: "Projects Delivered" },
        ],
        clients: [
          { name: "Axis Bank" },
          { name: "HDFC Bank" },
          { name: "ICICI Bank" },
          { name: "State Bank of India" },
          { name: "Kotak Mahindra Bank" },
          { name: "IndusInd Bank" },
          { name: "Federal Bank" },
          { name: "South Indian Bank" },
          { name: "Karur Vysya Bank" },
          { name: "City Union Bank" },
          { name: "Tamilnad Mercantile Bank" },
          { name: "DBS Bank" },
        ],
      },
      caseStudies: {
        heading: "Who We Are?",
        subtitle: "Case Study",
        items: [
          { tag: "Case Study", title: "Transforming Reinsurance Claims Management", description: "Convert Old Mainframe Assembler Programs To Modern COBOL For Easier Maintenance And Modernization." },
          { tag: "Case Study", title: "Establishing a Modern Digital Banking Experience", description: "" },
          { tag: "Case Study", title: "Empowering Digital Identity", description: "" },
          { tag: "Case Study", title: "Embracing Phygital Banking", description: "" },
        ],
      },
    },
  },

  about: {
    sections: {
      hero: {
        heading: "About Us",
        description: "AURA Tech Pvt. Ltd. was founded with a clear vision to build reliable and innovative digital solutions for modern businesses. With a strong focus on quality, collaboration, and innovation, we support businesses in their digital transformation journey.",
        image: "",
      },
      visionMission: {
        vision: {
          heading: "Our Vision",
          description: "To be a globally trusted technology partner, delivering innovative and scalable digital solutions that empower modern businesses. We aim to help organizations adapt to changing market demands through reliable, future-ready technologies.",
        },
        mission: {
          heading: "Our Mission",
          description: "To create value-driven technology solutions by blending innovation with deep business expertise and customer-focused execution. We work closely with our clients to understand their unique challenges and deliver solutions that create real business impact.",
        },
      },
      commitments: {
        heading: "We are committed to",
        items: [
          { title: "Innovation", description: "We design intelligent digital solutions using modern and emerging technologies. Our approach blends creativity, automation, and scalability to solve real business challenges. We continuously evolve to help businesses stay competitive in a fast-changing digital world." },
          { title: "Quality", description: "We deliver reliable, secure, and high-quality digital solutions. Our processes focus on accuracy, performance, and long-term stability. Every solution is carefully tested to meet real-world business needs and expectations." },
          { title: "Collaboration", description: "We work closely with our clients as trusted partners. Open communication and teamwork guide every stage of our process. Together, we build strong, long-term relationships that drive shared success." },
          { title: "Customer Success", description: "We put our customers at the center of everything we do. By ensuring timely delivery and reliable execution, we build trust. Our focus is on consistent excellence that drives lasting business value." },
          { title: "People & Growth", description: "We believe our people are the foundation of our success. Through continuous learning, innovation, and collaboration, we empower our team. This culture of growth enables us to deliver better solutions for our clients." },
        ],
      },
      team: {
        heading: "Our Management Team",
        members: [
          { name: "Balamurugan Ramanathan", role: "Chairman", shortBio: "Bala founded VIT Consultancy Private Limited upon his return from Singapore in 2003 with an agenda of being \"socially responsible\".With over 2 decades of IT Industry experience, ..", fullBio: "Bala founded VIT Consultancy Private Limited upon his return from Singapore in 2003 with an agenda of being \"socially responsible\".With over 2 decades of IT Industry experience, Bala shaped the strategies that led to the exponential offshore growth of VIT Consultancy Private Limited.", image: "" },
          { name: "Ravi Tadepalli", role: "Senior Vice President", shortBio: "Ravi has an overall twenty two years of experience in IT Industry, who started his career from TCS in the year 1996. His last assignment was with Wipro Technologies.", fullBio: "Ravi has an overall twenty two years of experience in IT Industry, who started his career from TCS in the year 1996. His last assignment was with Wipro Technologies.", image: "" },
          { name: "Chandra", role: "Chief Mentor", shortBio: "Chandra, our Chief Mentor in Strategic Consulting, specializes in banking solutions with over 25+ years of experience.", fullBio: "Chandra, our Chief Mentor in Strategic Consulting, specializes in banking solutions with over 25+ years of experience.", image: "" },
        ],
      },
      approach: {
        heading: "Our approach",
        description: "We deliver real business outcomes with a strong focus on strategy, execution, cost efficiency, and measurable success.",
        items: ["Simple", "Scalable", "Value-Driven", "On-Time Delivery", "Cost Efficiency", "Client Partnership"],
      },
      bto: {
        heading: "Business Technology Optimization (BTO)",
        description: "Our BTO Framework aligns IT Strategy, Applications, and Operations to improve efficiency, control costs, and manage risk\u2014without disrupting daily business.",
        items: ["Optimize the Business Value of IT", "Control Costs and Improve Efficiency", "Align IT Initiatives with Business Goals", "Minimize Operational and Compliance Risks"],
        lifecycleHeading: "BTO Lifecycle",
        lifecycle: ["Strategy", "Design", "Build", "Deploy", "Operate", "Optimize"],
      },
      deliveryModel: {
        heading: "Our Delivery Model",
        subtitle: "Right resourcing for speed, scale, and cost advantage",
        models: [
          { name: "Onsite", description: "Business alignment and real-time proximity" },
          { name: "Offshore", description: "Cost-effective, scalable 24x7 delivery" },
          { name: "Offsite / Nearshore", description: "Faster turnaround with regional efficiency" },
        ],
      },
      cta: {
        heading: "What can we help you to achieve today?",
        buttonText: "CONTACT",
      },
    },
  },

  services: {
    sections: {
      hero: {
        heading: "Our Services",
        tabs: [
          { title: "Legacy Modernization", description: "Transform outdated systems into modern, scalable platforms." },
          { title: "IT Services Outsourcing", description: "Offshore software and application development services." },
          { title: "IT Strategy Consulting", description: "Strategic guidance for technology-driven businesses." },
          { title: "Digital Solutions", description: "End-to-end digital transformation services." },
          { title: "Testing Services", description: "Comprehensive quality assurance and testing." },
        ],
      },
      legacyModernization: { heading: "Legacy Modernization" },
      itOutsourcing: { heading: "IT Services Outsourcing", description: "Aara Tech provides comprehensive IT outsourcing services with a focus on quality delivery and cost optimization." },
      itStrategy: { heading: "IT Strategy Consulting", description: "We help businesses develop and execute strong IT strategies aligned with their business objectives." },
      digitalSolutions: { heading: "Digital Solutions", description: "End-to-end digital transformation using Mobility, Big Data Analytics, and Cloud technologies." },
      testingServices: { heading: "Testing Services", description: "Comprehensive quality assurance including software testing and specialized testing services." },
      cta: { heading: "What can we help you to achieve today?", buttonText: "CONTACT" },
    },
  },

  industries: {
    sections: {
      hero: {
        heading: "Industries We Serve",
        description: "Banking & Financial Services, Logistics Services, E-commerce Services, and Postal Solutions.",
      },
      tabs: {
        heading: "All Your Team Needs In One Place",
        items: [
          { title: "Banking & Finance", description: "Complete technology solutions for banking and financial institutions." },
          { title: "Logistics Technology", description: "Smart logistics and supply chain technology solutions." },
          { title: "E-commerce", description: "End-to-end e-commerce platform development and optimization." },
          { title: "Postal Technology", description: "Digital transformation solutions for postal services." },
        ],
      },
      cta: { heading: "What can we help you to achieve today?", buttonText: "CONTACT" },
    },
  },

  contact: {
    sections: {
      hero: {
        heading: "Let's Talk Business",
        description: "Partner with AARATech to build secure, scalable, and enterprise-grade digital solutions across the globe.",
        badge: "India \u2022 Singapore \u2022 USA \u2022 Malaysia",
      },
      offices: {
        heading: "Our Global Offices",
        items: [
          { country: "India", address: "Unit No. 4A & 5, Ground Floor, Pinnacle Building, International Tech Park, Taramani, Chennai \u2013 600113", phone: "+91 72999 78701", email: "info@aaratech.com", mapUrl: "" },
          { country: "Singapore", address: "100 Jalan Sultan, #03-45, Sultan Plaza, Singapore \u2013 199001", phone: "", email: "info@aaratech.com", mapUrl: "" },
          { country: "USA", address: "39555 Orchard Hill Place, Novi, MI 48375", phone: "", email: "info@aaratech.com", mapUrl: "" },
          { country: "Malaysia", address: "No. 15-2-2, Medan Niaga Mutiara Cheras, Jalan Cheras, Kuala Lumpur 56100", phone: "", email: "info@aaratech.com", mapUrl: "" },
        ],
      },
    },
  },

  "lending-solutions": {
    sections: {
      hero: {
        badge: "Enterprise Lending Platform",
        heading: "End-to-End Lending Solutions for Modern Banking",
        description: "A comprehensive, fully web-based lending management platform designed for banks, credit unions, and financial institutions to streamline their entire loan lifecycle.",
        buttonPrimary: "REQUEST A DEMO",
        buttonSecondary: "CONTACT SALES",
      },
      stats: {
        items: [
          { value: "14+", label: "Years in Banking" },
          { value: "500+", label: "Financial Institutions" },
          { value: "100%", label: "Web-Based Platform" },
          { value: "6", label: "Core Modules" },
        ],
      },
      overview: {
        tag: "Product Overview",
        heading: "Simplify Every Part of Lending & Loan Management",
        description: "Our platform covers the full lending lifecycle from loan origination to closure, with built-in compliance, reporting, and CRM capabilities.",
      },
      coreModules: {
        items: [
          { title: "Loan Origination", description: "Streamline the entire loan application and approval process.", icon: "FileText" },
          { title: "Credit Line Management", description: "Manage revolving credit facilities with real-time tracking.", icon: "CreditCard" },
          { title: "Accounts Receivable", description: "Automate payment processing and delinquency management.", icon: "DollarSign" },
          { title: "Asset Management", description: "Track and manage collateral and secured assets.", icon: "Building" },
          { title: "Contract Management", description: "Handle contract lifecycle from creation to closure.", icon: "FileCheck" },
          { title: "Financial Reporting", description: "Generate comprehensive financial reports and analytics.", icon: "BarChart" },
        ],
      },
      lifecycle: { steps: ["Prospect", "Assess", "Approve", "Disburse", "Service", "Close"] },
      whyChoose: {
        items: [
          { title: "Fully Parameter-Driven", description: "Configure every aspect without code changes." },
          { title: "Browser-Based Deployment", description: "No client-side installation required." },
          { title: "Easy Legacy Integration", description: "Seamless integration with existing systems." },
          { title: "Intuitive Workflow UI", description: "User-friendly interface for all operations." },
          { title: "14+ Years Banking Expertise", description: "Deep domain knowledge in financial services." },
          { title: "Scalable Architecture", description: "Grows with your business needs." },
        ],
      },
      cta: { heading: "Ready to Transform Your Lending Operations?", buttonText: "GET STARTED TODAY" },
    },
  },

  leasing: {
    sections: {
      hero: {
        heading: "Leasing System",
        description: "A comprehensive, end-to-end leasing management solution designed for financial institutions, equipment lessors, and corporate leasing companies.",
        badges: ["Equipment Finance", "Vehicle Leasing", "Industrial Machines", "Corporate Loans"],
      },
      overview: { label: "Our Flagship Product", heading: "Aara Tech's Leasing System", description: "Our leasing platform covers the entire lease lifecycle from initiation to closure, with built-in asset management, accounting, and compliance capabilities." },
      coreModules: {
        items: [
          { title: "Lease Initiation", description: "Streamline lease applications and credit assessment." },
          { title: "Contract Preparation", description: "Automated contract generation and management." },
          { title: "Asset Management", description: "Track and manage leased assets throughout their lifecycle." },
          { title: "Account Receivables", description: "Automated billing, payments, and delinquency management." },
          { title: "Reporting & MIS", description: "Comprehensive reports and management information systems." },
          { title: "Lease Closure", description: "Systematic lease termination and asset disposition." },
        ],
      },
      highlights: {
        items: [
          { title: "Parameter Driven & Configurable", description: "Fully configurable to match your business rules." },
          { title: "Built by Industry Experts", description: "Designed by professionals with deep domain expertise." },
          { title: "Increase Productivity & Profit", description: "Automate workflows to boost efficiency." },
        ],
      },
      industries: {
        items: [
          { title: "SMEs", description: "Small and medium enterprise leasing solutions." },
          { title: "Large Corporations", description: "Enterprise-grade leasing management." },
          { title: "Banks & Financial Institutions", description: "Integrated leasing for financial services." },
        ],
      },
      whyChoose: {
        items: [
          { title: "End-to-End Solution", description: "Complete lifecycle management." },
          { title: "Multi-Currency Support", description: "Handle international leasing operations." },
          { title: "Regulatory Compliance", description: "Built-in compliance frameworks." },
          { title: "Scalable Platform", description: "Grows with your business needs." },
        ],
      },
      cta: { heading: "What can we help you to achieve today?", buttonText: "CONTACT" },
    },
  },

  "sdb-management": {
    sections: {
      hero: {
        heading: "SecureBox - Safe Deposit Box Management",
        description: "A comprehensive, automated safe deposit box management system designed for banks, jewelleries, NBFCs, and financial service providers.",
        badges: ["Banking", "Jewelleries", "NBFC", "Financial Services"],
      },
      overview: { label: "Our Product", heading: "Automated Safe Deposit Box Management", description: "Our platform streamlines the complete safe deposit box lifecycle from inventory setup to rental management, with built-in KYC, compliance, and audit capabilities." },
      coreFeatures: {
        items: [
          { title: "Inventory Setup", description: "Configure vault locations, box sizes, and availability." },
          { title: "Rental Rates", description: "Flexible rate configuration with discounts and promotions." },
          { title: "Box Rental & Access", description: "Streamlined rental process with access logging." },
          { title: "Delinquency Follow-up", description: "Automated tracking and follow-up for overdue rentals." },
          { title: "Reports", description: "Comprehensive reporting for management and compliance." },
          { title: "Security & Audit", description: "Complete audit trail and security controls." },
        ],
      },
      highlights: {
        items: [
          { title: "Complete Automation of Locker Management", description: "End-to-end digital workflow." },
          { title: "KYC AML Checks & 30+ API Integrations", description: "Built-in compliance and third-party integrations." },
          { title: "Parameter Driven & Configurable", description: "Fully customizable to your business rules." },
        ],
      },
      capabilities: {
        items: [
          { title: "Multiple Co-signers", description: "Support for joint rentals and authorized access." },
          { title: "Platform Independent", description: "Works across devices and operating systems." },
          { title: "Seamless Integration", description: "Connect with existing banking systems." },
        ],
      },
      whyChoose: {
        items: [
          { title: "Complete Automation", description: "Digitize your entire locker management." },
          { title: "Regulatory Compliance", description: "Meet banking and regulatory requirements." },
          { title: "Scalable Solution", description: "Handle any number of vaults and branches." },
          { title: "24/7 Access Management", description: "Round-the-clock access tracking." },
        ],
      },
      cta: { heading: "What can we help you to achieve today?", buttonText: "CONTACT" },
    },
  },

  "mobile-wallet": {
    sections: {
      hero: {
        heading: "Sling Wallet - Mobile Wallet Solution",
        description: "A comprehensive mobile wallet platform enabling fund transfers, hotel & airline bookings, recharges, and bill payments.",
        badges: ["Fund Transfer", "Hotel Booking", "Airline Booking", "Recharge & Bills"],
      },
      overview: { label: "Our Product", heading: "Payments Made Easy", description: "Sling Wallet is a feature-rich mobile wallet solution that enables businesses to offer seamless digital payment experiences to their customers." },
      coreServices: {
        items: [
          { title: "Send Money", description: "Instant peer-to-peer and bank transfers." },
          { title: "Request Money", description: "Easy payment requests with tracking." },
          { title: "Hotel Booking", description: "Integrated hotel search and booking." },
          { title: "Airline Booking", description: "Flight search and ticket booking." },
          { title: "Mobile & DTH Recharge", description: "Quick recharges for all operators." },
          { title: "Virtual Card Payments", description: "Virtual debit card for online purchases." },
        ],
      },
      benefits: {
        items: [
          { title: "Turnkey OEM & Hosted Deployment", description: "Flexible deployment options." },
          { title: "White Label Solution", description: "Fully brandable for your business." },
          { title: "Pre-Integrated Payment Gateways", description: "Ready to process payments." },
        ],
      },
      deployment: {
        items: [
          { title: "Turnkey Solution", description: "Complete ready-to-deploy package." },
          { title: "OEM Solution", description: "Customizable solution for your brand." },
          { title: "Hosted Solution", description: "Cloud-hosted with managed infrastructure." },
        ],
      },
      whyChoose: {
        items: [
          { title: "Quick Time to Market", description: "Launch your wallet in weeks." },
          { title: "Secure Transactions", description: "Bank-grade security protocols." },
          { title: "Multi-Platform", description: "iOS, Android, and web support." },
          { title: "Scalable Architecture", description: "Handle millions of transactions." },
        ],
      },
      cta: { heading: "What can we help you to achieve today?", buttonText: "CONTACT" },
    },
  },

  culture: {
    sections: {
      hero: {
        heading: "Our Work Culture",
        description: "At Aara Tech, we foster an open, amiable, and innovation-driven culture. Our environment nurtures creativity, collaboration, and continuous growth — empowering every team member to do their best work and build a rewarding career.",
        image: "",
      },
      values: {
        heading: "Our Core Values",
        description: "These values guide everything we do — from how we work together to how we serve our clients.",
        items: [
          { title: "Innovation", description: "We encourage creative thinking and embrace new technologies to solve complex challenges. Our teams are empowered to experiment, iterate, and push boundaries.", image: "" },
          { title: "Collaboration", description: "We believe the best solutions emerge when diverse minds work together. Open communication and teamwork are at the heart of every project we deliver.", image: "" },
          { title: "Integrity", description: "We operate with transparency, honesty, and accountability in all our interactions — with clients, partners, and each other.", image: "" },
          { title: "Excellence", description: "We set high standards for quality and performance. Every line of code, every delivery, and every interaction reflects our commitment to excellence.", image: "" },
        ],
      },
      lifeAtAara: {
        heading: "Life at Aara Tech",
        description: "We are proud to boast a talented and enthusiastic team of professionals who are driven to be successful by ensuring their clients succeed. Our open culture creates an environment where employees can leverage their skills and interests to build rewarding careers.",
        highlights: [
          { title: "Open Door Policy", description: "Flat hierarchy with accessible leadership. Every voice matters and every idea is heard." },
          { title: "Team Events & Celebrations", description: "Regular team outings, festival celebrations, hackathons, and knowledge-sharing sessions keep the energy high." },
          { title: "Work-Life Balance", description: "Flexible work arrangements and a supportive environment ensure our team can thrive both professionally and personally." },
          { title: "Diverse & Inclusive", description: "We celebrate diversity and create an inclusive environment where everyone feels welcomed and valued." },
        ],
      },
      stats: {
        items: [
          { value: "14+", label: "Years of Excellence" },
          { value: "200+", label: "Team Members" },
          { value: "4", label: "Global Offices" },
          { value: "95%", label: "Employee Satisfaction" },
        ],
      },
      growth: {
        heading: "Growth & Learning",
        description: "We invest in our people because their growth drives our success. Aara Tech provides an environment where employees can leverage their skills and interests and build rewarding careers, with great emphasis on aligning career goals with customer needs.",
        items: [
          { title: "Continuous Learning", description: "Access to training programs, certifications, and learning platforms to keep your skills sharp and relevant." },
          { title: "Mentorship Programs", description: "Guidance from experienced leaders who help you navigate your career path and accelerate your professional development." },
          { title: "Career Progression", description: "Clear growth paths with regular performance reviews, promotions, and opportunities to take on new challenges." },
          { title: "Cross-Functional Exposure", description: "Work across different domains, technologies, and client projects to broaden your expertise and perspective." },
        ],
      },
      whyJoin: {
        heading: "Why Join Aara Tech?",
        items: [
          { title: "Impactful Work", description: "Work on cutting-edge projects for leading banks and enterprises across the globe." },
          { title: "Collaborative Environment", description: "Join a team that values open communication, mutual respect, and collective success." },
          { title: "Competitive Benefits", description: "Attractive compensation packages, health insurance, and performance-based rewards." },
          { title: "Innovation First", description: "Be part of a culture that encourages experimentation and rewards creative problem-solving." },
          { title: "Global Exposure", description: "Work with teams and clients across India, Singapore, USA, and Malaysia." },
          { title: "Employee Well-being", description: "Programs and initiatives that prioritize your physical, mental, and professional well-being." },
        ],
      },
      cta: {
        heading: "Ready to join our team?",
        buttonText: "VIEW OPENINGS",
      },
    },
  },

  footer: {
    sections: {
      offices: {
        items: [
          {
            country: "India",
            address: "Unit No. 4A & 5, Ground Floor, Pinnacle Building, International Tech Park, Taramani, Chennai \u2013 600113.",
            phone: "+91 7299978701",
            email: "info@aaratech.com",
          },
          {
            country: "Singapore",
            address: "100 Jalan Sultan, #03-45, Sultan Plaza, Singapore \u2013 199001",
            phone: "",
            email: "",
          },
          {
            country: "USA",
            address: "39555 Orchard Hill Place, Novi, MI 48375",
            phone: "",
            email: "",
          },
          {
            country: "Malaysia",
            address: "No. 15-2-2, Medan Niaga Mutiara Cheras, Jalan 3/101C, Cheras Business Centre, Batu 5, Jalan Cheras, 56100, Kuala Lumpur",
            phone: "",
            email: "",
          },
        ],
      },
      social: {
        facebook: "",
        twitter: "",
        linkedin: "",
      },
      bottom: {
        copyrightText: "Aara Tech Pvt Ltd. All rights reserved.",
      },
    },
  },

  "assembler-cobol": {
    sections: {
      tabContent: {
        "mainframe-legacy": {
          heading: "Mainframe Legacy",
          content: "<p>Content coming soon. This section can be updated from the admin panel.</p>",
        },
        "our-tool": {
          heading: "Our Tool",
          content: "<p>Content coming soon. This section can be updated from the admin panel.</p>",
        },
        "advantages": {
          heading: "Advantages",
          content: "<p>Content coming soon. This section can be updated from the admin panel.</p>",
        },
        "limitations": {
          heading: "Limitations",
          content: "<p>Content coming soon. This section can be updated from the admin panel.</p>",
        },
        "migration-methodology": {
          "strategy": {
            content: `<div style="display:flex;gap:20px;"><div style="flex:1;font-size:13px;line-height:1.8;color:#333;"><p><b>Program Assessment:</b> As a preliminary step, We extract all mnemonics used currently along with total lines of the code from assembler program</p><p><b>Tool Coverage Analysis:</b> Identify percentage coverage by the tool both in terms of lines of code and mnemonics</p><p><b>Proof of Concept (POC):</b> Identify and segregate a set of programs to do POC</p><p><b>Issue Resolution:</b> Address any identified issues during the POC.</p><p><b>Edge cases:</b> Identify scenarios which cannot be handled in Cobol and decide next steps. This feedback will be shared with the tool developers for future revisions.</p><p><b>Testing in a Safe Environment:</b> Perform End to End testing of programs converted in POC</p><p><b>Program Handover:</b> Provide the converted programs to the clients, along with reports and test result comparison documents.</p><p><b>User Acceptance Testing (UAT):</b> Allow the client's user community to thoroughly test the programs and provide signoff on POC.</p><p><b>Post-Implementation Support:</b> Once signed off, strategies to proceed with the full-scale conversion of all programs.</p></div><div style="flex:1;text-align:center;"><img src="/assets/strategy.jpg" style="max-width:100%;border-radius:6px;" alt="Strategy"></div></div>`,
          },
          "tool-usage": {
            content: `<div style="font-size:13px;line-height:1.8;color:#333;"><p>&#10148; Identified programs are to be downloaded as text files into a secure folder on a windows machine.</p><p>&#10148; Source and target folders are updated in tool.</p><p>&#10148; Relevant global parameters for conversion are updated one time in the tool.</p><p>&#10148; Call parameters to be updated if the program being converted is a called program.</p><p>&#10148; Any missing parameters identified during tool run time are to be provided like Lrecl, Recfm.</p><p>&#10148; Click on the run button to generate the code.</p><p>&#10148; Outputs are created in folders with name of the program as folder name.</p><p>&#10148; Review the error log file for all info/warnings/errors in the destination folder.</p><p>&#10148; Make relevant calls on the fixes to be made or ignored.</p><p>&#10148; Upload the converted programs to Mainframes.</p><p>&#10148; Delete the corresponding folders.</p></div>`,
          },
          "data-security": {
            content: `<div style="font-size:13px;line-height:1.8;color:#333;"><p>&#10148; AaraTech shall be signing all relevant NDA's, data security compliance agreements as may be needed by clients.</p><p>&#10148; AaraTech shall follow all security restrictions imposed by the client for securing their IP.</p></div>`,
          },
        },
        "expectation-from-clients": {
          heading: "Expectation from Clients",
          content: "<p>Content coming soon. This section can be updated from the admin panel.</p>",
        },
        "performance": {
          heading: "Performance",
          content: "<p>Content coming soon. This section can be updated from the admin panel.</p>",
        },
      },
    },
  },
};
