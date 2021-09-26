import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { auth } from "../firebase";

import { useAuth } from "../contexts/AuthContext"

const Dashboard = () => {
    const history = useHistory();
    const user = useAuth();

    const [details, setDetails] = useState(null);

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
        if (!user) {
            history.push("/")
            return
        }

        console.log("user",user);

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
            .then((response) => {
                console.log("response on user",response);
                setDetails(response.data);
                console.log("details", response.data);
            })
            .catch(e => {
                console.log(e);
                // getFile(user.photoURL)
                //     .then(avatar => {
                //         axios.post(
                //             'https://api.chatengine.io/users/',
                //             { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY } })
                //             .then((response) => {
                //                 console.log("user", user);
                //                 console.log(response);
                //             })
                //             .catch((error) => console.log(error))
                //     })
            })
    }, [user, history])

    // if (!user || loading) return 'Loading...'

    return ( 
    <div className='chat-container'>
        <div className='chats-page'>
            <div className='nav-bar'>
                <div onClick={() =>{}}className='logo-tab' title='FINEWORKS TECHNOLOGIES'>
                    fineworks-chat-app
                </div>
                <div 
                    onClick={() =>{
                        history.push("/chats"); }} 
                    className='dash-tab' 
                    title='Chat'>
                        Chats
                </div>
                <div onClick={handleLogout} className='logout-tab' title='Log Out'>
                    Log Out
                </div>
            </div>
        </div>
        <div className='chat-back'><div className='chat-border'>
        <div>
            {
                details && <>
                <div>
                    username: {details.username}
                </div>
                <div>
                    uid: {user.uid}
                </div>
                </>
            }

            
                {/* <div>details: {details}</div> */}
            
            
        </div></div></div>
        <div className='footer'>footer banao</div> 
    </div>
    )
}

export default Dashboard;