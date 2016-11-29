export const FETCH_NEWEST_REQUEST = 'plan/REQUEST';
export const FETCH_NEWEST_FAILURE = 'plan/FAILURE';
export const FETCH_NEWEST_SUCCESS = 'plan/SUCCESS';

export const fetchNewestPlan = () => ({
  type: FETCH_NEWEST_REQUEST,
});

export const fetchNewestPlanSuccess = plan => ({
  type: FETCH_NEWEST_SUCCESS,
  plan,
})