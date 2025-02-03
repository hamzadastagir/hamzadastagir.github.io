declare module '*.md' {
  // `metadata` is the frontmatter object
  const attributes: {
    title: string;
    subtitle?: string;
    image?: string;
    social?: {
      github: string;
      linkedin: string;
      email: string;
    };
    [key: string]: any;
  };
  
  // `html` is the processed HTML string
  const html: string;
  
  // `body` is the raw markdown body
  const body: string;
  
  // `headers` is an array of markdown headers
  const headers: { level: number; title: string }[];
  
  // `toc` is the table of contents
  const toc: { level: number; content: string }[];
}