import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

import { Photo } from '../models/photo-location.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  photos: Photo[] = [];

  constructor(
    private camera: Camera,
    private storage: Storage,
    private http: HttpClient,
  ) {}

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
   * Select image from photo library
   */
  selectPictures() {
    this.camera
      .getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      })
      .then(pic => {
        this.photos.unshift({
          data: 'data:image/jpeg;base64,' + pic,
        });
      });
  }

  /**
   * Let's load the saved pictures
   */
  loadSaved() {
    this.storage.get('photos').then(photos => {
      this.photos = photos || [];
    });
  }

  /**
   * Handle uploading of a photo
   */
  uploadPhoto(imageData: any) {}
}
