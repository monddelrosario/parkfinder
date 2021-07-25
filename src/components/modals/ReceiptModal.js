import React, {useReducer, useEffect, useState} from 'react';

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
import useDateTimeDiffer from '../../utils/timeDiffCalc';
import {actionCreators, reducer, initialState} from '../../store';

const ReceiptModal = ({
  visible,
  titleResult,
  buttonResult,
  onTouchOutside,
  selected,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState({days: '', hours: '', minutes: ''});
  const [total, setTotal] = useState(0);
  const now = `${moment().format('L')} ${moment().format('LTS')}`;
  const perHour = selected.size === 0 ? 20 : selected.size === 1 ? 60 : 100;

  useEffect(() => {
    if (visible && loading) {
      console.log('now :', now);
      console.log('time in :', selected.timeIn);
      const {days, hours, minutes} = useDateTimeDiffer(
        new Date(selected.timeIn),
        new Date(now),
      );
      _calculateFees(days, hours, minutes);

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [setLoading, loading, visible]);

  const _calculateFees = (days, hours, minutes) => {
    console.log('CALCULATING......');
    let subtotal = 0;
    let tempHours = hours;
    let finalhour = hours;
    if (days > 0) {
      subtotal += days * 5000;
      console.log('if days >0 : ', days, 'subtotal :', subtotal);
    }
    if (minutes >= 30) {
      tempHours = tempHours + 1;
      finalhour = tempHours;
      console.log('if minutes >30 : ', minutes, 'temphours :', tempHours);
    }
    if (tempHours > 3) {
      tempHours = tempHours - 3;
      console.log('if hours >3 : ', hours, 'subtotal :', subtotal);
    }
    subtotal += 40;
    // minutes > 0 && (subtotal += 40);
    subtotal += tempHours * perHour;
    console.log('Subtotal : ', subtotal);
    setTime({days, hours: finalhour, minutes});

    setTotal(subtotal);
  };
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
        <ModalContent style={styles.container}>
          {loading ? (
            <>
              <ActivityIndicator color={Colors.primary} size="large" />
              <View style={styles.padding}>
                <Text style={styles.loadingTextStyle}>
                  Calculating park costs.....
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.paddingHorizontal}>
              <View style={styles.padding}>
                <Text style={styles.titleResultTextStyle}>{titleResult}</Text>
              </View>

              <>
                <Row
                  left={'Time in :'}
                  right={moment(selected.timeIn).format('LLL')}
                />
                <Row left={'Time out :'} right={moment(now).format('LLL')} />
                <Row
                  left={'Vehicle plate number :'}
                  right={selected.plateNumberIn}
                />

                <Row left={'Park slot :'} right={selected.id} />

                <Row
                  left={'Park type :'}
                  right={`${
                    selected.size === 0
                      ? 'Small Parking'
                      : selected.size === 1
                      ? 'Medium Parking'
                      : 'Large Parking'
                  } - ${perHour} /hr`}
                />
                <Row left={'Charges :'} right={''} />
                <Row
                  left={'Days : 5000 /day '}
                  style={styles.paddingStart}
                  right={
                    time.days ? `(${time.days})  ${time.days * 5000}` : '0'
                  }
                />
                <Row
                  left={'Total hours :'}
                  style={styles.paddingStart}
                  right={time.hours}
                />
                <Row
                  left={'First (3) hours : 40'}
                  style={styles.paddingStart1}
                  // right={state.minutes > 0 ? '  40' : '0'}
                  right={'40'}
                />
                <Row
                  left={`Remaining hours : ${perHour} /hr`}
                  style={styles.paddingStart1}
                  right={
                    time.hours > 3
                      ? `(${time.hours - 3})  ${(time.hours - 3) * perHour}`
                      : `${time.hours * perHour}`
                  }
                />
                <View style={styles.divider} />
                <Row
                  left={'Total :'}
                  style={styles.textBoldStyle}
                  right={`P ${total}`}
                />
              </>

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
  btnWrapper: {
    marginTop: 10,
    height: 80,
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
  container: {
    width: wp('80%'),
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  divider: {
    borderWidth: 0.3,
  },
  loadingTextStyle: {
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  padding: {
    padding: 10,
  },
  paddingHorizontal: {
    paddingHorizontal: 20,
  },
  paddingStart: {
    paddingStart: 20,
  },
  paddingStart1: {
    paddingStart: 30,
  },
  textBoldStyle: {
    fontWeight: 'bold',
  },
  titleResultTextStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.success,
  },
});
export default ReceiptModal;
