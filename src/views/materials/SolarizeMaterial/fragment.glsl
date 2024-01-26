uniform sampler2D uTexture;

uniform float centerBrightness;
uniform float powerCurve;
uniform float colorize;

varying vec2 vUv;

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0f, -1.0f / 3.0f, 2.0f / 3.0f, -1.0f);
  vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
  vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10f;
  return vec3(abs(q.z + (q.w - q.y) / (6.0f * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0f, 2.0f / 3.0f, 1.0f / 3.0f, 3.0f);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0f - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0f, 1.0f), c.y);
}

void main() {
  vec3 origCol = texture2D(uTexture, vUv).rgb;

  //convert to HSV
  vec3 hslColor = rgb2hsv(origCol);
  vec3 outColor = hslColor;

  //adjust the brightness curve
  outColor.b = pow(outColor.b, powerCurve);
  outColor.b = (outColor.b < centerBrightness) ? (1.0f - outColor.b / centerBrightness) : (outColor.b - centerBrightness) / centerBrightness;
  outColor.g = outColor.g * hslColor.b * colorize;

  //convert back to rgb
  outColor = hsv2rgb(outColor);

  //Additive Blend
  gl_FragColor = vec4(outColor, 1.0f);
}
