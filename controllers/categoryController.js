const Category = require('../models/categoryModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllCategories = catchAsync(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      categories,
    },
  });
});

exports.createCategory = catchAsync(async (req, res) => {
  const newCategory = await Category.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { category: newCategory },
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category)
    return next(new AppError('No category found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: { category },
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category)
    return next(new AppError('No category found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
