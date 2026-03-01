import { Company, Role, Question } from '../types/interview';

export const COMPANIES: Company[] = [
  { id: 'google', name: 'Google', logo: '🔵', color: '#4285F4' },
  { id: 'amazon', name: 'Amazon', logo: '📦', color: '#FF9900' },
  { id: 'microsoft', name: 'Microsoft', logo: '🪟', color: '#00A4EF' },
  { id: 'meta', name: 'Meta', logo: '👤', color: '#0668E1' },
  { id: 'apple', name: 'Apple', logo: '🍎', color: '#555555' },
  { id: 'netflix', name: 'Netflix', logo: '🎬', color: '#E50914' },
  { id: 'uber', name: 'Uber', logo: '🚗', color: '#000000' },
  { id: 'airbnb', name: 'Airbnb', logo: '🏠', color: '#FF5A5F' },
  { id: 'spotify', name: 'Spotify', logo: '🎵', color: '#1DB954' },
  { id: 'twitter', name: 'Twitter/X', logo: '🐦', color: '#1DA1F2' },
  { id: 'general', name: 'General', logo: '💼', color: '#6366f1' },
];

export const ROLES: Role[] = [
  { 
    id: 'software_engineer', 
    name: 'Software Engineer', 
    icon: '💻',
    description: 'Coding, system design & problem solving'
  },
  { 
    id: 'frontend_developer', 
    name: 'Frontend Developer', 
    icon: '🎨',
    description: 'UI/UX, React, JavaScript & CSS'
  },
  { 
    id: 'backend_developer', 
    name: 'Backend Developer', 
    icon: '⚙️',
    description: 'APIs, databases & server architecture'
  },
  { 
    id: 'fullstack_developer', 
    name: 'Full Stack Developer', 
    icon: '🔄',
    description: 'End-to-end development'
  },
  { 
    id: 'data_scientist', 
    name: 'Data Scientist', 
    icon: '📊',
    description: 'ML, analytics & statistical modeling'
  },
  { 
    id: 'product_manager', 
    name: 'Product Manager', 
    icon: '📋',
    description: 'Strategy, roadmaps & stakeholder management'
  },
  { 
    id: 'devops_engineer', 
    name: 'DevOps Engineer', 
    icon: '🔧',
    description: 'CI/CD, cloud & infrastructure'
  },
  { 
    id: 'mobile_developer', 
    name: 'Mobile Developer', 
    icon: '📱',
    description: 'iOS, Android & React Native'
  },
  { 
    id: 'qa_engineer', 
    name: 'QA Engineer', 
    icon: '🧪',
    description: 'Testing, automation & quality assurance'
  },
  { 
    id: 'ui_ux_designer', 
    name: 'UI/UX Designer', 
    icon: '✏️',
    description: 'Design systems, prototyping & user research'
  },
];

