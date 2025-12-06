# Feature Specification: Academic Portfolio Website

**Feature Branch**: `001-portfolio-markdown`  
**Created**: 2025-12-06  
**Status**: Ready for Implementation  
**Input**: User description: Portfolio website for Seong-Jun Kang, PhD with About section, Research Interests, and detailed Research pages managed as Markdown files.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Researcher Profile (Priority: P1)

A visitor arrives at the portfolio website to learn about Seong-Jun Kang's background, expertise, and research focus. They should immediately see a professional introduction and understand the researcher's areas of work.

**Why this priority**: The About/Home page is the primary entry point and establishes credibility. Most visitors will first want to understand who this researcher is before exploring specific research.

**Independent Test**: Can be fully tested by navigating to the home page and verifying the complete researcher profile is displayed with proper formatting and all key information visible.

**Acceptance Scenarios**:

1. **Given** a visitor opens the website, **When** they view the home page, **Then** they see the researcher's name, title (PhD), professional photo placeholder, and biographical introduction.
2. **Given** a visitor is on the home page, **When** they scroll through the content, **Then** they see clear sections for current role, research focus areas, and postdoctoral interests.
3. **Given** a visitor views the About content, **When** they read the introduction, **Then** key terms like "Tregs", "multi-omics", "PB101" are visually emphasized.

---

### User Story 2 - Explore Research Interests (Priority: P1)

A visitor wants to quickly understand the researcher's main areas of expertise without reading detailed articles. They should see a clear, organized list of research interests with brief descriptions.

**Why this priority**: Research interests provide a quick overview for potential collaborators, employers, or institutions to assess fit and expertise.

**Independent Test**: Can be tested by navigating to the Research Interests section and verifying all 5 research areas are displayed with titles and descriptions.

**Acceptance Scenarios**:

1. **Given** a visitor is on the website, **When** they navigate to Research Interests, **Then** they see 5 distinct research areas displayed.
2. **Given** a visitor views Research Interests, **When** they read each interest, **Then** they see a clear title and 1-2 sentence description for each area.
3. **Given** a visitor is viewing Research Interests, **When** they want more details, **Then** they can click through to related detailed research articles.

---

### User Story 3 - Read Detailed Research Article (Priority: P2)

A visitor interested in a specific research topic wants to read an in-depth article about that work. They should be able to access well-formatted research pages with full context, methodology, and future directions.

**Why this priority**: Detailed research pages demonstrate depth of expertise and are essential for academic credibility, but require the foundational pages (About, Research Interests) to be in place first.

**Independent Test**: Can be tested by navigating to any research article page and verifying all content sections render correctly with proper Markdown formatting.

**Acceptance Scenarios**:

1. **Given** a visitor clicks on a research topic, **When** the page loads, **Then** they see the article title, author, date, and estimated reading time.
2. **Given** a visitor is reading a research article, **When** they scroll through, **Then** they see properly formatted sections (Background, Objectives, Approaches, Key Insights, Future Directions).
3. **Given** a research article contains Markdown formatting, **When** the page renders, **Then** bold text, lists, headers, and emphasis are correctly displayed.
4. **Given** a visitor finishes reading one article, **When** they want to explore more, **Then** they can navigate to other research articles or back to the main list.

---

### User Story 4 - Browse All Research (Priority: P2)

A visitor wants to see all available research articles in one place, with the ability to scan titles, summaries, and tags to find topics of interest.

**Why this priority**: A listing page enables discovery of all research content and helps visitors find specific topics quickly.

**Independent Test**: Can be tested by navigating to the research listing page and verifying all 4 research articles appear with metadata.

**Acceptance Scenarios**:

1. **Given** a visitor navigates to the Research section, **When** the page loads, **Then** they see a list of all research articles with titles and summaries.
2. **Given** a visitor views the research list, **When** they scan the articles, **Then** they see publication dates and tags for each article.
3. **Given** a visitor sees multiple articles, **When** they are sorted, **Then** the most recent articles appear first.

---

### User Story 5 - Responsive Mobile Experience (Priority: P3)

A visitor accesses the portfolio on a mobile device and should have a fully functional, readable experience without horizontal scrolling or broken layouts.

**Why this priority**: Mobile accessibility is important but secondary to core content being in place and functioning correctly.

