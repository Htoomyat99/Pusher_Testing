import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Pusher, PusherEvent} from '@pusher/pusher-websocket-react-native';

const App = () => {
  const pusher = Pusher.getInstance();
  const [message, setMessage] = useState('');

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => console.log('Message : ', message), []);

  const connect = async () => {
    await pusher.init({
      apiKey: '9526fdf4269456da2508',
      cluster: 'ap1',
    });

    await pusher.connect();
    await pusher.subscribe({
      channelName: 'Testing',
      onSubscriptionSucceeded: data => {
        console.log('Subscription Success', data);
      },
      onSubscriptionError: err => {
        console.log('Error');
      },
      onEvent: (event: PusherEvent) => {
        console.log(
          `Event Received - Name: ${event.eventName}, Data: ${JSON.stringify(
            event.data,
          )}`,
        );
        setMessage(event.data);
      },
    });
  };

  return (
    <View
      style={{justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
      <Text>{message}</Text>
    </View>
  );
};

export default App;
