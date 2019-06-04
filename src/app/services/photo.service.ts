import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';

import { Photo } from '../models/photo-location.model';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  photos: Photo[] = [];

  constructor(private camera: Camera, private storage: Storage) {}

  /**
   * Let's take a picture
   */
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      imageData => {
        // add new photo to the gallery
        this.photos.unshift({
          data: 'data:image/jpeg;base64,' + imageData,
        });

        // Save all photos for later viewing
        this.storage.set('photos', this.photos);
      },
      err => {
        // Handle error
        console.log('Camera issue:' + err);
      },
    );
  }

  /**
   * Let's load the saved pictures
   */
  loadSaved() {
    this.storage.get('photos').then(photos => {
      this.photos = photos || [];
    });
  }
}
