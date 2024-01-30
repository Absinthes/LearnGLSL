uniform sampler2D uTexture;
uniform float amount;
uniform float position;
varying vec2 vUv;
void main() {
  vec4 sum = vec4(0.0f);
  float vv = amount * abs(position - vUv.y);
  sum += texture2D(uTexture, vec2(vUv.x, vUv.y - 4.0f * vv)) * 0.051f;
  sum += texture2D(uTexture, vec2(vUv.x, vUv.y - 3.0f * vv)) * 0.0918f;
  sum += texture2D(uTexture, vec2(vUv.x, vUv.y - 2.0f * vv)) * 0.12245f;
  sum += texture2D(uTexture, vec2(vUv.x, vUv.y - 1.0f * vv)) * 0.1531f;
  sum += texture2D(uTexture, vec2(vUv.x, vUv.y)) * 0.1633f;
  sum += texture2D(uTexture, vec2(vUv.x, vUv.y + 1.0f * vv)) * 0.1531f;
  sum += texture2D(uTexture, vec2(vUv.x, vUv.y + 2.0f * vv)) * 0.12245f;
  sum += texture2D(uTexture, vec2(vUv.x, vUv.y + 3.0f * vv)) * 0.0918f;
  sum += texture2D(uTexture, vec2(vUv.x, vUv.y + 4.0f * vv)) * 0.051f;

  gl_FragColor = sum;
}