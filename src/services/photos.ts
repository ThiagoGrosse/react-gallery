import { storage } from "../libs/firebase";
import { Photo } from "../types/Photo";
import {
    ref,
    listAll,
    getDownloadURL,
    uploadBytes,
    deleteObject,
} from "firebase/storage";
import { v4 as createId } from "uuid";

export const getAll = async () => {
    let list: Photo[] = [];

    const imagesFolder = ref(storage, "images");
    const photoList = await listAll(imagesFolder);

    for (let i in photoList.items) {
        let photoRef = photoList.items[i];
        let photoUrl = await getDownloadURL(photoRef);

        list.push({
            name: photoRef.name,
            url: photoUrl,
        });
    }

    return list;
};

export const insert = async (file: File) => {
    if (["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        let randomName = createId();
        let newFile = ref(storage, "images/" + randomName);
        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref);

        return {
            name: upload.ref.name,
            url: photoUrl,
        } as Photo;
    } else {
        return new Error("Tipo de arquivo não permitido");
    }
};

export const removeImageFromStorage = async (imageName: string) => {
    try {
        const storageRef = ref(storage, "images/" + imageName);

        // Exclui o objeto (imagem) do Storage
        await deleteObject(storageRef);

        console.log("Imagem removida com sucesso do Storage do Firebase!");
    } catch (error) {
        console.error(
            "Erro ao remover a imagem do Storage do Firebase:",
            error
        );
    }
};
