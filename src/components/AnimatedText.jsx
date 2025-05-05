

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Markdown from 'markdown-to-jsx';

const AnimatedText = ({ text, className, setIsWriting }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const typingSpeed = 10; // Typing speed in ms
  const batchSize = 5; // Number of characters to append in one batch

  useEffect(() => {
    setIsWriting(true);
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        const nextIndex = Math.min(currentIndex + batchSize, text.length);
        setDisplayedText(text.slice(0, nextIndex));
        setCurrentIndex(nextIndex);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
      setIsWriting(false);
    }
  }, [currentIndex, text, batchSize, typingSpeed, setIsWriting]);

  const markdownOptions = {
    overrides: {
      // Headings with clean left alignment
      h1: { component: 'h1', props: { className: 'text-2xl font-bold my-4' } },
      h2: { component: 'h2', props: { className: 'text-xl font-bold my-3' } },
      h3: { component: 'h3', props: { className: 'text-lg font-bold my-2' } },
      h4: { component: 'h4', props: { className: 'text-md font-bold my-2' } },
      h5: { component: 'h5', props: { className: 'text-sm font-bold my-1' } },
      h6: { component: 'h6', props: { className: 'text-xs font-bold my-1' } },

      // Minimal table (no borders, only subtle row separation)
      table: { component: 'table', props: { className: 'w-full my-4' } },
      th: { component: 'th', props: { className: 'p-2 font-bold text-left' } },
      td: { component: 'td', props: { className: 'p-2 align-top' } },
      tr: { component: 'tr', props: { className: 'border-b border-gray-100' } },

      // Paragraphs and text alignment
      p: { component: 'p', props: { className: 'my-2 leading-normal' } },

      // Lists with tight spacing
      ul: { component: 'ul', props: { className: 'list-disc pl-5 my-2 space-y-1' } },
      ol: { component: 'ol', props: { className: 'list-decimal pl-5 my-2 space-y-1' } },
      li: { component: 'li', props: { className: 'pl-1' } },

      // Code blocks
      code: { component: 'code', props: { className: 'bg-gray-100 px-1 rounded font-mono text-sm' } },
      pre: { component: 'pre', props: { className: 'bg-gray-100 p-3 rounded overflow-x-auto my-4' } },

      // Blockquotes
      blockquote: { component: 'blockquote', props: { className: 'border-l-2 border-gray-300 pl-4 my-2 text-gray-600' } },

      // Inline elements
      strong: { component: 'strong', props: { className: 'font-semibold' } },
      em: { component: 'em', props: { className: 'italic' } },
      a: { component: 'a', props: { className: 'text-blue-600 hover:underline' } },
      img: { component: 'img', props: { className: 'my-2 rounded-lg' } }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      <Markdown options={markdownOptions}>
        {displayedText}
      </Markdown>
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="inline-block ml-1"
        >
          ▌
        </motion.span>
      )}
    </motion.div>
  );
};

export default AnimatedText;
