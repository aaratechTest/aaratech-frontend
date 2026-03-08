import { useState } from "react";
import { INDUSTRIES } from "../../constants/Assets";
import { usePageContent } from "../../hooks/usePageContent";

import {
  FiRefreshCw,
  FiUsers,
  FiCompass,
  FiLayers,
  FiCheckCircle,
  FiZap,
  FiShield,
  FiDollarSign,
} from "react-icons/fi";

import "../../shared/services-shared.css";
import "./ServicesPage.css";

/* ================= HERO TABS DATA ================= */
const heroTabs = [
  {
    key: "legacy",
    title: "Legacy Modernization",
    desc: "Transform legacy systems into modern, scalable, and cloud-ready platforms without disrupting business operations.",
    icon: FiRefreshCw,
  },
  {
    key: "outsourcing",
    title: "IT Services Outsourcing",
    desc: "Reliable IT outsourcing services that reduce operational costs while ensuring quality and faster delivery.",
    icon: FiUsers,
  },
  {
    key: "strategy",
    title: "IT Strategy Consulting",
    desc: "Align technology initiatives with your business vision through expert IT strategy and consulting.",
    icon: FiCompass,
  },
  {
    key: "digital",
    title: "Digital Solutions",
    desc: "End-to-end digital solutions enabling automation, innovation, and measurable growth.",
    icon: FiLayers,
  },
  {
    key: "testing",
    title: "Testing Services",
    desc: "Comprehensive QA and testing services ensuring performance, security, and reliability.",
    icon: FiCheckCircle,
  },
] as const;

type HeroTab = (typeof heroTabs)[number];

/* ================= CHOOSE US TABS DATA ================= */
const chooseUsTabs = [
  {
    key: "different",
    title: "What Makes Us Different",
    list: [
      {
        label: "Fully Customizable",
        description:
          "Parameter-driven configuration lets you adapt the system to your business needs and workflows.",
      },
      {
        label: "Intuitive UI",
        description:
          "User-friendly, workflow-based screens make adoption fast and easy for all team members.",
      },
      {
        label: "Low Setup Cost",
        description:
          "Browser-based deployment reduces infrastructure expenses and speeds up ROI.",
      },
      {
        label: "Easy Integration",
        description:
          "Smooth migration from legacy systems ensures your data and processes stay functional.",
      },
      {
        label: "Proven Expertise",
        description:
          "14+ years in banking and financial tech delivering reliable and high-performing solutions.",
      },
    ],
  },
  {
    key: "why",
    title: "Why Choose Aara Tech?",
    list: [
      {
        label: "Trusted Partner",
        description:
          "We focus on understanding your goals and delivering solutions aligned with your vision.",
      },
      {
        label: "Agile & Innovative",
        description:
          "Flexible approach adapts to changing requirements and ensures faster delivery.",
      },
      {
        label: "Scalable & Secure",
        description:
          "Enterprise-ready solutions that grow with your business and maintain strong security.",
      },
      {
        label: "Dedicated Support",
        description:
          "Ongoing maintenance and assistance to keep operations smooth and minimize downtime.",
      },
      {
        label: "Proven Track Record",
        description:
          "14+ years of successful enterprise system deliveries in banking and financial tech.",
      },
    ],
  },
];

