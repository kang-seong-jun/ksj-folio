import type { Profile, ResearchInterest } from '@/types/content';

export const profile: Profile = {
  name: 'Seong-Jun Kang, Ph.D.',
  title: 'AI & Neuroscience Researcher | Postdoc Candidate',
  bio: `I am an immunologist and AI researcher working at the interface of **brain science, multi-omics, and data-driven therapeutics**. My training began in genetic engineering and immunology, where I focused on **regulatory T cells (Tregs)** and immune tolerance, and later expanded into **single-cell and spatial transcriptomics** to dissect cellular heterogeneity in complex tissues.`,
  currentRole: 'Actively seeking postdoctoral positions in computational immunology and neuroscience.',
  keyProgram: 'FOCUZ - Cognitive function digital health solution, currently in development using vibe coding approach.',
  startup: 'Co-founded a digital healthcare startup that develops tools at the intersection of sleep, cognition, and brain health, building digital biomarkers from real-world data.',
  teaching: 'Teaching clinicians and researchers how to use generative AI and modern AI tools to accelerate scientific work and drug development.',
  postdocInterests: [
    'Multimodal neuroimaging approaches to study brain dynamics in sleep, aging, and disease',
    'AI and computational methods applied to immune and neurological diseases',
    'Mechanistic immunology combined with single-cell / spatial multi-omics',
    'Clear path toward translation into therapies or digital biomarkers',
  ],
  vision: 'To bridge bench immunology, computational multi-omics, brain imaging, and digital health to enable more precise, personalized interventions for immune-mediated and neurodegenerative disorders.',
};

export const contactInfo = {
  email: 'sjkang89@gmail.com',
  phone: '+82) 010-5190-8774',
  address: '103, Daehak-ro, Jongno-gu, Seoul, Republic of Korea',
  links: {
    littly: 'https://litt.ly/brain',
    googleScholar: 'https://scholar.google.com/citations?user=tMsQgs8AAAAJ&hl=en',
    focuz: 'https://apps.apple.com/kr/app/focuz/id6749067962',
  },
};

export const scholarMetrics = {
  totalCitations: 276,
  hIndex: 7,
  i10Index: 7,
  lastUpdated: '2025-01',
};

export const currentActivities = [
  {
    title: 'Postdoc Candidate',
    description: 'Actively seeking postdoctoral positions in computational immunology and neuroscience',
    icon: '🎯',
    highlight: true,
  },
  {
    title: 'GPTers Operations Team',
    description: "Korea's largest AI community (GPTers) core member",
    icon: '🤖',
  },
  {
    title: 'AI Drug Discovery',
    description: 'Operating online community for AI-driven drug discovery within GPTers',
    icon: '💊',
  },
  {
    title: 'AI Neuroscience',
    description: 'Operating online community for AI neuroscience research within GPTers',
    icon: '🧠',
  },
  {
    title: 'FOCUZ Developer',
    description: 'Cognitive function digital health solution - iOS app launched',
    icon: '📱',
  },
];

export const education = [
  {
    degree: 'Ph.D. in Biomedical Sciences',
    institution: 'Seoul National University Graduate School',
    location: 'Seoul, Republic of Korea',
    period: '09/2014 - 08/2023',
    thesis: 'Exploration of the Regulatory T cells Role in Various Pathogenic Contexts',
    advisor: 'Professor Chung-Gyu Park',
  },
  {
    degree: 'M.S. in Biomedical Sciences',
    institution: 'Seoul National University Graduate School',
    location: 'Seoul, Republic of Korea',
    period: '02/2012 - 08/2014',
    thesis: 'Enhanced Lipopolysaccharide Induced Monocyte Activation by Recombinant Human Soluble Cluster of Differentiation 14',
    advisor: 'Professor Chung-Gyu Park',
  },
  {
    degree: 'B.S. in Genetic Engineering',
    institution: 'Sungkyunkwan University',
    location: 'Suwon, Republic of Korea',
    period: '03/2008 - 02/2012',
  },
];

