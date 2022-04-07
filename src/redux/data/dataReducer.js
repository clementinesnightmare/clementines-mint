const initialState = {
  loading: false,
  totalSupply: 0,
  hallPassOnly: false,
  hallPass: 0,
  cost: 0,
  error: false,
  errorMsg: "",
  saleMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        totalSupply: action.payload.totalSupply,
        hallPassOnly: action.payload.hallPassOnly,
        hallPass: action.payload.hallPass,
        error: false,
        errorMsg: "",
        saleMsg: action.payload.hallPassOnly ? "Hall Pass Sale - " + action.payload.hallPass + " Remaining!" : "Public Sale!",
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
