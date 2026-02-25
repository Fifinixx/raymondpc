'use client'
import { useRef, useEffect } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../store/store'
import { setUser } from './slices/auth-slice'


export default  function StoreProvider({
  children, preLoadedUser
}: {
  children: React.ReactNode,
  preLoadedUser:{firstName:string, email:string, userId:string, role:string} | undefined
}) {

  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
    if(preLoadedUser){
      storeRef.current.dispatch(setUser(preLoadedUser))
    }
  }
  return <Provider store={storeRef.current}>{children}</Provider>
}