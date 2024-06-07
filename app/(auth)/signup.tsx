import { View, Text, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import tw from 'twrnc'
import AuthTextInput from '@/components/mini/authTextInput'
import { router } from 'expo-router'
import axios from "axios";
import { useToast } from 'react-native-toast-notifications';
import FontAwesome from '@expo/vector-icons/FontAwesome'
import RBSheet from 'react-native-raw-bottom-sheet'
import { FontAwesome5 } from '@expo/vector-icons'; // Import icons from FontAwesome
import { MaterialIcons } from '@expo/vector-icons';

const Signup = () => {
  const [termsShown, setTermsShown] = useState(false);
  const [form, setForm] = useState({
    name: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const termsRefSheet = useRef<any>();
  const toast = useToast();

  const handleSignup = async () => {
    if (form.password !== form.confirmPassword) {
      toast.show('Passwords do not match', {
        type: 'danger',
        placement: 'top',
        animationType: 'slide-in',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://10.5.222.201:5550/auth/signup', {
        name: form.name,
        emailOrPhone: form.emailOrPhone,
        password: form.password,
      });

      if (response.status === 201) {
        toast.show('User created successfully', {
          type: 'success',
          placement: 'top',
          animationType: 'slide-in',
        });
        router.push('/signin');
      } else {
        toast.show(response.data.message, {
          type: 'danger',
          placement: 'top',
          animationType: 'zoom-in',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.show('An error occurred. Please try again later.', {
        type: 'danger',
        placement: 'top',
        animationType: 'zoom-in',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupGoogle = () => {

  }

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };
  return (
    <ScrollView>
      <View style={tw`px-10 pt-24 pb-12 bg-white h-full`}>
        <View>
          <Image
            source={require('@/assets/images/logo_name.png')}
          />
          <Text style={tw`font-bold text-xl mt-20 mb-5`}>Signup</Text>
        </View>
        <View>
          <AuthTextInput
            label="Your Full Name"
            value={form.name}
            onChangeText={(text) => handleChange('name', text)}
            placeholder="Your name"
          />
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
          <AuthTextInput
            label="Confirm Password"
            value={form.confirmPassword}
            onChangeText={(text) => handleChange('confirmPassword', text)}
            placeholder="Retype your password"
          />
        </View>
        <View>
          <TouchableOpacity
            style={tw`w-full bg-blue-500 rounded-md py-2`}
            onPress={handleSignup}
          >
            {isSubmitting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={tw`text-white text-center`}>Join now</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={tw`my-3 py-5 gap-3`}>
          <View style={tw`flex-row justify-center items-center gap-3`}>
            <View style={tw`w-[28%] border border-gray-500 h-[1px]`} />
            <Text>Or sign up with</Text>
            <View style={tw`w-[28%] border border-gray-500 h-[1px]`} />
          </View>
          <TouchableOpacity
            style={tw`w-full flex-row justify-center items-center gap-10 bg-white rounded-md py-2 border border-gray-500`}
            onPress={handleSignupGoogle}
          >
            <FontAwesome name='google' />
            <Text style={tw`text-gray-500 font-semibold`}>Google</Text>
          </TouchableOpacity>
          <View style={tw`flex items-center justify-center`}>
            <Text>By Using this app you agree with the</Text>
            <TouchableOpacity
              onPress={() => {
                termsRefSheet.current.open();
              }}
            >
              <Text style={tw`font-semibold text-blue-500`}>Terms of Services</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <RBSheet
        ref={termsRefSheet}
        draggable={true}
        customStyles={{
          container: {
            paddingVertical: 15,
            paddingHorizontal: 25,
            alignItems: 'center',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            gap: 3,
            height: 450,
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        <ScrollView style={tw`w-full`}>
          <Text style={tw`font-bold mb-3`}>
            By accessing and using our mobile social media app, you agree to comply with these terms of service.
          </Text>
          <View style={tw`flex items-center justify-center gap-y-2`}>
            <FontAwesome5 name="user" size={24} color="blue" /> You must be at least 13 years old to use our app. If you are under 13, you may not use the app.
            {'\n\n'}
            <MaterialIcons name="security" size={24} color="blue" /> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            {'\n\n'}
            <FontAwesome5 name="exclamation-triangle" size={24} color="blue" /> You may not impersonate any person or entity, or falsely state or otherwise misrepresent yourself.
            {'\n\n'}
            <MaterialIcons name="link" size={24} color="blue" /> Our app may contain links to third-party websites or services that are not owned or controlled by us. We are not responsible for the content or practices of any third-party websites or services.
            {'\n\n'}
            <FontAwesome5 name="edit" size={24} color="blue" /> We reserve the right to modify or terminate the app or your access to it for any reason, without notice, at any time.
            {'\n\n'}
            <MaterialIcons name="gavel" size={24} color="blue" /> You may not use the app for any illegal or unauthorized purpose, including but not limited to violating any laws in your jurisdiction.
            {'\n\n'}
            <FontAwesome5 name="shield-alt" size={24} color="blue" /> We may collect and use your personal information in accordance with our Privacy Policy, which is incorporated by reference into these terms of service.
            {'\n\n'}
            <MaterialIcons name="thumb-up" size={24} color="blue" /> You retain ownership of any content you post or share on the app, but by posting or sharing content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content.
            {'\n\n'}
            <FontAwesome5 name="ban" size={24} color="blue" /> You may not post or share any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable.
            {'\n\n'}
            <MaterialIcons name="block" size={24} color="blue" /> We reserve the right to remove any content that violates these terms of service or that we believe is inappropriate, in our sole discretion.
          </View>
        </ScrollView>
      </RBSheet>
    </ScrollView>
  )
}

export default Signup