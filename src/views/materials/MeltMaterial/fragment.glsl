uniform sampler2D uTexture;
uniform float time;
uniform float scale;
uniform float amount;
uniform float speed;
varying vec2 vUv;

//
// Description : Array and textureless GLSL 2D simplex noise function.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
//

vec3 mod289(vec3 x) {
  return x - floor(x * (1.f / 289.f)) * 289.f;
}

vec2 mod289(vec2 x) {
  return x - floor(x * (1.f / 289.f)) * 289.f;
}

vec3 permute(vec3 x) {
  return mod289(((x * 34.f) + 1.f) * x);
}

float noise2d(vec2 v) {
  const vec4 C = vec4(.211324865405187f,// (3.0-sqrt(3.0))/6.0
  .366025403784439f,// 0.5*(sqrt(3.0)-1.0)
  -.577350269189626f,// -1.0 + 2.0 * C.x
  .024390243902439f);// 1.0 / 41.0
  // First corner
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  // Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.f, 0.f) : vec2(0.f, 1.f);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  // Permutations
  i = mod289(i);// Avoid truncation effects in permutation
  vec3 p = permute(permute(i.y + vec3(0.f, i1.y, 1.f)) + i.x + vec3(0.f, i1.x, 1.f));

  vec3 m = max(.5f - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.f);
  m = m * m;
  m = m * m;

  // Gradients: 41 points uniformly over a line, mapped onto a diamond.
  // The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.f * fract(p * C.www) - 1.f;
  vec3 h = abs(x) - .5f;
  vec3 ox = floor(x + .5f);
  vec3 a0 = x - ox;

  // Normalise gradients implicitly by scaling m
  // Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159f - .85373472095314f * (a0 * a0 + h * h);

  // Compute final noise value at P
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.f * dot(m, g);
}

float getNoise(vec2 uv, float t) {
  //generate multi-octave noise based on uv position and time
  //move noise  over time
  //scale noise position relative to center
  uv -= .5f;
  //octave 1
  float scl = 4.f * scale;
  float noise = noise2d(vec2(uv.x * scl, uv.y * scl - t * speed));
  //octave 2
  scl = 16.f * scale;
  noise += noise2d(vec2(uv.x * scl + t * speed, uv.y * scl)) * .2f;
  //octave 3
  scl = 26.f * scale;
  noise += noise2d(vec2(uv.x * scl + t * speed, uv.y * scl)) * .2f;
  return noise;
}

void main() {
  vec2 uv = vUv;
  float noise = getNoise(uv, time * 24.f);
  vec2 noiseUv = uv + amount * noise;
  //wrap
  noiseUv = fract(noiseUv);
  gl_FragColor = texture2D(uTexture, noiseUv);
}
