
// // import { View, Text, ScrollView, Image, Pressable, TextInput, StyleSheet, useWindowDimensions, ImageBackground } from 'react-native'
// // import React, { useEffect, useState } from 'react'
// // import { Link } from 'expo-router';
// // import Svg, { Path } from 'react-native-svg';
// // import MapView, { Marker } from 'react-native-maps';
// // import { MaterialIcons } from '@expo/vector-icons';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import Footer from '@/components/Footer';
// // const Index = () => {
// //   const { width } = useWindowDimensions();
  
// //   // Form state
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [message, setMessage] = useState('');

// //   // Static images (no API calls - fixes 403 error)
// //   const heroImages = [
// //     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=720&h=600&fit=crop&q=80",
// //     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=720&h=600&fit=crop&q=80",
// //     "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=720&h=600&fit=crop&q=80",
// //     "https://images.unsplash.com/photo-1518770660439-4636190af475?w=720&h=600&fit=crop&q=80",
// //   ];

// //   const [heroImageIndex, setHeroImageIndex] = useState(0);

// //   // Slider state
// //   const [currentSlide, setCurrentSlide] = useState(0);
// //   const sliderImages = [
// //     "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1170&h=600&fit=crop&q=80",
// //     "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1171&h=600&fit=crop&q=80",
// //     "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=1171&h=600&fit=crop&q=80",
// //     "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1170&h=600&fit=crop&q=80",
// //     "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1170&h=600&fit=crop&q=80",
// //   ];

// //   // Rotate hero image every 30 seconds
// //   useEffect(() => {
// //     const imageInterval = setInterval(() => {
// //       setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
// //     }, 30000);
// //     return () => clearInterval(imageInterval);
// //   }, []);

// //   // Auto-advance slider
// //   useEffect(() => {
// //     const sliderInterval = setInterval(() => {
// //       setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
// //     }, 5000);
// //     return () => clearInterval(sliderInterval);
// //   }, []);

// //   const nextSlide = () => {
// //     setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
// //   };

// //   const prevSlide = () => {
// //     setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
// //   };

// //   return (
// //     <ScrollView className="flex-1 bg-slate-50">
// //       {/* --- Header --- */}
// //       <View className="w-full bg-white shadow-sm">
// //         <View className="flex-row py-4 px-4 items-center justify-between flex-wrap">
// //           {/* Logo */}
// //           <Pressable className="flex-row items-center mb-2">
// //             <View className="h-10 w-10 items-center justify-center">
// //               <Image
// //                 source={require('../../assets/images/logo.png')}
// //                 className="h-10 w-10 rounded-full"
// //                 resizeMode="contain"
// //               />
// //             </View>
// //             <Text className=" text-sm font-bold text-indigo-600">
// //               OPPORTUNITY RADAR
// //             </Text>
// //           </Pressable>

// //           {/* Contact Button */}
// //           <Pressable 
// //             className="flex-row items-center bg-gray-900 py-2 px-2 rounded-full mb-2"
// //             style={({ pressed }) => ({
// //               backgroundColor: pressed ? '#374151' : '#111827',
// //             })}
// //              onPress={() => {
    
// //   }}
// //           >
// //             <Text className="text-white text-sm font-semibold mr-1">Contact Us</Text>
// //             <MaterialIcons name="arrow-forward" size={14} color="white" />
// //           </Pressable>
// //         </View>
// //       </View>

// //       {/* --- Main Hero Section --- */}
// //       <View className="px-5 py-12">
// //         <View className="items-center">
// //           {/* Hero Image */}
// //           <View className="w-full mb-10 rounded-lg overflow-hidden shadow-xl">
// //             <Image
// //               source={{ uri: heroImages[heroImageIndex] }}
// //               style={{ width: '100%', height: 300 }}
// //               resizeMode="cover"
// //             />
// //           </View>

// //           {/* Hero Text */}
// //           <View className="w-full items-center">
// //             <Text className="text-4xl mb-6 font-extrabold text-gray-900 text-center">
// //               Visualize Skills,{'\n'}
// //               <Text className="text-indigo-600">Discover Careers</Text>
// //             </Text>
            
// //             <Text className="mb-8 text-lg text-gray-600 text-center px-4">
// //               Unlock insights with precision.{' '}
// //               <Text className="font-semibold text-gray-800">OPPORTUNITY RADAR:</Text>{' '}
// //               Your smart radar to spot job trends and skill opportunities ahead.
// //             </Text>

// //             <View className="flex-row gap-2">
// //               <Pressable 
// //                 className="bg-indigo-600 py-3 px-4 rounded-full"
// //                 style={({ pressed }) => ({
// //                   backgroundColor: pressed ? '#4338ca' : '#4f46e5',
// //                 })}
// //               >
// //                 <Text className="text-white text-lg font-semibold">Explore Careers</Text>
// //               </Pressable>

// //               <Pressable 
// //                 className="bg-white border border-gray-200 py-3 px-4 rounded-full"
// //                 style={({ pressed }) => ({
// //                   backgroundColor: pressed ? '#f9fafb' : '#ffffff',
// //                 })}
// //               >
// //                 <Text className="text-gray-700 text-lg font-semibold">Watch Demo</Text>
// //               </Pressable>
// //             </View>
// //           </View>
// //         </View>
// //       </View>

// //       {/* --- Mission Section --- */}
// //       <View className="bg-gray-900 py-16 px-5">
// //         <View className="bg-gray-800 p-8 rounded-xl border-l-4 border-indigo-500">
// //           <Text className="text-3xl mb-6 font-bold text-indigo-400">
// //             Enhance Job Prospects with Visualization
// //           </Text>
// //           <Text className="text-lg mb-6 text-gray-300">
// //             Discover your career potential with Opportunity Radar's innovative skills 
// //             visualization platform. We empower job seekers by transforming skills into 
// //             visual opportunities, streamlining the job search process.
// //           </Text>
// //           <Pressable className="flex-row items-center">
// //             <Text className="text-indigo-400 font-semibold mr-2">Learn More</Text>
// //             <MaterialIcons name="arrow-forward" size={16} color="#818cf8" />
// //           </Pressable>
// //         </View>
// //       </View>

