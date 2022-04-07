// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();

      let hallPassOnly = await store
        .getState()
        .blockchain.smartContract.methods.hallPassOnly()
        .call();

      let hallPass = await store
        .getState()
        .blockchain.smartContract.methods.hallPass(await store.getState().blockchain.account)
        .call();

      dispatch(
        fetchDataSuccess({
          totalSupply,
          hallPassOnly,
          hallPass
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
