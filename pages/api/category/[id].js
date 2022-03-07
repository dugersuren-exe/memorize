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