// //       {/* --- Features Grid --- */}
// //       <View className="px-5 py-16">
// //         <View className="mb-12">
// //           <Text className="text-xs text-indigo-500 font-medium mb-1 text-center">
// //             FEATURES
// //           </Text>
// //           <Text className="text-2xl font-bold text-gray-900 text-center">
// //             Everything you need to succeed
// //           </Text>
// //         </View>

// //         <View className="gap-4">
// //           {[
// //             {
// //               title: "About",
// //               desc: "Your guide to jobs, skills, and the future of work.",
// //               icon: "info",
// //             },
// //             {
// //               title: "Dashboards",
// //               desc: "Data-driven dashboards to uncover trends.",
// //               icon: "dashboard",
// //             },
// //             {
// //               title: "Opportunities",
// //               desc: "Latest job openings tailored to your skills.",
// //               icon: "work",
// //             },
// //             {
// //               title: "Add Listing",
// //               desc: "Introduce new opportunities to the network.",
// //               icon: "add-circle",
// //             },
// //           ].map((item, index) => (
// //             <Pressable 
// //               key={index}
// //               className="bg-white p-6 rounded-xl border border-gray-100"
// //               style={({ pressed }) => ({
// //                 transform: [{ scale: pressed ? 0.98 : 1 }],
// //               })}
// //             >
// //               <View className="flex-row items-start">
// //                 <View className="w-12 h-12 items-center justify-center rounded-full bg-indigo-100 mr-4">
// //                   <MaterialIcons name={item.icon as any} size={24} color="#4f46e5" />
// //                 </View>
// //                 <View className="flex-1">
// //                   <Text className="text-xl text-gray-900 font-bold mb-2">
// //                     {item.title}
// //                   </Text>
// //                   <Text className="text-base text-gray-500 mb-3">
// //                     {item.desc}
// //                   </Text>
// //                   <View className="flex-row items-center">
// //                     <Text className="text-indigo-500 font-semibold mr-2">Explore</Text>
// //                     <MaterialIcons name="arrow-forward" size={16} color="#6366f1" />
// //                   </View>
// //                 </View>
// //               </View>
// //             </Pressable>
// //           ))}
// //         </View>
// //       </View>

// //       {/* --- CTA Section --- */}
// //      {/* Skills Shaping Tomorrow Section */}
// // <ImageBackground
// //   source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop&q=80' }}
// //   style={styles.heroSection}
// //   resizeMode="cover"
// // >
// //   {/* Overlay */}
// //   <LinearGradient
// //     colors={['rgba(0,0,0,0.6)', 'rgba(79,70,229,0.4)']}
// //     style={StyleSheet.absoluteFillObject}
// //   />
  
// //   <View className="items-center px-6">
// //     <Text className="text-4xl md:text-6xl font-extrabold text-white text-center mb-4">
// //       Skills Shaping Tomorrow
// //     </Text>
    
// //     <View className="h-1 w-24 bg-indigo-500 rounded-full mb-8" />
    
// //     <View className="flex-row gap-4 flex-wrap justify-center items-center">
// //       <Pressable 
// //         className="bg-indigo-600 py-2 px-5 rounded-full"
// //         style={({ pressed }) => ({
// //           backgroundColor: pressed ? '#4338ca' : '#4f46e5',
// //           transform: [{ translateY: pressed ? 2 : 0 }],
// //         })}
// //       >
// //         <Text className="text-white font-bold text-lg">Get Started</Text>
// //       </Pressable>
      
// //       <Pressable 
// //         className="border-2 border-white py-1 px-5 rounded-full"
// //         style={({ pressed }) => ({
// //           backgroundColor: pressed ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
// //         })}
// //       >
// //         <Text className="text-white font-bold text-lg">Sign In</Text>
// //       </Pressable>
// //     </View>
// //   </View>
// // </ImageBackground>

// //       {/* --- Detailed Features --- */}
// //       <View className="px-5 py-16">
// //         <View className="gap-6">
// //           {[
// //             {
// //               title: "AI-Powered Job Recommendations",
// //               desc: "Leverage advanced AI to discover opportunities that perfectly align with your skills.",
// //               img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=300&fit=crop&q=80",
// //             },
// //             {
// //               title: "Skill Gap Analysis",
// //               desc: "Identify the skills you need for your dream job and bridge the gap.",
// //               img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=300&fit=crop&q=80",
// //             },
// //             {
// //               title: "Industry Trends",
// //               desc: "Stay one step ahead with real-time insights into emerging industries.",
// //               img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop&q=80",
// //             },
// //           ].map((item, index) => (
// //             <View
// //               key={index}
// //               className="rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100"
// //             >
// //               <Image
// //                 source={{ uri: item.img }}
// //                 style={{ width: '100%', height: 200 }}
// //                 resizeMode="cover"
// //               />
// //               <View className="p-6">
// //                 <Text className="text-xl font-bold text-gray-900 mb-2">
// //                   {item.title}
// //                 </Text>
// //                 <Text className="text-base text-gray-600 mb-4">
// //                   {item.desc}
// //                 </Text>
// //                 <Pressable className="flex-row items-center">
// //                   <Text className="text-indigo-600 font-semibold mr-2">Read Details</Text>
// //                   <MaterialIcons name="arrow-forward" size={16} color="#4f46e5" />
// //                 </Pressable>
// //               </View>
// //             </View>
// //           ))}
// //         </View>
// //       </View>

// //       {/* --- Image Slider --- */}
// //       <View className="py-10 px-5">
// //         <View className="mb-8">
// //           <Text className="text-5xl font-extrabold text-gray-900 mb-2 text-center">
// //             Visualizing Future Work
// //           </Text>
// //           <Text className="text-gray-500 text-center">
// //             Swipe through the technologies defining the next decade.
// //           </Text>
// //         </View>

// //         <View className="relative rounded-xl overflow-hidden" style={{ height: 300 }}>
// //           <Image
// //             source={{ uri: sliderImages[currentSlide] }}
// //             style={StyleSheet.absoluteFillObject}
// //             resizeMode="cover"
// //           />

// //           {/* Navigation Arrows */}
// //           <Pressable
// //             onPress={prevSlide}
// //             className="absolute left-3 bg-white/30 p-1 rounded-full"
// //             style={{ top: '50%', transform: [{ translateY: -20 }] }}
// //           >
// //             <MaterialIcons name="chevron-left" size={28} color="white" />
// //           </Pressable>

