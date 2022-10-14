import { MobXProviderContext } from 'mobx-react'
import {useContext} from 'react'
function useStores() {
  return useContext(MobXProviderContext)
}
export {useStores}