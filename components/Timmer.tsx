import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';

const Timer = ({ data }:any) => {
  const [time, setTime] = useState(data);
  const [isPaused, setIsPaused] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  const [isFinshed, setIsFinished] = useState(false);

  useEffect(() => {
    
    if (isPaused || (time.hour === 0 && time.minute === 0 && time.second === 0)) {
      if (intervalId) {
        clearInterval(intervalId); 
      }
      return;
    }

    // Set up the interval
    const interval = setInterval(() => {

      setTime((prevTime:any) => {
        let { hour, minute, second } = prevTime;

        if (second > 0) {
          second -= 1;
        } else if (minute > 0) {
          minute -= 1;
          second = 59;
        } else if (hour > 0) {
          hour -= 1;
          minute = 59;
          second = 59;
        }

        return { hour, minute, second };
      });
    }, 1000);

    setIntervalId(interval); 
    return () => {
      clearInterval(interval);
    };

  }, [isPaused, time]); 

  useEffect(()=>{
    console.log(time)
    if(time?.hour == 0 && time?.minute == 0 && time?.second == 0){
      setIsFinished(true);
    }
  },[time])

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const resetTimer = () => {
    setTime(data);
    setIsFinished(false)
    setIsPaused(true); 
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const triggerNotification = async () => {
    await Notifications.presentNotificationAsync({
      title: 'Timer Finished',
      body: 'The countdown timer has finished!',
      sound: true,
    });
  };


  useEffect(() => {
    if (isFinshed) {
      triggerNotification();
    }
  }, [isFinshed]); 

  return (
    <View className={`bg-slate-600 p-5 rounded-lg my-2 ${isFinshed ? 'border-2 border-green-500' : ""}`}>
      <View>
        <Text className="text-5xl font-bold text-white text-center">
          {String(time?.hour).padStart(2, '0')}h{' '}
          {String(time?.minute).padStart(2, '0')}m{' '}
          {String(time?.second).padStart(2, '0')}s
        </Text>
      </View>
      <View className="flex flex-row justify-between">
        <TouchableOpacity
          className="bg-blue-400 rounded-lg px-5 py-3"
          onPress={togglePause}
        >
          <Text className="text-2xl text-white">{isPaused ? 'Start' : 'Pause'}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="bg-red-400 rounded-lg px-5 py-3" 
          onPress={resetTimer}
        >
          <Text className="text-2xl text-white">Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({});
