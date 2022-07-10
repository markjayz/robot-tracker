import { HttpException, Injectable } from '@nestjs/common';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-identicon-sprites';

@Injectable()
export class AvatarService {
  generateAvatar() {
    let svg = createAvatar(style, {});
    return JSON.stringify(svg);
  }
}
