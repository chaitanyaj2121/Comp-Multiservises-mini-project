const { log } = require("console");
const express=require("express");
const app=express();


const port=8080;

app.listen(port,()=>{
    console.log(`App is listening on the port: ${port}`);
})

app.use(express.urlencoded({extended:true}));
app.use(express.json());


const { v1: uuidv1 } = require('uuid');


const methodOverride= require("method-override")

app.use(methodOverride("_method"));


const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let items = [
    {
        id: uuidv1(),
        name: "Wireless Headphones",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQTBwqs9H34t45SZeRMMO34VzGQGHFC1JjUuXknEpmZ5vqEN9Efo9Tevtw1QZ3A_ycV_29BP28_pENrzTD75m1QZpjZ8qI8HMJUBQxyYqzXzaOmHCfcH8a4&usqp=CAE",
        content: "High-quality wireless headphones with noise cancellation.",
        additionalInformation: "Battery life: Up to 20 hours, Performance: Crystal-clear audio, Connectivity: Bluetooth 5.0"
    },
    {
        id: uuidv1(),
        name: "Smartphone",
        image: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        content: "Latest model smartphone with advanced camera features.",
        additionalInformation: "Camera: 108MP, Battery: 4500mAh, Performance: Octa-core processor, Display: 6.7-inch AMOLED"
    },
    {
        id: uuidv1(),
        name: "Gaming Laptop",
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTmeijIneNSvfFBPmsGpM1D5VxckEkz2EcYSw_7WXGnoCV4F5MuHMZhpH-gtS-YYwj_ZTsYNYDfyuNOvIn4YIvAtNgS4prxZbqxmO2gX_dgOeSn62EYvodamg&usqp=CAE",
        content: "Powerful gaming laptop with high-end specs for gamers.",
        additionalInformation: "Processor: Intel i9, GPU: Nvidia RTX 3080, RAM: 32GB, Storage: 1TB SSD, Display: 144Hz"
    },
    { 
        id: uuidv1(),
        name: "Smartwatch",
        image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        content: "Feature-packed smartwatch with fitness tracking capabilities.",
        additionalInformation: "Battery life: Up to 10 days, Fitness tracking: Heart rate, sleep, GPS, Water resistance: 50 meters"
    },
    {
        id: uuidv1(),
        name: "Bluetooth Speaker",
        image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ-6tM-gt1UFRnKZo24SZN1fbzjatAttSoGv89HckbUM02tHbh56YbJw3ErsB2TeWL7u2Pk8hG6_3vmPBGa_M84F7YcVd3XR5Q3I9B9KnEBlj1Os6wTcOO8",
        content: "Portable Bluetooth speaker with crystal-clear sound quality.",
        additionalInformation: "Battery life: 12 hours, Connectivity: Bluetooth 5.0, Range: 30 feet, Water resistance: IPX7"
    }
];


//home page
app.get("/home",(req,res)=>{
    // console.log("Request recieved successfully !");

    // res.send("Request recieved successfully !");
    
    res.render("index.ejs",{items});
})

app.get("/home/new",(req,res)=>{
    // console.log("home path created successfully!");
    // res.send("home path created successfully!");

    res.render("newitem.ejs")
})

//PUSHING THE NEW ITEM CONTENT IN THE ARRAY THROUGH POST REQUEST
app.post("/home",(req,res)=>{

    let {name, image,content,additionalInformation}=req.body;
    // res.send("Post request accepted");
        
    let id=uuidv1();
    items.push({name,image,content,additionalInformation,id});
    // console.log(req.body);
    
    res.redirect("/home");
})


// Show in detail option
app.get("/home/:id",(req,res)=>{
    
    // console.log(req.params);   
    // gives the id of the li element in req.params we can find that element by using the id 
    // res.send("working show in detail")

    let {id }=req.params;

    let item =items.find((e)=> id===e.id)
console.log("Request Accepted!!");
    res.render("showInDetail.ejs",{item})
})


//  Edit option
//1.show the already exists data in the items so it is easy to edit

app.get("/home/:id/edit",(req,res)=>{
    let {id}=req.params;
    let item=items.find((e)=>(id===e.id))  // finds and returns

      res.render("edit.ejs",{item})
})
 
app.patch("/home/:id",(req,res)=>{

        //  console.log(req.params);
         
         let {id }=req.params;

         let item=items.find((e)=>(id===e.id))  // finds and returns

         let newContent=req.body.content;    
         
         item.content=newContent[0];
         item.additionalInformation=newContent[1];

      res.redirect("/home")       
 });

app.delete("/home/:id",(req,res)=>{
    let {id}=req.params;

      items=items.filter((e)=> id!==e.id);

      res.redirect("/home")

})

