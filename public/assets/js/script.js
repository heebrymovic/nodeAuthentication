

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
			body:formData,
	
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


/*DEVELOPER REGISTER API*/
if( location.href.endsWith("/developers") ){

		let form = querySelector("form");

		form.addEventListener("submit", async e => {
			e.preventDefault();

			let email = querySelector("#email");

			let host = querySelector("#host");

			let body =  JSON.stringify({email:email.value, host:host.value})
			let options = {
				method:"POST",
				body,
				headers:{
					"Content-Type":"application/json",
				}
			}

			let res = await fetch("/developers?apikey=this-is-my-api-key", options);

			let data = await res.json();

			if( res.status == 400){
				return errorMessage(`${data.message}.${data.error ? data.error : ""}`)
			}

			successMessage(`${data.message}. Your Apikey is <span>${data.user.apiKey}</span>`);
		})

}



/*DEVELOPER TEST API*/

if( location.href.endsWith("/dev/api") ){
	
	let form = querySelector("#form");

	let form1 = querySelector("#form1");

	let btn = querySelector(".form-btn1");

	let btn1 = querySelector(".form-btn2");

	/*TEST API GET */

	form.addEventListener("submit", async e => {
		
		const endpoint = querySelector("#api").value

		e.preventDefault();
		
		btn.disabled = true

		const options = {
			method:"GET",
			headers:{
				"Content-Type":"application/json"
			}
		}

		try{

			let res = await fetch(endpoint, options);

			let data = await res.json();

			
			btn.disabled = false

			console.log( data )


		}catch(err){
			btn.disabled = false
			console.log( err )
		}
	})


	form1.addEventListener("submit", async e => {
		
		const body = new FormData(form1);

		const endpoint = querySelector("#form1 #api").value;

		e.preventDefault();
		
		btn1.disabled = true

		const options = {
			method:"POST",
			body
		}

		try{

			let res = await fetch(endpoint, options);

			let data = await res.json();

			
			btn1.disabled = false

			console.log( data )


		}catch(err){
			btn1.disabled = false
			console.log( err )
		}
	})
}
