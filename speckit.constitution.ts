/**
 * Speckit Constitution - Next.js 15+ Coding Standards
 * 
 * This file defines the coding conventions and best practices for the ksj-folio project.
 * Follow these rules to maintain clean, modular, and maintainable code.
 */

export const speckitConstitution = {
  version: '1.0.0',
  framework: 'nextjs',
  frameworkVersion: '15+',
  language: 'typescript',

  // Project Structure Rules
  projectStructure: {
    enabled: true,
    directories: {
      app: 'Next.js App Router directory',
      components: 'Reusable components',
      'components/ui': 'Base UI components',
      'components/features': 'Feature-specific components',
      lib: 'Utility functions and helpers',
      hooks: 'Custom React hooks',
      types: 'TypeScript type definitions',
      constants: 'Constants',
      styles: 'Global styles',
    },
    principles: [
      'Single Responsibility Principle',
      'Separation of Concerns',
      'Reusability',
    ],
  },

  // Component Rules
  components: {
    enabled: true,
    defaultExport: true,
    naming: 'PascalCase',
    structure: [
      'Imports (external → internal)',
      'Types/Interfaces',
      'Component',
      'Hooks',
      'Event handlers',
      'Render',
    ],
    serverComponentDefault: true,
    clientComponentDirective: "'use client'",
    propsTyping: 'required',
    conditionalRendering: 'prefer-early-return',
  },

  // File Naming Conventions
  fileNaming: {
    components: 'PascalCase',
    utilities: 'camelCase',
    types: 'PascalCase',
    constants: 'UPPER_SNAKE_CASE',
    folders: 'kebab-case',
  },

  // TypeScript Rules
  typescript: {
    enabled: true,
    strict: true,
    explicitTypes: true,
    interfaceForObjects: true,
    typeForUnions: true,
    sharedTypesLocation: 'types/',
    propsTyping: 'required',
    typeGuards: 'recommended',
  },

  // Next.js Specific Rules
  nextjs: {
    appRouter: true,
    routeFiles: {
      page: 'page.tsx',
      layout: 'layout.tsx',
      loading: 'loading.tsx',
      error: 'error.tsx',
      notFound: 'not-found.tsx',
      api: 'route.ts',
    },
    dataFetching: {
      serverComponents: 'async/await',
      clientComponents: 'useEffect + fetch or SWR/React Query',
      caching: 'explicit-with-fetch-options',
    },
    imageOptimization: {
      component: 'next/image',
      requiredProps: ['width', 'height', 'alt'],
      priority: 'above-the-fold-only',
    },
    linkOptimization: {
      component: 'next/link',
      prefetch: 'enabled-by-default',
    },
    dynamicRouting: {
      dynamicSegment: '[id]',
      catchAll: '[...slug]',
      optionalCatchAll: '[[...slug]]',
    },
  },

  // Styling Rules
  styling: {
    framework: 'tailwindcss',
    approach: 'utility-first',
    customClasses: 'minimal-use-of-apply',
    responsive: 'mobile-first',
    darkMode: 'dark: prefix',
    cssModules: 'only-for-complex-components',
    globalStyles: 'app/globals.css-only',
  },

  // Performance Optimization Rules
  performance: {
    codeSplitting: {
      enabled: true,
      method: 'next/dynamic',
      loadingState: 'required',
    },
    memoization: {
      reactMemo: 'for-stable-props',
      useMemo: 'for-expensive-calculations',
      useCallback: 'for-child-component-functions',
    },
    imageOptimization: {
      appropriateSize: true,
      priority: 'above-the-fold-only',
      lazyLoading: 'default-when-no-priority',
    },
  },

  // Error Handling Rules
  errorHandling: {
    errorBoundary: 'error.tsx',
    userFriendlyMessages: true,
    apiErrors: {
      clearMessages: true,
      appropriateStatusCodes: true,
      typeSafeResponses: true,
    },
  },

  // Code Quality Rules
  codeQuality: {
    eslint: {
      config: 'eslint-config-next',
      preCommitCheck: true,
    },
    codeReview: {
      typeSafety: true,
      errorHandling: true,
      accessibility: true,
      performance: true,
      dependencyCleanup: true,
      comments: 'explain-why-not-what',
    },
    comments: {
      complexLogic: 'required',
      todo: 'must-include-reason-and-plan',
      jsdoc: 'public-apis-only',
    },
    functions: {
      maxLength: 50,
      maxParameters: 3,
      preferObjectParams: true,
      preferPureFunctions: true,
    },
  },

  // Accessibility Rules
  accessibility: {
    semanticHTML: true,
    altAttributes: 'required',
    keyboardNavigation: true,
    ariaAttributes: 'when-appropriate',
  },

  // Environment Variables Rules
  environmentVariables: {
    sensitive: '.env.local',
    example: '.env.example',
    clientPrefix: 'NEXT_PUBLIC_',
  },

  // API Routes Rules
  apiRoutes: {
    restful: true,
    appropriateHttpMethods: true,
    typeSafe: true,
  },

  // Code Checklist
  checklist: {
    newCode: [
      'Component has single responsibility',
      'Types are explicitly defined',
      'Server/Client Component distinction is clear',
      'Images use next/image',
      'Links use next/link',
      'Error handling is implemented',
      'Accessibility is considered',
      'Performance optimization is applied',
      'ESLint rules are followed',
      'No unnecessary comments',
    ],
  },
} as const;

// Type-safe helper functions
export const validateComponent = (component: {
  name: string;
  isClientComponent?: boolean;
  hasTypes?: boolean;
  usesNextImage?: boolean;
  usesNextLink?: boolean;
}) => {
  const errors: string[] = [];

  if (!component.name.match(/^[A-Z]/)) {
    errors.push('Component name must be PascalCase');
  }

  if (!component.hasTypes) {
    errors.push('Component must have explicit prop types');
  }

  if (component.usesNextImage === false) {
    errors.push('Use next/image for images');
  }

  if (component.usesNextLink === false) {
    errors.push('Use next/link for internal links');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export default speckitConstitution;

