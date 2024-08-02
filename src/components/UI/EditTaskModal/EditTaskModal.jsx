import React, { useEffect, useRef, useState } from 'react';
import MyButton from '../MyButton/MyButton';
import cl from './EditTaskModal.module.css'


const EditTaskModal = ({textToChange, save, closeModal}) => {
    const [text, setText] = useState(textToChange);
    const [error, setError] = useState('');
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

    function handleText(t){
        handleInput(t);
        setText(t)
    }

    function handleSave() {
        handleInput(text)
        save(text);
    }

    function handleInput(t) {
        if(t.trim() === ''){
            setError('This field can\'t be empty');
            return;
        } else {
            setError('');
        }
        
    }

    return (
        <div className={cl.modal__bg} onMouseDown={closeModal}>
            <div className={cl.modal__body} onMouseDown={(e) => e.stopPropagation()}>
                <div className={cl.text_edit__container}>
                    <textarea
                        ref={textareaRef} 
                        className={`${cl.modal__text} ${error ? cl.error_text : ''}`}
                        value={text}
                        onChange={(e) => {handleText(e.target.value)}}
                    />
                    {error && <div className={cl.error}>{error}</div>}
                </div>
                <MyButton disabled={!!error} onClick={handleSave}>Save</MyButton>
                <MyButton onClick={closeModal}>Cancel</MyButton>
            </div>
        </div>
    );
}

export default EditTaskModal;
