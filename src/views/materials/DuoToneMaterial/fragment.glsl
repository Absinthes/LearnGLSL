uniform sampler2D uTexture;
uniform vec3 colLight;
uniform vec3 colDark;

varying vec2 vUv;

//从颜色中获取亮度
float luma(vec3 color) {
  return dot(color, vec3(0.299f, 0.587f, 0.114f));
}

//增加图像的对比度
vec3 boostContrast(vec3 col, float amount) {
  return (col - 0.5f) / (1.0f - amount) + 0.5f;
}

void main() {
  vec3 col = texture2D(uTexture, vUv).rgb;
  //col += brightness;
  //col = boostContrast(col,contrast);
  col = clamp(col, 0.0f, 1.0f);
  col = mix(colDark, colLight, luma(col));
  gl_FragColor = vec4(col, 1.0f);
}
