import QRCode from 'react-qr-code';

const QRCodeWithFrame = ({ value,size,qrRef }) => (

  <div
    style={{
      display: 'inline-block',
      position: 'relative',
      padding: '15px', 
      backgroundColor: 'transparent', 
    }}
  >
  <div ref={qrRef} className='border p-5'>
    <QRCode
      size={size}
      bgColor='#ffffff'
      style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
      value={value}
      viewBox={`0 0 256 256`}
    />
    </div>
    
  </div>
);

export default QRCodeWithFrame;
