import getFile from './getFile';

export default class Preloader {
  constructor (files, onOneFileReady, onAllFilesReady) {
    this.files            = files;
    this.nbEnQueue        = 0;
    this.onOneFileReady   = onOneFileReady || null;
    this.onAllFilesReady  = onAllFilesReady || null;
  }

  load () {
    let onSuccess;
    let onFailure;

    this.files.map((file) => {
      this.nbEnQueue++;

      onSuccess = (req) => {
        this.onOneFileReady(file, req);
        this.nbEnQueue--;

        if (this.nbEnQueue === 0) {
          this.onAllFilesReady && this.onAllFilesReady();
        }
      };

      onFailure = (req) => {
        console.error(`failed at loading file: ${file}`);
      };

      getFile(file, onSuccess, onFailure);
    });
  }
}
