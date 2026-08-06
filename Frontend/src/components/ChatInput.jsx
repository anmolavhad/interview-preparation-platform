import { useState } from "react";

import "../styles/ChatInput.css";

function ChatInput({ onSend, disabled }) {

    const [text,setText]=useState("");

    const send=()=>{

        if(!text.trim()) return;

        onSend(text);

        setText("");

    };

    return(

        <div className="chat-input">

            <textarea

                value={text}

                onChange={(e)=>setText(e.target.value)}

                placeholder="Ask anything about interviews..."

                rows={2}

                onKeyDown={(e)=>{

                    if(e.key==="Enter" && !e.shiftKey){

                        e.preventDefault();

                        send();

                    }

                }}

            />

            <button

                onClick={send}

                disabled={disabled}

            >

                ➜

            </button>

        </div>

    );

}

export default ChatInput;