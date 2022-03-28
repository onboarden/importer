const URL = 'https://app.onboarden.io';

type OnCompletedResult = {
  rows: string[][];
};

type LaunchArgs = {
  templateId: string;
  jwt?: string;
  onCompleted?: (result: OnCompletedResult) => void;
};

export const launch = ({ templateId, jwt, onCompleted }: LaunchArgs) => {
  const div = document.createElement('div');
  div.style.cssText =
    'position:fixed;top:0;left:0;width:100%;height:100%;z-index:100;background-color:rgba(100,100,100,0.3);padding:32px;box-sizing:border-box;';
  document.body.appendChild(div);

  const iframe = document.createElement('iframe');
  iframe.src = encodeURI(`${URL}/t/${templateId}`);
  iframe.style.cssText =
    'width:100%;height:100%;background-color:white;margin:auto;border-radius:10px;box-shadow:0,0,15px,rgba(0,0,0,.2)';
  iframe.onload = () => {
    iframe.contentWindow?.postMessage({ source: 'onboarden', jwt }, URL);
  };
  div.appendChild(iframe);

  window.addEventListener('message', (event) => {
    if (event.origin !== URL) return;

    switch (event.data.status) {
      case 'succeeded':
        onCompleted && onCompleted({ rows: event.data.rows ?? [] });
        document.body.removeChild(div);
        break;
      case 'failed':
        break;
      default:
        break;
    }
  });

  const closeButton = document.createElement('button');
  closeButton.textContent = '❌';
  closeButton.style.cssText = 'position:fixed;top:6px;right:6px;cursor:pointer;';
  closeButton.onclick = () => document.body.removeChild(div);
  div.appendChild(closeButton);
};
