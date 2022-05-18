import React from "react";
import { useRemark } from "react-remark";

interface ContentPreviewProps {
  content: string;
}

const ContentRenderer = ({ content }: ContentPreviewProps) => {
  const [reactContent, setContent] = useRemark();

  React.useEffect(() => {
    setContent(content);
  }, [content, setContent]);

  return reactContent;
};

export default ContentRenderer;