**Independent Test**: Can be tested by viewing all pages on mobile viewport sizes and verifying layout adapts appropriately.

**Acceptance Scenarios**:

1. **Given** a visitor opens the site on a mobile device, **When** they view any page, **Then** the content fits the screen width without horizontal scrolling.
2. **Given** a visitor is on mobile, **When** they navigate the site, **Then** the navigation is accessible and easy to use.
3. **Given** a visitor reads research articles on mobile, **When** they view long content, **Then** text is readable and images scale appropriately.

---

### Edge Cases

- What happens when a Markdown file has missing frontmatter fields?
- How does the system handle invalid date formats in frontmatter?
- What happens when a research article has no tags?
- How does the system display if there are no research articles yet?
- What happens if an article's slug doesn't match any file?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the researcher's biographical introduction on the home page with proper HTML formatting from Markdown.
- **FR-002**: System MUST display 5 research interest areas with titles and descriptions.
- **FR-003**: System MUST render research articles from Markdown files with frontmatter metadata.
- **FR-004**: System MUST display article metadata including title, author, date, tags, and reading time.
- **FR-005**: System MUST list all research articles sorted by date (newest first).
- **FR-006**: System MUST support navigation between home, research interests, and individual research articles.
- **FR-007**: System MUST render Markdown formatting correctly (bold, italic, headers, lists, links).
- **FR-008**: System MUST be responsive and functional on mobile devices (320px and up).
- **FR-009**: System MUST display a 404 page when accessing non-existent research article slugs.
- **FR-010**: System MUST handle missing optional frontmatter fields gracefully (show defaults or omit).

### Key Entities

- **ResearchArticle**: Represents a detailed research page with title, author, date, tags, category, summary, reading time, slug, thumbnail (optional), and Markdown content body.
- **ResearchInterest**: Represents a research focus area with title and brief description.
- **Profile**: Represents the researcher's biographical information displayed on the About/Home section.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Visitors can view the complete researcher profile within 2 seconds of page load.
- **SC-002**: All 5 research interests are displayed correctly on the Research Interests section.
- **SC-003**: All 4 research articles are accessible and render within 3 seconds each.
- **SC-004**: 100% of Markdown formatting (bold, lists, headers) renders correctly in browser.
- **SC-005**: Website is fully functional on mobile devices with viewport widths from 320px to 1920px.
- **SC-006**: Visitors can navigate from any page to any other page within 2 clicks.
- **SC-007**: Invalid article slugs display a user-friendly 404 page rather than an error.

## Assumptions

- The researcher's profile content is provided in English.
- Profile photo will use a placeholder until a real image is provided.
- Research articles will be stored as Markdown files in the content directory.
- The website will be deployed on a platform supporting Next.js (e.g., Vercel).
- Initial content includes 4 research articles and 5 research interest areas.
- No authentication or user accounts are required.
- No search functionality is required for initial release.
- Tags will be displayed but filtering by tag is not required for initial release.

## Content Reference

### About Section Content

The About/Home page displays the following profile for **Seong-Jun Kang, PhD**:

- **Current Role**: R&D team lead at a biotech company developing antibody-based therapeutics
- **Key Program**: PB101, an anti-CD40 antibody candidate for multiple sclerosis
- **Startup**: Co-founded a digital healthcare startup for sleep/cognition/brain health
- **Teaching**: Teaches generative AI and modern AI tools for scientific work

### Research Interests (5 areas)

1. Regulatory T cells and immune tolerance
2. Single-cell and spatial transcriptomics in immunology
3. Neuro-immune interfaces in multiple sclerosis and related disorders
4. Digital biomarkers of sleep and cognition
5. AI-augmented drug discovery and clinical translation

### Research Articles (4 articles)

1. "Regulatory T Cells and Immune Homeostasis in Chronic Inflammation" (2023-11-01)
2. "Dissecting Immune Cell Heterogeneity with Single-Cell and Spatial Transcriptomics" (2024-02-15)
3. "Translational Development of PB101, an Anti-CD40 Antibody Candidate for Neuro-Immune Disorders" (2024-06-10)
4. "Digital Biomarkers of Sleep and Cognition for Brain Health" (2024-09-20)

