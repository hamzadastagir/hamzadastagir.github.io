import { loadMarkdown } from './markdown';

export interface PaperData {
  content: {
    attributes: any;
    body: string;
  };
  data: {
    [key: string]: any[];
  };
}

export const loadPaperContent = async (paperSlug: string): Promise<PaperData> => {
  try {
    console.log('Loading paper content for slug:', paperSlug);
    
    // Load main paper content
    const content = await loadMarkdown(`/src/content/papers/${paperSlug}.md`);
    
    // Initialize data object
    let paperData: { [key: string]: any[] } = {};
    
    // Define data mappings for each paper
    const dataMappings: { [key: string]: { [key: string]: any[] } } = {
      'strategic-policy': {
        case_studies: [
          { type: 'Trade', success_rate: 0.85 },
          { type: 'Security', success_rate: 0.72 },
          { type: 'Crisis', success_rate: 0.92 }
        ],
        regional_impact: [
          { region: 'Asia Pacific', success_rate: 0.85, implementation_cost: 1200000, risk_level: 0.3 },
          { region: 'Europe', success_rate: 0.72, implementation_cost: 980000, risk_level: 0.4 },
          { region: 'Middle East', success_rate: 0.92, implementation_cost: 1500000, risk_level: 0.6 },
          { region: 'Americas', success_rate: 0.45, implementation_cost: 850000, risk_level: 0.5 },
          { region: 'Africa', success_rate: 0.82, implementation_cost: 720000, risk_level: 0.4 }
        ],
        policy_trends: [
          { quarter: '2020 Q1', trade_success: 0.82, security_success: 0.75, crisis_success: 0.88 },
          { quarter: '2020 Q2', trade_success: 0.79, security_success: 0.78, crisis_success: 0.90 },
          { quarter: '2020 Q3', trade_success: 0.85, security_success: 0.72, crisis_success: 0.91 },
          { quarter: '2020 Q4', trade_success: 0.88, security_success: 0.70, crisis_success: 0.93 },
          { quarter: '2021 Q1', trade_success: 0.86, security_success: 0.74, crisis_success: 0.92 },
          { quarter: '2021 Q2', trade_success: 0.89, security_success: 0.76, crisis_success: 0.94 },
          { quarter: '2021 Q3', trade_success: 0.87, security_success: 0.79, crisis_success: 0.93 },
          { quarter: '2021 Q4', trade_success: 0.90, security_success: 0.82, crisis_success: 0.95 }
        ]
      },
      'graph-visualization': {
        network_metrics: [
          { network_type: 'Social', density: 0.15, clustering_coefficient: 0.45 },
          { network_type: 'Collaboration', density: 0.08, clustering_coefficient: 0.65 },
          { network_type: 'Technological', density: 0.05, clustering_coefficient: 0.25 },
          { network_type: 'Biological', density: 0.12, clustering_coefficient: 0.35 },
          { network_type: 'Transportation', density: 0.06, clustering_coefficient: 0.28 }
        ],
        temporal_metrics: [
          { timestamp: '2024-01', nodes: 1000, edges: 2500, avg_degree: 5.0 },
          { timestamp: '2024-02', nodes: 1500, edges: 4200, avg_degree: 5.6 },
          { timestamp: '2024-03', nodes: 2200, edges: 6800, avg_degree: 6.2 },
          { timestamp: '2024-04', nodes: 3100, edges: 10500, avg_degree: 6.8 },
          { timestamp: '2024-05', nodes: 4200, edges: 15800, avg_degree: 7.5 }
        ],
        centrality_metrics: [
          { node_type: 'Hub', degree_centrality: 0.85, betweenness_centrality: 0.92, closeness_centrality: 0.78 },
          { node_type: 'Bridge', degree_centrality: 0.45, betweenness_centrality: 0.88, closeness_centrality: 0.65 },
          { node_type: 'Peripheral', degree_centrality: 0.15, betweenness_centrality: 0.25, closeness_centrality: 0.45 },
          { node_type: 'Connector', degree_centrality: 0.65, betweenness_centrality: 0.75, closeness_centrality: 0.68 }
        ],
        community_metrics: [
          { community: 'Core', size: 450, modularity: 0.75 },
          { community: 'Secondary', size: 320, modularity: 0.68 },
          { community: 'Peripheral', size: 280, modularity: 0.52 },
          { community: 'Bridge', size: 180, modularity: 0.48 }
        ]
      }
    };

    // Load data for the specific paper
    if (dataMappings[paperSlug]) {
      paperData = dataMappings[paperSlug];
    }

    // Load SVG files if they exist
    try {
      const svgFiles = {
        'strategic-policy': ['decision_framework.svg'],
        'graph-visualization': ['network_topology.svg']
      };

      if (svgFiles[paperSlug]) {
        for (const file of svgFiles[paperSlug]) {
          const response = await fetch(`/src/content/papers/${paperSlug}/content/figures/${file}`);
          if (response.ok) {
            const svg = await response.text();
            paperData[`svg_${file.replace('.svg', '')}`] = svg;
          }
        }
      }
    } catch (error) {
      console.warn('Error loading SVG files:', error);
    }

    return { content, data: paperData };
  } catch (error) {
    console.error('Error loading paper content:', error);
    throw error;
  }
};