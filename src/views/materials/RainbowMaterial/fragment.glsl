uniform sampler2D uTexture;
uniform float amount;
uniform float offset;
uniform float time;

varying vec2 vUv;

vec3 rainbow2(in float t) {
  vec3 d = vec3(0.0f, 0.33f, 0.67f);
  return 0.5f + 0.5f * cos(6.28318f * (t + d));
}

void main() {
  vec2 p = vUv;
  vec3 origCol = texture2D(uTexture, p).rgb;

  vec2 off = texture2D(uTexture, p).rg - 0.5f;
  p += off * offset;
  vec3 rb = rainbow2((p.x + p.y + time * 2.0f) * 0.5f);

  vec3 col = mix(origCol, rb, amount);

  gl_FragColor = vec4(col, 1.0f);

}
