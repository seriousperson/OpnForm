export const useDevHelper = (message, value, alert = true) => {
  // Check if the window object exists
  if (typeof window !== 'undefined') {
    if (alert) {
      // window.alert(`DEV: ${message} => ${JSON.stringify(value)}`);
    }
    console.log(`DEV: ${message}`, value);
  } else {
    // Handle the case where the window object doesn't exist
    // console.error('The window object is not available.');
  }
}
