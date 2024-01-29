export function requestAnimationFramePromise() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve(true);
    });
  });
}

export function setUniforms(
  target: Record<string, any>,
  values: Record<string, any>,
  callbackFn = (value: any, key: string) => value
) {
  Object.keys(values).forEach((key) => {
    if (!Object.hasOwn(target, key)) return;
    target[key].value = callbackFn(values[key], key);
  });
}
