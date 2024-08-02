import React, { useEffect, useRef, useState } from 'react';
import MyButton from '../MyButton/MyButton';
import cl from './EditTaskModal.module.css'


const EditTaskModal = ({textToChange, save, closeModal}) => {
    const [text, setText] = useState(textToChange);
    const textareaRef = useRef(null);

    useEffect(() => {
        autoResize();
    }, [text]);

    function autoResize() {
        const textarea = textareaRef.current;
        if(textarea){
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }

    return (
        <div className={cl.modal__bg} onClick={closeModal}>
            <div className={cl.modal__body} onClick={(e) => e.stopPropagation()}>
                <textarea
                    ref={textareaRef} 
                    className={cl.modal__text}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <MyButton onClick={() => save(text)}>Save</MyButton>
                <MyButton onClick={closeModal}>Cancel</MyButton>
            </div>
        </div>
    );
}

export default EditTaskModal;
