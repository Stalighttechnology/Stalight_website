const fs = require('fs');
const path = require('path');

const replacements = [
  // HeroSection.tsx
  { file: 'src/components/HeroSection.tsx', from: 'enterprise-grade AI with', to: 'enterprise-grade technology with' },
  
  // NeuroCampusAccessPlan.tsx
  { file: 'src/pages/NeuroCampusAccessPlan.tsx', from: /AI-Powered Assistance/g, to: 'Smart Assistance' },
  { file: 'src/pages/NeuroCampusAccessPlan.tsx', from: /enterprise-grade AI intelligence/g, to: 'enterprise-grade intelligence' },

  // NeuroCampus.tsx
  { file: 'src/pages/NeuroCampus.tsx', from: /AI-driven biometric/g, to: 'Advanced biometric' },
  { file: 'src/pages/NeuroCampus.tsx', from: /"Stalight AI"/g, to: '"Stalight Smart Systems"' },
  { file: 'src/pages/NeuroCampus.tsx', from: /AI-driven insights/g, to: 'Smart insights' },
  { file: 'src/pages/NeuroCampus.tsx', from: /AI-driven analytics/g, to: 'advanced analytics' },

  // NeuroSync.tsx
  { file: 'src/pages/NeuroSync.tsx', from: /NEURA Interview AI/g, to: 'NEURA Smart Interview' },
  { file: 'src/pages/NeuroSync.tsx', from: /AI-proctoring/g, to: 'smart proctoring' },
  { file: 'src/pages/NeuroSync.tsx', from: /AI mock interviews/g, to: 'smart mock interviews' },
  { file: 'src/pages/NeuroSync.tsx', from: /Proctoring AI/g, to: 'Smart Proctoring' },
  { file: 'src/pages/NeuroSync.tsx', from: /AI-driven interview simulations/g, to: 'smart interview simulations' },
  { file: 'src/pages/NeuroSync.tsx', from: /Sync AI Feature/g, to: 'Sync Feature' },

  // SkillDevelopment.tsx
  { file: 'src/pages/SkillDevelopment.tsx', from: /Applied AI & Machine Learning/g, to: 'Applied Machine Learning' },
  { file: 'src/pages/SkillDevelopment.tsx', from: /modern AI architectures/g, to: 'modern architectures' },
  { file: 'src/pages/SkillDevelopment.tsx', from: /Stalight Certified AI Practitioner/g, to: 'Stalight Certified ML Practitioner' },
  { file: 'src/pages/SkillDevelopment.tsx', from: /AI, Full-Stack, and Cloud/g, to: 'Machine Learning, Full-Stack, and Cloud' },

  // AboutUs.tsx
  { file: 'src/pages/AboutUs.tsx', from: /AI\/ML/g, to: 'Machine Learning' },

  // ITServices.tsx
  { file: 'src/pages/ITServices.tsx', from: /AI Automation/g, to: 'Workflow Automation' },
  { file: 'src/pages/ITServices.tsx', from: /AI-powered/g, to: 'advanced' },
  { file: 'src/pages/ITServices.tsx', from: /AI-driven/g, to: 'automated' },
  { file: 'src/pages/ITServices.tsx', from: /AI & Workflow Automation/g, to: 'Advanced Workflow Automation' }
];

replacements.forEach(({ file, from, to }) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(from, to);
    fs.writeFileSync(filePath, content);
  } else {
    console.warn('File not found:', file);
  }
});
console.log('Replacements complete.');
