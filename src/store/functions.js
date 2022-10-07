
// general/global functions

const addClass = (elem, className) => {
    if(elem.classList.contains(className)){
        elem.classList.remove(className);
    } else {
        elem.classList.add(className);
    }
    return;
};





// the following functions are related to the navbar links

export const toggleMenu = (isActive) => { // handles the toggle className for the .hamburger-menu-wrapper, thus determining whether the nav=links-wrapper appear or not. .
    const hamburgerMenuLWrapper = document.querySelector(".hamburger-menu-wrapper");
    
    // the following condition is to ensure whether the toggled action was triggered by a link or the scroll event (InterSectionObserver)
    isActive ? hamburgerMenuLWrapper.classList.remove("menu-toggled") : addClass(hamburgerMenuLWrapper, "menu-toggled");
}

export const addSelected = (e) => { // handles the link selected action once the user clicks on a nav bar link
    const elementClass = e.target.classList;
    const navLinks = document.querySelectorAll(".route-selector");
  
    navLinks.forEach(link => {
      const linkClass = link.classList;

      if(linkClass[1] === elementClass[1]){
        link.classList.add("route-selected");
      } else {
        link.classList.remove("route-selected");
      }
    })
}
// ------------------------------------------------------------------------------------------------





// the following functions are related to the tenzy component

// function to remove the tenzy game information
export const  closeGameInfo = () => {
    const gameInfoWrapper = document.querySelector("#gameInfoWrapper");
    const tenzyOverlay = document.querySelector(".tenzy-overlay");
    
    tenzyOverlay.classList.remove("tenzyActiveOverlay");
    gameInfoWrapper.classList.remove("opened");
}

// function to open the tenzy game information
export const openGameInfo = () => {
    const gameInfoWrapper = document.querySelector("#gameInfoWrapper");
    const tenzyOverlay = document.querySelector(".tenzy-overlay");
    
    tenzyOverlay.classList.add("tenzyActiveOverlay");
    gameInfoWrapper.classList.add("opened");
}



// ------------------------------------------------------------------------------------------------





// the following functions are related to the memeGeneratorPage

export const getMemeTemplate = (id) => ( // shall be used as the data blueprint for each meme template that shall be created
    // the id must be provided on each call of this function
    {
        id: `${id}`,
        text: '',
        color: "#000000",
        outlineColor: "#ffffff",
        font: "Arial",
        textTransform: "ALL CAPS",
        fontWeight: "",
        fontStyle: "",
        [`outline#${id}`]: `shadow#${id}`,
        outlineWidth: "5",
        fontSize: "16",
        lineHeight: "2",
        opacity: "1"
    }
);

export const getMemeImageUrl = async (memeURL) => { // handles the fetch request from the get meme API
    const response = await fetch(`${memeURL}`);
    const data = await response.json();
    const { memes } = data.data;

    const randomIndex = Math.floor(Math.random() * memes.length);

    const { url: memeUrl } = memes[randomIndex];

    return memeUrl;
}

export const uploadImage = (data, memeState) => { // handles the receive and the upload data for the state that controls the meme-image element source property
    if(data)memeState(data); // memeState is expected to be a setState function
}

