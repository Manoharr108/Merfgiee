import express from 'express'
const app = express()
// import path from 'path'
import * as path from 'path';
const __dirname = import.meta.dirname;
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })
import mergepdfasync from './megepdf.js'

import fs from 'fs'

app.use(express.static('./uploads'))


const port = 3000



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index1.html'))
})

app.post('/merge', upload.array('pdfs', 12), async function (req, res, next) {

    await mergepdfasync(req.files[0].path, req.files[1].path)
    res.sendFile(path.join(__dirname, './newmerged.pdf'))
})

app.listen(port, () => {
    console.log("app listening in port " + port)
})


