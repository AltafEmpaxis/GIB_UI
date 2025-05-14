import { useRef, useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { getCodeString } from 'rehype-rewrite';
import mermaid from 'mermaid';

// Default Mermaid configuration
const DEFAULT_MERMAID_CONFIG = {
  startOnLoad: true,
  theme: 'neutral',
  securityLevel: 'loose',
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
    useMaxWidth: true,
    defaultRenderer: 'dagre-d3',
    nodeSpacing: 50,
    rankSpacing: 50,
    padding: 10,
    diagramPadding: 8,
    ranker: 'tight-tree'
  },
  themeVariables: {
    primaryColor: '#2196f3',
    primaryTextColor: '#fff',
    primaryBorderColor: '#2196f3',
    lineColor: '#2196f3',
    secondaryColor: '#ff9800',
    tertiaryColor: '#4caf50',
    fontFamily: 'inherit',
    fontSize: '16px',
    labelBackground: '#f5f5f5',
    edgeLabelBackground: '#f5f5f5',
    nodeTextColor: '#333',
    mainBkg: '#fff',
    nodeBorder: '#2196f3',
    clusterBkg: '#f8f9fa',
    clusterBorder: '#ddd',
    titleColor: '#333'
  }
};

// Initialize mermaid with default configuration
mermaid.initialize(DEFAULT_MERMAID_CONFIG);

