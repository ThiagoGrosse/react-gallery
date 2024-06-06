import { FormEvent, useEffect, useState } from 'react';
import * as C from './App.styles';
import * as Photos from './services/photos';
import { Photo } from './types/Photo';
import { PhotoItem } from './components/PhotoItem';

function App() {
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const getPhotos = async () => {
            setLoading(true);
            setPhotos(await Photos.getAll());
            setLoading(false);
        };

        getPhotos();
    }, []);

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const file = formData.get('image') as File;

        if (file && file.size > 0) {
            setUploading(true);
            let result = await Photos.insert(file);
            setUploading(false);

            if (result instanceof Error) {
                alert(`${result.name} - ${result.message}`);
            } else {
                let newPhotoList = [...photos];
                newPhotoList.push(result);
                setPhotos(newPhotoList);
            }
        }
    }

    const handleRemoveImage = async (photoName: string) => {
        try {
            await Photos.removeImageFromStorage(photoName);

            const updatedPhotos = await Photos.getAll();
            setPhotos(updatedPhotos);
        } catch (error) {
            console.error('Erro ao remover a imagem:', error);
        }
    }

    return (
        <C.Container>
            <C.Area>
                <C.Header>Galeria de Fotos</C.Header>

                {/* Área de upload */}

                <C.UploadForm method='POST' onSubmit={handleFormSubmit}>
                    <input type="file" name="image" />
                    <button type="submit">Enviar</button>
                    {uploading && "Enviando..."}
                </C.UploadForm>



                {/* Lista de fotos */}

                {loading && (
                    <C.ScreenWarning>
                        <div className="emoji">✋</div>
                        <div>Carregando...</div>
                    </C.ScreenWarning>
                )}

                {!loading && photos.length > 0 && (
                    <C.PhotoList>
                        {photos.map((photo, index) => (
                            <PhotoItem photo={photo} key={index} onRemove={handleRemoveImage} />
                        ))}
                    </C.PhotoList>
                )}

                {!loading && photos.length === 0 && (
                    <C.ScreenWarning>
                        <div className="emoji">😞</div>
                        <div>Não há fotos disponíveis.</div>
                    </C.ScreenWarning>
                )}
            </C.Area>
        </C.Container>
    );
}

export default App;
