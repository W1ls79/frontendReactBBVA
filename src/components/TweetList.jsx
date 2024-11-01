import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {useStore} from '../../store/store';

const Container = styled.div`
    margin:20px;
    padding:20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
`;

const TweetItem = styled.div`
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Button = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
`;

const ResponseContainer = styled.div`
    margin-top: 10px;

`;

const TweetList = () => {
    const [tweets, setTweets] = useState([]);
    const [response, setResponse] = useState('');
    const [responseName, setResponseName] = useState('');
    const [replyingIndex, setReplyingIndex] = useState(null);
    const { newTweetAdded, setNewTweetAdded } = useStore();

    useEffect(() => {
        const fetchTweets = async () => {     
            try {
                const res = await fetch(`https://ykxlvllmz3.execute-api.us-east-1.amazonaws.com/TwiterC`);
                if(!res.ok){
                    throw new Error('Error al obtener los tweets');
                }
                
                const data = await res.json();
                const {Items} = JSON.parse(data.body)
                console.log(Items)
                setTweets(Items);
                setNewTweetAdded(false)
            } catch (error) {
                console.log(error)
            }
        }


        fetchTweets();

    }, [newTweetAdded])
    


    useEffect(() => {
        const storedTweets = JSON.parse(localStorage.getItem('tweets')) || [];
        setTweets(storedTweets);
    }, [])

    const handleLike = (index) => {
        alert('te gusta el tweet del autor ' + tweets[index].author);
    }

    const handleReply = (index) => {
        setReplyingIndex(index);
    }

    const handlePublishResponse = async (index) => {
        if (responseName && response) {
            const tweet = tweets[index];

            const params = {
                id: tweet.id,
                author: responseName,
                comment: response
            }

            try {
                const res = await fetch(`https://ykxlvllmz3.execute-api.us-east-1.amazonaws.com/TwiterC`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(params),
                });

                if(!res.ok){
                    throw new Error('Error al crear el tweet');
                }
                
            console.log(res)
            setNewTweetAdded(false)
            setResponse('');
            setResponseName('');
            setReplyingIndex(null);


            } catch (error) {
                console.log(error)
            }

        }else{
            alert("Porfavor completar los campos")
        }
    }

    return (
        <Container>
            {tweets.map((tweet, index) => (
                <TweetItem key={index}>
                <strong>{tweet.author}:</strong> {tweet.tweet}
                <div>
                <Button onClick={() => handleLike(index)}>Like</Button>
                <Button onClick={() => handleReply(index)}>Reply</Button>
                </div>
                {
                    replyingIndex === index && ( 
                        <ResponseContainer>
                        <input 
                            type="text" 
                            placeholder="Nombre" 
                            value={responseName} 
                            onChange={(e) => setResponseName(e.target.value)}
                        />
                        <textarea 
                            placeholder="Respuesta" 
                            value={response} 
                            onChange={(e) => setResponse(e.target.value)}
                        />
                        <Button onClick={() => handlePublishResponse(index)}>Publicar</Button>
                        </ResponseContainer>


                    )}
                    {
                        tweet.response && (
                            <div>
                                <strong>{tweet.response.name}:</strong> {tweet.response.response}
                            </div>
                        )
                    }
                </TweetItem>
            ))}

        </Container>

    )


}

export default TweetList
