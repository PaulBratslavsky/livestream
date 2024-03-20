import Editor from "@monaco-editor/react";
import { ClientOnly } from "remix-utils/client-only";

interface CodeEditorProps {
  data: {
    title: string;
    description: string;
    code: string;
    language:
      | "javascript"
      | "typescript"
      | "python"
      | "ruby"
      | "go"
      | "csharp"
      | "java"
      | "html"
      | "css"
      | "json"
      | "yaml"
      | "markdown"
      | "sql"
      | "shell"
      | "php"
      | "xml"
      | "plaintext"
      | "dockerfile"
      | "javascriptreact"
      | "typescriptreact"
      | "jsonc"
      | "c"
      ;
  };
}

export function CodeEditor({ data }: CodeEditorProps) {
  return (
    <ClientOnly fallback={<p>Loading...</p>}>
      {() => (
        <div className="mb-8">
          <div className="h-[500px] container mx-auto py-6">
            <Editor
              className="rounded-xl overflow-hidden shadow-lg"
              height="100%"
              defaultLanguage={data.language}
              defaultValue={data.code}
            />
          </div>
        </div>
      )}
    </ClientOnly>
  );
}
