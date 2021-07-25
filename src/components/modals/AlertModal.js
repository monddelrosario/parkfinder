import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from 'react-native';
import {Modal, ScaleAnimation, ModalContent} from 'react-native-modals';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import moment from 'moment';
import Row from '../listitems/Row';
import Colors from '../../themes/colors';

const AlertModal = ({
  visible,
  titleResult,
  buttonResult,
  success,
  errorMessage,
  onTouchOutside,
  selected,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible && loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [setLoading, loading, visible, success]);

  const _onTouchOutside = () => {
    setLoading(true);
    onTouchOutside();
  };

  return (
    <>
      <Modal
        visible={visible}
        onTouchOutside={() => {}}
        modalAnimation={
          new ScaleAnimation({
            initialValue: 0, // optional
            useNativeDriver: true, // optional
          })
        }>
        <ModalContent style={styles.modalContainer}>
          {loading ? (
            <>
              <ActivityIndicator color="#0066cc" size="large" />
              <View style={styles.padding}>
                <Text style={styles.availableSlotTextStyle}>
                  Searching available slots.....
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.paddingHorizontal}>
              <View style={styles.padding}>
                <Text style={styles.titleTextStyle(success)}>
                  {titleResult}
                </Text>
              </View>
              {success && (
                <>
                  <Row
                    left={'Time in : '}
                    right={moment(selected.timeIn).format('LLL')}
                  />
                  <Row left={'Park Slot : '} right={selected.id} />
                </>
              )}
              {!success && errorMessage && (
                <View style={styles.paddingVertical}>
                  <Text style={styles.alignCenter}>{errorMessage}</Text>
                </View>
              )}
              <View style={styles.btnWrapper}>
                <Pressable
                  style={({pressed}) => [styles.btnStyle(pressed)]}
                  onPress={_onTouchOutside}>
                  <Text style={styles.btnTextStyle}>{buttonResult}</Text>
                </Pressable>
              </View>
            </View>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  alignCenter: {
    textAlign: 'center',
  },
  availableSlotTextStyle: {
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  btnStyle: pressed => ({
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 30,
    margin: pressed ? 2 : 0,
  }),
  btnTextStyle: {
    textAlign: 'center',
    color: Colors.snow,
  },
  btnWrapper: {
    marginTop: 10,
    height: 80,
  },
  modalContainer: {
    width: wp('80%'),
    padding: 10,
  },
  padding: {
    padding: 20,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  paddingVertical: {
    paddingVertical: 10,
  },
  titleTextStyle: p => ({
    fontWeight: 'bold',
    textAlign: 'center',
    color: p ? Colors.success : Colors.fire,
  }),
});

export default AlertModal;
