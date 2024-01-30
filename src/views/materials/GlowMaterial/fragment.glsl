uniform sampler2D uTexture;
uniform float strength;
uniform float size;
uniform vec2 resolution;
uniform float cutOff;

varying vec2 vUv;

void main() {

  float h = size / resolution.x;
  float v = size / resolution.y;

  vec4 sum = vec4(0.0f);

  //H Blur
  sum += (texture2D(uTexture, vec2(vUv.x - 4.0f * h, vUv.y)) - cutOff) * 0.051f;
  sum += (texture2D(uTexture, vec2(vUv.x - 3.0f * h, vUv.y)) - cutOff) * 0.0918f;
  sum += (texture2D(uTexture, vec2(vUv.x - 2.0f * h, vUv.y)) - cutOff) * 0.12245f;
  sum += (texture2D(uTexture, vec2(vUv.x - 1.0f * h, vUv.y)) - cutOff) * 0.1531f;
  sum += (texture2D(uTexture, vec2(vUv.x, vUv.y)) - cutOff) * 0.1633f;
  sum += (texture2D(uTexture, vec2(vUv.x + 1.0f * h, vUv.y)) - cutOff) * 0.1531f;
  sum += (texture2D(uTexture, vec2(vUv.x + 2.0f * h, vUv.y)) - cutOff) * 0.12245f;
  sum += (texture2D(uTexture, vec2(vUv.x + 3.0f * h, vUv.y)) - cutOff) * 0.0918f;
  sum += (texture2D(uTexture, vec2(vUv.x + 4.0f * h, vUv.y)) - cutOff) * 0.051f;

  //V Blur    
  sum += (texture2D(uTexture, vec2(vUv.x, vUv.y - 4.0f * v)) - cutOff) * 0.051f;
  sum += (texture2D(uTexture, vec2(vUv.x, vUv.y - 3.0f * v)) - cutOff) * 0.0918f;
  sum += (texture2D(uTexture, vec2(vUv.x, vUv.y - 2.0f * v)) - cutOff) * 0.12245f;
  sum += (texture2D(uTexture, vec2(vUv.x, vUv.y - 1.0f * v)) - cutOff) * 0.1531f;
  sum += (texture2D(uTexture, vec2(vUv.x, vUv.y)) - cutOff) * 0.1633f;
  sum += (texture2D(uTexture, vec2(vUv.x, vUv.y + 1.0f * v)) - cutOff) * 0.1531f;
  sum += (texture2D(uTexture, vec2(vUv.x, vUv.y + 2.0f * v)) - cutOff) * 0.12245f;
  sum += (texture2D(uTexture, vec2(vUv.x, vUv.y + 3.0f * v)) - cutOff) * 0.0918f;
  sum += (texture2D(uTexture, vec2(vUv.x, vUv.y + 4.0f * v)) - cutOff) * 0.051f;

  //get original pixel color
  vec4 base = texture2D(uTexture, vUv);

  //Additive Blend
  gl_FragColor = base + max(sum, 0.0f) * strength;
}
