import { generateRoutes } from "@/hooks";
const MSG_403 = 'Sorry, you are not authorized to access this page.';
const MSG_404 = 'Sorry, the page you visited does not exist.';
const MSG_500 = 'Sorry, something went wrong.';
const initColor={
    primaryColor: '#1890ff',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
    successColor: '#52c41a',
    infoColor: '#1890ff',
}
const {menu,breads} =generateRoutes()
export { MSG_403, MSG_404, MSG_500 ,menu,breads,initColor};
