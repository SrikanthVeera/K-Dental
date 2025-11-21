import express from 'express';
import { Brand } from '../models/index.js';

const router = express.Router();

// GET all brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.findAll({
      order: [['name', 'ASC']]
    });
    
    res.json({
      success: true,
      data: brands
    });
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching brands',
      error: error.message
    });
  }
});

// GET brand by ID
router.get('/:id', async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);
    
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }
    
    res.json({
      success: true,
      data: brand
    });
  } catch (error) {
    console.error('Error fetching brand:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching brand',
      error: error.message
    });
  }
});

// POST create new brand (admin only)
router.post('/', async (req, res) => {
  try {
    const { name, logo, description, featured } = req.body;
    
    const brand = await Brand.create({
      name,
      logo,
      description,
      featured: featured || false
    });
    
    res.status(201).json({
      success: true,
      data: brand,
      message: 'Brand created successfully'
    });
  } catch (error) {
    console.error('Error creating brand:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating brand',
      error: error.message
    });
  }
});

// PUT update brand (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { name, logo, description, featured } = req.body;
    const brand = await Brand.findByPk(req.params.id);
    
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }
    
    await brand.update({
      name,
      logo,
      description,
      featured
    });
    
    res.json({
      success: true,
      data: brand,
      message: 'Brand updated successfully'
    });
  } catch (error) {
    console.error('Error updating brand:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating brand',
      error: error.message
    });
  }
});

// DELETE brand (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id);
    
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }
    
    await brand.destroy();
    
    res.json({
      success: true,
      message: 'Brand deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting brand:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting brand',
      error: error.message
    });
  }
});

export default router;
