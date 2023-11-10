import Button from './Button';
import Dropdown from './Dropdown';
import Sidebar from './Sidebar';

const Navbar = () => {
  return (
    <nav className='bg-white'>
      <div className='px-2 mx-auto sm:px-6 lg:px-6'>
        <div className='flex items-center justify-between h-24'>
          <Sidebar />
          <div className='inset-y-0 right-0 flex items-center justify-between sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <div className='hidden sm:ml-6 sm:block'>
              <div className='flex space-x-20 sm:space-x-8'>
                <Dropdown
                  name='모델'
                  list={[
                    { name: 'Demo1', href: '#' },
                    { name: 'Demo2', href: '#' },
                    { name: 'Demo3', href: '#' },
                    { name: 'Demo4', href: '#' },
                  ]}
                />
                <Dropdown
                  name='메뉴'
                  list={[
                    { name: 'Demo1', href: '#' },
                    { name: 'Demo2', href: '#' },
                    { name: 'Demo3', href: '#' },
                    { name: 'Demo4', href: '#' },
                  ]}
                />
                <a
                  href='#'
                  className='px-3 py-2 text-xs font-normal text-black rounded-md'>
                  KOR
                </a>
              </div>
            </div>
            <div className='ml-[80px]'>
              <Button name='주문하기' arrow varient='default' />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
