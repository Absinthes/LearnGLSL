// 总体思路是生成一个随机数，并添加到UV上

uniform sampler2D uTexture;
uniform float time;
uniform float amount;

varying vec2 vUv;

float random1d(float n) {
  return fract(sin(n) * 43758.5453f);
}

void main() {
  vec2 p = vUv;
  vec2 offset = (vec2(random1d(time), random1d(time + 999.99f)) - 0.5f) * amount;
  p += offset;
  gl_FragColor = texture2D(uTexture, p);
}
