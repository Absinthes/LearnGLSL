uniform sampler2D uTexture;
uniform float time;
uniform float amount;
uniform float size;
uniform float speed;

varying vec2 vUv;

const float TWO_PI = 6.283185307179586f;

void main() {
  vec2 p = -1.0f + 2.0f * vUv;
  float pos = time * TWO_PI + length(p * size);
  gl_FragColor = texture2D(uTexture, vUv + amount * vec2(cos(pos), sin(pos)));
}
