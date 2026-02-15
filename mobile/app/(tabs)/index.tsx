// import { View, Text, ScrollView, Image, Pressable, TextInput, StyleSheet } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { Link } from 'expo-router';
// import Animated, { FadeIn, FadeInLeft, FadeInRight } from 'react-native-reanimated';
// import Svg, { Path, Circle, Rect} from 'react-native-svg';
// import MapView, { Marker } from 'react-native-maps'; // Install: npx expo install react-native-maps

// const index = () => {
//    const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//    const [randomImage, setRandomImage] = useState(
//     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop",
//   );

//   // --- State for Slider ---
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const sliderImages = [
//     "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1170&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1171&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1171&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1170&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1170&auto=format&fit=crop",
//   ];

//   // --- Initialize Effects ---
//   useEffect(() => {
//     const fetchImage = () => {
//       const accessKey = "Su8JPTeS18piEXHB8tPVdYlL1nlfrh5NO2MbYOYY06U";
//       const url = `https://api.unsplash.com/photos/random?query=technology,future,ai&client_id=${accessKey}`;

//       fetch(url)
//         .then((res) => {
//           if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//           return res.json();
//         })
//         .then((data) => {
//           setRandomImage(`${data.urls.raw}&w=720&h=600&fit=crop&q=80`);
//         })
//         .catch((err) => {
//           console.error("Image load error:", err);
//         });
//     };

//     fetchImage();
//     const imageInterval = setInterval(fetchImage, 30000);

//     return () => clearInterval(imageInterval);
//   }, []);

//   // --- Slider Logic ---
//   useEffect(() => {
//     const sliderInterval = setInterval(() => {
//       setCurrentSlide((prev) =>
//         prev === sliderImages.length - 1 ? 0 : prev + 1,
//       );
//     }, 5000);
//     return () => clearInterval(sliderInterval);
//   }, [sliderImages.length]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) =>
//       prev === sliderImages.length - 1 ? 0 : prev + 1,
//     );
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) =>
//       prev === 0 ? sliderImages.length - 1 : prev - 1,
//     );
//   };
//   return (
//   <ScrollView className="bg-slate-50 font-sans text-slate-600 overflow-x-hidden selection:bg-indigo-500 selection:text-white">
//       {/* --- Decorative Background Blobs --- */}
//       <View className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
//         <View className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></View>
//         <View className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></View>
//         <View className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></View>
//       </View>

//       {/* --- Header (Glassmorphism) --- */}
//       <View className="fixed top-0 w-full z-50 glass transition-all duration-300">
//         <View className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
//           {/* Logo + Title */}
//           <Link
//             href="/"
//             className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 group"
//           >
//             <View className="relative h-10 w-10 flex items-center justify-center">
//               <View className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full animate-spin-slow blur-sm opacity-70 group-hover:opacity-100 transition"></View>

//               <Image
//                 source={require('../assets/images/logo.png')}
//                 className="relative h-10 w-10 rounded-full object-contain bg-white border-2 border-indigo-100 z-10"
//               />
//             </View>

//             <Text className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
//               OPPORTUNITY RADAR
//             </Text>
//           </Link>

//           {/* Navigation */}
//           <View className="ml-auto flex items-center space-x-8 mb-4 md:mb-0 font-medium">
//             <Link
//               href="/"
//               className="hover:text-indigo-600 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all hover:after:w-full cursor-pointer"
//             >
//               Dashboard
//             </Link>

//             <Link
//               href="/"
//               className="hover:text-indigo-600 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all hover:after:w-full cursor-pointer"
//             >
//               Job/Opportunities
//             </Link>
//           </View>

//           {/* Contact Pressable */}
//           <Pressable className="ml-auto inline-flex items-center bg-gray-900 text-white border-0 py-2 px-5 focus:outline-none hover:bg-gray-700 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 cursor-pointer">
//            <Text> Contact Us</Text>
//             <Svg
//               fill="none"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               className="w-4 h-4 ml-1"
//               viewBox="0 0 24 24"
//             >
//               <Path d="M5 12h14M12 5l7 7-7 7"></Path>
//             </Svg>
//           </Pressable>
//         </View>
//       </View>

