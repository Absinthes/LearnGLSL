uniform sampler2D uTexture;
uniform float amount;
uniform float darkness;
varying vec2 vUv;

void main() {
  vec4 texel = texture2D(uTexture, vUv);
  vec2 uv = (vUv - vec2(0.5f)) * vec2(amount);
  gl_FragColor = vec4(mix(texel.rgb, vec3(1.0f - darkness), dot(uv, uv)), texel.a);
}