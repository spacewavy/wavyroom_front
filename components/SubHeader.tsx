export interface SubHeaderProps {
  name: string;
}

const SubHeader = ({ name }: SubHeaderProps) => {
  return <div className='font-light text-[58px]'>{name}</div>;
};

export default SubHeader;
