// src/middleware/apiMiddleware.js
const apiMiddleware = (store) => (next) => async (action) => {
    // Check if the action is an API call
    if (action.type.endsWith('/pending')) {
      // Optionally, you can handle loading state here
      console.log('Loading...');
    }
  
    // Pass the action to the next middleware or reducer
    const result = next(action);
  
    // Check if the action is fulfilled (successful API call)
    if (action.type.endsWith('/fulfilled')) {
      const { payload } = action;
  
      // Check if the payload has the expected structure
      if (payload && payload.success) {
        console.log('API call successful:', payload);
      } else {
        // Handle errors if the response format is not as expected
        console.error('API call failed:', payload);
      }
    }
  
    // Check if the action is rejected (failed API call)
    if (action.type.endsWith('/rejected')) {
      const { error } = action;
  
      // Handle the error response
      console.error('API call error:', error);
    }
  
    return result;
  };
  
  export default apiMiddleware;