import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface TocItem {
  level: number;
  title: string;
  id: string;
}

const headingStyles = {
  h1: 'text-4xl font-bold mt-4 mb-2',
  h2: 'text-3xl font-semibold mt-3 mb-2',
  h3: 'text-2xl font-medium mt-2 mb-1',
  h4: 'text-xl font-normal mt-2 mb-1',
  h5: 'text-lg font-normal mt-1 mb-1',
  h6: 'text-base font-normal mt-1 mb-1',
};

const separatorStyles = {
  borderTop: '2px solid gray',
  marginTop: '8px',
  marginBottom: '16px',
};

const containerStyles = {
  border: '2px solid gray',
  borderRadius: '16px',
  padding: '16px',
  margin: '16px',
};

export default function EmptyPage() {
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [toc] = useState<TocItem[]>([]);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/maxi-smidt/Plagiator/readme',
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch README');
        }

        const data = await response.json();
        const decodedContent = atob(data.content);
        setReadmeContent(decodedContent);
      } catch (error) {
        console.error(error);
        setReadmeContent('Failed to load README');
      }
    };

    fetchReadme();
  }, []);

  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={containerStyles}>
      <div>
        <ul className="toc-list">
          {toc.map((item) => (
            <li key={item.id} className={`ml-${item.level} toc-item`}>
              <button
                className="text-left"
                onClick={() => handleScrollToSection(item.id)}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {readmeContent ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <>
                  <h1 className={headingStyles.h1} id={getId(children)}>
                    {children}
                  </h1>
                  <div style={separatorStyles} />
                </>
              ),
              h2: ({ children }) => (
                <>
                  <h2 className={headingStyles.h2} id={getId(children)}>
                    {children}
                  </h2>
                  <div style={separatorStyles} />
                </>
              ),
              h3: ({ children }) => (
                <>
                  <h3 className={headingStyles.h3} id={getId(children)}>
                    {children}
                  </h3>
                  <div style={separatorStyles} />
                </>
              ),
              h4: ({ children }) => (
                <>
                  <h4 className={headingStyles.h4} id={getId(children)}>
                    {children}
                  </h4>
                  <div style={separatorStyles} />
                </>
              ),
              h5: ({ children }) => (
                <>
                  <h5 className={headingStyles.h5} id={getId(children)}>
                    {children}
                  </h5>
                  <div style={separatorStyles} />
                </>
              ),
              h6: ({ children }) => (
                <>
                  <h6 className={headingStyles.h6} id={getId(children)}>
                    {children}
                  </h6>
                  <div style={separatorStyles} />
                </>
              ),
              code(props) {
                const { children, className } = props;
                const match = /language-(\w+)/.exec(className || '');

                if (match) {
                  return (
                    <pre className="my-4 p-4 bg-gray-800 text-white rounded overflow-x-auto font-mono">
                      <code className={className}>{children}</code>
                    </pre>
                  );
                }

                return (
                <code className="bg-gray-200 text-black font-mono px-1 py-0.9 rounded">                    
                  {children}
                </code>
                );
              },
            }}
            className="prose prose-lg max-w-none"
          >
            {readmeContent}
          </ReactMarkdown>
        ) : (
          <p>Loading README...</p>
        )}
      </div>
    </div>
  );
}

const getId = (children: React.ReactNode): string => {
  if (typeof children === 'string') {
    return children.toLowerCase().replace(/\s+/g, '-');
  }
  return '';
};
