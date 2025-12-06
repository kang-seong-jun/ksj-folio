'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  profile, 
  contactInfo, 
  education, 
  publications, 
  awards, 
  skills, 
  researchInterests, 
  currentActivities,
  scholarMetrics 
} from '@/lib/data';

// Dynamic import for Three.js component (client-side only)
const ParticleField = dynamic(() => import('@/components/three/ParticleField'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950" />
});

// Function to highlight author name
function highlightAuthor(authors: string) {
  const parts = authors.split(/(Seong-Jun Kang\*?|SJ Kang)/gi);
  return parts.map((part, index) => {
    if (/Seong-Jun Kang\*?|SJ Kang/i.test(part)) {
      return (
        <span key={index} className="font-semibold text-blue-600 dark:text-cyan-400">
          {part}
        </span>
      );
    }
    return part;
  });
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('about');

  // Group publications by year
  const publicationsByYear = publications.reduce((acc, pub) => {
    if (!acc[pub.year]) acc[pub.year] = [];
    acc[pub.year].push(pub);
    return acc;
  }, {} as Record<string, typeof publications>);
  const sortedYears = Object.keys(publicationsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'research', 'publications', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-950 dark:via-purple-950/10 dark:to-slate-950">
      {/* Fixed Navigation - Glassmorphism */}
      <nav className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <button 
            onClick={() => scrollToSection('about')}
            className="text-lg font-bold tracking-tight"
          >
            Seong-Jun Kang
          </button>
          
          <div className="hidden items-center gap-1 md:flex">
            {[
              { id: 'about', label: 'About' },
              { id: 'research', label: 'Research' },
              { id: 'publications', label: 'Publications' },
              { id: 'skills', label: 'Skills' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                    : 'text-muted-foreground hover:bg-white/50 hover:text-foreground dark:hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild size="sm" className="glass hidden sm:flex border-0 bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90">
              <a href={`mailto:${contactInfo.email}`}>
                Contact Me
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Particles */}
      <section id="about" className="relative min-h-screen overflow-hidden pt-16">
        <ParticleField className="z-0" />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-background/30 to-background" />
        
        <div className="relative z-20 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col items-center justify-center px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-orange-600 dark:text-orange-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500"></span>
                </span>
                Open to Postdoctoral Opportunities
              </div>

              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                <span className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent dark:from-white dark:via-purple-200 dark:to-white">
                  {profile.name}
                </span>
              </h1>

              <p className="mb-6 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-xl font-medium text-transparent lg:text-2xl">
                {profile.title}
              </p>

              <p className="mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
                I am an immunologist and AI researcher working at the interface of{' '}
                <span className="font-semibold text-foreground">brain science</span>,{' '}
                <span className="font-semibold text-foreground">multi-omics</span>, and{' '}
                <span className="font-semibold text-foreground">data-driven therapeutics</span>.
              </p>

              <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                <Button size="lg" asChild className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-orange-500/25 hover:opacity-90">
                  <a href={`mailto:${contactInfo.email}`} className="gap-2">
                    <span>📧</span> Get in Touch
                  </a>
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollToSection('publications')} className="glass border-white/20 hover:bg-white/20 dark:border-white/10">
                  View Publications →
                </Button>
              </div>
            </div>

            {/* Profile Image */}
            <div className="relative mx-auto lg:mx-0">
              <div className="glass-card relative h-[350px] w-[260px] overflow-hidden rounded-3xl sm:h-[400px] sm:w-[300px] lg:h-[480px] lg:w-[360px]">
                <Image
                  src="/images/profile/profile-1.jpg"
                  alt="Seong-Jun Kang"
                  fill
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 360px"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              {/* Decorative glows */}
              <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-orange-500/30 blur-3xl" />
              <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <button onClick={() => scrollToSection('research')} className="glass rounded-full p-3 text-muted-foreground hover:text-foreground">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Current Activities */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {currentActivities.map((activity, index) => (
              <div 
                key={index}
                className={`glass-card group rounded-2xl p-5 transition-all hover:scale-[1.02] ${
                  activity.highlight 
                    ? 'glow-orange ring-1 ring-orange-500/30' 
                    : 'hover:ring-1 hover:ring-white/20'
                }`}
              >
                <span className="mb-3 block text-2xl">{activity.icon}</span>
                <h3 className={`mb-1 font-semibold ${activity.highlight ? 'bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent' : ''}`}>
                  {activity.title}
                </h3>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                {activity.link && (
                  <Link href={activity.link} target="_blank" className="mt-2 inline-block text-xs text-orange-500 hover:underline">
                    Learn more →
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={contactInfo.links.littly} target="_blank" rel="noopener noreferrer" className="glass rounded-full px-4 py-2 text-sm font-medium transition-all hover:bg-white/20 dark:hover:bg-white/10">
              🔗 litt.ly/brain
            </a>
            <a href={contactInfo.links.googleScholar} target="_blank" rel="noopener noreferrer" className="glass rounded-full px-4 py-2 text-sm font-medium transition-all hover:bg-white/20 dark:hover:bg-white/10">
              📚 Google Scholar
            </a>
            <a href={contactInfo.links.focuz} target="_blank" rel="noopener noreferrer" className="glass rounded-full px-4 py-2 text-sm font-medium transition-all hover:bg-white/20 dark:hover:bg-white/10">
              📱 FOCUZ App
            </a>
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section id="research" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <Badge className="glass mb-4 border-0 px-4 py-1 text-foreground">Research Focus</Badge>
            <h2 className="bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:to-purple-200 sm:text-4xl">
              Research Interests
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {researchInterests.map((interest, index) => (
              <div key={interest.title} className="glass-card group rounded-2xl p-6 transition-all hover:scale-[1.02] hover:ring-1 hover:ring-purple-500/30">
                <span className="mb-4 block text-3xl">
                  {['🧠', '🧬', '📱', '🔬', '🦠', '💊'][index]}
                </span>
                <h3 className="mb-2 text-lg font-semibold">{interest.title}</h3>
                <p className="text-sm text-muted-foreground">{interest.description}</p>
              </div>
            ))}
          </div>

          {/* Postdoc Interests */}
          <div className="glass-card mt-16 overflow-hidden rounded-3xl">
            <div className="grid lg:grid-cols-[1fr_320px]">
              <div className="p-8 lg:p-12">
                <h3 className="mb-6 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-2xl font-semibold text-transparent">
                  Postdoctoral Interests
                </h3>
                <p className="mb-6 text-muted-foreground">
                  I am particularly interested in environments where:
                </p>
                <ul className="mb-8 space-y-4">
                  {profile.postdocInterests.map((interest, index) => (
                    <li key={interest} className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-sm font-medium text-white">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground">{interest}</span>
                    </li>
                  ))}
                </ul>
                <div className="glass rounded-xl p-4">
                  <p className="mb-1 font-semibold text-orange-500">My Vision</p>
                  <p className="text-sm text-muted-foreground">{profile.vision}</p>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <Image
                  src="/images/profile/profile-2.jpg"
                  alt="Seong-Jun Kang"
                  fill
                  sizes="320px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background/80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications - All 16 papers */}
      <section id="publications" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <Badge className="glass mb-4 border-0 px-4 py-1 text-foreground">Academic Output</Badge>
            <h2 className="bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-3xl font-bold tracking-tight text-transparent dark:from-white dark:to-purple-200 sm:text-4xl">
              Publications
            </h2>
          </div>

          {/* Metrics */}
          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { value: publications.length, label: 'Publications', gradient: 'from-zinc-200 to-zinc-400 dark:from-zinc-300 dark:to-zinc-400' },
              { value: publications.filter(p => p.isFirstAuthor).length, label: 'First Author', gradient: 'from-blue-500 to-cyan-500' },
              { value: scholarMetrics.totalCitations, label: 'Citations', gradient: 'from-orange-500 to-pink-500', highlight: true },
              { value: scholarMetrics.hIndex, label: 'h-index', gradient: 'from-emerald-500 to-teal-500' },
              { value: Math.max(...publications.map(p => p.impact)).toFixed(1), label: 'Highest IF', gradient: 'from-purple-500 to-violet-500' },
            ].map((metric, index) => (
              <div key={index} className={`glass-card rounded-2xl p-5 text-center ${metric.highlight ? 'glow-orange ring-1 ring-orange-500/30' : ''}`}>
                <div className={`bg-gradient-to-r ${metric.gradient} bg-clip-text text-4xl font-bold text-transparent`}>
                  {metric.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Publications by Year */}
          <div className="space-y-8">
            {sortedYears.map((year) => (
              <div key={year}>
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="text-2xl font-bold">{year}</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                  <span className="text-sm text-muted-foreground">{publicationsByYear[year].length} papers</span>
                </div>
                <div className="space-y-3">
                  {publicationsByYear[year].map((pub, index) => (
                    <div
                      key={index}
                      className={`glass-card group rounded-xl p-5 transition-all hover:scale-[1.01] ${
                        pub.isFirstAuthor
                          ? 'ring-1 ring-blue-500/30 hover:ring-blue-500/50'
                          : 'hover:ring-1 hover:ring-white/20'
                      }`}
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            {pub.isFirstAuthor && (
                              <Badge className="border-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                                First Author
                              </Badge>
                            )}
                            <Badge variant="outline" className="glass border-0 text-xs">
                              {pub.category}
                            </Badge>
                          </div>
                          <a
                            href={`https://scholar.google.com/scholar?q=${encodeURIComponent(pub.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-2 block font-medium leading-snug text-foreground transition-colors hover:text-blue-500 dark:hover:text-blue-400"
                          >
                            {pub.title}
                          </a>
                          <p className="mb-2 text-sm text-muted-foreground">{highlightAuthor(pub.authors)}</p>
                          <p className="text-sm">
                            <span className="font-semibold">{pub.journal}</span>
                            <span className="text-muted-foreground"> ({pub.year})</span>
                          </p>
                        </div>
                        <div className={`shrink-0 rounded-xl px-4 py-2 text-center ${
                          pub.impact >= 10
                            ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg glow-orange'
                            : pub.impact >= 5
                            ? 'bg-gradient-to-br from-blue-400 to-indigo-500 text-white'
                            : 'glass'
                        }`}>
                          <div className="text-xs opacity-80">IF</div>
                          <div className="text-xl font-bold">{pub.impact}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <a 
              href={contactInfo.links.googleScholar} 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 font-medium transition-all hover:bg-white/20 dark:hover:bg-white/10"
            >
              View all publications on Google Scholar →
            </a>
          </div>
        </div>
      </section>

      {/* Education & Skills */}
      <section id="skills" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Education */}
            <div>
              <Badge className="glass mb-4 border-0 px-4 py-1 text-foreground">Background</Badge>
              <h2 className="mb-8 text-2xl font-bold">Education</h2>
              <div className="relative space-y-6 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-16px)] before:w-[2px] before:bg-gradient-to-b before:from-blue-500 before:via-purple-500 before:to-orange-500">
                {education.map((edu, index) => (
                  <div key={index} className="relative pl-8">
                    <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg" />
                    <div className="glass-card rounded-xl p-5">
                      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <Badge variant="outline" className="glass border-0 text-xs">{edu.period}</Badge>
                      </div>
                      <p className="text-sm text-blue-600 dark:text-blue-400">{edu.institution}</p>
                      {edu.thesis && (
                        <p className="mt-2 text-xs text-muted-foreground">
                          <span className="font-medium">Thesis:</span> {edu.thesis}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <Badge className="glass mb-4 border-0 px-4 py-1 text-foreground">Expertise</Badge>
              <h2 className="mb-8 text-2xl font-bold">Technical Skills</h2>
              <div className="space-y-4">
                <div className="glass-card rounded-xl p-5 ring-1 ring-emerald-500/20">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <span>🔬</span> Experimental
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.experimental.slice(0, 6).map((skill) => (
                      <span key={skill} className="glass rounded-full px-3 py-1 text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-xl p-5 ring-1 ring-violet-500/20">
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                    <span>💻</span> Computational & AI
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.computational.map((skill) => (
                      <span key={skill} className="glass rounded-full px-3 py-1 text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Awards */}
              <h3 className="mb-4 mt-8 text-lg font-semibold">Awards & Honors</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {awards.slice(0, 4).map((award, index) => (
                  <div key={index} className="glass-card rounded-xl p-4 transition-all hover:ring-1 hover:ring-amber-500/30">
                    <Badge variant="outline" className="glass mb-2 border-0 text-xs">{award.date}</Badge>
                    <h4 className="mb-1 font-medium">{award.title}</h4>
                    <p className="text-xs text-muted-foreground">{award.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative overflow-hidden">
        <div className="grid lg:grid-cols-[400px_1fr]">
          {/* Photo */}
          <div className="relative h-[400px] lg:h-auto">
            <Image
              src="/images/profile/profile-3.jpg"
              alt="Seong-Jun Kang"
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-background/50 lg:to-background" />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col justify-center p-8 lg:p-16">
            <Badge className="glass mb-4 w-fit border-0 px-4 py-1 text-foreground">Get in Touch</Badge>
            <h2 className="mb-4 bg-gradient-to-r from-slate-900 to-purple-900 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:to-purple-200 lg:text-4xl">
              Let&apos;s Connect
            </h2>
            <p className="mb-8 max-w-lg text-lg text-muted-foreground">
              I&apos;m actively seeking postdoctoral opportunities where mechanistic immunology 
              meets computational multi-omics and translational medicine.
            </p>

            <div className="mb-8 space-y-4">
              <a
                href={`mailto:${contactInfo.email}`}
                className="glass flex items-center gap-3 rounded-xl p-4 text-muted-foreground transition-all hover:bg-white/20 hover:text-foreground dark:hover:bg-white/10"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-lg text-white">
                  📧
                </span>
                <span className="font-medium">{contactInfo.email}</span>
              </a>
              <div className="glass flex items-center gap-3 rounded-xl p-4 text-muted-foreground">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-lg text-white">
                  📍
                </span>
                <span>Seoul, Republic of Korea</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="border-0 bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg hover:opacity-90">
                <a href={`mailto:${contactInfo.email}`}>
                  Send Email
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="glass border-0 hover:bg-white/20 dark:hover:bg-white/10">
                <a href={contactInfo.links.googleScholar} target="_blank" rel="noopener noreferrer">
                  Google Scholar
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-nav py-8">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Seong-Jun Kang, PhD. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