//       {/* --- Main Hero Section --- */}
//       <View className="text-gray-600 body-font pt-24">
//         <View className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
//           <View
//             className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 relative"
//             data-aos="fade-right"
//             data-aos-duration="1000"
//           >
//             {/* Image Decoration */}
//             <View className="absolute -inset-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-30 animate-pulse"></View>
//             <Image
//               className="relative object-cover object-center rounded-lg shadow-2xl w-full h-auto z-10 border border-white/50"
//               source={{ uri: randomImage }}
//             />
//           </View>
//           <View
//             className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center relative z-10"
//             data-aos="fade-left"
//             data-aos-duration="1000"
//           >
//             <Text className="title-font sm:text-6xl text-5xl mb-6 font-extrabold text-gray-900 animate-fadeInDown tracking-tight">
//               Visualize Skills, 
//               <Text className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
//                 Discover Careers
//               </Text>
//             </Text>
//             <Text
//               className="mb-8 leading-relaxed text-lg text-gray-600 animate-fadeInDown"
//               style={{ animationDelay: "0.2s" }}
//             >
//               Unlock insights with precision. 
//               <Text className="font-semibold text-gray-800">
//                 OPPORTUNITY RADAR:
//               </Text>{" "}
//               Your smart radar to spot job trends and skill opportunities ahead.
//             </Text>
//             <View
//               className="flex justify-center animate-fadeInDown"
//               style={{ animationDelay: "0.4s" }}
//             >
//               <Pressable className="inline-flex text-white bg-gradient-to-r from-indigo-600 to-purple-600 border-0 py-3 px-8 focus:outline-none hover:from-indigo-700 hover:to-purple-700 rounded-full text-lg shadow-xl shadow-indigo-500/40 transform transition hover:-translate-y-1 hover:scale-105 cursor-pointer">
//               <Text>  Explore Careers</Text>
//               </Pressable>
//               <Pressable className="ml-4 inline-flex text-gray-700 bg-white border border-gray-200 py-3 px-8 focus:outline-none hover:bg-gray-50 rounded-full text-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer">
//                <Text> Watch Demo</Text>
//               </Pressable>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* --- Intro / Mission --- */}
//       <View className="bg-gray-900 text-white body-font relative overflow-hidden">
//         {/* Abstract Background pattern */}
//         <View
//           className="absolute inset-0 opacity-10"
//           style={{
//             backgroundImage: "radial-gradient(#4f46e5 1px, transparent 1px)",
//             backgroundSize: "30px 30px",
//           }}
//         ></View>

//         <View className="container px-5 py-24 mx-auto flex flex-col relative z-10">
//           <View className="lg:w-4/5 mx-auto" data-aos="fade-up">
//             <View className="sm:pl-8 sm:py-8 sm:border-l-4 border-indigo-500 text-left bg-gray-800/50 p-8 rounded-r-xl backdrop-blur-sm">
//               <Text className="leading-relaxed text-4xl mb-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
//                 Enhance Job Prospects with Visualization
//               </Text>
//               <Text className="leading-relaxed text-xl mb-6 text-gray-300 font-light">
//                 Discover your career potential with Opportunity Radar's
//                 innovative skills visualization platform. We empower job seekers
//                 by transforming skills into visual opportunities, streamlining
//                 the job search process.
//               </Text>
//               <Link
//                 href="/"
//                 className="text-indigo-400 inline-flex items-center hover:text-white transition-colors duration-300 group font-semibold cursor-pointer"
//               >
//                 Learn More
//                 <Svg
//                   fill="none"
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
//                   viewBox="0 0 24 24"
//                 >
//                   <Path d="M5 12h14M12 5l7 7-7 7"></Path>
//                 </Svg>
//               </Link>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* --- Features Grid (Hover Cards) --- */}
//       <View className="text-gray-600 body-font">
//         <View className="container px-5 py-24 mx-auto">
//           <View className="flex flex-col text-center w-full mb-12">
//             <Text className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
//               FEATURES
//             </Text>
//             <Text className="sm:text-3xl text-2xl font-bold title-font text-gray-900">
//               Everything you need to succeed
//             </Text>
//           </View>
//           <View className="flex flex-wrap -m-4">
//             {[
//               {
//                 title: "About",
//                 desc: "Your guide to jobs, skills, and the future of work.",
//                 delay: 100,
//                 icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
//               },
//               {
//                 title: "Dashboards",
//                 desc: "Data-driven dashboards to uncover trends.",
//                 delay: 200,
//                 icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
//               },
//               {
//                 title: "Opportunities",
//                 desc: "Latest job openings tailored to your skills.",
//                 delay: 300,
//                 icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
//               },
//               {
//                 title: "Add Listing",
//                 desc: "Introduce new opportunities to the network.",
//                 delay: 400,
//                 icon: "M12 4v16m8-8H4",
//               },
//             ].map((item, index) => (
//               <View
//                 key={index}
//                 className="p-4 xl:w-1/4 lg:w-1/2 md:w-full"
//                 data-aos="fade-up"
//                 data-aos-delay={item.delay}
//               >
//                 <View className="h-full p-8 rounded-xl bg-white border border-gray-100 flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-2 group">
//                   <View className="absolute top-0 right-0 -mr-3 -mt-3 w-20 h-20 rounded-full bg-indigo-50 opacity-50 group-hover:scale-150 transition-transform duration-500"></View>

