export const FETCH_PLAN_REQUEST = 'plan/id/REQUEST';
export const FETCH_PLAN_FAILURE = 'plan/id/FAILURE';
export const FETCH_PLAN_SUCCESS = 'plan/id/SUCCESS';

export const fetchPlan = id => ({
  type: FETCH_PLAN_REQUEST,
  id,
});

export const fetchPlanSuccess = plan => ({
  type: FETCH_PLAN_SUCCESS,
  plan,
});

export const FETCH_NEWEST_REQUEST = 'plan/newest/REQUEST';
export const FETCH_NEWEST_FAILURE = 'plan/newest/FAILURE';
export const FETCH_NEWEST_SUCCESS = 'plan/newest/SUCCESS';

export const fetchNewestPlan = () => ({
  type: FETCH_NEWEST_REQUEST,
});

export const fetchNewestPlanSuccess = plan => ({
  type: FETCH_NEWEST_SUCCESS,
  plan,
});

export const FETCH_ALL_REQUEST = 'plan/all/REQUEST';
export const FETCH_ALL_FAILURE = 'plan/all/FAILURE';
export const FETCH_ALL_SUCCESS = 'plan/all/SUCCESS';

export const fetchAllPlans = () => ({
  type: FETCH_ALL_REQUEST,
});

export const fetchAllPlansSuccess = plans => ({
  type: FETCH_ALL_SUCCESS,
  plans,
});

export const CREATE_PLAN_REQUEST = 'plan/create/REQUEST';
export const CREATE_PLAN_FAILURE = 'plan/create/FAILURE';
export const CREATE_PLAN_SUCCESS = 'plan/create/SUCCESS';

export const createPlan = plan => ({
  type: CREATE_PLAN_REQUEST,
  plan,
})

export const createPlanSuccess = plan => ({
  type: CREATE_PLAN_SUCCESS,
  plan,
})
