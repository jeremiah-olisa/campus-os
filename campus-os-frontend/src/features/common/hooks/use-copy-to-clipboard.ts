import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface UseCopyToClipboardOptions {
  timeout?: number;
  onCopy?: (text: string) => void;
}

export function useCopyToClipboard(options: UseCopyToClipboardOptions = {}) {
  const { timeout = 2000, onCopy } = options;
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const copy = useCallback(
    async (text: string, field: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopiedField(field);
        onCopy?.(text);

        if (timeoutRef.current !== null) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
          setCopiedField(null);
          timeoutRef.current = null;
        }, timeout);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    },
    [onCopy, timeout]
  );

  const isCopied = useCallback(
    (field: string) => copiedField === field,
    [copiedField]
  );

  return useMemo(
    () => ({
      copy,
      isCopied,
      copiedField,
    }),
    [copy, isCopied, copiedField]
  );
}
