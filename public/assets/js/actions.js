

const querySelector = path => {
	return document.querySelector(path)
}

const querySelectorAll = path => {
	return document.querySelectorAll(path)
}


const errorMessage = text => {

	let message = querySelector("#message");

	message.innerHTML = `<div class="error-msg">${text}</div>`;

		let msgBox = message.querySelector(".error-msg").classList;

		timer(msgBox)
}

const successMessage = text => {

	let message = querySelector("#message");

	message.innerHTML = `<div class="success-msg">${text}</div>`;

		let msgBox = message.querySelector(".success-msg").classList;

		timer(msgBox)

}

const timer = (msgBox) => {

	setTimeout(() => {
				msgBox.add("fade");
				setTimeout(() => msgBox.add("display"), 500 )
			}, 2000)
}

const btnAction = (btnType, method, fetchUrl) => {

	btnType.forEach(btn => {
		btn.addEventListener("click",async e => {
			let body = JSON.stringify({id:e.target.dataset.id})
			const options = {
				method,
				body,
				headers:{
					"Content-Type":"application/json"
				}
			}

			let res = await fetch(fetchUrl, options);

			let data = await res.json();

			if( [400, 401].includes(res.status) ){
				return errorMessage(`${data.message}.${data.error ? data.error : ""}`)
			}
				
			successMessage(data.message);

			setTimeout(() => location.reload(), 2000)

		})
	})
}

