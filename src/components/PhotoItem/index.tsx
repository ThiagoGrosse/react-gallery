import { Photo } from '../../types/Photo';
import * as C from './styles';

type Props = {
    photo: Photo;
    onRemove: (photoName: string) => void;
}

export const PhotoItem = ({ photo, onRemove }: Props) => {

    return (
        <C.Container>
            <C.ContainerButton>
                <C.ButtonRemove onClick={() => onRemove(photo.name)}>X</C.ButtonRemove>
            </C.ContainerButton>
            <img src={photo.url} alt={photo.name} />
            <div>{photo.name}</div>
        </C.Container>
    )
}