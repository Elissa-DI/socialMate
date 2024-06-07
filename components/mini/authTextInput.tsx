import { View, Text, TextInput, TextInputProps } from 'react-native'
import React from 'react'
import tw from 'twrnc';

type AuthTextInputProps = TextInputProps & {
    label: string;
    // id: string;
    // name: string;
};

const AuthTextInput = ({ label, ...props }: AuthTextInputProps) => {
    return (
        <View style={tw`relative w-full my-4`}>
            <Text style={tw`absolute -top-3 left-4 bg-white px-1 text-gray-700 z-10`}>{label}</Text>
            <TextInput
                style={tw`w-full border border-gray-300 rounded-lg px-4 py-2 z-0`}
                {...props}
            />
        </View>
    );
};

export default AuthTextInput