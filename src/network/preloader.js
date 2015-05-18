import getFile from './getFile';

export default class Preloader {
  constructor (files, onOneFileReady, onAllFilesReady) {
    this.files            = files;
    this.nbEnQueue        = 0;
    this.onOneFileReady   = onOneFileReady;
    this.onAllFilesReady  = onAllFilesReady;
  }

  load () {
    let onSucces = (req) => {
      this.onOneFileReady(file, req);
      this.nbEnQueue--;
      if (this.nbEnQueue === 0) {
        this.onAllFilesReady();
      }
    };

    let onFailure = (req) => {
      console.error(`failed at loading file: ${file}`);
    };

    this.files.map((file) => {
      this.nbEnQueue++;

      getFile(file, onSuccess, onFailure);
    });
  }
}
