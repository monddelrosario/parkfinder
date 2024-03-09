import AsyncStorage from '@react-native-async-storage/async-storage';

/******************/
//Storage functions
/******************/

// saving data
export const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(
      '@' + key + ':key',
      JSON.stringify(data)
    );
    return { status: 'success', reason: 'data saved', result: data };
  } catch (error) {
    return error;
    // Error saving data
  }
};

//retrieve  data
export const retrieveData = async (key) => {
  // AsyncStorage.clear();
  try {
    const value = await AsyncStorage.getItem('@' + key + ':key');
    console.log('Async, Retrieved value:', value);
    if (value !== null) {
      return JSON.parse(value);
      // return value;
    } else {
      console.log('Erorr: ', {
        status: 'failed',
        reason: 'data does not exist',
      });
      return false;
    }
  } catch (error) {
    return error;
    // Error retrieving data
  }
};
