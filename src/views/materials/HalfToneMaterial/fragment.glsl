uniform sampler2D uTexture;
uniform vec2 center;
uniform vec2 tSize;
uniform float angle;
uniform float scale;
varying vec2 vUv;

float pattern() {
  float s = sin(angle), c = cos(angle);
  vec2 tex = vUv * tSize - center;
  vec2 point = vec2(c * tex.x - s * tex.y, s * tex.x + c * tex.y) * scale;
  return (sin(point.x) * sin(point.y)) * 4.0f;
}
void main() {
  vec4 color = texture2D(uTexture, vUv);
  float average = (color.r + color.g + color.b) / 3.0f;
  gl_FragColor = vec4(vec3(average * 10.0f - 5.0f + pattern()), color.a);
}