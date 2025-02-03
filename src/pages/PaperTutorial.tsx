import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Table, BarChart3, FileJson } from 'lucide-react';
import MarkdownRenderer from '../components/MarkdownRenderer';

const tutorialContent = `
# How to Add a New Research Paper

This guide will walk you through the process of adding a new research paper to the platform.

## 1. Create the Paper Markdown File

Create a new markdown file in \`src/content/papers/\` with the following structure:

\`\`\`markdown
---
title: "Your Paper Title"
date: "2024-03-15"
author: "Your Name"
excerpt: "A brief description of your paper (1-2 sentences)"
image: "https://images.unsplash.com/your-image"
category: "Research Category"
---

# Main Title
## Subtitle

### Category
Primary Category / Subcategory / Topic

### Executive Summary

Your executive summary goes here...

### Content Sections

Your paper content with sections...

### Charts

To add a chart, use the following syntax:

<chart
  type="line"
  data="dataset_name"
  config={{
    xKey: "timestamp",
    yKeys: ["value1", "value2"],
    title: "Chart Title",
    xLabel: "X Axis Label",
    yLabel: "Y Axis Label"
  }}
/>

\`\`\`

## 2. Add Data Files

### CSV Data Structure

Create a \`data\` folder in your paper directory and add your CSV files:

\`\`\`
src/content/papers/your-paper/
  ├── data/
  │   ├── dataset1.csv
  │   ├── dataset2.csv
  │   └── dataset3.csv
\`\`\`

CSV files should be properly formatted:

\`\`\`csv
timestamp,value1,value2
2024-01,100,200
2024-02,150,250
2024-03,180,280
\`\`\`

## 3. Chart Configuration

### Available Chart Types

1. **Line Chart**
   \`\`\`markdown
   <chart
     type="line"
     data="dataset_name"
     config={{
       xKey: "timestamp",
       yKeys: ["value1", "value2"],
       title: "Time Series Data",
       xLabel: "Time",
       yLabel: "Values"
     }}
   />
   \`\`\`

2. **Bar Chart**
   \`\`\`markdown
   <chart
     type="bar"
     data="dataset_name"
     config={{
       xKey: "category",
       yKeys: ["value"],
       title: "Category Distribution",
       xLabel: "Categories",
       yLabel: "Values",
       stacked: false
     }}
   />
   \`\`\`

3. **Pie Chart**
   \`\`\`markdown
   <chart
     type="pie"
     data="dataset_name"
     config={{
       labelKey: "category",
       valueKey: "value",
       title: "Distribution",
       donut: false
     }}
   />
   \`\`\`

4. **Scatter Plot**
   \`\`\`markdown
   <chart
     type="scatter"
     data="dataset_name"
     config={{
       xKey: "x_value",
       yKey: "y_value",
       sizeKey: "size",
       labelKey: "label",
       title: "Correlation Plot",
       xLabel: "X Axis",
       yLabel: "Y Axis"
     }}
   />
   \`\`\`

### Chart Styling Options

- **Colors**: Use the \`colors\` array in config to specify custom colors
- **Stacked**: For bar charts, use \`stacked: true\` for stacked bars
- **Donut**: For pie charts, use \`donut: true\` for donut style

## 4. Best Practices

1. **File Organization**
   - Use clear, descriptive filenames
   - Keep data files organized in the data folder
   - Use consistent naming conventions

2. **Data Format**
   - Ensure CSV files are properly formatted
   - Use consistent date formats (YYYY-MM-DD)
   - Include headers in CSV files

3. **Chart Design**
   - Choose appropriate chart types for your data
   - Use clear, descriptive titles and labels
   - Consider color accessibility

4. **Content Structure**
   - Use consistent heading hierarchy
   - Include a clear category structure
   - Provide comprehensive metadata

## 5. Testing

Before submitting:

1. Verify all data files are loading correctly
2. Check that charts render properly
3. Test responsive behavior
4. Validate markdown formatting
`;

const PaperTutorial = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-[#0A0B0F]"
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Quick Reference Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-4 bg-[#1F2937] rounded-lg border border-[#2A2F42]">
            <FileText className="h-6 w-6 text-[#64CCC5] mb-2" />
            <h3 className="text-sm font-medium mb-1">1. Create Markdown</h3>
            <p className="text-xs text-gray-400">Set up your paper's markdown file with proper frontmatter</p>
          </div>
          <div className="p-4 bg-[#1F2937] rounded-lg border border-[#2A2F42]">
            <Table className="h-6 w-6 text-[#64CCC5] mb-2" />
            <h3 className="text-sm font-medium mb-1">2. Add Data Files</h3>
            <p className="text-xs text-gray-400">Prepare and add your CSV data files</p>
          </div>
          <div className="p-4 bg-[#1F2937] rounded-lg border border-[#2A2F42]">
            <BarChart3 className="h-6 w-6 text-[#64CCC5] mb-2" />
            <h3 className="text-sm font-medium mb-1">3. Configure Charts</h3>
            <p className="text-xs text-gray-400">Set up chart components with proper configuration</p>
          </div>
          <div className="p-4 bg-[#1F2937] rounded-lg border border-[#2A2F42]">
            <FileJson className="h-6 w-6 text-[#64CCC5] mb-2" />
            <h3 className="text-sm font-medium mb-1">4. Test & Validate</h3>
            <p className="text-xs text-gray-400">Verify everything works correctly</p>
          </div>
        </div>

        {/* Tutorial Content */}
        <div className="prose prose-sm prose-invert max-w-none">
          <MarkdownRenderer content={tutorialContent} />
        </div>
      </div>
    </motion.div>
  );
};

export default PaperTutorial;