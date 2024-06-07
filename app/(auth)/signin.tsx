import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import axios from 'axios'
import AuthTextInput from '@/components/mini/authTextInput'
import { router } from 'expo-router'
import { useToast } from 'react-native-toast-notifications'

const Signin = () => {
  const [form, setForm] = useState({
    emailOrPhone: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  // const handleSignin = async () => {

  //   setIsSubmitting(true);
  //   console.log("clicked sig");

  //   try {
  //     const response = await axios.post('http://10.5.222.201:5550/auth/signin', {
  //       emailOrPhone: form.emailOrPhone,
  //       password: form.password,
  //     });

  //     if (response.status === 201) {
  //       const data = response.data;
  //       toast.show('Successfully signed in!', {
  //         type: 'success',
  //         placement: 'top',
  //         animationType: 'slide-in'
  //       });
  //       router.push('/home');
  //     } else if (response.status === 401) {
  //       toast.show('Email or Password incorrect', {
  //         type: 'danger',
  //         placement: 'top',
  //         animationType: 'zoom-in'
  //       });
  //     } else {
  //       console.log(response.data.message);        
  //       toast.show( response.data.message, {
  //         type: 'danger',
  //         placement: 'top',
  //         animationType: 'zoom-in'
  //       });
  //     }
  //   } catch (e) {
  //     console.error('Error:', e);
  //     toast.show('An error occurred. Please try again later.', {
  //       type: 'danger',
  //       placement: 'top',
  //       animationType: 'zoom-in'
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSignin = async () => {
    setIsSubmitting(true);
    console.log("clicked sig");

    try {
      const response = await axios.post('http://10.5.222.201:5550/auth/signin', {
        emailOrPhone: form.emailOrPhone,
        password: form.password,
      });

      if (response.status === 200) {
        const data = response.data;
        toast.show('Successfully signed in!', {
          type: 'success',
          placement: 'top',
          animationType: 'slide-in'
        });
        router.push('/home');
      } else {
        toast.show(response.data.message, {
          type: 'danger',
          placement: 'top',
          animationType: 'zoom-in'
        });
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
        toast.show('Incorrect Email or Password', {
          type: 'danger',
          placement: 'top',
          animationType: 'zoom-in'
        });
      } else {
        console.error('Error:', error);
        toast.show('Incorrect Email or Password', {
          type: 'danger',
          placement: 'top',
          animationType: 'zoom-in'
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };
  return (
    <View style={tw`px-10 pt-28 pb-12 bg-white h-full`}>
      <View>
        <Image
          source={require('@/assets/images/logo_name.png')}
        />
        <Text style={tw`font-bold text-xl mt-20 mb-5`}>Signin</Text>
      </View>
      <View>
        <AuthTextInput
          label="Email/Phone"
          value={form.emailOrPhone}
          onChangeText={(text) => handleChange('emailOrPhone', text)}
          placeholder="Type your email/phone"
        />
        <AuthTextInput
          label="Password"
          value={form.password}
          onChangeText={(text) => handleChange('password', text)}
          placeholder="Type your password"
        />
      </View>
      <View>
        <TouchableOpacity
          style={tw`w-full bg-blue-500 rounded-md py-2`}
          onPress={handleSignin}
        >
          {isSubmitting ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={tw`text-white text-center`}>Sign in</Text>
          )}
        </TouchableOpacity>
      </View>
    </View >
  )
}

export default Signin