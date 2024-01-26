uniform sampler2D uTexture;
uniform float dots;
uniform float size;
uniform float blur;

varying vec2 vUv;

void main() {
  float dotSize = 1.0f / dots;
  vec2 samplePos = vUv - mod(vUv, dotSize) + 0.5f * dotSize;
  float distanceFromSamplePoint = distance(samplePos, vUv);
  vec4 col = texture2D(uTexture, samplePos);
  vec4 base = vec4(0.f, 0.f, 0.f, 1.f);
  gl_FragColor = base + mix(col, vec4(0.0f), smoothstep(dotSize * size, dotSize * (size + blur), distanceFromSamplePoint));
}
