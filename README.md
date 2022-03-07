1. Шинээр app үүсгэх


npx create-next-app memorize-app

2. Нэмэлт сангуудаа суулгах
a) API-ийг үүсгэхтэй холбоотой
```
npm i bcrypt cookie cookie-parser jsonwebtoken mongoose
```

б) Redux -тай холбоотой сан
```
npm i next-redux-wrapper redux redux-devtools-extension redux-logger redux-persist redux-thunk
```

в) Ant.design -тай холбоотой сан
```
npm i antd @ant-design/icons
```
3. models фолдер дотор schema-ийг үүсгэх

models/words.js
```
import mongoose from 'mongoose';

const WordsSchema = new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  eng: {
    type: String,
    required: true
  },
  mon: {
    type: String,
    required: true
  },
  comm: {
    type: String,
    required: true
  },


});

export default mongoose.models.Words || mongoose.model('Words', WordsSchema);

```

models/category.js

```
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  }
});

export default mongoose.models.Category || mongoose.model('Category', WCategorySchema);



```


4. Үндсэн фолдер дотор .env.local файлыг үүсгэж MONGO_SRV хувьсагчид утга олгоно(MongoDB-ийн холболтын мөр connectionstting-ийг)

Жишээ нь:
```
MONGO_SRV=mongodb+srv://exe:Ab123456+@cluster0.basrq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

```
5. MongoDb рүү холболт хийх үүрэгтэй файлыг үүсгэнэ

utils/connectDb.js

```

import { connect } from 'mongoose';

const connection = {};
const connectDb = async () => {
  if (connection.isConnected) {
    console.log('Using existing connection');
    return;
  }

  const db = await connect("process.env.MONGO_SRV", {
    useNewUrlParser: true,
    useUnifiedTopology: true ,    
  });

  console.log('DB connected');
  connection.isConnected = db.connections[0].readyState;
};

export default connectDb;



```


6. pages/api фолдер дотор 
   * category/index.js
   * category/[id].js
   * words/index.js
   * words/[id].js

category/index.js
```
import Grades from '../../../models/Grades';
import connectDb from '../../../utils/connectDb';

connectDb();

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const getData = await Grades.find({})
        res.status(200).json({ success: true, data: getData })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const postData = await Grades.create(req.body)
        res.status(201).json({ success: true, data: postData })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}


```

