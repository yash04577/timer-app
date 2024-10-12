import { Modal, StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import Timmer from "@/components/Timmer";
import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import * as Notifications from 'expo-notifications'; 


const index = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeString, setTimeString] = useState("");
  const [totalTimer, setTotalTimer] =  useState(0);
  const [timmers, setTimmers] = useState([]);
  const [time, setTime] = useState({
  })

    const handleAddTimer = () =>{
        if(timmers.length < 5){
            setIsModalOpen(true);
            setTotalTimer((prev)=>prev+1);
        }
        else{
            alert("Cannot add more than 5 timmer")
        }
    }

    const handleOk = () => {
      // Destructure the time object to get hours, minutes, and seconds
      const { hour = 0, minute = 0, second = 0 } = time;
    
      // Create a new time object ensuring no undefined values
      const formattedTime = {
        hour: hour || 0,    // Default to 0 if hour is undefined
        minute: minute || 0, // Default to 0 if minute is undefined
        second: second || 0   // Default to 0 if second is undefined
      };
    
      // Check if totalTimer is true and set the timers accordingly
      if (totalTimer) {
        setTimmers((prev) => ([...prev, formattedTime]));
      } else {
        setTimmers(formattedTime); // Set the time directly
      }
    
      // Reset the time state to ensure it is clear for the next input
      setTime({});
    
      // Close the modal
      setIsModalOpen(false);
    };

    useEffect(() => {
      const getNotificationPermissions = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission for notifications not granted.');
        }
      };
  
      getNotificationPermissions();
    }, []);
  

  return (
    <GestureHandlerRootView>
      <View className={`w-full flex ${totalTimer ? 'justify-between' : 'justify-end' } px-5 h-[98%]`}>

        <ScrollView>

          {
            totalTimer ?  timmers?.map((data, index)=><Timmer data={data} key={index}/>) : 
            
            <View className="flex justify-center items-center bg-gray-700 p-5 rounded-lg">
              <Text className="text-5xl text-gray-200 rounded text-center">OOPS! No Timer Present</Text>
            </View>
          }

        </ScrollView>
        

        

        <TouchableOpacity
          onPress={handleAddTimer}
          className="w-full bg-blue-500 h-[60px] rounded-md flex justify-center items-center"
        >
          <Text className="text-white text-xl font-bold">Add Timer</Text>
        </TouchableOpacity>
      </View>

        <View className="w-screen h-screen flex justify-center items-center">

        

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <View className="w-[80%] bg-gray-900 h-[40%] justify-center mx-auto mt-10 items-center rounded-lg">
          <View className="">
            <View className="flex flex-row justify-center items-center my-5">

              <View className="flex flex-row items-center">
                <TextInput keyboardType="numeric" value={time?.hour?.toString()} onChangeText={(t) => setTime((prev) => ({ ...prev, hour: t }))} placeholderTextColor={'rgb(229, 231, 235)'} maxLength={2} className="text-5xl text-gray-200 placeholder:text-gray-200" placeholder="HH" />
                <Text className="text-gray-200 text-5xl"> : </Text>
              </View>
              <View className="flex flex-row items-center">
                <TextInput keyboardType="numeric" value={time?.minute?.toString()} onChangeText={(t) => setTime((prev) => ({ ...prev, minute: t }))} maxLength={2} placeholderTextColor={'rgb(229, 231, 235)'} className="text-5xl text-gray-200 placeholder:text-gray-200" placeholder="MM" />
                <Text className="text-gray-200 text-5xl"> : </Text>
              </View>
              <View className="flex flex-row">
                <TextInput keyboardType="numeric" value={time?.second?.toString()} onChangeText={(t) => setTime((prev) => ({ ...prev, second: t }))} maxLength={2} placeholderTextColor={'rgb(229, 231, 235)'} className="text-5xl text-gray-200 placeholder:text-gray-200" placeholder="SS" />
              </View>
            </View>
          </View>

          <View className="flex gap-y-5 mx-auto">
            <View className="flex flex-row gap-5">
              <TouchableOpacity onPress={()=>setIsModalOpen(false)} className="bg-orange-400 rounded-full p-5 flex justify-center items-center">
                <Text className="text-gray-200 text-3xl">CLOSE</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>handleOk()} className="bg-blue-700 rounded-full p-5 flex justify-center items-center">
                <Text className="text-gray-200 text-3xl">ADD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      </View>
    </GestureHandlerRootView>
  );
};

export default index;

const styles = StyleSheet.create({});