export const dragResizeTemplate = (template, wrapper, resizes) => { // handles the resize, drag and rotate action for the .img-template template

    let isResizing = false;

    const getMargins = (element) => {
		let style = element.currentStyle || window.getComputedStyle(element);
        let result = {
            getX: function() {
                return parseInt(style.marginLeft);
            },
            getY: function() {
                return parseInt(style.marginTop);
            }
        };
        return result;
    }

    const handleDragAction = (e) => {
        let dragging = false; // tells if the user is holding the mouse down

        let clickX, clickY; // will store the position where the mouse was clicked
        let positionX, positionY; // will store the position of the template

        // will be used to determines the edges of the wrapper
        let minX, minY, maxX, maxY; 
        
        let remove = () => { // remove the addEventListeners
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);  
        };

        const onMouseDown = (e) => {
            clickX = e.clientX;
            clickY = e.clientY;

            let margins = getMargins(template); // prevents against different margin sizes

            positionX = template.offsetLeft - margins.getX();
            positionY = template.offsetTop - margins.getY();
            
            dragging = true;
            
            window.addEventListener('mouseup', onMouseUp);  
            window.addEventListener('mousemove', onMouseMove);
        }
        
        const onMouseMove = (e) => {
            // setting the x and y limit the template can't extend
            minX = 20;
            minY = 20;
            maxX = wrapper.offsetWidth - template.offsetWidth + minX; 
            maxY = wrapper.offsetHeight - template.offsetHeight + minY;

            // calculating the difference the location where the user first clicked, relative to the position of the element on the page and the new mouse movement
            let x = positionX + e.clientX - clickX; 
            let y = positionY + e.clientY - clickY;
            
            if(x >= -minX && x <= maxX && y >= -minY && y <= maxY){ // setting the conditions to limit the space the template can be dragged
                if(dragging) { // if the user has clicked on the template, it'll be applied the following style values to it
                    template.style.left = x + 'px';
                    template.style.top = y + 'px';
                }
            }
        }

        const onMouseUp = () => {
            dragging = false;
            return remove();
        }

       if(!isResizing) return onMouseDown(e);
    } 
    
    const handleResize = (e) => {
        // getting the id that determines the template that's currently being modified by user
        const templateClassName = template.className;
        const id = templateClassName.split(' '); // the id is found on the second index of the classList, so to obtain it, we split the className property

        let currentResizer = e.target;

        isResizing = true;

        const minSize = 30;

        // initial width and height
        let original_width = parseFloat(getComputedStyle(template, null).getPropertyValue('width').replace('px', ''));
        let original_height = parseFloat(getComputedStyle(template, null).getPropertyValue('height').replace('px', ''));
        
        // these will store the new width and height
        let width;
        let height;
        
        // initial location of the template and the mouse click
        let initial_y = template.getBoundingClientRect().top;
        let initial_x = template.getBoundingClientRect().left;
        let initial_click_x = e.pageX;
        let initial_click_y = e.pageY;
        
        // limit area where the resize function will be validated
        let minY = wrapper.getBoundingClientRect().top;
        let minX = wrapper.getBoundingClientRect().left;
        let maxX = wrapper.getBoundingClientRect().right;
        let maxY = wrapper.getBoundingClientRect().bottom;

        // the following function is part of the rotate template event
        const getCenter = (element) => {
            const {left, top, width, height} = element.getBoundingClientRect();
            return {x: left + width / 2, y: top + height / 2}
        }
        
        const templateMeasure = getCenter(template);

        function resize(e) {
            if(e.clientX >= minX && e.clientX <= maxX && e.clientY >= minY && e.clientY <= maxY){ // setting the conditions to limit the space the template can be resized
                switch(currentResizer.className) {
                    case `nw point ${id[1]}`:
                        width = original_width - (e.pageX - initial_click_x);
                        height = original_height - (e.pageY - initial_click_y);
                        console.log(width)
                           if(width >= minSize){
                            template.style.width = width + 'px';
                            template.style.left = (initial_x - minX) + (e.pageX - initial_click_x) + 'px';
                           }
                           if(height >= minSize){
                            template.style.height = height + 'px';
                            template.style.top = (initial_y - minY) + (e.pageY - initial_click_y) + 'px';
                           }
                        break;
                    case `nc point ${id[1]}`:
                        height = original_height - (e.pageY - initial_click_y);
                          if(height >= minSize) {
                            template.style.height = height + 'px';
                            template.style.top = (initial_y - minY) + (e.pageY - initial_click_y) + 'px';
                          }
                        break;
                    case `ne point ${id[1]}`:
                        width = original_width + (e.pageX - initial_click_x);
                        height = original_height - (e.pageY - initial_click_y);
                          if(width >= minSize) template.style.width = width + 'px';
                          if(height >= minSize){
                            template.style.height = height + 'px';
                            template.style.top = (initial_y - minY) + (e.pageY - initial_click_y) + 'px';
                          }
                        break;
                    case `cw point ${id[1]}`:
                        width = original_width - (e.pageX - initial_click_x);
                            if(width >= minSize){
                                template.style.left = (initial_x - minX) + (e.pageX - initial_click_x) + 'px';
                                template.style.width = width + 'px';
                            }
                        break;
                    case `ce point ${id[1]}`:
                        width = original_width + (e.pageX - initial_click_x);
                            if(width >= minSize) template.style.width = width + 'px';
                        break;
                    case `sw point ${id[1]}`:
                        width = original_width - (e.pageX - initial_click_x);
                        height = original_height + (e.pageY - initial_click_y);
                            if(width >= minSize) template.style.width = width + 'px';
                            if(height >= minSize) {
                                template.style.height = height + 'px';
                                template.style.left = (initial_x - minX) + (e.pageX - initial_click_x) + 'px';
                            }
                        break;
                    case `sc point ${id[1]}`:
                        height = original_height + (e.pageY - initial_click_y);
                            if(height >=minSize) template.style.height = height + 'px';
                        break;
                    case `se point ${id[1]}`:
                        width = original_width + (e.pageX - initial_click_x);
                        height = original_height + (e.pageY - initial_click_y);
                            if(width >= minSize) template.style.width = width + 'px';
                            if(height >= minSize) template.style.height = height + 'px';
                        break;
                }
            }
            if(currentResizer.classList[0] === "circle"){
                const angle = Math.atan2((e.clientY) - templateMeasure.y, (e.clientX) - templateMeasure.x);
                template.style.transform = `rotate(${angle}rad)`;    
            }
        }
        
        function stopResize() {
            window.removeEventListener('mousemove', resize)
            isResizing = false;
        }

        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResize)
    }

    template.addEventListener('mousedown', handleDragAction);
    resizes.forEach(resizer => resizer.addEventListener('mousedown', handleResize));
  
    return;
}

