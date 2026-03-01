import { View } from 'react-native'
import React, { Children } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const SafeScreen = ({children}: {children: React.ReactNode}) => {
    const insets=useSafeAreaInsets();
  return (
    <View style={{paddingTop:insets.top,paddingBottom:insets.bottom,flex:1}}>
     {children}
    </View>
  )
}

export default SafeScreen