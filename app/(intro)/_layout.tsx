import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import React from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

type Slide = {
  id: number,
  title: string,
  subtitle: string,
  image: ImageSourcePropType,
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Find Friends & Get Inspiration',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat vitae quis quam augue quam a.',
    image: require('@/assets/images/intro1.png'),
  },
  {
    id: 2,
    title: 'Meet Awesome People & Enjoy yourself',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat vitae quis quam augue quam a.',
    image: require('@/assets/images/intro2.png'),
  },
  {
    id: 3,
    title: 'Hangout with our friends',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat vitae quis quam augue quam a.',
    image: require('@/assets/images/intro3.png'),
  },
]

const IntroSlider = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: Slide }) => {
    return (
      <View style={tw`flex-1 h-96 justify-center items-center py-20`}>
        <View style={tw`flex-1 justify-center items-center`}>
          <Image source={item.image} style={tw`w-full h-64`} resizeMode="contain" />
          <Text style={tw`text-lg font-bold mt-4`}>{item.title}</Text>
          <Text style={tw`text-base text-gray-600 mt-2 text-center px-6`}>{item.subtitle}</Text>
        </View>
      </View>
    )
  }
  const handleAuthSignin = () => {
    router.push('(auth)/signin')
  }
  const handleAuthSignup = () => {
    router.push('(auth)/signup')
  }
  return (
    <View style={tw`h-full w-full bg-white px-10 flex-1 items-center`}>
      <View style={tw`absolute top-0 left-0 w-32 h-56 rounded-br-full bg-blue-100 opacity-30`} />
      <AppIntroSlider
        renderItem={renderItem}
        data={slides}
        showNextButton={false}
        showSkipButton={false}
        showDoneButton={false}
        activeDotStyle={{
          width: 30,
          height: 10,
          backgroundColor: 'blue'
        }}
      />
      <View style={tw`w-full absolute bottom-0 pb-20 justify-center z-10 px-10`}>
        <TouchableOpacity
          style={tw`w-full bg-blue-500 rounded-md py-2`}
          onPress={handleAuthSignup}
        >
          <Text style={tw`text-white text-center`}>Join now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`py-2 my-2`}
          onPress={handleAuthSignin}
        >
          <Text style={tw`text-blue-600 text-center`}>Sign in</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`absolute bottom-0 right-0 w-32 h-56 rounded-tl-full bg-blue-100 opacity-30 z-0`} />
    </View>
  )
}

export default IntroSlider