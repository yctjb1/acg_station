import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
const FilingFooter = () => {
    return (
        <div className="fixed bottom-0 text-sm text-center font-medium bg-black text-white w-full min-h-[80px]  flex items-center justify-center">
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem className='bg-white' />}
                spacing={2}
            >
                <a
                    className="no-underline text-sm text-white hover:underline underline-offset-4"
                    href="//beian.miit.gov.cn" target="_blank">
                    苏ICP备16022584号-1
                </a>
                <a
                    className="no-underline text-sm text-white hover:underline underline-offset-4"
                    href="//www.v2ex.com/member/devwolf" target="_blank" >
                    devwolf的v2ex</a>
                <a
                    className="no-underline text-sm text-white hover:underline underline-offset-4"
                    href="//github.com/yctjb1" target="_blank" >
                    项目的github</a>
            </Stack>



        </div>
    );
};
export default FilingFooter;
