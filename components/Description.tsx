export interface DescriptionProps {
  value: string;
}

const Description = ({ value }: DescriptionProps) => {
  return <div className='font-light text-base'>{value}</div>;
};

export default Description;
