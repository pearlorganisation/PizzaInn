import express from 'express';
import { createDeal, deleteDeal, getAllDeals, getDeal, updateDeal } from '../../controllers/deals/deals.js';
import { upload } from '../../configs/cloudinary.js';

const dealsRoutes = express.Router();

dealsRoutes.route('/')
    .get(getAllDeals)
    .post(upload.single('banner'),createDeal);

dealsRoutes.route('/:id')
    .get(getDeal)
    .patch(upload.single('banner'),updateDeal)
    .delete(deleteDeal);

export default dealsRoutes;