// //           <Pressable
// //             onPress={nextSlide}
// //             className="absolute right-3 bg-white/30 p-1 rounded-full"
// //             style={{ top: '50%', transform: [{ translateY: -20 }] }}
// //           >
// //             <MaterialIcons name="chevron-right" size={28} color="white" />
// //           </Pressable>

// //           {/* Dots */}
// //           <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
// //             {sliderImages.map((_, idx) => (
// //               <Pressable key={idx} onPress={() => setCurrentSlide(idx)}>
// //                 <View
// //                   style={{
// //                     width: currentSlide === idx ? 24 : 8,
// //                     height: 8,
// //                     borderRadius: 4,
// //                     backgroundColor: currentSlide === idx ? 'white' : 'rgba(255,255,255,0.5)',
// //                   }}
// //                 />
// //               </Pressable>
// //             ))}
// //           </View>
// //         </View>
// //       </View>

// //       {/* --- Contact & Map Section --- */}
// //       <View className="bg-gray-50 py-16 px-5">
// //         <View className="gap-6">
// //           {/* Map */}
// //           <View className="rounded-2xl overflow-hidden shadow-xl" style={{ height: 300 }}>
// //             <MapView
// //               style={StyleSheet.absoluteFillObject}
// //               initialRegion={{
// //                 latitude: 28.6692,
// //                 longitude: 77.4538,
// //                 latitudeDelta: 0.5,
// //                 longitudeDelta: 0.5,
// //               }}
// //             >
// //               <Marker
// //                 coordinate={{
// //                   latitude: 28.6692,
// //                   longitude: 77.4538,
// //                 }}
// //                 title="Ghaziabad"
// //                 description="Uttar Pradesh, India"
// //               />
// //             </MapView>
// //           </View>

// //           {/* Contact Info */}
// //           <View className="bg-white p-6 rounded-2xl shadow-lg">
// //             <View className="flex-row flex-wrap">
// //               <View className="w-1/2 mb-4">
// //                 <Text className="text-xs font-bold text-gray-900 mb-1">ADDRESS</Text>
// //                 <Text className="text-sm text-gray-600">Ghaziabad, Uttar Pradesh</Text>
// //               </View>
// //               <View className="w-1/2 mb-4">
// //                 <Text className="text-xs font-bold text-gray-900 mb-1">EMAIL</Text>
// //                 <Text className="text-sm text-indigo-500">opp_ahead@gmail.com</Text>
// //               </View>
// //               <View className="w-1/2">
// //                 <Text className="text-xs font-bold text-gray-900 mb-1">PHONE</Text>
// //                 <Text className="text-sm text-gray-600">+91 9058135360</Text>
// //               </View>
// //             </View>
// //           </View>

// //           {/* Contact Form */}
// //           <View className="bg-white p-6 rounded-2xl shadow-lg">
// //             <Text className="text-2xl font-bold text-gray-900 mb-1">Feedback</Text>
// //             <Text className="text-gray-500 mb-5">We'd love to hear your thoughts.</Text>

// //             <View className="mb-4">
// //               <Text className="text-sm text-gray-600 font-medium mb-1">Name</Text>
// //               <TextInput
// //                 value={name}
// //                 onChangeText={setName}
// //                 placeholder="Your name"
// //                 placeholderTextColor="#9ca3af"
// //                 className="w-full bg-gray-50 rounded-lg border border-gray-300 px-4 py-3"
// //               />
// //             </View>

// //             <View className="mb-4">
// //               <Text className="text-sm text-gray-600 font-medium mb-1">Email</Text>
// //               <TextInput
// //                 value={email}
// //                 onChangeText={setEmail}
// //                 keyboardType="email-address"
// //                 autoCapitalize="none"
// //                 placeholder="your@email.com"
// //                 placeholderTextColor="#9ca3af"
// //                 className="w-full bg-gray-50 rounded-lg border border-gray-300 px-4 py-3"
// //               />
// //             </View>

// //             <View className="mb-4">
// //               <Text className="text-sm text-gray-600 font-medium mb-1">Message</Text>
// //               <TextInput
// //                 value={message}
// //                 onChangeText={setMessage}
// //                 multiline
// //                 numberOfLines={4}
// //                 placeholder="Your message..."
// //                 placeholderTextColor="#9ca3af"
// //                 textAlignVertical="top"
// //                 className="w-full bg-gray-50 rounded-lg border border-gray-300 px-4 py-3"
// //                 style={{ minHeight: 100 }}
// //               />
// //             </View>

// //             <Pressable 
// //               className="bg-indigo-600 py-3 px-6 rounded-lg"
// //               style={({ pressed }) => ({
// //                 backgroundColor: pressed ? '#4338ca' : '#4f46e5',
// //               })}
// //             >
// //               <Text className="text-white text-lg font-medium text-center">
// //                 Send Message
// //               </Text>
// //             </Pressable>
// //           </View>
// //         </View>
// //       </View>

// //       {/* Footer Spacing */}
// //       <View  >
// //         <Footer />
// //       </View>

// //     </ScrollView>
// //   );
// // };

// // export default Index;
// // const styles = StyleSheet.create({
// //   heroSection: {
// //     height: 350,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// // });


// // app/(tabs)/index.tsx
// import { 
//   View, 
//   Text, 
//   ScrollView, 
//   Image, 
//   Pressable, 
//   TextInput, 
//   StyleSheet, 
//   useWindowDimensions, 
//   ImageBackground,
//   NativeScrollEvent,
//   NativeSyntheticEvent,
// } from 'react-native';
// import React, { useEffect, useState, useRef } from 'react';
// import { Link, useRouter } from 'expo-router';
// import Svg, { Path } from 'react-native-svg';
// import MapView, { Marker } from 'react-native-maps';
// import { MaterialIcons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import Footer from '@/components/Footer';

// const Index = () => {
//   const { width } = useWindowDimensions();
//   const router = useRouter();
  
//   // Refs for scrolling
//   const scrollViewRef = useRef<ScrollView>(null);
//   const feedbackSectionY = useRef<number>(0);
  
