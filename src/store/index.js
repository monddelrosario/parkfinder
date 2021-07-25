const types = {
  PARK: 'PARK',
  UNPARK: 'UNPARK',
  // ADD_ON_HISTORY: 'ADD_ON_HISTORY',
};

export const actionCreators = {
  park: data => ({type: types.PARK, payload: data}),
  unpark: data => ({type: types.UNPARK, payload: data}),
  // addOnHistory: data => ({type: types.ADD_ON_HISTORY, payload: data}),
};

export const initialState = {
  slots: [
    {
      id: 'A1',
      awayFromA: 1,
      awayFromB: 3,
      awayFromC: 10,
      vehicleTypeIn: '',
      plateNumberIn: '',
      isVacant: true,
      timeIn: null,
      timeOut: null,
      size: 1,
    },
    {
      id: 'A2',
      awayFromA: 2,
      awayFromB: 6,
      awayFromC: 7,
      vehicleTypeIn: '',
      plateNumberIn: '',
      isVacant: true,
      timeIn: null,
      timeOut: null,
      size: 2,
    },
    {
      id: 'A3',
      awayFromA: 3,
      awayFromB: 9,
      awayFromC: 4,
      vehicleTypeIn: '',
      plateNumberIn: '',
      isVacant: true,
      timeIn: null,
      timeOut: null,
      size: 1,
    },
    {
      id: 'A4',
      awayFromA: 4,
      awayFromB: 12,
      awayFromC: 1,
      vehicleTypeIn: '',
      plateNumberIn: '',
      isVacant: true,
      timeIn: null,
      timeOut: null,
      size: 0,
    },
    {
      id: 'B1',
      awayFromA: 5,
      awayFromB: 2,
      awayFromC: 11,
      vehicleTypeIn: '',
      plateNumberIn: '',
      isVacant: true,
      timeIn: null,
      timeOut: null,
      size: 2,
    },
    {
      id: 'B2',
      awayFromA: 6,
      awayFromB: 5,
      awayFromC: 8,
      vehicleTypeIn: '',
      plateNumberIn: '',
      isVacant: true,
      timeIn: null,
      timeOut: null,
      size: 0,
    },
    {
      id: 'B3',
      awayFromA: 7,
      awayFromB: 8,
      awayFromC: 5,
      vehicleTypeIn: '',
      plateNumberIn: '',
      isVacant: true,
      timeIn: null,
      timeOut: null,
      size: 1,
    },
    {
      id: 'B4',
      awayFromA: 8,
      awayFromB: 11,
      awayFromC: 2,
      vehicleTypeIn: '',
      plateNumberIn: '',
      isVacant: true,
      timeIn: null,
      timeOut: null,
      size: 2,
    },
    {
      id: 'C1',
      awayFromA: 9,
      awayFromB: 1,
      awayFromC: 12,
      vehicleTypeIn: '',
      plateNumberIn: '',
      isVacant: true,
      timeIn: null,
      timeOut: null,
      size: 1,
    },
    {
      id: 'C2',
      awayFromA: 10,
      awayFromB: 4,
      awayFromC: 9,
      vehicleTypeIn: '',
      plateNumberIn: '',
      isVacant: true,
      timeIn: null,
      timeOut: null,
      size: 2,
    },
    {
      id: 'C3',
      awayFromA: 11,
      awayFromB: 7,
      awayFromC: 6,
      vehicleTypeIn: '',
      plateNumberIn: '',
      isVacant: true,
      timeIn: null,
      timeOut: null,
      size: 0,
    },
    {
      id: 'C4',
      awayFromA: 12,
      awayFromB: 10,
      awayFromC: 3,
      vehicleTypeIn: '',
      plateNumberIn: '',
      isVacant: true,
      timeIn: null,
      timeOut: null,
      size: 2,
    },
  ],
  // history: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case types.PARK:
      return {
        ...state,
        slots: [
          ...state.slots.map(slot => {
            if (action.payload.id === slot.id) {
              slot = action.payload;
              console.log('PARK SLOT :  ', slot);
            }
            return slot;
          }),
        ],
        // history: [...state.history, action.payload],
      };
    case types.UNPARK:
      return {
        ...state,
        slots: [
          ...state.slots.map(slot => {
            if (action.payload.id === slot.id) {
              slot = action.payload;
              console.log('UNPARK SLOT :  ', slot);
            }
            return slot;
          }),
        ],
        // history: [...state.history],
      };
    // case types.ADD_ON_HISTORY:

    //   return {
    //     ...state,
    //     history: [

    //       ...state.history.map(slot => {
    //         if (action.payload.id === slot.id) {
    //           slot = action.payload;
    //           console.log('SAVE UNPARK HISTORY :  ', slot);
    //         }
    //         return slot;
    //       }),
    //     ],
    //   };

    default:
      return state;
  }
}