//                   <View className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
//                     <Svg
//                       fill="none"
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       className="w-6 h-6"
//                       viewBox="0 0 24 24"
//                     >
//                       <Path d={item.icon}></Path>
//                     </Svg>
//                   </View>

//                   <Text className="text-xl text-gray-900 font-bold title-font mb-2">
//                     {item.title}
//                   </Text>
//                   <Text className="leading-relaxed text-base mb-4 text-gray-500 flex-grow">
//                     {item.desc}
//                   </Text>
//                   <Link
//                     href="/"
//                     className="text-indigo-500 inline-flex items-center font-semibold group-hover:text-indigo-600 cursor-pointer"
//                   >
//                     Explore
//                     <Svg
//                       fill="none"
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2"
//                       viewBox="0 0 24 24"
//                     >
//                       <Path d="M5 12h14M12 5l7 7-7 7"></Path>
//                     </Svg>
//                   </Link>
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>
//       </View>

//       {/* --- Middle Hero / CTA (Parallax) --- */}
//       <View className="hero-bg relative h-[60vh] flex items-center justify-center text-center text-white bg-fixed">
//         <View className="hero-overlay absolute inset-0 z-10 backdrop-blur-[2px]"></View>
//         <View
//           className="relative z-20"
//           data-aos="zoom-in"
//           data-aos-duration="800"
//         >
//           <Text className="text-4xl font-extrabold md:text-6xl px-4 tracking-tight drop-shadow-lg">
//             Skills Shaping Tomorrow
//           </Text>
//           <View className="h-1 w-24 bg-indigo-500 mx-auto my-6 rounded-full"></View>
//           <View className="flex md:mt-6 mt-8 justify-center gap-4">
//             <Link
//               href="/"
//               className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg transition-all shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(79,70,229,0.7)] hover:-translate-y-1 cursor-pointer"
//             >
//               Get Started
//             </Link>
//             <Link
//               className="px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 text-white font-bold text-lg transition-all hover:-translate-y-1 cursor-pointer"
//               href="/"
//             >
//               Sign In
//             </Link>
//           </View>
//         </View>
//       </View>

//       {/* --- Detailed Features (Glass Cards) --- */}
//       <View className="text-gray-600 body-font">
//         <View className="container px-5 py-24 mx-auto">
//           <View className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
//             {[
//               {
//                 title: "AI-Powered Job Recommendations",
//                 desc: "Leverage advanced AI to discover opportunities that perfectly align with your skills.",
//                 img:"../assets/images/img1.avif",
//                 delay: 100,
//               },
//               {
//                 title: "Skill Gap Analysis",
//                 desc: "Identify the skills you need for your dream job and bridge the gap.",
//                 img:"../assets/images/img2.avif",
//                   delay: 200,
//               },
//               {
//                 title: "Industry Trends",
//                 desc: "Stay one step ahead with real-time insights into emerging industries.",
//                 img:"../assets/images/img3.avif",
//                 delay: 300,
//               },
//             ].map((item, index) => (
//               <View
//                 key={index}
//                 className="p-4 md:w-1/3 sm:mb-0 mb-6"
//                 data-aos="fade-up"
//                 data-aos-delay={item.delay}
//               >
//                 <View className="h-full rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
//                   <View className="h-48 overflow-hidden">
//                     <Image
//                       className="object-cover object-center h-full w-full transform hover:scale-110 transition-transform duration-700"
//                       source={{ uri: item.img }}
//                     />
//                   </View>
//                   <View className="p-6">
//                     <Text className="text-xl font-bold title-font text-gray-900 mb-2">
//                       {item.title}
//                     </Text>
//                     <Text className="text-base leading-relaxed mb-4 text-gray-600">
//                       {item.desc}
//                     </Text>
//                     <Link
//                       href="/"
//                       className="text-indigo-600 font-semibold inline-flex items-center group cursor-pointer"
//                     >
//                       Read Details
//                       <Svg
//                         fill="none"
//                         stroke="currentColor"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300"
//                         viewBox="0 0 24 24"
//                       >
//                         <Path d="M5 12h14M12 5l7 7-7 7"></Path>
//                       </Svg>
//                     </Link>
//                   </View>
//                 </View>
//               </View>
//             ))}
//           </View>
//         </View>
//       </View>

