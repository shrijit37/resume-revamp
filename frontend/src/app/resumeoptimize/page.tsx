"use client";
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2, Download, Eye, X } from 'lucide-react';


//types


type UserResumeData = {
  personalInfo: {
    name: string;
    phone: string;
    email: string;
    github?: string;
    linkedin?: string;
    leetcode?: string;
    website?: string;
    location?: string;
  };
  summary: string;
  education: Array<{
    degree: string;
    institution: string;
    field: string;
    gpa?: string;
    startDate?: string;
    endDate?: string;
  }>;
  skills: {
    Frontend: string;
    Backend: string;
    Tools: string;
    Databases: string;
    Languages: string;
    Other: string;
    AI: string;
  };
  experience: Array<{
    title: string;
    company: string;
    startDate?: string;
    endDate?: string;
    current: boolean;

    description: string;
    achievements: string[];
  }>;
  projects: Array<{
    name: string;
    liveUrl?: string;
    codeUrl?: string;
    description: string[];
  }>;
  certifications: string[];
  languages: string[];
  awards: string[];
};


type UserResumeDataArrayKeys = {
  [K in keyof UserResumeData]: UserResumeData[K] extends any[] ? K : never
}[keyof UserResumeData];

///-------------------
export default function ResumeBuilder() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);


  
  const [resumeData, setResumeData] = useState<UserResumeData>({
    personalInfo: {
      name: '',
      phone: '',
      email: '',
      github: '',
      linkedin: '',
      leetcode: '',
      website: '',
      location: ''
    },
    summary: '',
    education: [{
      degree: '',
      institution: '',
      field: '',
      gpa: '',
      startDate: '',
      endDate: ''
    }],
    skills: {
      Frontend: '',
      Backend: '',
      Tools: '',
      Databases: '',
      Languages: '',
      Other: '',
      AI:''
    },
    experience: [{
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: ['']
    }],
    projects: [{
      name: '',
      liveUrl: '',
      codeUrl: '',
      description: ['']
    }],
    certifications: [''],
    languages: [''],
    awards: ['']
  });

  // Standardized Resume Template
  const getResumeTemplate = (data : UserResumeData) => {
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${data.personalInfo.name || 'Resume'} – Resume</title>
  <style>
    body {
      font-family: "Computer Modern", "Georgia", serif;
      font-size: 12pt;
      line-height: 1.25;
      margin: 0;
      padding: 0;
      background: white;
      color: #000;
    }
    .resume {
      width: 8.5in;
      max-width: 100%;
      margin: 0 auto;
      padding: 0.4in;
      box-sizing: border-box;
    }
    h1 {
      text-transform: uppercase;
      font-size: 18pt;
      text-align: center;
      margin-bottom: 0.3em;
    }
    .contact {
      text-align: center;
      font-size: 10.5pt;
      margin-bottom: 1em;
    }
    .contact p {
      margin: 0.2em 0;
    }
    a {
      color: black;
      text-decoration: none;
    }
    section {
      margin-bottom: 0.75em;
    }
    h2 {
      text-transform: uppercase;
      font-weight: bold;
      font-size: 12pt;
      border-bottom: 1px solid #000;
      margin-bottom: 0.4em;
    }
    ul {
      margin: 0;
      padding-left: 1.1em;
    }
    ul li {
      margin-bottom: 0.2em;
    }
    p {
      margin: 0.2em 0;
    }
    table {
      width: 100%;
      border-spacing: 0;
      margin-bottom: 0.5em;
    }
    table th {
      text-align: left;
      vertical-align: top;
      padding-right: 1em;
      white-space: nowrap;
    }
    .right {
      float: right;
    }
    .hidden-section {
      display: none;
    }
  </style>
</head>
<body>
  <div class="resume">
    <h1>${data.personalInfo.name || 'Your Name'}</h1>

    <div class="contact">
      <p>${data.personalInfo.phone || 'Phone'} &nbsp; ◊ &nbsp; <a href="mailto:${data.personalInfo.email || 'email@example.com'}">${data.personalInfo.email || 'email@example.com'}</a></p>
      <p>
        ${data.personalInfo.github ? `<a href="${data.personalInfo.github}">GitHub</a> ◊ ` : ''}
        ${data.personalInfo.linkedin ? `<a href="${data.personalInfo.linkedin}">LinkedIn</a>` : ''}
        ${data.personalInfo.leetcode ? ` ◊ <a href="${data.personalInfo.leetcode}">LeetCode</a>` : ''}
        ${data.personalInfo.website ? ` ◊ <a href="${data.personalInfo.website}">Portfolio</a>` : ''}
      </p>
      ${data.personalInfo.location ? `<p>${data.personalInfo.location}</p>` : ''}
    </div>

    ${data.summary ? `
    <section>
      <h2>Professional Summary</h2>
      <p>${data.summary}</p>
    </section>
    ` : ''}

    ${data.education.some(edu => edu.degree || edu.institution) ? `
    <section>
      <h2>Education</h2>
      ${data.education.map(edu => 
        edu.degree || edu.institution ? `
        <p><strong>${edu.degree || 'Degree'}</strong>, ${edu.institution || 'Institution'} 
        ${edu.startDate || edu.endDate ? `<span class="right">${edu.startDate || ''} ${edu.startDate && edu.endDate ? ' - ' : ''}${edu.endDate || ''}</span>` : ''}<br/>
        ${edu.field ? `${edu.field}${edu.gpa ? `, GPA: ${edu.gpa}` : ''}` : ''}
        </p>` : ''
      ).join('')}
    </section>
    ` : ''}

    ${Object.values(data.skills).some(skill => skill.trim()) ? `
    <section>
      <h2>Technical Skills</h2>
      <table>
        ${Object.entries(data.skills).map(([category, skills]) => 
          skills.trim() ? `<tr><th>${category}</th><td>${skills}</td></tr>` : ''
        ).join('')}
      </table>
    </section>
    ` : ''}

    ${data.experience.some(exp => exp.title || exp.company) ? `
    <section>
      <h2>Experience</h2>
      ${data.experience.map(exp => 
        exp.title || exp.company ? `
        <p><strong>${exp.title || 'Job Title'}</strong>, ${exp.company || 'Company'} 
        ${exp.startDate || exp.endDate ? `<span class="right">${exp.startDate || ''} ${exp.startDate && exp.endDate ? ' – ' : ''}${exp.current ? 'Present' : exp.endDate || ''}</span>` : ''}<br/>
        ${exp.description ? `<em>${exp.description}</em>` : ''}
        </p>
        ${exp.achievements.some(ach => ach.trim()) ? `
        <ul>
          ${exp.achievements.map(achievement => 
            achievement.trim() ? `<li>${achievement}</li>` : ''
          ).join('')}
        </ul>
        ` : ''}
        ` : ''
      ).join('')}
    </section>
    ` : ''}

    ${data.projects.some(proj => proj.name) ? `
    <section>
      <h2>Projects</h2>
      ${data.projects.map(project => 
        project.name ? `
        <p><strong>${project.name}</strong> 
        ${project.liveUrl ? `<a href="${project.liveUrl}">(Live)</a> ` : ''}
        ${project.codeUrl ? `<a href="${project.codeUrl}">(Code)</a>` : ''}
        </p>
        ${project.description.some(desc => desc.trim()) ? `
        <ul>
          ${project.description.map(desc => 
            desc.trim() ? `<li>${desc}</li>` : ''
          ).join('')}
        </ul>
        ` : ''}
        ` : ''
      ).join('')}
    </section>
    ` : ''}

    ${data.certifications.some(cert => cert.trim()) ? `
    <section>
      <h2>Certifications & Achievements</h2>
      <ul>
        ${data.certifications.map(cert => 
          cert.trim() ? `<li>${cert}</li>` : ''
        ).join('')}
      </ul>
    </section>
    ` : ''}

    ${data.languages.some(lang => lang.trim()) ? `
    <section>
      <h2>Languages</h2>
      <ul>
        ${data.languages.map(lang => 
          lang.trim() ? `<li>${lang}</li>` : ''
        ).join('')}
      </ul>
    </section>
    ` : ''}

    ${data.awards.some(award => award.trim()) ? `
    <section>
      <h2>Awards & Honors</h2>
      <ul>
        ${data.awards.map(award => 
          award.trim() ? `<li>${award}</li>` : ''
        ).join('')}
      </ul>
    </section>
    ` : ''}

  </div>
</body>
</html>
    `;
  };

  const updatePersonalInfo = (field: any, value: any) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { degree: '', institution: '', field: '', gpa: '', startDate: '', endDate: '' }]
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const updateEducation = (index: number, field: any, value: any) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const updateSkills = (category: any, value: any) => {
    setResumeData(prev => ({
      ...prev,
      skills: { ...prev.skills, [category]: value }
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { title: '', company: '', startDate: '', endDate: '', current: false, description: '', achievements: [''] }]
    }));
  };

  const removeExperience = (index:any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const updateExperience = (index:any, field:any, value:any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addAchievement = (expIndex:any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? { ...exp, achievements: [...exp.achievements, ''] } : exp
      )
    }));
  };

  const removeAchievement = (expIndex:any, achIndex:any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? { ...exp, achievements: exp.achievements.filter((_, j) => j !== achIndex) } : exp
      )
    }));
  };

  const updateAchievement = (expIndex:any, achIndex:any, value:any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex ? { 
          ...exp, 
          achievements: exp.achievements.map((ach, j) => j === achIndex ? value : ach) 
        } : exp
      )
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', liveUrl: '', codeUrl: '', description: [''] }]
    }));
  };

  const removeProject = (index:any) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const updateProject = (index:any, field:any, value:any) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const addProjectDescription = (projIndex:any) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === projIndex ? { ...proj, description: [...proj.description, ''] } : proj
      )
    }));
  };

  const removeProjectDescription = (projIndex:any, descIndex:any) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === projIndex ? { ...proj, description: proj.description.filter((_, j) => j !== descIndex) } : proj
      )
    }));
  };

  const updateProjectDescription = (projIndex:any, descIndex:any, value:any) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === projIndex ? { 
          ...proj, 
          description: proj.description.map((desc, j) => j === descIndex ? value : desc) 
        } : proj
      )
    }));
  };

  const addArrayItem = (section:UserResumeDataArrayKeys) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], '']
    }));
  };

  const removeArrayItem = (section:UserResumeDataArrayKeys, index:any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const updateArrayItem = (section:UserResumeDataArrayKeys, index:any, value:any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => i === index ? value : item)
    }));
  };

  const handleDownloadPDF = () => {
    const iframe = iframeRef.current;
    
    if (iframe) {
      try {
        if (iframe?.contentWindow) {
          iframe?.contentWindow.focus();
          iframe?.contentWindow.print();
        }
      } catch (error) {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(getResumeTemplate(resumeData));
          printWindow.document.close();
          
          printWindow.addEventListener('load', () => {
            printWindow.print();
            printWindow.addEventListener('afterprint', () => {
              printWindow.close();
            });
          });
        }
      }
    }
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (iframeRef.current) {
       (iframeRef.current as HTMLIFrameElement).srcdoc = getResumeTemplate(resumeData);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [resumeData]);



  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 min-h-screen  ">
      {/* Form Section */}
      <div className="space-y-6 overflow-y-auto max-h-screen order-1 lg:order-1">
        <Button variant={"outline"} className='hover:bg-red-100'> Write with AI.</Button>
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => updatePersonalInfo('name', e.target.value)}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={resumeData.personalInfo.github}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="website">Portfolio/Website</Label>
                <Input
                  id="website"
                  value={resumeData.personalInfo.website}
                  onChange={(e) => updatePersonalInfo('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  placeholder="City, State"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="leetcode">LeetCode</Label>
              <Input
                id="leetcode"
                value={resumeData.personalInfo.leetcode}
                onChange={(e) => updatePersonalInfo('leetcode', e.target.value)}
                placeholder="https://leetcode.com/username"
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Professional Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={resumeData.summary}
              onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
              placeholder="Write a brief professional summary highlighting your key skills and experience..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                Education
              </div>
              <Button onClick={addEducation} size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">Education {index + 1}</Badge>
                  {resumeData.education.length > 1 && (
                    <Button onClick={() => removeEducation(index)} size="sm" variant="ghost">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Degree</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div>
                    <Label>Institution</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      placeholder="University Name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label>Field of Study</Label>
                    <Input
                      value={edu.field}
                      onChange={(e) => updateEducation(index, 'field', e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      value={edu.startDate}
                      onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                      placeholder="2020"
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      value={edu.endDate}
                      onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                      placeholder="2024"
                    />
                  </div>
                </div>
                <div>
                  <Label>GPA (Optional)</Label>
                  <Input
                    value={edu.gpa}
                    onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                    placeholder="3.8/4.0"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Technical Skills */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Technical Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category}>
                <Label>{category}</Label>
                <Input
                  value={skills}
                  onChange={(e) => updateSkills(category, e.target.value)}
                  placeholder={`Enter ${category.toLowerCase()} skills separated by commas`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Experience */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                Experience
              </div>
              <Button onClick={addExperience} size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">Experience {index + 1}</Badge>
                  {resumeData.experience.length > 1 && (
                    <Button onClick={() => removeExperience(index)} size="sm" variant="ghost">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Job Title</Label>
                    <Input
                      value={exp.title}
                      onChange={(e) => updateExperience(index, 'title', e.target.value)}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      placeholder="Company Name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      value={exp.startDate}
                      onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                      placeholder="Jan 2023"
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      value={exp.endDate}
                      onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                      placeholder="Dec 2023"
                      disabled={exp.current}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                    />
                    <Label>Current Job</Label>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    value={exp.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    placeholder="Brief job description"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Key Achievements</Label>
                    <Button onClick={() => addAchievement(index)} size="sm" variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {exp.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex gap-2 mb-2">
                      <Input
                        value={achievement}
                        onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                        placeholder="Describe your achievement..."
                      />
                      {exp.achievements.length > 1 && (
                        <Button 
                          onClick={() => removeAchievement(index, achIndex)} 
                          size="sm" 
                          variant="ghost"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Projects */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                Projects
              </div>
              <Button onClick={addProject} size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {resumeData.projects.map((project, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">Project {index + 1}</Badge>
                  {resumeData.projects.length > 1 && (
                    <Button onClick={() => removeProject(index)} size="sm" variant="ghost">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div>
                  <Label>Project Name</Label>
                  <Input
                    value={project.name}
                    onChange={(e) => updateProject(index, 'name', e.target.value)}
                    placeholder="My Awesome Project"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Live URL</Label>
                    <Input
                      value={project.liveUrl}
                      onChange={(e) => updateProject(index, 'liveUrl', e.target.value)}
                      placeholder="https://myproject.com"
                    />
                  </div>
                  <div>
                    <Label>Code URL</Label>
                    <Input
                      value={project.codeUrl}
                      onChange={(e) => updateProject(index, 'codeUrl', e.target.value)}
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>Project Description</Label>
                    <Button onClick={() => addProjectDescription(index)} size="sm" variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {project.description.map((desc, descIndex) => (
                    <div key={descIndex} className="flex gap-2 mb-2">
                      <Input
                        value={desc}
                        onChange={(e) => updateProjectDescription(index, descIndex, e.target.value)}
                        placeholder="Describe what you built or achieved..."
                      />
                      {project.description.length > 1 && (
                        <Button 
                          onClick={() => removeProjectDescription(index, descIndex)} 
                          size="sm" 
                          variant="ghost"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                Certifications & Achievements
              </div>
              <Button onClick={() => addArrayItem('certifications')} size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={cert}
                  onChange={(e) => updateArrayItem('certifications', index, e.target.value)}
                  placeholder="AWS Certified Developer, Google Analytics Certified, etc."
                />
                {resumeData.certifications.length > 1 && (
                  <Button 
                    onClick={() => removeArrayItem('certifications', index)} 
                    size="sm" 
                    variant="ghost"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Languages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                Languages
              </div>
              <Button onClick={() => addArrayItem('languages')} size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {resumeData.languages.map((lang, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={lang}
                  onChange={(e) => updateArrayItem('languages', index, e.target.value)}
                  placeholder="English (Native), Spanish (Conversational), etc."
                />
                {resumeData.languages.length > 1 && (
                  <Button 
                    onClick={() => removeArrayItem('languages', index)} 
                    size="sm" 
                    variant="ghost"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Awards */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                Awards & Honors
              </div>
              <Button onClick={() => addArrayItem('awards')} size="sm" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {resumeData.awards.map((award, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={award}
                  onChange={(e) => updateArrayItem('awards', index, e.target.value)}
                  placeholder="Dean's List, Employee of the Month, etc."
                />
                {resumeData.awards.length > 1 && (
                  <Button 
                    onClick={() => removeArrayItem('awards', index)} 
                    size="sm" 
                    variant="ghost"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <Button onClick={handleDownloadPDF} className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download as PDF
              </Button>
              <Button 
                variant="outline" 
                onClick={() => console.log('Resume Data:', JSON.stringify(resumeData, null, 2))}
                className="flex-1"
              >
                <Eye className="w-4 h-4 mr-2" />
                View JSON
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section */}
      <div className="sticky top-6 order-2 lg:order-2 h-[90vh]">
        <Card className="h-[calc(100vh-3rem)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Live Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[calc(100%-4rem)]">
            <iframe
              ref={iframeRef}
              title="Resume Preview"
              className="w-full h-[90vh] border-0"
              sandbox="allow-modals allow-scripts allow-same-origin"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}