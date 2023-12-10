import './ImageItem.css';
import {ImageData} from "../types";
import { LiaCompass } from 'react-icons/lia';

interface IImageItemProps {
    image: ImageData;
    onClick: () => void;
}

export const ImageItem = ({ image, onClick }: IImageItemProps) => (
    <div className="image-item" onClick={onClick}>
        <img src={image.src} alt="Gallery Image" />
        <div className="azimuth">
            <LiaCompass />
            <div>{image.metadata?.azimuth}°</div>
        </div>
    </div>
);

