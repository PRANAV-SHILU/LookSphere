import { useEffect } from "react";

export default function useDocumentMetadata(title) {
  useEffect(() => {
    const originalTitle = document.title;
    if (title) {
      document.title = `${title} | LookSphere`;
    } else {
      document.title = "LookSphere";
    }

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}
