import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function FullscreenButton() {
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    handleFullscreenChange();
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleFullscreen}
        style={{
          padding: '6px 12px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          backgroundColor: '#1e293b',
          color: '#ffffff',
          border: '1px solid #475569',
          borderRadius: '6px',
          fontSize: '13px',
        }}
      >
        <span>{fullscreen ? 'خروج من الشاشة الكاملة' : 'ملء الشاشة'}</span>
      </button>
      {fullscreen && createPortal(
        <button type="button" className="fullscreen-exit-button" onClick={exitFullscreen}>
          Exit full screen
        </button>,
        document.body,
      )}
    </>
  );
}
