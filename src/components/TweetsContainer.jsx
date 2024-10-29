import React, { useState } from 'react';
import styled from 'styled-components';
import {v4 as uuidv4} from 'uuid';
import {useStore} from '../../store/store';

const Container = styled.div`
    margin:20px;
    padding:20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Input = styled.input`
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;


const PublishButton = styled.button`
    background-color: #007bff;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover{
        background-color: #0056b3;
    }
`;

const TweetsContainer = () => {
    const [tweet, setTweet] = useState('');
    const [author, setAuthor] = useState('');
    const { setNewTweetAdded } = useStore();

    const handlePublish = async() => {
        if(tweet && author) {
            const newTweet = { id: uuidv4(),tweet, author }

            try {
                const response = await fetch(`https://gltyjw8nvl.execute-api.us-east-1.amazonaws.com/api/create`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newTweet),
                })

                if(!response.ok){
                    throw new Error('Error al crear el tweet');
                }

                const data = await response.json();
                console.log(data.message)
                setNewTweetAdded(true)

                setTweet('');
                setAuthor('');
            } catch (error) {
                console.log(error)
            }
        }else{
            alert("Porfavor completar los campos")
        }
    }


    return (
        <Container>
            <Input 
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Escribe tu nombre"
            />
            <TextArea
                value={tweet}
                onChange={(e) => setTweet(e.target.value)}
                placeholder="¿Que estas pensando?"
            />
            <PublishButton onClick={handlePublish}>Publicar</PublishButton>

        </Container>
    )


}

export default TweetsContainer