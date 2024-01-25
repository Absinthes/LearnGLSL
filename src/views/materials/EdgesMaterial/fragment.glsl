uniform sampler2D uTexture;
uniform float amount;
uniform float passthru;
varying vec2 vUv;

vec2 texel = vec2(1.f / 512.f);

mat3 G[2];

const mat3 g0 = mat3(1.f, 2.f, 1.f, 0.f, 0.f, 0.f, -1.f, -2.f, -1.f);
const mat3 g1 = mat3(1.f, 0.f, -1.f, 2.f, 0.f, -2.f, 1.f, 0.f, -1.f);

void main(void) {
  mat3 I;
  float cnv[2];
  vec3 _sample;

  G[0] = g0;
  G[1] = g1;

  /* fetch the 3x3 neighbourhood and use the RGB vectors length as intensity value */
  for(float i = 0.0f; i < 3.0f; i++) {
    for(float j = 0.0f; j < 3.0f; j++) {
      _sample = texture2D(uTexture, vUv + texel * vec2(i - 1.0f, j - 1.0f)).rgb;
      I[int(i)][int(j)] = length(_sample);
    }
  }

  /* calculate the convolution values for all the masks */
  for(int i = 0; i < 2; i++) {
    float dp3 = dot(G[i][0], I[0]) + dot(G[i][1], I[1]) + dot(G[i][2], I[2]);
    cnv[i] = dp3 * dp3;
  }

  vec4 orig = texture2D(uTexture, vUv);

  gl_FragColor = orig * passthru + vec4(.5f * sqrt(cnv[0] * cnv[0] + cnv[1] * cnv[1])) * amount;
}
