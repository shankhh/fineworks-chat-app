import React, { useState, useEffect, useRef } from "react"
import { useHistory } from "react-router-dom"
import { ChatEngine } from 'react-chat-engine'
import { auth } from "../firebase"
import axios from 'axios'
import { useAuth } from "../contexts/AuthContext"

// import { PhotosSettings } from 'react-chat-engine';
// import { ChatList } from 'react-chat-engine';

const Chats = () => {


    const history = useHistory()
    const user = useAuth();
    // console.log("userAuth", useAuth());

    const [loading, setLoading] = useState(true)
    const handleLogout = async () => {
        await auth.signOut()
        history.push("/")
    }


    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' });
    }


    useEffect(() => {
        console.log("user in chat.js", user);
        if (!user) {
            console.log("redirecting because no user exists")
            history.push("/")
            return
        }

        // Get-or-Create should be in a Firebase Function
        axios.get('https://api.chatengine.io/users/me/',
            {
                headers: {
                    "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                    "user-name": user.email,
                    "user-secret": user.uid
                }
            }
        )
        .then((data) => {
            console.log("data",data);
            setLoading(false)
        })
        .catch(e => {
            console.log("error", e)
            console.log("in error block of chatjs");
            let formdata = new FormData()
            formdata.append('email', user.email)
            formdata.append('username', user.email)
            formdata.append('secret', user.uid)

            getFile(user.photoURL)
                .then(avatar => {
                    console.log("avatar", avatar)
                    formdata.append('avatar', avatar, avatar.name)
                    axios.post(
                        'https://api.chatengine.io/users/',
                        formdata,
                        { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY } })
                        .then(() => setLoading(false))
                        .catch((error) => console.log(error))
                })
                .catch(e => {
                    console.log("error line 97", e);
                })
                setLoading(false);
            })
    }, [user, history])

    if (!user || loading) return 'Loading...'

    return (
        
        <div className='chat-container'>
        <div className='chats-page'>
            <div className='nav-bar'>
                <div onClick={() =>{}}className='logo-tab' title='FINEWORKS TECHNOLOGIES'>
                    fineworks-chat-app
                </div>
                <div 
                onClick={() =>{
                    history.push("/dashboard");
                }} 
                className='dash-tab' 
                title='Dashboard'>
                Dashboard
                </div>
                <div onClick={handleLogout} className='logout-tab' title='Log Out'>
                Log Out
                </div>
            </div>
            <div className='chat-back'>
                <div className='chat-border'>
                <ChatEngine
                height='calc(100vh - 10rem)'
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.email}
                userSecret={user.uid}
                renderPhotosSettings={(chat) => {}}/></div>
        </div>
        </div>
        <div className='footer'>footer banao</div> 
        </div>

    );
}

export default Chats