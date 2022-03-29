import CLOSE_BUTTON_BASE64 from './closeButton';

const URL = 'https://app.onboarden.io';

export type OnCompletedResult = {
  rows: { [key: string]: string }[];
  rowArray: string[][];
};

type LaunchArgs = {
  templateId: string;
  jwt?: string;
  onCompleted?: (result: OnCompletedResult) => void;
};

export const launch = ({ templateId, jwt, onCompleted }: LaunchArgs) => {
  const div = document.createElement('div');
  div.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;z-index:100;background-color:rgba(0,0,0,0.7);padding:40px;box-sizing:border-box;backdrop-filter: blur(4px);';
  document.body.appendChild(div);

  const iframe = document.createElement('iframe');
  iframe.src = encodeURI(`${URL}/t/${templateId}`);
  iframe.style.cssText =
    'width:100%;height:100%;background-color:white;margin:auto;border-radius:10px;border:none;box-shadow:0 0 20px rgba(0,0,0,0.2);';
  iframe.onload = () => {
    iframe.contentWindow?.postMessage({ source: 'onboarden', jwt }, URL);
  };
  div.appendChild(iframe);

  window.addEventListener('message', (event) => {
    if (event.origin !== URL) return;

    switch (event.data.status) {
      case 'succeeded':
        onCompleted && onCompleted({ rows: event.data.rows ?? [], rowArray: event.data.rowArray ?? [] });
        document.body.removeChild(div);
        break;
      case 'failed':
        break;
      default:
        break;
    }
  });

  const closeImage = document.createElement('img');
  closeImage.src = CLOSE_BUTTON_BASE64;

  closeImage.style.cssText = 'position:fixed;top:8px;right:8px;cursor:pointer;width:28px;';
  closeImage.onclick = () => document.body.removeChild(div);
  div.appendChild(closeImage);
};
