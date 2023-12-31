import './ImageItem.css';
import {ImageData} from "../types";
import { LiaCompass } from 'react-icons/lia';

interface IImageItemProps {
    image: ImageData;
    onClick: () => void;
    selected: boolean
}

export const ImageItem = ({ image, onClick, selected }: IImageItemProps) => (
        <div className={`image-item ${selected ? 'selected' : ''}`} onClick={onClick}>
            <img src={image.src} alt="Gallery Image" />
            <div className="azimuth">
                <LiaCompass />
                <div>{image.metadata?.azimuth}°</div>
            </div>
        </div>
);
