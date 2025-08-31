import { View, Text, Image, TouchableOpacity } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 bg-white p-4 justify-center items-center">
      
      {/* Left Section - Image */}
      <Image
        source={require("../assets/tablet.jpg")} // replace with your actual image path
        className="w-72 h-96 rounded-2xl"
        resizeMode="cover"
      />s

      {/* Right Section */}
      <View className="mt-6 items-center">
        <Text className="text-sm italic mb-2">Write It Track It Live It</Text>
        <Text className="text-4xl font-bold">Organize.</Text>
        <Text className="text-lg tracking-widest">Better</Text>
      </View>

      {/* Next Button */}
      <TouchableOpacity className="absolute bottom-10 right-6 bg-gray-200 px-6 py-2 rounded-xl shadow">
        <Text className="font-semibold">NEXT</Text>
      </TouchableOpacity>
    </View>
  );
}
