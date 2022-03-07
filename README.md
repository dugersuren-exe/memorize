<details open>
<summary>1. Шинээр app үүсгэх</summary>

Commandline эсвэл git bash  дээр дараах кодыг бичиж app-ийг үүсгэнэ.

**Жишээ нь:**
```
npx create-next-app memorize-app
```
</details>

---

<details>
<summary>2. Нэмэлт сангуудаа суулгах</summary>
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

</details>

---

<details>
<summary> 3. models фолдер дотор schema-ийг үүсгэх </summary>

Үндсэн фолдер дотор доорх зам дээр файлуудыг үүсгэх
```
models/words.js
```

**Жишээ нь:**
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
</details>



---

<details>
<summary> 4. .env -файлыг үүсгэх </summary>

Үндсэн фолдер дотор .env.local файлыг үүсгэж MONGO_SRV хувьсагчид утга олгоно(MongoDB-ийн холболтын мөр connectionstting-ийг)

**Жишээ нь:**
```
MONGO_SRV=mongodb+srv://exe:Ab123456+@cluster0.basrq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```
</details>

---



<details>
<summary> 5. MongoDb -тэй холбогдох файл </summary>

Үндсэн фолдер дотор utils/connectDb.js файл үүсгэнэ.

```
utils/connectDb.js
```

**Файлын доторх агуулга:**
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

</details>

---

<details>
<summary> 6. API-ийг үүсгэх </summary>
Жишээ нь:



pages/api фолдер дотор 
   * category/index.js
   * category/[id].js
   * words/index.js
   * words/[id].js

**category/index.js**

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


**category/[id].js**
```
import Category from '../../../models/category';
import connectDb from '../../../utils/connectDb';

connectDb();

export default async (req, res) => {
  const {
    query: { id },
    method
  } = req

  switch (method) {
    case 'GET':
      try {
        const getData = await Category.findById(id)

        if (!getData) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: getData })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'PUT':
      try {
        const putData = await Category.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })

        if (!putData) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: putData })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'DELETE':
      try {
        const deletedData = await Category.deleteOne({ _id: id })

        if (!deletedData) {
          return res.status(400).json({ success: false })
        }

        res.status(200).json({ success: true, data: {deletedData} })
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



</details>

---






