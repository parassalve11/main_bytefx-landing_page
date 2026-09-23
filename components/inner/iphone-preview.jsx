import Image from 'next/image';

// The original transparent iPhone frame supplied for the inner pages.
export default function IPhonePreview({ src, alt, children, className = '' }) {
  return <div className={`iphone-preview ${className}`.trim()}>
    <div className="iphone-preview__screen">
      {src && <Image src={src} alt={alt} fill sizes="(max-width: 760px) 220px, 300px" />}
      {children}
    </div>
    <Image className="iphone-preview__frame" src="/assets/mobile/iphone-frame.png" alt="" width={941} height={1672} sizes="(max-width: 760px) 240px, 340px" />
  </div>;
}