// Sanitize Mermaid code to handle special characters
const sanitizeMermaidCode = (code) => {
  const isFlowchart = code.trim().startsWith('graph') || code.trim().startsWith('flowchart');

  if (isFlowchart) {
    return code
      .replace(/\[(.*?)\]/g, (match, text) => {
        const sanitizedText = text
          .replace(/"/g, '&quot;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\|/g, '&#124;')
          .replace(/:/g, '&#58;')
          .replace(/'/g, '&apos;');
        return `[${sanitizedText}]`;
      })
      .replace(/\|([^|]+)\|/g, (match, text) => {
        const sanitizedText = text
          .replace(/"/g, '&quot;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/:/g, '&#58;')
          .replace(/'/g, '&apos;');
        return `|${sanitizedText}|`;
      })
      .trim();
  }

  return code
    .replace(/"/g, '\\"')
    .replace(/\|/g, '\\|')
    .replace(/>/g, '\\>')
    .replace(/</g, '\\<')
    .replace(/\[/g, '(')
    .replace(/\]/g, ')')
    .trim();
};

// Generate random ID for mermaid diagrams
const randomid = () => parseInt(String(Math.random() * 1e15), 10).toString(36);

// Custom code component for mermaid diagrams
const Code = ({ inline, children = [], className, ...props }) => {
  const theme = useTheme();
  const demoid = useRef(`dome${randomid()}`);
  const [container, setContainer] = useState(null);
  const isMermaid = className && /^language-mermaid/.test(className.toLocaleLowerCase());
  const rawCode = props.node && props.node.children ? getCodeString(props.node.children) : children[0] || '';
  const code = isMermaid ? sanitizeMermaidCode(rawCode) : rawCode;

  useEffect(() => {
    if (container && isMermaid) {
      const mermaidConfig = {
        ...DEFAULT_MERMAID_CONFIG,
        theme: theme.palette.mode === 'dark' ? 'dark' : 'neutral',
        flowchart: {
          ...DEFAULT_MERMAID_CONFIG.flowchart
        },
        themeVariables: {
          ...DEFAULT_MERMAID_CONFIG.themeVariables,
          primaryColor: theme.palette.primary.main,
          primaryTextColor: theme.palette.primary.contrastText,
          primaryBorderColor: theme.palette.primary.main,
          lineColor: theme.palette.text.primary,
          secondaryColor: theme.palette.secondary.main,
          tertiaryColor: theme.palette.success.main,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize,
          labelBackground: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f5f5f5',
          edgeLabelBackground: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f5f5f5',
          nodeTextColor: theme.palette.text.primary,
          mainBkg: theme.palette.background.paper,
          nodeBorder: theme.palette.primary.main,
          clusterBkg: theme.palette.background.default,
          clusterBorder: theme.palette.divider,
          titleColor: theme.palette.text.primary,
          ...(theme.palette.mode === 'dark' && {
            mainBkg: theme.palette.background.paper,
            nodeBkg: theme.palette.background.default,
            nodeTextColor: theme.palette.text.primary,
            edgeLabelBackground: theme.palette.background.paper,
            clusterBkg: theme.palette.background.default,
            labelBoxBkgColor: theme.palette.background.paper,
            labelBoxBorderColor: theme.palette.divider,
            labelTextColor: theme.palette.text.primary
          })
        }
      };

      try {
        mermaid.initialize(mermaidConfig);
        mermaid.parse(code);
        mermaid
          .render(demoid.current, code)
          .then(({ svg }) => {
            if (container) {
              container.innerHTML = svg;
            }
          })
          .catch((error) => {
            console.error('Mermaid rendering error:', error);
            if (container) {
              container.innerHTML = `<pre style="color: ${theme.palette.error.main}; padding: 16px; background: ${
                theme.palette.mode === 'dark' ? 'rgba(255,0,0,0.1)' : 'rgba(255,0,0,0.05)'
              }; border-radius: 4px; border: 1px solid ${theme.palette.error.main};">Error rendering diagram: ${
                error.message
              }\n\nCode:\n${code}</pre>`;
            }
          });
      } catch (error) {
        console.error('Mermaid initialization error:', error);
        if (container) {
          container.innerHTML = `<pre style="color: ${theme.palette.error.main}; padding: 16px; background: ${
            theme.palette.mode === 'dark' ? 'rgba(255,0,0,0.1)' : 'rgba(255,0,0,0.05)'
          }; border-radius: 4px; border: 1px solid ${theme.palette.error.main};">Error initializing Mermaid: ${
            error.message
          }\n\nCode:\n${code}</pre>`;
        }
      }
    }
  }, [container, isMermaid, code, theme]);

  if (isMermaid) {
    return (
      <Fragment>
        <div id={demoid.current} style={{ display: 'none' }} />
        <div
          ref={setContainer}
          data-name="mermaid"
          style={{
            background: 'transparent',
            padding: theme.spacing(2, 0),
            borderRadius: theme.shape.borderRadius,
            transition: theme.transitions.create(['background-color', 'color'])
          }}
        />
      </Fragment>
    );
  }

  return (
    <code
      className={className}
      style={{
        backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f0f0f0',
        color: theme.palette.mode === 'dark' ? '#e3e3e3' : '#24292e',
        padding: theme.spacing(0.5, 1),
        borderRadius: theme.shape.borderRadius,
        fontSize: theme.typography.body2.fontSize,
        fontFamily: theme.typography.fontMonospace || 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        transition: theme.transitions.create(['background-color', 'color'])
      }}
    >
      {children}
    </code>
  );
};

Code.propTypes = {
  inline: PropTypes.bool,
  children: PropTypes.array,
  className: PropTypes.string
};

// Markdown styles generator
const getMarkdownStyles = (theme) => ({
  style: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    // padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'color']),
    // '& pre': {
    //   backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
    //   borderRadius: theme.shape.borderRadius,
    //   padding: theme.spacing(2),
    //   margin: theme.spacing(2, 0),
    //   overflow: 'auto',
    //   border: `1px solid ${theme.palette.divider}`
    // },
    '& code': {
      backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f0f0f0',
      color: theme.palette.mode === 'dark' ? '#e3e3e3' : '#24292e',
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(1),
      fontSize: theme.typography.body2.fontSize,
      fontFamily: theme.typography.fontMonospace || 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace'
    },
    '& img': {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: theme.shape.borderRadius,
      margin: theme.spacing(2, 0),
      border: `1px solid ${theme.palette.divider}`
    },
    '& table': {
      borderCollapse: 'separate',
      borderSpacing: 0,
      width: '100%',
      marginBottom: theme.spacing(3),
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.divider}`,
      overflow: 'hidden',
      '& tr': {
        '&:last-of-type td': {
          borderBottom: 'none'
        },
        '&:nth-of-type(even)': {
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'
        }
      },
      '& th, & td': {
        border: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
        borderRight: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(1.5, 2),
        '&:last-of-type': {
          borderRight: 'none'
        }
      },
      '& th': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
        fontWeight: theme.typography.fontWeightMedium,
        textAlign: 'left'
      }
    },
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      transition: theme.transitions.create('color'),
      '&:hover': {
        color: theme.palette.primary.dark,
        textDecoration: 'underline'
      }
    }
    // '& blockquote': {
    //   borderLeft: `4px solid ${theme.palette.primary.main}`,
    //   margin: theme.spacing(2, 0),
    //   padding: theme.spacing(1, 2),
    //   backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
    //   borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`
    // },
    // '& hr': {
    //   border: 'none',
    //   height: 1,
    //   backgroundColor: theme.palette.divider,
    //   margin: theme.spacing(3, 0)
    // },
    // '& ul, & ol': {
    //   paddingLeft: theme.spacing(4),
    //   marginBottom: theme.spacing(2)
    // },
    // '& li': {
    //   marginBottom: theme.spacing(1),
    //   '& > p': {
    //     marginBottom: theme.spacing(1)
    //   }
    // },
    // '& h1, & h2, & h3, & h4, & h5, & h6': {
    //   color: theme.palette.text.primary,
    //   fontWeight: theme.typography.fontWeightBold,
    //   marginTop: theme.spacing(3),
    //   marginBottom: theme.spacing(2),
    //   '&:first-child': {
    //     marginTop: 0
    //   },
    //   '& a': {
    //     color: 'inherit',
    //     textDecoration: 'none',
    //     '&:hover': {
    //       color: theme.palette.primary.main,
    //       textDecoration: 'none'
    //     }
    //   }
    // },
    // '& h1': {
    //   fontSize: '2em',
    //   borderBottom: `1px solid ${theme.palette.divider}`,
    //   paddingBottom: theme.spacing(1)
    // },
    // '& h2': {
    //   fontSize: '1.5em',
    //   borderBottom: `1px solid ${theme.palette.divider}`,
    //   paddingBottom: theme.spacing(1)
    // }
    // '& h3': { fontSize: '1.3em' },
    // '& h4': { fontSize: '1.2em' },
    // '& h5': { fontSize: '1.1em' },
    // '& h6': { fontSize: '1em' },
    // '& p': {
    //   marginBottom: theme.spacing(2),
    //   lineHeight: 1.6
    // }
    // '& .mermaid': {
    //   backgroundColor: 'transparent',
    //   padding: theme.spacing(3),
    //   margin: theme.spacing(2, 0),
    //   display: 'flex',
    //   justifyContent: 'center',
    //   borderRadius: theme.shape.borderRadius,
    //   border: `1px solid ${theme.palette.divider}`,
    //   overflow: 'auto',
    //   '& svg': {
    //     maxWidth: '100%',
    //     height: 'auto',
    //     '& .node rect, & .node circle, & .node ellipse, & .node polygon, & .node path': {
    //       fill: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#fff',
    //       stroke: theme.palette.primary.main,
    //       strokeWidth: '2px'
    //     },
    //     '& .node.current rect, & .node.current circle, & .node.current ellipse, & .node.current polygon, & .node.current path':
    //       {
    //         fill: theme.palette.primary.main,
    //         stroke: theme.palette.primary.dark
    //       },
    //     '& .node text': {
    //       fill: theme.palette.mode === 'dark' ? theme.palette.text.primary : '#333',
    //       fontSize: theme.typography.body2.fontSize,
    //       fontFamily: theme.typography.fontFamily
    //     },
    //     '& .edgePath path': {
    //       stroke: theme.palette.mode === 'dark' ? theme.palette.text.secondary : '#666',
    //       strokeWidth: '2px',
    //       opacity: 0.8
    //     },
    //     '& .edgeLabel': {
    //       background: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f5f5f5',
    //       fill: theme.palette.mode === 'dark' ? theme.palette.text.primary : '#333',
    //       fontSize: theme.typography.caption.fontSize,
    //       fontFamily: theme.typography.fontFamily,
    //       '& rect': {
    //         fill: theme.palette.mode === 'dark' ? theme.palette.background.paper : '#f5f5f5',
    //         opacity: 0.9
    //       }
    //     },
    //     '& .cluster rect': {
    //       fill: theme.palette.mode === 'dark' ? theme.palette.background.default : '#f8f9fa',
    //       stroke: theme.palette.divider,
    //       strokeWidth: '1px',
    //       rx: theme.shape.borderRadius,
    //       ry: theme.shape.borderRadius
    //     },
    //     '& .cluster text': {
    //       fill: theme.palette.text.secondary,
    //       fontSize: theme.typography.body2.fontSize,
    //       fontFamily: theme.typography.fontFamily
    //     },
    //     '& marker': {
    //       fill: theme.palette.mode === 'dark' ? theme.palette.text.secondary : '#666'
    //     }
    //   }
    // }
  },
  wrapperElement: {
    'data-color-mode': theme.palette.mode
  }
});

const Markdown = ({ source }) => {
  const theme = useTheme();
  return <MarkdownPreview source={source} components={{ code: Code }} {...getMarkdownStyles(theme)} />;
};

Markdown.propTypes = {
  source: PropTypes.string.isRequired
};

export default Markdown;