//       {/* --- Image Slider Section (Enhanced) --- */}
//       <View className="text-gray-600 body-font overflow-hidden relative">
//         <View className="container mx-auto py-24 px-4" data-aos="fade-in">
//           <View className="text-center mb-12">
//             <Text className="text-4xl font-extrabold text-gray-900 mb-2">
//               Visualizing Future Work
//             </Text>
//             <Text className="text-gray-500">
//               Swipe through the technologies defining the next decade.
//             </Text>
//           </View>

//           <View className="slider-container group border-4 border-white/50 relative">
//             <View
//               className="slides-wrapper"
//               style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//             >
//               {sliderImages.map((img, idx) => (
//                 <View key={idx} className="w-full h-full flex-shrink-0 relative">
//                   <Image source={{ uri: img }} alt={`Slide ${idx}`} className="slide-image" />
//                   <View className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <Text className="text-white text-xl font-medium">
//                       Explore the possibilities of tomorrow.
//                     </Text>
//                   </View>
//                 </View>
//               ))}
//             </View>

//             {/* Nav Pressables with Glassmorphism */}
//             <Pressable
//               onPress={prevSlide}
//               className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 text-white p-4 rounded-full hover:bg-white/40 transition hover:scale-110 cursor-pointer shadow-lg"
//             >
//              <Text> &#10094;</Text>
//             </Pressable>
//             <Pressable
//               onPress={nextSlide}
//               className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 text-white p-4 rounded-full hover:bg-white/40 transition hover:scale-110 cursor-pointer shadow-lg"
//             >
//              <Text> &#10095;</Text>
//             </Pressable>

//             {/* Dots */}
//             <View className="absolute bottom-6 left-0 right-0 text-center flex justify-center gap-2">
//               {sliderImages.map((_, idx) => (
//                 <Pressable
//                   key={idx}
//                   onPress={() => setCurrentSlide(idx)}
//                   className={`h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? "bg-white w-8 shadow-[0_0_10px_white]" : "bg-white/50 w-2 hover:bg-white/80"}`}
//                 ></Pressable>
//               ))}
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* --- Contact & Map Section (Clean & Modern) --- */}
//       <View className="text-gray-600 body-font relative bg-gray-50">
//         <View className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
//           <View
//             className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-2xl overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative shadow-2xl"
//             data-aos="fade-right"
//           >
//            {/* Map */}
//             <View className="flex-1 rounded-2xl overflow-hidden" style={{ height: 400 }}>
//               <MapView
//                 style={StyleSheet.absoluteFillObject}
//                 initialRegion={{
//                   latitude: 28.6692,
//                   longitude: 77.4538,
//                   latitudeDelta: 0.5,
//                   longitudeDelta: 0.5,
//                 }}
//               >
//                 <Marker
//                   coordinate={{
//                     latitude: 28.6692,
//                     longitude: 77.4538,
//                   }}
//                   title="Ghaziabad"
//                   description="Uttar Pradesh, India"
//                 />
//               </MapView>
//               </View>
//             <View className="bg-white relative flex flex-wrap py-6 rounded-xl shadow-lg w-full border border-gray-100">
//               <View className="lg:w-1/2 px-6">
//                 <Text className="title-font font-bold text-gray-900 tracking-widest text-xs mb-1">
//                   ADDRESS
//                 </Text>
//                 <Text className="mt-1 text-sm">Ghaziabad, Uttar Pradesh</Text>
//               </View>
//               <View className="lg:w-1/2 px-6 mt-4 lg:mt-0">
//                 <Text className="title-font font-bold text-gray-900 tracking-widest text-xs mb-1">
//                   EMAIL
//                 </Text>
//                 <Text className="text-indigo-500 leading-relaxed hover:underline cursor-pointer text-sm">
//                   opp_ahead@gmail.com
//                 </Text>
//                 <Text className="title-font font-bold text-gray-900 tracking-widest text-xs mt-4 mb-1">
//                   PHONE
//                 </Text>
//                 <Text className="leading-relaxed text-sm">+91 9058135360</Text>
//               </View>
//             </View>
//           </View>

