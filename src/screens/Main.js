import React, {useEffect, useCallback, useState, useReducer} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import ParkSlotListItem from '../components/listitems/ParkSlotListItem';
import ParkNewVehicleModal from '../components/modals/ParkNewVehicleModal';
import ViewSlotModal from '../components/modals/ViewSlotModal';
import {reducer, actionCreators, initialState} from '../store';
import Colors from '../themes/colors';
import * as Services from '../services';

const Main = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [newModalVisible, setNewModalVisible] = useState(false);
  const [viewSlotModal, setViewSlotModal] = useState(false);
  const [activeSlot, setActiveSlot] = useState({});
  const [loading, setLoading] = useState(true);

  const _addNewVehicle = () => {
    setNewModalVisible(true);
  };

  const _viewSlotModal = async item => {
    setActiveSlot(item);
    setViewSlotModal(true);
  };

  const _renderItem = ({item}) => {
    return (
      <>
        <ParkSlotListItem item={item} onPress={_viewSlotModal} />
      </>
    );
  };
  // useEffect(() => {
  //   console.log('MAIN SCREEN : ', state);
  //   Services.storeData('localData', state);
  // }, [state, loading]);

  // const onRefresh = useCallback(() => {
  //   setLoading(true);
  // Services.retrieveData('localData').then(res => {
  //   if (res) {
  //     dispatch(actionCreators.init(res));
  //   }
  // });
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);

  const onRefresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [setLoading]);

  useState(() => {
    onRefresh();
  }, [onRefresh]);

  // if (loading) {
  //   return (
  //     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //       <ActivityIndicator color={Colors.primary} size="large" />
  //     </View>
  //   );
  // }
  return (
    <>
      <ParkNewVehicleModal
        visible={newModalVisible}
        onTouchOutside={() => setNewModalVisible(false)}
      />
      <ViewSlotModal
        data={activeSlot}
        visible={viewSlotModal}
        onTouchOutside={() => setViewSlotModal(false)}
      />
      <View style={styles.container}>
        <View style={styles.btnWrapper}>
          <Pressable
            style={({pressed}) => [styles.btnStyle(pressed)]}
            onPress={_addNewVehicle}>
            <Text style={styles.btnTextStyle}>Park new vehicle</Text>
          </Pressable>
        </View>

        <View style={styles.listContainer}>
          <View style={styles.entryAWrapper}>
            <Text style={styles.entryATextStyle}>Entry A</Text>
          </View>
          <View style={styles.entryBWrapper}>
            <Text style={styles.entryBTextStyle}>Entry B</Text>
          </View>
          <View style={styles.entryCWrapper}>
            <Text style={styles.entryCTextStyle}> Entry C</Text>
          </View>
          <FlatList
            contentContainerStyle={styles.flatlistContainer}
            data={state.slots}
            renderItem={_renderItem}
            numColumns={4}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={onRefresh} />
            }
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  btnStyle: pressed => ({
    margin: pressed ? 8 : 5,
    backgroundColor: Colors.primary,
    borderRadius: 30,
  }),
  btnTextStyle: {
    textAlign: 'center',
    paddingVertical: 20,
    color: Colors.snow,
    fontWeight: 'bold',
  },
  btnWrapper: {
    marginHorizontal: 100,
    alignContent: 'center',
    height: 80,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  entryATextStyle: {
    textAlign: 'center',
    color: Colors.snow,
  },
  entryAWrapper: {
    top: -10,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 2,
    width: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  entryBWrapper: {
    top: 250,
    left: -20,
    bottom: 0,
    position: 'absolute',
    height: 20,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 2,
  },
  entryBTextStyle: {
    textAlign: 'center',
    color: Colors.snow,
  },
  entryCWrapper: {
    top: 250,
    right: -20,
    bottom: 0,
    position: 'absolute',
    height: 20,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 2,
  },
  entryCTextStyle: {
    textAlign: 'center',
    color: Colors.snow,
  },
  flatlistContainer: {
    alignItems: 'center',
  },
  listContainer: {
    borderWidth: 0.7,
    borderRadius: 7,
    margin: 22,
  },
});
export default Main;
