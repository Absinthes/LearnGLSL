uniform sampler2D uTexture;
uniform float time;
uniform float amount;
uniform float size;
uniform float speed;

varying vec2 vUv;

const float TWO_PI = 6.283185307179586f;

void main() {
  // 根据纹理坐标 vUv 计算出一个二维向量 p
  vec2 p = -1.0f + 2.0f * vUv;
  // 计算位置变量 pos，等于时间乘以 2 的派氏常数 π 加上向量 p 的长度乘以尺寸变量 size
  float pos = time * TWO_PI + length(p * size);
  // 设置着色器输出颜色为使用纹理 uTexture 采样得到的颜色，采样时的纹理坐标为 vUv 加上量变量 amount 乘以一个由余弦函数和正弦函数计算得到的二维向量
  gl_FragColor = texture2D(uTexture, vUv + amount * vec2(cos(pos), sin(pos)));
}
