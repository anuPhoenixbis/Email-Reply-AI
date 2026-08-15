console.log("Content script loaded");

const getEmailContent = () => {
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]'
    ]

    for(const selector of selectors){
        const content = document.querySelector(selector);
        if(content) return content.innerText.trim();
        return '';
    }
}
const findComposeToolbar = () => {
    const selectors = [
        '.btC',
        '.aDh',
        '[role="toolbar"]',
        '.gU.Up'
    ]

    for(const selector of selectors){
        const toolbar = document.querySelector(selector);
        if(toolbar) return toolbar;
        return null;
    }
}
const createAIReplyButton = () => {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('tabindex', '0');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;
}

const injectButton = () => {
    //this will have the logic to inject the AI reply button into the Gmail compose window
    // takes the email content and sends it to the background script for processing
    const existingButton = document.querySelector('.ai-reply-button');
    if(existingButton) { existingButton.remove(); } // Remove existing button if present

    const toolbar = findComposeToolbar();
    if(!toolbar){
        console.log("Compose toolbar not found. Retrying...");
        setTimeout(injectButton, 1000);
    }
    
    const button = createAIReplyButton();
    button.classList.add('ai-reply-button');

    button.addEventListener('click', async () => {
        try{
            button.innerHTML = 'Generating...';
            button.disabled = true;

            const emailContent = getEmailContent();

            const response = await fetch('https://email-reply-ai-backend.onrender.com/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: emailContent })
            });

            if(!response.ok){
                throw new Error(`Server responded with status ${response.status}`);
            }

            const generatedReply = await response.text();

            const composeBox = document.querySelector('[role="textbox"][g_editable="true"]');

            if(composeBox){
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            }else{
                console.error("Compose box not found. Unable to insert generated reply.");
            }
        }catch(error){
            console.error("Error generating AI reply:", error);
            alert("Failed to generate AI reply. Please try again later.");
        }finally{
            button.innerHTML = 'AI Reply';
            button.disabled = false;
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
}

// MutationObserver to detect changes in the DOM or specific elems in the browser
const observer = new MutationObserver((mutations) => {
    for(const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);//holds the changed nodes
        const hasComposeElements = addedNodes.some(node => 
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'))
        );

        if(hasComposeElements){
            console.log("Compose elements detected. Sending message to background script.");
            setTimeout(() => {
                injectButton();
            }, 1000);
        }
    }
})

observer.observe(document.body, { childList: true, subtree: true });