const ServicesPage = () => {
  const { content: sections } = usePageContent("services");
  const [activeTab, setActiveTab] = useState<HeroTab>(heroTabs[0]!);
  const [activeChooseTab, setActiveChooseTab] = useState("different");

  const currentChooseTab = chooseUsTabs.find(
    (tab) => tab.key === activeChooseTab,
  );

  const [activeITTab, setActiveITTab] = useState("app-dev");

  const itServicesTabs = [
    {
      key: "app-dev",
      title: "Application Development & Maintenance",
      content: (
        <>
          <p>
            Application management services include providing the complete
            framework for development and maintenance of applications to support
            your business needs. Aara Tech offers a highly specialized service
            of SDLC Conceptualization by sketching out well-defined and highly
            customized software life cycle process for the client. Utilizing
            this SDLC methodology, Aara Tech closely communicates with clients
            to define business needs and requirements, to create models, and to
            develop/test software applications.
          </p>

          <strong>
            AARA Tech's Software services are extended to the following:
          </strong>
          <ul>
            <li>Strategic Planning and Crisis management</li>
            <li>System Analysis and Designing</li>
            <li>System Engineering and Modeling</li>
            <li>Application and Software development</li>
            <li>Functional Implementation support</li>
          </ul>

          <strong>Our SDLC Methodology</strong>
          <p>
            Aara Tech has a well-defined and mature eight phase application
            development process which comprises the complete SDLC from business
            case analysis to warranty support of the application. This process
            supports a distributed delivery environment wherein work
            responsibilities can be effectively divided between the delivery
            teamsspread across the onsite and offshore locations. Each of the
            development phases can be defined with metrics and subsequently
            tracked which can be used by our customers.
          </p>
        </>
      ),
    },

    {
      key: "enterprise-support",
      title: "Enterprise System Support Services",
      content: (
        <>
          <p>
            Aara Tech Provides a technical support to aid the effective usage of
            applications
          </p>

          <strong>Operations and Production Support</strong>
          <p>
            Our experts' team is trained on numerous support-related skills
            including but not limited to technical skills, problem debugging,
            problem visualization, integration and environment understanding,
            problem simulation, documentation skills and more. We ensure that
            your business critical applications are up and running, providing
            support for 24x7 operations.
          </p>

          <strong>Continuous Improvement</strong>
          <p>
            We make sure that maintenance is for continuous improvement and take
            care of enhancements or improvements to increase the end user
            satisfaction and business potential. We relive you from the
            painstaking experience of re-engineering or migration of existing
            applications.
          </p>
          <strong>Client Benefits</strong>
          <p>
            We bring with us the quality experience in serving top notch banking
            clients that requires vigilant support. Aara Tech turns your
            Application Production support from a nightmare to a
            dream-come-true.
          </p>

          <ul>
            <li>We support your business, not only your systems</li>
            <li>We maintain quality, not only your applications</li>
            <li>
              We bring in our domain expertise and technical excellence to keep
              the cost at a minimum
            </li>
          </ul>
        </>
      ),
    },

    {
      key: "portal-crm",
      title: "Portal & CRM Solutions",
      content: (
        <>
          <p>
            With the renewed focus on managing the business critical information
            that is scattered in multiple documents that organizations have
            received, generated and filed over the years, Aara Tech offers you
            solutions to seamlessly align your business needs within a shorter
            time.
          </p>
          <p>
            With rapid changing technology challenges in mind, we provide
            solutions to manage content that applications can access and
            consume, as services for SOA enabled solutions. This will
            drastically reduce time, effort and cost spent in development and
            testing as well as gain better application portability and
            interoperability.
          </p>
          <p>
            Aara Tech's solutions offers you the industry's best cost effective
            solutions to efficiently reuse the information captured in documents
            and managing the flow, thereby avoiding the synchronization effort
            and the cost of maintaining redundant data at multiple locations.
          </p>
          <p>
            We would cater the document management needs by organizing,
            controlling, accessing, and delivering content more intelligently.
            Information access, Search, Categorization and Rule based extraction
            are no more complicated problems which require complex solutions,
            but you can get the benefits of our competency in offering better,
            cost-effective solutions for these critical areas
          </p>
          <strong>Content Transformation</strong>
          <p>
            Today's vast options for storing and transmitting content through
            channels such as internet, printed material, mobile phones, video
            etc., makes it a challenge for enterprises to deal with content
            transformation techniques. We offer support for seamless approach to
            store, manage and transform contents.
          </p>

          <strong>Business Process Management</strong>
          <p>
            We offer the industry's best solutions in servicing your enterprise
            needs in:
          </p>
          <ul>
            <li>
              Building sophisticated, user-friendly, web based applications for
              forms processing
            </li>
            <li>
              Setting up the business process which can be data-driven and
              completely automated with excellent offerings to business to get
              their timely business performance reports, quick and informative
              dashboards, alerts etc
            </li>
            <li>Handling voluminous mission-critical transactions with ease</li>
          </ul>
          <strong>Enterprise Content Integration</strong>
          <p>
            Accessing information scattered in and out of the enterprise to
            accomplish business goals is a challenge to any organization. We
            offer you solutions that would:
          </p>
          <ul>
            <li>Make information access an effortless play</li>
            <li>
              Organize and make the content of interest available at a mouse
              click distance
            </li>
            <li>
              Ensure that your critical and sensitive information is accessible
              only for safe hands
            </li>
          </ul>
        </>
      ),
    },

    {
      key: "qa",
      title: "Quality Maintenance & Assurance",
      content: (
        <>
          <p>
            We as a team deliver you the best of industry services with highest
            commitment never compromising on quality. Quality assurance is more
            than simply testing and certifying that a software system works. It
            is to guarantee the integrity and reliability of your business
            systems.
          </p>
          <p>
            Aara Tech offers you the quality management and assurance services
            that are carefully planned, and executed in a controlled
            environment, which caters to and exceeds client expectations.
          </p>
          <p>
            "A good plan executed is better than a perfect plan never executed".
            Though organizations define processes, the real challenges are in
            terms of processes not being followed and often overlooked. The lack
            of control over the quality process and a system of feedback from
            the practitioners results in the above issues.
          </p>
          <strong>We at Aara Tech help you in the following processes:</strong>
          <ul>
            <li>
              Develop and review process, policy and other artifacts of your QMS
            </li>
            <li>Conduct pilot implementations in selected projects</li>
            <li>Continuous training & quality governance</li>
            <li>
              Release the QMS policies and ensure a control over the defined
              policies and foster an environment to adhere to the same{" "}
            </li>
            <li>
              Enable quality as a way of delivering solutions by offering
              continuous learning through formal training and knowledge sharing
            </li>
            <li>Plan and conduct internal audits</li>
            <li>Conduct management reviews</li>
            <li>
              Use internal audit report findings to fine tune the QMS policies
              and its implementation
            </li>
          </ul>

          <strong>Client Benefits:</strong>
          <ul>
            <li>Increase productivity</li>
            <li>Eliminate process overheads</li>
            <li>Reduce operational costs</li>
          </ul>
        </>
      ),
    },

    {
      key: "analytics",
      title: "Business Analytics",
      content: (
        <>
          <p>
            We find ourselves at the beginning of the data driven economy.
            Business analytics makes extensive use of data, statistical and
            quantitative analysis, explanatory and predictive modeling and
            fact-based management to drive decision making. We at Aara Tech can
            help leverage your existing legacy infrastructure into a full-blown
            Big-Data Analytics platform, and can convert your once considered
            waste of space data into new revenue streams.
          </p>
          <p>
            Working closely with SME from business and leveraging cutting edge
            technologies, we can help you in the areas of:
          </p>

          <ul>
            <li>Streamlining Business Process</li>
            <li>
              Improve IT Operational efficiency, by continuously monitoring your
              IT infrastructure and predict any outages
            </li>
            <li>Predictive modeling to drive sales</li>
          </ul>

          <strong>Client Benefits:</strong>
          <ul>
            <li>Increase productivity</li>
            <li>Eliminate process overheads</li>
            <li>Reduce operational costs</li>
          </ul>
        </>
      ),
    },
  ];

  const [activestrategyTab, setActivestrategyTab] = useState("Enterprise");

  const itstrategyTabs = [
    {
      key: "Enterprise",
      title: "Enterprise Architecture Consulting",
      content: (
        <>
          <p>
            Aara Tech believes in "Be Proactive rather than Reactive". Rather
            than developing and maintaining multiple, over-complicated,
            desperate software systems to cater business needs, and that cannot
            withstand the volatile market challenges, and technology shocks, we
            offer enterprise consulting services that:
          </p>

          <ul>
            <li>Recognizes solutions from a business perspective</li>
            <li>Identifies similarities between various requirements</li>
            <li>Offers services in a flexible, reusable way</li>
            <li>
              Well-orchestrated Service Oriented Solutions – SOS, complimenting
              the time tested SOA principle
            </li>
          </ul>
          <p>
            Beyond delivering just software as products, services and
            implementations, it is a Aara Tech way of offering clients,
            architectural solutions to :
          </p>
          <ul>
            <li>Improvise performance</li>
            <li>Reduce development time and costs</li>
            <li>Offers services in a flexible, reusable way</li>
            <li>
              Migrate from old to newer technologies to leverage the strengths
              of cutting edge technologies and precluding them from being
              obsolete, through non-disruptive smooth implementations
            </li>
          </ul>
          <strong>Client Benefits:</strong>
          <ul>
            <li>
              Effective use of new technologies and continual optimization helps
              you to be a step ahead with a competitive advantage for sustained
              growth
            </li>
            <li>
              Our flexible architecture design is the key benefit for seamless
              enhancements required for future business growth
            </li>
          </ul>
        </>
      ),
    },

    {
      key: "enterprise-support",
      title: "Business Consulting",
      content: (
        <>
          <p>
            Our Business (IT) Consulting solutions help you understand the impact of technology on your business outcomes and use technology 
            to make your most important strategic initiatives succeed.
          </p>
          <p>
            Our Business Consultants have expertise in strategy, operations and as well as technology. 
            It is this combination of a strategic business expertise combined with technological knowledge that makes us uniquely qualified to address technology issues. 
            Our comprehensive consulting solutions help you optimize the business outcome of your IT efforts with a comprehensive 
            suite of optimization parameters that map to functional initiatives such as:
          </p>

          <ul>
            <li>Business service management</li>
            <li>IT service management</li>
            <li>Service-driven operations</li>
            <li>Workflow Automation</li>
            <li>Quality assurance</li>
            <li>Performance validation
          </li>
          </ul>

          <p>This optimization parameter help you bridge the gap between the business & IT goals, align functional initiatives with strategic initiatives and 
            focus strategic initiatives on business outcomes. 
            This results in optimizing business outcomes and delivering IT efficiency at the same time by:
            </p>
            
          <ul>
            <li>Delivering business services that are highly available and that perform to agreed service levels</li>
            <li>Automating end-to-end processes to speed delivery of services and resolve production problems promptly</li>
            <li>Reducing the risk of both planned and unplanned changes</li>
            <li>Planning service deliverables in the context of resources, value and time-to-market commitments</li>
            <li>Gaining visibility into the actual costs of the IT services delivered in production</li>
            <li>Optimizing the utilization of your capital, people and assets
          </li>
          <li>During business value and IT efficiency at the same time demands that you focus strategic IT initiatives such as application deployments and upgrades on business outcomes</li>
            <li>Align functional initiatives such as portfolio management and SOA transformation with those strategic initiatives</li>
            <li>Automate end-to-end processes across IT organizations to promote collaboration, enable teams to share information and capabilities,and manage change efficiently
</li>
          </ul>
        </>
      ),
    },

    {
      key: "portal-crm",
      title: "Project Management",
      content: (
        <>
          <p>
            Effective project management is a main objective of Aara Tech. The Aara Tech Project Management group works with all levels of the firm's project team to align with the strategic objectives of each project. The Aara Tech project manager will also work at an executive steering group level. To keep management fully informed on the status of the project, the Aara Tech project manager reports to the project steering group on a regular basis, and advises the group on the project progress, financial performance and risk mitigation strategy. The Aara Tech project manager will provide:
          </p>
          <ul>
            <li>Project level strategy</li>
            <li>Gap analysis</li>
            <li>Project work breakdown structure</li>
            <li>Project budgeting and plan development</li>
            <li>Project oversight and management</li>
            <li>Communications
          </li>
          <li>Status reporting</li>
          <li>Risk mitigation</li>
          </ul>
        </>
      ),
    },

    {
      key: "qa",
      title: "Quality Consulting",
      content: (
        <>
          <p>
           Aara Tech is focused on continuous process improvement in a cost effective way by offering the best quality assurance services and solutions on time and on budget.


          </p>
          <p>
            We provide quality consulting services to assist our clients undertake quality improvement initiatives in business and IT solutions. We help you align your enterprise solutions with your customer expectations and deploy best practices, proven successful methodologies, including Six Sigma and CMM processes.
          </p>
          <p>
          Streamlined processes, business-sensitive practices and efficient technology expertise are our secrets of success.We offer Quality Assurance Services with our quality experts in:  
          </p>

          <ul>
            <li>
              Defining new quality processes for high quality deliverables
            </li>
            <li>Leveraging the power of metrics collected to check the fitness of your existing system/policies</li>
            <li>
              Deploying the efficient quality methodologies that uses CMMI quality framework
            </li>
          </ul>

          <strong>Client Benefits:</strong>
          <ul>
            <li>Aara Tech provides guidance for improving your organization processes and your ability to manage the development, maintenance and support of products and services</li>
            <li>We ensure efficient, effective assessment through planned audits and improvement across multiple process disciplines in your organization</li>
            <li>Your business efficiency and quality consistently improves as we ensure that the best practices are incorporated from the key learning of each assessment</li>
          </ul>
        </>
      ),
    },

  
  ];


  const [activeDigitalSolutionsTab, setActiveDigitalSolutionsTab] = useState("Mobilitys");

  const itDigitalSolutionsTabs = [
    {
      key: "Mobilitys",
      title: "Mobility",
      content: (
        <>
          <p>
            New age gadgets like smart phones or tablets are demanding greater pressures on enterprises over the globe, which must be handled with utmost sincerity to move ahead in the competition. Another challenge is to guarantee quality services to customers. We offer full range of services- consulting, design, development, support services to provide solutions for the mobility needs of our customers. We quicken application development and enhance our client's mobile experience with enterprise mobility services platform.
          </p>

          
          <p>
            At Aara Tech, We develop applications for different platforms including Apple iOS, Google Android, Microsoft Windows Mobile, J2ME, and Palm Pre (webOS). Apart from providing native solutions, our products also employ frameworks such as Titanium, PhoneGap, Sencha Touch.


          </p>
          <p>We work with significant organizations over each industry, addressing today’s challenges in a business and opportunities with practical innovations in mobility. We offer an expansive scope of proven end-to-end capabilities and solutions across mobility strategy, mobile application development, testing and other connected products.</p>
        </>
      ),
    },

    {
      key: "Big",
      title: "Big Data Analytics",
      content: (
        <>
          <p>
            With deep industry-specific experience in analytics strategy, implementation and data management, Aara Tech Analytics can help you turn insights into action, and action into tangible results. Big data and analytics can be used for capacity planning and building a predictive network that includes route optimization. A more virtual and globalized world requires businesses to work proactively and anticipate change before it happens. Big data analytics can help businesses meet this challenge, but only if they align tools, processes and organizational structures to advance operational agility and deliver business results.
          </p>
          <p>
           The next generation of retail concepts such as cross, multi, and omni-channel commerce, requires logistics networks tailored to the needs of each single channel. This includes cost efficient, high-quality services achieved through the intelligent use of standard logistics networks and assets. Big Data Analytics is increasingly emerging as a key enabler in helping organizations achieve better customer experience across all channels and providing value across the customer experience life cycle.
          </p>
          <strong>Our Big Data Analytics Service helps you:</strong>

          <ul>
            <li>Ensure a seamless customer experience across products, channels and lifecycle</li>
            <li>Improve customer retention
</li>
            <li>Increase profitability by enhanced customer targeting through cross/up sell</li>
            <li>Launch successful loyalty programs</li>
            <li>Develop new products</li>
            <li>Enhance customer lifetime value
          </li>
          </ul>
        </>
      ),
    },

    {
      key: "cloud",
      title: "Cloud",
      content: (
        <>
          <p>
            The cloud is engaging enterprises to change their businesses– by quickening digital innovation, empowering agile business platforms and shortening time-to-showcase. Cloud is the foundation of a future-ready enterprise. Companies are adopting cloud to profit by the versatility, responsiveness and cost-efficiencies that cloud computing offers. The change to a cloud situation is an important venture undertaking that tremendously affects the way IT associations work and the way benefits are delivered to business users.
          </p>
          <p>Aara Tech's administration puts ventures in good shape to quick and effective cloud adoption while justifying risk and guaranteeing industry compliance. We enable drive to cost savings, adaptability, security and compliance for mission critical applications.</p>
        </>
      ),
    },



  
  ];
 const [activeTestingServicesTab, setActiveTestingServicesTab] = useState("services");

  const itTestingServicesTabs = [
    {
      key: "services",
      title: "Software Testing Services",
      content: (
        <>
        <strong>Services Offered</strong>
          <p>
          A range of services can be offered depending on the nature of application to be tested.

          </p>
          <strong>Preparatory Service</strong>
          <ul>
            <li>Prepare & Review Test Strategy & Plan</li>
            <li>Prepare & Review Test cases
</li>
            <li>Generate Automation scripts</li>
            <li>Create Test Bed (including Extract Criteria)</li>
          </ul>
          <strong>Execution Service</strong>
          <ul>
            <li>Execute & Review Test cases</li>
            <li>Conduct Stress / Performance Test
</li>
            <li>Update Document ( Screen, Report & User Guide)
</li>
          </ul>
          <strong>Analysis Service</strong>
          <ul>
            <li>Analyze the Coverage, Defects, Issues and Performance</li>
            <li>Conduct Regression Analysis
</li>
            <li>Facilitate Next Phase Preparation

</li>
          </ul>
          <strong>Consultancy Service</strong>
          <ul>
            <li>Onshore / offshore consultants to prepare Test Plan</li>
            <li>Onshore / off-shore testers to execute Test cases
</li>
          </ul>
        </>
      ),
    },

    {
      key: "Specialized",
      title: "Specialized Testing Services",
      content: (
        <>
        <strong>Performance Engineering and Testing</strong>
          <p>
          We emphasis on making the right decision for each performance requirement and stage—including engineering, design, implementation and testing—remembering reusability and maintenance. Nowadays it is getting to be a basic learning that all types of software have particular performance requirements that should be considered on the phase of conceptualizing. Performance engineering goes a long way beyond simply testing and monitoring. We have planned it around understanding performance throughout the whole application lifecycle with continuous integration and delivery.          </p>
          <strong>Automation Testing</strong>
          <p>
          With wide experience and expertise, our test automation experts effectively deliver everlasting and simple answers for various types of testing, including unit testing, functional testing, and performance testing. Our capability in creating test automation tools for websites enables us to oversee product complexities and particular project prerequisites. We believe that the Test automation services will be the pivotal asset in driving down general testing cost, while additionally supporting the speeding up of release cycles, so new application features and functionalities can be released faster.

          </p>
          <strong>Digital and Mobility Testing</strong>

          <p>An application needs to be tested on a range of different devices, platforms and operating systems, technologies and networks to ensure that it works as intended in the customers’ end environment. Also, these combinations are always showing signs of change, requiring constant interest in new cell phone combinations. Aara Tech offers end-to-end portable testing services which guarantee that the required clients experience and intended business values are delivered by the suitable mobile solution.</p>

          <strong>Web Service Testing</strong>
          <p>Web services are particular applications that can be distributed and brought over the Web. Unlike the web server applications, web services are not planned for human association, they are usually called by client applications. Testing Web services is guaranteeing their functional quality, since when you string together a set of services, you pave way for numerous errors. Our strong web service testing automation framework enables you to run functional and non-functional tests at the web services layer. The framework lessens testing costs and enables you to rapidly make and automated functional, regression, compliance and load tests.</p>
        </>
      ),
    },

  ];

  
  return (
    <div className="services-scope">
      {/* ================= HERO ================= */}
      <section className="services-hero">
        <div className="hero-overlay" />

        <h1 className="hero-main-title">{sections.hero?.heading ?? "Our Services"}</h1>

        <p className="hero-description">{activeTab.desc}</p>

        <div className="hero-tabs-wrapper">
          {heroTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`hero-tab ${activeTab.key === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}>
              <span className="tab-icon">
                <tab.icon />
              </span>
              <span>{tab.title}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ================= LEGACY MODERNIZATION SECTION ================= */}
      {activeTab.key === "legacy" && (
        <>
          {/* ================= SECTION 1 ================= */}
          <section className="legacy-section-2">
            <div className="section-container-2">
              <div className="section-header-2">
                <span className="section-label-2">Why Modernize</span>
                <h2 className="section-headline-2">
                  <span className="title-red-2">Understand</span>{" "}
                  <span className="title-blue-2">The Core Challenge</span>
                </h2>
                <div className="headline-underline-2"></div>
              </div>

              <div className="features-grid-2">
                <div className="feature-card-2">
                  <div className="card-header-2">
                    <div className="icon-box-2">
                      <FiZap />
                    </div>
                    <h3>Improved Agility</h3>
                  </div>
                  <p>
                    Upgrade legacy platforms to quickly adapt to evolving
                    business demands and market changes.
                  </p>
                </div>

                <div className="feature-card-2">
                  <div className="card-header-2">
                    <div className="icon-box-2">
                      <FiShield />
                    </div>
                    <h3>Higher Reliability</h3>
                  </div>
                  <p>
                    Minimize operational risks and downtime while improving
                    system stability and mission-critical reliability.
                  </p>
                </div>

                <div className="feature-card-2">
                  <div className="card-header-2">
                    <div className="icon-box-2">
                      <FiDollarSign />
                    </div>
                    <h3>Lower Maintenance Cost</h3>
                  </div>
                  <p>
                    Reduce technical debt, simplify operations, and
                    significantly lower long-term maintenance expenses.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= SECTION 2 ================= */}
          <section className="legacy-section-2 split-section-2">
            <div className="section-container-2">
              <div className="section-header-2">
                <span className="section-label-2">
                  Upgrade From Legacy Languages
                </span>
                <h2 className="section-headline-2">
                  <span className="title-red-2">Upgrade From </span>{" "}
                  <span className="title-blue-2">Legacy Languages</span>
                </h2>
                <div className="headline-underline-2"></div>
              </div>
            </div>

            <div className="split-container-2">
              <div className="split-text-2">
                <h3>Is Your Enterprise Still Dependent On Legacy Languages?</h3>
                <p className="split-body-2">
                  AaraTech modernizes your legacy systems—migrating CoolGen / CA
                  Gen and Assembler (HLASM) to Java, C#, or COBOL—while
                  preserving core functionality and ensuring a smooth
                  transition.
                </p>

                <div className="info-box-2">
                  <h3>CoolGen / CA Gen Modernization</h3>
                  <p>
                    We refactor CA Gen applications into modern, maintainable
                    Java or C# systems using proprietary tools and an iterative
                    approach.
                  </p>
                </div>

                <div className="info-box-2">
                  <h3>Assembler Modernization</h3>
                  <p>
                    We migrate Assembler code to modern languages, enabling
                    easier remediation and seamless integration of new
                    technologies.
                  </p>
                </div>
              </div>

              <div className="split-image-2">
                <img src={INDUSTRIES.service} alt="Legacy Technology" />
                <div className="cen">
                  <button className="request-demo-btn">Request Demo</button>
                </div>
              </div>
            </div>
          </section>

          {/* ================= SECTION 3 ================= */}
          <section className="legacy-section-2 split-section-2 approach-section">
            <div className="section-header-2">
              <span className="section-label-2">Our Approach</span>
              <h2 className="section-headline-2">
                <span className="title-red-2">Our</span>{" "}
                <span className="title-blue-2">Approach</span>
              </h2>
              <div className="headline-underline-2"></div>
            </div>

            <div className="split-container-2">
              <div className="split-image-2">
                <img src={INDUSTRIES.approachImg} alt="Our Approach" />
              </div>

              <div className="split-text-2">
                <ul className="approach-list">
                  <li>
                    <strong>Assess:</strong> We analyze your existing system to
                    understand gaps, risks, and modernization needs.
                  </li>
                  <li>
                    <strong>POC & Design:</strong> We create a proof of concept
                    and design the best solution before full development.
                  </li>
                  <li>
                    <strong>Build & Test:</strong> We develop the solution and
                    thoroughly test it to ensure quality and performance.
                  </li>
                  <li>
                    <strong>Deploy:</strong> We launch the modernized
                    application into the live environment with minimal risk.
                  </li>
                  <li>
                    <strong>Support:</strong> We provide ongoing assistance,
                    monitoring, and enhancements after deployment.
                  </li>
                </ul>
              </div>
            </div>
            <div className="cen">
              <button className="request-demo-btn">Request Demo</button>
            </div>
          </section>

          {/* ================= SECTION 4 ================= */}
          <section className="legacy-section-2 split-section-2 choose-us-section">
            <div className="section-header-2">
              <span className="section-label-2">Why Choose Us?</span>
              <h2 className="section-headline-2">
                <span className="title-red-2">Why</span>{" "}
                <span className="title-blue-2">Choose AaraTech?</span>
              </h2>
              <div className="headline-underline-2"></div>
            </div>

            <div className="split-container-2">
              <div className="split-text-2">
                <div className="choose-us-tabs">
                  {chooseUsTabs.map((tab) => (
                    <button
                      key={tab.key}
                      className={`choose-tab ${activeChooseTab === tab.key ? "active" : ""}`}
                      onClick={() => setActiveChooseTab(tab.key)}>
                      {tab.title}
                    </button>
                  ))}
                </div>

                <ul className="choose-us-list">
                  {currentChooseTab?.list.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.label}:</strong> {item.description}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="split-image-2">
                <img src={INDUSTRIES.approachImgs} alt="Why Choose Us" />
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab.key === "outsourcing" && (
        <>
          {/* ================= SECTION 1 ================= */}

          {/* ================= SECTION 2 ================= */}
          <section className="legacy-section-2 split-section-2">
            <div className="section-header-2">
              <span className="section-label-2">IT Services Outsoucing</span>
              <h2 className="section-headline-2">
                <span className="title-red-2">
                  IT Services Outsourcing - Aara Tech
                </span>{" "}
              </h2>
              <div className="headline-underline-2"></div>
            </div>

            <div className="split-container-2">
              <div className="split-text-2">
                <p className="split-body-2 ">
                  The Organizations are progressively striving for higher
                  performance and efficiency by adopting enterprise architecture
                  to achieve strategic objectives such as cost optimization,
                  operational excellence, and IT-enabled business innovation.
                  This strategic approach helps businesses stay agile and
                  competitive in a rapidly evolving digital landscape.
                </p>

                <p className="split-body-2">
                  We provide end-to-end <strong>IT Services</strong> ranging
                  from application development and maintenance to software
                  testing and ongoing support, combined with strong business
                  consulting expertise and right-sourcing strategies. Our
                  integrated service model ensures quality delivery, reduced
                  risk, and faster time to market.
                </p>

                <p className="split-body-2">
                  Our approach delivers enhanced value propositions that improve
                  operational efficiency, enable scalability, and support
                  sustainable business growth. We build long-term partnerships
                  through measurable results and continuous innovation.
                </p>
              </div>

              <div className="split-image-2">
                <img src={INDUSTRIES.service} alt="Legacy Technology" />
                <div className="cen">
                  <button className="request-demo-btn">Request Demo</button>
                </div>
              </div>
            </div>
          </section>

          <section className="it-services-section legacy-section-2 split-section-2">
            <div className="section-header-2">
              <span className="section-label-2">Our Expertise</span>
              <h2 className="section-headline-2">
                <span className="title-red-2">Our</span>{" "}
                <span className="title-blue-2">IT Services</span>
              </h2>
              <div className="headline-underline-2"></div>
            </div>

            <div className="it-services-container">
              <div className="it-services-tabs">
                {itServicesTabs.map((tab) => (
                  <button
                    key={tab.key}
                    className={`it-tab ${activeITTab === tab.key ? "active" : ""}`}
                    onClick={() => setActiveITTab(tab.key)}>
                    {tab.title}
                  </button>
                ))}
              </div>

              <div className="it-services-content">
                {itServicesTabs.find((t) => t.key === activeITTab)?.content}
              </div>
            </div>
          </section>

          {/* ================= SECTION 4 ================= */}
          <section className="legacy-section-2 split-section-2 choose-us-section">
            <div className="section-header-2">
              <span className="section-label-2">Why Choose Us?</span>
              <h2 className="section-headline-2">
                <span className="title-red-2">Why</span>{" "}
                <span className="title-blue-2">Choose AaraTech?</span>
              </h2>
              <div className="headline-underline-2"></div>
            </div>

            <div className="split-container-2">
              <div className="split-text-2">
                <div className="choose-us-tabs">
                  {chooseUsTabs.map((tab) => (
                    <button
                      key={tab.key}
                      className={`choose-tab ${activeChooseTab === tab.key ? "active" : ""}`}
                      onClick={() => setActiveChooseTab(tab.key)}>
                      {tab.title}
                    </button>
                  ))}
                </div>

                <ul className="choose-us-list">
                  {currentChooseTab?.list.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.label}:</strong> {item.description}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="split-image-2">
                <img src={INDUSTRIES.service} alt="Why Choose Us" />
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab.key === "strategy" && (
        <>
          {/* ================= SECTION 1 ================= */}

          {/* ================= SECTION 2 ================= */}
          <section className="legacy-section-2 split-section-2">
            <div className="section-header-2">
              <span className="section-label-2">IT Strategy Consulting</span>
              <h2 className="section-headline-2">
                <span className="title-red-2">
                  IT Strategy Consulting - Aara Tech
                </span>{" "}
              </h2>
              <div className="headline-underline-2"></div>
            </div>

            <div className="split-container-2">
              <div className="split-text-2">
                <p className="split-body-2 ">
                  The Organizations are progressively striving for higher
                  performance and efficiency by adopting enterprise architecture
                  to achieve strategic objectives such as cost optimization,
                  operational excellence, and IT-enabled business innovation.
                  This strategic approach helps businesses stay agile and
                  competitive in a rapidly evolving digital landscape.
                </p>

                <p className="split-body-2">
                  We provide end-to-end <strong>IT Services</strong> ranging
                  from application development and maintenance to software
                  testing and ongoing support, combined with strong business
                  consulting expertise and right-sourcing strategies. Our
                  integrated service model ensures quality delivery, reduced
                  risk, and faster time to market.
                </p>

                <p className="split-body-2">
                  Our approach delivers enhanced value propositions that improve
                  operational efficiency, enable scalability, and support
                  sustainable business growth. We build long-term partnerships
                  through measurable results and continuous innovation.
                </p>
              </div>

              <div className="split-image-2">
                <img src={INDUSTRIES.service} alt="Legacy Technology" />
                <div className="cen">
                  <button className="request-demo-btn">Request Demo</button>
                </div>
              </div>
            </div>
          </section>

          <section className="it-services-section legacy-section-2 split-section-2">
            <div className="section-header-2">
              <span className="section-label-2">Our Expertise</span>
              <h2 className="section-headline-2">
                <span className="title-red-2">Our</span>{" "}
                <span className="title-blue-2">IT Strategy Consulting</span>
              </h2>
              <div className="headline-underline-2"></div>
            </div>

            <div className="it-services-container">
              <div className="it-services-tabs">
                {itstrategyTabs.map((tab) => (
                  <button
                    key={tab.key}
                    className={`it-tab ${activestrategyTab === tab.key ? "active" : ""}`}
                    onClick={() => setActivestrategyTab(tab.key)}>
                    {tab.title}
                  </button>
                ))}
              </div>

              <div className="it-services-content">
                {
                  itstrategyTabs.find((t) => t.key === activestrategyTab)
                    ?.content
                }
              </div>
            </div>
          </section>

          {/* ================= SECTION 4 ================= */}
          <section className="legacy-section-2 split-section-2 choose-us-section">
            <div className="section-header-2">
              <span className="section-label-2">Why Choose Us?</span>
              <h2 className="section-headline-2">
                <span className="title-red-2">Why</span>{" "}
                <span className="title-blue-2">Choose AaraTech?</span>
              </h2>
              <div className="headline-underline-2"></div>
            </div>

            <div className="split-container-2">
              <div className="split-text-2">
                <div className="choose-us-tabs">
                  {chooseUsTabs.map((tab) => (
                    <button
                      key={tab.key}
                      className={`choose-tab ${activeChooseTab === tab.key ? "active" : ""}`}
                      onClick={() => setActiveChooseTab(tab.key)}>
                      {tab.title}
                    </button>
                  ))}
                </div>

                <ul className="choose-us-list">
                  {currentChooseTab?.list.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.label}:</strong> {item.description}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="split-image-2">
                <img src={INDUSTRIES.service} alt="Why Choose Us" />
              </div>
            </div>
          </section>
        </>
      )}

      {activeTab.key === "digital" && (
        <>
          {/* ================= SECTION 1 ================= */}

          {/* ================= SECTION 2 ================= */}
          <section className="legacy-section-2 split-section-2">
            <div className="section-header-2">
              <span className="section-label-2">Digital Solutions</span>
              <h2 className="section-headline-2">
                <span className="title-red-2">
                  Digital Solutions - Aara Tech
                </span>{" "}
              </h2>
              <div className="headline-underline-2"></div>
            </div>

            <div className="split-container-2">
              <div className="split-text-2">
                <p className="split-body-2 ">
                  Digitalization is the total transformation of a business with the assistance of new technologies that can aid in generating revenue and value. For business, it implies digital products and services, and enhanced client encounters, led through digitalized channels from the front office completely through the value chain. The digital revolution has affected ventures broadly on an exceptional scale. Organizations understand the tremendous business value released by a combination of the digital five forces to rethink their organizations in on a very basic level new ways.

                </p>
              </div>

              <div className="split-image-2">
                <img src={INDUSTRIES.service} alt="Legacy Technology" />
                <div className="cen">
                  <button className="request-demo-btn">Request Demo</button>
                </div>
              </div>
            </div>
          </section>

          <section className="it-services-section legacy-section-2 split-section-2">
            <div className="section-header-2">
              <span className="section-label-2">Our Expertise</span>
              <h2 className="section-headline-2">
                <span className="title-red-2">Our</span>{" "}
                <span className="title-blue-2">Digital Solutions</span>
              </h2>
              <div className="headline-underline-2"></div>
            </div>

            <div className="it-services-container">
              <div className="it-services-tabs">
                {itDigitalSolutionsTabs.map((tab) => (
                  <button
                    key={tab.key}
                    className={`it-tab ${activeDigitalSolutionsTab === tab.key ? "active" : ""}`}
                    onClick={() => setActiveDigitalSolutionsTab(tab.key)}>
                    {tab.title}
                  </button>
                ))}
              </div>

              <div className="it-services-content">
                {
                  itDigitalSolutionsTabs.find((t) => t.key === activeDigitalSolutionsTab)
                    ?.content
                }
              </div>
            </div>
          </section>

          {/* ================= SECTION 4 ================= */}
          <section className="legacy-section-2 split-section-2 choose-us-section">
            <div className="section-header-2">
              <span className="section-label-2">Why Choose Us?</span>
              <h2 className="section-headline-2">
                <span className="title-red-2">Why</span>{" "}
                <span className="title-blue-2">Choose AaraTech?</span>
              </h2>
              <div className="headline-underline-2"></div>
            </div>

            <div className="split-container-2">
              <div className="split-text-2">
                <div className="choose-us-tabs">
                  {chooseUsTabs.map((tab) => (
                    <button
                      key={tab.key}
                      className={`choose-tab ${activeChooseTab === tab.key ? "active" : ""}`}
                      onClick={() => setActiveChooseTab(tab.key)}>
                      {tab.title}
                    </button>
                  ))}
                </div>

                <ul className="choose-us-list">
                  {currentChooseTab?.list.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.label}:</strong> {item.description}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="split-image-2">
                <img src={INDUSTRIES.service} alt="Why Choose Us" />
              </div>
            </div>
          </section>
        </>
      )}
{activeTab.key === "testing" && (
        <>
          {/* ================= SECTION 1 ================= */}

          {/* ================= SECTION 2 ================= */}
          <section className="legacy-section-2 split-section-2">
            <div className="section-header-2">
              <span className="section-label-2">Testing Services</span>
              <h2 className="section-headline-2">
                <span className="title-red-2">
                  Testing Services - Aara Tech
                </span>{" "}
              </h2>
              <div className="headline-underline-2"></div>
            </div>

            <div className="split-container-2">
              <div className="split-text-2">
                <p className="split-body-2 ">
                 Aara Tech helps companies transform testing into a continuous and efficient end-to-end quality engineering function to shape their digital future and lead their industry. The current business environment demands complex and dynamic solutions in less time and with limited resources. Our services help software vendors and business software users assure that their software is functionally perfect.
                </p>
                <p className="split-body-2 ">
                  Our Specialized Testing Services were used as a base to tailor customer specific solutions. We provide the following functional testing services.
                </p>
                <p className="split-body-2 ">
                  End to End Testing: From testing prerequisites to test execution, with extensive reporting and administration.
Functionality Testing – Feature validation of an entire function or component of your product.
System Integration Testing – Product functionality performance testing in an integrated environment through thorough module testing and interaction with external systems.
Regression Testing – Correction of product defects for each new release and guaranteeing that no new quality issues are found.

</p>
              </div>

              <div className="split-image-2">
                <img src={INDUSTRIES.service} alt="Legacy Technology" />
                <div className="cen">
                  <button className="request-demo-btn">Request Demo</button>
                </div>
              </div>
            </div>



          </section>

          <section className="it-services-section legacy-section-2 split-section-2">
            <div className="section-header-2">
              <span className="section-label-2">Our Expertise</span>
              <h2 className="section-headline-2">
                <span className="title-red-2">Our</span>{" "}
                <span className="title-blue-2">Testing Services</span>
              </h2>
              <div className="headline-underline-2"></div>
            </div>

            <div className="it-services-container">
              <div className="it-services-tabs">
                {itTestingServicesTabs.map((tab) => (
                  <button
                    key={tab.key}
                    className={`it-tab ${activeTestingServicesTab === tab.key ? "active" : ""}`}
                    onClick={() => setActiveTestingServicesTab(tab.key)}>
                    {tab.title}
                  </button>
                ))}
              </div>

              <div className="it-services-content">
                {
                  itTestingServicesTabs.find((t) => t.key === activeTestingServicesTab)
                    ?.content
                }
              </div>
            </div>
          </section>

          {/* ================= SECTION 4 ================= */}
          <section className="legacy-section-2 split-section-2 choose-us-section">
            <div className="section-header-2">
              <span className="section-label-2">Why Choose Us?</span>
              <h2 className="section-headline-2">
                <span className="title-red-2">Why</span>{" "}
                <span className="title-blue-2">Choose AaraTech?</span>
              </h2>
              <div className="headline-underline-2"></div>
            </div>

            <div className="split-container-2">
              <div className="split-text-2">
                <div className="choose-us-tabs">
                  {chooseUsTabs.map((tab) => (
                    <button
                      key={tab.key}
                      className={`choose-tab ${activeChooseTab === tab.key ? "active" : ""}`}
                      onClick={() => setActiveChooseTab(tab.key)}>
                      {tab.title}
                    </button>
                  ))}
                </div>

                <ul className="choose-us-list">
                  {currentChooseTab?.list.map((item, idx) => (
                    <li key={idx}>
                      <strong>{item.label}:</strong> {item.description}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="split-image-2">
                <img src={INDUSTRIES.service} alt="Why Choose Us" />
              </div>
            </div>
          </section>
        </>
      )}
      {/* ================= FOOTER CTA ================= */}
      <section className="footer-cta-section">
        <div className="footer-cta-container">
          <h2 className="footer-cta-headline">
            {sections.cta?.heading ?? "What can we help you to achieve today?"}
          </h2>
          <button className="footer-cta-btn">{sections.cta?.buttonText ?? "CONTACT"}</button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
