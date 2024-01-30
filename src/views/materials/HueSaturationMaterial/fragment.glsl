uniform sampler2D uTexture;
uniform float hue;
uniform float saturation;
varying vec2 vUv;

void main() {
  gl_FragColor = texture2D(uTexture, vUv);
  float angle = hue * 3.14159265f;
  float s = sin(angle), c = cos(angle);
  vec3 weights = (vec3(2.0f * c, -sqrt(3.0f) * s - c, sqrt(3.0f) * s - c) + 1.0f) / 3.0f;
  float len = length(gl_FragColor.rgb);
  gl_FragColor.rgb = vec3(dot(gl_FragColor.rgb, weights.xyz), dot(gl_FragColor.rgb, weights.zxy), dot(gl_FragColor.rgb, weights.yzx));
  float average = (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b) / 3.0f;
  if(saturation > 0.0f) {
    gl_FragColor.rgb += (average - gl_FragColor.rgb) * (1.0f - 1.0f / (1.001f - saturation));
  } else {
    gl_FragColor.rgb += (average - gl_FragColor.rgb) * (-saturation);
  }
}