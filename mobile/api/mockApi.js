var techSkillsBase = [
  {
    id: 't1', name: 'Artificial Intelligence', shortName: 'AI', icon: '🤖',
    baseGrowth: 42, baseDemand: 95, baseTrendScore: 98,
    color: '#6366f1', secondaryColor: '#818cf8',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=400&fit=crop',
    monthlyData: [65, 70, 75, 78, 82, 88, 92, 95, 98, 102, 108, 115],
    description: 'Machine learning, deep learning, and generative AI technologies transforming every industry.',
    longDescription: 'Artificial Intelligence is revolutionizing industries from healthcare to finance. With the rise of GPT models, computer vision, and autonomous systems, AI engineers are among the most sought-after professionals globally.',
    topCompanies: ['Google DeepMind', 'OpenAI', 'Microsoft', 'NVIDIA', 'Meta AI'],
    certifications: ['Google AI Professional', 'AWS ML Specialty', 'TensorFlow Developer', 'Azure AI Engineer'],
    learningPath: ['Python Programming', 'Statistics & Math', 'Machine Learning Basics', 'Deep Learning', 'Specialization'],
    salaryRange: { min: 95000, max: 220000 },
    experienceLevels: { entry: 85000, mid: 145000, senior: 210000, lead: 280000 },
    remotePercentage: 78, freelanceOpportunity: 65,
    futureOutlook: 'Explosive growth expected through 2030 with AGI research advancing rapidly.',
    relatedSkills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision']
  },
  {
    id: 't2', name: 'Data Analytics', shortName: 'Data', icon: '📊',
    baseGrowth: 35, baseDemand: 88, baseTrendScore: 91,
    color: '#06b6d4', secondaryColor: '#22d3ee',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop',
    monthlyData: [50, 55, 58, 62, 65, 70, 73, 78, 82, 85, 88, 92],
    description: 'Data visualization, statistical analysis, and business intelligence for data-driven decisions.',
    longDescription: 'Data Analytics combines statistical analysis, data visualization, and business intelligence to extract actionable insights.',
    topCompanies: ['Tableau', 'Snowflake', 'Databricks', 'Palantir', 'Looker'],
    certifications: ['Google Data Analytics', 'IBM Data Analyst', 'Tableau Desktop Specialist', 'Power BI Analyst'],
    learningPath: ['Excel & SQL', 'Statistics', 'Python/R', 'Visualization Tools', 'Business Intelligence'],
    salaryRange: { min: 65000, max: 160000 },
    experienceLevels: { entry: 62000, mid: 95000, senior: 140000, lead: 185000 },
    remotePercentage: 72, freelanceOpportunity: 58,
    futureOutlook: 'Steady demand as every company becomes data-driven.',
    relatedSkills: ['SQL', 'Python', 'Tableau', 'Power BI', 'Excel']
  },
  {
    id: 't3', name: 'Cloud Computing', shortName: 'Cloud', icon: '☁️',
    baseGrowth: 38, baseDemand: 92, baseTrendScore: 89,
    color: '#8b5cf6', secondaryColor: '#a78bfa',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop',
    monthlyData: [60, 63, 67, 70, 74, 78, 80, 83, 86, 89, 91, 94],
    description: 'AWS, Azure, GCP, and cloud-native architectures powering modern infrastructure.',
    longDescription: 'Cloud Computing has become the backbone of modern IT infrastructure.',
    topCompanies: ['Amazon AWS', 'Microsoft Azure', 'Google Cloud', 'IBM Cloud', 'Oracle Cloud'],
    certifications: ['AWS Solutions Architect', 'Azure Administrator', 'GCP Professional', 'CKA Kubernetes'],
    learningPath: ['Networking Basics', 'Linux', 'Cloud Fundamentals', 'Architecture Design', 'DevOps Integration'],
    salaryRange: { min: 80000, max: 195000 },
    experienceLevels: { entry: 75000, mid: 125000, senior: 175000, lead: 230000 },
    remotePercentage: 82, freelanceOpportunity: 55,
    futureOutlook: 'Multi-cloud and edge computing driving next wave.',
    relatedSkills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Linux']
  },
  {
    id: 't4', name: 'Cybersecurity', shortName: 'Security', icon: '🔐',
    baseGrowth: 33, baseDemand: 90, baseTrendScore: 87,
    color: '#10b981', secondaryColor: '#34d399',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200&h=400&fit=crop',
    monthlyData: [45, 48, 52, 56, 60, 63, 67, 72, 76, 80, 84, 88],
    description: 'Network security, ethical hacking, threat detection, and zero-trust architecture.',
    longDescription: 'With cyber threats growing exponentially, cybersecurity professionals are critical to every organization.',
    topCompanies: ['CrowdStrike', 'Palo Alto Networks', 'Fortinet', 'Splunk', 'Mandiant'],
    certifications: ['CISSP', 'CEH', 'CompTIA Security+', 'OSCP', 'CISM'],
    learningPath: ['Networking', 'Operating Systems', 'Security Fundamentals', 'Ethical Hacking', 'Incident Response'],
    salaryRange: { min: 75000, max: 200000 },
    experienceLevels: { entry: 72000, mid: 115000, senior: 165000, lead: 220000 },
    remotePercentage: 68, freelanceOpportunity: 50,
    futureOutlook: 'Critical shortage of 3.5M professionals. AI-powered security emerging fast.',
    relatedSkills: ['Networking', 'Linux', 'Python', 'SIEM', 'Penetration Testing']
  },
  {
    id: 't5', name: 'Blockchain & Web3', shortName: 'Web3', icon: '⛓️',
    baseGrowth: 28, baseDemand: 72, baseTrendScore: 75,
    color: '#f59e0b', secondaryColor: '#fbbf24',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=1200&h=400&fit=crop',
    monthlyData: [30, 35, 40, 48, 55, 52, 58, 62, 60, 65, 68, 72],
    description: 'Smart contracts, DeFi, decentralized applications, and tokenization.',
    longDescription: 'Blockchain technology extends far beyond cryptocurrency.',
    topCompanies: ['Coinbase', 'ConsenSys', 'Chainlink', 'Polygon', 'Ripple'],
    certifications: ['Certified Blockchain Developer', 'Ethereum Developer', 'Hyperledger Certification'],
    learningPath: ['JavaScript', 'Solidity', 'Smart Contracts', 'DeFi Protocols', 'dApp Development'],
    salaryRange: { min: 85000, max: 210000 },
    experienceLevels: { entry: 80000, mid: 130000, senior: 185000, lead: 250000 },
    remotePercentage: 88, freelanceOpportunity: 75,
    futureOutlook: 'Institutional adoption growing.',
    relatedSkills: ['Solidity', 'JavaScript', 'Rust', 'Ethereum', 'DeFi']
  },
  {
    id: 't6', name: 'DevOps & SRE', shortName: 'DevOps', icon: '⚙️',
    baseGrowth: 30, baseDemand: 85, baseTrendScore: 83,
    color: '#ef4444', secondaryColor: '#f87171',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=400&fit=crop',
    monthlyData: [55, 58, 60, 63, 66, 69, 72, 74, 77, 80, 83, 86],
    description: 'CI/CD pipelines, containerization, infrastructure as code, and site reliability.',
    longDescription: 'DevOps bridges the gap between development and operations.',
    topCompanies: ['Netflix', 'Google', 'Amazon', 'GitLab', 'HashiCorp'],
    certifications: ['AWS DevOps Professional', 'Docker Certified', 'CKA/CKAD', 'Terraform Associate'],
    learningPath: ['Linux & Scripting', 'Git & CI/CD', 'Containers', 'Orchestration', 'Monitoring & SRE'],
    salaryRange: { min: 80000, max: 190000 },
    experienceLevels: { entry: 78000, mid: 120000, senior: 165000, lead: 210000 },
    remotePercentage: 80, freelanceOpportunity: 45,
    futureOutlook: 'Platform engineering emerging as next evolution.',
    relatedSkills: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Ansible']
  }
];