export const experience = [
  {
    title: 'Associate Director',
    department: 'Department of Basic Research',
    company: 'PB Immune Therapeutics Inc.',
    period: '09/2023 - 2025',
    description: 'Led R&D for PB101, anti-CD40 antibody for MS',
  },
  {
    title: 'Manager',
    department: 'Department of Basic Research',
    company: 'PB Immune Therapeutics Inc.',
    period: '05/2021 - 08/2023',
  },
  {
    title: 'Researcher',
    department: 'Xenotransplantation Research Center',
    company: 'Seoul National University',
    period: '09/2019 - 04/2021',
  },
  {
    title: 'Research Personnel',
    department: 'Military Service',
    company: 'Republic of Korea Army',
    period: '09/2016 - 08/2019',
  },
  {
    title: 'Teaching Assistant',
    department: 'Department of Microbiology and Immunology',
    company: 'Seoul National University College of Medicine',
    period: '09/2014 - 08/2016',
  },
];

export const publications = [
  // 2025
  {
    authors: 'Seong-Jun Kang*, Yong-Hee Kim*, Thuy Nguyen-Phuong*, Yijoon Kim, Jin-Mi Oh, Jaechun Go, DaeSik Kim, Chung-Gyu Park, Hyunsu Lee, Hyun Je Kim',
    title: 'Immune cell-enriched single-cell RNA sequencing unveils the interplay between infiltrated CD8+ T resident memory cells and choroid plexus epithelial cells in Alzheimer\'s disease',
    journal: 'J Neuroimmunol',
    year: '2025',
    impact: 2.9,
    isFirstAuthor: true,
    category: 'Neuro-immunology',
  },
  // 2025
  {
    authors: 'Seong-Jun Kang*, Jeong-Ryeol Gong*, Seon-Pil Jin, Jin-Mi Oh, Hyunjin Jin, Yuji Lee, Yewon Moon, Dongjun Kim, Hyo Jeong Nam, Hyun Seung Choi, Sanha Hwang, Yun Jung Huh, Kyung Yeon Han, Jihwan Moon, Jongsuk Chung, Woong-Yang Park, Chung-Gyu Park, Hyun Je Kim, Jeong Eun Kim',
    title: 'Deciphering Dysfunctional Regulatory T Cells in Atopic Dermatitis',
    journal: 'Allergy',
    year: '2025',
    impact: 12.6,
    isFirstAuthor: true,
    category: 'Regulatory T cells',
  },
  {
    authors: 'Brian Hyohyoung Lee*, Yoon Ji Bang*, Sung Ha Lim*, Seong-Jun Kang, Sung Hee Kim, Seunghee Kim-Schulze, Chung-Gyu Park, Hyun Je Kim, Tae-Gyun Kim',
    title: 'High-dimensional profiling of regulatory T cells in psoriasis reveals an impaired skin-trafficking property',
    journal: 'Ebiomedicine',
    year: '2024',
    impact: 11.1,
    isFirstAuthor: false,
    category: 'Regulatory T cells',
  },
  {
    authors: 'Jong-Min Kim*, Seong-Jun Kang*, So-Hee Hong, Hyunwoo Chung, Jun-Seop Shin, ByoungHoon Min, Hyun Je Kim, Jongwon Ha, Chung-Gyu Park',
    title: 'Long-term control of diabetes by tofacitinib-based immunosuppressive regimen after allo islet transplantation in diabetic rhesus monkeys that rejected previously transplanted porcine islets',
    journal: 'Xenotransplantation',
    year: '2024',
    impact: 3.9,
    isFirstAuthor: true,
    category: 'Transplantation',
  },
  {
    authors: 'Youngkyoung Lim*, Beom Keun Cho*, Seong-Jun Kang, Soyoung Jeong, Hyun Je Kim, Jiyoon Baek, Ji Hwan Moon, Cheol Lee, Chan-Sik Park, Je-Ho Mun, Chong Hyun Won, Chung-Gyu Park',
    title: 'Spatial transcriptomic analysis of tumour-immune cell interactions in melanoma arising from congenital melanocytic nevus',
    journal: 'J Eur Acad Dermatol Venereol',
    year: '2024',
    impact: 9.2,
    isFirstAuthor: false,
    category: 'Spatial transcriptomics',
  },
  // 2023
  {
    authors: 'Sunyoung Jung*, Sunho Lee, Hyun Je Kim, Sueon Kim, Ji Hwan Moon, Hyunwoo Chung, Seong-Jun Kang, Chung-Gyu Park',
    title: 'Mesenchymal stem cell-derived extracellular vesicles subvert Th17 cells by destabilizing RORγ through posttranslational modification',
    journal: 'Exp Mol Med',
    year: '2023',
    impact: 12.8,
    isFirstAuthor: false,
    category: 'T cell biology',
  },
  // 2022
  {
    authors: 'Youngkyoung Lim*, Seong-Jun Kang*, Bum Keun Cho, Hyun Je Kim, Chung-Gyu Park',
    title: 'Intratumoral heterogeneity and immune escape of melanoma arising from congenital melanocytic nevus revealed by spatial gene expression profiling',
    journal: 'J Eur Acad Dermatol Venereol',
    year: '2022',
    impact: 9.2,
    isFirstAuthor: true,
    category: 'Spatial transcriptomics',
  },
  {
    authors: 'Sangho Lee, Han-Teo Lee, Young Ah Kim, Il-Hwan Lee, Seong-Jun Kang, Kyeongpyo Sim, Chung-Gyu Park, Kyungho Choi, Hong-Duk Youn',
    title: 'The optimized core peptide derived from CABIN1 efficiently inhibits calcineurin-mediated T-cell activation',
    journal: 'Exp Mol Med',
    year: '2022',
    impact: 12.8,
    isFirstAuthor: false,
    category: 'T cell biology',
  },
  // 2021
  {
    authors: 'So Hee Hong, Hyun Je Kim, Seong-Jun Kang, Chung-Gyu Park',
    title: 'Novel Immunomodulatory Approaches for Porcine Islet Xenotransplantation',
    journal: 'Curr Diabetes Rep',
    year: '2021',
    impact: 4.2,
    isFirstAuthor: false,
    category: 'Transplantation',
  },
  // 2020
  {
    authors: 'Sunho Lee, Sueon Kim, Hyunwoo Chung, Ji Hwan Moon, Seong-Jun Kang, Chung-Gyu Park',
    title: 'Mesenchymal stem cell-derived exosomes suppress proliferation of T cells by inducing cell cycle arrest through p27kip1/Cdk2 signaling',
    journal: 'Immunol Lett',
    year: '2020',
    impact: 4.4,
    isFirstAuthor: false,
    category: 'T cell biology',
  },
  // 2019
  {
    authors: 'Hyun Je Kim, Ji Hwan Moon, Hyunwoo Chung, Jun-Seop Shin, Bongi Kim, Jong Min Kim, Jung-Sik Kim, Il-Hee Yoon, B. H. Min, Seong-Jun Kang, et al.',
    title: 'Bioinformatic analysis of peripheral blood RNA-sequencing sensitively detects the cause of late graft loss following overt hyperglycemia in pig-to-nonhuman primate islet xenotransplantation',
    journal: 'Sci Rep',
    year: '2019',
    impact: 4.6,
    isFirstAuthor: false,
    category: 'Transplantation',
  },
  {
    authors: 'Jong Min Kim, Jun Seop Shin, Byoung Hoon Min, Seong-Jun Kang*, Il Hee Yoon, Hyunwoo Chung, Jiyeon Kim, Eung Soo Hwang, Jongwon Ha, Chung-Gyu Park',
    title: 'JAK3 inhibitor-based immunosuppression in allogeneic islet transplantation in cynomolgus monkeys',
    journal: 'Islets',
    year: '2019',
    impact: 2.2,
    isFirstAuthor: true,
    category: 'Transplantation',
  },
  // 2018
  {
    authors: 'Byoung-Hoon Min, Jun-Seop Shin, Jong-Min Kim, Seong-Jun Kang, Hyun-Je Kim, Il-Hee Yoon, Su-Kyoung Park, Ji-won Choi, Min-Suk Lee, Chung-Gyu Park',
    title: 'Delayed revascularization of islets after transplantation by IL-6 blockade in pig to non-human primate islet xenotransplantation model',
    journal: 'Xenotransplantation',
    year: '2018',
    impact: 3.9,
    isFirstAuthor: false,
    category: 'Transplantation',
  },
  {
    authors: 'Jung-Sik Kim, Hyunwoo Chung, Nari Byun, Seong-Jun Kang, Sunho Lee, Jun-Seop Shin, Chung-Gyu Park',
    title: 'Construction of EMSC-islet co-localizing composites for xenogeneic porcine islet transplantation',
    journal: 'Biochem Biophys Res Commun',
    year: '2018',
    impact: 3.1,
    isFirstAuthor: false,
    category: 'Transplantation',
  },
  {
    authors: 'Jun-Seop Shin, Jong-Min Kim, Byoung-Hoon Min, Il Hee Yoon, Hyun Je Kim, Jung-Sik Kim, Yong-Hee Kim, Seong-Jun Kang, et al.',
    title: 'Pre-clinical results in pig-to-non-human primate islet xenotransplantation using anti-CD40 antibody (2C10R4)-based immunosuppression',
    journal: 'Xenotransplantation',
    year: '2018',
    impact: 3.9,
    isFirstAuthor: false,
    category: 'Transplantation',
  },
  {
    authors: 'Jong-Min Kim, Jun-Seop Shin, Byoung-Hoon Min, Il Hee Yoon, Seong-Jun Kang, Won-Young Jeong, Sang-Joon Kim, Chung-Gyu Park',
    title: 'Pre-Clinical Results of Islet Allo-Transplantation Using JAK Inhibitor as Replacement for Tacrolimus Widely Used Immunosuppressive Drug in Islet Transplantation in Cynomolgus Monkeys',
    journal: 'Transplantation',
    year: '2018',
    impact: 6.2,
    isFirstAuthor: false,
    category: 'Transplantation',
  },
];

