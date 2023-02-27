import useStores from "./useStores";
import { useEffect, useState } from "react";
function useAppName() {
  const { commonStore } = useStores();
  const [appname, setAppName] = useState(()=>commonStore.appName.toLowerCase());
  useEffect(() => {
    setAppName(commonStore.appName.toLowerCase());
  }, [commonStore.appName]);
  return { appname };
}
export default useAppName;