export const getTemplateStyle = (templateData) => { // handles the style properties for the .img-template element
    const style = {};
    if(templateData.font) style.fontFamily = templateData.font
    if(templateData.fontSize) style.fontSize = templateData.fontSize + 'px';
    if(templateData.lineHeight) style.lineHeight = templateData.lineHeight;
    if(templateData.opacity) style.opacity = templateData.opacity;
    if(templateData.textTransform) style.textTransform = "uppercase";
    if(templateData.fontWeight) style.fontWeight = "bold";
    if(templateData.fontStyle) style.fontStyle = "italic";
    if(templateData.color) style.color = templateData.color;    
    if(templateData.outlineWidth) {
        const value = templateData.outlineWidth;
        style.filter = `drop-shadow(0px 0px ${value}px ${templateData.outlineColor})`;
    }
    
    return style;
}

export const toggleAddMeme = () => { // function used to handle toggle class name action of the .mm-generator-wrapper element 
    const memeGeneratorWrapper = document.querySelector(".mm-generator-wrapper");

    addClass(memeGeneratorWrapper, "toggleAddMeme");
}

export const insertImage = (url, file, setFileState) => { // handles the image upload whether it comes from the user's file system or from links the user inputs.
    if(file){
        const reader = new FileReader();
        reader.addEventListener('load', () => setFileState(reader.result));
        reader.readAsDataURL(file)
    }
    if(url) setFileState(url);
}

export const resizeMemeText = (element, parent, state, id, updateState) => { // function used to handle the font resize of the image template from the memeGeneratorPage component
    const widthComparison = element.offsetWidth + 50 > parent.offsetWidth; // compare the width of the span child to the width of the image-template element
    const heightComparison = element.offsetHeight + 10 < parent.offsetHeight; // compare the height of the span child to the height of the image-template element

    if(heightComparison) return; // if the user resizes the container height, we don't need to resize the text

    if(widthComparison){ // otherwise, if the text reaches somewhere close to the container width, we shall resize the font size
        const updatedState = state.map(item => item.id === id ? {...item, fontSize: item.fontSize / 1.1} : item);

        return updateState(updatedState);
    }

};

export const toggleConfig = (id) => { // handles the toggle className action for the .mm-text-template, thus determining whether the font-config-wrapper should appear or not.
    const mmTextTemplate = document.querySelectorAll(".mm-text-template");

    mmTextTemplate.forEach(template => {
        template.id === id ? addClass(template, "activate-config") : template.classList.remove("activate-config");
    })
    return;
}
//------------------------------------------------------------------------------------------------





// the following function is related to the TicTacToePage component

export const toggleTicTacOverlay = () => {
    const ticTacOverlay = document.querySelector(".tic-tac-overlay");

    addClass(ticTacOverlay, "toggle-tic-tac-overlay")
    return;
}
// ----------------------------------------------------------------------------------------------





// the following function is related to the QuizGamePage component

export const getQuizQuestions = async (difficulty) => {
    const QUIZ_API_URL = `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`;

    const response = await fetch(QUIZ_API_URL);
    const data = await response.json();
    
    const questions = data.results.map((item) => (
        {
            question: item.question,
            correct_answer: item.correct_answer,
            incorrect_answers: item.incorrect_answers,
        }
    ))

    return questions;
}

export const toggleQuizOverLay = () => {
    const quizOverlay = document.querySelector(".quiz-overlay");

    addClass(quizOverlay, "quiz-overlay-active");
}

export const deactivateStartBtnStyle = () => {
    const startQuizBtn = document.querySelector(".start-quiz-btn");

    addClass(startQuizBtn, "quiz-btn-deactivate");

    setTimeout(() => startQuizBtn.style.display = "none", 500)
}

export const handleSpecSelectionStyle = (e) => {
    const { className, innerHTML } = e.target;
    const classList = className.split(" ");
    const mainClassName = classList[0];

    const specBtn = document.querySelectorAll(`.${mainClassName}`);
    
    specBtn.forEach(btn => {
        btn.innerHTML === innerHTML ?
        btn.classList.add("quiz-specification-selected") :
        btn.classList.remove("quiz-specification-selected");
    })
}

export const handleTimeLimitStyle = (time, counter, skip) => {
    const timeBar = document.querySelector(".time-bar");

    if(skip){
        timeBar.style.transition = `width ${.19}s linear`;
        timeBar.classList.remove("quiz-time-counting");
        setTimeout(() => {
            timeBar.style.transition = `width ${time - .2}s linear`
        }, 200)
    } else if(counter > 0) {
        timeBar.style.transition = `width ${.19}s linear`;
        timeBar.classList.remove("quiz-reviling-time");
        setTimeout(() => {
            timeBar.style.transition = `width ${time - .2}s linear`
            timeBar.classList.add("quiz-time-counting");
        }, 200)
    } else if (counter == 0){
        timeBar.style.transition = `width ${.10}s linear`;
        timeBar.classList.remove("quiz-time-counting");
        setTimeout(() => {
            timeBar.style.transition = `width ${5}s linear`;
            timeBar.classList.add("quiz-reviling-time");
        }, 200)
    }
}
// ----------------------------------------------------------------------------------------------