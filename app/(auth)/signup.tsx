import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import AuthTextInput from '@/components/mini/authTextInput'

const Signup = () => {
  return (
    <View style={tw`px-20 pt-28 pb-12 bg-white h-full`}>
      <View>
        <Image
          source={require('@/assets/images/logo_name.png')}
        />
        <Text style={tw`font-bold text-xl mt-20 mb-5`}>Signup</Text>
      </View>
      <View>
        <AuthTextInput label='Your Full Name' name='name' id='name' placeholder='Your name' />
        <AuthTextInput label='Email/Phone' name='emailOrPhone' id='emailOrPhone' placeholder='Type your email/phone'/>
        <AuthTextInput label='Password' name='password' id='password' placeholder='Type your password'/>
        <AuthTextInput label='Confirm Password' name='confirmPassword' id='confirmPassword' placeholder='Retype your password'/>
      </View>
    </View>
  )
}

export default Signup