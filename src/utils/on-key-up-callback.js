export const onKeyUpCallback = (event, callback, args = []) => () => {
  if (event?.which !== 13) return;
  callback(...args);
};