export const awards = [
  {
    title: 'Grand Prize',
    event: '1st GPTers AI Hackathon (Project GAIA Team)',
    date: '06/2024',
  },
  {
    title: 'Grand Prize',
    event: 'SBA G-Valley Smart Workathon',
    date: '12/2023',
  },
  {
    title: 'Best Presentation Award',
    event: 'Korean Association of Immunologist',
    date: '11/2017',
  },
  {
    title: 'Best Poster Award',
    event: 'International Xenotransplantation Association (IXA)',
    date: '05/2017',
  },
];

export const speakingExperience = [
  'SK Hynix - LLM for productivity improvement',
  'SK Biopharma, SK Bioscience - AI in biotech',
  'MFDS (Korea FDA) - AI for research reports & publications',
  '2025 AI Era Human Intelligence Conference MC',
  'GPTers AI Talk Speaker - AI Drug Discovery & Digital Healthcare',
  'CMDS Sleep Conference - Sleep science from Alzheimer researcher perspective',
];

export const skills = {
  experimental: [
    'High-resolution multi-color flow cytometry (up to 24 colors)',
    'Single cell RNA sequencing (10X 5\' and 3\')',
    'Spatial transcriptomics (GeoMx DSP Nanostring)',
    'Immunohistochemistry and immunofluorescence',
    'Mouse models (EAE, DSS-colitis, islet transplantation)',
    'Human PBMC isolation and T cell expansion',
    'FACS sorting (FACSymphony S6)',
  ],
  computational: [
    'R/RStudio (Seurat, Monocle3)',
    'Python (Scanpy, Squidpy)',
    'Machine Learning (XGBoost, LightGBM, CatBoost)',
    'Deep Learning (GAN, GNN, VAE, Transformers)',
    'AlphaFold2/3 (protein structure prediction)',
    'Molecular docking (AutoDock, DiffDock)',
    'Vibe Coding (AI-assisted development)',
  ],
};

export const researchInterests: ResearchInterest[] = [
  {
    title: 'Brain dynamics and sleep physiology',
    description: 'Exploring how sleep and arousal states modulate large-scale brain networks, CSF dynamics, and neurovascular coupling using multimodal neuroimaging.',
  },
  {
    title: 'Neuro-immune interfaces in neurodegeneration',
    description: 'Understanding how immune cells interact with the brain in Alzheimer\'s disease, aging, and related neurological disorders.',
  },
  {
    title: 'Digital biomarkers of sleep and cognition',
    description: 'Quantifying sleep, attention, and cognitive performance using smartphone/wearable data to monitor brain health over time.',
  },
  {
    title: 'Single-cell and spatial transcriptomics in immunology',
    description: 'Using high-dimensional profiling to map immune cell states, interactions, and tissue microenvironments in disease.',
  },
  {
    title: 'Regulatory T cells and immune tolerance',
    description: 'Mechanisms by which Tregs maintain immune homeostasis and how their dysfunction contributes to chronic inflammation and neuro-immune disease.',
  },
  {
    title: 'AI-augmented drug discovery and clinical translation',
    description: 'Applying machine learning and generative AI to multi-omics data, digital phenotypes, and therapeutic design, with a focus on immunology and neurology.',
  },
];
