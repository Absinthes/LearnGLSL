// 抖音特效主要是通过偏移UV和偏移UV颜色来完成的

uniform sampler2D uTexture;
varying vec2 vUv;
uniform float amount;
uniform float speed;
uniform float time;

float random1d(float n) {
  return fract(sin(n) * 43758.5453f);
}

float random2d(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898f, 4.1414f))) * 43758.5453f);
}

float randomRange(in vec2 seed, in float min, in float max) {
  return min + random2d(seed) * (max - min);
}

// 判断是否在区间内，在范围内是返回是1.0
float insideRange(float v, float bottom, float top) {
  return step(bottom, v) - step(top, v);
}

void main() {

  vec2 uv = vUv;

  float sTime = floor(time * speed * 6.f * 24.f);
  vec3 inCol = texture2D(uTexture, uv).rgb;

  vec3 outCol = inCol;

  float maxOffset = amount / 2.f;

  vec2 uvOff;

  for(float i = 0.f; i < 10.f; i += 1.f) {

    if(i > 10.f * amount)
      break;

    // 产生一个随机的Y值，产生一个随机的Height值，可以想象在画面上划分出一块区域
    float sliceY = random2d(vec2(sTime + amount, 2345.f + float(i)));
    float sliceH = random2d(vec2(sTime + amount, 9035.f + float(i))) * .25f;
    // 产生一个偏移值，范围在 -maxxOffset ~ maxOffset
    float hOffset = randomRange(vec2(sTime + amount, 9625.f + float(i)), -maxOffset, maxOffset);

    // 应用offset到uv上，并获取小数部分作为偏移值
    uvOff = uv;
    uvOff.x += hOffset;
    vec2 uvOff = fract(uvOff);

    // 判断是否在slice画出的区域内，如果在就把其在uv上的rgb值赋值给outCol
    if(insideRange(uv.y, sliceY, fract(sliceY + sliceH)) == 1.f) {
      outCol = texture2D(uTexture, uvOff).rgb;
    }
  }

  // 产生一个偏移，并应用到新uv上，不破坏原始uv的值
  float maxColOffset = amount / 6.f;
  vec2 colOffset = vec2(randomRange(vec2(sTime + amount, 3545.f), -maxColOffset, maxColOffset), randomRange(vec2(sTime, 7205.f), -maxColOffset, maxColOffset));

  uvOff = fract(uv + colOffset);

  // 生成一个随机数，当随机数小于0.33，将r通道的值赋给outCol.r，
  // 当随机数小于0.66，将g通道的值赋给outCol.g，
  // 当随机数小于1.0，将b通道的值赋给outCol.b。
  float rnd = random2d(vec2(sTime + amount, 9545.f));
  if(rnd < .33f) {
    outCol.r = texture2D(uTexture, uvOff).r;
  } else if(rnd < .66f) {
    outCol.g = texture2D(uTexture, uvOff).g;
  } else {
    outCol.b = texture2D(uTexture, uvOff).b;
  }
  gl_FragColor = vec4(outCol, 1.f);
}
