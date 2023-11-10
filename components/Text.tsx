import React from 'react';

interface TextProps {
  varient:
    | 'body'
    | 'label'
    | 'title'
    | 'headline'
    | 'display'
    | null
    | undefined;
  size: 'default' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | null | undefined;
}

const Text = (props: TextProps) => {
  return <p>Text</p>;
};

export default Text;
