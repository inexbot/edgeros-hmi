export default {
  namespace: 'var',
  state: {
    int: [],
    double: [],
    bool: [],
    position: {},
    externPosition: {},
  },
  reducers: {
    numeral(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      switch (action.data.varType) {
        case 1:
          if (_state.bool.length < 999) {
            _state.bool = _state.bool.concat(action.data.varList);
          } else {
            _state.bool = action.data.varList;
          }
          break;
        case 2:
          if (_state.int.length < 999) {
            _state.int = _state.int.concat(action.data.varList);
          } else {
            _state.int = action.data.varList;
          }
          break;
        case 3:
          if (_state.double.length < 999) {
            _state.double = _state.double.concat(action.data.varList);
          } else {
            _state.double = action.data.varList;
          }
          break;

        default:
          break;
      }
      return _state;
    },
    position(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.position = action.data;
      return _state;
    },
    externPosition(state, action) {
      let _state = JSON.parse(JSON.stringify(state));
      _state.externPosition = action.data;
      return _state;
    },
  },
};
