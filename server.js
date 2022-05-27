const { app, express,
		connectDb,authRoute,
		basicRoute,adminRoute,
		userRoute,cookieParser, 
		devRoute, nocache 
	} = require("./serverDependency") 

connectDb( app.listen.bind(app))

app.set("view engine", "ejs");

app.use(nocache());

app.use(cookieParser());

app.use(express.urlencoded({extended:true}))

app.use( express.json())

app.use( express.static("./public") )

app.use("/api/auth", authRoute)

app.use(adminRoute, userRoute)

app.use(devRoute, basicRoute)






