uniform sampler2D uTexture;
uniform float brightness;
uniform float contrast;
varying vec2 vUv;

void main() {
  gl_FragColor = texture2D(uTexture, vUv);
  gl_FragColor.rgb += brightness;
  if(contrast > 0.0f) {
    gl_FragColor.rgb = (gl_FragColor.rgb - 0.5f) / (1.0f - contrast) + 0.5f;
  } else {
    gl_FragColor.rgb = (gl_FragColor.rgb - 0.5f) * (1.0f + contrast) + 0.5f;
  }
}