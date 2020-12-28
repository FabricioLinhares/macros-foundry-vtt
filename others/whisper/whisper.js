const getUserBlocks = () => {
    const usersWithActors = game.users.filter(user => user.character != null && user != game.user && user.active)
    const actorsBlock = usersWithActors.map(user => `
        <div class="receiver">
            <input type="checkbox" class="message-receiver" data-user-id=${user._id}> <span>${user.name} [${user.charname}]</span> </br>
        </div>
    `)

    return actorsBlock.join('')
}

const sendMessage = container => {
    const content = container[0].querySelector('#message-content').value

    const receiverBlocks = container[0].querySelectorAll('.message-receiver')
    const whisper = []

    receiverBlocks.forEach(checkbox => {
        if (checkbox.checked)
            whisper.push(checkbox.dataset.userId)
    })

    game.users.filter(user => user.isGM).forEach(gm => whisper.push(gm._id))

    ChatMessage.create({
        content,
        whisper,
        user: game.user._id,
		speaker: ChatMessage.getSpeaker()
    })
}

const options = {
	title: "Sussurar",
    content: 
    `
        <div id="receivers">${getUserBlocks()}</div>
        <hr>
        <div class="text-block">
            <label for='message-content'>Mensagem</label>
            <textarea id="message-content"></textarea>
        </div>

        <style>
            .receiver {
                display: flex;
                align-items: center;
            }
        </style>
	`,
	label: "Enviar",
	callback: sendMessage
}

Dialog.prompt(options)