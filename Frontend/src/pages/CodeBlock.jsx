import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../styles/CodeBlock.css";
function CodeBlock({ language, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="code-block">
      <div className="code-header">
        <span>{language || "text"}</span>

        <button onClick={handleCopy}>
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: "0 0 12px 12px",
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;