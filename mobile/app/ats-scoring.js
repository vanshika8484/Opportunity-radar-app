import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  FlatList,
  Alert,
  TextInput,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { File } from 'expo-file-system/next';
import { WebView } from 'react-native-webview';

const ATSScorePage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showRolePicker, setShowRolePicker] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [pdfFileName, setPdfFileName] = useState('');
  const [pdfBase64, setPdfBase64] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [showPdfExtractor, setShowPdfExtractor] = useState(false);
  const [showTextPreview, setShowTextPreview] = useState(false);
  const [manualText, setManualText] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);

  const webViewRef = useRef(null);

  // ============ ROLES DATABASE WITH SKILL VARIATIONS ============
  const rolesData = {
    software_engineer: {
      title: 'Software Engineer',
      icon: '💻',
      requiredSkills: [
        { name: 'JavaScript', variations: ['javascript', 'js', 'ecmascript', 'es6', 'es2015'] },
        { name: 'Python', variations: ['python', 'python3', 'py'] },
        { name: 'Java', variations: ['java', 'java8', 'java11', 'jdk'] },
        { name: 'React', variations: ['react', 'reactjs', 'react.js', 'react js'] },
        { name: 'Node.js', variations: ['node', 'nodejs', 'node.js', 'node js'] },
        { name: 'SQL', variations: ['sql', 'mysql', 'postgresql', 'postgres', 'sqlite', 'oracle', 'sql server', 'mssql'] },
        { name: 'Git', variations: ['git', 'github', 'gitlab', 'bitbucket', 'version control'] },
        { name: 'API', variations: ['api', 'apis', 'rest api', 'restful', 'rest', 'graphql'] },
        { name: 'Agile', variations: ['agile', 'scrum', 'sprint', 'kanban', 'jira'] },
        { name: 'Data Structures', variations: ['data structures', 'algorithms', 'dsa', 'leetcode'] },
      ],
      preferredSkills: [
        { name: 'TypeScript', variations: ['typescript', 'ts'] },
        { name: 'AWS', variations: ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'cloud'] },
        { name: 'Docker', variations: ['docker', 'container', 'containerization', 'dockerfile'] },
        { name: 'Kubernetes', variations: ['kubernetes', 'k8s', 'kubectl'] },
        { name: 'MongoDB', variations: ['mongodb', 'mongo', 'nosql'] },
        { name: 'Redis', variations: ['redis', 'caching', 'cache'] },
        { name: 'CI/CD', variations: ['ci/cd', 'cicd', 'jenkins', 'github actions', 'pipeline', 'deployment'] },
        { name: 'Testing', variations: ['testing', 'unit test', 'jest', 'mocha', 'pytest', 'junit', 'tdd'] },
        { name: 'Linux', variations: ['linux', 'ubuntu', 'centos', 'unix', 'bash', 'shell'] },
        { name: 'Microservices', variations: ['microservices', 'microservice', 'distributed systems'] },
      ],
      certifications: ['AWS Certified', 'Azure Certified', 'Google Cloud', 'Kubernetes Certified'],
      keywords: ['developed', 'implemented', 'designed', 'built', 'deployed', 'optimized', 'scalable', 'maintained', 'debugged', 'integrated', 'architected', 'refactored'],
    },
    data_scientist: {
      title: 'Data Scientist',
      icon: '📊',
      requiredSkills: [
        { name: 'Python', variations: ['python', 'python3', 'py'] },
        { name: 'Machine Learning', variations: ['machine learning', 'ml', 'deep learning', 'neural network', 'ai', 'artificial intelligence'] },
        { name: 'SQL', variations: ['sql', 'mysql', 'postgresql', 'postgres', 'database'] },
        { name: 'Statistics', variations: ['statistics', 'statistical', 'probability', 'hypothesis testing', 'regression'] },
        { name: 'Pandas', variations: ['pandas', 'dataframe', 'data manipulation'] },
        { name: 'NumPy', variations: ['numpy', 'numerical computing'] },
        { name: 'Data Analysis', variations: ['data analysis', 'data analytics', 'analytics', 'eda', 'exploratory data analysis'] },
        { name: 'Data Visualization', variations: ['visualization', 'matplotlib', 'seaborn', 'plotly', 'tableau', 'power bi'] },
      ],
      preferredSkills: [
        { name: 'TensorFlow', variations: ['tensorflow', 'tf', 'keras'] },
        { name: 'PyTorch', variations: ['pytorch', 'torch'] },
        { name: 'Scikit-learn', variations: ['scikit-learn', 'sklearn', 'scikit'] },
        { name: 'Deep Learning', variations: ['deep learning', 'neural networks', 'cnn', 'rnn', 'lstm', 'transformer'] },
        { name: 'NLP', variations: ['nlp', 'natural language processing', 'text mining', 'bert', 'gpt'] },
        { name: 'Computer Vision', variations: ['computer vision', 'cv', 'image processing', 'opencv'] },
        { name: 'Spark', variations: ['spark', 'pyspark', 'apache spark', 'big data'] },
        { name: 'Hadoop', variations: ['hadoop', 'hdfs', 'hive'] },
      ],
      certifications: ['Google Data Analytics', 'IBM Data Science', 'AWS Machine Learning', 'TensorFlow Certified'],
      keywords: ['analyzed', 'predicted', 'modeled', 'trained', 'visualized', 'insights', 'accuracy', 'precision', 'recall', 'classification', 'clustering', 'feature engineering'],
    },
    frontend_developer: {
      title: 'Frontend Developer',
      icon: '🖥️',
      requiredSkills: [
        { name: 'HTML', variations: ['html', 'html5', 'markup'] },
        { name: 'CSS', variations: ['css', 'css3', 'styling', 'sass', 'scss', 'less'] },
        { name: 'JavaScript', variations: ['javascript', 'js', 'ecmascript', 'es6'] },
        { name: 'React', variations: ['react', 'reactjs', 'react.js', 'react js'] },
        { name: 'Responsive Design', variations: ['responsive', 'mobile-first', 'mobile first', 'media queries', 'flexbox', 'grid'] },
        { name: 'Git', variations: ['git', 'github', 'version control'] },
        { name: 'REST API', variations: ['api', 'rest', 'restful', 'fetch', 'axios'] },
      ],
      preferredSkills: [
        { name: 'TypeScript', variations: ['typescript', 'ts'] },
        { name: 'Vue', variations: ['vue', 'vuejs', 'vue.js', 'vue 3'] },
        { name: 'Angular', variations: ['angular', 'angularjs', 'angular 2'] },
        { name: 'Tailwind', variations: ['tailwind', 'tailwindcss', 'tailwind css'] },
        { name: 'Webpack', variations: ['webpack', 'bundler', 'vite', 'rollup'] },
        { name: 'Next.js', variations: ['next', 'nextjs', 'next.js'] },
        { name: 'Testing', variations: ['testing', 'jest', 'cypress', 'react testing library', 'unit test'] },
        { name: 'Redux', variations: ['redux', 'state management', 'zustand', 'mobx'] },
      ],
      certifications: ['Meta Frontend Developer', 'JavaScript Certification', 'React Certification'],
      keywords: ['developed', 'built', 'implemented', 'responsive', 'pixel-perfect', 'cross-browser', 'optimized', 'interactive', 'dynamic', 'ui', 'ux', 'component'],
    },
    backend_developer: {
      title: 'Backend Developer',
      icon: '🗄️',
      requiredSkills: [
        { name: 'Python', variations: ['python', 'django', 'flask', 'fastapi'] },
        { name: 'Java', variations: ['java', 'spring', 'spring boot', 'springboot'] },
        { name: 'Node.js', variations: ['node', 'nodejs', 'node.js', 'express', 'expressjs'] },
        { name: 'SQL', variations: ['sql', 'mysql', 'postgresql', 'postgres', 'oracle', 'database'] },
        { name: 'API Development', variations: ['api', 'rest', 'restful', 'graphql', 'endpoint'] },
        { name: 'Database', variations: ['database', 'db', 'rdbms', 'schema', 'query'] },
        { name: 'Git', variations: ['git', 'github', 'version control'] },
      ],
      preferredSkills: [
        { name: 'PostgreSQL', variations: ['postgresql', 'postgres', 'psql'] },
        { name: 'MongoDB', variations: ['mongodb', 'mongo', 'nosql'] },
        { name: 'Redis', variations: ['redis', 'caching', 'cache', 'in-memory'] },
        { name: 'GraphQL', variations: ['graphql', 'apollo'] },
        { name: 'Microservices', variations: ['microservices', 'microservice', 'distributed'] },
        { name: 'Docker', variations: ['docker', 'container', 'containerization'] },
        { name: 'AWS', variations: ['aws', 'cloud', 'ec2', 's3', 'lambda'] },
        { name: 'Authentication', variations: ['authentication', 'auth', 'oauth', 'jwt', 'security'] },
      ],
      certifications: ['AWS Developer', 'Oracle Java', 'MongoDB Certified'],
      keywords: ['developed', 'designed', 'implemented', 'scalable', 'optimized', 'integrated', 'secure', 'performance', 'architecture', 'server', 'endpoint'],
    },
    mobile_developer: {
      title: 'Mobile Developer',
      icon: '📲',
      requiredSkills: [
        { name: 'React Native', variations: ['react native', 'react-native', 'reactnative', 'rn'] },
        { name: 'Flutter', variations: ['flutter', 'dart'] },
        { name: 'iOS', variations: ['ios', 'iphone', 'ipad', 'swift', 'objective-c', 'xcode'] },
        { name: 'Android', variations: ['android', 'kotlin', 'java android', 'android studio'] },
        { name: 'JavaScript', variations: ['javascript', 'js', 'typescript', 'ts'] },
        { name: 'Mobile UI', variations: ['mobile ui', 'ui/ux', 'mobile design', 'responsive'] },
        { name: 'API Integration', variations: ['api', 'rest', 'graphql', 'fetch', 'axios'] },
      ],
      preferredSkills: [
        { name: 'TypeScript', variations: ['typescript', 'ts'] },
        { name: 'Firebase', variations: ['firebase', 'firestore', 'fcm', 'push notification'] },
        { name: 'Redux', variations: ['redux', 'state management', 'mobx', 'zustand'] },
        { name: 'GraphQL', variations: ['graphql', 'apollo'] },
        { name: 'App Store', variations: ['app store', 'play store', 'publishing', 'deployment'] },
        { name: 'Push Notifications', variations: ['push notification', 'notification', 'fcm', 'apns'] },
        { name: 'Offline Storage', variations: ['offline', 'asyncstorage', 'realm', 'sqlite', 'local storage'] },
        { name: 'Testing', variations: ['testing', 'jest', 'detox', 'unit test'] },
      ],
      certifications: ['Google Android Developer', 'Meta React Native', 'Apple Developer'],
      keywords: ['developed', 'published', 'downloads', 'rating', 'performance', 'responsive', 'cross-platform', 'native', 'mobile', 'app'],
    },
    devops_engineer: {
      title: 'DevOps Engineer',
      icon: '⚙️',
      requiredSkills: [
        { name: 'Docker', variations: ['docker', 'container', 'containerization', 'dockerfile'] },
        { name: 'Kubernetes', variations: ['kubernetes', 'k8s', 'kubectl', 'helm'] },
        { name: 'AWS', variations: ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'cloudformation'] },
        { name: 'CI/CD', variations: ['ci/cd', 'cicd', 'continuous integration', 'continuous deployment', 'pipeline'] },
        { name: 'Linux', variations: ['linux', 'ubuntu', 'centos', 'rhel', 'unix'] },
        { name: 'Terraform', variations: ['terraform', 'infrastructure as code', 'iac'] },
        { name: 'Jenkins', variations: ['jenkins', 'github actions', 'gitlab ci', 'circleci'] },
        { name: 'Git', variations: ['git', 'github', 'gitlab', 'version control'] },
        { name: 'Python', variations: ['python', 'scripting'] },
        { name: 'Bash', variations: ['bash', 'shell', 'shell scripting', 'sh'] },
      ],
      preferredSkills: [
        { name: 'Ansible', variations: ['ansible', 'configuration management'] },
        { name: 'Prometheus', variations: ['prometheus', 'monitoring', 'alerting'] },
        { name: 'Grafana', variations: ['grafana', 'dashboard', 'visualization'] },
        { name: 'ELK Stack', variations: ['elk', 'elasticsearch', 'logstash', 'kibana', 'logging'] },
        { name: 'Azure', variations: ['azure', 'microsoft azure', 'az'] },
        { name: 'GCP', variations: ['gcp', 'google cloud', 'gke'] },
        { name: 'Helm', variations: ['helm', 'helm charts'] },
        { name: 'ArgoCD', variations: ['argocd', 'argo', 'gitops'] },
      ],
      certifications: ['AWS DevOps', 'Kubernetes Administrator', 'Docker Certified', 'Azure DevOps'],
      keywords: ['automated', 'deployed', 'monitored', 'scaled', 'optimized', 'infrastructure', 'pipeline', 'containerized', 'cloud', 'provisioned'],
    },
    data_analyst: {
      title: 'Data Analyst',
      icon: '📈',
      requiredSkills: [
        { name: 'SQL', variations: ['sql', 'mysql', 'postgresql', 'postgres', 'oracle', 'query'] },
        { name: 'Excel', variations: ['excel', 'spreadsheet', 'pivot table', 'vlookup', 'microsoft excel'] },
        { name: 'Python', variations: ['python', 'pandas', 'numpy'] },
        { name: 'Data Visualization', variations: ['visualization', 'charts', 'graphs', 'dashboard'] },
        { name: 'Tableau', variations: ['tableau', 'tableau desktop', 'tableau server'] },
        { name: 'Power BI', variations: ['power bi', 'powerbi', 'dax'] },
        { name: 'Statistics', variations: ['statistics', 'statistical analysis', 'descriptive', 'inferential'] },
        { name: 'Reporting', variations: ['reporting', 'reports', 'business intelligence', 'bi'] },
      ],
      preferredSkills: [
        { name: 'R', variations: ['r programming', 'r language', 'rstudio'] },
        { name: 'Pandas', variations: ['pandas', 'dataframe'] },
        { name: 'Google Analytics', variations: ['google analytics', 'ga', 'analytics'] },
        { name: 'Looker', variations: ['looker', 'looker studio'] },
        { name: 'ETL', variations: ['etl', 'data pipeline', 'data extraction'] },
        { name: 'Data Modeling', variations: ['data modeling', 'data model', 'schema design'] },
        { name: 'A/B Testing', variations: ['a/b testing', 'ab testing', 'experimentation'] },
        { name: 'Storytelling', variations: ['storytelling', 'data storytelling', 'presentation'] },
      ],
      certifications: ['Google Data Analytics', 'Microsoft Power BI', 'Tableau Certified'],
      keywords: ['analyzed', 'reported', 'visualized', 'identified', 'insights', 'trends', 'dashboard', 'metrics', 'kpi', 'data-driven'],
    },
    product_manager: {
      title: 'Product Manager',
      icon: '📱',
      requiredSkills: [
        { name: 'Product Strategy', variations: ['product strategy', 'strategy', 'product vision', 'product planning'] },
        { name: 'Roadmap', variations: ['roadmap', 'product roadmap', 'planning'] },
        { name: 'Agile', variations: ['agile', 'scrum', 'sprint', 'kanban'] },
        { name: 'User Research', variations: ['user research', 'customer research', 'user interviews', 'usability'] },
        { name: 'Analytics', variations: ['analytics', 'data analysis', 'metrics', 'kpi'] },
        { name: 'Stakeholder Management', variations: ['stakeholder', 'stakeholders', 'cross-functional', 'collaboration'] },
        { name: 'Requirements', variations: ['requirements', 'prd', 'user stories', 'specifications'] },
      ],
      preferredSkills: [
        { name: 'Jira', variations: ['jira', 'atlassian', 'issue tracking'] },
        { name: 'Confluence', variations: ['confluence', 'documentation'] },
        { name: 'Figma', variations: ['figma', 'design', 'prototype'] },
        { name: 'SQL', variations: ['sql', 'data', 'database'] },
        { name: 'A/B Testing', variations: ['a/b testing', 'experimentation', 'testing'] },
        { name: 'OKR', variations: ['okr', 'objectives', 'key results'] },
        { name: 'Market Research', variations: ['market research', 'competitive analysis', 'market analysis'] },
        { name: 'Wireframing', variations: ['wireframe', 'wireframing', 'mockup', 'prototype'] },
      ],
      certifications: ['Product Management Certification', 'Scrum Master', 'PMP', 'CSPO'],
      keywords: ['launched', 'drove', 'increased', 'managed', 'prioritized', 'collaborated', 'strategy', 'growth', 'revenue', 'user engagement', 'mvp'],
    },
    ui_ux_designer: {
      title: 'UI/UX Designer',
      icon: '🎨',
      requiredSkills: [
        { name: 'Figma', variations: ['figma'] },
        { name: 'Sketch', variations: ['sketch'] },
        { name: 'Adobe XD', variations: ['adobe xd', 'xd'] },
        { name: 'User Research', variations: ['user research', 'usability testing', 'user testing', 'interviews'] },
        { name: 'Wireframing', variations: ['wireframe', 'wireframing', 'low-fidelity'] },
        { name: 'Prototyping', variations: ['prototype', 'prototyping', 'interactive prototype'] },
        { name: 'UI Design', variations: ['ui design', 'user interface', 'visual design'] },
        { name: 'UX Design', variations: ['ux design', 'user experience', 'ux'] },
      ],
      preferredSkills: [
        { name: 'Adobe Creative Suite', variations: ['photoshop', 'illustrator', 'adobe', 'creative suite'] },
        { name: 'InVision', variations: ['invision'] },
        { name: 'Principle', variations: ['principle', 'animation'] },
        { name: 'Framer', variations: ['framer'] },
        { name: 'HTML/CSS', variations: ['html', 'css', 'frontend'] },
        { name: 'Design Systems', variations: ['design system', 'component library', 'style guide'] },
        { name: 'Accessibility', variations: ['accessibility', 'a11y', 'wcag', 'inclusive design'] },
        { name: 'Information Architecture', variations: ['information architecture', 'ia', 'site map'] },
      ],
      certifications: ['Google UX Design', 'Nielsen Norman', 'Interaction Design Foundation'],
      keywords: ['designed', 'created', 'prototyped', 'researched', 'improved', 'user-centered', 'responsive', 'intuitive', 'conversion', 'engagement'],
    },
    ml_engineer: {
      title: 'ML Engineer',
      icon: '🤖',
      requiredSkills: [
        { name: 'Python', variations: ['python', 'python3'] },
        { name: 'Machine Learning', variations: ['machine learning', 'ml', 'predictive modeling'] },
        { name: 'TensorFlow', variations: ['tensorflow', 'tf', 'keras'] },
        { name: 'PyTorch', variations: ['pytorch', 'torch'] },
        { name: 'Deep Learning', variations: ['deep learning', 'neural network', 'cnn', 'rnn', 'transformer'] },
        { name: 'MLOps', variations: ['mlops', 'ml ops', 'model deployment', 'model serving'] },
        { name: 'Data Pipelines', variations: ['data pipeline', 'etl', 'data engineering', 'airflow'] },
      ],
      preferredSkills: [
        { name: 'Kubernetes', variations: ['kubernetes', 'k8s'] },
        { name: 'Docker', variations: ['docker', 'container'] },
        { name: 'AWS SageMaker', variations: ['sagemaker', 'aws ml'] },
        { name: 'MLflow', variations: ['mlflow', 'experiment tracking'] },
        { name: 'Feature Engineering', variations: ['feature engineering', 'feature store'] },
        { name: 'Model Deployment', variations: ['model deployment', 'inference', 'serving'] },
        { name: 'GPU', variations: ['gpu', 'cuda', 'nvidia'] },
        { name: 'Distributed Training', variations: ['distributed training', 'distributed computing'] },
      ],
      certifications: ['TensorFlow Developer', 'AWS ML Specialty', 'Google ML Engineer'],
      keywords: ['trained', 'deployed', 'optimized', 'inference', 'accuracy', 'latency', 'production', 'pipeline', 'model', 'feature'],
    },
    cybersecurity: {
      title: 'Cybersecurity Analyst',
      icon: '🔐',
      requiredSkills: [
        { name: 'Network Security', variations: ['network security', 'firewall', 'ids', 'ips', 'networking'] },
        { name: 'Penetration Testing', variations: ['penetration testing', 'pentest', 'ethical hacking', 'vulnerability'] },
        { name: 'SIEM', variations: ['siem', 'splunk', 'qradar', 'security monitoring'] },
        { name: 'Firewalls', variations: ['firewall', 'palo alto', 'cisco', 'fortinet'] },
        { name: 'Incident Response', variations: ['incident response', 'ir', 'security incident'] },
        { name: 'Vulnerability Assessment', variations: ['vulnerability', 'vulnerability assessment', 'scanning', 'nessus'] },
      ],
      preferredSkills: [
        { name: 'Python', variations: ['python', 'scripting'] },
        { name: 'Linux', variations: ['linux', 'unix', 'kali'] },
        { name: 'Wireshark', variations: ['wireshark', 'packet analysis', 'tcpdump'] },
        { name: 'Nmap', variations: ['nmap', 'port scanning'] },
        { name: 'Burp Suite', variations: ['burp suite', 'burp', 'web security'] },
        { name: 'ISO 27001', variations: ['iso 27001', 'iso27001', 'information security'] },
        { name: 'NIST', variations: ['nist', 'framework', 'compliance'] },
        { name: 'Malware Analysis', variations: ['malware', 'malware analysis', 'reverse engineering'] },
      ],
      certifications: ['CISSP', 'CEH', 'CompTIA Security+', 'OSCP', 'CISM'],
      keywords: ['secured', 'protected', 'detected', 'mitigated', 'compliance', 'risk assessment', 'threat', 'audit', 'vulnerability'],
    },
    cloud_architect: {
      title: 'Cloud Architect',
      icon: '☁️',
      requiredSkills: [
        { name: 'AWS', variations: ['aws', 'amazon web services', 'ec2', 's3', 'lambda', 'cloudformation'] },
        { name: 'Azure', variations: ['azure', 'microsoft azure', 'az'] },
        { name: 'GCP', variations: ['gcp', 'google cloud', 'google cloud platform'] },
        { name: 'Cloud Architecture', variations: ['cloud architecture', 'architecture', 'solution architecture'] },
        { name: 'Networking', variations: ['networking', 'vpc', 'subnet', 'load balancer'] },
        { name: 'Security', variations: ['security', 'iam', 'identity', 'encryption'] },
        { name: 'Infrastructure', variations: ['infrastructure', 'iaas', 'paas', 'saas'] },
        { name: 'Terraform', variations: ['terraform', 'infrastructure as code', 'iac'] },
      ],
      preferredSkills: [
        { name: 'Kubernetes', variations: ['kubernetes', 'k8s', 'eks', 'aks', 'gke'] },
        { name: 'Serverless', variations: ['serverless', 'lambda', 'functions'] },
        { name: 'Cost Optimization', variations: ['cost optimization', 'cost management', 'finops'] },
        { name: 'Disaster Recovery', variations: ['disaster recovery', 'dr', 'backup', 'high availability'] },
        { name: 'Microservices', variations: ['microservices', 'distributed systems'] },
        { name: 'API Gateway', variations: ['api gateway', 'kong', 'apigee'] },
        { name: 'CI/CD', variations: ['ci/cd', 'devops', 'pipeline'] },
        { name: 'Monitoring', variations: ['monitoring', 'cloudwatch', 'datadog', 'observability'] },
      ],
      certifications: ['AWS Solutions Architect', 'Azure Solutions Architect', 'Google Cloud Architect', 'TOGAF'],
      keywords: ['architected', 'designed', 'migrated', 'scaled', 'optimized', 'cost savings', 'high availability', 'disaster recovery'],
    },
  };

  const rolesList = Object.keys(rolesData).map(key => ({
    id: key,
    ...rolesData[key]
  }));

  const actionVerbs = [
    'achieved', 'managed', 'developed', 'led', 'created', 'implemented',
    'improved', 'increased', 'reduced', 'designed', 'built', 'analyzed',
    'delivered', 'organized', 'coordinated', 'established', 'launched',
    'maintained', 'negotiated', 'optimized', 'planned', 'presented',
    'produced', 'resolved', 'streamlined', 'supervised', 'trained',
    'spearheaded', 'executed', 'facilitated', 'generated', 'initiated',
    'architected', 'automated', 'collaborated', 'configured', 'deployed',
    'enhanced', 'engineered', 'integrated', 'modernized', 'refactored',
    'restructured', 'revamped', 'simplified', 'transformed', 'upgraded'
  ];

  // ============ PDF PICKER ============

  const pickPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const pickedFile = result.assets[0];
      setPdfFileName(pickedFile.name);
      setExtracting(true);

      const file = new File(pickedFile.uri);
      const base64Content = await file.base64();

      setPdfBase64(base64Content);
      setShowPdfExtractor(true);

    } catch (err) {
      console.error('Error picking PDF:', err);
      Alert.alert('Error', 'Failed to pick PDF. Try manual input.', [
        { text: 'Manual Input', onPress: () => setShowManualInput(true) },
        { text: 'Cancel' }
      ]);
      setExtracting(false);
    }
  };

  // ============ PDF EXTRACTOR HTML ============

  const pdfExtractorHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { display: flex; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); font-family: -apple-system, sans-serif; }
        .container { text-align: center; padding: 40px; background: white; border-radius: 24px; box-shadow: 0 25px 80px rgba(0,0,0,0.3); max-width: 300px; width: 85%; }
        .spinner { width: 56px; height: 56px; border: 5px solid #e8e8e8; border-top: 5px solid #667eea; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 20px; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        h2 { color: #2d3748; font-size: 18px; margin-bottom: 8px; }
        .status { margin-top: 20px; padding: 12px; background: #f7fafc; border-radius: 12px; font-size: 13px; color: #667eea; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="spinner"></div>
        <h2>Extracting Text</h2>
        <div class="status" id="status">Initializing...</div>
      </div>
      <script>
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        function sendResult(success, data) {
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({ success, ...data }));
          }
        }

        async function extractText(base64) {
          try {
            document.getElementById('status').textContent = 'Decoding PDF...';
            const binary = atob(base64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

            document.getElementById('status').textContent = 'Loading document...';
            const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
            
            let text = '';
            for (let i = 1; i <= pdf.numPages; i++) {
              document.getElementById('status').textContent = 'Page ' + i + '/' + pdf.numPages;
              const page = await pdf.getPage(i);
              const content = await page.getTextContent();
              
              let lastY = null;
              for (const item of content.items) {
                const y = item.transform[5];
                if (lastY !== null && Math.abs(lastY - y) > 5) text += '\\n';
                text += item.str + ' ';
                lastY = y;
              }
              text += '\\n\\n';
            }

            text = text.replace(/[ \\t]+/g, ' ').replace(/\\n{3,}/g, '\\n\\n').trim();
            
            setTimeout(() => sendResult(true, { text, pages: pdf.numPages }), 300);
          } catch (e) {
            console.error(e);
            setTimeout(() => sendResult(false, { error: e.message }), 500);
          }
        }

        function handleMessage(e) {
          try {
            const data = JSON.parse(e.data);
            if (data.pdfBase64) extractText(data.pdfBase64);
          } catch (err) {}
        }

        window.addEventListener('message', handleMessage);
        document.addEventListener('message', handleMessage);
      </script>
    </body>
    </html>
  `;

  const handleWebViewLoad = () => {
    if (webViewRef.current && pdfBase64) {
      setTimeout(() => {
        webViewRef.current.postMessage(JSON.stringify({ pdfBase64 }));
      }, 800);
    }
  };

  const handleWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      setShowPdfExtractor(false);
      setExtracting(false);

      if (data.success && data.text) {
        setResumeText(data.text);
        Alert.alert('✅ Success', `Extracted text from ${data.pages} page(s). You can preview and edit if needed.`);
      } else {
        Alert.alert('❌ Extraction Failed', 'Try manual text input', [
          { text: 'Manual Input', onPress: () => setShowManualInput(true) },
          { text: 'Cancel' }
        ]);
        setPdfFileName('');
      }
    } catch (e) {
      setShowPdfExtractor(false);
      setExtracting(false);
    }
  };

  const cancelExtraction = () => {
    setShowPdfExtractor(false);
    setExtracting(false);
    setPdfFileName('');
    setPdfBase64('');
  };

  // ============ IMPROVED SKILL MATCHING ============

  const checkSkillMatch = (text, skill) => {
    const lowerText = text.toLowerCase();
    return skill.variations.some(variation => {
      const pattern = new RegExp(`\\b${variation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return pattern.test(lowerText);
    });
  };

  const checkSkillsMatch = (text, role) => {
    const roleData = rolesData[role];
    
    const matchedRequired = roleData.requiredSkills.filter(skill => checkSkillMatch(text, skill));
    const missingRequired = roleData.requiredSkills.filter(skill => !checkSkillMatch(text, skill));
    const matchedPreferred = roleData.preferredSkills.filter(skill => checkSkillMatch(text, skill));
    const missingPreferred = roleData.preferredSkills.filter(skill => !checkSkillMatch(text, skill));

    return {
      matchedRequired: matchedRequired.map(s => s.name),
      missingRequired: missingRequired.map(s => s.name),
      matchedPreferred: matchedPreferred.map(s => s.name),
      missingPreferred: missingPreferred.map(s => s.name),
      requiredScore: roleData.requiredSkills.length > 0 
        ? (matchedRequired.length / roleData.requiredSkills.length) * 100 : 0,
      preferredScore: roleData.preferredSkills.length > 0 
        ? (matchedPreferred.length / roleData.preferredSkills.length) * 100 : 0,
    };
  };

  const checkKeywords = (text, role) => {
    const lowerText = text.toLowerCase();
    const roleData = rolesData[role];
    const matched = roleData.keywords.filter(kw => {
      const pattern = new RegExp(`\\b${kw}\\b`, 'i');
      return pattern.test(lowerText);
    });
    const missing = roleData.keywords.filter(kw => {
      const pattern = new RegExp(`\\b${kw}\\b`, 'i');
      return !pattern.test(lowerText);
    });
    return { matched, missing, score: roleData.keywords.length > 0 ? (matched.length / roleData.keywords.length) * 100 : 0 };
  };

  const checkContactInfo = (text) => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phoneRegex = /[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}/;
    const lowerText = text.toLowerCase();
    
    return {
      email: emailRegex.test(text),
      phone: phoneRegex.test(text),
      linkedin: lowerText.includes('linkedin.com') || lowerText.includes('linkedin:'),
      github: lowerText.includes('github.com') || lowerText.includes('github:'),
      portfolio: /portfolio|website|\.dev|\.io|\.com\/[a-z]/i.test(text),
    };
  };

  const checkCertifications = (text, role) => {
    const lowerText = text.toLowerCase();
    const roleData = rolesData[role];
    const found = roleData.certifications.filter(cert => lowerText.includes(cert.toLowerCase()));
    return { found, all: roleData.certifications, score: found.length > 0 ? Math.min(found.length * 50, 100) : 0 };
  };

  const checkActionVerbs = (text) => {
    const lowerText = text.toLowerCase();
    const found = actionVerbs.filter(verb => {
      const pattern = new RegExp(`\\b${verb}(ed|ing|s)?\\b`, 'i');
      return pattern.test(lowerText);
    });
    return { count: found.length, verbs: found, score: Math.min((found.length / 12) * 100, 100) };
  };

  const checkQuantifiableResults = (text) => {
    const percentages = text.match(/\d+(\.\d+)?%/g) || [];
    const money = text.match(/\$[\d,]+[KMB]?|\$[\d.]+ *(million|billion|thousand)/gi) || [];
    const metrics = text.match(/\b\d+[xX]\b|\b\d{2,}[+]?\b/g) || [];
    const timeframes = text.match(/\b\d+\s*(years?|months?|weeks?)\b/gi) || [];
    
    const allMetrics = [...new Set([...percentages, ...money, ...metrics.slice(0, 5), ...timeframes.slice(0, 3)])];
    return { count: allMetrics.length, examples: allMetrics.slice(0, 10), score: Math.min(allMetrics.length * 12, 100) };
  };

  const checkSections = (text) => {
    const lowerText = text.toLowerCase();
    const sections = {
      experience: /\b(experience|work history|employment|professional experience)\b/i.test(text),
      education: /\b(education|academic|degree|university|college|bachelor|master|phd)\b/i.test(text),
      skills: /\b(skills|technical skills|technologies|competencies)\b/i.test(text),
      summary: /\b(summary|objective|profile|about me|professional summary)\b/i.test(text),
      projects: /\b(projects|portfolio|personal projects)\b/i.test(text),
      certifications: /\b(certifications?|certificates?|licensed?)\b/i.test(text),
    };
    const foundCount = Object.values(sections).filter(Boolean).length;
    return { sections, score: (foundCount / 6) * 100 };
  };

  const getWordCount = (text) => text.split(/\s+/).filter(w => w.length > 0).length;

  // ============ AI SUGGESTIONS ============

  const generateAISuggestions = (analysis, role) => {
    const suggestions = [];
    const roleData = rolesData[role];
    const roleTitle = roleData.title;

    // Critical
    if (analysis.skills.requiredScore < 40) {
      suggestions.push({
        type: 'critical', icon: '🚨', title: 'Critical Skills Missing',
        description: `You're missing ${analysis.skills.missingRequired.length}/${rolesData[role].requiredSkills.length} essential skills for ${roleTitle}.`,
        action: `Add these skills to your resume: ${analysis.skills.missingRequired.slice(0, 4).join(', ')}`,
        impact: 'Critical',
      });
    }

    if (!analysis.contact.email) {
      suggestions.push({
        type: 'critical', icon: '📧', title: 'No Email Found',
        description: 'ATS cannot identify your contact email.',
        action: 'Add a professional email address at the top of your resume.',
        impact: 'Critical',
      });
    }

    if (!analysis.contact.phone) {
      suggestions.push({
        type: 'critical', icon: '📞', title: 'No Phone Number',
        description: 'Recruiters prefer to call candidates directly.',
        action: 'Add your phone number with country code.',
        impact: 'Critical',
      });
    }

    // Important
    if (analysis.skills.requiredScore >= 40 && analysis.skills.requiredScore < 70) {
      suggestions.push({
        type: 'important', icon: '🎯', title: 'Add More Required Skills',
        description: `You have ${Math.round(analysis.skills.requiredScore)}% of required skills.`,
        action: `Consider adding: ${analysis.skills.missingRequired.slice(0, 3).join(', ')}`,
        impact: 'High Impact',
      });
    }

    if (analysis.actionVerbs.count < 10) {
      const suggested = actionVerbs.filter(v => !analysis.actionVerbs.verbs.includes(v)).slice(0, 5);
      suggestions.push({
        type: 'important', icon: '💪', title: 'Use More Action Verbs',
        description: `Found only ${analysis.actionVerbs.count} action verbs. Aim for 12+.`,
        action: `Start bullet points with: ${suggested.join(', ')}`,
        impact: 'High Impact',
      });
    }

    if (analysis.metrics.count < 5) {
      suggestions.push({
        type: 'important', icon: '📊', title: 'Add Measurable Results',
        description: 'Quantified achievements make your resume 40% more effective.',
        action: 'Add numbers like: "Increased sales by 25%", "Led team of 8", "Reduced load time by 50%"',
        impact: 'High Impact',
      });
    }

    if (analysis.keywords.score < 50) {
      suggestions.push({
        type: 'important', icon: '🔑', title: 'Missing Industry Keywords',
        description: `Only ${Math.round(analysis.keywords.score)}% keyword match. ATS may filter you out.`,
        action: `Include keywords: ${analysis.keywords.missing.slice(0, 4).join(', ')}`,
        impact: 'High Impact',
      });
    }

    // Improvements
    if (analysis.skills.preferredScore < 30) {
      suggestions.push({
        type: 'improvement', icon: '⭐', title: 'Add Preferred Skills',
        description: 'These skills will give you a competitive edge.',
        action: `Consider learning: ${analysis.skills.missingPreferred.slice(0, 4).join(', ')}`,
        impact: 'Medium Impact',
      });
    }

    if (!analysis.sections.sections.summary) {
      suggestions.push({
        type: 'improvement', icon: '📝', title: 'Add Professional Summary',
        description: 'A summary helps recruiters quickly understand your value.',
        action: `Write 2-3 sentences highlighting your ${roleTitle} experience.`,
        impact: 'Medium Impact',
      });
    }

    if (analysis.certifications.found.length === 0) {
      suggestions.push({
        type: 'improvement', icon: '🏆', title: 'Consider Certifications',
        description: 'Certifications validate your expertise.',
        action: `Popular for ${roleTitle}: ${roleData.certifications.slice(0, 2).join(', ')}`,
        impact: 'Medium Impact',
      });
    }

    if (!analysis.contact.linkedin) {
      suggestions.push({
        type: 'improvement', icon: '💼', title: 'Add LinkedIn Profile',
        description: '87% of recruiters use LinkedIn.',
        action: 'Add your LinkedIn URL.',
        impact: 'Medium Impact',
      });
    }

    if (analysis.wordCount < 300) {
      suggestions.push({
        type: 'important', icon: '📄', title: 'Resume Too Brief',
        description: `Only ${analysis.wordCount} words. Most ATS prefer 400-700 words.`,
        action: 'Add more details about your experience, projects, and achievements.',
        impact: 'High Impact',
      });
    } else if (analysis.wordCount > 900) {
      suggestions.push({
        type: 'improvement', icon: '✂️', title: 'Consider Condensing',
        description: `${analysis.wordCount} words may be too long for initial screening.`,
        action: 'Focus on most recent and relevant experience.',
        impact: 'Low Impact',
      });
    }

    return suggestions.sort((a, b) => {
      const priority = { critical: 0, important: 1, improvement: 2 };
      return priority[a.type] - priority[b.type];
    });
  };

  // ============ MAIN ANALYSIS ============

  const analyzeResume = () => {
    if (!resumeText.trim()) {
      Alert.alert('No Resume', 'Please upload or paste your resume first');
      return;
    }
    if (!selectedRole) {
      Alert.alert('Select Role', 'Please select your target role');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const contact = checkContactInfo(resumeText);
      const skills = checkSkillsMatch(resumeText, selectedRole);
      const keywords = checkKeywords(resumeText, selectedRole);
      const certifications = checkCertifications(resumeText, selectedRole);
      const actionVerbsResult = checkActionVerbs(resumeText);
      const metrics = checkQuantifiableResults(resumeText);
      const sections = checkSections(resumeText);
      const wordCount = getWordCount(resumeText);

      // Calculate scores with proper weights
      const scores = {
        skills: (skills.requiredScore * 0.75 + skills.preferredScore * 0.25),
        keywords: keywords.score,
        contact: (Object.values(contact).filter(Boolean).length / 5) * 100,
        actionVerbs: actionVerbsResult.score,
        metrics: metrics.score,
        sections: sections.score,
        certifications: certifications.score,
      };

      // Weighted overall score
      const weights = {
        skills: 0.30,
        keywords: 0.20,
        actionVerbs: 0.15,
        metrics: 0.15,
        contact: 0.08,
        sections: 0.07,
        certifications: 0.05,
      };

      const overallScore = Math.round(
        Object.keys(weights).reduce((total, key) => total + (scores[key] || 0) * weights[key], 0)
      );

      const analysis = {
        overallScore,
        scores,
        contact,
        skills,
        keywords,
        certifications,
        actionVerbs: actionVerbsResult,
        metrics,
        sections,
        wordCount,
      };

      const aiSuggestions = generateAISuggestions(analysis, selectedRole);
      setAnalysisResult({ ...analysis, aiSuggestions });
      setLoading(false);
    }, 1500);
  };

  // ============ UI HELPERS ============

  const getScoreColor = (score) => {
    if (score >= 80) return '#10b981';
    if (score >= 60) return '#f59e0b';
    if (score >= 40) return '#f97316';
    return '#ef4444';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return { text: 'Excellent', emoji: '🎉', desc: 'Your resume is well-optimized!' };
    if (score >= 60) return { text: 'Good', emoji: '👍', desc: 'A few improvements recommended' };
    if (score >= 40) return { text: 'Fair', emoji: '⚠️', desc: 'Needs significant improvements' };
    return { text: 'Poor', emoji: '❌', desc: 'Major changes required' };
  };

  const resetAll = () => {
    setAnalysisResult(null);
    setResumeText('');
    setPdfFileName('');
    setPdfBase64('');
    setSelectedRole(null);
  };

  // ============ RENDER RESULTS ============

  if (analysisResult) {
    const scoreLabel = getScoreLabel(analysisResult.overallScore);
    const roleData = rolesData[selectedRole];

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.resultsHeader}>
            <View>
              <Text style={styles.resultsTitle}>ATS Analysis</Text>
              <Text style={styles.resultsSubtitle}>{roleData.icon} {roleData.title}</Text>
            </View>
            <TouchableOpacity style={styles.newBtn} onPress={resetAll}>
              <Text style={styles.newBtnText}>New</Text>
            </TouchableOpacity>
          </View>

          {/* Score Card */}
          <View style={styles.scoreCard}>
            <View style={[styles.scoreCircle, { borderColor: getScoreColor(analysisResult.overallScore) }]}>
              <Text style={[styles.scoreNumber, { color: getScoreColor(analysisResult.overallScore) }]}>
                {analysisResult.overallScore}
              </Text>
              <Text style={styles.scoreMax}>/100</Text>
            </View>
            <Text style={styles.scoreLabel}>{scoreLabel.emoji} {scoreLabel.text}</Text>
            <Text style={styles.scoreDesc}>{scoreLabel.desc}</Text>
          </View>

          {/* Score Breakdown */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📊 Score Breakdown</Text>
            {[
              { label: 'Skills Match', score: analysisResult.scores.skills, icon: '🎯' },
              { label: 'Keywords', score: analysisResult.scores.keywords, icon: '🔑' },
              { label: 'Action Verbs', score: analysisResult.scores.actionVerbs, icon: '💪' },
              { label: 'Metrics/Numbers', score: analysisResult.scores.metrics, icon: '📈' },
              { label: 'Contact Info', score: analysisResult.scores.contact, icon: '📞' },
              { label: 'Sections', score: analysisResult.scores.sections, icon: '📋' },
            ].map((item, i) => (
              <View key={i} style={styles.scoreBarContainer}>
                <View style={styles.scoreBarHeader}>
                  <Text style={styles.scoreBarLabel}>{item.icon} {item.label}</Text>
                  <Text style={[styles.scoreBarValue, { color: getScoreColor(item.score) }]}>{Math.round(item.score)}%</Text>
                </View>
                <View style={styles.scoreBarBg}>
                  <View style={[styles.scoreBarFill, { width: `${Math.min(item.score, 100)}%`, backgroundColor: getScoreColor(item.score) }]} />
                </View>
              </View>
            ))}
          </View>

          {/* AI Suggestions */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🤖 AI Recommendations</Text>
            <Text style={styles.cardSubtitle}>{analysisResult.aiSuggestions.filter(s => s.type !== 'improvement').length} important items</Text>
            {analysisResult.aiSuggestions.map((s, i) => (
              <View key={i} style={[styles.suggestionCard, {
                borderLeftColor: s.type === 'critical' ? '#ef4444' : s.type === 'important' ? '#f59e0b' : '#3b82f6'
              }]}>
                <View style={styles.suggestionHeader}>
                  <Text style={styles.suggestionIcon}>{s.icon}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.suggestionTitle}>{s.title}</Text>
                    <View style={[styles.impactBadge, {
                      backgroundColor: s.impact === 'Critical' ? '#fef2f2' : s.impact === 'High Impact' ? '#fef3c7' : '#dbeafe'
                    }]}>
                      <Text style={[styles.impactText, {
                        color: s.impact === 'Critical' ? '#dc2626' : s.impact === 'High Impact' ? '#d97706' : '#2563eb'
                      }]}>{s.impact}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.suggestionDesc}>{s.description}</Text>
                <View style={styles.suggestionAction}>
                  <Text style={styles.actionLabel}>💡 Action:</Text>
                  <Text style={styles.actionText}>{s.action}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Skills Analysis */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🎯 Skills Analysis</Text>
            <Text style={styles.sectionLabel}>✅ Found ({analysisResult.skills.matchedRequired.length + analysisResult.skills.matchedPreferred.length})</Text>
            <View style={styles.chipsContainer}>
              {[...analysisResult.skills.matchedRequired, ...analysisResult.skills.matchedPreferred].map((s, i) => (
                <View key={i} style={[styles.chip, styles.chipGreen]}><Text style={styles.chipTextGreen}>{s}</Text></View>
              ))}
              {analysisResult.skills.matchedRequired.length === 0 && analysisResult.skills.matchedPreferred.length === 0 && (
                <Text style={styles.noDataText}>No matching skills found</Text>
              )}
            </View>
            
            <Text style={[styles.sectionLabel, { marginTop: 16 }]}>❌ Missing Required ({analysisResult.skills.missingRequired.length})</Text>
            <View style={styles.chipsContainer}>
              {analysisResult.skills.missingRequired.map((s, i) => (
                <View key={i} style={[styles.chip, styles.chipRed]}><Text style={styles.chipTextRed}>{s}</Text></View>
              ))}
            </View>

            {analysisResult.skills.missingPreferred.length > 0 && (
              <>
                <Text style={[styles.sectionLabel, { marginTop: 16 }]}>⭐ Nice to Have ({analysisResult.skills.missingPreferred.length})</Text>
                <View style={styles.chipsContainer}>
                  {analysisResult.skills.missingPreferred.slice(0, 6).map((s, i) => (
                    <View key={i} style={[styles.chip, styles.chipOrange]}><Text style={styles.chipTextOrange}>{s}</Text></View>
                  ))}
                </View>
              </>
            )}
          </View>

          {/* Keywords */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🔑 Keywords</Text>
            <View style={styles.keywordStats}>
              <Text style={styles.keywordStat}>✅ {analysisResult.keywords.matched.length} found</Text>
              <Text style={styles.keywordStat}>❌ {analysisResult.keywords.missing.length} missing</Text>
            </View>
            <View style={styles.chipsContainer}>
              {analysisResult.keywords.matched.map((k, i) => (
                <View key={`m-${i}`} style={[styles.chip, styles.chipGreen]}><Text style={styles.chipTextGreen}>{k}</Text></View>
              ))}
              {analysisResult.keywords.missing.map((k, i) => (
                <View key={`x-${i}`} style={[styles.chip, styles.chipRed]}><Text style={styles.chipTextRed}>{k}</Text></View>
              ))}
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📈 Quick Stats</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{analysisResult.wordCount}</Text>
                <Text style={styles.statLabel}>Words</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{analysisResult.actionVerbs.count}</Text>
                <Text style={styles.statLabel}>Action Verbs</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{analysisResult.metrics.count}</Text>
                <Text style={styles.statLabel}>Metrics</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{analysisResult.skills.matchedRequired.length}/{rolesData[selectedRole].requiredSkills.length}</Text>
                <Text style={styles.statLabel}>Req. Skills</Text>
              </View>
            </View>
          </View>

          {/* Contact Info */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📞 Contact Info</Text>
            <View style={styles.contactGrid}>
              {[
                { label: 'Email', found: analysisResult.contact.email },
                { label: 'Phone', found: analysisResult.contact.phone },
                { label: 'LinkedIn', found: analysisResult.contact.linkedin },
                { label: 'GitHub', found: analysisResult.contact.github },
                { label: 'Portfolio', found: analysisResult.contact.portfolio },
              ].map((item, i) => (
                <View key={i} style={styles.contactItem}>
                  <Text style={styles.contactIcon}>{item.found ? '✅' : '❌'}</Text>
                  <Text style={[styles.contactLabel, { color: item.found ? '#16a34a' : '#dc2626' }]}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Certifications */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🏆 Recommended Certifications</Text>
            {rolesData[selectedRole].certifications.map((c, i) => (
              <View key={i} style={styles.certRow}>
                <Text>{analysisResult.certifications.found.some(f => f.toLowerCase().includes(c.toLowerCase().split(' ')[0])) ? '✅' : '📜'}</Text>
                <Text style={styles.certText}>{c}</Text>
              </View>
            ))}
          </View>

          {/* View Extracted Text */}
          <TouchableOpacity style={styles.viewTextBtn} onPress={() => setShowTextPreview(true)}>
            <Text style={styles.viewTextBtnText}>📄 View Extracted Text</Text>
          </TouchableOpacity>

          <View style={{ height: 50 }} />
        </ScrollView>

        {/* Text Preview Modal */}
        <Modal visible={showTextPreview} animationType="slide">
          <SafeAreaView style={styles.previewModal}>
            <View style={styles.previewHeader}>
              <Text style={styles.previewTitle}>Extracted Text</Text>
              <TouchableOpacity onPress={() => setShowTextPreview(false)}>
                <Text style={styles.previewClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.previewScroll}>
              <Text style={styles.previewText}>{resumeText}</Text>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    );
  }

  // ============ RENDER INPUT ============

  return (
    <SafeAreaView style={styles.container}>
      {/* PDF Extractor */}
      <Modal visible={showPdfExtractor} animationType="fade">
        <SafeAreaView style={styles.extractorContainer}>
          <WebView
            ref={webViewRef}
            source={{ html: pdfExtractorHTML }}
            onLoad={handleWebViewLoad}
            onMessage={handleWebViewMessage}
            onError={() => { cancelExtraction(); }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            originWhitelist={['*']}
            style={{ flex: 1 }}
          />
          <TouchableOpacity style={styles.cancelBtn} onPress={cancelExtraction}>
            <Text style={styles.cancelBtnText}>✕ Cancel</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* Manual Input Modal */}
      <Modal visible={showManualInput} animationType="slide">
        <SafeAreaView style={styles.manualModal}>
          <View style={styles.manualHeader}>
            <TouchableOpacity onPress={() => setShowManualInput(false)}>
              <Text style={styles.manualCancel}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.manualTitle}>Paste Resume</Text>
            <TouchableOpacity onPress={() => {
              if (manualText.trim()) {
                setResumeText(manualText);
                setPdfFileName('Manual Input');
                setShowManualInput(false);
              }
            }}>
              <Text style={[styles.manualDone, !manualText.trim() && { opacity: 0.4 }]}>Done</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.manualInput}
            placeholder="Paste your entire resume text here..."
            placeholderTextColor="#9ca3af"
            multiline
            value={manualText}
            onChangeText={setManualText}
            textAlignVertical="top"
          />
          <Text style={styles.manualCount}>{getWordCount(manualText)} words</Text>
        </SafeAreaView>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerIcon}>📄</Text>
          <Text style={styles.headerTitle}>ATS Resume Scorer</Text>
          <Text style={styles.headerSubtitle}>Optimize your resume for ATS</Text>
        </View>

        {/* Step 1 */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepBadge}><Text style={styles.stepBadgeText}>1</Text></View>
            <Text style={styles.stepTitle}>Select Target Role</Text>
          </View>
          <TouchableOpacity style={styles.selector} onPress={() => setShowRolePicker(true)}>
            {selectedRole ? (
              <View style={styles.selectedItem}>
                <Text style={styles.selectedIcon}>{rolesData[selectedRole].icon}</Text>
                <Text style={styles.selectedText}>{rolesData[selectedRole].title}</Text>
              </View>
            ) : (
              <Text style={styles.placeholder}>Choose role...</Text>
            )}
            <Text style={styles.arrow}>▼</Text>
          </TouchableOpacity>
          {selectedRole && (
            <View style={styles.skillsPreview}>
              <Text style={styles.previewTitle}>We'll check for:</Text>
              <View style={styles.chipsContainer}>
                {rolesData[selectedRole].requiredSkills.slice(0, 4).map((s, i) => (
                  <View key={i} style={styles.previewChip}><Text style={styles.previewChipText}>{s.name}</Text></View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Step 2 */}
        <View style={styles.stepCard}>
          <View style={styles.stepHeader}>
            <View style={styles.stepBadge}><Text style={styles.stepBadgeText}>2</Text></View>
            <Text style={styles.stepTitle}>Upload Resume</Text>
          </View>
          <TouchableOpacity 
            style={[styles.uploadBox, resumeText && styles.uploadBoxSuccess]}
            onPress={pickPDF}
            disabled={extracting}
          >
            {extracting ? (
              <><ActivityIndicator size="large" color="#3b82f6" /><Text style={styles.uploadTitle}>Processing...</Text></>
            ) : resumeText ? (
              <>
                <Text style={styles.successIcon}>✅</Text>
                <Text style={styles.uploadTitleSuccess}>{pdfFileName || 'Resume loaded'}</Text>
                <Text style={styles.uploadSubtext}>{getWordCount(resumeText)} words</Text>
                <View style={styles.uploadActions}>
                  <TouchableOpacity style={styles.changeBtn}><Text style={styles.changeBtnText}>Change</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.previewBtn} onPress={() => setShowTextPreview(true)}>
                    <Text style={styles.previewBtnText}>Preview</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.uploadIcon}>📤</Text>
                <Text style={styles.uploadTitle}>Tap to Upload PDF</Text>
                <Text style={styles.uploadSubtext}>Or paste text manually</Text>
              </>
            )}
          </TouchableOpacity>
          
          {!resumeText && (
            <TouchableOpacity style={styles.manualBtn} onPress={() => setShowManualInput(true)}>
              <Text style={styles.manualBtnText}>📝 Paste Text Manually</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Analyze Button */}
        <TouchableOpacity
          style={[styles.analyzeBtn, (!selectedRole || !resumeText || loading) && styles.analyzeBtnDisabled]}
          onPress={analyzeResume}
          disabled={!selectedRole || !resumeText || loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.analyzeBtnText}>🔍 Analyze Resume</Text>}
        </TouchableOpacity>

        <View style={styles.featuresCard}>
          <Text style={styles.featuresTitle}>✨ What You Get</Text>
          {['📊 ATS compatibility score', '🎯 Skills gap analysis', '🔑 Keyword optimization', '🤖 AI suggestions', '📈 Actionable improvements'].map((f, i) => (
            <Text key={i} style={styles.featureItem}>{f}</Text>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Role Picker */}
      <Modal visible={showRolePicker} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Role</Text>
              <TouchableOpacity onPress={() => setShowRolePicker(false)}><Text style={styles.modalClose}>✕</Text></TouchableOpacity>
            </View>
            <FlatList
              data={rolesList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.roleItem, selectedRole === item.id && styles.roleItemSelected]}
                  onPress={() => { setSelectedRole(item.id); setShowRolePicker(false); }}
                >
                  <Text style={styles.roleIcon}>{item.icon}</Text>
                  <View style={styles.roleInfo}>
                    <Text style={styles.roleTitle}>{item.title}</Text>
                    <Text style={styles.roleSkills}>{item.requiredSkills.slice(0, 3).map(s => s.name).join(' • ')}</Text>
                  </View>
                  {selectedRole === item.id && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Text Preview */}
      <Modal visible={showTextPreview} animationType="slide">
        <SafeAreaView style={styles.previewModal}>
          <View style={styles.previewHeader}>
            <Text style={styles.previewTitle}>Extracted Text</Text>
            <TouchableOpacity onPress={() => setShowTextPreview(false)}>
              <Text style={styles.previewClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.previewScroll}>
            <Text style={styles.previewText}>{resumeText || 'No text extracted yet'}</Text>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  header: { alignItems: 'center', paddingVertical: 24 },
  headerIcon: { fontSize: 48, marginBottom: 8 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#1e293b' },
  headerSubtitle: { fontSize: 15, color: '#64748b', marginTop: 4 },
  stepCard: { backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 14, borderRadius: 16, padding: 18, elevation: 2 },
  stepHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  stepBadge: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#3b82f6', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  stepBadgeText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  stepTitle: { fontSize: 17, fontWeight: '600', color: '#1e293b' },
  selector: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8fafc', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#e2e8f0' },
  selectedItem: { flexDirection: 'row', alignItems: 'center' },
  selectedIcon: { fontSize: 22, marginRight: 10 },
  selectedText: { fontSize: 15, fontWeight: '600', color: '#1e293b' },
  placeholder: { fontSize: 15, color: '#94a3b8' },
  arrow: { fontSize: 11, color: '#94a3b8' },
  skillsPreview: { marginTop: 14 },
  previewTitle: { fontSize: 12, color: '#64748b', marginBottom: 6 },
  chipsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  previewChip: { backgroundColor: '#dbeafe', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, marginRight: 5, marginBottom: 5 },
  previewChipText: { fontSize: 11, color: '#2563eb', fontWeight: '500' },
  uploadBox: { backgroundColor: '#f8fafc', borderRadius: 14, padding: 32, alignItems: 'center', borderWidth: 2, borderStyle: 'dashed', borderColor: '#cbd5e1' },
  uploadBoxSuccess: { borderStyle: 'solid', borderColor: '#10b981', backgroundColor: '#f0fdf4' },
  uploadIcon: { fontSize: 44, marginBottom: 10 },
  successIcon: { fontSize: 44, marginBottom: 10 },
  uploadTitle: { fontSize: 16, fontWeight: '600', color: '#475569' },
  uploadTitleSuccess: { fontSize: 15, fontWeight: '600', color: '#166534' },
  uploadSubtext: { fontSize: 13, color: '#64748b', marginTop: 3 },
  uploadActions: { flexDirection: 'row', marginTop: 14 },
  changeBtn: { paddingHorizontal: 14, paddingVertical: 7, backgroundColor: '#dcfce7', borderRadius: 8, marginRight: 8 },
  changeBtnText: { color: '#166534', fontWeight: '600', fontSize: 13 },
  previewBtn: { paddingHorizontal: 14, paddingVertical: 7, backgroundColor: '#dbeafe', borderRadius: 8 },
  previewBtnText: { color: '#1d4ed8', fontWeight: '600', fontSize: 13 },
  manualBtn: { marginTop: 12, padding: 12, alignItems: 'center' },
  manualBtnText: { color: '#3b82f6', fontWeight: '600' },
  analyzeBtn: { backgroundColor: '#3b82f6', marginHorizontal: 16, paddingVertical: 16, borderRadius: 14, alignItems: 'center' },
  analyzeBtnDisabled: { backgroundColor: '#94a3b8' },
  analyzeBtnText: { color: '#fff', fontSize: 17, fontWeight: '600' },
  featuresCard: { backgroundColor: '#eff6ff', marginHorizontal: 16, marginTop: 18, borderRadius: 14, padding: 18 },
  featuresTitle: { fontSize: 16, fontWeight: '600', color: '#1e40af', marginBottom: 10 },
  featureItem: { fontSize: 14, color: '#3b82f6', marginVertical: 3 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 22, borderTopRightRadius: 22, maxHeight: '75%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  modalTitle: { fontSize: 18, fontWeight: '600', color: '#1e293b' },
  modalClose: { fontSize: 22, color: '#6b7280', padding: 4 },
  roleItem: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  roleItemSelected: { backgroundColor: '#eff6ff' },
  roleIcon: { fontSize: 28, marginRight: 14 },
  roleInfo: { flex: 1 },
  roleTitle: { fontSize: 15, fontWeight: '600', color: '#1e293b' },
  roleSkills: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  checkmark: { fontSize: 18, color: '#3b82f6', fontWeight: 'bold' },
  extractorContainer: { flex: 1, backgroundColor: '#667eea' },
  cancelBtn: { position: 'absolute', bottom: 40, alignSelf: 'center', backgroundColor: '#ef4444', paddingHorizontal: 28, paddingVertical: 12, borderRadius: 24 },
  cancelBtnText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  manualModal: { flex: 1, backgroundColor: '#fff' },
  manualHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  manualCancel: { fontSize: 16, color: '#6b7280' },
  manualTitle: { fontSize: 17, fontWeight: '600', color: '#1e293b' },
  manualDone: { fontSize: 16, fontWeight: '600', color: '#3b82f6' },
  manualInput: { flex: 1, padding: 16, fontSize: 15, lineHeight: 22 },
  manualCount: { padding: 16, textAlign: 'right', color: '#6b7280', borderTopWidth: 1, borderTopColor: '#e5e7eb' },
  resultsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 18 },
  resultsTitle: { fontSize: 22, fontWeight: 'bold', color: '#1e293b' },
  resultsSubtitle: { fontSize: 14, color: '#64748b', marginTop: 2 },
  newBtn: { backgroundColor: '#e2e8f0', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  newBtnText: { color: '#475569', fontWeight: '600', fontSize: 13 },
  scoreCard: { backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 18, padding: 28, alignItems: 'center', marginBottom: 14, elevation: 3 },
  scoreCircle: { width: 130, height: 130, borderRadius: 65, borderWidth: 8, justifyContent: 'center', alignItems: 'center' },
  scoreNumber: { fontSize: 42, fontWeight: 'bold' },
  scoreMax: { fontSize: 14, color: '#9ca3af' },
  scoreLabel: { fontSize: 22, fontWeight: '600', marginTop: 14, color: '#1e293b' },
  scoreDesc: { fontSize: 13, color: '#64748b', marginTop: 4, textAlign: 'center' },
  card: { backgroundColor: '#fff', marginHorizontal: 16, borderRadius: 14, padding: 18, marginBottom: 14 },
  cardTitle: { fontSize: 17, fontWeight: '600', color: '#1e293b', marginBottom: 14 },
  cardSubtitle: { fontSize: 13, color: '#64748b', marginTop: -8, marginBottom: 12 },
  scoreBarContainer: { marginBottom: 12 },
  scoreBarHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  scoreBarLabel: { fontSize: 13, color: '#4b5563' },
  scoreBarValue: { fontSize: 13, fontWeight: '600' },
  scoreBarBg: { height: 8, backgroundColor: '#e5e7eb', borderRadius: 4, overflow: 'hidden' },
  scoreBarFill: { height: '100%', borderRadius: 4 },
  chip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, marginRight: 6, marginBottom: 6 },
  chipGreen: { backgroundColor: '#dcfce7' },
  chipRed: { backgroundColor: '#fee2e2' },
  chipOrange: { backgroundColor: '#ffedd5' },
  chipTextGreen: { fontSize: 12, color: '#166534', fontWeight: '500' },
  chipTextRed: { fontSize: 12, color: '#dc2626', fontWeight: '500' },
  chipTextOrange: { fontSize: 12, color: '#c2410c', fontWeight: '500' },
  suggestionCard: { backgroundColor: '#f8fafc', borderRadius: 12, padding: 14, marginBottom: 12, borderLeftWidth: 4 },
  suggestionHeader: { flexDirection: 'row', marginBottom: 8 },
  suggestionIcon: { fontSize: 22, marginRight: 10 },
  suggestionTitle: { fontSize: 15, fontWeight: '600', color: '#1e293b', marginBottom: 5 },
  impactBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  impactText: { fontSize: 10, fontWeight: '600' },
  suggestionDesc: { fontSize: 13, color: '#4b5563', marginBottom: 10, lineHeight: 18 },
  suggestionAction: { backgroundColor: '#fff', padding: 10, borderRadius: 8 },
  actionLabel: { fontSize: 11, fontWeight: '600', color: '#6b7280', marginBottom: 3 },
  actionText: { fontSize: 13, color: '#1e293b', lineHeight: 18 },
  sectionLabel: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 8 },
  noDataText: { fontSize: 13, color: '#9ca3af', fontStyle: 'italic' },
  keywordStats: { flexDirection: 'row', marginBottom: 12 },
  keywordStat: { marginRight: 16, fontSize: 13, color: '#4b5563' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  statBox: { width: '50%', alignItems: 'center', paddingVertical: 10 },
  statNumber: { fontSize: 26, fontWeight: 'bold', color: '#3b82f6' },
  statLabel: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  contactGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  contactItem: { flexDirection: 'row', alignItems: 'center', width: '50%', paddingVertical: 6 },
  contactIcon: { fontSize: 16, marginRight: 6 },
  contactLabel: { fontSize: 13, fontWeight: '500' },
  certRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  certText: { fontSize: 13, color: '#4b5563', marginLeft: 8, flex: 1 },
  viewTextBtn: { marginHorizontal: 16, marginBottom: 10, padding: 14, backgroundColor: '#f1f5f9', borderRadius: 12, alignItems: 'center' },
  viewTextBtnText: { color: '#475569', fontWeight: '600' },
  previewModal: { flex: 1, backgroundColor: '#fff' },
  previewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  previewTitle: { fontSize: 17, fontWeight: '600', color: '#1e293b' },
  previewClose: { fontSize: 22, color: '#6b7280' },
  previewScroll: { flex: 1, padding: 16 },
  previewText: { fontSize: 14, lineHeight: 22, color: '#374151' },
});

export default ATSScorePage;