// Questions organized by company and role
export const QUESTIONS_DATABASE: Record<string, Record<string, Question[]>> = {
  // GOOGLE
  google: {
    software_engineer: [
      { id: 1, text: "How would you design Google Search's autocomplete feature?", category: 'System Design', difficulty: 'Hard' },
      { id: 2, text: "Explain how you would optimize a function that runs millions of times per second.", category: 'Performance', difficulty: 'Hard' },
      { id: 3, text: "Describe a time you had to make a decision with incomplete data. How did you handle it?", category: 'Behavioral', difficulty: 'Medium' },
      { id: 4, text: "How would you design a URL shortener like bit.ly?", category: 'System Design', difficulty: 'Medium' },
      { id: 5, text: "Tell me about Google's culture. Why do you want to work here?", category: 'Culture Fit', difficulty: 'Easy' },
    ],
    frontend_developer: [
      { id: 1, text: "How would you optimize the performance of a React application with thousands of components?", category: 'Performance', difficulty: 'Hard' },
      { id: 2, text: "Explain how Google's Material Design principles influence your UI decisions.", category: 'Design', difficulty: 'Medium' },
      { id: 3, text: "How would you implement infinite scroll for Google Images?", category: 'Technical', difficulty: 'Medium' },
      { id: 4, text: "Describe your approach to making web applications accessible.", category: 'Accessibility', difficulty: 'Medium' },
      { id: 5, text: "How do you handle state management in large-scale applications?", category: 'Architecture', difficulty: 'Hard' },
    ],
    product_manager: [
      { id: 1, text: "How would you improve Google Maps for users in rural areas?", category: 'Product Sense', difficulty: 'Hard' },
      { id: 2, text: "Describe how you would prioritize features for Gmail's next release.", category: 'Prioritization', difficulty: 'Medium' },
      { id: 3, text: "How would you measure success for YouTube Shorts?", category: 'Metrics', difficulty: 'Medium' },
      { id: 4, text: "Tell me about a product you launched. What metrics did you track?", category: 'Experience', difficulty: 'Medium' },
      { id: 5, text: "How would you decide whether to build, buy, or partner for a new feature?", category: 'Strategy', difficulty: 'Hard' },
    ],
    data_scientist: [
      { id: 1, text: "How would you design a recommendation system for YouTube?", category: 'ML Design', difficulty: 'Hard' },
      { id: 2, text: "Explain how you would detect fake reviews on Google Play Store.", category: 'Problem Solving', difficulty: 'Hard' },
      { id: 3, text: "How would you A/B test a new search ranking algorithm?", category: 'Experimentation', difficulty: 'Medium' },
      { id: 4, text: "Describe how you would handle imbalanced datasets in classification.", category: 'Technical', difficulty: 'Medium' },
      { id: 5, text: "How do you communicate complex findings to non-technical stakeholders?", category: 'Communication', difficulty: 'Easy' },
    ],
  },
  
  // AMAZON
  amazon: {
    software_engineer: [
      { id: 1, text: "Tell me about a time you had to meet a tight deadline. How did you handle it? (Customer Obsession)", category: 'Leadership Principles', difficulty: 'Medium' },
      { id: 2, text: "Describe a situation where you took ownership of a project beyond your responsibilities. (Ownership)", category: 'Leadership Principles', difficulty: 'Medium' },
      { id: 3, text: "How would you design Amazon's shopping cart system?", category: 'System Design', difficulty: 'Hard' },
      { id: 4, text: "Tell me about a time you had to dive deep into a problem to find the root cause. (Dive Deep)", category: 'Leadership Principles', difficulty: 'Medium' },
      { id: 5, text: "Describe a time when you had to make a decision quickly with limited information. (Bias for Action)", category: 'Leadership Principles', difficulty: 'Medium' },
    ],
    frontend_developer: [
      { id: 1, text: "How would you optimize the Amazon product page for faster load times?", category: 'Performance', difficulty: 'Hard' },
      { id: 2, text: "Describe how you would implement a real-time inventory update system.", category: 'Technical', difficulty: 'Medium' },
      { id: 3, text: "Tell me about a time you simplified a complex user interface.", category: 'UX', difficulty: 'Medium' },
      { id: 4, text: "How do you ensure your frontend code is scalable and maintainable?", category: 'Architecture', difficulty: 'Medium' },
      { id: 5, text: "Describe your approach to handling errors gracefully in the UI.", category: 'Best Practices', difficulty: 'Easy' },
    ],
    product_manager: [
      { id: 1, text: "How would you improve the Amazon Prime membership experience?", category: 'Product Sense', difficulty: 'Hard' },
      { id: 2, text: "Tell me about a time you had to say no to a customer request.", category: 'Prioritization', difficulty: 'Medium' },
      { id: 3, text: "How would you reduce shopping cart abandonment on Amazon?", category: 'Metrics', difficulty: 'Medium' },
      { id: 4, text: "Describe how you would launch a new product category on Amazon.", category: 'Go-to-Market', difficulty: 'Hard' },
      { id: 5, text: "How do you balance customer needs with business objectives?", category: 'Strategy', difficulty: 'Medium' },
    ],
    data_scientist: [
      { id: 1, text: "How would you design a fraud detection system for Amazon payments?", category: 'ML Design', difficulty: 'Hard' },
      { id: 2, text: "Describe how you would build a product recommendation engine.", category: 'ML Design', difficulty: 'Hard' },
      { id: 3, text: "How would you measure the impact of a new pricing algorithm?", category: 'Metrics', difficulty: 'Medium' },
      { id: 4, text: "Tell me about a time you used data to influence a business decision.", category: 'Impact', difficulty: 'Medium' },
      { id: 5, text: "How do you handle missing data in large datasets?", category: 'Technical', difficulty: 'Easy' },
    ],
  },
  
  // MICROSOFT
  microsoft: {
    software_engineer: [
      { id: 1, text: "How would you design a collaborative document editing system like Microsoft Word Online?", category: 'System Design', difficulty: 'Hard' },
      { id: 2, text: "Describe your experience with cloud services and Azure.", category: 'Technical', difficulty: 'Medium' },
      { id: 3, text: "Tell me about a time you mentored a junior developer.", category: 'Leadership', difficulty: 'Medium' },
      { id: 4, text: "How do you approach writing testable and maintainable code?", category: 'Best Practices', difficulty: 'Medium' },
      { id: 5, text: "Describe a complex technical problem you solved recently.", category: 'Problem Solving', difficulty: 'Medium' },
    ],
    frontend_developer: [
      { id: 1, text: "How would you implement a rich text editor like in Microsoft Office Online?", category: 'Technical', difficulty: 'Hard' },
      { id: 2, text: "Describe your experience with TypeScript in large-scale applications.", category: 'Technical', difficulty: 'Medium' },
      { id: 3, text: "How do you ensure cross-browser compatibility?", category: 'Best Practices', difficulty: 'Easy' },
      { id: 4, text: "Tell me about a challenging UI/UX problem you solved.", category: 'Problem Solving', difficulty: 'Medium' },
      { id: 5, text: "How do you stay updated with the latest frontend technologies?", category: 'Growth', difficulty: 'Easy' },
    ],
    product_manager: [
      { id: 1, text: "How would you improve Microsoft Teams for remote collaboration?", category: 'Product Sense', difficulty: 'Hard' },
      { id: 2, text: "Describe how you would integrate AI features into Microsoft Office.", category: 'Innovation', difficulty: 'Hard' },
      { id: 3, text: "How do you gather and prioritize customer feedback?", category: 'Process', difficulty: 'Medium' },
      { id: 4, text: "Tell me about a product failure you learned from.", category: 'Experience', difficulty: 'Medium' },
      { id: 5, text: "How would you measure success for a new feature in Outlook?", category: 'Metrics', difficulty: 'Medium' },
    ],
    data_scientist: [
      { id: 1, text: "How would you design the AI behind Microsoft Copilot?", category: 'ML Design', difficulty: 'Hard' },
      { id: 2, text: "Describe your experience with natural language processing.", category: 'Technical', difficulty: 'Medium' },
      { id: 3, text: "How would you detect anomalies in Azure cloud usage patterns?", category: 'Problem Solving', difficulty: 'Hard' },
      { id: 4, text: "Tell me about a time you had to explain ML concepts to non-technical stakeholders.", category: 'Communication', difficulty: 'Easy' },
      { id: 5, text: "How do you evaluate model performance in production?", category: 'MLOps', difficulty: 'Medium' },
    ],
  },
  
  // META
  meta: {
    software_engineer: [
      { id: 1, text: "How would you design Facebook's News Feed ranking system?", category: 'System Design', difficulty: 'Hard' },
      { id: 2, text: "Describe how you would handle real-time messaging for billions of users.", category: 'System Design', difficulty: 'Hard' },
      { id: 3, text: "Tell me about a time you had to balance moving fast with code quality.", category: 'Culture', difficulty: 'Medium' },
      { id: 4, text: "How do you approach code reviews?", category: 'Collaboration', difficulty: 'Easy' },
      { id: 5, text: "Describe a project where you had significant impact.", category: 'Impact', difficulty: 'Medium' },
    ],
    frontend_developer: [
      { id: 1, text: "How would you optimize React performance for a large social media feed?", category: 'Performance', difficulty: 'Hard' },
      { id: 2, text: "Describe your experience with React Native for cross-platform development.", category: 'Technical', difficulty: 'Medium' },
      { id: 3, text: "How do you handle state management in a complex application?", category: 'Architecture', difficulty: 'Medium' },
      { id: 4, text: "Tell me about a time you improved user engagement through UI changes.", category: 'Impact', difficulty: 'Medium' },
      { id: 5, text: "How do you approach mobile-first responsive design?", category: 'Design', difficulty: 'Easy' },
    ],
    product_manager: [
      { id: 1, text: "How would you increase user engagement on Instagram Stories?", category: 'Product Sense', difficulty: 'Hard' },
      { id: 2, text: "Describe how you would balance creator and consumer needs on a platform.", category: 'Strategy', difficulty: 'Hard' },
      { id: 3, text: "How would you approach content moderation challenges?", category: 'Ethics', difficulty: 'Hard' },
      { id: 4, text: "Tell me about a time you had to pivot a product strategy.", category: 'Adaptability', difficulty: 'Medium' },
      { id: 5, text: "How do you measure the success of social features?", category: 'Metrics', difficulty: 'Medium' },
    ],
    data_scientist: [
      { id: 1, text: "How would you design a content recommendation system for Instagram?", category: 'ML Design', difficulty: 'Hard' },
      { id: 2, text: "Describe how you would detect fake accounts at scale.", category: 'Problem Solving', difficulty: 'Hard' },
      { id: 3, text: "How do you approach A/B testing for social features?", category: 'Experimentation', difficulty: 'Medium' },
      { id: 4, text: "Tell me about your experience with large-scale data processing.", category: 'Technical', difficulty: 'Medium' },
      { id: 5, text: "How do you balance personalization with user privacy?", category: 'Ethics', difficulty: 'Hard' },
    ],
  },

  // APPLE
  apple: {
    software_engineer: [
      { id: 1, text: "How would you design the iCloud sync system for millions of devices?", category: 'System Design', difficulty: 'Hard' },
      { id: 2, text: "Describe your approach to building privacy-focused features.", category: 'Privacy', difficulty: 'Hard' },
      { id: 3, text: "Tell me about a time you obsessed over the details of a product.", category: 'Quality', difficulty: 'Medium' },
      { id: 4, text: "How do you balance innovation with stability in software development?", category: 'Philosophy', difficulty: 'Medium' },
      { id: 5, text: "Describe a complex performance optimization you implemented.", category: 'Technical', difficulty: 'Medium' },
    ],
    mobile_developer: [
      { id: 1, text: "How would you optimize battery life for a resource-intensive iOS app?", category: 'Performance', difficulty: 'Hard' },
      { id: 2, text: "Describe your experience with Swift and SwiftUI.", category: 'Technical', difficulty: 'Medium' },
      { id: 3, text: "How do you ensure a seamless user experience across Apple devices?", category: 'UX', difficulty: 'Medium' },
      { id: 4, text: "Tell me about a challenging bug you debugged on iOS.", category: 'Problem Solving', difficulty: 'Medium' },
      { id: 5, text: "How do you approach accessibility in iOS development?", category: 'Accessibility', difficulty: 'Easy' },
    ],
    product_manager: [
      { id: 1, text: "How would you improve the Apple Watch fitness experience?", category: 'Product Sense', difficulty: 'Hard' },
      { id: 2, text: "Describe how you would launch a new feature for the App Store.", category: 'Go-to-Market', difficulty: 'Medium' },
      { id: 3, text: "How do you balance user needs with Apple's design philosophy?", category: 'Strategy', difficulty: 'Hard' },
      { id: 4, text: "Tell me about a product decision you made based on user research.", category: 'Research', difficulty: 'Medium' },
      { id: 5, text: "How would you measure success for Apple Music?", category: 'Metrics', difficulty: 'Medium' },
    ],
    ui_ux_designer: [
      { id: 1, text: "How would you redesign the Apple Health app for better engagement?", category: 'Design', difficulty: 'Hard' },
      { id: 2, text: "Describe your approach to designing for the Apple ecosystem.", category: 'Design Systems', difficulty: 'Medium' },
      { id: 3, text: "How do you incorporate motion design in your work?", category: 'Animation', difficulty: 'Medium' },
      { id: 4, text: "Tell me about a design you're most proud of.", category: 'Portfolio', difficulty: 'Easy' },
      { id: 5, text: "How do you balance aesthetics with usability?", category: 'Philosophy', difficulty: 'Medium' },
    ],
  },

  // GENERAL (fallback)
  general: {
    software_engineer: [
      { id: 1, text: "Tell me about yourself and your background in software development.", category: 'Introduction', difficulty: 'Easy' },
      { id: 2, text: "Describe a challenging technical problem you solved.", category: 'Problem Solving', difficulty: 'Medium' },
      { id: 3, text: "How do you stay updated with the latest technologies?", category: 'Growth', difficulty: 'Easy' },
      { id: 4, text: "Tell me about a project you're most proud of.", category: 'Experience', difficulty: 'Medium' },
      { id: 5, text: "Where do you see yourself in 5 years?", category: 'Career Goals', difficulty: 'Easy' },
    ],
    frontend_developer: [
      { id: 1, text: "What frontend frameworks are you most experienced with?", category: 'Technical', difficulty: 'Easy' },
      { id: 2, text: "How do you approach responsive web design?", category: 'Design', difficulty: 'Easy' },
      { id: 3, text: "Describe your debugging process for frontend issues.", category: 'Problem Solving', difficulty: 'Medium' },
      { id: 4, text: "How do you optimize web application performance?", category: 'Performance', difficulty: 'Medium' },
      { id: 5, text: "Tell me about a UI/UX improvement you implemented.", category: 'Impact', difficulty: 'Medium' },
    ],
    backend_developer: [
      { id: 1, text: "Describe your experience with database design.", category: 'Technical', difficulty: 'Medium' },
      { id: 2, text: "How do you approach API design?", category: 'Architecture', difficulty: 'Medium' },
      { id: 3, text: "Tell me about your experience with microservices.", category: 'Technical', difficulty: 'Medium' },
      { id: 4, text: "How do you handle scalability challenges?", category: 'System Design', difficulty: 'Hard' },
      { id: 5, text: "Describe your approach to security in backend development.", category: 'Security', difficulty: 'Medium' },
    ],
    product_manager: [
      { id: 1, text: "How do you prioritize features in a product roadmap?", category: 'Prioritization', difficulty: 'Medium' },
      { id: 2, text: "Describe your process for gathering user requirements.", category: 'Research', difficulty: 'Easy' },
      { id: 3, text: "How do you work with engineering teams?", category: 'Collaboration', difficulty: 'Easy' },
      { id: 4, text: "Tell me about a successful product launch you led.", category: 'Experience', difficulty: 'Medium' },
      { id: 5, text: "How do you measure product success?", category: 'Metrics', difficulty: 'Medium' },
    ],
    data_scientist: [
      { id: 1, text: "Describe your experience with machine learning algorithms.", category: 'Technical', difficulty: 'Medium' },
      { id: 2, text: "How do you approach a new data science project?", category: 'Process', difficulty: 'Easy' },
      { id: 3, text: "Tell me about a time you derived insights from messy data.", category: 'Problem Solving', difficulty: 'Medium' },
      { id: 4, text: "How do you validate your models?", category: 'Technical', difficulty: 'Medium' },
      { id: 5, text: "Describe your experience with data visualization.", category: 'Communication', difficulty: 'Easy' },
    ],
    devops_engineer: [
      { id: 1, text: "Describe your experience with CI/CD pipelines.", category: 'Technical', difficulty: 'Medium' },
      { id: 2, text: "How do you approach infrastructure as code?", category: 'Architecture', difficulty: 'Medium' },
      { id: 3, text: "Tell me about a production incident you handled.", category: 'Problem Solving', difficulty: 'Medium' },
      { id: 4, text: "How do you ensure system reliability?", category: 'SRE', difficulty: 'Medium' },
      { id: 5, text: "Describe your experience with container orchestration.", category: 'Technical', difficulty: 'Medium' },
    ],
    mobile_developer: [
      { id: 1, text: "What mobile platforms are you experienced with?", category: 'Technical', difficulty: 'Easy' },
      { id: 2, text: "How do you handle offline functionality in mobile apps?", category: 'Architecture', difficulty: 'Medium' },
      { id: 3, text: "Describe your approach to mobile app testing.", category: 'Quality', difficulty: 'Medium' },
      { id: 4, text: "How do you optimize mobile app performance?", category: 'Performance', difficulty: 'Medium' },
      { id: 5, text: "Tell me about a mobile app feature you're proud of.", category: 'Experience', difficulty: 'Easy' },
    ],
    fullstack_developer: [
      { id: 1, text: "Describe your experience with both frontend and backend technologies.", category: 'Technical', difficulty: 'Easy' },
      { id: 2, text: "How do you decide between client-side and server-side rendering?", category: 'Architecture', difficulty: 'Medium' },
      { id: 3, text: "Tell me about a full-stack project you built end-to-end.", category: 'Experience', difficulty: 'Medium' },
      { id: 4, text: "How do you handle database migrations in production?", category: 'DevOps', difficulty: 'Medium' },
      { id: 5, text: "Describe your approach to API design and integration.", category: 'Technical', difficulty: 'Medium' },
    ],
    qa_engineer: [
      { id: 1, text: "Describe your approach to test automation.", category: 'Technical', difficulty: 'Medium' },
      { id: 2, text: "How do you prioritize which bugs to fix first?", category: 'Process', difficulty: 'Easy' },
      { id: 3, text: "Tell me about a critical bug you discovered.", category: 'Experience', difficulty: 'Medium' },
      { id: 4, text: "How do you ensure test coverage is adequate?", category: 'Quality', difficulty: 'Medium' },
      { id: 5, text: "Describe your experience with performance testing.", category: 'Technical', difficulty: 'Medium' },
    ],
    ui_ux_designer: [
      { id: 1, text: "Walk me through your design process.", category: 'Process', difficulty: 'Easy' },
      { id: 2, text: "How do you conduct user research?", category: 'Research', difficulty: 'Medium' },
      { id: 3, text: "Tell me about a design that significantly improved user metrics.", category: 'Impact', difficulty: 'Medium' },
      { id: 4, text: "How do you handle design feedback and critiques?", category: 'Collaboration', difficulty: 'Easy' },
      { id: 5, text: "Describe your experience with design systems.", category: 'Technical', difficulty: 'Medium' },
    ],
  },
};

// Function to get questions for a specific company and role
export const getQuestions = (companyId: string, roleId: string): Question[] => {
  // First try to get company-specific questions
  const companyQuestions = QUESTIONS_DATABASE[companyId];
  
  if (companyQuestions && companyQuestions[roleId]) {
    return companyQuestions[roleId];
  }
  
  // Fallback to general questions for the role
  const generalQuestions = QUESTIONS_DATABASE['general'];
  
  if (generalQuestions && generalQuestions[roleId]) {
    return generalQuestions[roleId];
  }
  
  // Final fallback - general software engineer questions
  return QUESTIONS_DATABASE['general']['software_engineer'];
};