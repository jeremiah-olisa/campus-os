import React from "react";

interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="flex flex-wrap justify-between gap-3">
      <div className="flex min-w-72 flex-col gap-2">
        <p className="text-[#0d121b] dark:text-white text-3xl font-bold leading-tight tracking-tight">
          {title}
        </p>
        <p className="text-[#4c669a] dark:text-gray-400 text-base font-normal leading-normal">
          {description}
        </p>
      </div>
    </div>
  );
};