//   // Form state
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   // Static images (no API calls - fixes 403 error)
//   const heroImages = [
//     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=720&h=600&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=720&h=600&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=720&h=600&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1518770660439-4636190af475?w=720&h=600&fit=crop&q=80",
//   ];

//   const [heroImageIndex, setHeroImageIndex] = useState(0);

//   // Slider state
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const sliderImages = [
//     "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1170&h=600&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1171&h=600&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=1171&h=600&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1170&h=600&fit=crop&q=80",
//     "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1170&h=600&fit=crop&q=80",
//   ];

//   // Rotate hero image every 30 seconds
//   useEffect(() => {
//     const imageInterval = setInterval(() => {
//       setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
//     }, 30000);
//     return () => clearInterval(imageInterval);
//   }, []);

//   // Auto-advance slider
//   useEffect(() => {
//     const sliderInterval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
//     }, 5000);
//     return () => clearInterval(sliderInterval);
//   }, []);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
//   };

//   // ============ NAVIGATION FUNCTIONS ============
  
//   // Function to scroll to feedback section
//   const scrollToFeedback = () => {
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollTo({
//         y: feedbackSectionY.current,
//         animated: true,
//       });
//     }
//   };

//   // Function to navigate to search/careers page
//   const navigateToSearch = () => {
//     // Option 1: Using expo-router (recommended)
//     router.push('/search'); // or '/JobSearch' depending on your route
    
//     // Option 2: If you're using a different route name
//     // router.push('/(tabs)/search');
//   };

//   return (
//     <ScrollView 
//       ref={scrollViewRef}
//       className="flex-1 bg-slate-50"
//     >
//       {/* --- Header --- */}
//       <View className="w-full bg-white shadow-sm">
//         <View className="flex-row py-4 px-4 items-center justify-between flex-wrap">
//           {/* Logo */}
//           <Pressable className="flex-row items-center mb-2">
//             <View className="h-10 w-10 items-center justify-center">
//               <Image
//                 source={require('../../assets/images/logo.png')}
//                 className="h-10 w-10 rounded-full"
//                 resizeMode="contain"
//               />
//             </View>
//             <Text className="text-sm font-bold text-indigo-600">
//               OPPORTUNITY RADAR
//             </Text>
//           </Pressable>

//           {/* Contact Button - UPDATED: Scrolls to Feedback */}
//           <Pressable 
//             className="flex-row items-center bg-gray-900 py-2 px-2 rounded-full mb-2"
//             style={({ pressed }) => ({
//               backgroundColor: pressed ? '#374151' : '#111827',
//             })}
//             onPress={scrollToFeedback}
//           >
//             <Text className="text-white text-sm font-semibold mr-1">Contact Us</Text>
//             <MaterialIcons name="arrow-forward" size={14} color="white" />
//           </Pressable>
//         </View>
//       </View>

//       {/* --- Main Hero Section --- */}
//       <View className="px-5 py-12">
//         <View className="items-center">
//           {/* Hero Image */}
//           <View className="w-full mb-10 rounded-lg overflow-hidden shadow-xl">
//             <Image
//               source={{ uri: heroImages[heroImageIndex] }}
//               style={{ width: '100%', height: 300 }}
//               resizeMode="cover"
//             />
//           </View>

//           {/* Hero Text */}
//           <View className="w-full items-center">
//             <Text className="text-4xl mb-6 font-extrabold text-gray-900 text-center">
//               Visualize Skills,{'\n'}
//               <Text className="text-indigo-600">Discover Careers</Text>
//             </Text>
            
//             <Text className="mb-8 text-lg text-gray-600 text-center px-4">
//               Unlock insights with precision.{' '}
//               <Text className="font-semibold text-gray-800">OPPORTUNITY RADAR:</Text>{' '}
//               Your smart radar to spot job trends and skill opportunities ahead.
//             </Text>

//             <View className="flex-row gap-2">
//               {/* Explore Careers Button - UPDATED: Navigates to Search */}
//               <Pressable 
//                 className="bg-indigo-600 py-3 px-4 rounded-full"
//                 style={({ pressed }) => ({
//                   backgroundColor: pressed ? '#4338ca' : '#4f46e5',
//                 })}
//                 onPress={navigateToSearch}
//               >
//                 <Text className="text-white text-lg font-semibold">Explore Careers</Text>
//               </Pressable>

//               <Pressable 
//                 className="bg-white border border-gray-200 py-3 px-4 rounded-full"
//                 style={({ pressed }) => ({
//                   backgroundColor: pressed ? '#f9fafb' : '#ffffff',
//                 })}
//               >
//                 <Text className="text-gray-700 text-lg font-semibold">Watch Demo</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* --- Mission Section --- */}
//       <View className="bg-gray-900 py-16 px-5">
//         <View className="bg-gray-800 p-8 rounded-xl border-l-4 border-indigo-500">
//           <Text className="text-3xl mb-6 font-bold text-indigo-400">
//             Enhance Job Prospects with Visualization
//           </Text>
//           <Text className="text-lg mb-6 text-gray-300">
//             Discover your career potential with Opportunity Radar's innovative skills 
//             visualization platform. We empower job seekers by transforming skills into 
//             visual opportunities, streamlining the job search process.
//           </Text>
//           <Pressable className="flex-row items-center">
//             <Text className="text-indigo-400 font-semibold mr-2">Learn More</Text>
//             <MaterialIcons name="arrow-forward" size={16} color="#818cf8" />
//           </Pressable>
//         </View>
//       </View>

//       {/* --- Features Grid --- */}
//       <View className="px-5 py-16">
//         <View className="mb-12">
//           <Text className="text-xs text-indigo-500 font-medium mb-1 text-center">
//             FEATURES
//           </Text>
//           <Text className="text-2xl font-bold text-gray-900 text-center">
//             Everything you need to succeed
//           </Text>
//         </View>

//         <View className="gap-4">
//           {[
//             {
//               title: "About",
//               desc: "Your guide to jobs, skills, and the future of work.",
//               icon: "info",
//               route: "/about",
//             },
//             {
//               title: "Dashboards",
//               desc: "Data-driven dashboards to uncover trends.",
//               icon: "dashboard",
//               route: "/dashboard",
//             },
//             {
//               title: "Opportunities",
//               desc: "Latest job openings tailored to your skills.",
//               icon: "work",
//               route: "/search",
//             },
//             {
//               title: "Add Listing",
//               desc: "Introduce new opportunities to the network.",
//               icon: "add-circle",
//               route: "/add-listing",
//             },
//           ].map((item, index) => (
//             <Pressable 
//               key={index}
//               className="bg-white p-6 rounded-xl border border-gray-100"
//               style={({ pressed }) => ({
//                 transform: [{ scale: pressed ? 0.98 : 1 }],
//               })}
//               onPress={() => router.push(item.route as any)}
//             >
//               <View className="flex-row items-start">
//                 <View className="w-12 h-12 items-center justify-center rounded-full bg-indigo-100 mr-4">
//                   <MaterialIcons name={item.icon as any} size={24} color="#4f46e5" />
//                 </View>
//                 <View className="flex-1">
//                   <Text className="text-xl text-gray-900 font-bold mb-2">
//                     {item.title}
//                   </Text>
//                   <Text className="text-base text-gray-500 mb-3">
//                     {item.desc}
//                   </Text>
//                   <View className="flex-row items-center">
//                     <Text className="text-indigo-500 font-semibold mr-2">Explore</Text>
//                     <MaterialIcons name="arrow-forward" size={16} color="#6366f1" />
//                   </View>
//                 </View>
//               </View>
//             </Pressable>
//           ))}
//         </View>
//       </View>

//       {/* --- CTA Section / Skills Shaping Tomorrow Section --- */}
//       <ImageBackground
//         source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop&q=80' }}
//         style={styles.heroSection}
//         resizeMode="cover"
//       >
//         {/* Overlay */}
//         <LinearGradient
//           colors={['rgba(0,0,0,0.6)', 'rgba(79,70,229,0.4)']}
//           style={StyleSheet.absoluteFillObject}
//         />
        
//         <View className="items-center px-6">
//           <Text className="text-4xl md:text-6xl font-extrabold text-white text-center mb-4">
//             Skills Shaping Tomorrow
//           </Text>
          
//           <View className="h-1 w-24 bg-indigo-500 rounded-full mb-8" />
          
//           <View className="flex-row gap-4 flex-wrap justify-center items-center">
//             {/* Get Started - Navigates to Search */}
//             <Pressable 
//               className="bg-indigo-600 py-2 px-5 rounded-full"
//               style={({ pressed }) => ({
//                 backgroundColor: pressed ? '#4338ca' : '#4f46e5',
//                 transform: [{ translateY: pressed ? 2 : 0 }],
//               })}
//               onPress={navigateToSearch}
//             >
//               <Text className="text-white font-bold text-lg">Get Started</Text>
//             </Pressable>
            
//             <Pressable 
//               className="border-2 border-white py-1 px-5 rounded-full"
//               style={({ pressed }) => ({
//                 backgroundColor: pressed ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
//               })}
//             >
//               <Text className="text-white font-bold text-lg">Sign In</Text>
//             </Pressable>
//           </View>
//         </View>
//       </ImageBackground>

//       {/* --- Detailed Features --- */}
//       <View className="px-5 py-16">
//         <View className="gap-6">
//           {[
//             {
//               title: "AI-Powered Job Recommendations",
//               desc: "Leverage advanced AI to discover opportunities that perfectly align with your skills.",
//               img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=300&fit=crop&q=80",
//             },
//             {
//               title: "Skill Gap Analysis",
//               desc: "Identify the skills you need for your dream job and bridge the gap.",
//               img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=300&fit=crop&q=80",
//             },
//             {
//               title: "Industry Trends",
//               desc: "Stay one step ahead with real-time insights into emerging industries.",
//               img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop&q=80",
//             },
//           ].map((item, index) => (
//             <View
//               key={index}
//               className="rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100"
//             >
//               <Image
//                 source={{ uri: item.img }}
//                 style={{ width: '100%', height: 200 }}
//                 resizeMode="cover"
//               />
//               <View className="p-6">
//                 <Text className="text-xl font-bold text-gray-900 mb-2">
//                   {item.title}
//                 </Text>
//                 <Text className="text-base text-gray-600 mb-4">
//                   {item.desc}
//                 </Text>
//                 <Pressable 
//                   className="flex-row items-center"
//                 >
//                   <Text className="text-indigo-600 font-semibold mr-2">Read Details</Text>
//                   <MaterialIcons name="arrow-forward" size={16} color="#4f46e5" />
//                 </Pressable>
//               </View>
//             </View>
//           ))}
//         </View>
//       </View>

//       {/* --- Image Slider --- */}
//       <View className="py-10 px-5">
//         <View className="mb-8">
//           <Text className="text-5xl font-extrabold text-gray-900 mb-2 text-center">
//             Visualizing Future Work
//           </Text>
//           <Text className="text-gray-500 text-center">
//             Swipe through the technologies defining the next decade.
//           </Text>
//         </View>

//         <View className="relative rounded-xl overflow-hidden" style={{ height: 300 }}>
//           <Image
//             source={{ uri: sliderImages[currentSlide] }}
//             style={StyleSheet.absoluteFillObject}
//             resizeMode="cover"
//           />

//           {/* Navigation Arrows */}
//           <Pressable
//             onPress={prevSlide}
//             className="absolute left-3 bg-white/30 p-1 rounded-full"
//             style={{ top: '50%', transform: [{ translateY: -20 }] }}
//           >
//             <MaterialIcons name="chevron-left" size={28} color="white" />
//           </Pressable>

//           <Pressable
//             onPress={nextSlide}
//             className="absolute right-3 bg-white/30 p-1 rounded-full"
//             style={{ top: '50%', transform: [{ translateY: -20 }] }}
//           >
//             <MaterialIcons name="chevron-right" size={28} color="white" />
//           </Pressable>

//           {/* Dots */}
//           <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
//             {sliderImages.map((_, idx) => (
//               <Pressable key={idx} onPress={() => setCurrentSlide(idx)}>
//                 <View
//                   style={{
//                     width: currentSlide === idx ? 24 : 8,
//                     height: 8,
//                     borderRadius: 4,
//                     backgroundColor: currentSlide === idx ? 'white' : 'rgba(255,255,255,0.5)',
//                   }}
//                 />
//               </Pressable>
//             ))}
//           </View>
//         </View>
//       </View>

//       {/* --- Contact & Map Section --- */}
//       <View className="bg-gray-50 py-16 px-5">
//         <View className="gap-6">
//           {/* Map */}
//           <View className="rounded-2xl overflow-hidden shadow-xl" style={{ height: 300 }}>
//             <MapView
//               style={StyleSheet.absoluteFillObject}
//               initialRegion={{
//                 latitude: 28.6692,
//                 longitude: 77.4538,
//                 latitudeDelta: 0.5,
//                 longitudeDelta: 0.5,
//               }}
//             >
//               <Marker
//                 coordinate={{
//                   latitude: 28.6692,
//                   longitude: 77.4538,
//                 }}
//                 title="Ghaziabad"
//                 description="Uttar Pradesh, India"
//               />
//             </MapView>
//           </View>

//           {/* Contact Info */}
//           <View className="bg-white p-6 rounded-2xl shadow-lg">
//             <View className="flex-row flex-wrap">
//               <View className="w-1/2 mb-4">
//                 <Text className="text-xs font-bold text-gray-900 mb-1">ADDRESS</Text>
//                 <Text className="text-sm text-gray-600">Ghaziabad, Uttar Pradesh</Text>
//               </View>
//               <View className="w-1/2 mb-4">
//                 <Text className="text-xs font-bold text-gray-900 mb-1">EMAIL</Text>
//                 <Text className="text-sm text-indigo-500">opp_ahead@gmail.com</Text>
//               </View>
//               <View className="w-1/2">
//                 <Text className="text-xs font-bold text-gray-900 mb-1">PHONE</Text>
//                 <Text className="text-sm text-gray-600">+91 9058135360</Text>
//               </View>
//             </View>
//           </View>

//           {/* Feedback Form Section - This is where Contact Us scrolls to */}
//           <View 
//             className="bg-white p-6 rounded-2xl shadow-lg"
//             onLayout={(event) => {
//               // Calculate the Y position of this section for scrolling
//               event.target.measure((x, y, width, height, pageX, pageY) => {
//                 feedbackSectionY.current = pageY - 100; // Offset for better visibility
//               });
//             }}
//           >
//             <View className="flex-row items-center mb-4">
              
//               <View>
//                 <Text className="text-2xl font-bold text-gray-900">Feedback</Text>
//                 <Text className="text-gray-500">We'd love to hear your thoughts.</Text>
//               </View>
//             </View>

//             <View className="mb-4">
//               <Text className="text-sm text-gray-600 font-medium mb-1">Name</Text>
//               <TextInput
//                 value={name}
//                 onChangeText={setName}
//                 placeholder="Your name"
//                 placeholderTextColor="#9ca3af"
//                 className="w-full bg-gray-50 rounded-lg border border-gray-300 px-4 py-3"
//               />
//             </View>

//             <View className="mb-4">
//               <Text className="text-sm text-gray-600 font-medium mb-1">Email</Text>
//               <TextInput
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 placeholder="your@email.com"
//                 placeholderTextColor="#9ca3af"
//                 className="w-full bg-gray-50 rounded-lg border border-gray-300 px-4 py-3"
//               />
//             </View>

//             <View className="mb-4">
//               <Text className="text-sm text-gray-600 font-medium mb-1">Message</Text>
//               <TextInput
//                 value={message}
//                 onChangeText={setMessage}
//                 multiline
//                 numberOfLines={4}
//                 placeholder="Your message..."
//                 placeholderTextColor="#9ca3af"
//                 textAlignVertical="top"
//                 className="w-full bg-gray-50 rounded-lg border border-gray-300 px-4 py-3"
//                 style={{ minHeight: 100 }}
//               />
//             </View>

//             <Pressable 
//               className="bg-indigo-600 py-3 px-6 rounded-lg flex-row items-center justify-center"
//               style={({ pressed }) => ({
//                 backgroundColor: pressed ? '#4338ca' : '#4f46e5',
//               })}
//               onPress={() => {
//                 // Handle form submission
//                 console.log('Sending feedback:', { name, email, message });
//                 // You can add your API call here
//                 alert('Thank you for your feedback!');
//                 setName('');
//                 setEmail('');
//                 setMessage('');
//               }}
//             >
//               <Text className="text-white text-lg font-medium text-center ml-2">
//                 Send Message
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       </View>

//       {/* Footer Spacing */}
//       <View>
//         <Footer />
//       </View>

//     </ScrollView>
//   );
// };

// export default Index;

// const styles = StyleSheet.create({
//   heroSection: {
//     height: 350,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  Pressable, 
  TextInput, 
  StyleSheet, 
  useWindowDimensions, 
  ImageBackground,
  Alert,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@clerk/clerk-expo';
import Footer from '@/components/Footer';

const Index = () => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  
  // Clerk Auth
  const { isSignedIn, signOut } = useAuth();
  
  // Refs for scrolling
  const scrollViewRef = useRef<ScrollView>(null);
  const feedbackSectionY = useRef<number>(0);
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Static images
  const heroImages = [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=720&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=720&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=720&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=720&h=600&fit=crop&q=80",
  ];

  const [heroImageIndex, setHeroImageIndex] = useState(0);

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderImages = [
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1170&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1171&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=1171&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1170&h=600&fit=crop&q=80",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1170&h=600&fit=crop&q=80",
  ];

  // Rotate hero image every 30 seconds
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 30000);
    return () => clearInterval(imageInterval);
  }, []);

  // Auto-advance slider
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(sliderInterval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1));
  };

  // Scroll to feedback section
  const scrollToFeedback = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: feedbackSectionY.current,
        animated: true,
      });
    }
  };

  // Navigate to search
  const navigateToSearch = () => {
    router.push('/search');
  };

  

  return (
    <ScrollView 
      ref={scrollViewRef}
      className="flex-1 bg-slate-50"
    >
      {/* --- Header --- */}
      <View className="w-full bg-white shadow-sm">
        <View className="flex-row py-4 px-4 items-center justify-between flex-wrap">
          {/* Logo */}
          <Pressable className="flex-row items-center mb-2">
            <View className="h-10 w-10 items-center justify-center">
              <Image
                source={require('../../assets/images/logo.png')}
                className="h-10 w-10 rounded-full"
                resizeMode="contain"
              />
            </View>
            <Text className="text-sm font-bold text-indigo-600">
              OPPORTUNITY RADAR
            </Text>
          </Pressable>

          {/* Right Side Buttons */}
          <View className="flex-row items-center gap-2 mb-2">
            {/* Contact Button */}
            <Pressable 
              className="flex-row items-center bg-gray-900 py-2 px-3 rounded-full"
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#374151' : '#111827',
              })}
              onPress={scrollToFeedback}
            >
              <Text className="text-white text-sm font-semibold mr-1">Contact Us</Text>
              <MaterialIcons name="arrow-forward" size={14} color="white" />
            </Pressable>

          </View>
        </View>
      </View>

      {/* --- Main Hero Section --- */}
      <View className="px-5 py-12">
        <View className="items-center">
          {/* Hero Image */}
          <View className="w-full mb-10 rounded-lg overflow-hidden shadow-xl">
            <Image
              source={{ uri: heroImages[heroImageIndex] }}
              style={{ width: '100%', height: 300 }}
              resizeMode="cover"
            />
          </View>

          {/* Hero Text */}
          <View className="w-full items-center">
            <Text className="text-4xl mb-6 font-extrabold text-gray-900 text-center">
              Visualize Skills,{'\n'}
              <Text className="text-indigo-600">Discover Careers</Text>
            </Text>
            
            <Text className="mb-8 text-lg text-gray-600 text-center px-4">
              Unlock insights with precision.{' '}
              <Text className="font-semibold text-gray-800">OPPORTUNITY RADAR:</Text>{' '}
              Your smart radar to spot job trends and skill opportunities ahead.
            </Text>

            <View className="flex-row gap-2">
              {/* Explore Careers Button */}
              <Pressable 
                className="bg-indigo-600 py-3 px-4 rounded-full"
                style={({ pressed }) => ({
                  backgroundColor: pressed ? '#4338ca' : '#4f46e5',
                })}
                onPress={navigateToSearch}
              >
                <Text className="text-white text-lg font-semibold">Explore Careers</Text>
              </Pressable>

              <Pressable 
                className="bg-white border border-gray-200 py-3 px-4 rounded-full"
                style={({ pressed }) => ({
                  backgroundColor: pressed ? '#f9fafb' : '#ffffff',
                })}
              >
                <Text className="text-gray-700 text-lg font-semibold">Watch Demo</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      {/* --- Mission Section --- */}
      <View className="bg-gray-900 py-16 px-5">
        <View className="bg-gray-800 p-8 rounded-xl border-l-4 border-indigo-500">
          <Text className="text-3xl mb-6 font-bold text-indigo-400">
            Enhance Job Prospects with Visualization
          </Text>
          <Text className="text-lg mb-6 text-gray-300">
            Discover your career potential with Opportunity Radar's innovative skills 
            visualization platform. We empower job seekers by transforming skills into 
            visual opportunities, streamlining the job search process.
          </Text>
          <Pressable className="flex-row items-center">
            <Text className="text-indigo-400 font-semibold mr-2">Learn More</Text>
            <MaterialIcons name="arrow-forward" size={16} color="#818cf8" />
          </Pressable>
        </View>
      </View>

      {/* --- Features Grid --- */}
      <View className="px-5 py-16">
        <View className="mb-12">
          <Text className="text-xs text-indigo-500 font-medium mb-1 text-center">
            FEATURES
          </Text>
          <Text className="text-2xl font-bold text-gray-900 text-center">
            Everything you need to succeed
          </Text>
        </View>

        <View className="gap-4">
          {[
            {
              title: "About",
              desc: "Your guide to jobs, skills, and the future of work.",
              icon: "info",
              route: "/about",
            },
            {
              title: "Dashboards",
              desc: "Data-driven dashboards to uncover trends.",
              icon: "dashboard",
              route: "/dashboard",
            },
            {
              title: "Opportunities",
              desc: "Latest job openings tailored to your skills.",
              icon: "work",
              route: "/search",
            },
            {
              title: "Add Listing",
              desc: "Introduce new opportunities to the network.",
              icon: "add-circle",
              route: "/add-listing",
            },
          ].map((item, index) => (
            <Pressable 
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-100"
              style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
              onPress={() => router.push(item.route as any)}
            >
              <View className="flex-row items-start">
                <View className="w-12 h-12 items-center justify-center rounded-full bg-indigo-100 mr-4">
                  <MaterialIcons name={item.icon as any} size={24} color="#4f46e5" />
                </View>
                <View className="flex-1">
                  <Text className="text-xl text-gray-900 font-bold mb-2">
                    {item.title}
                  </Text>
                  <Text className="text-base text-gray-500 mb-3">
                    {item.desc}
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="text-indigo-500 font-semibold mr-2">Explore</Text>
                    <MaterialIcons name="arrow-forward" size={16} color="#6366f1" />
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </View>

      {/* --- CTA Section / Skills Shaping Tomorrow Section --- */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop&q=80' }}
        style={styles.heroSection}
        resizeMode="cover"
      >
        {/* Overlay */}
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'rgba(79,70,229,0.4)']}
          style={StyleSheet.absoluteFillObject}
        />
        
        <View className="items-center px-6">
          <Text className="text-4xl md:text-6xl font-extrabold text-white text-center mb-4">
            Skills Shaping Tomorrow
          </Text>
          
          <View className="h-1 w-24 bg-indigo-500 rounded-full mb-8" />
          
          <View className="flex-row gap-4 flex-wrap justify-center items-center">
            {/* Get Started */}
            <Pressable 
              className="bg-indigo-600 py-2 px-5 rounded-full"
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#4338ca' : '#4f46e5',
                transform: [{ translateY: pressed ? 2 : 0 }],
              })}
              onPress={navigateToSearch}
            >
              <Text className="text-white font-bold text-lg">Get Started</Text>
            </Pressable>
            
           {/* In your Index.tsx, update the Mock Interview button */}
