import styled from "styled-components";

export const Container = styled.div`
    background-color: #3d3f43;
    border-radius: 10px;
    padding: 10px;

    img {
        max-width: 100%;
        display: block;
        border-radius: 10px;
    }

    &:hover > div > button {
        opacity: 1;
    }
`;
export const ContainerButton = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: end;
    align-items: start;
`;

export const ButtonRemove = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background-color: #3d3f43;
    color: #fff;
    border: none;
    border-radius: 50%;
    font-size: 14px;
    cursor: pointer;
    position: absolute;
    opacity: 0;

    &:hover {
        background-color: #000;
    }

    &:focus {
        outline: none;
    }
`;
