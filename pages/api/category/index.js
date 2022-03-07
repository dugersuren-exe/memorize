import Category from '../../../models/category';
import connectDb from '../../../utils/connectDb';

connectDb();

export default async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const getData = await Category.find({})
        res.status(200).json({ success: true, data: getData })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        const postData = await Category.create(req.body)
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
