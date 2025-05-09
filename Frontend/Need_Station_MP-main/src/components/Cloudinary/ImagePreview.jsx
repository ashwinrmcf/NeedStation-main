import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from '@cloudinary/react';
import { auto, autoGravity } from "@cloudinary/url-gen/actions/resize";

const ImagePreview = () => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dchmvabfy' } });

  const img = cld
    .image('cld-sample-5')
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(500).height(500));

  return <AdvancedImage cldImg={img} />;
};

export default ImagePreview;
