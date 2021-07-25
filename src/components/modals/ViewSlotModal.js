import React, {useState, useReducer} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {BottomModal, ModalContent} from 'react-native-modals';

import ReceiptModal from './ReceiptModal';
import {actionCreators, reducer, initialState} from '../../store';
import Row from '../listitems/Row';
import Colors from '../../themes/colors';
import moment from 'moment';

const ViewSlotModal = ({data, visible, onTouchOutside}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [receiptVisible, setReceiptVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({});

  const _onTouchOutside = () => {
    onTouchOutside();
    setSelectedSlot({});
  };

  const _onTouchOutside1 = () => {
    // const now = `${moment().format('L')} ${moment().format('LTS')}`;

    // const temp1 = {...data};
    // temp1.timeOut = now;
    // console.log(state.history, 'BEFORE ADD ON HISTORY BY UNPARK : ', temp1);
    // dispatch(actionCreators.addOnHistory(temp1));
    const temp = data;

    temp.plateNumberIn = '';
    temp.isVacant = true;
    temp.timeIn = null;
    temp.timeOut = null;
    temp.vehicleTypeIn = '';

    dispatch(actionCreators.unpark(temp));

    setReceiptVisible(false);
    _onTouchOutside();
  };

  const _unParking = () => {
    const temp = data;
    setSelectedSlot(temp);
    setReceiptVisible(true);
  };

  return (
    <>
      <ReceiptModal
        visible={receiptVisible}
        titleResult={'SUCCESS'}
        selected={selectedSlot}
        buttonResult={'Done'}
        onTouchOutside={_onTouchOutside1}
      />
      <BottomModal
        visible={visible}
        onTouchOutside={_onTouchOutside}
        onSwipeOut={_onTouchOutside}
        modalTitle={
          <View style={styles.modalHeaderContainer}>
            <View style={styles.topDividerStyle} />
            <View style={styles.headerTextWrapper}>
              <Text style={styles.headerTextStyle}>
                {`View Slot ${data.id}`}
              </Text>
            </View>
          </View>
        }>
        <ModalContent>
          <>
            <View style={styles.container}>
              {!data.isVacant && (
                <Row
                  left={'Time in : '}
                  right={
                    data.timeIn ? moment(data.timeIn).format('LLL') : 'None'
                  }
                />
              )}
              {!data.isVacant && (
                <Row
                  left={'Vehicle plate number : '}
                  right={data.plateNumberIn}
                />
              )}
              <Row
                left={'Status : '}
                right={data.isVacant ? 'Available' : 'Occupied'}
                rightStyle={styles.statusValueTextStyle(data.isVacant)}
              />

              {!data.isVacant && (
                <View style={styles.btnWrapper}>
                  <Pressable
                    style={({pressed}) => [styles.btnParkOutStyle(pressed)]}
                    onPress={_unParking}>
                    <Text style={styles.btnTextStyle}>Park Out</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </>
        </ModalContent>
      </BottomModal>
    </>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    marginTop: 20,
    marginHorizontal: 50,
    height: 80,
  },
  btnParkOutStyle: pressed => ({
    borderRadius: 30,
    padding: 20,
    backgroundColor: Colors.primary,
    margin: pressed ? 2 : 0,
  }),
  btnTextStyle: {
    textAlign: 'center',
    color: Colors.snow,
  },
  container: {
    alignContent: 'center',
    paddingHorizontal: 20,
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
  modalHeaderContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '100%',
  },
  statusValueTextStyle: d => ({
    color: d ? Colors.success : Colors.fire,
  }),
  topDividerStyle: {
    borderWidth: 2,
    borderRadius: 10,
    width: 50,
    alignSelf: 'center',
    top: -10,
  },
});
export default ViewSlotModal;
