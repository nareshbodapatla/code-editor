import React, { useState, useRef, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism.css';
import './index.css';


const CodeEditor = () => {
  const [code, setCode] = useState('');
  const highlightRef = useRef(null);
  const textareaRef = useRef(null);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const detectLanguage = (code) => {
    const trimmedCode = code.trim();
    if (trimmedCode.startsWith('<') && trimmedCode.endsWith('>')) {
      return 'markup';
    } else if (trimmedCode.includes('function') || trimmedCode.includes('const') || trimmedCode.includes('let') || trimmedCode.includes('var')) {
      return 'javascript';
    } else {
      return 'javascript'; 
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      setCode(prevCode => {
        const newCode = prevCode.substring(0, start) + '\t' + prevCode.substring(end);
        setTimeout(() => {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 1;
        }, 0);
        return newCode;
      });
    }
  };

  useEffect(() => {
    const language = detectLanguage(code);
    if (highlightRef.current) {
      highlightRef.current.innerHTML = Prism.highlight(code, Prism.languages[language], language);
    }
  }, [code]);

  const handleScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  return (
    <div className="code-editor">
      <div
        className="code-editor__highlight"
        ref={highlightRef}
        aria-hidden="true"
      />
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleCodeChange}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
    </div>
  );
};

export default CodeEditor;