var nonTechSkillsBase = [
  {
    id: 'n1', name: 'Digital Marketing', shortName: 'Marketing', icon: '📱',
    baseGrowth: 30, baseDemand: 85, baseTrendScore: 88,
    color: '#ec4899', secondaryColor: '#f472b6',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&h=400&fit=crop',
    monthlyData: [40, 44, 48, 52, 55, 60, 64, 68, 72, 76, 80, 85],
    description: 'SEO, social media marketing, content strategy, and performance marketing.',
    longDescription: 'Digital Marketing encompasses all marketing efforts using digital channels.',
    topCompanies: ['HubSpot', 'Salesforce', 'Google', 'Meta', 'Adobe'],
    certifications: ['Google Ads Certification', 'HubSpot Inbound', 'Meta Blueprint', 'Google Analytics'],
    learningPath: ['Marketing Fundamentals', 'SEO/SEM', 'Social Media', 'Content Strategy', 'Analytics & Optimization'],
    salaryRange: { min: 45000, max: 130000 },
    experienceLevels: { entry: 45000, mid: 75000, senior: 110000, lead: 155000 },
    remotePercentage: 85, freelanceOpportunity: 80,
    futureOutlook: 'AI-powered marketing tools transforming the field.',
    relatedSkills: ['SEO', 'Google Ads', 'Social Media', 'Analytics', 'Content Writing']
  },
  {
    id: 'n2', name: 'Project Management', shortName: 'PM', icon: '📋',
    baseGrowth: 25, baseDemand: 82, baseTrendScore: 80,
    color: '#3b82f6', secondaryColor: '#60a5fa',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=400&fit=crop',
    monthlyData: [50, 52, 55, 57, 60, 63, 66, 69, 72, 75, 78, 82],
    description: 'Agile, Scrum, and strategic project leadership for complex initiatives.',
    longDescription: 'Project Management professionals lead cross-functional teams to deliver projects on time.',
    topCompanies: ['McKinsey', 'Deloitte', 'PwC', 'Atlassian', 'Monday.com'],
    certifications: ['PMP', 'Certified Scrum Master', 'PMI-ACP', 'PRINCE2'],
    learningPath: ['PM Basics', 'Agile & Scrum', 'Risk Management', 'Stakeholder Management', 'Portfolio Strategy'],
    salaryRange: { min: 60000, max: 155000 },
    experienceLevels: { entry: 58000, mid: 90000, senior: 130000, lead: 175000 },
    remotePercentage: 70, freelanceOpportunity: 55,
    futureOutlook: 'Hybrid project management combining Agile and traditional approaches.',
    relatedSkills: ['Agile', 'Scrum', 'Jira', 'Leadership', 'Risk Management']
  },
  {
    id: 'n3', name: 'UX/UI Design', shortName: 'Design', icon: '🎨',
    baseGrowth: 32, baseDemand: 87, baseTrendScore: 85,
    color: '#a855f7', secondaryColor: '#c084fc',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=400&fit=crop',
    monthlyData: [42, 46, 50, 54, 58, 63, 67, 71, 75, 79, 83, 87],
    description: 'User research, wireframing, interaction design, and design systems.',
    longDescription: 'UX/UI Designers create intuitive, accessible, and visually appealing digital experiences.',
    topCompanies: ['Apple', 'Figma', 'Airbnb', 'Spotify', 'Stripe'],
    certifications: ['Google UX Design', 'Nielsen Norman UX', 'Interaction Design Foundation', 'Adobe Certified'],
    learningPath: ['Design Principles', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    salaryRange: { min: 55000, max: 150000 },
    experienceLevels: { entry: 55000, mid: 85000, senior: 125000, lead: 170000 },
    remotePercentage: 82, freelanceOpportunity: 75,
    futureOutlook: 'AI design tools augmenting capabilities.',
    relatedSkills: ['Figma', 'Sketch', 'Prototyping', 'User Research', 'Design Systems']
  },
  {
    id: 'n4', name: 'Content Creation', shortName: 'Content', icon: '✍️',
    baseGrowth: 28, baseDemand: 78, baseTrendScore: 82,
    color: '#14b8a6', secondaryColor: '#2dd4bf',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=400&fit=crop',
    monthlyData: [35, 38, 42, 46, 50, 55, 58, 62, 66, 70, 74, 78],
    description: 'Video production, copywriting, brand storytelling, and multimedia content.',
    longDescription: 'Content Creation spans video production, blogging, podcast hosting, copywriting, and social media.',
    topCompanies: ['YouTube', 'Netflix', 'TikTok', 'Substack', 'Medium'],
    certifications: ['HubSpot Content Marketing', 'YouTube Creator Academy', 'Copywriting Mastery'],
    learningPath: ['Writing Fundamentals', 'Video Production', 'SEO Content', 'Storytelling', 'Multi-platform Strategy'],
    salaryRange: { min: 40000, max: 120000 },
    experienceLevels: { entry: 40000, mid: 65000, senior: 95000, lead: 140000 },
    remotePercentage: 90, freelanceOpportunity: 85,
    futureOutlook: 'Short-form video dominating. AI writing assistants changing content workflow.',
    relatedSkills: ['Copywriting', 'Video Editing', 'SEO', 'Storytelling', 'Social Media']
  },
  {
    id: 'n5', name: 'Business Analysis', shortName: 'BA', icon: '💼',
    baseGrowth: 22, baseDemand: 80, baseTrendScore: 77,
    color: '#f97316', secondaryColor: '#fb923c',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=400&fit=crop',
    monthlyData: [48, 50, 52, 55, 58, 61, 64, 67, 70, 73, 76, 80],
    description: 'Requirements gathering, process optimization, and stakeholder management.',
    longDescription: 'Business Analysts bridge the gap between business needs and technology solutions.',
    topCompanies: ['McKinsey', 'BCG', 'Bain', 'Accenture', 'Deloitte'],
    certifications: ['CBAP', 'PMI-PBA', 'IIBA Certification', 'Six Sigma Green Belt'],
    learningPath: ['Business Fundamentals', 'Requirements Analysis', 'Process Modeling', 'Data Analysis', 'Strategic Planning'],
    salaryRange: { min: 55000, max: 140000 },
    experienceLevels: { entry: 55000, mid: 82000, senior: 120000, lead: 160000 },
    remotePercentage: 65, freelanceOpportunity: 50,
    futureOutlook: 'Digital transformation creating massive demand.',
    relatedSkills: ['SQL', 'Excel', 'BPMN', 'Stakeholder Mgmt', 'Agile']
  },
  {
    id: 'n6', name: 'Sales & Negotiation', shortName: 'Sales', icon: '🤝',
    baseGrowth: 20, baseDemand: 75, baseTrendScore: 73,
    color: '#84cc16', secondaryColor: '#a3e635',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    bannerImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=400&fit=crop',
    monthlyData: [44, 46, 48, 50, 53, 56, 59, 62, 65, 68, 72, 75],
    description: 'B2B sales, consultative selling, deal closure, and relationship building.',
    longDescription: 'Sales professionals drive revenue growth through relationship building and strategic negotiation.',
    topCompanies: ['Salesforce', 'HubSpot', 'Oracle', 'SAP', 'LinkedIn'],
    certifications: ['Certified Sales Professional', 'HubSpot Sales', 'Sandler Training', 'SPIN Selling'],
    learningPath: ['Communication Skills', 'Product Knowledge', 'CRM Tools', 'Negotiation', 'Strategic Selling'],
    salaryRange: { min: 45000, max: 180000 },
    experienceLevels: { entry: 45000, mid: 80000, senior: 130000, lead: 200000 },
    remotePercentage: 55, freelanceOpportunity: 40,
    futureOutlook: 'AI sales assistants augmenting performance.',
    relatedSkills: ['CRM', 'Communication', 'Negotiation', 'Prospecting', 'Closing']
  }
];

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function addRandomVariation(value, maxVariation) {
  if (!maxVariation) maxVariation = 5;
  var variation = (Math.random() - 0.5) * 2 * maxVariation;
  return Math.max(0, Math.min(100, Math.round(value + variation)));
}

function generateDynamicSkills(baseSkills) {
  return baseSkills.map(function(skill) {
    var growth = addRandomVariation(skill.baseGrowth, 4);
    var demand = addRandomVariation(skill.baseDemand, 3);
    var trendScore = addRandomVariation(skill.baseTrendScore, 3);
    var monthlyTrend = skill.monthlyData.map(function(val, idx) {
      return { month: months[idx], value: addRandomVariation(val, 3), projected: idx >= 9 ? addRandomVariation(val + 5, 4) : null };
    });
    var demandLevel = demand >= 90 ? 'Very High' : demand >= 75 ? 'High' : demand >= 60 ? 'Medium' : 'Low';
    var jobOpenings = Math.round((demand / 100) * 15000 + Math.random() * 2000);
    var avgSalary = Math.round(skill.salaryRange.min + (demand / 100) * (skill.salaryRange.max - skill.salaryRange.min) + Math.random() * 5000);
    return Object.assign({}, skill, { growth, demand, trendScore, demandLevel, monthlyTrend, jobOpenings, avgSalary, lastUpdated: new Date().toISOString() });
  });
}

function generateCategorySummary(skills) {
  var avgGrowth = Math.round(skills.reduce(function(sum, s) { return sum + s.growth; }, 0) / skills.length);
  var avgDemand = Math.round(skills.reduce(function(sum, s) { return sum + s.demand; }, 0) / skills.length);
  var totalJobs = skills.reduce(function(sum, s) { return sum + s.jobOpenings; }, 0);
  var topSkill = skills.reduce(function(top, s) { return s.trendScore > top.trendScore ? s : top; }, skills[0]);
  var avgSalary = Math.round(skills.reduce(function(sum, s) { return sum + s.avgSalary; }, 0) / skills.length);
  return { avgGrowth, avgDemand, totalJobs, topSkill: topSkill.name, topSkillIcon: topSkill.icon, skillCount: skills.length, avgSalary };
}

function simulateDelay(min, max) {
  if (!min) min = 300;
  if (!max) max = 800;
  return new Promise(function(resolve) { setTimeout(resolve, Math.random() * (max - min) + min); });
}

export var fetchCategories = function() {
  return simulateDelay(200, 500).then(function() {
    var techSkills = generateDynamicSkills(techSkillsBase);
    var nonTechSkills = generateDynamicSkills(nonTechSkillsBase);
    return [
      { id: 'tech', name: 'Tech', fullName: 'Technology & Engineering', icon: '💻', description: 'Cutting-edge technology skills powering the digital revolution', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop', summary: generateCategorySummary(techSkills), skillCount: techSkills.length, highlights: ['AI Revolution', 'Cloud-Native', 'Zero Trust Security'] },
      { id: 'non-tech', name: 'Non-Tech', fullName: 'Business & Creative', icon: '🎯', description: 'Essential business and creative skills driving organizational success', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop', summary: generateCategorySummary(nonTechSkills), skillCount: nonTechSkills.length, highlights: ['Creator Economy', 'AI Marketing', 'Remote Leadership'] }
    ];
  });
};

export var fetchSkillsByCategory = function(categoryId) {
  return simulateDelay(400, 900).then(function() {
    if (categoryId === 'tech') return generateDynamicSkills(techSkillsBase);
    if (categoryId === 'non-tech') return generateDynamicSkills(nonTechSkillsBase);
    throw new Error('Category not found');
  });
};
