import axios from "axios";

export const CHECK_SUBSCRIPTION_STATUS = "CHECK_SUBSCRIPTION_STATUS";
export const SET_SUBSCRIPTION_STATUS = "SET_SUBSCRIPTION_STATUS";

export const checkSubscriptionStatus = (email) => async (dispatch) => {
  try {
    const response = await axios.get(`/isSubscribed?email=${email}`);
    dispatch({
      type: SET_SUBSCRIPTION_STATUS,
      payload: response.data.isSubscribed,
    });
  } catch (error) {
    console.error("Error checking subscription status:", error);
  }
};

export const subscribe = (email) => async (dispatch) => {
  try {
    await axios.post("/subscribe", { email });
    dispatch({ type: SET_SUBSCRIPTION_STATUS, payload: true });
    alert("Subscription successful");
  } catch (error) {
    alert("You've already subscribed");
  }
};