//           <View
//             className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0 p-8 rounded-2xl shadow-xl border border-gray-100"
//             data-aos="fade-left"
//           >
//             <Text className="text-gray-900 text-2xl mb-1 font-bold title-font">
//               Feedback
//             </Text>
//             <Text className="leading-relaxed mb-5 text-gray-500">
//               We’d love to hear your thoughts.
//             </Text>
//             <View className="relative mb-4">
//               <Text
//                 className="leading-7 text-sm text-gray-600 font-medium"
//               >
//                 Name
//               </Text>
//               <TextInput
//                 value={name}
//                 onChangeText={setName}
//                 placeholder="Enter your name"
//                 className="w-full bg-gray-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//               />
//             </View>
//             <View className="relative mb-4">
//               <Text
//                 className="leading-7 text-sm text-gray-600 font-medium"
//               >
//                 Email
//               </Text>
               
//                 <TextInput
//                   value={email}
//                   onChangeText={setEmail}
//                   keyboardType="email-address"
//                   placeholder="Enter your email"
//                 className="w-full bg-gray-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
//               />
//             </View>
//             <View className="relative mb-4">
//               <Text
//                 className="leading-7 text-sm text-gray-600 font-medium"
//               >
//                 Message
//               </Text>
//                 <TextInput
//                   value={message}
//                   onChangeText={setMessage}
//                   multiline
//                   numberOfLines={4}
//                   className="w-full bg-gray-50 rounded border border-gray-300 px-3 py-2"
//                   placeholder="Your message..."
//                   textAlignVertical="top"
//                 />
//             </View>
//             <Pressable className="text-white bg-indigo-600 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-700 rounded-lg text-lg transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 cursor-pointer font-medium">
//              <Text> Send Message</Text>
//             </Pressable>
//           </View>
//         </View>
//       </View>

    
//     </ScrollView>
//   )
// }

// export default index


import { View, Text, ScrollView, Image, Pressable, TextInput, StyleSheet, useWindowDimensions, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Footer from '@/components/Footer';
const Index = () => {
  const { width } = useWindowDimensions();
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Static images (no API calls - fixes 403 error)
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

  return (
    <ScrollView className="flex-1 bg-slate-50">
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
            <Text className=" text-sm font-bold text-indigo-600">
              OPPORTUNITY RADAR
            </Text>
          </Pressable>

          {/* Contact Button */}
          <Pressable 
            className="flex-row items-center bg-gray-900 py-2 px-2 rounded-full mb-2"
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#374151' : '#111827',
            })}
             onPress={() => {
    
  }}
          >
            <Text className="text-white text-sm font-semibold mr-1">Contact Us</Text>
            <MaterialIcons name="arrow-forward" size={14} color="white" />
          </Pressable>
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
              <Pressable 
                className="bg-indigo-600 py-3 px-4 rounded-full"
                style={({ pressed }) => ({
                  backgroundColor: pressed ? '#4338ca' : '#4f46e5',
                })}
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
            },
            {
              title: "Dashboards",
              desc: "Data-driven dashboards to uncover trends.",
              icon: "dashboard",
            },
            {
              title: "Opportunities",
              desc: "Latest job openings tailored to your skills.",
              icon: "work",
            },
            {
              title: "Add Listing",
              desc: "Introduce new opportunities to the network.",
              icon: "add-circle",
            },
          ].map((item, index) => (
            <Pressable 
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-100"
              style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.98 : 1 }],
              })}
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

      {/* --- CTA Section --- */}
     {/* Skills Shaping Tomorrow Section */}
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
    
    <View className="flex-row gap-4 flex-wrap justify-center">
      <Pressable 
        className="bg-indigo-600 py-3 px-8 rounded-full"
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#4338ca' : '#4f46e5',
          transform: [{ translateY: pressed ? 2 : 0 }],
        })}
      >
        <Text className="text-white font-bold text-lg">Get Started</Text>
      </Pressable>
      
      <Pressable 
        className="border-2 border-white py-3 px-8 rounded-full"
        style={({ pressed }) => ({
          backgroundColor: pressed ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)',
        })}
      >
        <Text className="text-white font-bold text-lg">Sign In</Text>
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

          {/* Contact Form */}
          <View className="bg-white p-6 rounded-2xl shadow-lg">
            <Text className="text-2xl font-bold text-gray-900 mb-1">Feedback</Text>
            <Text className="text-gray-500 mb-5">We'd love to hear your thoughts.</Text>

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
              className="bg-indigo-600 py-3 px-6 rounded-lg"
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#4338ca' : '#4f46e5',
              })}
            >
              <Text className="text-white text-lg font-medium text-center">
                Send Message
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Footer Spacing */}
      <View  >
        <Footer />
      </View>

    </ScrollView>
  );
};

export default Index;
const styles = StyleSheet.create({
  heroSection: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
});