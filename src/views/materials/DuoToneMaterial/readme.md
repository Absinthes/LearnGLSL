该 glsl 函数是片段着色器的一部分，用于计算并输出每个像素的颜色值。具体步骤如下：

1. vec3 col = texture2D(uTexture, vUv).rgb;：从给定的二维纹理（uniform 变量 uTexture）中采样颜色，采样坐标由变量 vUv 提供。获取到的颜色是一个 RGB 向量。
2. 注释掉的两行代码表明这里省略了对颜色值亮度和对比度的操作：

   - col += brightness;：如果启用，会将全局亮度值添加到采样的颜色上。
   - col = boostContrast(col, contrast);：如果启用，会使用自定义的 boostContrast 函数调整颜色的对比度。

3. col = clamp(col, 0.0f, 1.0f);：确保颜色值在 0.0 到 1.0 之间，这是颜色编码的合法范围。超过这个范围的颜色值会被压缩到边界值。
4. col = mix(colDark, colLight, luma(col));：根据当前颜色的亮度(luma 函数计算)来混合两种预设的颜色——暗色(colDark)和亮色(colLight)，实现基于亮度的色彩映射。
5. gl_FragColor = vec4(col, 1.0f);：设置片段着色器的输出颜色为最终处理后的颜色值 col，并且 alpha 通道固定为 1.0，表示完全不透明。
