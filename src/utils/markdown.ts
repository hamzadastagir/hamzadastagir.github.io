import yaml from 'yaml';

export const loadMarkdown = async (path: string) => {
  try {
    console.log('Loading markdown from path:', path); // Debug log
    const response = await fetch(path);
    
    if (!response.ok) {
      throw new Error(`Failed to load markdown file: ${response.statusText}`);
    }
    
    const text = await response.text();
    console.log('Loaded markdown content:', text.substring(0, 100) + '...'); // Debug log
    
    // Parse frontmatter
    const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    
    if (!match) {
      console.log('No frontmatter found, returning full text as body'); // Debug log
      return {
        attributes: {},
        body: text
      };
    }

    try {
      const [, frontmatter, body] = match;
      const attributes = yaml.parse(frontmatter);
      console.log('Parsed attributes:', attributes); // Debug log
      return { 
        attributes, 
        body: body.trim()
      };
    } catch (error) {
      console.error('Error parsing frontmatter:', error);
      return {
        attributes: {},
        body: text
      };
    }
  } catch (error) {
    console.error('Error loading markdown:', error);
    throw error;
  }
};