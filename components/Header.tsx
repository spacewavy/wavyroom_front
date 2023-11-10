export interface HeaderProps {
  name: string;
  color: any;
}

const Header = ({ name, color }: HeaderProps) => {
  return (
    <div className={`${color ? color : 'text-black'} text-xl font-normal`}>
      {name}
    </div>
  );
};

export default Header;
