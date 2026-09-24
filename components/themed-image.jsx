import Image from 'next/image';

/* Use the existing CSS theme, with a stable image box when source ratios differ. */
export default function ThemedImage({ src, light, alt = '', className = '', frameRatio, style, ...props }) {
  const imageStyle = { ...(frameRatio ? { aspectRatio: frameRatio } : {}), objectFit: 'contain', ...style };
  return <>
    <Image {...props} src={src} alt={alt} className={className + ' theme-art--dark asset-variant'} style={imageStyle} unoptimized={src.startsWith('/assets/supplied/')} />
    <Image {...props} src={light} alt={alt} className={className + ' theme-art--light asset-variant'} style={imageStyle} unoptimized={light.startsWith('/assets/supplied/')} />
  </>;
}
