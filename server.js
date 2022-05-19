
const express =  require("express");

const app = express();

const { connectDb,authRoute,
		basicRoute,adminRoute,
		userRoute,error,
		cookieParser
	} = require("./serverDependency") 

connectDb( app.listen.bind(app))

app.set("view engine", "ejs");

app.use( express.static("./public") )

app.use(cookieParser());

app.use(express.urlencoded({extended:true}))

app.use( express.json());

app.use("/api/auth", authRoute);

app.use(basicRoute);

app.use(adminRoute);

app.use(userRoute);

app.use(error)




