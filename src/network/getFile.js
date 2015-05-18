export default function getFile(url, onSuccess, onError) {
  let xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    const DONE = this.DONE || 4;

    if (this.readyState === DONE) {
      if (this.status == 200) {
        onSuccess && onSuccess(this);
      } else {
        onError && onError();
      }
    };
  }

  xhr.open('GET', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  xhr.send(null);
}
