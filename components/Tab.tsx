import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface TabProps {
  list: any;
  value: string;
}

export interface TabListProps {
  name: string;
  value: string;
  index: number;
  details: any;
}

const Tab = ({ list, value }: TabProps) => {
  return (
    <>
      <Tabs defaultValue={value}>
        <TabsList className='h-0 p-0'>
          {list?.length > 0 &&
            list?.map(({ name, value, index }: TabListProps) => (
              <TabsTrigger
                key={index}
                value={value}
                className='w-[63px] h-[22px] p-0 border-b-0'>
                {name}
              </TabsTrigger>
            ))}
        </TabsList>
        {/* <TabsContent value='account'>
          Make changes to your account here.
        </TabsContent>
        <TabsContent value='password'>Change your password here.</TabsContent> */}
      </Tabs>
    </>
  );
};

export default Tab;