<Pressable 
  className="border-2 bg-gray-400 border-white py-2 px-5 rounded-full flex-row items-center"
  style={({ pressed }) => ({
    backgroundColor: pressed ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'
  })}
  onPress={() => router.push('/mock-interview')}  // Add this line
>
  <Text className="text-white font-extrabold text-sm">Mock Interview</Text>
  <MaterialIcons name="arrow-forward" size={14} color="white" />
</Pressable>
          </View>
        </View>
      </ImageBackground>

      {/* --- Detailed Features --- */}
      <View className="px-5 py-16">
        <View className="gap-6">
          {[
            {
              title: "AI-Powered Job Recommendations",
              desc: "Leverage advanced AI to discover opportunities that perfectly align with your skills.",
              img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=300&fit=crop&q=80",
            },
            {
              title: "Skill Gap Analysis",
              desc: "Identify the skills you need for your dream job and bridge the gap.",
              img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=300&fit=crop&q=80",
            },
            {

              title: "Industry Trends",
              desc: "Stay one step ahead with real-time insights into emerging industries.",
              img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop&q=80",
            },
          ].map((item, index) => (
            <View
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100"
            >
              <Image
                source={{ uri: item.img }}
                style={{ width: '100%', height: 200 }}
                resizeMode="cover"
              />
              <View className="p-6">
                <Text className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </Text>
                <Text className="text-base text-gray-600 mb-4">
                  {item.desc}
                </Text>
                <Pressable className="flex-row items-center">
                  <Text className="text-indigo-600 font-semibold mr-2">Read Details</Text>
                  <MaterialIcons name="arrow-forward" size={16} color="#4f46e5" />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* --- Image Slider --- */}
      <View className="py-10 px-5">
        <View className="mb-8">
          <Text className="text-5xl font-extrabold text-gray-900 mb-2 text-center">
            Visualizing Future Work
          </Text>
          <Text className="text-gray-500 text-center">
            Swipe through the technologies defining the next decade.
          </Text>
        </View>

        <View className="relative rounded-xl overflow-hidden" style={{ height: 300 }}>
          <Image
            source={{ uri: sliderImages[currentSlide] }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />

          {/* Navigation Arrows */}
          <Pressable
            onPress={prevSlide}
            className="absolute left-3 bg-white/30 p-1 rounded-full"
            style={{ top: '50%', transform: [{ translateY: -20 }] }}
          >
            <MaterialIcons name="chevron-left" size={28} color="white" />
          </Pressable>

          <Pressable
            onPress={nextSlide}
            className="absolute right-3 bg-white/30 p-1 rounded-full"
            style={{ top: '50%', transform: [{ translateY: -20 }] }}
          >
            <MaterialIcons name="chevron-right" size={28} color="white" />
          </Pressable>

          {/* Dots */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
            {sliderImages.map((_, idx) => (
              <Pressable key={idx} onPress={() => setCurrentSlide(idx)}>
                <View
                  style={{
                    width: currentSlide === idx ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: currentSlide === idx ? 'white' : 'rgba(255,255,255,0.5)',
                  }}
                />
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      {/* --- Contact & Map Section --- */}
      <View className="bg-gray-50 py-16 px-5">
        <View className="gap-6">
          {/* Map */}
          <View className="rounded-2xl overflow-hidden shadow-xl" style={{ height: 300 }}>
            <MapView
              style={StyleSheet.absoluteFillObject}
              initialRegion={{
                latitude: 28.6692,
                longitude: 77.4538,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              }}
            >
              <Marker
                coordinate={{
                  latitude: 28.6692,
                  longitude: 77.4538,
                }}
                title="Ghaziabad"
                description="Uttar Pradesh, India"
              />
            </MapView>
          </View>

          {/* Contact Info */}
          <View className="bg-white p-6 rounded-2xl shadow-lg">
            <View className="flex-row flex-wrap">
              <View className="w-1/2 mb-4">
                <Text className="text-xs font-bold text-gray-900 mb-1">ADDRESS</Text>
                <Text className="text-sm text-gray-600">Ghaziabad, Uttar Pradesh</Text>
              </View>
              <View className="w-1/2 mb-4">
                <Text className="text-xs font-bold text-gray-900 mb-1">EMAIL</Text>
                <Text className="text-sm text-indigo-500">opp_ahead@gmail.com</Text>
              </View>
              <View className="w-1/2">
                <Text className="text-xs font-bold text-gray-900 mb-1">PHONE</Text>
                <Text className="text-sm text-gray-600">+91 9058135360</Text>
              </View>
            </View>
          </View>

          {/* Feedback Form Section */}
          <View 
            className="bg-white p-6 rounded-2xl shadow-lg"
            onLayout={(event) => {
              event.target.measure((x, y, width, height, pageX, pageY) => {
                feedbackSectionY.current = pageY - 100;
              });
            }}
          >
            <View className="flex-row items-center mb-4">
              <View>
                <Text className="text-2xl font-bold text-gray-900">Feedback</Text>
                <Text className="text-gray-500">We'd love to hear your thoughts.</Text>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm text-gray-600 font-medium mb-1">Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor="#9ca3af"
                className="w-full bg-gray-50 rounded-lg border border-gray-300 px-4 py-3"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm text-gray-600 font-medium mb-1">Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="your@email.com"
                placeholderTextColor="#9ca3af"
                className="w-full bg-gray-50 rounded-lg border border-gray-300 px-4 py-3"
              />
            </View>

            <View className="mb-4">
              <Text className="text-sm text-gray-600 font-medium mb-1">Message</Text>
              <TextInput
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                placeholder="Your message..."
                placeholderTextColor="#9ca3af"
                textAlignVertical="top"
                className="w-full bg-gray-50 rounded-lg border border-gray-300 px-4 py-3"
                style={{ minHeight: 100 }}
              />
            </View>

            <Pressable 
              className="bg-indigo-600 py-3 px-6 rounded-lg flex-row items-center justify-center"
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#4338ca' : '#4f46e5',
              })}
              onPress={() => {
                console.log('Sending feedback:', { name, email, message });
                Alert.alert('Success', 'Thank you for your feedback!');
                setName('');
                setEmail('');
                setMessage('');
              }}
            >
              <Text className="text-white text-lg font-medium text-center ml-2">
                Send Message
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View>
        <Footer />
      </View>

    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  heroSection: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
});