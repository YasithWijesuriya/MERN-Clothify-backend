import category from '../infrastructure/db/entities/categories.js';

const getAllCategories = async (req, res) => {
    const categories = await category.find();
    res.status(200).json(categories);
};

const createCategory = async (req, res) => {
    const newCategory = req.body;
    try {
        const categories = await category.create(newCategory);
        res.status(201).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const categories = await category.findById(req.params.id);

        if (!categories) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const categories = await category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!categories) {
            res.status(404).json({ message: "Category not found" });
        } else {
            res.status(200).json(categories);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const categories = await category.findByIdAndDelete(req.params.id);
        if (!categories) {
            res.status(404).json({ message: "Category not found" });
        } else {
            res.status(200).json({ message: "Category deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory };
