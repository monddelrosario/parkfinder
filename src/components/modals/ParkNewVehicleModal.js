import React, { useState, useReducer } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BottomModal, ModalContent } from 'react-native-modals';
import moment from 'moment';

import { actionCreators, reducer, initialState } from '../../store';
import AlertModal from './AlertModal';
import Colors from '../../themes/colors';
import useDateTimeDiffer from '../../utils/timeDiffCalc';

const ParkNewVehicleModal = ({ visible, onTouchOutside }) => {
  const initialEntryArray = [
    { name: 'A', active: true },
    { name: 'B', active: false },
    { name: 'C', active: false },
  ];
  const initialVehicleArray = [
    { name: 'Small', active: true },
    { name: 'Medium', active: false },
    { name: 'Large', active: false },
  ];
  const [state, dispatch] = useReducer(reducer, initialState);
  const [entries, setEntry] = useState(initialEntryArray);
  const [vehicles, setVehicles] = useState(initialVehicleArray);
  const [alertVisible, setAlertVisible] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [plateNumber, setPlaterNumber] = useState('');
  const [error, setError] = useState(false);
  const setActiveEntry = (i) => {
    let temp = entries.slice();
    temp.forEach((item) => (item.active = false));
    temp[i].active = true;
    setEntry(temp);
  };

  const setActiveVehicle = (i) => {
    let temp = vehicles.slice();
    temp.forEach((item) => (item.active = false));
    temp[i].active = true;
    setVehicles(temp);
  };

  const _onTouchOutside = () => {
    Keyboard.dismiss();
    setEntry(initialEntryArray);
    setVehicles(initialVehicleArray);
    setPlaterNumber('');
    onTouchOutside();
  };

  const _onTouchOutside1 = () => {
    setErrorMessage('');
    setAlertVisible(false);
    setSuccess(false);
    _onTouchOutside();
  };

  const _findParking = () => {
    Keyboard.dismiss();
    if (!plateNumber) {
      setError(true);
      return;
    }
    setErrorMessage('');
    setAlertVisible(true);
    let temp1 = vehicles.slice();
    let temp2 = entries.slice();
    let v = temp1.filter((item) => item.active === true);
    let e = temp2.filter((item) => item.active === true);

    let slotsAvailable = state.slots.filter(
      (item) => item.isVacant === true
    );
    let samePlateNumber = state.slots.filter(
      (item) => item.plateNumberIn === plateNumber
    );
    console.log('Same plate on parked vehicles: ', samePlateNumber);
    if (samePlateNumber.length > 0) {
      setSuccess(false);
      setErrorMessage('Vehicle plate number already parked!!!');
      return;
    }

    // let slotsHistory = state.history.filter(
    //   item => item.plateNumberIn === plateNumber,
    // );
    // console.log(state.history, 'HISTORY BEFORE ADD : ', slotsHistory);

    // if (slotsHistory.length > 0) {
    //   slotsHistory.forEach(item => {
    //     const {hours} = useDateTimeDiffer(
    //       new Date(item.timeout),
    //       new Date(`${moment().format('L')} ${moment().format('LTS')}`),
    //     );
    //     console.log('Test hours : ', hours);
    //     // if (l.timeOut) {
    //     // }
    //   });
    //   // if(slotsHistory.length >0){

    //   // }
    // }
    let filteredData = [];
    switch (e[0].name) {
      case 'A':
        filteredData = slotsAvailable.sort((a, b) => {
          return a.awayFromA - b.awayFromA;
        });
        break;

      case 'B':
        filteredData = slotsAvailable.sort((a, b) => {
          return a.awayFromB - b.awayFromB;
        });
        break;

      case 'C':
        filteredData = slotsAvailable.sort((a, b) => {
          return a.awayFromC - b.awayFromC;
        });
        break;

      default:
        filteredData = [];
        break;
    }
    console.log('All available slots! : ', slotsAvailable);
    if (slotsAvailable.length === 0) {
      setSuccess(false);
      setErrorMessage('FULL PARKING!!!');
      console.log('FULL PARKING');
      return;
    } else {
      //Check all available slots if applicable on vehicle type
      let result = '';
      const vTemp =
        v[0].name === 'Small' ? 0 : v[0].name === 'Medium' ? 1 : 2;
      for (let i = 0; i <= filteredData.length - 1; i++) {
        if (filteredData[i].size >= vTemp) {
          result = filteredData[i];
          console.log('raw :', result);
          break;
        }
      }

      if (!result) {
        setSuccess(false);
        setErrorMessage('No available slot on this vehicle type');

        console.log('No Available slot on this vehicle type');
      } else {
        result.isVacant = false;
        result.timeIn = `${moment().format('L')} ${moment().format(
          'LTS'
        )}`;
        result.vehicleTypeIn = v[0].name;
        result.plateNumberIn = plateNumber;
        console.log('Before add on state.slots: ', result);
        setSelectedSlot(result);
        setSuccess(true);
        dispatch(actionCreators.park(result));
      }
    }
  };

  const onChangeText = (p) => {
    setError(false);
    setPlaterNumber(p);
  };

  return (
    <>
      <AlertModal
        visible={alertVisible}
        titleResult={isSuccess ? 'SUCCESS' : 'FAILED'}
        errorMessage={errorMessage}
        selected={selectedSlot}
        buttonResult={isSuccess ? 'Done' : 'Try again'}
        success={isSuccess}
        onTouchOutside={_onTouchOutside1}
      />
      <BottomModal
        visible={visible}
        onTouchOutside={_onTouchOutside}
        onSwipeOut={_onTouchOutside}
        modalStyle={{ top: 40 }}
        modalTitle={
          <View style={styles.modalHeaderContainer}>
            <View style={styles.topDividerStyle} />
            <View style={styles.headerTextWrapper}>
              <Text
                style={styles.headerTextStyle}
              >{`Park New Car`}</Text>
            </View>
          </View>
        }
      >
        <ModalContent>
          <>
            <View style={styles.alignCenter}>
              <Text>Choose Entry Point</Text>
              <View style={styles.listContainer}>
                {entries.map((l, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={styles.btnStyle(l.active)}
                      onPress={() => setActiveEntry(i)}
                    >
                      <Text style={styles.textCenter}>{l.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text>Choose Vehicle Type</Text>
              <View style={styles.listContainer}>
                {vehicles.map((l, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={styles.btnStyle(l.active)}
                      onPress={() => setActiveVehicle(i)}
                    >
                      <Text style={styles.textCenter}>{l.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text>Enter Plate Number</Text>

              <View style={styles.mobileInputStyle(error)}>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Enter plater number'}
                  placeholderTextColor={Colors.steel}
                  value={plateNumber}
                  blurOnSubmit={true}
                  onChangeText={onChangeText}
                />
              </View>
              <View style={styles.btnFindWrapper}>
                <Pressable
                  style={({ pressed }) => [
                    styles.btnFindStyle(pressed),
                  ]}
                  onPress={_findParking}
                >
                  <Text style={styles.findParkingTextStyle}>
                    Find Available Parking
                  </Text>
                </Pressable>
              </View>
            </View>
          </>
        </ModalContent>
      </BottomModal>
    </>
  );
};

const styles = StyleSheet.create({
  alignCenter: {
    alignContent: 'center',
  },
  btnFindStyle: (pressed) => ({
    borderRadius: 30,
    padding: 20,
    backgroundColor: Colors.primary,
    margin: pressed ? 2 : 0,
  }),
  btnFindWrapper: {
    marginTop: 20,
    marginHorizontal: 50,
    height: 100,
  },
  btnStyle: (active) => ({
    width: wp('28%'),
    height: 50,
    backgroundColor: active ? Colors.steel : Colors.transparent,
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  }),
  container: {
    flex: 1,
  },
  findParkingTextStyle: {
    textAlign: 'center',
    color: Colors.snow,
  },
  headerTextStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 15,
  },
  headerTextWrapper: {
    borderBottomWidth: 1,
    borderColor: Colors.steel,
  },
  listContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  modalHeaderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
  },
  textCenter: {
    textAlign: 'center',
  },
  topDividerStyle: {
    borderWidth: 2,
    borderRadius: 10,
    width: 50,
    alignSelf: 'center',
    top: -10,
  },
  mobileInputStyle: (error) => ({
    borderWidth: 1,
    width: wp('90%'),
    borderColor: error ? Colors.fire : Colors.steel,
    marginVertical: 10,
    height: 45,
    borderRadius: wp('1%'),
    flexDirection: 'row',
    backgroundColor: Colors.transparent,
  }),

  textInput: {
    paddingLeft: wp('3%'),
    height: '100%',
    width: '100%',
  },
});
export default ParkNewVehicleModal;
