

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



/*REGISTER PAGE*/
if( location.href.endsWith("/register") ){


	let form = querySelector("#form");

	form.addEventListener("submit",async e => {
		
		e.preventDefault();

		let username = querySelector("#username").value;

		let password = querySelector("#password").value;

		let photo = querySelector("#photo").files[0];

		const formData =  new FormData();

		formData.append("username", username);

		formData.append("password", password);

		formData.append("photo", photo);


		let options = {
			method: "POST",
			body:formData
		}

		try{
			let res = await fetch("/api/auth/register", options);

			let data = await res.json();

			if( [400,401].includes(res.status) ){
				return errorMessage(`${data.message}.${data.error ? data.error : ""}`)
			}

			successMessage(data.message);

			form.reset();

		} catch(err){
			console.error(err.message)
		}

	})
}


/*LOGIN PAGE*/

if( location.href.endsWith("/login") ){

	let form = querySelector("#form");

	form.addEventListener("submit",async e => {

		e.preventDefault();

		let username = querySelector("#username").value;

		let password = querySelector("#password").value;

		let body = JSON.stringify({username, password});

		let options = {
			method:"POST",
			body,
			headers:{
				"Content-Type":"application/json"
			}
		}

		try{
			let res = await fetch("/api/auth/login",options);

			let data = await res.json();

			if( [400, 401].includes(res.status) ){
				return errorMessage(`${data.message}.${data.error ? data.error : ""}`)
			}

			successMessage(data.message);

			const role = data.user.role;

			setTimeout(() => location.href= (role === "admin")? `/admin/${data.user._id}` : `/user/${data.user._id}`, 200)

			form.reset();


		}catch(err){
			console.error(err.message)
		}
	})
}


/*UPDATE USER*/

if( location.href.endsWith("/admin/users") ){


	const updateBtn = querySelectorAll("#update");

	const deleteBtn = querySelectorAll("#delete");

	btnAction(updateBtn, "PUT" ,"/api/auth/update")	

	btnAction(deleteBtn, "DELETE" ,"/api/auth/delete")	

}



