import sharp, { fit as _fit } from 'sharp';
import uuidv4 from 'uuid/v4';
import { resolve } from 'path';

class Resize {
  constructor(folder) {
    this.folder = folder;
  }
  async save(buffer) {
    const filename = Resize.filename();
    const filepath = this.filepath(filename);

    await sharp(buffer)
      .resize(384, 492, { 
        fit: _fit.inside,
        withoutEnlargement: true
      })
      .toFile(filepath);
    console.log('chạy vô đây')
    return filename;
  }
  static filename() {
     // random file name
    return `${uuidv4()}.png`;
  }
  filepath(filename) {
    return resolve(`${this.folder}/${filename}`)
  }
}
export default Resize;